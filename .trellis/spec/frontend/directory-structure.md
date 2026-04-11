# Directory Structure

> How frontend code is organized in this project.

---

## Overview

The frontend is a Vue 3 application under `src/renderer/`. It uses:

- Vue single-file components
- Vue Router with hash history
- Pinia for app-wide state
- Vuetify for component primitives
- UnoCSS utility classes for layout and spacing

Feature code is grouped by concern rather than by deep domain modules.

---

## Directory Layout

```text
src/renderer/
├── App.vue
├── layout/
│   └── index.vue
├── router/
│   └── index.ts
├── run/
│   ├── index.ts
│   └── utils.ts
├── stores/
│   ├── cronjob.ts
│   ├── fans.ts
│   ├── index.ts
│   ├── log.ts
│   └── user.ts
├── typings/
│   ├── electron.d.ts
│   └── shims-vue.d.ts
└── views/
    ├── about/index.vue
    ├── config/index.vue
    ├── jobs/index.vue
    └── login/index.vue
```

---

## Module Organization

- Put route pages in `views/<feature>/index.vue`.
- Put app shell UI in `layout/`.
- Put global stores in `stores/`.
- Put long-running task orchestration and renderer-side API helpers in `run/`.
- Put shared renderer typings in `typings/`.

Examples:

- `src/renderer/views/jobs/index.vue` is the main dashboard page.
- `src/renderer/views/config/index.vue` owns configuration editing UI and validation.
- `src/renderer/run/index.ts` contains the job execution flow rather than embedding it inside a component.
- `src/renderer/stores/index.ts` re-exports store factories for simple imports like `~/stores`.

---

## Naming Conventions

- Use lowercase directories and `index.vue` for view entry files.
- Use lowercase TypeScript filenames for stores and helper modules: `user.ts`, `fans.ts`, `utils.ts`.
- Use the `~` alias for renderer-local imports.
- Use relative imports for shared modules outside `src/renderer/`, for example `../../core/types`.
- Keep view names aligned with route paths where possible: `/jobs` -> `views/jobs/index.vue`.

---

## Examples

- App bootstrap: `src/renderer/main.ts`, `src/renderer/App.vue`
- Routing and shell: `src/renderer/router/index.ts`, `src/renderer/layout/index.vue`
- Stateful modules: `src/renderer/stores/user.ts`, `src/renderer/stores/fans.ts`

---

## Anti-Patterns

- Do not put large job workflows directly in page components when they can live in `run/`.
- Do not create deep component trees for simple pages; the current app favors view-local markup.
- Do not import renderer modules with long relative paths when the `~` alias is available.
