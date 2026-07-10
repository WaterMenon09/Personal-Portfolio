# Portfolio Overhaul Implementation Plan — Corrected Content + Astro Rebuild + "Readable Terminal" Theme

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (user chose inline execution with checkpoints). Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **RESUME PROTOCOL (session break):** The canonical copy of this plan lives at `docs/superpowers/plans/2026-07-10-portfolio-overhaul.md` in the repo (committed in Task 0). On resume: read that file, find the first unchecked box, continue from there. Check boxes off in the REPO copy as you complete steps, and commit the checkbox updates together with each task's commit. Until Task 0 completes, the only copy is `/Users/watermenon/.claude/plans/having-all-the-info-fluffy-meerkat.md`.

**Goal:** Rebuild watermenon09.github.io/Personal-Portfolio as an Astro static site with factually corrected content and a dark "Readable Terminal" theme (code aesthetic + gamified seasoning).

**Architecture:** In-place rebuild on branch `astro-rebuild` (preserves git history, Pages config, URLs). All content in typed TS data modules; pure static `.astro` pages; one small vanilla-JS enhancement script; scoped CSS + one global token sheet. Same routes as today (`/`, `/about/`, `/projects/`, `/contact/`, real 404).

**Tech Stack:** Astro ^5, @astrojs/sitemap, @fontsource-variable/jetbrains-mono, @fontsource/atkinson-hyperlegible. No UI framework, no Tailwind, no FontAwesome.

## Global Constraints

