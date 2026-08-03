# Work Page Tag Filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Work page listing case studies (GraphSAST, Forkify QA bug) that visitors can filter by tag, backed by a shared nav and identity-kit stylesheet used across all four pages of the site.

**Architecture:** Plain HTML/CSS/vanilla JS, no build step. A new `assets/style.css` centralizes the identity kit (colors, fonts, nav, cards, filter buttons) that's currently inline in `index.html`. A new `assets/filter.js` implements single-select tag filtering via one delegated click listener and `data-tag`/`data-tags` attributes — no framework, no state library. Each of the four pages (`index.html`, `work.html`, `about.html`, `contact.html`) is a standalone HTML file with its own copy of the nav markup (no templating engine).

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (ES6+, `DOMContentLoaded`, event delegation, `dataset`, `classList`). Verification via a local static server (`python -m http.server`) and the `webapp-testing` skill (Playwright) for interactive checks — dev-time tooling only, not a site dependency.

## Global Constraints

- No JS framework, bundler, or CSS framework — plain HTML/CSS/JS only, no build step, no npm dependencies for the site itself.
- Colors: text `#14171A`, background `#FAFAF7`, main `#1B3A34`, accent `#BA7517`. Heading font Space Grotesk, body font Inter — apply exactly, don't improvise new values.
- Copy tone: direct, technical, clear, no buzzwords, outcome-focused.
- No invented portfolio content — case study copy below is verbatim from the user; do not add metrics, quotes, or details not given.
- Real screenshots only for case study proof, never AI-generated stand-ins. The GraphSAST image is a visible placeholder with a `TODO` comment, not a fake image. The Forkify card has no image at all — deliberate, not a gap.
- Tag filter is single-select: one tag button active at a time (plus `All`), not multi-select OR-matching.
- One page = one HTML file at the repo root, no routing, no templating engine — nav markup is duplicated by hand in each file.
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `style:`).

---

### Task 1: Shared stylesheet + Home page nav

**Files:**
- Create: `assets/style.css`
- Modify: `index.html` (full rewrite — currently a single self-contained file with inline `<style>`)

**Interfaces:**
- Produces (consumed by every later task): CSS custom properties `--text`, `--bg`, `--main`, `--accent`; classes `.site-nav` (nav links, use `aria-current="page"` on the active link), `.hero` (centered hero layout, used by `index.html`, `about.html`, `contact.html`), `.rule` (existing accent divider), `.filter-bar`, `.filter-btn` (with `[aria-pressed="true"]` active state), `.case-study-grid`, `.case-study` (with `.is-hidden` to hide a card), `.case-study .tags`, `.placeholder-image`, and a `main` content-width wrapper.

- [ ] **Step 1: Create `assets/style.css`**

```css
:root {
  --text: #14171A;
  --bg: #FAFAF7;
  --main: #1B3A34;
  --accent: #BA7517;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
}

h1, h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.rule {
  width: 48px;
  height: 3px;
  background: var(--accent);
  margin: 1.25rem 0;
  border: none;
}

/* Nav */
.site-nav {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
}

.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  padding-bottom: 0.25rem;
}

.site-nav a[aria-current="page"] {
  color: var(--main);
  border-bottom: 2px solid var(--accent);
}

/* Hero (Home / About / Contact placeholder layout) */
.hero {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
}

.hero h1 {
  font-size: clamp(2rem, 6vw, 3.5rem);
}

.hero p {
  font-size: 1rem;
  color: #4A4F55;
}

main {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

/* Filter bar */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.filter-btn {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--main);
  border-radius: 999px;
  background: transparent;
  color: var(--main);
  cursor: pointer;
}

.filter-btn[aria-pressed="true"] {
  background: var(--main);
  color: var(--bg);
}

/* Case study grid */
.case-study-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.case-study {
  border: 1px solid #DADDD8;
  border-radius: 8px;
  padding: 1.5rem;
  background: #FFFFFF;
}

.case-study.is-hidden {
  display: none;
}

.case-study .tags {
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.case-study h2 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.case-study h3 {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}

.case-study p {
  font-size: 0.95rem;
  color: #4A4F55;
  line-height: 1.5;
}

.placeholder-image {
  border: 1px dashed #B7BBB6;
  border-radius: 6px;
  padding: 2rem;
  text-align: center;
  color: #7A7F7A;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}
```

