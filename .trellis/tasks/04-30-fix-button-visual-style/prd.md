# fix button visual style

## Goal

Align the Docker WebUI action button styling so the CookieCloud "保存并启用" and "同步并校验" buttons do not appear too dark by default and do not visually brighten on hover.

## What I already know

* The affected Docker WebUI is generated from `src/docker/html.ts`.
* The two reported buttons are in the CookieCloud login configuration section.
* Shared `.btn`, `.btn-success`, and `.btn-secondary` styles control these buttons and other WebUI action buttons.
* Dark theme secondary buttons use `--surface-strong`, which is nearly black and can read too dark.

## Assumptions

* The requested behavior should apply to the shared button treatment so these two buttons stay aligned with other action buttons.
* No backend behavior or request flow should change.

## Requirements

* Remove unnecessary hover visual emphasis for standard buttons so hover does not create a brighter or animated button state.
* Raise the default visual brightness of secondary buttons, especially in dark theme.
* Keep button classes and data-action wiring unchanged.

## Acceptance Criteria

* [ ] The CookieCloud "保存并启用" button keeps the same apparent brightness on hover.
* [ ] The CookieCloud "同步并校验" button keeps the same apparent brightness on hover.
* [ ] The secondary button background is not overly dark when the dark theme is active.
* [ ] Docker WebUI TypeScript still compiles.

## Definition of Done

* Lint / typecheck or Docker build passes.
* No business logic changes.
* No unrelated UI rewrites.

## Out of Scope

* Redesigning the full WebUI theme.
* Changing button labels, click handlers, or CookieCloud behavior.

## Technical Notes

* Relevant file: `src/docker/html.ts`
* Relevant specs: `.trellis/spec/frontend/index.md`, `.trellis/spec/backend/directory-structure.md`, `.trellis/spec/backend/quality-guidelines.md`