- **Content rules (from user's 2026-07-06 correction round — NON-NEGOTIABLE):**
  - The 45–55% figure is a **pipeline runtime reduction** (linear → multi-threaded). NEVER "ping-pong reduction".
  - Cloudly Copilot: exactly ONE soft platform-knowledge sentence on the About page. No contribution claim, no project card.
  - No "Meta-backed" / "Nvidia-partnered" anywhere. Affiliation is "Maveric (Linux Foundation Connectivity)" only.
  - 5.5× ARM / 18× Intel vectorized-handover figures: user-confirmed as his work (2026-07-10) — keep.
  - Repo slug `MalwareSentinal` is INTENTIONAL and live — do not "fix" the spelling in the URL. Display title stays "MalwareSentinel".
- **Design rules:** no game vocabulary on employment facts (flags say `shipped:`, never "unlocked"); max ONE TerminalWindow per page; never animate the reading path (every scroll position screenshots fully legible); no RPG stat bars; all motion behind `prefers-reduced-motion: no-preference`; WCAG AA contrast minimums per token sheet.
- **Base path:** every hand-written internal link and `public/` asset reference goes through `withBase()` from `src/utils/url.ts`. Internal page links written WITH trailing slash.
- **Commits:** conventional messages, one per task, ending with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`. Never commit to `main` directly; all work on `astro-rebuild`.
- **GA4 ID:** `G-1LHQG831M9`, prod-only, `is:inline`.
- Node 20+, npm. Dev/preview serve under `http://localhost:4321/Personal-Portfolio/`.

---

### Task 0: Branch + persist this plan in the repo

**Files:**
- Create: `docs/superpowers/plans/2026-07-10-portfolio-overhaul.md`
- Create: `/Users/watermenon/.claude/projects/-Users-watermenon-Desktop-Repositories-Personal-Portfolio/memory/durable-implementation-docs.md` (+ index line in `MEMORY.md` in same dir)

- [x] **Step 1:** `git -C /Users/watermenon/Desktop/Repositories/Personal-Portfolio checkout -b astro-rebuild`
- [x] **Step 2:** Copy this entire plan file verbatim to `docs/superpowers/plans/2026-07-10-portfolio-overhaul.md` (create dirs).
- [x] **Step 3:** Commit: `git add docs && git commit -m "docs: add portfolio overhaul implementation plan"`
- [x] **Step 4:** Save memory file `durable-implementation-docs.md` (type: feedback): user wants multi-step work driven from a repo-committed, checkbox-tracked implementation doc so sessions can break and resume without restarting. **Why:** session broke mid-planning on 2026-07-10. **How to apply:** for any multi-task plan, commit the plan doc to the repo first, check boxes as you go. Add index line to `MEMORY.md`.

### Task 1: Strip CRA, scaffold Astro

**Files:**
- Delete: `src/` (entire CRA tree), `public/index.html`, `public/404.html`, `public/back-button.png`, `package-lock.json`
- Create: `package.json` (replace), `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` (stub), `src/utils/url.ts`
- Modify: `.gitignore` (`/build` → `dist/`, add `.astro/`)
- Keep: `public/favicon.ico`, `public/logo.png`, `public/robots.txt` (rewritten Task 10), `public/homepage.jpg`, `public/about.jpg` (moved Task 10), `.github/workflows/deploy.yml` (edited Task 12), `README.md` (updated Task 12)

**Interfaces — Produces:** `withBase(path: string): string`; base config consumed by every later task.

- [x] **Step 1:** Delete the CRA files listed above (`git rm -r src public/index.html public/404.html public/back-button.png`; keep the two JPGs staged where they are for now).
- [x] **Step 2:** Replace `package.json`:

```json
{
  "name": "personal-portfolio",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "license": "MIT",
  "author": "Menon Pranto <menonpranto@gmail.com>",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

Then: `npm install astro@^5 @astrojs/sitemap @fontsource-variable/jetbrains-mono @fontsource/atkinson-hyperlegible`

- [x] **Step 3:** Create `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://watermenon09.github.io",
  base: "/Personal-Portfolio",
  integrations: [sitemap()],
});
```

- [x] **Step 4:** Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [x] **Step 5:** Create `src/utils/url.ts`:

```ts
export const withBase = (path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
```

- [x] **Step 6:** Create stub `src/pages/index.astro`:

```astro
---
---
<html lang="en"><head><title>Menon Pranto</title></head><body><h1>scaffold ok</h1></body></html>
```

- [x] **Step 7:** Update `.gitignore`: replace `/build` line with `dist/` and `.astro/`.
- [x] **Step 8:** Verify: `npm run dev` → open `http://localhost:4321/Personal-Portfolio/` → "scaffold ok". `npm run build` → exits 0, `dist/index.html` exists. Expected: root `/` shows Astro's base-path notice (correct behavior).
- [x] **Step 9:** Commit: `git add -A && git commit -m "feat: replace CRA with Astro scaffold (site+base for GitHub Pages)"`

### Task 2: Data modules — the corrected content

**Files:**
- Create: `src/data/site.ts`, `src/data/seo.ts`, `src/data/projects.ts`, `src/data/work.ts`, `src/data/skills.ts`

**Interfaces — Produces:** `SITE` (name/fullName/tagline/email/gaId/socials/heroBio/aboutParagraphs), `SEO` (per-page `{title, description}`), `PROJECTS: Project[]` with `interface Project { title: string; blurb: string; glyph: string; badge: { label: string; tone: "ok" | "warn" | "info" }; tags: string[]; href: string }`, `WORK: WorkEntry[]` with `interface WorkEntry { company: string; role: string; start: string; end: string; flag?: string; current?: boolean }`, `SKILLS: { group: string; items: string[] }[]`.

- [x] **Step 1:** Create `src/data/site.ts` (Facebook social intentionally dropped; LeetCode included everywhere Socials renders):

```ts
export const SITE = {
  name: "Menon Pranto",
  fullName: "Khandaker Menon Zaman Pranto",
  title: "Menon Pranto · AI/ML Engineer",
  tagline: "AI/ML Engineer · O-RAN & 5G Networks",
  email: "menonpranto@gmail.com",
  gaId: "G-1LHQG831M9",
  socials: {
    github: "https://github.com/WaterMenon09",
    linkedin: "https://www.linkedin.com/in/menon-pranto-9789871a1",
    leetcode: "https://leetcode.com/u/WaterMenon",
  },
  heroBio: {
    doc: "I build self-optimizing 5G networks with reinforcement learning.",
    fields: [
      ["role", '"AI/ML Engineer @ Cloudly IO"'],
      ["work", '"core contributor, Maveric (Linux Foundation)"'],
      ["focus", '["reinforcement learning", "Bayesian digital twins", "O-RAN"]'],
      ["open_to", '"AI/ML engineer roles — research track"'],
      ["location", '"Dhaka, Bangladesh (UTC+6)"'],
    ] as const,
  },
  homeIntro:
    "AI/ML Engineer at Cloudly IO and core contributor to Maveric (Linux Foundation Connectivity). I build production reinforcement-learning agents and Bayesian digital twins for AI-native 5G/6G networks — including the end-to-end PPO-based MRO pipeline, which I re-architected from linear to multi-threaded for a 45–55% runtime reduction, and a vectorized handover protocol that runs 5.5× faster on ARM and 18× on Intel. Started in data annotation and QA, learned what good training data looks like from the ground up, and now ship end-to-end ML pipelines from data sim through xApp/rApp deployment.",
  aboutParagraphs: [
    "I'm an AI/ML Engineer at Cloudly IO and a core contributor to Maveric, the Linux Foundation Connectivity platform for AI-native RAN optimization. My work spans the stack: I built the end-to-end MRO rApp pipeline (PPO-based, re-architected from linear to multi-threaded for a 45–55% runtime cut), hardened the Bayesian digital twin engine's caching and Kafka layers, wrote the 3GPP-compliant golden topology generators in the data simulator, and added observability across all five platform services plus the gateway's admin log plane.",
    "Working day-to-day across the CloudlyNet AI platform, I also know its LangGraph multi-agent copilot architecture well.",
    "I started my career in data annotation and QA, which taught me what production-grade training data actually looks like before I moved into ML engineering. When I'm not at the terminal, I'm reading research — the long-term goal is a role at an AI research lab.",
  ],
} as const;
```

- [x] **Step 2:** Create `src/data/seo.ts`:

```ts
export const SEO = {
  home: {
    title: "Menon Pranto · AI/ML Engineer",
    description:
      "AI/ML Engineer at Cloudly IO and core contributor to Maveric (Linux Foundation Connectivity). Reinforcement learning, Bayesian digital twins, and AI-native 5G/6G networks.",
  },
  about: {
    title: "About | Menon Pranto",
    description:
      "AI/ML engineer building AI-native networks from Bangladesh — RL pipelines, Bayesian digital twins, 3GPP data simulation, and platform observability on Maveric.",
  },
  projects: {
    title: "Projects | Menon Pranto",
    description:
      "Production ML systems: PPO-based RAN optimization, GPyTorch digital twins, 3GPP topology generation, an RL firewall, and more.",
  },
  contact: {
    title: "Contact | Menon Pranto",
    description:
      "Get in touch about AI/ML roles, Maveric, or O-RAN — I respond within 24 hours.",
  },
} as const;
```

- [x] **Step 3:** Create `src/data/projects.ts` (Copilot card REMOVED; FER ADDED with confirmed public repo):

```ts
export interface Project {
  title: string;
  blurb: string;
  glyph: string;
  badge: { label: string; tone: "ok" | "warn" | "info" };
  tags: string[];
  href: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Maveric · rApp Service",
    blurb:
      "Reinforcement-learning service for self-optimizing 5G/6G networks. I built the MRO module end-to-end and re-architected the training pipeline from linear to multi-threaded, cutting runtime by 45–55%. Unified RL harness across MRO, CCO, Energy Saving, and Load Balancing rApps.",
    glyph: "⟳",
    badge: { label: "▲ 45–55% runtime cut", tone: "ok" },
    tags: ["python", "pytorch", "ppo", "o-ran"],
    href: "https://github.com/lf-connectivity/maveric",
  },
  {
    title: "Maveric · Data Simulator",
    blurb:
      "Golden topology generator powering Maveric's rApps. I wrote the 3GPP-compliant golden generators — Hata/UMa/UMi path loss, Gauss-Markov mobility across four UE velocity classes, and ECI computation.",
    glyph: "≋",
    badge: { label: "◆ 3GPP-compliant", tone: "info" },
    tags: ["python", "numpy", "3gpp", "kafka"],
    href: "https://github.com/lf-connectivity/maveric",
  },
  {
    title: "Maveric · Bayesian Digital Twin",
    blurb:
      "GPyTorch Gaussian-process engine for RF propagation prediction. I hardened the serving layer: 3-tier cache (Redis → MongoDB → Postgres), partition-aware exact-offset Kafka commits, and Prometheus-instrumented training histograms.",
    glyph: "σ",
    badge: { label: "◆ 3-tier cache", tone: "info" },
    tags: ["python", "gpytorch", "fastapi", "redis"],
    href: "https://github.com/lf-connectivity/maveric",
  },
  {
    title: "MalwareSentinel",
    blurb:
      "RL-based adaptive firewall with real-time malware detection. Learns from network activity and shares collaborative threat intelligence across devices — ML models and cloud integration designed for fast, device-specific protection.",
    glyph: "⊘",
    badge: { label: "▲ adaptive RL firewall", tone: "warn" },
    tags: ["python", "rl", "security"],
    href: "https://github.com/WaterMenon09/MalwareSentinal",
  },
  {
    title: "Facial Emotion Recognition",
    blurb:
      "Seven-class facial-emotion classifier fine-tuned on FER2013 — ResNet backbone with class-weighted loss for imbalance, test-time augmentation, and multi-GPU training over NCCL.",
    glyph: ":)",
    badge: { label: "◆ 7-class ResNet", tone: "info" },
    tags: ["python", "pytorch", "resnet"],
    href: "https://github.com/WaterMenon09/Facial-Emotion-Recognition",
  },
  {
    title: "VolleyballReferee",
    blurb:
      "Zero-dependency PWA for volleyball referees and scorekeepers. Tracks scores, rotations, substitutions, timeouts, and libero usage in real time with automatic rule enforcement. Vanilla JavaScript.",
    glyph: "0:0",
    badge: { label: "▲ zero dependencies", tone: "ok" },
    tags: ["javascript", "pwa"],
    href: "https://github.com/WaterMenon09/VolleyballReferee",
  },
];
```

- [x] **Step 4:** Create `src/data/work.ts`:

```ts
export interface WorkEntry {
  company: string;
  role: string;
  start: string;
  end: string;
  flag?: string;
  current?: boolean;
}

export const WORK: WorkEntry[] = [
  { company: "Intelligent Machines", role: "Annotation Team Lead", start: "Aug 2019", end: "Sep 2020" },
  { company: "Intelligent Machines", role: "Junior QA Analyst", start: "Oct 2020", end: "Mar 2022" },
  { company: "Cloudly IO", role: "AI/ML Research Intern", start: "Aug 2024", end: "Jan 2025", flag: "shipped: 3GPP golden topology generators" },
  { company: "Cloudly IO", role: "AI/ML Engineer", start: "Feb 2025", end: "now", flag: "shipped: end-to-end MRO rApp pipeline", current: true },
];

export const NEXT_NODE = "next: AI research lab";
```

- [x] **Step 5:** Create `src/data/skills.ts`:

```ts
export const SKILLS = [
  { group: "languages", items: ["Python", "C/C++", "Java", "JavaScript", "SQL"] },
  { group: "ML & RL", items: ["PyTorch", "TensorFlow", "scikit-learn", "Stable-Baselines3", "GPyTorch", "NumPy", "Pandas"] },
  { group: "LLM & agents", items: ["LangGraph", "LangChain", "MCP / fastmcp", "pgvector", "RAG", "Claude API"] },
  { group: "infra & data", items: ["FastAPI", "Kafka", "Docker", "Kubernetes", "AWS (EKS · S3 · Cognito)", "PostgreSQL", "Redis", "MongoDB", "Prometheus", "OpenTelemetry"] },
  { group: "domain", items: ["O-RAN", "3GPP", "Bayesian digital twins", "RL / PPO", "xApp / rApp"] },
] as const;
```

- [x] **Step 6:** Verify content rules: `grep -riE "ping-pong|copilot|meta-backed|nvidia" src/data/` → zero hits except the single allowed Copilot sentence in `site.ts` `aboutParagraphs[1]`. `npm run build` exits 0.
- [x] **Step 7:** Commit: `git commit -am "feat: add corrected content data modules (Copilot claim removed, runtime framing, FER added)"`

### Task 3: Design tokens + global styles

**Files:**
- Create: `src/styles/global.css`

**Interfaces — Produces:** CSS custom properties (`--bg-0/1/2`, `--border`, `--border-bright`, `--text-1/2/3`, `--accent`, `--accent-2`, `--syn-*`, `--ok/--warn/--info/--danger`, `--font-mono`, `--font-sans`), classes `.container`, `.section`, `.section-title`, `.pill`, `.badge`, `.skip-link`, `.cursor`.

- [x] **Step 1:** Create `src/styles/global.css`:

```css
:root {
  --bg-0: #0b0e14; --bg-1: #11151c; --bg-2: #1a2029;
  --border: #232b36; --border-bright: #3b4656;
  --text-1: #e8edf2; --text-2: #a9b4c2; --text-3: #7d8896;
  --accent: #ffb454; --accent-2: #5ccfe6;
  --syn-comment: #7d8896; --syn-string: #aad94c; --syn-key: #5ccfe6;
  --syn-kw: #ffb454; --syn-num: #d2a6ff; --syn-punct: #566070;
  --ok: #7ee787; --warn: #ffb454; --info: #5ccfe6; --danger: #f07178;
  --font-mono: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --font-sans: "Atkinson Hyperlegible", system-ui, -apple-system, "Segoe UI", sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; background: var(--bg-0); color: var(--text-2);
  font-family: var(--font-sans); font-size: 1rem; line-height: 1.65;
}
h1, h2, h3 { font-family: var(--font-mono); color: var(--text-1); line-height: 1.2; }
h1 { font-size: clamp(2rem, 1.2rem + 3vw, 3rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; }
h2 { font-size: clamp(1.25rem, 1rem + 1.2vw, 1.5rem); font-weight: 700; }
h3 { font-size: 1.0625rem; font-weight: 600; line-height: 1.3; }
p { max-width: 68ch; }
a { color: var(--accent-2); text-decoration: none; }
a:hover, a:focus-visible { text-decoration: underline; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
code, pre { font-family: var(--font-mono); }

.container { max-width: 1040px; margin: 0 auto; padding: 0 1.25rem; }
.section { padding: clamp(4rem, 8vh, 6rem) 0 0; }
.section-title { margin: 0 0 1.5rem; }
.section-title::before { content: "## "; color: var(--text-3); }

.pill {
  display: inline-block; padding: 0.15rem 0.6rem; border-radius: 4px;
  background: var(--bg-2); border: 1px solid var(--border);
  font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-2);
}
.badge {
  display: inline-block; padding: 0.15rem 0.55rem; border-radius: 4px;
  font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em;
}
.badge[data-tone="ok"]   { color: var(--ok);   background: color-mix(in srgb, var(--ok) 12%, var(--bg-1));   border: 1px solid color-mix(in srgb, var(--ok) 35%, transparent); }
.badge[data-tone="warn"] { color: var(--warn); background: color-mix(in srgb, var(--warn) 12%, var(--bg-1)); border: 1px solid color-mix(in srgb, var(--warn) 35%, transparent); }
.badge[data-tone="info"] { color: var(--info); background: color-mix(in srgb, var(--info) 12%, var(--bg-1)); border: 1px solid color-mix(in srgb, var(--info) 35%, transparent); }

.skip-link {
  position: absolute; left: -9999px; top: 0; z-index: 100;
  background: var(--bg-2); color: var(--text-1); padding: 0.5rem 1rem; font-family: var(--font-mono);
}
.skip-link:focus { left: 0.5rem; top: 0.5rem; }

.cursor::after { content: "▊"; color: var(--accent); }
@media (prefers-reduced-motion: no-preference) {
  .cursor::after { animation: blink 1.1s steps(2, start) infinite; }
  @keyframes blink { to { visibility: hidden; } }
}

.syn-comment { color: var(--syn-comment); font-style: italic; }
.syn-str { color: var(--syn-string); }
.syn-doc { font-style: italic; }
.syn-key { color: var(--syn-key); }
.syn-kw { color: var(--syn-kw); }
.syn-num { color: var(--syn-num); }
.syn-punct { color: var(--syn-punct); }
```

- [x] **Step 2:** Verify: `npm run build` exits 0 (css not yet imported anywhere — that's Task 4).
- [x] **Step 3:** Commit: `git commit -am "feat: add Readable Terminal design tokens and global styles"`

### Task 4: Site shell — BaseHead, BaseLayout, NavBar, Footer, Socials

**Files:**
- Create: `src/components/BaseHead.astro`, `src/layouts/BaseLayout.astro`, `src/components/NavBar.astro`, `src/components/Footer.astro`, `src/components/Socials.astro`

**Interfaces:**
- Consumes: `withBase`, `SITE`, tokens from Task 3.
- Produces: `<BaseLayout title description ogImage?>` slot wrapper used by every page; `<Socials />`.

- [x] **Step 1:** Create `src/components/BaseHead.astro`:

```astro
---
import { withBase } from "../utils/url";
interface Props { title: string; description: string; ogImage?: string }
const { title, description, ogImage = withBase("og-default.png") } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
const ogImageAbs = new URL(ogImage, Astro.site);
---
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<link rel="icon" href={withBase("favicon.ico")} />
<link rel="sitemap" href={withBase("sitemap-index.xml")} />
<meta name="theme-color" content="#0b0e14" />
<meta property="og:type" content="website" />
<meta property="og:url" content={canonical} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageAbs} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageAbs} />
```

- [x] **Step 2:** Create `src/layouts/BaseLayout.astro`:

```astro
---
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/atkinson-hyperlegible";
import "@fontsource/atkinson-hyperlegible/700.css";
import "@fontsource/atkinson-hyperlegible/400-italic.css";
import "../styles/global.css";
import BaseHead from "../components/BaseHead.astro";
import NavBar from "../components/NavBar.astro";
import Footer from "../components/Footer.astro";
import { SITE } from "../data/site";
interface Props { title: string; description: string; ogImage?: string }
const { title, description, ogImage } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <BaseHead {title} {description} {ogImage} />
    {import.meta.env.PROD && (
      <>
        <script is:inline async src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}></script>
        <script is:inline define:vars={{ gaId: SITE.gaId }}>
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag("js", new Date());
          gtag("config", gaId);
        </script>
      </>
    )}
  </head>
  <body>
    <a class="skip-link" href="#main">skip to content</a>
    <NavBar />
    <main id="main" class="container"><slot /></main>
    <Footer />
    <script src="../scripts/enhancements.ts"></script>
  </body>
</html>
```

(Note: `src/scripts/enhancements.ts` is created in Task 9 — create an empty file `export {};` in this task so the build passes.)

- [x] **Step 3:** Create `src/components/NavBar.astro`:

```astro
---
import { withBase } from "../utils/url";
const path = Astro.url.pathname.replace(/\/$/, "");
const links = [
  { href: withBase("/about/"), label: "about" },
  { href: withBase("/projects/"), label: "projects" },
  { href: withBase("/contact/"), label: "contact" },
];
---
<header class="site-header">
  <nav class="container" aria-label="Main">
    <a class="brand" href={withBase("/")}>~/menon-pranto</a>
    <span class="branch" aria-hidden="true"> — <span data-branch>main <span class="ok">✓</span></span></span>
    <ul>
      {links.map((l) => (
        <li><a href={l.href} aria-current={path === l.href.replace(/\/$/, "") ? "page" : undefined}>{l.label}</a></li>
      ))}
      <li><a href={withBase("resume.pdf")} download>resume</a></li>
    </ul>
  </nav>
</header>
<style>
  .site-header {
    position: sticky; top: 0; z-index: 10; height: 52px;
    background: color-mix(in srgb, var(--bg-0) 92%, transparent);
    backdrop-filter: blur(6px); border-bottom: 1px solid var(--border);
  }
  nav { display: flex; align-items: center; height: 52px; font-family: var(--font-mono); font-size: 0.875rem; }
  .brand { color: var(--text-1); font-weight: 500; }
  .branch { color: var(--text-3); white-space: pre; }
  .ok { color: var(--ok); }
  ul { display: flex; gap: 1.1rem; list-style: none; margin: 0 0 0 auto; padding: 0; }
  ul a { color: var(--text-2); }
  ul a:hover { color: var(--accent-2); text-decoration: none; }
  ul a[aria-current="page"] { color: var(--accent); text-decoration: underline; text-underline-offset: 6px; text-decoration-thickness: 2px; }
  @media (max-width: 480px) { .branch { display: none; } }
</style>
```

- [x] **Step 4:** Create `src/components/Socials.astro`:

```astro
---
import { SITE } from "../data/site";
const entries = [
  ["github", SITE.socials.github],
  ["linkedin", SITE.socials.linkedin],
  ["leetcode", SITE.socials.leetcode],
  ["email", `mailto:${SITE.email}`],
] as const;
---
<ul class="socials">
  {entries.map(([label, href]) => (
    <li><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener">{label}</a></li>
  ))}
</ul>
<style>
  .socials { display: flex; flex-wrap: wrap; gap: 0.4rem 1.25rem; list-style: none; padding: 0; margin: 0; font-family: var(--font-mono); font-size: 0.875rem; }
  .socials a::before { content: "↗ "; color: var(--text-3); }
</style>
```

- [x] **Step 5:** Create `src/components/Footer.astro`:

```astro
---
import Socials from "./Socials.astro";
---
<footer class="container">
  <p class="prompt"><span class="user">menon@dhaka</span>:~$ echo "thanks for scrolling"</p>
  <p class="echo">thanks for scrolling</p>
  <Socials />
  <p class="meta">© 2026 Menon Pranto · built with Astro · <a href="https://github.com/WaterMenon09/Personal-Portfolio" target="_blank" rel="noopener">view source</a></p>
  <p class="exit" aria-hidden="true">[process exited — code 0]</p>
</footer>
<style>
  footer { margin-top: clamp(4rem, 8vh, 6rem); padding-top: 2rem; padding-bottom: 2.5rem; border-top: 1px solid var(--border); font-size: 0.875rem; }
  .prompt { font-family: var(--font-mono); color: var(--text-3); margin: 0; }
  .user { color: var(--accent); }
  .echo { font-family: var(--font-mono); color: var(--text-2); margin: 0.2rem 0 1.25rem; }
  .meta { color: var(--text-3); margin: 1.25rem 0 0.5rem; }
  .exit { font-family: var(--font-mono); color: var(--text-3); font-size: 0.75rem; margin: 0; }
</style>
```

- [x] **Step 6:** Update stub `src/pages/index.astro` to use the layout:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { SEO } from "../data/seo";
---
<BaseLayout title={SEO.home.title} description={SEO.home.description}>
  <h1>shell ok</h1>
</BaseLayout>
```

- [x] **Step 7:** Verify: `npm run build` exits 0. `grep -o '<meta property="og:url" content="[^"]*"' dist/index.html` → contains `/Personal-Portfolio/`. `grep -c 'googletagmanager' dist/index.html` → 1 (prod build). Dev page renders header/footer.
- [x] **Step 8:** Commit: `git commit -am "feat: site shell — BaseHead SEO, layout, titlebar nav, terminal footer"`

### Task 5: TerminalWindow + homepage hero (bio.py)

**Files:**
- Create: `src/components/TerminalWindow.astro`
- Modify: `src/pages/index.astro`

**Interfaces — Produces:** `<TerminalWindow label="bio.py">` (slot). Max ONE per page (global constraint).

- [x] **Step 1:** Create `src/components/TerminalWindow.astro`:

```astro
---
interface Props { label: string }
const { label } = Astro.props;
---
<div class="window">
  <div class="titlebar">
    <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="label">{label}</span>
  </div>
  <div class="body"><slot /></div>
</div>
<style>
  .window { background: var(--bg-1); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; box-shadow: 0 8px 32px rgb(0 0 0 / 0.35); }
  .titlebar { display: flex; align-items: center; gap: 0.75rem; height: 36px; padding: 0 1rem; background: var(--bg-2); border-bottom: 1px solid var(--border); }
  .dots { display: flex; gap: 6px; }
  .dots i { width: 8px; height: 8px; border-radius: 50%; background: color-mix(in srgb, var(--text-3) 40%, transparent); }
  .label { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-3); }
  .body { padding: 1.25rem 1.5rem; }
</style>
```

- [x] **Step 2:** Rewrite `src/pages/index.astro` hero (projects/timeline/skills sections land in Tasks 6–7):

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import TerminalWindow from "../components/TerminalWindow.astro";
import Socials from "../components/Socials.astro";
import { SEO } from "../data/seo";
import { SITE } from "../data/site";

const bioLines = SITE.heroBio.fields
  .map(([k, v]) => {
    const pad = " ".repeat(Math.max(1, 9 - k.length));
    const val = v.startsWith("[")
      ? `<span class="syn-punct">[</span><span class="syn-str">${v.slice(1, -1)}</span><span class="syn-punct">]</span>`
      : `<span class="syn-str">${v}</span>`;
    return `<span class="syn-key">${k}</span>${pad}<span class="syn-punct">=</span> ${val}`;
  })
  .join("\n");
const bioHtml = `<span class="syn-str syn-doc">"""${SITE.heroBio.doc}"""</span>\n\n${bioLines}`;
---
<BaseLayout title={SEO.home.title} description={SEO.home.description}>
  <section class="hero">
    <p class="whoami" aria-hidden="true"><span class="prompt-sign">$</span> <span class="typed cursor">whoami</span></p>
    <h1>{SITE.name}</h1>
    <p class="tagline">{SITE.tagline}</p>
    <TerminalWindow label="bio.py">
      <pre><code set:html={bioHtml} /></pre>
    </TerminalWindow>
    <p class="intro">{SITE.homeIntro}</p>
    <Socials />
  </section>
</BaseLayout>
<style>
  .hero { padding-top: clamp(3rem, 7vh, 5rem); }
  .whoami { font-family: var(--font-mono); color: var(--text-3); margin: 0 0 0.25rem; }
  .prompt-sign { color: var(--accent); }
  h1 { margin: 0 0 0.25rem; }
  .tagline { font-family: var(--font-mono); color: var(--accent); margin: 0 0 2rem; }
  pre { margin: 0; font-size: 0.9375rem; line-height: 1.7; overflow-x: auto; }
  .intro { font-size: 1.125rem; line-height: 1.6; margin: 2rem 0 1.5rem; }
  @media (prefers-reduced-motion: no-preference) {
    .typed { display: inline-block; overflow: hidden; white-space: nowrap; width: 6.5ch; animation: type 0.7s steps(6, end); }
    @keyframes type { from { width: 0; } to { width: 6.5ch; } }
  }
</style>
```

- [x] **Step 3:** Verify in dev: hero shows `$ whoami` (types once), name, amber tagline, one bio.py window with highlighted Python, intro paragraph, socials. Screenshot-check: all facts legible at every scroll position.
- [x] **Step 4:** Verify build + content grep: `npm run build && grep -c "ping-pong" dist/index.html` → 0; `grep -c "45–55% runtime" dist/index.html` → ≥1.
- [x] **Step 5:** Commit: `git commit -am "feat: homepage hero with bio.py terminal window"`

### Task 6: Project cards + projects page

**Files:**
- Create: `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro` (add projects section), Create: `src/pages/projects.astro`

**Interfaces:**
- Consumes: `PROJECTS`, `Project` from `src/data/projects.ts`; `.pill`/`.badge` from global.css.
- Produces: `<ProjectCard project={Project} />`; `.project-grid` class pattern reused on both pages.

- [x] **Step 1:** Create `src/components/ProjectCard.astro`:

```astro
---
import type { Project } from "../data/projects";
interface Props { project: Project }
const { project: p } = Astro.props;
---
<article class="card">
  <div class="head">
    <span class="tile" aria-hidden="true">{p.glyph}</span>
    <h3><a href={p.href} target="_blank" rel="noopener">{p.title}</a></h3>
    <span class="arrow" aria-hidden="true">↗</span>
  </div>
  <span class="badge" data-tone={p.badge.tone}>{p.badge.label}</span>
  <p>{p.blurb}</p>
  <ul class="tags">
    {p.tags.map((t) => <li class="pill">{t}</li>)}
  </ul>
</article>
<style>
  .card { position: relative; display: flex; flex-direction: column; gap: 0.75rem; background: var(--bg-1); border: 1px solid var(--border); border-radius: 6px; padding: 1.25rem; transition: border-color 120ms ease-out, transform 120ms ease-out; }
  .card:hover { border-color: var(--border-bright); transform: translateY(-2px); }
  .card:hover .tile { color: var(--accent); }
  .head { display: flex; align-items: center; gap: 0.75rem; }
  .tile { display: grid; place-items: center; width: 40px; height: 40px; flex: none; background: var(--bg-2); border: 1px solid var(--border); border-radius: 4px; font-family: var(--font-mono); font-size: 18px; color: var(--text-2); transition: color 120ms ease-out; }
  h3 { margin: 0; }
  h3 a { color: var(--text-1); }
  h3 a::after { content: ""; position: absolute; inset: 0; }
  .arrow { margin-left: auto; color: var(--text-3); }
  p { margin: 0; font-size: 0.9375rem; color: var(--text-2); }
  .badge { align-self: flex-start; }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; list-style: none; margin: auto 0 0; padding: 0.75rem 0 0; border-top: 1px solid var(--border); }
  .tags .pill { font-size: 0.75rem; }
</style>
```

- [x] **Step 2:** Add to `src/pages/index.astro` after the hero section:

```astro
  <section class="section" aria-labelledby="projects-h">
    <h2 class="section-title" id="projects-h">projects</h2>
    <div class="project-grid">
      {PROJECTS.map((p) => <ProjectCard project={p} />)}
    </div>
  </section>
```

with imports `import ProjectCard from "../components/ProjectCard.astro";` and `import { PROJECTS } from "../data/projects";`, and page-scoped style:

```css
  .project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
  @media (max-width: 1023px) { .project-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 639px) { .project-grid { grid-template-columns: 1fr; } }
```

- [x] **Step 3:** Create `src/pages/projects.astro` — same grid, standalone page:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import ProjectCard from "../components/ProjectCard.astro";
import { PROJECTS } from "../data/projects";
import { SEO } from "../data/seo";
---
<BaseLayout title={SEO.projects.title} description={SEO.projects.description}>
  <section class="section">
    <h1 class="section-title">projects</h1>
    <p class="lead">Production ML systems and personal builds — every metric on these cards is a real, verified number.</p>
    <div class="project-grid">
      {PROJECTS.map((p) => <ProjectCard project={p} />)}
    </div>
  </section>
</BaseLayout>
<style>
  .lead { font-size: 1.125rem; margin-bottom: 2rem; }
  .project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
  @media (max-width: 1023px) { .project-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 639px) { .project-grid { grid-template-columns: 1fr; } }
</style>
```

- [x] **Step 4:** Verify: dev — 6 cards, glyphs `⟳ ≋ σ ⊘ :) 0:0` render in JetBrains Mono (if `⟳`/`≋`/`⊘` show tofu boxes, swap to fallbacks `↻`, `~`, `×` in `projects.ts`); external links open GitHub in a new tab (this replaces the broken react-router pattern); hover lifts card and ambers the glyph; whole card clickable.
- [x] **Step 5:** Verify: `grep -c "MalwareSentinal" dist/projects/index.html` → ≥1 after `npm run build` (intentional slug preserved); `grep -ci "copilot" dist/projects/index.html` → 0.
- [x] **Step 6:** Commit: `git commit -am "feat: quest-style project cards and projects page"`

### Task 7: XP experience timeline + skills groups

**Files:**
- Create: `src/components/WorkTimeline.astro`, `src/components/SkillGroups.astro`
- Modify: `src/pages/index.astro` (add experience + skills sections)

**Interfaces:**
- Consumes: `WORK`, `NEXT_NODE`, `SKILLS`.
- Produces: `<WorkTimeline />`, `<SkillGroups />` (also used on About in Task 8).

- [x] **Step 1:** Create `src/components/WorkTimeline.astro`:

```astro
---
import { WORK, NEXT_NODE } from "../data/work";
---
<ol class="timeline">
  {WORK.map((w) => (
    <li class:list={["entry", { current: w.current }]}>
      {w.flag && <p class="flag" aria-hidden="true"><span class="flag-icon">⚑</span> {w.flag}</p>}
      <span class="node" aria-hidden="true"></span>
      <div class="meta">
        <span class="company">{w.company}</span>
        <span class="role">{w.role}</span>
        <span class="years">{w.start} – {w.end}</span>
        {w.flag && <span class="visually-hidden">{w.flag}</span>}
      </div>
    </li>
  ))}
  <li class="entry next">
    <span class="node hollow" aria-hidden="true"></span>
    <div class="meta"><span class="role">{NEXT_NODE}</span></div>
  </li>
