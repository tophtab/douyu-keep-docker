# Refine Refresh Controls And Audit Fluorescent Gift Scheduling

## Goal
Refine the Docker WebUI task controls, explain and preserve the intended double-card distribution logic, add visible cron run previews, and remove the surprising auto-run behavior that causes unexpected fluorescent-gift collection.

## Requirements
- Simplify the overview page so it focuses on fan status rather than duplicating every task panel.
- Keep a compact overview summary that shows whether login, collect, keepalive, and double-card are enabled.
- Rename or present the overview content so the fan badge list is the primary content of the page.
- Move task status cards into their corresponding pages:
  - login/cookie page shows login status and collect-task status
  - keepalive page shows keepalive task status
  - double-card page shows double-card task status
- Remove the redundant `刷新粉丝牌并同步` button from the keepalive page.
- Remove the redundant `刷新粉丝牌并同步` button from the double-card page.
- Keep fan synchronization available through the overall refresh flow and existing overview refresh behavior.
- Show the next three scheduled run times in small helper text below each cron input on the collect, keepalive, and double-card task forms.
- Reuse shared cron-preview logic instead of introducing duplicate parsing behavior.
- Change the default collect-task cron so new/default configs try twice after midnight: `00:10` and `01:10` Shanghai time.
- Adjust the Docker WebUI primary accent buttons/theme:
  - light mode should use an orange primary action palette
  - dark mode should use a darker muted accent instead of bright neon blue/teal
- Preserve the current double-card allocation semantics, but make the logic easier to understand and document for the user.
- Stop scheduled Docker jobs from running immediately on startup or task reload; they should wait for the next cron trigger unless manually triggered.
- Keep log and status behavior consistent after the scheduler change.

## Acceptance Criteria
- [ ] Overview page shows compact enabled/disabled summary plus the fan badge list as the main content.
- [ ] Login and collect page shows both login status and collect-task status.
- [ ] Keepalive page shows its own task status card.
- [ ] Double-card page shows its own task status card.
- [ ] Keepalive page no longer shows a fan-sync button.
- [ ] Double-card page no longer shows a fan-sync button.
- [ ] Each cron input shows the next three execution times when the expression is valid.
- [ ] Default collect-task cron is `0 10 0,1 * * *` for new/default configs and UI fallbacks.
- [ ] Light and dark themes use the revised button/accent colors.
- [ ] Saving or reloading Docker task config does not immediately execute collect, keepalive, or double-card jobs.
- [ ] Manual task triggers still work.
- [ ] Docker and shared-core builds pass.
- [ ] User-facing explanation of the current double-card `-1` / remainder logic is ready.

## Technical Notes
- This is a cross-layer change touching Docker WebUI (`src/docker/html.ts`), Docker scheduler/runtime (`src/docker/index.ts`, `src/docker/server.ts`, `src/docker/cron.ts`), and shared gift-allocation logic in `src/core/gift.ts` / `src/core/job.ts`.
- Cron preview should use the same timezone semantics (`Asia/Shanghai`) already used by Docker status and logs.
- The fluorescent-gift anomaly appears related to task boot/reload behavior rather than only cron cadence, so the scheduling contract must be tightened.
- Page restructuring should reuse the existing overview/status payload instead of introducing a second status-fetch mechanism.
