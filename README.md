# Personal Portfolio — Menon Pranto

Live site: https://watermenon09.github.io/Personal-Portfolio

AI/ML Engineer portfolio — reinforcement learning, Bayesian digital twins, and AI-native RAN optimization on Maveric (Linux Foundation Connectivity). Static site with a dark "Readable Terminal" theme: code aesthetic first, gamified touches second.

## Stack

- [Astro 5](https://astro.build) — fully static, near-zero client JS
- Hand-written CSS (design tokens in `src/styles/global.css`), no UI framework
- JetBrains Mono + Atkinson Hyperlegible (self-hosted via Fontsource)
- GitHub Pages via `.github/workflows/deploy.yml` (deploys on every push to `main`)

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/Personal-Portfolio/
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Editing content

All copy lives in typed data modules — no digging through markup:

| File | Contents |
|---|---|
| `src/data/site.ts` | name, tagline, bios, socials, GA id |
| `src/data/projects.ts` | project cards (title, blurb, metric badge, tags, repo link) |
| `src/data/work.ts` | experience timeline entries and milestone flags |
| `src/data/skills.ts` | skill groups |
| `src/data/seo.ts` | per-page titles and meta descriptions |

## History

The repo began as a fork of [truethari/reactfolio](https://github.com/truethari/reactfolio) (MIT); the current site is a ground-up Astro rebuild (2026). MIT License.