</ol>
<style>
  .timeline { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 0 1rem; list-style: none; margin: 0; padding: 0; counter-reset: none; }
  .timeline::before { content: ""; position: absolute; left: 0; right: 0; top: calc(100% - 4.5rem); height: 2px; background: linear-gradient(90deg, var(--text-3), var(--accent) 78%, transparent 92%); }
  .entry { position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: 9rem; }
  .flag { font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-2); margin: 0 0 0.75rem; }
  .flag-icon { color: var(--accent); }
  .node { width: 10px; height: 10px; margin-bottom: calc(4.5rem - 2.25rem); transform: rotate(45deg); background: var(--bg-0); border: 2px solid var(--accent); }
  .current .node { background: var(--accent); }
  .hollow { border-color: var(--text-3); border-style: dashed; }
  .meta { display: flex; flex-direction: column; gap: 0.1rem; margin-top: 0.75rem; }
  .company { font-family: var(--font-mono); font-weight: 600; color: var(--text-1); font-size: 0.875rem; }
  .role { font-size: 0.875rem; color: var(--text-2); }
  .years { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.04em; color: var(--text-3); }
  .next .role { font-family: var(--font-mono); color: var(--text-3); }
  .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  @media (max-width: 719px) {
    .timeline { grid-template-columns: 1fr; gap: 1.5rem; padding-left: 1.25rem; }
    .timeline::before { left: 4px; right: auto; top: 0; bottom: 0; width: 2px; height: auto; background: linear-gradient(180deg, var(--text-3), var(--accent) 78%, transparent 92%); }
    .entry { min-height: 0; justify-content: flex-start; }
    .node { position: absolute; left: -1.25rem; top: 0.3rem; margin: 0; }
    .flag { order: 2; margin: 0.35rem 0 0; }
  }
