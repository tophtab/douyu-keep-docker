# brainstorm: badge sync and webui restructure

## Goal

Refine the Docker WebUI so the overview page becomes a compact status-first landing page, the fan badge information is surfaced directly on that page instead of living behind a separate page, task enablement uses clearer switch-style controls, and the visual system is adjusted to better match the preferred light theme and an OLED-style pure black dark theme.

## What I already know

* The relevant implementation is the Docker WebUI in `src/docker/html.ts`.
* The current sidebar tabs are `概览`, `登录与领取`, `保活赠送`, `双倍赠送`, `粉丝牌同步`, and `运行日志`.
* The current overview page still includes:
  * a timezone metric card
  * three top-right actions: `刷新概览`, `同步粉丝牌`, `查看日志`
  * a large task-status block
  * a `快捷操作` panel
  * a `粉丝牌同步` panel
  * a `最近日志` panel
* The current `登录与领取` page uses checkbox inputs for enabling `领取任务`.
* The current `保活赠送` and `双倍赠送` pages also use checkbox inputs for enabling those tasks.
* The current `粉丝牌同步` page already shows the fan badge table and double-card state, but the user wants this information merged into the overview page and renamed around `粉丝牌`.
* The current theme selector supports `system`, `light`, and `dark`, but the dark palette is not yet OLED-pure-black and the current button colors are not satisfactory, especially in light mode.
* Previous archived planning in `.trellis/tasks/archive/2026-04/04-10-medal-task-theme-refactor/prd.md` already established fan-badge-driven management and theme-mode support; this round is a more opinionated UX refinement on top of that direction.

## Assumptions (temporary)

* This task is focused on the Docker WebUI, not the Electron desktop renderer.
* The current request is primarily a UI/UX and information-architecture refinement, not a backend contract redesign.
* Existing fan badge loading, overview data loading, task save flows, and theme persistence should be reused unless the UI refinement exposes a clear gap.
* `粉丝牌同步` as a standalone navigation item will likely be removed or absorbed into `概况`, but final nav treatment still needs confirmation.

## Open Questions

* None currently. Ready for final confirmation.

## Requirements (evolving)

* Remove the timezone display from the overview page.
* Replace the overview top-right action cluster with a simpler single `刷新` action.
* Shrink the visual footprint of task status on the overview page.
* Remove `快捷操作`, `最近日志`, and the current `粉丝牌同步` status box from the overview layout.
* Reframe the overview page so it mainly shows what is configured and a compact status view.
* Merge fan badge information into the overview page under a `粉丝牌` section.
* Show the concrete fan badge list directly on the overview page.
* Show double-card status directly in that overview fan badge list.
* Remove the need for a separate `粉丝牌同步` page.
* Change `登录与领取` task enablement from checkbox style to switch style.
* Change `保活赠送` task enablement from checkbox style to switch style.
* Change `双倍赠送` task enablement from checkbox style to switch style.
* Adjust dark mode to use an OLED-style pure black direction.
* Redesign both light and dark theme color systems so they feel more intentional and visually pleasing.
* Improve button visual treatment rather than keeping the current plain styling.
* Perform a broader full-shell visual consistency pass instead of limiting changes to the overview page only.
* Reorganize the left navigation names, order, and page boundaries so the shell feels coherent after `粉丝牌同步` is absorbed.
* Use the final left navigation structure: `概况 / 登录与领取 / 保活任务 / 双倍任务 / 运行日志`.
* Remove the standalone `粉丝牌同步` navigation item entirely.
* Structure the overview page as a top status strip followed by one large fan badge list block.
* The overview top area should be organized around operational modules rather than generic categories.
* The user wants the overview status area to conceptually cover:
  * 登录状态
  * 领取
  * 保活
  * 双倍
* The chosen top composition is:
  * a full-width `登录状态` strip
  * a second row with three task cards: `领取 / 保活 / 双倍`
* The overview lower section should be a single prominent `粉丝牌` block containing the full fan badge list.

## Acceptance Criteria (evolving)

* [ ] The overview page no longer displays timezone information.
* [ ] The overview page header uses a single refresh action instead of separate refresh/sync/log actions.
* [ ] The overview page no longer includes the existing quick-actions panel.
* [ ] The overview page no longer includes the existing recent-logs panel.
* [ ] The overview page no longer relies on a standalone `粉丝牌同步` panel and instead renders a `粉丝牌` section with the actual list.
* [ ] The overview page shows the current fan badge rows together with double-card state.
* [ ] The overview page follows the agreed information hierarchy:
  * top full-width login strip
  * second-row three-column task cards for 领取 / 保活 / 双倍
  * bottom large fan badge list block
* [ ] The standalone `粉丝牌同步` page is removed or fully absorbed so users do not need to enter a separate page for that information.
* [ ] The `领取任务`, `保活任务`, and `双倍任务` enable controls all render as switch-style controls.
* [ ] Dark theme resolves to a pure-black OLED-like palette rather than the current gray-dark palette.
* [ ] Both light and dark themes feel more designed and visually improved than the current implementation.
* [ ] The final left navigation and page boundaries feel internally consistent and no longer expose a redundant standalone `粉丝牌同步` destination.

## Definition of Done (team quality bar)

* Tests added/updated where appropriate
* Lint / typecheck / CI green
* Docs/notes updated if behavior changes
* Rollout/rollback considered if risky

## Out of Scope (explicit)

* Rewriting the Docker WebUI into a separate frontend framework
* Reworking the Electron renderer
* Changing core Douyu task logic unless the UI work reveals a necessary bug fix
* Large backend API redesign unless required to support the final chosen UI

## Technical Notes

* Main file likely to change: `src/docker/html.ts`.
* Relevant persisted theme type already exists in `src/core/types.ts` as `ThemeMode`.
* Current overview rendering is handled by `renderOverview()`.
* Current task enablement rendering is handled by:
  * `renderCookiePage()`
  * `renderKeepalivePage()`
  * `renderDoublePage()`
* Current fan badge list rendering is handled by `renderFansStatusPage()`.
* The current overview page still formats dates using `Asia/Shanghai`, but the explicit timezone metric card can be removed without changing log formatting.
* Likely affected areas inside `src/docker/html.ts`:
  * theme tokens and button CSS
  * sidebar tab list
  * overview page markup
  * fan badge page markup and its possible removal/merge
  * page metadata strings
  * render functions for overview, fan status, and control widgets
* User confirmed this round should use the broadest scope option among the brainstormed variants:
  * not only overview cleanup
  * not only visual consistency
  * also a full pass on navigation naming, ordering, and page boundaries
* User selected the most compact shell information architecture:
  * `概况 / 登录与领取 / 保活任务 / 双倍任务 / 运行日志`
  * no standalone `粉丝牌同步` page
* User clarified the overview layout:
  * not stacked quick-action cards
  * not a large dedicated task-status panel
  * instead a top status area that should conceptually express 登录状态 / 领取 / 保活 / 双倍
  * followed by a large fan badge list section
* User thinks a three-column composition is probably visually sound, but a flat four-equal-block layout may not look good enough.
* User selected the preferred top-layout composition:
  * one full-width login-status strip
  * one three-column row for 领取 / 保活 / 双倍
* User corrected the visual requirement:
  * not only light-mode button colors
  * both light and dark themes should be made more attractive and design-forward
