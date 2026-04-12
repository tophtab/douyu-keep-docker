# Add Docker WebUI login

## Goal
Add a login page for the Docker WebUI, validate access with a password, and expose an initial default password of `password` from the compose configuration.

## Requirements
- Add a login page before users can access the Docker WebUI.
- Add backend password validation for login requests.
- Store or read the initial password from the Docker compose environment/configuration.
- Keep the implementation compatible with the existing Docker runtime and WebUI entrypoint.

## Acceptance Criteria
- [ ] Unauthenticated users see a login page instead of the protected Docker WebUI.
- [ ] Submitting the correct password grants access to the Docker WebUI.
- [ ] Submitting an incorrect password shows a clear validation failure and does not grant access.
- [ ] The default startup configuration defines the initial password as `password` in compose-related config.

## Technical Notes
- This likely spans `src/docker/server.ts`, `src/docker/html.ts`, and compose/runtime config files.
- Prefer a minimal session/auth mechanism that fits the existing Docker WebUI architecture.
