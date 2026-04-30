# Contributing

Thanks for taking the time to improve this project. The maintained runtime is
the Docker WebUI, so contributions should keep the Docker deployment path
working first.

## Local Setup

Requirements:

- Node.js 18
- npm
- Docker, when validating image builds or Compose behavior

Install dependencies:

```bash
npm ci
```

Run the main quality checks:

```bash
npm run lint
npm run type-check
npm run build:docker
npm test
```

`npm test` currently runs the Docker TypeScript build. There is no separate
automated runtime test suite yet.

## Docker-First Development

- Shared Douyu logic belongs in `src/core/`.
- Docker WebUI, Express routes, scheduler wiring, config file IO, and logs
  belong in `src/docker/`.
- The Docker image must continue to build with `npm run build:docker`.
- Do not add Electron, Yarn desktop release, or renderer packaging work unless
  desktop support is explicitly restored.

## Pull Requests

Before opening a pull request:

- Keep the change focused and explain the user-visible impact.
- Run lint, type-check, and build/test checks.
- Update README, CHANGELOG, or examples when behavior changes.
- Call out any config shape or migration impact.
- Include WebUI screenshots for visual changes.

Do not create release commits, git tags, GitHub releases, or publish Docker
images from a normal contribution branch.

## Reporting Bugs

For login, cookie, CookieCloud, or task failures, include:

- Docker image tag
- Deployment method, such as Docker Compose or another container platform
- Sanitized logs
- Which task failed
- Whether manual cookies or CookieCloud is used
- Relevant cron/config shape with secrets removed

Never paste Douyu cookies, CookieCloud passwords, WebUI passwords, or a raw
`config.json` file into a public issue.

## Requesting Features

Describe the problem first, then the behavior you want. For Docker or WebUI
changes, include the expected deployment or screen flow.
