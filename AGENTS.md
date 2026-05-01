# LazyDoc — Agent Instructions

## What is LazyDoc

LazyDoc generates README.md files using AI so non-creative or lazy developers don't have to write them manually. It supports three generation modes, all feeding into a two-step AI pipeline.

### Generation modes

| Mode | Input | How it works |
|------|-------|-------------|
| Prompt | Free text description | User describes the project; AI generates README from that context |
| GitHub URL | Public repo URL | Fetch repo metadata, file tree, dependencies via GitHub API; pass to AI |
| Web URL | Any public URL | Scrape the page with Playwright (TS); pass scraped content to AI |

### Two-step AI pipeline

1. **Intention call** — receives raw context (code, scraped content, or prompt). Returns a structured JSON with extracted intent, architecture, dependencies, and key sections.
2. **Action call** — receives the JSON from step 1. Returns the final formatted README.md markdown.

This split keeps prompt complexity low and the final output high-quality.

---

## Tech stack

- **Next.js 16** with App Router — read `node_modules/next/dist/docs/` before touching routing, layouts, or middleware. APIs differ from older versions.
- **React 19** with React Compiler (`babel-plugin-react-compiler`) — do not manually memoize with `useMemo`/`useCallback` unless there is a documented reason; the compiler handles it.
- **TailwindCSS 4** — no `tailwind.config.js` needed. Use CSS custom properties and `@theme` for customization. Import via `@import "tailwindcss"` in CSS.
- **GSAP 3** — for animations.
- **Playwright** — for web scraping (TypeScript). Lives in `tests/` and will also power the scraping feature.
- **Supabase JS** — auth and database. Client lives in `core/config/supabase.ts`.
- **Zod 4** — schema validation. Lives in `features/<domain>/validation.ts`.
- **React Hook Form (RHF)** — form state. Always pair with `@hookform/resolvers` + Zod schema.

---

## Architecture — Core → Feature → UI/App

```
app/                  # Routes and layouts only — no business logic here
components/           # Pure UI: ui/, layout/, shared/
core/                 # Infrastructure: config/, lib/, utils/
features/             # Business logic by domain (auth, documents, users…)
  └── <domain>/
      ├── actions/    # Next.js Server Actions
      ├── components/ # Domain-specific components
      ├── hooks/      # Domain-specific hooks
      ├── services/   # API or DB calls
      ├── types.ts    # TypeScript interfaces
      └── validation.ts # Zod schemas
hooks/                # Global reusable React hooks
services/             # Global API clients / base fetch logic
store/                # Global state (Zustand or similar)
styles/               # Global CSS and theme variables
types/                # Global TypeScript definitions
```

**Dependency flow:** `core` ← `features` ← `components/app`. Inner layers never import from outer layers.

---

## Naming conventions

### Functions and services

```ts
export async function doSomethingService() { ... }
export async function doSomethingAction() { ... }
export function helperUtil() { ... }
```

### React components

```tsx
export default function ComponentName() {
  return (
    <></>
  )
}
```

No default export for non-component files (services, utils, hooks).

---

## Key rules

- Never put business logic inside `app/` routes — delegate to `features/<domain>/`.
- Server Actions go in `features/<domain>/actions/`, not in route files.
- Zod schemas are the single source of truth for types — derive TypeScript types from them with `z.infer<>`.
- No manual `useMemo`/`useCallback` — React Compiler manages memoization.
- TailwindCSS 4: no config file, use `@theme` in CSS for custom tokens.
- Playwright scraping logic belongs in `features/documents/services/` and uses the Playwright TS API (not the CLI runner).
- GitHub API calls go in `features/documents/services/` — always handle rate limits and private repo errors gracefully.
