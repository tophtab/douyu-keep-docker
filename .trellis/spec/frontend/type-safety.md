# Type Safety

> Type safety patterns in this project.

---

## Overview

The project uses TypeScript across renderer, Electron main, Docker, and shared core modules.
The renderer is configured with `strict: true`, and shared domain types live in `src/core/types.ts`.

Runtime validation is mostly manual. There is no schema validation library such as Zod.

---

## Type Organization

- Put cross-runtime domain types in `src/core/types.ts`.
- Re-export shared types from renderer-facing modules when that improves ergonomics.
- Define small UI-only interfaces next to the store or component that owns them.

Examples:

- `src/core/types.ts` defines `Fans`, `SendGift`, `Config`, `DockerConfig`, `JobConfig`, and `Logger`.
- `src/renderer/stores/fans.ts` re-exports `Fans`, `SendGift`, `Config`, and `sendConfig`.
- `src/renderer/stores/user.ts` defines a local `User` interface because it is renderer-specific.

---

## Validation

- Use explicit runtime checks instead of schema libraries.
- Validate persisted config before saving or scheduling.
- Parse external responses defensively when scraping HTML or reading loosely typed JSON.

Examples:

- `src/renderer/views/config/index.vue` validates cron expressions, number mode, and percentage mode before saving.
- `src/docker/server.ts` validates required config fields before calling `saveConfig`.
- `src/core/api.ts` checks for missing cookie fragments and missing HTML matches before continuing.

---

## Common Patterns

- Type store refs explicitly when the initial value is empty or ambiguous, for example `ref<Fans[]>([])`.
- Use union literals for domain values such as config modes and weekdays.
- Keep shared helper signatures explicit, for example `Promise<Fans[]>`, `Promise<void>`, and `Record<string, SendGift>`.

Examples:

- `src/core/types.ts` uses literal unions for `type`, `time`, and `model`.
- `src/renderer/views/config/index.vue` keeps `config` as `ref<Config>`.
- `src/docker/server.ts` defines an explicit `AppContext` interface for dependency injection.

---

## Forbidden Patterns

- Do not add a new local copy of a shared type when `src/core/types.ts` already has it.
- Do not reach for `any` by default just because upstream data is loose.
- Do not use type assertions to skip validation when parsing config or Douyu responses.
- Do not let renderer and Docker config shapes drift apart without updating shared types first.
