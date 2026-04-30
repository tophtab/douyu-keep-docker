# Research: DouyuEx Yuba authentication

- Query: How DouyuEx handles Douyu Yuba authentication, cookies, tokens, and sign-in/status APIs, and how that differs from this repo.
- Scope: mixed
- Date: 2026-04-30

## Findings

### External source: DouyuEx

Files found:

- `qianjiachun/douyuEx/src/common.js` - global browser helpers that read Douyu cookies and construct the `dyToken`.
  Source: https://github.com/qianjiachun/douyuEx/blob/master/src/common.js
- `qianjiachun/douyuEx/src/packages/Sign/Sign_Yuba.js` - Yuba follow-list, fast sign, per-group sign, and supplementary sign implementation.
  Source: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js
- `qianjiachun/douyuEx/src/packages/Sign/Sign.js` - one-click sign orchestrator that includes Yuba sign-in.
  Source: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign.js
- `qianjiachun/douyuEx/src/packages/Sign/Sign_Yuba_Like.js` - historical Yuba like API usage with the same `dy-token` / `dy-client` header pattern.
  Source: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba_Like.js
- `qianjiachun/douyuEx/src/packages/RestoreYuba/RestoreYuba.js` - Yuba status/head usage for closed-group restoration.
  Source: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/RestoreYuba/RestoreYuba.js
- `qianjiachun/douyuEx/src/packages/AccountList/AccountList.js` - account switching/cleanup via Tampermonkey `GM_cookie`, including Yuba iframe cleanup.
  Source: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/AccountList/AccountList.js
- `qianjiachun/douyuEx/src/main.js` - userscript metadata: current source version observed as `2026.04.24.01`, with `@match *://yuba.douyu.com/*`, `@grant GM_cookie`, and `@connect douyu.com`.
  Source: https://github.com/qianjiachun/douyuEx/blob/master/src/main.js

Code patterns:

- DouyuEx reads cookie values directly from `document.cookie` via `getCookieValue(name)`, then sets `my_uid = getCookieValue("acf_uid")`.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/common.js#L26-L29 and https://github.com/qianjiachun/douyuEx/blob/master/src/common.js#L135-L142
- DouyuEx constructs `dyToken` as `acf_uid_acf_biz_acf_stk_acf_ct_acf_ltkid`.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/common.js#L115-L120
- DouyuEx exposes helper accessors for `dy_did`, `acf_ccn`, `acf_ctn`, `cvl_csrf_token`, and `acf_uid`, but Yuba sign-in uses `dyToken`, not `cvl_csrf_token`.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/common.js#L122-L177
- The one-click sign entrypoint calls `initPkg_Sign_Yuba()` before other sign tasks.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign.js#L28-L65
- DouyuEx fetches followed Yuba groups through `GET https://yuba.douyu.com/wbapi/web/group/myFollow?page=<page>&limit=30` with headers `Content-Type: application/x-www-form-urlencoded`, `dy-client: pc`, and `dy-token: dyToken`.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js#L99-L135
- DouyuEx signs a Yuba group through `POST https://yuba.douyu.com/ybapi/topic/sign`, body `group_id=<id>`, headers `Content-Type: application/x-www-form-urlencoded`, `dy-client: pc`, `dy-token: <token>`, and `Referer: https://yuba.douyu.com/group/<id>`.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js#L35-L90
- DouyuEx retries `message == "签到失败"` up to a counter limit and treats empty `response.message` as success.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js#L47-L71
- DouyuEx calls fast sign before per-group sign through `POST https://mapi-yuba.douyu.com/wb/v3/fastSign` with headers `client: android` and `token: dyToken`.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js#L9-L33 and https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js#L111-L115
- DouyuEx calls supplementary sign through `POST https://mapi-yuba.douyu.com/wb/v3/supplement`, body `group_id=<id>`, headers `client: android` and `token: dyToken`.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js#L92-L97 and https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js#L156-L173
- DouyuEx includes `GET https://yuba.douyu.com/wbapi/web/signDetail?group_id=<id>` with `dy-client` / `dy-token`, but the observed source does not call `getSupplementaryNums()` from the sign flow.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js#L138-L154
- DouyuEx uses the same Yuba auth headers for likes: `POST https://yuba.douyu.com/ybapi/follow/like` with `dy-token`, `dy-client: pc`, form body, and post referer.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba_Like.js#L16-L58
- DouyuEx Yuba status/head usage appears in RestoreYuba: `GET https://yuba.douyu.com/wbapi/web/group/head?group_id=<id>` and manager detail APIs are used for browser UI restoration, not as a general sign-in status endpoint.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/RestoreYuba/RestoreYuba.js#L26-L35 and https://github.com/qianjiachun/douyuEx/blob/master/src/packages/RestoreYuba/RestoreYuba.js#L167-L190
- DouyuEx account switching uses Tampermonkey `GM_cookie("list" | "delete" | "set")` to replace browser cookies, and opens a Yuba iframe with `exClean` to clear Yuba-related state after account switches.
  Source lines: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/AccountList/AccountList.js#L160-L227 and https://github.com/qianjiachun/douyuEx/blob/master/src/packages/AccountList/AccountList.js#L338-L371

