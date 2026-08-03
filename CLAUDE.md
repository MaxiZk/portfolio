# CLAUDE.md

Context for Claude Code (or any AI assistant) working in this repo.

## What this is

Máximo Zuidwijk's personal portfolio. Four pages: Home, Work, About, Contact. Proof statement: manual QA experience → now builds automated security tooling (GraphSAST thesis).

## Stack

- Plain HTML, CSS, vanilla JS. No framework, no build step, no npm dependencies for the site itself.
- Hosted on GitHub Pages, deployed from `main` at `/root`.
- Chosen deliberately over Astro/Next.js — see `docs/three-roads.md` if present, or the Week 4 FlyRank deliverable: no dynamic features or backend needed yet, so added build tooling has zero payoff.

## Identity kit (apply exactly, don't improvise new values)

- Heading font: Space Grotesk. Body font: Inter.
- Colors: text `#14171A`, background `#FAFAF7`, main `#1B3A34`, accent `#BA7517`.
- Mood: direct and unembellished, like documentation rather than a pitch. Nothing should visually compete with the case study content.

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat:`, `fix:`, `docs:`, `chore:`, `style:`.
- One page = one HTML file at the repo root (no routing, no templating engine).
- Real screenshots for case study proof, never AI-generated stand-ins for actual work — see the Week 3 "Kill Your Darlings" deliverable for the reasoning.
- Copy tone: direct, technical, clear, no buzzwords, outcome-focused (this is the standing voice card — don't drift toward generic marketing language).

## Do not

- Don't introduce a JS framework, bundler, or CSS framework without discussing it first — the whole point of the current stack choice was avoiding that overhead.
- Don't invent portfolio content (metrics, quotes, project details) — ask for the real source first.