</style>
```

(Positioning values are a starting point — refine by eye in dev so the diamonds sit on the track at all widths. That visual pass is part of this task, not deferred.)

- [x] **Step 2:** Create `src/components/SkillGroups.astro`:

```astro
---
import { SKILLS } from "../data/skills";
---
<div class="skills">
  {SKILLS.map((g) => (
    <section class="group">
      <h3 class="label"># {g.group}</h3>
      <ul>
        {g.items.map((s) => <li class="pill">{s}</li>)}
      </ul>
    </section>
  ))}
</div>
<style>
  .skills { display: flex; flex-direction: column; gap: 1.1rem; }
  .group { display: grid; grid-template-columns: 11rem 1fr; gap: 0.5rem 1rem; align-items: baseline; }
  .label { margin: 0; font-family: var(--font-mono); font-size: 0.875rem; font-weight: 400; font-style: italic; color: var(--syn-comment); }
  ul { display: flex; flex-wrap: wrap; gap: 0.4rem; list-style: none; margin: 0; padding: 0; }
  @media (max-width: 639px) { .group { grid-template-columns: 1fr; } }
</style>
```

- [x] **Step 3:** Add to `src/pages/index.astro` after the projects section (with imports):

```astro
  <section class="section" aria-labelledby="exp-h">
    <h2 class="section-title" id="exp-h">experience</h2>
    <WorkTimeline />
  </section>
  <section class="section" aria-labelledby="skills-h">
    <h2 class="section-title" id="skills-h">skills</h2>
    <SkillGroups />
  </section>
