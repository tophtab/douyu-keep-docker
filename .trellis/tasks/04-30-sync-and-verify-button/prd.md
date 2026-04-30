# Rename CookieCloud Verify Button

## Goal

Make the Docker WebUI CookieCloud action match its real user expectation: clicking the button should synchronize CookieCloud into local login cookies first, then verify the resulting main-site and Yuba cookies.

## What I already know

* User saw: `来源: CookieCloud，Cookie 数: 721，更新时间: 2026-04-30 09:30:43。主站请求就绪；鱼吧缺少 acf_yb_t。`
* This means CookieCloud returned cookies and main-site required keys are present, but the Yuba cookie set lacks `acf_yb_t`.
* The UI lives in `src/docker/html.ts`.
* The existing button label is `立即校验`.
* Existing click flow calls `/api/cookie-source/check` before `syncCookieCloudToLoginCookies(false)`, so it can display pre-sync diagnostics.

## Requirements

* Rename the CookieCloud button from `立即校验` to `同步并校验`.
* Update explanatory copy that references the button label.
* Clicking the action must synchronize CookieCloud to local login cookies first when CookieCloud is active.
* After synchronization, the UI must verify the resulting cookie source and display current missing-key diagnostics.
* Preserve existing behavior for manual cookies: the action should still verify without requiring CookieCloud.

## Acceptance Criteria

* [x] The CookieCloud panel shows `同步并校验` instead of `立即校验`.
* [x] The CookieCloud help text says the action syncs first and then verifies.
* [x] The click handler persists CookieCloud cookies before requesting `/api/cookie-source/check`.
* [x] Toast messages mention sync plus verification for this action.
* [x] Docker TypeScript build passes.

## Definition of Done

* Lint / typecheck / Docker build green where applicable.
* Spec update considered after implementation.

## Out of Scope

* Changing which CookieCloud keys are required for Yuba.
* Adding browser-side CookieCloud diagnostics beyond the existing missing-key list.
* Changing scheduler behavior.

## Technical Notes

* `src/core/cookie-cloud.ts` requires Yuba keys `acf_yb_auth`, `acf_yb_uid`, and `acf_yb_t`.
* `src/docker/index.ts` exposes `/api/cookie-source/persist` and `/api/cookie-source/check`.
* Backend/frontend guidelines confirm Docker WebUI is served from `src/docker/html.ts`.
