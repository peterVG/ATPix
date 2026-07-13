/**
 * Client-side markdown loader for the ATPix docs portal on GitHub Pages.
 * Fetches static .md files and renders them in the content column.
 */
(function () {
  "use strict";

  var CONTENT_ID = "docs-content";
  var ACTIVE_CLASS = "is-active";
  var MAX_PATH_LENGTH = 256;

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
   * Fetch and display a markdown document.
   *
   * @param {string} rawPath - Requested document path or hash.
   * @returns {Promise<void>}
   */
  function loadDocument(rawPath) {
    var docPath = normalizeDocPath(rawPath);
    var container = document.getElementById(CONTENT_ID);

    if (!docPath) {
      return Promise.resolve();
    }

    if (!container) {
      return Promise.resolve();
    }

    container.innerHTML = "<p class=\"docs-loading\">Loading…</p>";
    setActiveTocLink(docPath);

    var url = buildFetchUrl(docPath);

    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.text();
      })
      .then(function (markdown) {
        renderMarkdown(markdown, docPath);
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", "#" + docPath);
        }
      })
      .catch(function (error) {
        container.innerHTML =
          "<p class=\"docs-error\">Unable to load <code>" +
          docPath +
          "</code>: " +
          error.message +
          "</p>";
      });
  }

  /**
   * Handle table-of-contents and in-content navigation clicks.
   *
   * @param {MouseEvent} event - Click event.
   */
  function handleDocClick(event) {
    var target = event.target;
    if (!target || !target.closest) {
      return;
    }

    var link = target.closest("a.doc-link");
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
   * Load a document from the URL hash on first paint.
   */
  function loadInitialDocument() {
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
    document.addEventListener("DOMContentLoaded", loadInitialDocument);
  } else {
    loadInitialDocument();
  }
})();