```

- [x] **Step 4:** Verify in dev at 1280px, 768px, 375px: horizontal timeline with gradient track and diamond nodes desktop; vertical rail mobile; `⚑ shipped:` flags only on the two Cloudly entries; dashed hollow node reads `next: AI research lab`; no stat bars anywhere; skills grouped under `# comment` labels.
- [x] **Step 5:** Commit: `git commit -am "feat: XP experience timeline and grouped skill pills"`

### Task 8: About, Contact, 404 pages

**Files:**
- Create: `src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/404.astro`
- Move: `public/about.jpg` → `src/assets/images/about.jpg`; `public/homepage.jpg` → `src/assets/images/homepage.jpg` (kept for possible reuse/OG source)

- [x] **Step 1:** `mkdir -p src/assets/images && git mv public/about.jpg public/homepage.jpg src/assets/images/`
- [x] **Step 2:** Create `src/pages/about.astro` (the one TerminalWindow on this page wraps the prose as `about.md`):

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import TerminalWindow from "../components/TerminalWindow.astro";
import Socials from "../components/Socials.astro";
import WorkTimeline from "../components/WorkTimeline.astro";
import SkillGroups from "../components/SkillGroups.astro";
import { Image } from "astro:assets";
import { SEO } from "../data/seo";
import { SITE } from "../data/site";
import portrait from "../assets/images/about.jpg";
---
<BaseLayout title={SEO.about.title} description={SEO.about.description}>
  <section class="section about">
    <h1 class="section-title">about</h1>
    <TerminalWindow label="about.md">
      <div class="inner">
        <Image src={portrait} alt="Menon Pranto" widths={[320, 480]} sizes="(max-width: 719px) 60vw, 220px" class="portrait" />
        {SITE.aboutParagraphs.map((p) => <p>{p}</p>)}
      </div>
    </TerminalWindow>
    <Socials />
  </section>
  <section class="section" aria-labelledby="exp-h">
    <h2 class="section-title" id="exp-h">experience</h2>
    <WorkTimeline />
  </section>
  <section class="section" aria-labelledby="skills-h">
    <h2 class="section-title" id="skills-h">skills</h2>
    <SkillGroups />
  </section>
