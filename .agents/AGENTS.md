# AGENTS.md

Guidance for AI agents working in this repository. Read this before making changes.

## Overview

A **client-side QR code generator** single-page app (SPA). Users enter text/content,
customize the QR code (colors, style, logo, error-correction), preview it live, and
download it as a PNG. There is **no backend** — all processing happens in the browser.

- **Package manager (source of truth): npm.** See [Package Manager Decision](#package-manager-decision).

## Tech Stack

| Concern        | Choice                                                              |
| -------------- | ------------------------------------------------------------------- |
| Build tool     | Vite 5                                                             |
| UI framework   | React 18 + TypeScript (strict mode)                                |
| State          | Zustand 4                                                          |
| Styling        | Chakra UI v2 **and** Tailwind CSS v4 (PostCSS plugin) — mixed      |
| QR rendering   | `react-qrcode-logo`                                                |
| PNG export     | `html2canvas`                                                      |
| Color picker   | `react-color` (deprecated — see tech debt)                         |
| Lint/Format    | ESLint 8 + Prettier                                                |

## Project Structure

```
qr-code-generator/
├── index.html              # Vite entry HTML; mounts #root
├── vite.config.ts          # Vite config; base path "/qr-code-generator/" (GitHub Pages)
├── tsconfig.json           # TS config (strict, Node module resolution)
├── tsconfig.node.json      # TS config for Vite/Node-side files
├── .eslintrc              # ESLint config (react, ts, a11y, import, prettier)
├── .prettierrc            # Prettier (printWidth 120, singleQuote)
├── postcss.config.js       # Tailwind v4 PostCSS plugin
├── pnpm-workspace.yaml     # NOTE: leftover from pnpm; project now uses npm
├── example.env             # NOTE: misleading — references a non-existent server
├── .github/workflows/      # Deploy.yml (GitHub Pages) + dependabot.yml
└── src/
    ├── main.tsx            # React root, ChakraProvider, ErrorBoundary
    ├── App.tsx             # Composition root: layout, preview, save logic
    ├── index.css           # Tailwind v4 import + base resets
    ├── vite-env.d.ts
    ├── assets/             # Static assets (e.g. react.svg favicon)
    ├── components/         # Presentational + form controls
    │   ├── ImageFileUpload.tsx  # Logo file picker / remover
    │   ├── QrOptions.tsx        # Composes all customization controls
    │   ├── QrChromePicker.tsx   # BG/FG/Eye color picker toggles
    │   ├── QrSelect.tsx         # Dropdown (qrStyle, ecLevel, logoPaddingStyle)
    │   └── QrSlider.tsx         # Slider (eyeRadius, width, height, logoPadding)
    ├── hooks/              # React hooks
    │   ├── useQrValue.tsx        # QR content state + debounced value
    │   └── useDebounceValue.tsx  # Generic debounce hook
    └── store/              # Zustand stores
        ├── useQrOptionStore.ts   # QR style/size/EC options
        ├── useQrColorPicker.ts   # bg/fg/eye colors
        └── useImageUpload.ts     # Logo image (data URL) + name
```

## Architecture & Data Flow

`App.tsx` is the composition root. It reads from four state sources and renders the
live preview via `react-qrcode-logo`'s `<QRCode>`:

```
                ┌─────────────────┐
   text input → │ useQrValue      │ (debounced) ──┐
                └─────────────────┘               │
   color UI   → │ useColorPicker  │ ─────────────┤
                └─────────────────┘               │
   logo UI    → │ useImageUpload  │ ─────────────┤
                └─────────────────┘               │
   options UI → │ useQrOptionStore│ ─────────────┼──→ <QRCode> preview
                └─────────────────┘               │
                                                  │
   Save button → html2canvas(ref) → download PNG ─┘
```

- The QR content (`useQrValue`) is debounced (~400ms) to avoid re-rendering the
  QR on every keystroke.
- `QrOptions.tsx` collects all customization controls (color picker + selects +
  sliders) and renders them into the "Customize" panel.
- Export (`saveAsImage` in `App.tsx`) screenshots the preview node with
  `html2canvas` and triggers a browser download, then shows a native `alert()`.

## State Management

Three Zustand stores, each owning one concern:

- **`useQrOptionStore`** — `qrOptions` (width, height, eyeRadius, logoPadding,
  qrStyle, ecLevel, logoPaddingStyle) + `setQrOption(key, value)`. Numeric vs
  string option keys are typed as `NumericQrOptions` / `StringQrOptions`.
- **`useColorPicker`** — `bgColor`, `fgColor`, `eyeColor` + individual setters.
- **`useImageUploadStore`** — `currentImage` (data URL), `imageName`, and
  `handleImageChange` (FileReader → data URL) / `removeImage`.

Hooks: `useQrValue` (content + debounced value), `useDebounce` (generic debounce).
State is **not** persisted — it resets on reload.

## Conventions

- **TypeScript:** strict mode on; `moduleResolution: Node`; `jsx: react-jsx`.
- **Linting:** ESLint via `.eslintrc` (react, react-hooks, jsx-a11y, import,
  @typescript-eslint, prettier). Unused vars are errors; args prefixed with `_`
  are ignored. `react/react-in-jsx-scope` is off (automatic JSX runtime).
- **Formatting:** Prettier (printWidth 120, singleQuote, trailingComma all, lf).
- **File naming:** PascalCase for components (`QrSlider.tsx`), camelCase for
  hooks/stores (`useQrValue.tsx`, `useQrOptionStore.ts`).
- **Styling:** Chakra UI props are used alongside occasional Tailwind utilities —
  both are active.

## Commands

```bash
npm install        # install dependencies (npm is the source of truth)
npm run dev        # start Vite dev server
npm run build      # tsc typecheck + vite build → dist/
npm run preview    # preview the production build
npm run lint       # eslint . --ext .ts,.tsx
```

## Known Issues / Tech Debt

Documented for future update/fix work. Not yet addressed.

- **`react-color` is deprecated** (unmaintained). Consider `react-colorful`.
- **Chakra UI v2** — v3 is a major rewrite with breaking API changes; upgrading
  later will require component changes.
- **ESLint v8 + `vite-plugin-eslint`** — both deprecated. ESLint 9 uses flat
  config; the Vite ESLint plugin is unmaintained.
- **Unused dependencies:** `axios` (no network calls anywhere) and
  `framer-motion` (no animations used).
- **Unused store methods:** `useImageUploadStore.setImage`, `useColorPicker.setColor`.
- **Export UX:** uses native `alert()` — replace with a Chakra toast/inline message.
- **Misleading `example.env`:** defines `VITE_SERVER_HOSTNAME` / `VITE_SERVER_PORT`
  for a server that does not exist in this client-only app.
- **Broken deploy workflow (`.github/workflows`):** runs `npm install` but no
  `package-lock.json` is committed, and uses outdated actions
  (`actions/checkout@v2`, `actions/setup-node@v2`, `upload-artifact@v2`).
- **Package-manager inconsistency:** `pnpm-lock.yaml` + a "chore: add bun" commit
  coexists with an npm-based deploy. See decision below.

## Package Manager Decision

**npm is the agreed source of truth** for this project.

- The committed `pnpm-lock.yaml` and bun usage are legacy artifacts and should be
  removed in a follow-up migration (generate `package-lock.json`, update the deploy
  workflow to `npm ci`, drop `pnpm-workspace.yaml` and bun references).
- Until that migration is done, prefer `npm` commands and avoid reintroducing pnpm/bun.
