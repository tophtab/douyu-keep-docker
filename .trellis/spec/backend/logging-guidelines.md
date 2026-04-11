# Logging Guidelines

> How logging is done in this project.

---

## Overview

Logging is intentionally simple.

- Docker runtime has an in-memory log buffer in `src/docker/logger.ts`
- Logs are also written to stdout with `console.log`
- Desktop runtime mainly updates UI state instead of keeping a formal backend logger

There are no formal log levels today. The effective structure comes from category labels such as `系统`, `保活`, and `双倍`.

---

## Log Structure

Each Docker log entry contains:

- `timestamp`
- `category`
- `message`

Example implementation:

- `src/docker/logger.ts` builds `LogEntry` objects and caps the buffer at `MAX_LOGS = 500`
- `src/docker/index.ts` creates scoped loggers with `createLogger('系统')`, `createLogger('保活')`, and `createLogger('双倍')`

### Timestamp Contract

- User-facing Docker timestamps must follow the same timezone semantics the WebUI claims to use.
- Do not mix UTC `toISOString()` output with UI text that says times are Shanghai-local unless the conversion is explicit.
- If the runtime chooses a display timezone such as `Asia/Shanghai`, keep log timestamps and task-status timestamps aligned with that contract.

---

## What To Log

- Process startup and shutdown
- Config load/save outcomes
- Scheduler start/stop state
- Manual trigger execution
- Per-job progress messages that help diagnose room-level failures

Good examples:

- `src/docker/index.ts`: startup, config load result, task restarts, shutdown
- `src/core/job.ts`: task progress, gift counts, room-level success/failure
- `src/docker/server.ts`: route layer is intentionally quiet and delegates to the log-producing services

---

## What Not To Log

- Full cookies or other secrets
- Raw config objects when they include auth material
- Excessive per-request noise on simple read routes

The existing code already masks the cookie in `/api/config` via `maskCookie()` in `src/docker/server.ts`. Follow that pattern whenever config data is returned or logged.

---

## Common Mistakes

- Do not add a new ad hoc log format when `LogEntry` already exists.
- Do not let the in-memory buffer grow without bounds.
- Do not log the full cookie for debugging.
- Do not use logs as a substitute for returning actionable errors to the caller.
- Do not let a failed external request look identical to a legitimate business result such as `0` gifts or an empty list.
- Do not log timestamps in one timezone while the UI explains them in another.
