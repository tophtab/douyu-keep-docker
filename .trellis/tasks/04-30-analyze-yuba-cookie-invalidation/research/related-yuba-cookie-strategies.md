# Research: related Yuba cookie strategies

- Query: Research related Douyu Yuba check-in projects, especially `qianfeiqianlan/yuba-check-in` and maintained examples, for required cookies, token construction, API endpoints, expiration handling, and refresh strategy.
- Scope: mixed
- Date: 2026-04-30

## Findings

### Local project baseline

Files found:

- `src/core/yuba.ts` - Current headless Yuba implementation and endpoint/header strategy.
- `src/core/cookie-cloud.ts` - CookieCloud import, URL-scoped cookie selection, expiry filtering, and diagnostics.
- `src/docker/index.ts` - Runtime cookie resolution and persistence of CookieCloud snapshots into local manual cookies.
- `README.md` - User-facing cookie guidance and upstream project acknowledgements.
- `.trellis/tasks/04-30-analyze-yuba-cookie-invalidation/prd.md` - Task goal and initial assumptions for Yuba cookie invalidation analysis.

Code patterns:

- `src/core/yuba.ts:12` defines the main-site cookie keys used for `dy-token`: `acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, `acf_ltkid`.
- `src/core/yuba.ts:63`-`src/core/yuba.ts:70` constructs `dy-token` by joining those five cookie values with `_` and fails fast when any are missing.
- `src/core/yuba.ts:73`-`src/core/yuba.ts:90` uses two token header shapes: web endpoints get `dy-client: pc` plus `dy-token`; mobile endpoints get `client: android` plus `token`.
- `src/core/yuba.ts:95`-`src/core/yuba.ts:100` still has an older CSRF helper requiring `acf_yb_t`, but the primary dy-token path does not call it.
- `src/core/yuba.ts:159`-`src/core/yuba.ts:164` gets followed groups from `https://yuba.douyu.com/wbapi/web/group/myFollow?page=<n>&limit=30`.
- `src/core/yuba.ts:308`-`src/core/yuba.ts:332` signs a group through `POST https://yuba.douyu.com/ybapi/topic/sign` with body `group_id=<id>` and dy-token headers.
- `src/core/yuba.ts:335`-`src/core/yuba.ts:351` attempts fast sign through `POST https://mapi-yuba.douyu.com/wb/v3/fastSign` with mobile token headers.
- `src/core/yuba.ts:354`-`src/core/yuba.ts:385` attempts supplement through `POST https://mapi-yuba.douyu.com/wb/v3/supplement`.
- `src/core/yuba.ts:388`-`src/core/yuba.ts:394` treats Gee, login, Cookie, `acf_yb_t`, and token failures as stop-early signals.
- `src/core/cookie-cloud.ts:28`-`src/core/cookie-cloud.ts:30` diagnostics require main keys `acf_uid`, `dy_did`, `acf_auth`, `acf_stk`; Yuba cookie keys `acf_yb_auth`, `acf_yb_uid`; and Yuba dy-token main keys `acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, `acf_ltkid`.
- `src/core/cookie-cloud.ts:143`-`src/core/cookie-cloud.ts:145` filters expired CookieCloud cookies by `expirationDate`.
- `src/core/cookie-cloud.ts:242`-`src/core/cookie-cloud.ts:265` builds URL-scoped cookie headers by domain, path, expiry, and secure flag, selecting the most specific cookie per name.
- `src/docker/index.ts:160`-`src/docker/index.ts:191` can force-refresh CookieCloud to compute effective cookies, but task execution later resolves from config/local manual cookies.
- `src/docker/index.ts:194`-`src/docker/index.ts:207` persists effective CookieCloud cookies into `manualCookies.main` and `manualCookies.yuba`.
- `README.md:54`-`README.md:57` tells users to sync complete Douyu cookies and verify Yuba cookie state plus the five dy-token main-site cookies.

### `qianfeiqianlan/yuba-check-in`

Sources:

- Repository: https://github.com/qianfeiqianlan/yuba-check-in
- Latest observed commit: https://github.com/qianfeiqianlan/yuba-check-in/commit/f63b7a59271b5933cf623bec01a3cf47465532de (2026-04-23, version v1.0.6)
- README: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/README.md
- Manifest: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/manifest.json
- Content script: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/content.js
- Background script: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/background.js
- My-groups auto sign script: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/js/mygroups-auto-sign.js

Observed strategy:

- It is a Chrome extension, not a headless HTTP implementation.
- Required cookies are implicit browser cookies for `https://*.douyu.com/*`; the extension does not enumerate or copy cookie names.
- `manifest.json` grants `https://*.douyu.com/*` host access and injects scripts on Yuba discussion pages, `mygroups`, and all Douyu pages.
- `content.js` only runs when `open_type=auto_check_in` is present, polls for a page element whose text is `签到`, clicks it, then closes the tab when the button disappears.
- `background.js` opens either each saved group page as `https://yuba.douyu.com<group.href>?open_type=auto_check_in` or `https://yuba.douyu.com/mygroups?open_type=auto_check_in`.
- `js/mygroups-auto-sign.js` scrolls the browser `mygroups` page, collects `/discussion/<id>/posts` links from rendered DOM, then delegates to `background.js` to open those pages.
- Token construction: none in code. The real page and Douyu frontend construct whatever headers or CSRF material are current.
- API endpoints: none directly called by extension code for sign-in. It relies on Yuba page JavaScript and DOM.
- Expiration handling: no explicit cookie expiry detection. Browser session state decides success; failure modes are page/DOM changes or logged-out Yuba state.
- Refresh strategy: user/browser-driven. Re-login or visiting Yuba in the browser refreshes cookies; the extension then automatically benefits from the live browser cookie jar.

