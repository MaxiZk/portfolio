# Work page with tag filter — design

## Context

The repo currently has only `index.html`, a "coming soon" placeholder (per README's prior status note: "empty-but-live page deployed... full build in progress"). `work.html`, `about.html`, and `contact.html` don't exist yet. This spec covers building the Work page with a tag filter, plus the minimum surrounding structure (shared nav, stub pages) needed so the new page doesn't link to 404s.

## Goals

- A Work page listing case studies as cards, filterable by tag.
- A shared nav bar (Home / Work / About / Contact) present on all four pages.
- Stub About and Contact pages so nav links resolve.
- No invented case study content — copy below is user-provided, verbatim in structure.
- No build step, no framework, no templating engine (per CLAUDE.md).

## Non-goals

- Full content/design for About and Contact pages (stubs only — "Coming soon", matching identity kit).
- Multi-select tag filtering (single-select is sufficient for 2 case studies / 4 tags today).
- Any image asset for the Forkify QA case study (deliberately text-only).
- Producing the actual GraphSAST screenshot (placeholder + TODO comment only).

## File structure

```
/
├── index.html          # Home — updated to use shared nav + assets/style.css
├── work.html            # NEW — case studies + tag filter
├── about.html            # NEW — stub
├── contact.html          # NEW — stub
└── assets/
    ├── style.css        # NEW — identity kit, nav, card, filter-button styles
    └── filter.js         # NEW — tag filter logic
```

`style.css` centralizes what's currently inline in `index.html`'s `<style>` block, since all four pages now share the same identity kit and nav. No templating engine is introduced — each HTML file still contains its own full markup, including a hand-duplicated nav block.

## Nav bar

Same markup block on all four pages, e.g.:

```html
<nav class="site-nav">
  <a href="index.html">Home</a>
  <a href="work.html" aria-current="page">Work</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
```

The current page's link gets `aria-current="page"` and a distinct visual style (accent underline or similar, per identity kit).

## Work page structure

```html
<nav class="site-nav">...</nav>

<main>
  <h1>Work</h1>

  <div class="filter-bar" role="group" aria-label="Filter case studies by tag">
    <button type="button" class="filter-btn" data-tag="all" aria-pressed="true">All</button>
    <button type="button" class="filter-btn" data-tag="security" aria-pressed="false">Security</button>
    <button type="button" class="filter-btn" data-tag="automation" aria-pressed="false">Automation</button>
    <button type="button" class="filter-btn" data-tag="qa" aria-pressed="false">QA</button>
    <button type="button" class="filter-btn" data-tag="testing" aria-pressed="false">Testing</button>
  </div>

  <div class="case-study-grid">
    <article class="case-study" data-tags="security automation">
      <!-- GraphSAST card -->
    </article>
    <article class="case-study" data-tags="qa testing">
      <!-- Forkify QA bug card -->
    </article>
  </div>
</main>

<script src="assets/filter.js"></script>
```

Tag button order: `All` first, then tags in the order they were introduced (Security, Automation, QA, Testing) — this matches the order the case studies were given, not alphabetical.

## Filter behavior (single-select)

- Default state: `All` active, every `.case-study` card visible.
- Clicking a tag button:
  - Sets `aria-pressed="true"` on the clicked button, `false` on all others (including `All`).
  - Shows only `.case-study` cards whose `data-tags` (space-separated) includes the clicked tag; hides the rest via `style.display = 'none'`.
- Clicking `All` resets to the default state.
- Implementation: plain vanilla JS in `assets/filter.js`, no dependencies, attaches a single click listener via event delegation on `.filter-bar`.

## Case study card content

### GraphSAST (tags: security, automation)

- **Problem:** Finding security vulnerabilities by manually reading code or running generic regex scanners is slow and produces endless false positives. Most static analyzers treat code as flat text instead of understanding how data actually flows through execution paths.
- **What I did:** Designed and built a static security analysis tool that parses source code directly into a custom graph engine before compilation. Modeled the AST as a graph to run data-flow tracing algorithms — tracing untrusted user input directly to sensitive sinks automatically rather than relying on basic pattern matching.
- **What came of it:** Built a functional developer prototype that highlights the exact execution path of a security flaw, reducing code-level vulnerability detection time and proving that manual QA domain knowledge can be translated into automated developer tooling.
- **Image:** placeholder `<img>` (or styled `<div>` if no placeholder image file is added) with visible alt text like "Screenshot pending" and an HTML comment `<!-- TODO: replace with cropped graph + findings screenshot -->`. Not an AI-generated stand-in — an explicit, visible placeholder per CLAUDE.md's real-screenshots-only rule.

### Forkify QA bug (tags: qa, testing)

- **Problem:** During functional testing of the Forkify recipe app, ingredient quantities entered as "0" vanished from the rendered output — a falsy-value check bug (JS treats 0 as falsy).
- **What I did:** Traced the bug past the symptom to its root cause instead of just reporting what broke — documented exact repro steps, actual vs. expected, and severity.
- **What came of it:** Accepted as a confirmed Major defect. Reinforced a pattern now watched for systematically — edge-case values that pass surface testing but break under specific input — the same category of flaw now traced automatically in GraphSAST's data-flow analysis, just at the code level.
- **Image:** none. Deliberate — access to the original ticket and environment ended with the internship, so this case study is text-only by choice, not a gap. No placeholder markup for this card.

## Styling

- Identity kit applied via CSS custom properties already established in `index.html`: text `#14171A`, background `#FAFAF7`, main `#1B3A34`, accent `#BA7517`; Space Grotesk for headings, Inter for body.
- Filter buttons: pill/tab style, active state uses `--main` background with light text (or `--accent` underline — final call made during implementation to match the "documentation, not pitch" mood).
- Case study grid: responsive, single column on narrow viewports, two columns on wider ones — CSS grid with `auto-fit`/`minmax`, no JS-driven layout.

## Testing

- Manual verification in a browser (dev server or direct file open): each tag button correctly isolates its case study; `All` restores both; `aria-pressed` state updates correctly; keyboard-only operation (Tab + Enter/Space) works on filter buttons.
- No automated test suite exists for this static site — manual QA is the verification method, consistent with the project's current state.

## Open questions

None — all prior open questions were resolved during brainstorming (nav scope: full 4-page nav; filter logic: single-select).
