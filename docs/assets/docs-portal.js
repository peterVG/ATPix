/**
 * Client-side markdown loader and portal chrome for the ATPix docs site.
 */
(function () {
  "use strict";

  var CONTENT_ID = "docs-content";
  var SHELL_ID = "docs-shell";
  var RESIZER_ID = "docs-resizer";
  var ACTIVE_CLASS = "is-active";
  var COLLAPSED_CLASS = "is-collapsed";
  var DRAGGING_CLASS = "is-dragging";
  var MAX_PATH_LENGTH = 256;
  var MIN_TOC_PERCENT = 20;
  var MAX_TOC_PERCENT = 50;
  var DEFAULT_TOC_PERCENT = 33.333;
  var TOC_WIDTH_KEY = "atpix-docs-toc-width";
  var activeRequestId = 0;

  /**
   * Map pre-overview-reorg root paths to docs/overview/ numbered filenames.
   *
   * @type {Record<string, string>}
   */
  var LEGACY_DOC_PATHS = {
    "architecture.md": "overview/000-architecture.md",
    "product-vision.md": "overview/001-product-vision.md",
    "prd.md": "overview/002-prd.md",
    "srs.md": "overview/003-srs.md",
    "ui-requirements.md": "overview/004-ui-requirements.md",
    "plan.md": "overview/005-plan.md",
    "references/README.md": "references/000-README.md",
    "lexicon/README.md": "lexicon/net.atpix.gallery.md",
  };

  /**
   * Resolve a documentation path relative to the site root.
   *
   * @param {string} rawPath - Path or hash fragment pointing at a .md file.
   * @returns {string|null} Normalized path ending in .md, or null if invalid.
   */
  function normalizeDocPath(rawPath) {
    if (!rawPath || typeof rawPath !== "string") {
      return null;
    }

    var trimmed = rawPath.replace(/^#/, "").replace(/^\//, "").trim();
    if (!trimmed || trimmed.length > MAX_PATH_LENGTH) {
      return null;
    }

    if (trimmed.indexOf("..") !== -1) {
      return null;
    }

    if (!trimmed.endsWith(".md")) {
      trimmed = trimmed + ".md";
    }

    if (trimmed === "index.md") {
      return null;
    }

    if (Object.prototype.hasOwnProperty.call(LEGACY_DOC_PATHS, trimmed)) {
      return LEGACY_DOC_PATHS[trimmed];
    }

    return trimmed;
  }

  /**
   * Build a fetch URL for a markdown file on GitHub Pages.
   *
   * @param {string} docPath - Normalized markdown path.
   * @returns {string} Absolute URL for fetch.
   */
  function buildFetchUrl(docPath) {
    var base = document.body.getAttribute("data-baseurl") || "/";
    if (!base.endsWith("/")) {
      base = base + "/";
    }
    return base + docPath;
  }

  /**
   * Resolve a relative documentation or asset path against the active document.
   *
   * @param {string} href - Relative or root-absolute path from rendered HTML.
   * @param {string} currentPath - Currently displayed document path.
   * @returns {string|null} Normalized site-relative path, or null if external.
   */
  function resolveRelativeDocPath(href, currentPath) {
    if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("data:")) {
      return null;
    }

    var currentDir = currentPath.includes("/")
      ? currentPath.slice(0, currentPath.lastIndexOf("/") + 1)
      : "";
    var combined = href.startsWith("/") ? href.slice(1) : currentDir + href;
    var parts = combined.split("/");
    var normalized = [];

    parts.forEach(function (part) {
      if (!part || part === ".") {
        return;
      }
      if (part === "..") {
        normalized.pop();
        return;
      }
      normalized.push(part);
    });

    if (normalized.length === 0) {
      return null;
    }

    return normalized.join("/");
  }

  /**
   * Rewrite relative .md links inside rendered HTML so in-portal navigation works.
   *
   * @param {HTMLElement} container - Rendered article element.
   * @param {string} currentPath - Currently displayed document path.
   */
  function rewriteMarkdownLinks(container, currentPath) {
    var links = container.querySelectorAll("a[href]");

    links.forEach(function (anchor) {
      var href = anchor.getAttribute("href");
      if (!href || !href.endsWith(".md")) {
        return;
      }

      var resolved = resolveRelativeDocPath(href, currentPath);
      if (!resolved) {
        return;
      }

      anchor.setAttribute("href", "#" + resolved);
      anchor.classList.add("doc-link");
    });
  }

  /**
   * Rewrite relative image and asset links for hash-routed portal viewing.
   *
   * @param {HTMLElement} container - Rendered article element.
   * @param {string} currentPath - Currently displayed document path.
   */
  function rewriteMarkdownAssets(container, currentPath) {
    container.querySelectorAll("img[src]").forEach(function (image) {
      var src = image.getAttribute("src");
      var resolved = resolveRelativeDocPath(src, currentPath);
      if (!resolved) {
        return;
      }
      image.setAttribute("src", buildFetchUrl(resolved));
    });

    container.querySelectorAll("a[href]").forEach(function (anchor) {
      var href = anchor.getAttribute("href");
      if (!href || href.endsWith(".md")) {
        return;
      }

      var resolved = resolveRelativeDocPath(href, currentPath);
      if (!resolved) {
        return;
      }

      anchor.setAttribute("href", buildFetchUrl(resolved));
    });
  }

  /**
   * Mark the matching table-of-contents entry as active.
   *
   * @param {string} docPath - Normalized markdown path.
   */
  /**
   * Set collapsed or expanded state on a TOC section node.
   *
   * @param {HTMLElement} sectionNode - Section wrapper with panel children.
   * @param {boolean} collapsed - Whether the section should be collapsed.
   */
  function setTocSectionCollapsed(sectionNode, collapsed) {
    var toggle = findDirectSectionToggle(sectionNode);
    if (collapsed) {
      sectionNode.classList.add(COLLAPSED_CLASS);
    } else {
      sectionNode.classList.remove(COLLAPSED_CLASS);
    }
    if (toggle) {
      toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    }
  }

  /**
   * Expand ancestor TOC sections so an active link remains visible.
   *
   * @param {HTMLElement} link - Active table-of-contents link element.
   */
  function expandTocAncestors(link) {
    var section = link.closest("[data-toc-section]");
    while (section) {
      setTocSectionCollapsed(section, false);
      var parentPanel = section.closest(".docs-toc-panel");
      if (!parentPanel) {
        break;
      }
      section = parentPanel.closest("[data-toc-section]");
    }
  }

  /**
   * Collapse all top-level TOC sections in the navigation sidebar.
   */
  function collapseTopLevelTocSections() {
    var nav = document.querySelector(".docs-toc nav");
    if (!nav) {
      return;
    }

    Array.prototype.forEach.call(nav.children, function (child) {
      if (child.classList.contains("docs-toc-section")) {
        setTocSectionCollapsed(child, true);
      }
    });
  }

  function setActiveTocLink(docPath) {
    var links = document.querySelectorAll(".doc-link");
    var activeLink = null;

    links.forEach(function (link) {
      var target = normalizeDocPath(link.getAttribute("data-path") || link.getAttribute("href"));
      if (target === docPath) {
        link.classList.add(ACTIVE_CLASS);
        activeLink = link;
      } else {
        link.classList.remove(ACTIVE_CLASS);
      }
    });

    if (activeLink) {
      expandTocAncestors(activeLink);
    }
  }

  /**
   * Remove YAML front matter from fetched markdown files.
   *
   * @param {string} markdown - Raw markdown source.
   * @returns {string} Markdown without leading front matter block.
   */
  function stripFrontMatter(markdown) {
    if (!markdown || markdown.indexOf("---\n") !== 0) {
      return markdown;
    }

    var closingIndex = markdown.indexOf("\n---\n", 4);
    if (closingIndex === -1) {
      return markdown;
    }

    return markdown.slice(closingIndex + 5);
  }

  /**
   * Locate the direct child toggle button for a TOC section node.
   *
   * @param {HTMLElement} sectionNode - Section wrapper element.
   * @returns {HTMLElement|null} Direct toggle button, if present.
   */
  function findDirectSectionToggle(sectionNode) {
    var child = sectionNode.firstElementChild;
    while (child) {
      if (child.classList.contains("docs-toc-section-toggle")) {
        return child;
      }
      child = child.nextElementSibling;
    }
    return null;
  }

  /**
   * Convert fenced mermaid code blocks into renderable diagram nodes.
   *
   * @param {HTMLElement} container - Rendered article element.
   * @returns {HTMLElement[]} Mermaid nodes queued for rendering.
   */
  function prepareMermaidBlocks(container) {
    var blocks = container.querySelectorAll("pre > code.language-mermaid");
    var nodes = [];

    blocks.forEach(function (code) {
      var pre = code.parentElement;
      if (!pre) {
        return;
      }

      var diagram = document.createElement("div");
      diagram.className = "mermaid";
      diagram.textContent = code.textContent || "";
      pre.replaceWith(diagram);
      nodes.push(diagram);
    });

    return nodes;
  }

  /**
   * Render Mermaid diagram blocks inside an article.
   *
   * @param {HTMLElement} article - Rendered article element.
   * @returns {Promise<void>}
   */
  function renderMermaidDiagrams(article) {
    var nodes = prepareMermaidBlocks(article);
    if (nodes.length === 0) {
      return Promise.resolve();
    }

    if (typeof mermaid === "undefined" || !mermaid.run) {
      nodes.forEach(function (node) {
        node.className = "mermaid-error";
        node.textContent = "Mermaid renderer failed to load.";
      });
      return Promise.resolve();
    }

    return mermaid.run({ nodes: nodes }).catch(function (error) {
      nodes.forEach(function (node) {
        node.className = "mermaid-error";
        node.textContent = "Mermaid diagram failed to render: " + error.message;
      });
    });
  }

  /**
   * Render markdown text into the content column.
   *
   * @param {string} markdown - Raw markdown source.
   * @param {string} docPath - Source path used for link rewriting.
   * @returns {Promise<void>}
   */
  function renderMarkdown(markdown, docPath) {
    var container = document.getElementById(CONTENT_ID);
    if (!container) {
      return Promise.resolve();
    }

    if (typeof marked === "undefined" || !marked.parse) {
      container.innerHTML = "<p class=\"docs-error\">Markdown renderer failed to load.</p>";
      return Promise.resolve();
    }

    var article = document.createElement("article");
    article.innerHTML = marked.parse(stripFrontMatter(markdown));
    rewriteMarkdownLinks(article, docPath);
    rewriteMarkdownAssets(article, docPath);

    container.innerHTML = "";
    container.appendChild(article);

    return renderMermaidDiagrams(article);
  }

  /**
   * Display a fetch error without interpreting user-controlled paths as HTML.
   *
   * @param {HTMLElement} container - Content column element.
   * @param {string} docPath - Requested document path.
   * @param {string} errorMessage - Fetch or parse error message.
   */
  function showLoadError(container, docPath, errorMessage) {
    container.innerHTML = "";

    var paragraph = document.createElement("p");
    paragraph.className = "docs-error";

    paragraph.appendChild(document.createTextNode("Unable to load "));
    var code = document.createElement("code");
    code.textContent = docPath;
    paragraph.appendChild(code);
    paragraph.appendChild(document.createTextNode(": " + errorMessage));

    container.appendChild(paragraph);
  }

  /**
   * Fetch and display a markdown document.
   *
   * @param {string} rawPath - Requested document path or hash.
   * @returns {Promise<void>}
   */
  function loadDocument(rawPath) {
    var docPath = normalizeDocPath(rawPath);
    var container = document.getElementById(CONTENT_ID);

    if (!docPath || !container) {
      return Promise.resolve();
    }

    var requestId = activeRequestId + 1;
    activeRequestId = requestId;

    container.innerHTML = "<p class=\"docs-loading\">Loading…</p>";
    setActiveTocLink(docPath);

    return fetch(buildFetchUrl(docPath))
      .then(function (response) {
        if (requestId !== activeRequestId) {
          return null;
        }
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.text();
      })
      .then(function (markdown) {
        if (requestId !== activeRequestId || markdown === null) {
          return;
        }
        return renderMarkdown(markdown, docPath).then(function () {
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, "", "#" + docPath);
          }
        });
      })
      .catch(function (error) {
        if (requestId !== activeRequestId) {
          return;
        }
        showLoadError(container, docPath, error.message);
      });
  }

  /**
   * Toggle a collapsible TOC section node.
   *
   * @param {HTMLElement} sectionNode - Section wrapper with panel children.
   */
  function toggleTocSection(sectionNode) {
    var isCollapsed = !sectionNode.classList.contains(COLLAPSED_CLASS);
    setTocSectionCollapsed(sectionNode, isCollapsed);
  }

  /**
   * Wire collapse toggles for hierarchical TOC sections.
   */
  function initTocCollapse() {
    document.querySelectorAll(".docs-toc-section-toggle").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var section = button.closest("[data-toc-section]");
        if (section) {
          toggleTocSection(section);
        }
      });
    });
  }

  /**
   * Clamp a TOC width percentage to supported bounds.
   *
   * @param {number} percent - Requested sidebar width percentage.
   * @returns {number} Clamped percentage.
   */
  function clampTocPercent(percent) {
    if (percent < MIN_TOC_PERCENT) {
      return MIN_TOC_PERCENT;
    }
    if (percent > MAX_TOC_PERCENT) {
      return MAX_TOC_PERCENT;
    }
    return percent;
  }

  /**
   * Apply sidebar width to the layout shell.
   *
   * @param {number} percent - Sidebar width percentage.
   */
  function applyTocWidth(percent) {
    var shell = document.getElementById(SHELL_ID);
    var resizer = document.getElementById(RESIZER_ID);
    var clamped = clampTocPercent(percent);

    if (shell) {
      shell.style.setProperty("--docs-toc-width", clamped + "%");
    }
    if (resizer) {
      resizer.setAttribute("aria-valuenow", String(Math.round(clamped)));
    }
  }

  /**
   * Persist sidebar width for return visits.
   *
   * @param {number} percent - Sidebar width percentage.
   */
  function saveTocWidth(percent) {
    try {
      localStorage.setItem(TOC_WIDTH_KEY, String(percent));
    } catch (error) {
      return;
    }
  }

  /**
   * Read stored sidebar width, if present.
   *
   * @returns {number|null} Stored width percentage or null.
   */
  function loadStoredTocWidth() {
    try {
      var stored = localStorage.getItem(TOC_WIDTH_KEY);
      if (!stored) {
        return null;
      }
      var parsed = parseFloat(stored);
      if (Number.isNaN(parsed)) {
        return null;
      }
      return clampTocPercent(parsed);
    } catch (error) {
      return null;
    }
  }

  /**
   * Enable drag and keyboard resizing between TOC and content columns.
   */
  function initColumnResizer() {
    var shell = document.getElementById(SHELL_ID);
    var resizer = document.getElementById(RESIZER_ID);
    if (!shell || !resizer) {
      return;
    }

    var stored = loadStoredTocWidth();
    applyTocWidth(stored === null ? DEFAULT_TOC_PERCENT : stored);

    var dragging = false;

    /**
     * Update column widths from a pointer X coordinate.
     *
     * @param {number} clientX - Pointer X position in viewport pixels.
     */
    function updateFromPointer(clientX) {
      var rect = shell.getBoundingClientRect();
      var percent = ((clientX - rect.left) / rect.width) * 100;
      var clamped = clampTocPercent(percent);
      applyTocWidth(clamped);
      saveTocWidth(clamped);
    }

    resizer.addEventListener("pointerdown", function (event) {
      dragging = true;
      resizer.classList.add(DRAGGING_CLASS);
      if (resizer.setPointerCapture) {
        resizer.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
    });

    resizer.addEventListener("pointermove", function (event) {
      if (!dragging) {
        return;
      }
      updateFromPointer(event.clientX);
    });

    function endDrag(event) {
      if (!dragging) {
        return;
      }
      dragging = false;
      resizer.classList.remove(DRAGGING_CLASS);
      if (resizer.releasePointerCapture && event.pointerId !== undefined) {
        try {
          resizer.releasePointerCapture(event.pointerId);
        } catch (releaseError) {
          return;
        }
      }
    }

    resizer.addEventListener("pointerup", endDrag);
    resizer.addEventListener("pointercancel", endDrag);

    resizer.addEventListener("keydown", function (event) {
      var current = parseFloat(resizer.getAttribute("aria-valuenow") || String(DEFAULT_TOC_PERCENT));
      if (event.key === "ArrowLeft") {
        applyTocWidth(current - 2);
        saveTocWidth(clampTocPercent(current - 2));
        event.preventDefault();
      }
      if (event.key === "ArrowRight") {
        applyTocWidth(current + 2);
        saveTocWidth(clampTocPercent(current + 2));
        event.preventDefault();
      }
    });
  }

  /**
   * Handle table-of-contents and in-content navigation clicks.
   *
   * @param {MouseEvent} event - Click event.
   */
  function handleDocClick(event) {
    var link = event.target && event.target.closest ? event.target.closest("a.doc-link") : null;
    if (!link) {
      return;
    }
    var path = link.getAttribute("data-path") || link.getAttribute("href");
    if (!path) {
      return;
    }
    event.preventDefault();
    loadDocument(path);
  }

  /**
   * Boot portal UI and optional hash-routed document.
   */
  /**
   * Configure Mermaid for client-side diagram rendering in fetched docs.
   */
  function initMermaid() {
    if (typeof mermaid === "undefined" || !mermaid.initialize) {
      return;
    }

    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "strict",
      fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
    });
  }

  function bootPortal() {
    initMermaid();
    initTocCollapse();
    collapseTopLevelTocSections();
    initColumnResizer();

    var hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      loadDocument(hash);
    }
  }

  document.addEventListener("click", handleDocClick);
  window.addEventListener("hashchange", function () {
    loadDocument(window.location.hash);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPortal);
  } else {
    bootPortal();
  }
})();