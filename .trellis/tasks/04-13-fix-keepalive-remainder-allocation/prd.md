# Fix keepalive fixed-count remainder allocation

## Goal
Ensure fixed-count keepalive allocation only sends the remaining fluorescent sticks to rooms explicitly configured with `number: -1`.

## Requirements
- Keep shared gift allocation logic in `src/core/`.
- In fixed-count mode, rooms with non-negative `number` values must receive exactly their configured amount.
- Only rooms explicitly configured with `number: -1` may receive the remainder.
- If no room is configured with `number: -1`, any extra fluorescent sticks must remain unsent.
- Preserve current validation for insufficient fluorescent stick totals.

## Acceptance Criteria
- [ ] A fixed-count config with all rooms set to `1` sends `1` to each room and leaves the remainder unsent.
- [ ] A fixed-count config with one room set to `-1` sends the remainder only to that room.
- [ ] Existing callers in both desktop and Docker runtimes still compile.

## Technical Notes
- The current bug is in `src/core/gift.ts` where the last sorted room always receives the remainder.
- Add focused automated coverage for the shared allocation helper if the project already supports lightweight unit execution.
