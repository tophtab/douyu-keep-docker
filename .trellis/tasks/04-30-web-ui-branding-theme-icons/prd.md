# Web UI branding and theme icons

## Goal

Update the Docker Web UI presentation so the product identity is `douyu-keep`, the theme mode control is icon-first, and the running UI exposes the package version beside the left-side brand.

## What I already know

* The current Docker Web UI is served from `src/docker/html.ts`.
* The HTML document title and sidebar brand currently use `斗鱼粉丝牌续牌` / `斗鱼粉丝牌续牌`.
* The sidebar currently has a `Web UI`-area brand block and a select-based theme picker.
* Theme state already supports `system`, `light`, and `dark` via `ui.themeMode`.
* The current release target for this UI branding/theme update is `2.1.0`.
* External UI references commonly use icon-based theme controls: sun for light, moon for dark, and a system/device entry for automatic mode.
* The project should follow normal npm/open-source version iteration practice: package version metadata is the source of truth, and maintainers should have explicit scripts for patch, minor, and major bumps.
* The main page header currently has text buttons for `刷新` and `退出登录` in the upper-right toolbar.

## Assumptions

* `自动模式` maps to the existing `system` theme mode.
* The requested "客户端图标" should be implemented as a monitor/device-style icon to indicate following the client or system preference.
* The UI version should render as `V2.1.0`, sourced from the package version so it stays current when the package version changes.

## Requirements

* Replace the select-based theme mode control with an icon-based three-option control.
* The three theme options must represent:
  * `light` with a sun icon.
  * `dark` with a moon icon.
  * `system` with a client/device icon.
* The icon control must preserve the existing theme persistence behavior through `ui.themeMode`.
* Rename visible Web UI branding from `斗鱼粉丝牌续牌` to `douyu-keep`.
* Update the browser document title to `douyu-keep`.
* Show the app version beside the left-side `douyu-keep` brand as a small label formatted like `V2.1.0`.
* Bump package version metadata from `2.0.0` to `2.1.0`, including lockfile root metadata, without creating a git commit or git tag.
* Add package scripts for routine version iteration using `npm version` semantics:
  * `version:patch`, `version:minor`, and `version:major` update package metadata without creating commits or tags.
  * `release:patch`, `release:minor`, and `release:major` are reserved for intentional release commits/tags and must use uppercase `V` tags to match existing workflows.
* Document the difference between local version iteration scripts and intentional release scripts.
* Version bump scripts must not run during ordinary build, test, type-check, or start commands.
* Replace the upper-right `刷新` and `退出登录` text buttons with icon buttons.
* The refresh action should use a recognizable refresh/rotate icon; the logout action should use a recognizable log-out/exit icon.
* Icon buttons must keep accessible labels and hover tooltips so the actions remain clear.
* Upper-right refresh/logout icons must read visually balanced with the 20px theme mode icons; their strokes/geometry should not look weaker while button dimensions remain stable.
* The first toolbar icon set was rejected because the symbols still looked too small; replace those glyphs with a visually fuller icon set rather than only scaling the same paths.
* The upper-right icon button footprint should follow the original text button sizing and the shared `.btn` visual rhythm, not a small square toolbutton.
* The icon buttons must preserve existing `refresh-overview` and `logout` behavior.
* Toast notifications such as `概况已刷新` must appear lower than the upper-right toolbar so they do not cover the refresh/logout buttons.
* Toast positioning must remain readable on desktop and mobile widths.
* Keep existing auth, config, task, and log behavior unchanged.

## Acceptance Criteria

* [ ] Sidebar brand displays `douyu-keep`.
* [ ] Browser tab title is `douyu-keep`.
* [ ] Sidebar brand area displays `V2.1.0` beside the brand text.
* [ ] `package.json` and root `package-lock.json` metadata report version `2.1.0`.
* [ ] `package.json` exposes explicit npm scripts for no-tag patch, minor, and major version iteration.
* [ ] `package.json` exposes explicit release scripts for intentional uppercase `V` release tags.
* [ ] Theme mode is controlled by sun, moon, and client/device icon buttons rather than a select dropdown.
* [ ] Clicking each theme icon saves the corresponding `ui.themeMode` value and updates the active visual state.
* [ ] Existing `system` mode continues to follow `prefers-color-scheme`.
* [ ] Upper-right refresh and logout controls render as icon buttons instead of text buttons.
* [ ] Refresh/logout icon buttons keep `aria-label` and `title` text.
* [ ] Refresh/logout icons look visually balanced with the theme mode icons without changing the toolbar button footprint.
* [ ] Refresh/logout use a replacement glyph set and do not reuse the rejected small-looking toolbar paths.
* [ ] Refresh/logout button footprint is consistent with other `.btn` controls and does not appear as a smaller square control.
* [ ] Refresh/logout icon buttons still trigger the existing refresh and logout actions.
* [ ] Toast notifications appear below the header toolbar area and do not obstruct refresh/logout controls.
* [ ] Lint and type-check pass.

## Definition of Done

* Tests added or updated if the change introduces testable logic.
* Lint and type-check pass.
* No unrelated Web UI behavior changes.
* Context files are curated for implementation and check agents.

## Out of Scope

* Changing the Docker config schema.
* Adding a new frontend framework or icon dependency.
* Redesigning unrelated pages, navigation, login, or task forms.
* Changing package name or repository metadata.

## Technical Notes

* Likely impacted file: `src/docker/html.ts`.
* The version can be injected into the HTML template from `package.json`, avoiding duplicated hard-coded version strings.
* Research notes: `.trellis/tasks/04-30-web-ui-branding-theme-icons/research/theme-toggle-icons.md`.