</BaseLayout>
<style>
  .inner p { margin: 0 0 1rem; }
  .inner p:last-child { margin-bottom: 0; }
  .about :global(.portrait) { float: right; width: 220px; height: auto; margin: 0 0 1rem 1.5rem; border-radius: 6px; border: 1px solid var(--border); }
  .about > :global(.socials) { margin-top: 1.5rem; }
  @media (max-width: 719px) { .about :global(.portrait) { float: none; display: block; margin: 0 auto 1.25rem; } }
</style>
```

- [x] **Step 3:** Create `src/pages/contact.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Socials from "../components/Socials.astro";
import { withBase } from "../utils/url";
import { SEO } from "../data/seo";
import { SITE } from "../data/site";
---
<BaseLayout title={SEO.contact.title} description={SEO.contact.description}>
  <section class="section">
    <h1 class="section-title">contact</h1>
    <p class="lead">
      The fastest way to reach me is email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      I respond within 24 hours. AI/ML roles, Maveric, O-RAN, or anything on this site — all welcome.
    </p>
    <p>Prefer a document? <a href={withBase("resume.pdf")} download>Download my resume (PDF)</a>.</p>
    <Socials />
  </section>
</BaseLayout>
<style>
  .lead { font-size: 1.125rem; }
  section > :global(.socials) { margin-top: 2rem; }
