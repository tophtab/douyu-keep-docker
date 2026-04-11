# Hook Guidelines

> How reusable stateful logic is handled in this project.

---

## Overview

This is a Vue project, so there are no React hooks.
The closest equivalents are:

- Pinia stores in `src/renderer/stores/`
- renderer helper modules in `src/renderer/run/`
- simple local `ref` / `reactive` usage inside view components

When this repository talks about reusable stateful logic, prefer those patterns instead of inventing a separate composables layer unless there is clear repeated behavior.

---

## Reusable Logic Patterns

- Use a Pinia store when multiple routes need the same reactive state.
- Use `run/` helpers for async workflows and side-effect-heavy procedures.
- Keep one-off validation or screen-only state inside the view component.

Examples:

- `src/renderer/stores/user.ts` encapsulates login/user state and refresh behavior.
- `src/renderer/stores/fans.ts` encapsulates fan list loading and loading status.
- `src/renderer/run/index.ts` contains the multi-step gift workflow instead of placing it in a page.
- `src/renderer/run/utils.ts` contains renderer-side async helpers for IPC and HTTP calls.

---

## Data Fetching

- Data fetching is done directly with `axios` or IPC invocations.
- Requests usually happen inside Pinia actions or view initialization functions.
- Loading flags are explicit `ref<boolean>` values in stores.

Examples:

- `src/renderer/stores/fans.ts` fetches the Douyu fans list and toggles `loading`.
- `src/renderer/stores/user.ts` fetches both the current gift count and profile info.
- `src/renderer/views/config/index.vue` fetches cron preview data through `window.electron.ipcRenderer.invoke('cron', ...)`.

---

## Naming Conventions

- Pinia store factories use `useXxx` naming: `useLogin`, `useFans`, `useLog`, `useCronStatus`.
- Store ids are short lowercase strings such as `'user'`, `'fans'`, and `'log'`.
- Async store methods use verb-based names like `getUser()` and `getFansList()`.

---

## Common Mistakes

- Do not create a new composable/store when the logic is only used once in one screen.
- Do not destructure store state directly without `storeToRefs()` when reactivity matters.
- Do not hide loading or error transitions; keep them explicit in store state or component state.
