# Fix Docker WebUI Login Stays On Password Screen

## Goal
Fix the Docker WebUI login flow so that entering the correct `WEB_PASSWORD` transitions the user out of the password screen and into the management console.

## Requirements
- Diagnose why the WebUI still renders the password form after a login attempt.
- Ensure successful login persists authentication state correctly for subsequent requests.
- Ensure the UI switches to the authenticated shell immediately after a successful login.

## Acceptance Criteria
- [ ] Submitting the correct password to the Docker WebUI opens the authenticated app shell without requiring a manual refresh.
- [ ] Authenticated follow-up API requests succeed using the issued session state.
- [ ] Invalid password attempts still show an error and keep the user on the login form.

## Technical Notes
- This bug likely spans the Docker Express auth endpoints and the static WebUI auth state handling.
- The session contract and cookie behavior must remain compatible with the existing Docker WebUI auth flow.