</style>
```

- [x] **Step 4:** Create `src/pages/404.astro` (the `ls` output lines ARE the nav):

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import TerminalWindow from "../components/TerminalWindow.astro";
import { withBase } from "../utils/url";
---
<BaseLayout title="404 | Menon Pranto" description="Page not found.">
  <section class="wrap">
    <TerminalWindow label="404.sh">
      <pre class="shell"><code><span class="prompt">$</span> cd {Astro.url.pathname}
<span class="err">zsh: no such file or directory</span>
<span class="prompt">$</span> ls ~/menon-pranto
<a href={withBase("/")}>home/</a>   <a href={withBase("/about/")}>about.md</a>   <a href={withBase("/projects/")}>projects/</a>   <a href={withBase("/contact/")}>contact.sh</a>
<span class="prompt">$</span> <span class="cursor"></span></code></pre>
    </TerminalWindow>
  </section>
</BaseLayout>
<style>
  .wrap { max-width: 560px; margin: 0 auto; padding-top: clamp(4rem, 15vh, 8rem); }
  .shell { margin: 0; line-height: 1.9; }
  .prompt { color: var(--accent); }
  .err { color: var(--danger); }
</style>
```

- [x] **Step 5:** Verify: `npm run build` → `dist/404.html`, `dist/about/index.html`, `dist/contact/index.html` exist; 404's links contain `/Personal-Portfolio/` (`grep -c 'href="/Personal-Portfolio/' dist/404.html` → ≥4 — this fixes the old escape-the-basename bug); `grep -ci "copilot" dist/about/index.html` → exactly 1; portrait emitted as optimized asset in `dist/_astro/` (webp, well under 296KB).
- [x] **Step 6:** Commit: `git commit -am "feat: about, contact, and 404.sh pages"`

### Task 9: Enhancements — konami egg + timeline reveal

**Files:**
- Modify: `src/scripts/enhancements.ts` (replace the empty stub from Task 4)
- Modify: `src/styles/global.css` (append `.reveal` + toast styles)

- [ ] **Step 1:** Replace `src/scripts/enhancements.ts`:

```ts
// Timeline reveal — the only IntersectionObserver on the site.
const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
if (motionOK) {
  const items = document.querySelectorAll(".timeline .entry");
  if (items.length) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.4 },
    );
    items.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 60}ms`;
      io.observe(el);
    });
  }
}

// Konami: ↑↑↓↓←→←→BA → achievement toast + branch flip. Never touches content.
const SEQ = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let pos = 0;
window.addEventListener("keydown", (e) => {
  pos = e.key === SEQ[pos] ? pos + 1 : e.key === SEQ[0] ? 1 : 0;
  if (pos !== SEQ.length) return;
  pos = 0;
  const branch = document.querySelector("[data-branch]");
  if (branch) branch.innerHTML = 'main <span style="color:var(--danger)">✗ cheats-enabled</span>';
  if (document.querySelector(".toast")) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = 'achievement unlocked: konami — mail menonpranto@gmail.com with subject "konami" for +1 reply priority';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 9000);
});
export {};
```

- [ ] **Step 2:** Append to `src/styles/global.css`:

```css
@media (prefers-reduced-motion: no-preference) {
  .timeline .entry { opacity: 0; transform: translateY(8px); transition: opacity 200ms ease-out, transform 200ms ease-out; }
  .timeline .entry.in-view { opacity: 1; transform: none; }
}
.toast {
  position: fixed; bottom: 1.25rem; left: 50%; transform: translateX(-50%);
  max-width: min(92vw, 46rem); padding: 0.75rem 1.25rem; z-index: 50;
  background: var(--bg-2); border: 1px solid var(--accent); border-radius: 6px;
  font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-1);
}
```

- [ ] **Step 3:** Verify in dev: timeline entries fade in with stagger on scroll; konami code shows toast + flips header to `main ✗ cheats-enabled`; with DevTools reduced-motion emulation, entries are fully visible immediately and nothing animates. Confirm `dist/_astro/` gains exactly one small JS file on build.
- [ ] **Step 4:** Commit: `git commit -am "feat: timeline reveal and konami achievement toast"`

### Task 10: SEO plumbing — JSON-LD, robots.txt, sitemap check

**Files:**
- Modify: `src/pages/index.astro` (JSON-LD), `public/robots.txt` (replace)

- [ ] **Step 1:** Add to `src/pages/index.astro` (inside BaseLayout slot, anywhere top-level):

```astro
  <script type="application/ld+json" is:inline set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    alternateName: SITE.fullName,
    jobTitle: "AI/ML Engineer",
    worksFor: { "@type": "Organization", name: "Cloudly IO" },
    email: `mailto:${SITE.email}`,
    url: "https://watermenon09.github.io/Personal-Portfolio/",
    sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.leetcode],
  })} />
```

- [ ] **Step 2:** Replace `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://watermenon09.github.io/Personal-Portfolio/sitemap-index.xml
```

- [ ] **Step 3:** Verify: `npm run build`; `cat dist/sitemap-0.xml` → every `<loc>` starts `https://watermenon09.github.io/Personal-Portfolio/` (known site+base footgun — if base is missing, entries are wrong: fix before proceeding); `grep -c 'application/ld+json' dist/index.html` → 1.
- [ ] **Step 4:** Commit: `git commit -am "feat: JSON-LD person schema, robots.txt with sitemap"`