Relevant DouyuEx cookie/token names:

- Source cookies used to construct `dyToken`: `acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, `acf_ltkid`.
- Other helper cookies present in DouyuEx common helpers: `dy_did`, `acf_ccn`, `acf_ctn`, `cvl_csrf_token`, `acf_uid`.
- Account management observes `acf_nickname`, `acf_uid`, `acf_avatar`, and passport cookie `LTP0`.
- Not found in DouyuEx Yuba sign-in source: `acf_yb_t`, `acf_yb_auth`, `acf_yb_uid`, or an `X-CSRF-TOKEN` header.

Relevant DouyuEx API endpoints:

- `GET https://yuba.douyu.com/wbapi/web/group/myFollow?page=<page>&limit=30`
- `POST https://yuba.douyu.com/ybapi/topic/sign`
- `POST https://mapi-yuba.douyu.com/wb/v3/fastSign`
- `POST https://mapi-yuba.douyu.com/wb/v3/supplement`
- `GET https://yuba.douyu.com/wbapi/web/signDetail?group_id=<id>`
- `POST https://yuba.douyu.com/ybapi/follow/like`
- `GET https://yuba.douyu.com/wbapi/web/group/head?group_id=<id>`
- `GET https://yuba.douyu.com/wbapi/web/group/managersdetail?group_id=<id>`

### Internal source: this repo

Files found:

- `src/core/yuba.ts` - service-side Yuba API client, token construction, follow/status/sign/fast-sign/supplement logic.
- `src/core/api.ts` - shared cookie parser and request header builder.
- `src/core/cookie-cloud.ts` - CookieCloud fetch/decrypt, domain/path cookie selection, readiness diagnostics.
- `src/docker/index.ts` - Docker runtime cookie resolution, CookieCloud persistence, scheduled/manual Yuba job execution, `/api/yuba/status` backing handler.
- `src/docker/server.ts` - WebUI auth/session routes and `/api/yuba/status`, `/api/cookie-source/*` route boundaries.
- `src/core/job.ts` - Yuba job entrypoint.
- `README.md` and `config.example.json` - user-facing cookie configuration guidance.

Code patterns:

- This repo parses a provided cookie header string, not `document.cookie`, using `parseCookieRecord()` / `getCookieValue()`.
  Source: `src/core/api.ts:23-37`
- This repo creates the same Douyu `dy-token` value from `acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, `acf_ltkid`, but validates all parts and throws an actionable error if any are missing.
  Source: `src/core/yuba.ts:12`, `src/core/yuba.ts:63-71`
- This repo has two Yuba header builders: PC `dy-token` / `dy-client: pc`, and mobile `token` / `client: android`.
  Source: `src/core/yuba.ts:73-92`
- This repo still contains a CSRF-cookie path using `acf_yb_t` and `X-CSRF-TOKEN` for multipart `POST /ybapi/topic/sign`.
  Source: `src/core/yuba.ts:95-100`, `src/core/yuba.ts:272-284`
- The active followed-group check-in path uses the dy-token variants: `executeFollowedYubaCheckInWithDyToken()` fetches `myFollow`, calls `fastSign`, signs each group via `signYubaGroupWithDyToken()`, and calls `supplementYubaGroup()`.
  Source: `src/core/yuba.ts:152-199`, `src/core/yuba.ts:308-385`, `src/core/yuba.ts:418-509`
- This repo's status endpoint path differs from its sign-in path: `/api/yuba/status` calls `getFollowedYubaStatuses(cookie)`, which uses legacy `getUserFollowGroupList` plus per-group `web/group/head` with only Yuba cookie headers, not the dy-token `myFollow` path.
  Source: `src/core/yuba.ts:103-150`, `src/core/yuba.ts:201-270`, `src/docker/index.ts:932-935`, `src/docker/server.ts:572-583`
- This repo separates main Douyu cookie and Yuba cookie sources. Scheduled/manual Yuba jobs resolve both and pass `(yubaCookie, mainCookie)` to the job, because Yuba auth cookies and main-site dy-token cookies can come from different domains.
  Source: `src/docker/index.ts:130-158`, `src/docker/index.ts:538-551`, `src/docker/index.ts:880-889`, `src/core/job.ts:173-181`
- CookieCloud support builds cookie headers per target URL (`https://www.douyu.com/` and `https://yuba.douyu.com/`) using domain/path/secure/expiry filtering and can persist the effective headers into manual cookies.
  Source: `src/core/cookie-cloud.ts:242-266`, `src/docker/index.ts:160-229`
