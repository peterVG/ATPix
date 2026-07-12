/**
 * R&D overview landing page for ATPix.
 *
 * Presents the project as a research exercise on permissioned data and
 * HappyView fit—not a consumer product brochure.
 *
 * @param {object} options - Render options.
 * @param {HTMLElement} options.mount - DOM node to render into.
 * @param {string} options.happyviewUrl - HappyView App View base URL.
 * @returns {void}
 */
export function renderApp({ mount, happyviewUrl }) {
  mount.innerHTML = `
    <header class="overview-header">
      <p class="overview-eyebrow">R&amp;D exercise · AT Protocol</p>
      <h1>ATPix</h1>
      <p class="overview-lede">
        A research prototype that uses a photo gallery to exercise
        <strong>permissioned data</strong> on AT Protocol and evaluate whether
        <strong>HappyView</strong> is a practical App View for membership-gated
        applications—not a mass-market product launch.
      </p>
    </header>

    <main>
      <section class="overview-section overview-card overview-card--highlight" aria-labelledby="research-question">
        <h2 id="research-question">Research question</h2>
        <p class="overview-question">
          How should applications implement <em>permissioned data</em> on AT Protocol,
          and is the HappyView framework a good fit for real media workloads?
        </p>
        <p>
          ATPix treats a curated photo album as the smallest credible end-to-end
          scenario: blobs on the author&rsquo;s PDS, gated records in a
          <code>ats://</code> space, OAuth membership, invite flows, and index
          isolation from public App View queries.
        </p>
      </section>

      <section class="overview-section" aria-labelledby="premise">
        <h2 id="premise">Premise</h2>
        <p>
          Public atproto repos are world-readable by design. ATP-0016 (Permissioned
          Data) proposes membership-gated containers without client-side encryption.
          HappyView ships an experimental Permissioned Spaces API behind
          <code>feature.spaces_enabled</code>.
        </p>
        <p>
          A gallery app is a demanding but familiar test case: large blobs, rich
          metadata, sharing semantics (public, unlisted, permissioned), and
          expectations around thumbnails, albums, and multi-user access.
        </p>
      </section>

      <section class="overview-section" aria-labelledby="context">
        <h2 id="context">Context</h2>
        <ul>
          <li>
            <strong>Protocol:</strong> AT Protocol records, PDS blobs, OAuth + DPoP,
            <code>com.atpix.gallery.*</code> Lexicons.
          </li>
          <li>
            <strong>Spaces:</strong>
            <a href="https://happyview.dev/experimental/spaces" target="_blank" rel="noopener noreferrer">HappyView Permissioned Spaces</a>
            aligned with
            <a href="https://github.com/bluesky-social/proposals" target="_blank" rel="noopener noreferrer">ATP-0016</a>
            — mandatory validation target for this exercise.
          </li>
          <li>
            <strong>App View:</strong> HappyView handles indexing, Jetstream sync,
            OAuth proxy, and space XRPC; ATPix does not operate a custom App View
            or firehose consumer.
          </li>
          <li>
            <strong>Scope boundary:</strong> No encrypted private albums in v1;
            access control is protocol-native membership gating.
          </li>
        </ul>
      </section>

      <section class="overview-section" aria-labelledby="ecosystem-benefit">
        <h2 id="ecosystem-benefit">Prospective ecosystem benefit</h2>
        <p>
          If the exercise succeeds, the atproto ecosystem gains reproducible
          evidence—not slide-deck assertions—on several open questions:
        </p>
        <ul>
          <li>Whether hybrid storage (public album metadata + space-scoped photos) works in practice.</li>
          <li>How credential, invite, and <code>getBlob</code> flows feel in a media UI.</li>
          <li>Where HappyView&rsquo;s experimental API surface is complete vs. underspecified for app builders.</li>
          <li>What integration tests and BDD scenarios should become reference material for other App Views.</li>
        </ul>
      </section>

      <section class="overview-section" aria-labelledby="value-of-results">
        <h2 id="value-of-results">Value of results</h2>
        <p>Deliverables are intentionally research-oriented:</p>
        <ul>
          <li>Traceable PRD → SRS → BDD coverage for permissioned album lifecycles.</li>
          <li>Walkthrough test logs and Allure reports documenting space scenarios and flag status.</li>
          <li>Documented gaps between HappyView docs and application-layer patterns (e.g. album <code>spaceUri</code> linking).</li>
          <li>Lexicon artifacts (<code>com.atpix.gallery.*</code>) usable by third-party clients regardless of ATPix UI.</li>
        </ul>
      </section>

      <section class="overview-section" aria-labelledby="evolution">
        <h2 id="evolution">Possible evolution</h2>
        <p>
          ATPix may mature into a <strong>reference implementation</strong> for
          permissioned media on HappyView—a codebase other teams can fork, test
          against, and compare with alternative App View strategies. That is an
          outcome of the research, not the starting assumption.
        </p>
        <p>
          A separate path exists toward a fuller gallery product (C2PA provenance,
          discovery feeds, public profiles). Those features support the realism of
          the R&amp;D scenario but are secondary to the permissioned-data validation
          goal.
        </p>
      </section>

      <section class="overview-section overview-card" aria-labelledby="lab-status">
        <h2 id="lab-status">Lab status</h2>
        <p class="overview-status" data-testid="status">
          <strong>Prototype stage.</strong> Sign in with atproto OAuth to exercise
          gallery flows once implemented. HappyView instance required for indexing
          and permissioned space endpoints.
        </p>
        <p data-testid="happyview-url">
          HappyView endpoint: <code>${happyviewUrl}</code>
        </p>
        <nav class="overview-links" aria-label="Project documentation">
          <a href="https://github.com/peterVG/ATPix/blob/main/docs/prd.md" target="_blank" rel="noopener noreferrer">PRD</a>
          <a href="https://github.com/peterVG/ATPix/blob/main/docs/srs.md" target="_blank" rel="noopener noreferrer">SRS</a>
          <a href="https://github.com/peterVG/ATPix/blob/main/docs/plan.md" target="_blank" rel="noopener noreferrer">Implementation plan</a>
          <a href="https://happyview.dev/experimental/spaces" target="_blank" rel="noopener noreferrer">HappyView Spaces docs</a>
        </nav>
      </section>
    </main>
  `;
}