# Quality Guidelines

> Code quality standards for frontend development.

---

## Overview

Frontend quality in this project is based on:

- Vue 3 + TypeScript SFCs
- Pinia for shared state
- Vuetify + UnoCSS for UI structure
- ESLint via `@antfu`
- manual smoke testing, because there is no automated frontend test suite yet

The codebase favors direct, readable view files over heavy abstraction.

---

## Required Patterns

- Use `<script setup lang="ts">` for Vue SFCs.
- Keep cross-screen state in Pinia stores.
- Put long async workflows in helpers or stores instead of bloating templates.
- Reuse shared domain types from `src/core/types.ts`.
- Use the `~` alias for renderer-local imports.

Examples:

- `src/renderer/views/config/index.vue` keeps validation close to the form.
- `src/renderer/views/jobs/index.vue` delegates long-running work to `startJob()` from `src/renderer/run/index.ts`.
- `src/renderer/main.ts` centralizes app bootstrapping for router, Pinia, and Vuetify.

---

## Forbidden Patterns

- Before adding new renderer-side Douyu scraping or request helpers, search `src/renderer/run/utils.ts`, `src/renderer/stores/fans.ts`, and `src/core/api.ts` first. Some cross-runtime duplication already exists because browser-session and server-cookie flows differ; do not add a third variant without a concrete runtime reason.
- Do not move shared state into component-local refs when it is reused by multiple screens.
- Do not introduce a custom UI abstraction layer on top of Vuetify without a clear repeated need.
- Do not break existing Chinese user-facing copy unless there is a product reason to change it.

---

## Testing Requirements

Current expected checks:

- run `npm run build` for the desktop app
- run `npm run build:docker` when shared core or Docker code changed
- smoke-test the modified screen in `npm run dev`

For UI work, manually verify:

- page loads without console-breaking errors
- route navigation still works
- form validation and save flows still behave correctly
- job progress / loading states still update visibly

---

## Code Review Checklist

- Does the screen keep business workflow code out of the template where possible?
- Are Pinia stores used for shared reactive state instead of prop chains?
- Are shared types reused instead of copied?
- Does the change preserve current Vuetify + UnoCSS styling patterns?
- Are loading, error, and success states still visible to the user?
