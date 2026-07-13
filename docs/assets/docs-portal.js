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
   * Rewrite relative .md links inside rendered HTML so in-portal navigation works.
   *
   * @param {HTMLElement} container - Rendered article element.
   * @param {string} currentPath - Currently displayed document path.
   */
  function rewriteMarkdownLinks(container, currentPath) {
    var links = container.querySelectorAll("a[href]");
    var currentDir = currentPath.includes("/")
      ? currentPath.slice(0, currentPath.lastIndexOf("/") + 1)
      : "";

    links.forEach(function (anchor) {
      var href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) {
        return;
      }

      if (!href.endsWith(".md")) {
        return;
      }

      var resolved = href;
      if (!href.startsWith("/") && currentDir) {
        resolved = currentDir + href;
      }

      resolved = resolved.replace(/^\//, "");
      anchor.setAttribute("href", "#" + resolved);
      anchor.classList.add("doc-link");
    });
  }

  /**
   * Mark the matching table-of-contents entry as active.
   *
   * @param {string} docPath - Normalized markdown path.
   */
  function setActiveTocLink(docPath) {
    var links = document.querySelectorAll(".doc-link");
    links.forEach(function (link) {
      var target = normalizeDocPath(link.getAttribute("data-path") || link.getAttribute("href"));
      if (target === docPath) {
        link.classList.add(ACTIVE_CLASS);
      } else {
        link.classList.remove(ACTIVE_CLASS);
      }
    });
  }

  /**
   * Render markdown text into the content column.
   *
   * @param {string} markdown - Raw markdown source.
   * @param {string} docPath - Source path used for link rewriting.
   */
  function renderMarkdown(markdown, docPath) {
    var container = document.getElementById(CONTENT_ID);
    if (!container) {
      return;
    }

    if (typeof marked === "undefined" || !marked.parse) {
      container.innerHTML = "<p class=\"docs-error\">Markdown renderer failed to load.</p>";
      return;
    }

    var article = document.createElement("article");
    article.innerHTML = marked.parse(markdown);
    rewriteMarkdownLinks(article, docPath);

    container.innerHTML = "";
    container.appendChild(article);
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
        renderMarkdown(markdown, docPath);
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", "#" + docPath);
        }
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
    var toggle = sectionNode.querySelector(":scope > .docs-toc-section-toggle");
    var isCollapsed = sectionNode.classList.toggle(COLLAPSED_CLASS);
    if (toggle) {
      toggle.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
    }
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

    resizer.addEventListener("mousedown", function (event) {
      dragging = true;
      resizer.classList.add(DRAGGING_CLASS);
      event.preventDefault();
    });

    window.addEventListener("mousemove", function (event) {
      if (!dragging) {
        return;
      }
      updateFromPointer(event.clientX);
    });

    window.addEventListener("mouseup", function () {
      dragging = false;
      resizer.classList.remove(DRAGGING_CLASS);
    });

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
  function bootPortal() {
    initTocCollapse();
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