- [ ] **Step 2: Rewrite `index.html` to use the shared stylesheet and nav**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Máximo Zuidwijk</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav">
    <a href="index.html" aria-current="page">Home</a>
    <a href="work.html">Work</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="hero">
    <h1>Máximo Zuidwijk</h1>
    <hr class="rule">
    <p>Portfolio — coming soon.</p>
  </div>
</body>
</html>
```

- [ ] **Step 3: Verify in a browser**

Run: `python -m http.server 8000` from the repo root, then use the `webapp-testing` skill (Playwright) to navigate to `http://localhost:8000/index.html`.

Expected:
- Nav bar shows Home, Work, About, Contact; "Home" has an accent-colored underline (`aria-current="page"`).
- "Work", "About", "Contact" links are present but will 404 until later tasks — that's expected at this point.
- Heading "Máximo Zuidwijk" renders in Space Grotesk, body text in Inter, colors match the identity kit (dark green nav text, background `#FAFAF7`).
- No layout shift or visual regression from the previous single-file version — the hero content is still vertically centered.

- [ ] **Step 4: Commit**

```bash
git add assets/style.css index.html
git commit -m "feat: extract shared stylesheet and add site nav to Home page"
```

---

### Task 2: Work page with tag filter

**Files:**
- Create: `assets/filter.js`
- Create: `work.html`

**Interfaces:**
- Consumes: `.filter-bar`, `.filter-btn`, `.case-study`, `.is-hidden` from `assets/style.css` (Task 1).
- Produces: none consumed by later tasks — `about.html`/`contact.html` (Task 3) only reuse the nav markup pattern, not anything from this task.

- [ ] **Step 1: Create `assets/filter.js`**

```js
document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.querySelector('.filter-bar');
  const cards = document.querySelectorAll('.case-study');
  if (!filterBar) return;

  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-btn');
    if (!button) return;

    const tag = button.dataset.tag;

    filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
    });

    cards.forEach((card) => {
      const tags = card.dataset.tags.split(' ');
      const show = tag === 'all' || tags.includes(tag);
      card.classList.toggle('is-hidden', !show);
    });
  });
});
```

- [ ] **Step 2: Create `work.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Work — Máximo Zuidwijk</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav">
    <a href="index.html">Home</a>
    <a href="work.html" aria-current="page">Work</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>

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
        <p class="tags">Security · Automation</p>
        <h2>GraphSAST</h2>

        <!-- TODO: replace with cropped graph + findings screenshot -->
        <div class="placeholder-image" role="img" aria-label="Screenshot pending">Screenshot pending</div>

        <h3>Problem</h3>
        <p>Finding security vulnerabilities by manually reading code or running generic regex scanners is slow and produces endless false positives. Most static analyzers treat code as flat text instead of understanding how data actually flows through execution paths.</p>

        <h3>What I did</h3>
        <p>Designed and built a static security analysis tool that parses source code directly into a custom graph engine before compilation. Modeled the AST as a graph to run data-flow tracing algorithms — tracing untrusted user input directly to sensitive sinks automatically rather than relying on basic pattern matching.</p>

        <h3>What came of it</h3>
        <p>Built a functional developer prototype that highlights the exact execution path of a security flaw, reducing code-level vulnerability detection time and proving that manual QA domain knowledge can be translated into automated developer tooling.</p>
      </article>

      <article class="case-study" data-tags="qa testing">
        <p class="tags">QA · Testing</p>
        <h2>Forkify QA bug</h2>

        <h3>Problem</h3>
        <p>During functional testing of the Forkify recipe app, ingredient quantities entered as "0" vanished from the rendered output — a falsy-value check bug (JS treats 0 as falsy).</p>

        <h3>What I did</h3>
        <p>Traced the bug past the symptom to its root cause instead of just reporting what broke — documented exact repro steps, actual vs. expected, and severity.</p>

        <h3>What came of it</h3>
        <p>Accepted as a confirmed Major defect. Reinforced a pattern now watched for systematically — edge-case values that pass surface testing but break under specific input — the same category of flaw now traced automatically in GraphSAST's data-flow analysis, just at the code level.</p>
      </article>
    </div>
  </main>

  <script src="assets/filter.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify filter behavior in a browser**

Run: with the server from Task 1 still running (or restart `python -m http.server 8000`), use the `webapp-testing` skill (Playwright) to navigate to `http://localhost:8000/work.html`.

