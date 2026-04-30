# Dy-Token Yuba Check-In Flow

## Goal

Change Yuba check-in to follow the douyuEx-style flow without adding a browser runtime: construct `dyToken` from synchronized Douyu main-site cookies, run fast Yuba sign first, sign followed groups one by one, then run supplementary sign for each group.

## What I already know

* douyuEx builds `dyToken` as `acf_uid_acf_biz_acf_stk_acf_ct_acf_ltkid` from browser cookies.
* The Docker runtime already synchronizes CookieCloud into local main and Yuba cookie snapshots.
* The current implementation signs with `acf_yb_t` / `X-CSRF-TOKEN` and does not run fast sign or supplementary sign.
* A read-only live check confirmed the current CookieCloud main cookie contains all five `dyToken` fields.
* A read-only live check confirmed `GET https://yuba.douyu.com/wbapi/web/group/myFollow?page=1&limit=3` works with `dy-token` and returns `data.list` plus `data.count_page`.

## Requirements

* Do not add a browser or browser automation dependency.
* Build `dyToken` from the main-site cookie fields `acf_uid`, `acf_biz`, `acf_stk`, `acf_ct`, and `acf_ltkid`.
* Scheduled and manual Yuba check-in must pass both main-site cookie and Yuba cookie to the core Yuba workflow.
* Followed-group check-in should:
  * run fast sign first using `POST https://mapi-yuba.douyu.com/wb/v3/fastSign`;
  * fetch followed groups through `GET https://yuba.douyu.com/wbapi/web/group/myFollow`;
  * sign each group through `POST https://yuba.douyu.com/ybapi/topic/sign` with `dy-token`;
  * run supplementary sign through `POST https://mapi-yuba.douyu.com/wb/v3/supplement` after the group sign attempt.
* Preserve bounded retries and do not copy douyuEx's unbounded retry risk.
* Keep user-facing errors actionable and do not log secret cookie/token values.

## Acceptance Criteria

* [x] TypeScript build passes.
* [x] Lint passes.
* [x] Live CookieCloud-driven Yuba check-in can be triggered without a browser.
* [x] Logs show fast sign, followed-group sign, and supplementary sign outcomes without secrets.

## Definition of Done

* Lint / typecheck / Docker build green.
* Spec update considered for the new Yuba sign contract.

## Out of Scope

* Adding browser deployment.
* Changing UI controls.
* Storing `dyToken` in config.
* Reusing douyuEx code verbatim.

## Technical Notes

* `src/core/yuba.ts` owns Yuba API calls and batching.
* `src/core/job.ts` owns job-level Yuba mode dispatch.
* `src/docker/index.ts` resolves per-host cookies for scheduled and manual tasks.
