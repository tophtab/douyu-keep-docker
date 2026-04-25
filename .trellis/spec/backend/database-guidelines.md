# Database Guidelines

> Persistence patterns and conventions for this project.

---

## Overview

This project does not use a relational database or ORM.

Persistence is Docker-only:

- Docker app: JSON file persistence at `CONFIG_PATH` in `src/docker/index.ts`

There are no migrations, transactions, or schema tools. Changes are handled by reading old config and patching missing fields in application code.

---

## Persistence Patterns

- Persist small configuration payloads as whole JSON blobs, not as many small records.
- Parse persisted JSON at the edge and repair missing fields during startup.
- In Docker mode, resolve the target path from environment variables and create the directory lazily before writing.

Examples:

- `src/docker/index.ts` uses `loadConfigFromDisk()` and `saveConfigToDisk()` for the JSON file workflow.
- `src/core/medal-sync.ts` normalizes missing config fields before Docker starts jobs.

---

## Migrations

- There is no migration framework.
- Backward compatibility is handled in code:
  - add optional fields in shared types first
  - default missing fields during read/init
  - write back normalized config when needed

Current examples:

- `src/docker/index.ts` generates a default config file if none exists
- `src/docker/index.ts` calls `normalizeDockerConfig()` when loading persisted JSON

---

## Naming Conventions

- Docker config files use a single `config.json` document.
- Shared persisted object types live in `src/core/types.ts`.
- Prefer descriptive top-level keys such as `cookie`, `keepalive`, `doubleCard`, `cron`, and `send`.

---

## Common Mistakes

- Do not assume persisted JSON already contains newly added fields.
- Do not introduce a second source of truth for the same config shape in each runtime.
- Do not store secrets in logs while debugging persistence issues.
- Do not add database-oriented abstractions like repositories or migrations unless the storage model actually changes.
