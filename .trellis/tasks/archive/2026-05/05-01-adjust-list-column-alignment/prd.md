# Adjust List Column Alignment

## Goal

Improve the visual alignment of the Docker WebUI fan medal status list and Yuba status list so the first and final columns anchor to the edges while middle columns have consistent spacing.

## What I Already Know

- The current Docker WebUI is served from `src/docker/html.ts`.
- The fan medal status list is built by `buildFansStatusTable()`.
- The Yuba status list is built by `buildYubaStatusTable()`.
- Both lists currently inherit `.table th, .table td { text-align: left; }`.
- Both status lists use `table-layout: fixed` and individual `col:nth-child(...)` widths, which makes middle columns uneven.

## Requirements

- In the fan medal list, the `序号` column must align to the far left.
- In the fan medal list, the `双倍状态` column must remain the far-right column, with centered content.
- In the Yuba list, the `序号` column must align to the far left.
- In the Yuba list, the `签到状态` column must remain the far-right column, with centered content.
- In both lists, the final status column must use a `160px` width.
- In the Yuba list, `排名` must appear immediately after `等级` and before `经验值`.
- In both lists, middle columns must keep consistent spacing by sharing the remaining width evenly.
- Scope is limited to the fan medal status list and Yuba status list. Do not change task logic, API payloads, config shape, or unrelated tables.

## Acceptance Criteria

- [x] Fan medal status table first column is left aligned.
- [x] Fan medal status table final `双倍状态` column remains rightmost and its content is centered.
- [x] Yuba status table first column is left aligned.
- [x] Yuba status table final `签到状态` column remains rightmost and its content is centered.
- [x] Final status columns use a `160px` width.
- [x] Yuba status table column order is `等级`, `排名`, `经验值`.
- [x] Middle columns in both tables use equal remaining-column spacing.
- [x] `npm run lint` passes.
- [x] `npm run type-check` passes.
- [x] `npm test` passes.

## Definition of Done

- Keep changes small and localized to Docker WebUI table styling/rendering.
- Preserve existing table content, labels, and empty/loading states.
- Run project lint and type-check.

## Out of Scope

- Redesigning the whole WebUI.
- Changing keepalive or double-card configuration edit tables.
- Adding new dependencies or frontend frameworks.

## Technical Notes

- Relevant specs:
  - `.trellis/spec/frontend/index.md`
  - `.trellis/spec/backend/directory-structure.md`
  - `.trellis/spec/backend/quality-guidelines.md`
- Relevant code:
  - `src/docker/html.ts`
- Spec update decision: no `.trellis/spec/` update needed because this task only adjusts local CSS for two existing tables and introduces no new contract, convention, API, or runtime behavior.
