# Web UI medal list and emoji favicon

## Goal
Improve the Docker Web UI overview so the medal section also shows current glow stick inventory details, and switch the browser tab icon to a fishing emoji.

## Requirements
- Show the current glow stick count near the overview medal list.
- Show the glow stick expiration time in the same overview area.
- Keep existing medal and double-card status rendering intact.
- Replace the Docker Web UI favicon with an emoji-based icon.

## Acceptance Criteria
- [ ] The overview medal section shows glow stick count.
- [ ] The overview medal section shows glow stick expiration time when available.
- [ ] The favicon shown in the browser tab uses a fishing emoji.
- [ ] `npm run build:docker` and relevant type checks pass.

## Technical Notes
- Reuse the existing backpack API request and extend it to expose expiration data.
- Keep the overview API surface explicit instead of duplicating global gift data into each medal row.
