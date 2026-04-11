# Quality Guidelines

> Code quality standards for backend development.

---

## Overview

Backend code in this repository is pragmatic TypeScript:

- strict TypeScript is enabled, but `noImplicitAny` is intentionally off in backend tsconfigs
- ESLint extends `@antfu`
- braces are required (`curly`, `brace-style`, `@typescript-eslint/brace-style`)
- `console.log` is allowed

There is no automated backend test suite yet. Quality mainly comes from shared logic reuse, explicit control flow, and manual verification.

---

## Required Patterns

- Reuse `src/core/` logic instead of duplicating the same workflow per runtime.
- Keep runtime entrypoints thin and delegate to helpers.
- Use shared interfaces from `src/core/types.ts` for config and API payloads.
- Return plain JSON from Docker routes and plain Promises from IPC handlers.
- Validate user input at the boundary before mutating config or starting jobs.
- Treat runtime capability assumptions as boundary concerns: Docker root execution, browser API availability, and headless/browser launch flags must be checked where the runtime is assembled.
- Keep failure semantics explicit: do not silently translate upstream request failures into normal-looking domain values such as `0` or empty payloads.

Examples:

- `src/docker/server.ts` validates config before saving it.
- `src/main/ipc.ts` centralizes cron parsing, timer control, and persistence access.
- `src/core/job.ts` owns the workflow for collecting, computing, and sending gifts.

---

## Forbidden Patterns

- Do not duplicate the same Douyu parsing logic in multiple runtimes if it can move to `src/core/`.
- Do not introduce framework-heavy abstractions for simple flows; the project favors direct functions.
- Do not bypass shared types with untyped object literals when a type already exists.
- Do not log or return secret values such as full cookies.
- Do not add fake tests or aspirational quality requirements that the repository does not currently satisfy.

---

## Testing Requirements

Current reality:

- Run TypeScript builds as the primary safety net:
  - `npm run build`
  - `npm run build:docker`
- For desktop features, smoke-test via `npm run dev`
- For Docker features, verify the WebUI can read config, save config, trigger jobs, and fetch logs

If you change shared logic in `src/core/`, verify both desktop and Docker call sites still compile.

---

## Code Review Checklist

- Is shared logic kept in `src/core/` when both runtimes need it?
- Does the change preserve existing config shapes and upgrade old persisted data safely?
- Are boundary inputs validated before scheduling, saving, or triggering jobs?
- Are user-facing error strings actionable?
- Are secrets masked or omitted from logs and responses?
- Does the change preserve the distinction between real empty data and external-call failure?
- If Docker/UI promises a specific timezone or runtime behavior, is that contract actually enforced in code?