### Task 11: OG image + phone-stripped resume

**Files:**
- Create: `public/og-default.png` (1200×630), `public/resume.pdf`
- Scratch: `<scratchpad>/og.html`, `<scratchpad>/resume-web.html`

- [ ] **Step 1:** Write `<scratchpad>/og.html` — a 1200×630 card using the theme (inline CSS, same tokens): bg `#0b0e14`, a single terminal window with `~/menon-pranto` titlebar, inside: `$ whoami` in `#7d8896`, "Menon Pranto" in 72px JetBrains-Mono-fallback monospace `#e8edf2`, "AI/ML Engineer · O-RAN & 5G Networks" in `#ffb454`, footer line `github.com/WaterMenon09` in `#7d8896`.
- [ ] **Step 2:** Render: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot="$PWD/public/og-default.png" --window-size=1200,630 --hide-scrollbars "file://<scratchpad>/og.html"` (fallback: Playwright MCP — navigate, resize 1200×630, screenshot). Verify: file is 1200×630 (`sips -g pixelWidth -g pixelHeight public/og-default.png`).
- [ ] **Step 3:** Resume: copy `/Users/watermenon/Desktop/Repositories/career-ops/output/cv-khandaker-menon-zaman-pranto-generic.html` to scratchpad as `resume-web.html`; Edit out the phone number from the header contact line (keep email, LinkedIn, GitHub); render: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --print-to-pdf="$PWD/public/resume.pdf" "file://<scratchpad>/resume-web.html"`. If the generic HTML is missing or stale, regenerate via career-ops `generate-pdf.mjs` first, then strip the phone.
- [ ] **Step 4:** Verify: `pdftotext public/resume.pdf - | grep -E "[0-9]{10,}|\+880"` → NO output (phone gone); `pdftotext public/resume.pdf - | grep -c "menonpranto@gmail.com"` → ≥1; PDF is 2 pages A4. Also `npm run build` and confirm `curl -s http://localhost:4321/Personal-Portfolio/resume.pdf -o /dev/null -w "%{http_code}"` → 200 under `npm run preview`.
- [ ] **Step 5:** Commit: `git add public/og-default.png public/resume.pdf && git commit -m "feat: og image and phone-stripped resume PDF"`

### Task 12: Deploy workflow + README

**Files:**
- Modify: `.github/workflows/deploy.yml:37` (`path: build` → `path: dist`)
- Modify: `README.md` (rewrite: Astro stack, dev commands, structure; keep MIT license + a one-line note that the repo's history began as a reactfolio fork)

- [ ] **Step 1:** Edit `deploy.yml` upload step to `path: dist`. Nothing else changes (flow is already the modern Pages-artifact pipeline).
- [ ] **Step 2:** Rewrite `README.md`: title, live URL, stack (Astro 5, static, GitHub Pages), `npm install` / `npm run dev` / `npm run build`, content-editing pointers (`src/data/*.ts`), license.
- [ ] **Step 3:** Commit: `git commit -am "chore: point Pages deploy at dist, refresh README for Astro"`

### Task 13: Verification gate (BLOCKS merge — user checkpoint)

- [ ] **Step 1:** `npm run build && npm run preview`, then against `http://localhost:4321/Personal-Portfolio/`:
  - Every nav link + resume link works; every project card opens the right GitHub repo in a new tab.
  - `view-source` all four pages: correct per-page title/description/canonical/OG.
  - Bogus path shows the 404.sh page with working links.
- [ ] **Step 2:** Content-accuracy greps over `dist/` (these prove the corrections shipped):
  - `grep -ri "ping-pong" dist/ | grep -v ".map"` → 0 hits
  - `grep -ri "copilot" dist/ | grep -v ".map" | wc -l` → hits only from `dist/about/index.html` (the single sentence)
  - `grep -riE "meta-backed|nvidia" dist/ | grep -v ".map"` → 0 hits
  - `grep -ri "45–55% runtime\|45-55% runtime" dist/index.html` → ≥1
- [ ] **Step 3:** `ls dist/_astro/*.js | wc -l` → 1; total JS < 5KB. Run Lighthouse (Chrome DevTools or `npx lighthouse http://localhost:4321/Personal-Portfolio/ --view`): targets ≥95 performance / accessibility / SEO. Fix regressions before proceeding.
- [ ] **Step 4:** Reduced-motion pass (DevTools emulation): zero animation, all content visible. Keyboard pass: tab through home — skip link appears first, focus rings visible on all interactive elements.
- [ ] **Step 5:** Screenshot all four pages + 404 at 1280px and 375px (Playwright MCP) and show the user. **CHECKPOINT: user approves visuals before merge.**
- [ ] **Step 6:** Commit any fixes: `git commit -am "fix: verification-gate fixes"`

### Task 14: Merge, deploy, post-deploy, log

- [ ] **Step 1:** After user approval: `git checkout main && git merge --no-ff astro-rebuild -m "feat: Astro rebuild with corrected content and Readable Terminal theme"` and `git push origin main`. Watch the Actions run (`gh run watch`).
- [ ] **Step 2:** Post-deploy checks:
  - `curl -s -o /dev/null -w "%{http_code}" https://watermenon09.github.io/Personal-Portfolio/` → 200 (repeat for `about/`, `projects/`, `contact/`, `resume.pdf`)
  - `curl -s -o /dev/null -w "%{http_code}" https://watermenon09.github.io/Personal-Portfolio/nonexistent` → 404 (styled page)
  - Paste the home URL into opengraph.xyz — card shows the terminal OG image.
  - GA4 realtime shows the visit.
- [ ] **Step 3:** Resubmit sitemap in Google Search Console (user action if auth needed — hand over the URL `https://watermenon09.github.io/Personal-Portfolio/sitemap-index.xml`).
- [ ] **Step 4:** Vault logging (per global CLAUDE.md): append worklog entry to `01-Projects/personal-portfolio/personal-portfolio.md` (Did/Decisions/Learned/Next/Links) and create decision notes `decisions/rebuild-cra-to-astro.md` + `decisions/readable-terminal-theme.md` from `_templates/decision.md`, linked from the hub's Key decisions. Note in the worklog that the portfolio now matches the 2026-07-06 corrected record.
- [ ] **Step 5:** Delete the merged branch: `git branch -d astro-rebuild`.

---

## Self-review notes (done at plan time)

- Spec coverage: content corrections (Task 2), theme (Tasks 3–9), robustness/SEO (Tasks 4, 10), resume (Task 11), deploy (Tasks 12, 14), verification (Task 13). Copilot-soft-sentence user decision honored in `aboutParagraphs[1]`.
- Type consistency: `Project`/`WorkEntry` interfaces defined once (Task 2) and consumed by name in Tasks 6–7; `withBase` defined Task 1, used everywhere.
- Known judgment calls for the executor: timeline CSS positioning needs an eye-tune pass (explicitly in Task 7 Step 4); glyph fallbacks listed in Task 6 Step 4; `sips`/`pdftotext` availability (both present on macOS; poppler installed per career-ops worklog 05-Jul-2026).
