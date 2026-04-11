# Directory Structure

> How backend code is organized in this project.

---

## Overview

This repository has two backend-style runtimes:

- `src/main/`: Electron main-process code for the desktop app
- `src/docker/`: Express-based WebUI and scheduler for Docker deployments
- `src/core/`: Shared business logic used by both runtimes

The important rule is to keep platform-specific wiring out of `src/core/`. If logic can be reused by desktop and Docker, it belongs in `src/core/`.

---

## Directory Layout

```text
src/
├── core/
│   ├── api.ts
│   ├── collect-gift.ts
│   ├── double-card.ts
│   ├── gift.ts
│   ├── job.ts
│   └── types.ts
├── docker/
│   ├── html.ts
│   ├── index.ts
│   ├── logger.ts
│   └── server.ts
└── main/
    ├── db.ts
    ├── ipc.ts
    ├── main.ts
    └── preload.ts
```

---

## Module Organization

- Put Douyu-specific API calls, gift computation, and scheduling logic in `src/core/`.
- Put Electron window lifecycle, IPC registration, tray behavior, and local persistence wiring in `src/main/`.
- Put Docker-only bootstrapping, in-memory logs, config file IO, and Express routes in `src/docker/`.
- Keep shared types in `src/core/types.ts`; both `src/main/` and `src/docker/` import from there.
- Prefer thin entrypoints that assemble dependencies and call shared functions.

Examples:

- `src/docker/index.ts` owns startup, config loading, cron creation, and `AppContext` assembly.
- `src/docker/server.ts` is limited to HTTP route registration and delegates work through `AppContext`.
- `src/main/ipc.ts` registers IPC handlers and delegates persistence or scheduling work to helpers.
- `src/core/job.ts` runs the gift workflow without knowing whether the caller is Electron or Docker.

---

## Naming Conventions

- Use lowercase kebab-free filenames with short nouns: `server.ts`, `logger.ts`, `job.ts`, `gift.ts`.
- Use `index.ts` only for runtime entrypoints such as `src/docker/index.ts`.
- Use verb-first exported function names for actions: `executeKeepaliveJob`, `createServer`, `parseDyAndSidFromCookie`.
- Use interface names in PascalCase and shared aliases in camelCase when the project already does so, for example `DockerConfig`, `JobConfig`, `sendConfig`.

---

## Examples

- Shared business logic: `src/core/job.ts`, `src/core/api.ts`, `src/core/gift.ts`
- Desktop wiring: `src/main/main.ts`, `src/main/ipc.ts`, `src/main/preload.ts`
- Docker runtime wiring: `src/docker/index.ts`, `src/docker/server.ts`, `src/docker/logger.ts`

---

## Anti-Patterns

- Do not put Electron-only APIs such as `BrowserWindow`, `ipcMain`, or `session` into `src/core/`.
- Do not duplicate Douyu API parsing logic across runtimes when it can live in `src/core/api.ts`.
- Do not make route handlers or IPC handlers contain large business workflows; keep those in reusable functions.