Interpretation for this task:

- This project is "maintained" and useful as a resilient reference because it avoids stale exported cookies entirely.
- It does not provide cookie-name requirements for a Docker/headless process. Its practical lesson is that the most reliable refresh strategy is to execute in the browser session or refresh from a browser-originated cookie source immediately before sign-in.

### `qianjiachun/douyuEx`

Sources:

- Repository: https://github.com/qianjiachun/douyuEx
- Latest observed commit: https://github.com/qianjiachun/douyuEx/commit/3fc1ec476506a0694198ab5bee148a75bdef0cae (2026-04-24 release)
- Yuba sign package: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js
- Common helpers: https://github.com/qianjiachun/douyuEx/blob/master/src/common.js
- Userscript build: https://github.com/qianjiachun/douyuEx/blob/master/dist/douyuex.user.js
- Restore Yuba package: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/RestoreYuba/RestoreYuba.js

Observed strategy:

- It is a browser userscript/extension-style project, but its Yuba package calls the same HTTP endpoints this repo uses.
- Required cookies are read from `document.cookie`, so it depends on live browser cookies rather than an exported Docker cookie header.
- `src/common.js` initializes `dyToken` once with `getToken()`.
- `src/common.js` constructs `dyToken` as `acf_uid_acf_biz_acf_stk_acf_ct_acf_ltkid`.
- `src/packages/Sign/Sign_Yuba.js` uses `dy-token` with `dy-client: pc` for web endpoints.
- `src/packages/Sign/Sign_Yuba.js` uses `token` with `client: android` for mobile endpoints.
- Endpoints:
  - `POST https://mapi-yuba.douyu.com/wb/v3/fastSign`
  - `POST https://yuba.douyu.com/ybapi/topic/sign`
  - `GET https://yuba.douyu.com/wbapi/web/group/myFollow?page=<n>&limit=30`
  - `GET https://yuba.douyu.com/wbapi/web/signDetail?group_id=<id>`
  - `POST https://mapi-yuba.douyu.com/wb/v3/supplement`
  - `GET https://yuba.douyu.com/wbapi/web/group/head?group_id=<id>` in RestoreYuba
- `POST /ybapi/topic/sign` sends only `group_id=<id>` in URL-encoded form; it does not send the older `cur_exp` field.
- Retry handling: when sign response message is `签到失败`, it sleeps 2 seconds and retries, capped by `signCountMap[group_id] >= 10`.
- Expiration handling: no explicit stale-cookie detector for Yuba sign. Because it runs in-browser, refreshed cookies are available through `document.cookie`.
- Refresh strategy: live browser state. The userscript can access cookies through `document.cookie` and, in its built output, declares `GM_cookie`, but the Yuba sign flow itself relies on the current page/session cookie state plus reconstructed `dyToken`.

Interpretation for this task:

- This is the closest maintained API-level reference.
- The local project's dy-token, fast sign, myFollow, sign, and supplement strategy closely matches DouyuEx.
- DouyuEx does not prove that `acf_yb_auth`/`acf_yb_uid` are sufficient for headless execution; it bypasses the exported-cookie problem by executing in a browser where hidden/session cookies and recent rotations are already present.

### Other related examples checked

Sources:

- `Curtion/douyu-keep`: https://github.com/Curtion/douyu-keep
- Latest observed commit: https://github.com/Curtion/douyu-keep/commit/d3bb0b65b4f97d4e56bbbeb457fc4c3bb73e9456 (2025-12-24)

Observed strategy:

- Repository search through the GitHub tree did not find Yuba-specific files or endpoint strings.
- It remains relevant as the original upstream for Douyu keepalive/gift behavior, but not as evidence for Yuba cookie invalidation or refresh.

### Concise comparison

