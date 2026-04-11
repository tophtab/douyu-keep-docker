# Backend Runtime Bug Fixes

## Goal
Fix confirmed backend runtime bugs in the Docker scheduler and shared gift allocation logic.

## Requirements
- Prevent percentage-based gift allocation from producing negative runtime send counts.
- Reject invalid Docker cron expressions before mutating persisted config or restarting jobs.
- Prevent Docker scheduled jobs and manual triggers from running concurrently for the same task type.
- Preserve explicit failure semantics for double-card detection instead of silently treating request failures as "inactive".

## Acceptance Criteria
- [ ] Percentage allocation never returns negative `count` values.
- [ ] Invalid cron payloads return `400` and do not write broken config to disk.
- [ ] Manual triggers and scheduled triggers cannot overlap for the same task type.
- [ ] Double-card request failures surface as errors to runtime callers instead of returning false negatives.
- [ ] `npm run build:docker` passes after the changes.

## Technical Notes
- Keep shared allocation and Douyu API logic in `src/core/`.
- Keep Docker route handlers thin and do boundary validation in `src/docker/server.ts`.
- Use existing logger categories and plain `Error` messages.
