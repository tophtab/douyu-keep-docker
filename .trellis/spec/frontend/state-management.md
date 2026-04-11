# State Management

> How state is managed in this project.

---

## Overview

State is split across three layers:

- Local screen state with `ref()` / `reactive()`
- Global app state with Pinia
- Persisted configuration through Electron IPC or Docker HTTP APIs

There is no dedicated server-state library such as Vue Query. Remote state is fetched on demand and stored in Pinia or component state.

---

## State Categories

- Local state:
  - dialogs, snackbars, validation messages, cron previews
  - examples: `dialog`, `warn`, `cronNext` in `src/renderer/views/jobs/index.vue` and `src/renderer/views/config/index.vue`
- Global state:
  - current user, fan list, running log text, cron-running status
  - examples: `src/renderer/stores/user.ts`, `src/renderer/stores/fans.ts`, `src/renderer/stores/log.ts`, `src/renderer/stores/cronjob.ts`
- Persisted state:
  - desktop config stored through `window.electron.ipcRenderer.invoke('db', ...)`
  - examples: `src/renderer/App.vue`, `src/renderer/views/config/index.vue`

---

## When To Use Global State

Promote state to Pinia when:

- more than one route needs it
- background job progress must survive route changes
- refresh logic should be reusable

Current examples:

- `useLog()` keeps the running job message visible to the jobs page.
- `useLogin()` centralizes account info and gift count.
- `useFans()` shares the parsed fan badge list between config and jobs screens.

---

## Server And Persistence State

- Fetch remote Douyu data directly with `axios`.
- Fetch platform data or persisted config through IPC.
- Do not assume remote data is cached globally unless a store already owns it.
- Normalize persisted config after reading, especially when available fans have changed.

Examples:

- `src/renderer/stores/fans.ts` fetches and sorts the fan list.
- `src/renderer/run/utils.ts` reads config from the desktop store.
- `src/renderer/views/config/index.vue` rebuilds `send` based on the current fans list.

---

## Common Mistakes

- Do not store one-off dialog visibility in a global store.
- Do not duplicate the same fetched data in several stores.
- Do not mutate persisted config without validating cron, number, and percentage rules first.
- Do not forget to refresh global stores after login changes or manual job runs.