| Project | Runtime model | Cookie requirement | Token construction | Sign/list endpoints | Expiration handling | Refresh strategy |
|---|---|---|---|---|---|---|
| `douyu-keep-just-works` current | Docker/headless HTTP | Separate Yuba cookie plus main Douyu cookies; diagnostics check `acf_yb_auth`, `acf_yb_uid`, and dy-token main keys | `acf_uid_acf_biz_acf_stk_acf_ct_acf_ltkid` from main cookie | `myFollow`, `topic/sign`, `fastSign`, `supplement` | Filters expired CookieCloud cookies; stops on login/token/Gee messages | CookieCloud sync/persist into manual snapshot; task execution uses persisted local cookies |
| `qianfeiqianlan/yuba-check-in` | Chrome extension with real tabs | Live browser login state on `*.douyu.com`; no cookie names listed | None in extension | No direct API calls; clicks rendered `签到` button | None explicit | Browser login/visit refreshes naturally |
| `qianjiachun/douyuEx` | Browser userscript/extension-style HTTP calls | Live browser cookies available via `document.cookie` | Same five-key dy-token | Same core endpoints as this repo | Retries transient `签到失败`; no explicit stale-cookie detector | Browser cookie jar refreshes naturally |
| `Curtion/douyu-keep` | Headless/Electron app reference for Douyu tasks | Not Yuba-specific in checked tree | Not found for Yuba | Not found for Yuba | Not found for Yuba | Not found for Yuba |

### Practical conclusions

- Maintained browser examples avoid the observed Docker failure class by never freezing a CookieCloud snapshot into a long-lived local cookie header.
- The headless API strategy in this repo is aligned with DouyuEx for token and endpoints, so the likely problem is not the endpoint set itself.
- The fragile boundary is freshness and completeness of Yuba-domain cookies versus main-site cookies. A browser visit to Yuba can rotate or restore Yuba-specific cookies; CookieCloud then sees the updated jar, while the container may continue using a stale persisted snapshot until a forced refresh and persist happens.
- For a Docker/headless fix, the best low-risk direction is to refresh CookieCloud immediately before Yuba execution, persist/use that fresh effective snapshot, diagnose exact missing/stale Yuba-domain keys, and stop treating a previously persisted Yuba cookie as authoritative when CookieCloud is active.
- A broader but higher-cost direction is to add an optional "browser-driven" mode similar to `qianfeiqianlan/yuba-check-in`; this would be more resilient but does not fit the current Docker-only HTTP architecture.

## External References

- `qianfeiqianlan/yuba-check-in`: https://github.com/qianfeiqianlan/yuba-check-in
- `qianfeiqianlan/yuba-check-in` latest observed commit: https://github.com/qianfeiqianlan/yuba-check-in/commit/f63b7a59271b5933cf623bec01a3cf47465532de
- `qianfeiqianlan/yuba-check-in` README: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/README.md
- `qianfeiqianlan/yuba-check-in` manifest: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/manifest.json
- `qianfeiqianlan/yuba-check-in` content script: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/content.js
- `qianfeiqianlan/yuba-check-in` background script: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/background.js
- `qianfeiqianlan/yuba-check-in` mygroups auto sign script: https://github.com/qianfeiqianlan/yuba-check-in/blob/master/js/mygroups-auto-sign.js
- `qianjiachun/douyuEx`: https://github.com/qianjiachun/douyuEx
- `qianjiachun/douyuEx` latest observed commit: https://github.com/qianjiachun/douyuEx/commit/3fc1ec476506a0694198ab5bee148a75bdef0cae
- `qianjiachun/douyuEx` Yuba sign package: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/Sign/Sign_Yuba.js
- `qianjiachun/douyuEx` common helpers: https://github.com/qianjiachun/douyuEx/blob/master/src/common.js
- `qianjiachun/douyuEx` RestoreYuba package: https://github.com/qianjiachun/douyuEx/blob/master/src/packages/RestoreYuba/RestoreYuba.js
- `Curtion/douyu-keep`: https://github.com/Curtion/douyu-keep
- `Curtion/douyu-keep` latest observed commit: https://github.com/Curtion/douyu-keep/commit/d3bb0b65b4f97d4e56bbbeb457fc4c3bb73e9456

## Related Specs

- `.trellis/spec/backend/index.md` - Backend guide index and pre-development checklist.

## Caveats / Not Found

- GitHub code search API required authentication, so repository discovery used public repository search, tree listings, direct raw files, and known upstream links from this repo.
- No official Douyu/Yuba API documentation was found or expected for these private endpoints.
- `qianfeiqianlan/yuba-check-in` is maintained and directly relevant operationally, but it is not an API/cookie reconstruction reference because it clicks the browser page.
- `qianjiachun/douyuEx` confirms the dy-token and endpoint shape, but it also runs against live browser state; it does not answer exactly which exported Yuba cookies are required in a Docker-only header.
- The local diagnostics currently do not require `acf_yb_t`, while older local code paths can require it. The active dy-token execution path does not use `getYubaCsrfToken`, but status/legacy paths may still matter if reused later.
