# brainstorm: analyze Douyu Yuba cookie invalidation

## Goal

Understand why CookieCloud-synced Douyu Yuba cookies often become invalid in this container, compare approaches used by DouyuEx and related projects, and identify a practical fix path for this project.

## What I already know

* User observes Yuba cookies frequently stop working after CookieCloud sync into the container.
* Re-logging into Douyu Yuba in the browser, syncing browser cookies to CookieCloud, then downloading them into the project makes Yuba work again.
* The project supports separate main Douyu and Yuba cookies, with CookieCloud as the recommended source.
* Current Yuba flow requires both a Yuba login cookie set and a main Douyu login set for `dy-token`.
* Current required Yuba CookieCloud diagnostics check `acf_yb_auth` and `acf_yb_uid`; the actual Yuba CSRF helper also requires `acf_yb_t` in older code paths.
* Current `dy-token` is built from main-site cookies: `acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, `acf_ltkid`.
* CookieCloud sync snapshots are persisted into local manual cookies on startup and a configured cron, but task execution reads the persisted local snapshot, not CookieCloud live every time.
* DouyuEx builds the same `dyToken` from browser cookies and uses the same core Yuba endpoints: `myFollow`, `topic/sign`, `fastSign`, and `supplement`.
* `qianfeiqianlan/yuba-check-in` avoids exported-cookie freshness issues by running in Chrome tabs and clicking the real Yuba page.
* Browser-based projects do not solve cookie refresh in code; they depend on live browser cookie state.
* This repo's active sign-in path matches DouyuEx's dy-token API strategy, but `/api/yuba/status` still uses an older Yuba-cookie-only status path.
* User clarified the failing case: CookieCloud cloud-side Yuba cookie becomes shorter/incomplete, and WebUI sync-and-verify reports missing Yuba fields until the browser visits/logs into Yuba and re-uploads a fuller Yuba cookie set.
* A local read-only test showed DouyuEx-style `myFollow` can fetch followed Yuba groups with a fresh main-site `dy-token` even when the request sends no Yuba Cookie header.
* A local read-only test showed `group/head` can also return group level/sign state with a fresh main-site `dy-token` and no Yuba Cookie header.
* A stricter local read-only field coverage check showed `myFollow + group/head` with only dy-token can cover the current `YubaGroupStatus` fields: `groupId`, `groupName`, `unreadFeedNum`, `groupLevel`, `groupExp`, `nextLevelExp`, `groupTitle`, `rank`, and `isSigned`.
* A local read-only test showed a persisted manual cookie can contain all five dy-token source fields by name but still fail with `4207 登录过期`; freshness/validity matters, not only field presence.
* User wants to keep the current Yuba status experience, including followed-group rows with level, experience, rank/sign state, and related status detail. The UI should not degrade into a minimal DouyuEx-style list.
* User accepts displaying full Yuba-cookie readiness as incomplete/warning separately from dy-token readiness.

## Assumptions (temporary)

* The sync-and-verify failure is likely caused by diagnostics treating Yuba-specific cookie fields as mandatory even for DouyuEx-style flows that can use dy-token-only list/status APIs.
* Yuba-specific auth/CSRF cookies still may matter for some older/legacy paths, but they should not be conflated with dy-token readiness.
* Main-site token freshness can independently break Yuba API calls even when all required token source key names are present.

## Open Questions

* None currently blocking. User confirmed separate readiness display is acceptable as long as the current status detail remains.

## Requirements (evolving)

* Determine the exact cookie/token dependencies for current Yuba status and sign-in paths.
* Compare external project strategies, especially DouyuEx and Yuba check-in implementations.
* Explain likely root causes of the user's observed “works only after browser Yuba login + CookieCloud resync” behavior.
* Propose actionable remediation options with risk and implementation cost.
* Prefer a Docker/headless fix that aligns status checks and diagnostics with the DouyuEx dy-token path before considering browser automation.
* Split diagnostics between dy-token readiness and legacy/full Yuba cookie readiness.
* Preserve current WebUI Yuba status richness: followed groups must still show level/experience/rank/sign-state data where the API returns it.
* If switching status data loading to dy-token-backed endpoints, map responses back into the existing `YubaGroupStatus` shape so frontend layout and user-facing semantics stay stable.
* Verify dy-token-backed status mapping covers all currently displayed status fields before using it as the primary status source; if coverage is incomplete, keep existing path fallback/error behavior rather than silently dropping fields.
* Cookie diagnostics should distinguish:
  * main-site dy-token source readiness (`acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, `acf_ltkid`);
  * full/legacy Yuba cookie readiness (`acf_yb_auth`, `acf_yb_uid`, and any legacy-only fields such as `acf_yb_t` if still relevant).
* Missing full Yuba-cookie fields should not imply dy-token list/status is unavailable.

## Acceptance Criteria (evolving)

* [x] Research notes exist for external project comparison.
* [x] Repo analysis identifies specific code paths and cookie names involved.
* [x] User receives a concrete explanation and a recommended fix direction.
* [x] If implementation is requested, PRD is ready to drive Phase 2.

## Definition of Done (team quality bar)

* Tests added/updated if code changes are made.
* Lint / typecheck / CI green if code changes are made.
* Docs/notes updated if behavior changes.
* Rollout/rollback considered if risky.

## Out of Scope (explicit)

* Browser automation and CAPTCHA/Gee bypass remain out of scope.
* Do not reduce or remove the existing Yuba status table/detail fields.
* No collection, display, or logging of raw user cookies.

## Technical Notes

* Current files inspected: `src/core/cookie-cloud.ts`, `src/core/yuba.ts`, `src/docker/index.ts`, `README.md`.
* CookieCloud builds URL-scoped cookie headers with domain/path/expiry filtering.
* CookieCloud snapshot is cached briefly in memory and persisted to config manual cookies via `persistEffectiveCookies`.
* Scheduled Yuba task uses `resolveCookieForUrl(MAIN_DOUYU_URL)` and `resolveCookieForUrl(YUBA_DOUYU_URL)`, which means it uses persisted manual cookies unless no manual cookie exists.
* Research artifacts:
  * `research/douyuex-yuba-auth.md`
  * `research/related-yuba-cookie-strategies.md`
  * `research/live-douyuex-path-test.md`
* High-probability cause of the user's specific sync-and-verify failure: the Yuba-domain CookieCloud cookie is incomplete, but the app currently treats that as Yuba readiness failure even though DouyuEx-style list/status APIs can work from the main dy-token alone.
* Candidate implementation path: add dy-token-based Yuba status/list APIs, split readiness diagnostics, and stop blocking dy-token-capable flows solely because `acf_yb_*` fields are missing.