- Cookie diagnostics consider main readiness keys `acf_uid`, `dy_did`, `acf_auth`, `acf_stk`; Yuba cookie keys `acf_yb_auth`, `acf_yb_uid`; and Yuba dy-token keys `acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, `acf_ltkid`.
  Source: `src/core/cookie-cloud.ts:28-30`, `src/core/cookie-cloud.ts:268-287`
- WebUI auth is unrelated to Douyu auth: the server issues `dykw_session` for the local Docker UI and protects JSON APIs, while Douyu cookies are stored separately as config/CookieCloud-derived values.
  Source: `src/docker/server.ts:52-53`, `src/docker/server.ts:180-220`, `src/docker/server.ts:572-625`
- User-facing docs already recommend CookieCloud and call out the same main dy-token cookie fields for Yuba failures.
  Source: `README.md:54-57`, `config.example.json:2-6`

### Key differences

- Runtime boundary: DouyuEx is a Tampermonkey/browser script running on Douyu/Yuba pages; this repo is a server-side Docker/Electron automation runtime. DouyuEx can read browser cookies directly and use browser userscript APIs, while this repo must be given cookie headers explicitly through manual config or CookieCloud.
- Cookie model: DouyuEx constructs `dyToken` from the current browser's `document.cookie` and does not assemble or validate a separate `Cookie` header in the Yuba sign code. This repo constructs request headers from stored cookie strings and must preserve both Yuba-domain cookies and main-domain cookies.
- Token model: both projects use the same `acf_uid_acf_biz_acf_stk_acf_ct_acf_ltkid` token for Yuba PC/mobile APIs. DouyuEx names it global `dyToken`; this repo exposes `createDouyuDyToken(mainCookie)`.
- CSRF model: DouyuEx Yuba sign source did not use `acf_yb_t` or `X-CSRF-TOKEN`; this repo still has an older CSRF/multipart sign function and an active dy-token sign function.
- Sign APIs: both projects use `myFollow`, `ybapi/topic/sign`, `mapi-yuba fastSign`, and `mapi-yuba supplement` for the main sign-in flow. This repo adds stricter body/status-code parsing, Gee/login early-stop handling, closed-group skip handling, and bounded intervals between groups.
- Status APIs: DouyuEx's sign flow gets followed groups from `wbapi/web/group/myFollow`; its `group/head` usage is in RestoreYuba UI behavior. This repo's Docker `/api/yuba/status` currently uses `wgapi/yubanc/api/user/getUserFollowGroupList` plus `wbapi/web/group/head`, not the same dy-token `myFollow` path used by its sign-in job.
- Account/session handling: DouyuEx account switching replaces browser cookies with `GM_cookie` and triggers iframe cleanup for Yuba/passport/msg/video/cz domains. This repo does not mutate browser cookies; it syncs CookieCloud snapshots, validates required cookie names, optionally persists effective headers, and uses a local `dykw_session` only for WebUI access.

### External references

- DouyuEx repository: https://github.com/qianjiachun/douyuEx
- DouyuEx README: https://github.com/qianjiachun/douyuEx/blob/master/README.md
- DouyuEx userscript metadata/version: https://github.com/qianjiachun/douyuEx/blob/master/src/main.js#L1-L59

### Related specs

- `.trellis/spec/backend/index.md` - backend pre-development checklist and documentation language rule.
- `.trellis/spec/backend/error-handling.md` - external Douyu API responses must be checked beyond HTTP status.
- `.trellis/spec/guides/docker-webui-auth-contract.md` - Docker WebUI auth, cookie, CookieCloud, and protected API boundary contract.

## Caveats / Not Found

- No active Trellis task was set by `task.py current --source`; this research used the user-specified task directory `.trellis/tasks/04-30-analyze-yuba-cookie-invalidation`.
- DouyuEx source reviewed from GitHub `master` on 2026-04-30; observed userscript version in `src/main.js` was `2026.04.24.01`.
- DouyuEx does not document Yuba auth formally; conclusions are source-derived from request headers, helper functions, and endpoint usage.
- I did not find DouyuEx using `acf_yb_t`, `acf_yb_auth`, `acf_yb_uid`, or `X-CSRF-TOKEN` in the Yuba sign-in code.
- I did not find a DouyuEx-local `/api/yuba/status` equivalent. Its status-like reads are direct Douyu endpoints such as `myFollow`, `signDetail`, and `group/head`.
- For DouyuEx `GM_xmlhttpRequest`, the source does not explicitly set a `Cookie` header. Any cookie inclusion is therefore ambient browser/userscript behavior rather than code-visible cookie assembly.