Expected, in order:
1. On load: both "GraphSAST" and "Forkify QA bug" cards visible; `All` button has `aria-pressed="true"`, all other buttons `aria-pressed="false"`.
2. Click `Security`: only "GraphSAST" visible, "Forkify QA bug" hidden; `Security` button `aria-pressed="true"`, `All` and others `false`.
3. Click `QA`: only "Forkify QA bug" visible, "GraphSAST" hidden; `QA` button `aria-pressed="true"`.
4. Click `Automation`: only "GraphSAST" visible (same card, different tag — confirms multi-tag `data-tags` parsing works).
5. Click `Testing`: only "Forkify QA bug" visible.
6. Click `All`: both cards visible again; `All` button `aria-pressed="true"`.
7. Keyboard check: `Tab` to a filter button, press `Enter` or `Space` — same filtering behavior as a click (native `<button>` behavior, no extra JS needed, but confirm it actually works).
8. Visual check: GraphSAST card shows the dashed-border "Screenshot pending" placeholder box; Forkify card has no image element at all.

- [ ] **Step 4: Commit**

```bash
git add assets/filter.js work.html
git commit -m "feat: add Work page with single-select tag filter"
```

---

### Task 3: About and Contact stub pages

**Files:**
- Create: `about.html`
- Create: `contact.html`

**Interfaces:**
- Consumes: `.site-nav`, `.hero`, `.rule` from `assets/style.css` (Task 1) — same pattern as `index.html`.
- Produces: none — these are terminal stub pages.

- [ ] **Step 1: Create `about.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About — Máximo Zuidwijk</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav">
    <a href="index.html">Home</a>
    <a href="work.html">Work</a>
    <a href="about.html" aria-current="page">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="hero">
    <h1>About</h1>
    <hr class="rule">
    <p>Coming soon.</p>
  </div>
</body>
</html>
```

- [ ] **Step 2: Create `contact.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact — Máximo Zuidwijk</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <nav class="site-nav">
    <a href="index.html">Home</a>
    <a href="work.html">Work</a>
    <a href="about.html">About</a>
    <a href="contact.html" aria-current="page">Contact</a>
  </nav>
  <div class="hero">
    <h1>Contact</h1>
    <hr class="rule">
    <p>Coming soon.</p>
  </div>
</body>
</html>
```

- [ ] **Step 3: Verify all four pages together in a browser**

Run: with the server still running, use the `webapp-testing` skill (Playwright) to visit `index.html`, `work.html`, `about.html`, `contact.html` in turn, clicking each nav link to move between them.

Expected:
- No 404s — every nav link resolves.
- On each page, the nav link matching the current page has `aria-current="page"` and the accent underline; no other page's link does.
- `about.html` and `contact.html` render the same hero layout/style as `index.html` (just with different heading/copy).
- Returning to `work.html` from another page resets the filter to `All` (expected — no filter state is persisted across navigation, which matches the spec; this is not a bug).

- [ ] **Step 4: Commit**

```bash
git add about.html contact.html
git commit -m "feat: add About and Contact stub pages"
```
