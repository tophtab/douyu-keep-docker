# Error Handling

> How errors are handled in this project.

---

## Overview

This codebase uses direct `try/catch` handling and plain `Error` objects.
There is no custom error hierarchy yet.

The common pattern is:

1. Fail fast in helpers by throwing `Error`
2. Catch at runtime boundaries such as cron callbacks, Express handlers, IPC handlers, or UI actions
3. Convert the failure into a user-facing message, HTTP response, or log line

---

## Error Types

- Use built-in `Error` with a clear Chinese message string.
- In catch blocks, this codebase commonly treats the value as `any` and falls back to `error.message || error`.
- Some helpers return early after logging instead of rethrowing when the failure should not crash the whole job.

Examples:

- `src/core/api.ts`: `parseDyAndSidFromCookie()` throws when required cookie parts are missing.
- `src/core/api.ts`: `getDid()` throws `new Error('获取did失败')`.
- `src/docker/index.ts`: scheduled jobs catch errors and convert them into category-specific log messages.

---

## Error Handling Patterns

- Wrap external effects such as HTTP calls, cron parsing, window launch, and config IO in `try/catch`.
- Keep the job loop resilient. A single failed room should not abort the whole send flow; instead, log and continue.
- Catch near the transport boundary:
  - Express route returns `400` or `500`
  - IPC handler resolves or rejects the Promise
  - cron callback logs and keeps the scheduler alive

Examples:

- `src/docker/server.ts` validates request payloads and returns JSON errors with HTTP status codes.
- `src/main/ipc.ts` rejects IPC requests for invalid commands or scheduling failures.
- `src/core/job.ts` catches per-room send failures, carries the failed count forward, and continues.

---

## API Error Responses

Docker HTTP routes use a simple JSON shape:

- Validation errors: `res.status(400).json({ error: 'message' })`
- Runtime errors: `res.status(500).json({ error: e.message })`
- Successful mutations: `res.json({ ok: true })`

This is intentionally lightweight; keep new routes consistent with the existing shape.

---

## Common Mistakes

- Do not swallow errors silently; at least log them or return an error response.
- Do not throw raw strings; throw `Error` instances so `.message` exists.
- Do not let low-level parsing failures leak all the way to the user without context.
- Do not crash the whole scheduler because one room send failed.
