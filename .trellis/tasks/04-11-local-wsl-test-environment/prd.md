# brainstorm: local WSL test environment

## Goal

Set up a local WSL-based development and test environment for this project so future checks can run directly inside WSL instead of depending on Docker deployment.

## What I already know

* The user wants the project to be runnable and testable directly inside WSL.
* The project currently documents Docker deployment for runtime usage and `yarn`-based local development.
* The repository has a Node/Electron/Vue toolchain with `package.json`, `package-lock.json`, `yarn.lock`, `.eslintrc`, `vite.config.js`, and multiple TypeScript configs.
* Current npm scripts are `dev`, `build`, `build:win`, `build:mac`, `build:linux`, `build:docker`, and `up`.
* There is no existing `test`, `lint`, or `typecheck` script exposed in `package.json`.
* The repo contains Docker-specific runtime code under `src/docker/` and Docker deployment docs in `README.md`.

## Assumptions

* The desired outcome is at least: installable dependencies, documented local setup, and runnable local verification commands inside WSL.
* Some project checks may need to be introduced or normalized because the current package scripts do not expose them.
* The user prefers a non-Docker workflow for development verification, even if Docker artifacts remain supported for deployment.

## Requirements

* The project can install its JavaScript dependencies in WSL.
* The project exposes a stable npm-based local command path for future AI-run verification in WSL.
* The setup should reduce or remove the need to use Docker for routine local checks.
* The solution should stay minimal and should not introduce a new automated test framework in this task.

## Acceptance Criteria

* [x] A documented WSL-local setup flow exists.
* [x] Required package-manager/runtime tools are installed or clearly defined.
* [x] At least one local verification command can be run successfully in WSL.
* [x] The resulting workflow does not require Docker for normal local verification.

## Definition of Done (team quality bar)

* Tests added/updated (unit/integration where appropriate)
* Lint / typecheck / CI green
* Docs/notes updated if behavior changes
* Rollout/rollback considered if risky

## Out of Scope (explicit)

* Replacing Docker deployment support for users who still want container-based runtime
* Large functional refactors unrelated to local development/test workflow
* Introducing a new formal unit/integration test framework

## Technical Approach

Use the existing npm-compatible build pipeline instead of introducing a second local workflow:

* add `build:compile` as the shared compile step for renderer/main
* add `verify:wsl` as the non-packaging WSL verification entrypoint
* document npm-first local setup in `README.md`
* pin the recommended local Node major with `.nvmrc`

## Decision (ADR-lite)

**Context**: The repo already supports local Node-based compilation, but the documented local workflow was Yarn-first and there was no explicit WSL verification command. Full `npm run build` in WSL also depends on extra Linux packaging tools such as `rpm`.

**Decision**: Standardize WSL local verification on npm with a new `verify:wsl` command that compiles code without packaging installers. Keep full packaging available as an optional path documented separately.

**Consequences**: Routine WSL checks no longer depend on Docker or Yarn being globally installed. Full Linux package builds still require additional system packages when needed.

## Technical Notes

* Inspected `package.json`: scripts existed for dev/build/docker build, but no explicit local verification command surface.
* Inspected `README.md`: local development originally said `yarn` + `yarn dev`; Docker docs remained the primary runtime guidance.
* Verified in WSL:
  * `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci --ignore-scripts`
  * `npm run verify:wsl`
* `npm run build` reaches `electron-builder`, but full Linux packaging still needs `rpm` (`rpmbuild`) installed in WSL.
