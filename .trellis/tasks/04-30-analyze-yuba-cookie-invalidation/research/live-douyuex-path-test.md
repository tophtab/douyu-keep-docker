# Live Test: DouyuEx-style Yuba list/status path

- Date: 2026-04-30
- Scope: local read-only test using configured CookieCloud/manual cookies.
- Secret handling: no cookie values or tokens were printed; output recorded only lengths, missing key names, equality booleans, and response status summaries.

## User correction

The observed failure is not mainly "container does not refresh before execution".

The reported pattern is:

* CookieCloud cloud-side Yuba cookie becomes shorter or incomplete.
* WebUI "sync and verify" reports missing Yuba cookie fields.
* Visiting/logging into Douyu Yuba in the browser causes browser CookieCloud plugin to upload a fuller Yuba cookie set.
* Downloading that updated CookieCloud snapshot into this project restores functionality.

## Read-only test results

Current configured CookieCloud snapshot:

* Main CookieCloud cookie can build `dy-token`.
* Yuba CookieCloud cookie currently contains the checked Yuba fields in this environment.
* `GET https://yuba.douyu.com/wbapi/web/group/myFollow?page=1&limit=3` returned `status_code: 200`, empty message, and list data when called with CookieCloud main `dy-token`.
* The same `myFollow` request also returned `status_code: 200` when the HTTP `Cookie` header was empty and only the `dy-token` header was present.
* `GET https://yuba.douyu.com/wbapi/web/group/head?group_id=<id>` returned `status_code: 200` and included level/sign-state fields when called with empty `Cookie` and only `dy-token`.
* A stricter field coverage check for the current `YubaGroupStatus` shape passed with empty `Cookie` and only `dy-token`:
  * `myFollow` covered `groupId`, `groupName`, `unreadFeedNum`, and pagination.
  * `group/head` covered `groupLevel`, `groupExp`, `nextLevelExp`, `groupTitle`, `rank`, and `isSigned`.

Current persisted manual snapshot:

* Main manual cookie had all five `dy-token` source keys by name.
* `myFollow` returned `status_code: 4207`, message `登录过期`, both with and without a Yuba cookie header.
* Comparing manual versus CookieCloud source keys without printing values showed `acf_stk` differed while the other four dy-token source keys were equal.

## Interpretation

* DouyuEx-style list/status reads can work without complete Yuba-domain cookies when the main-site `dy-token` is fresh and valid.
* DouyuEx-style list/status reads can preserve the current Yuba status UI data shape when `myFollow` and per-group `group/head` are combined.
* Local diagnostics currently conflate at least two readiness concepts:
  * legacy/full Yuba cookie readiness (`acf_yb_auth`, `acf_yb_uid`, maybe `acf_yb_t`);
  * DouyuEx-style dy-token readiness (`acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, `acf_ltkid`).
* A CookieCloud Yuba cookie becoming short should not necessarily block Yuba list/status if the main-site dy-token is fresh.
* "Field exists" is not enough: stale `acf_stk` can produce a syntactically valid dy-token that Douyu returns as expired.

## Candidate fix direction

* Split diagnostics into "main dy-token ready" and "legacy/full Yuba cookie ready" instead of a single `yubaCookieReady`.
* Move WebUI Yuba list/status loading to the dy-token path (`myFollow` + `group/head` with dy-token), matching DouyuEx.
* Re-evaluate whether Yuba sign-in actually needs `acf_yb_auth` / `acf_yb_uid` in this headless implementation, because the current active sign path already uses dy-token headers.
