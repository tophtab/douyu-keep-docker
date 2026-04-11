# Fix Docker Web UI Click Handlers

## Goal
Restore click and tab interactions in the Docker Web UI when the page is served in environments that do not execute inline HTML event handlers.

## Requirements
- Replace inline `onclick` and `onchange` handlers in the Docker Web UI with script-based event listeners.
- Preserve current behavior for tab switching, trigger actions, config saves, theme switching, and page refresh actions.
- Keep dynamic editor sections functional after they re-render.

## Acceptance Criteria
- [ ] Sidebar tab buttons switch pages again.
- [ ] Action buttons in overview, cookie, keepalive, double-card, medals, and logs respond again.
- [ ] Theme mode still changes through script-based listeners.
- [ ] No inline event handlers remain in the generated Docker HTML.

## Technical Notes
The current page relies on inline handlers inside static HTML and dynamic `innerHTML` fragments. This is brittle under CSP or sanitizing environments, so the fix should use delegated listeners on the document instead.
