# Optimize Yuba List Layout

## Goal

Optimize the Docker WebUI yuba status table so it follows the fans medal list's ordering and column-width behavior more closely. The result should make the yuba list easier to scan and visually consistent with the existing fans medal table.

## What I Already Know

* The requested change is: "参考粉丝牌列表的列表排序和列宽，优化鱼吧列表".
* The current supported UI is the Docker WebUI in `src/docker/html.ts`.
* `buildFansStatusTable()` renders the fans medal table.
* `buildYubaStatusTable()` renders the yuba table.
* The current yuba table sorts by `groupExp` descending, while the fans medal table preserves the provided list order.
* The table CSS currently uses a shared `.table` class with `min-width:760px` and no per-column widths.

## Assumptions

* "参考粉丝牌列表的列表排序" means the yuba list should preserve the backend/API list order instead of applying a separate experience-based sort in the UI.
* "参考粉丝牌列表的列宽" means the yuba table should use explicit column sizing consistent with the fans medal table, while still fitting its different columns.
* This is a UI-only change; yuba API fetching, signing logic, and task configuration behavior are out of scope.

## Requirements

* Remove the yuba table's separate `groupExp` descending UI sort and render rows in the incoming list order.
* Add stable table column widths for the fans medal table and yuba table.
* Keep sequence numbers based on displayed row order.
* Keep all existing yuba columns: sequence, yuba name, yuba ID, level, experience, rank, sign-in status.
* Preserve horizontal scrolling for narrow screens.
* Do not change backend response shapes or yuba check-in behavior.

## Acceptance Criteria

* [ ] Fans medal and yuba status tables use explicit column widths.
* [ ] Yuba rows render in incoming list order.
* [ ] Yuba status error messages still render under the sign-in status pill.
* [ ] `npm run type-check` passes.
* [ ] `npm run lint` passes, or any pre-existing lint/tooling issue is documented.

## Definition of Done

* Code is updated in the Docker WebUI only.
* Type-check and lint are run.
* Any new project convention learned during the task is considered for spec updates.

## Out of Scope

* Changing yuba status fetch APIs.
* Changing yuba sign-in scheduling or execution.
* Adding a new frontend framework or renderer.
* Redesigning the surrounding yuba page.

## Technical Notes

* Relevant file: `src/docker/html.ts`.
* Relevant spec index: `.trellis/spec/frontend/index.md`.
* Current UI changes should follow Docker runtime guidance from `.trellis/spec/backend/directory-structure.md` and `.trellis/spec/backend/quality-guidelines.md`.
