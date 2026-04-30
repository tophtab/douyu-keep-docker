# Open source project readiness audit

## Goal

Bring the repository closer to practical open-source project conventions in two passes: first add the minimum repository hygiene files and remove stale desktop release automation, then clean up Docker release tag semantics.

## What I already know

* The initial audit is complete and the user approved starting implementation.
* The project is currently a Docker WebUI-focused Node.js/TypeScript repository.
* `package.json` declares `"license": "MIT"`, but the repository root currently has no `LICENSE` file.
* `README.md` covers Docker deployment, version iteration, configuration suggestions, disclaimer, and acknowledgements.
* `.github/workflows/docker.yml` builds and pushes the Docker image.
* `.github/workflows/release.yml` still appears to target an Electron app using Yarn/build publish flow, which may be stale after the Docker-only direction.
* Version iteration scripts now exist in `package.json`.
* The repository currently lacks obvious `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, issue templates, and PR template files.

## Assumptions

* The desired target is a practical open-source repository, not a large foundation-style governance process.
* The project should remain Docker-first unless desktop support is explicitly restored.
* Recommendations should be prioritized by impact and effort.

## Open Questions

* None for the first implementation pass. The user explicitly wants Phase 1 first, then Phase 2.

## Requirements

### Phase 1: Minimum Open-Source Hygiene

* Add a root `LICENSE` file matching the declared MIT license.
* Add `SECURITY.md` with vulnerability reporting guidance and explicit instructions not to post cookies, WebUI passwords, or raw config secrets publicly.
* Add `CHANGELOG.md` using a simple Keep a Changelog-style structure with `Unreleased` and the current `2.1.0` release entry.
* Add `CONTRIBUTING.md` with Docker-first setup, quality commands, PR expectations, and issue guidance for cookie/login/task failures.
* Add GitHub issue templates for bug reports and feature requests.
* Add a GitHub PR template with checks for lint/type-check/build, docs updates, config/schema impact, and WebUI screenshots when relevant.
* Remove or disable `.github/workflows/release.yml` because it targets stale Electron/Yarn desktop release behavior.
* Update README with concise license, security, contribution, changelog/release, and Docker tag guidance.

### Phase 2: Docker Release Pipeline Cleanup

* Refactor `.github/workflows/docker.yml` so `Vx.y.z` tags are the stable release source of truth.
* On stable tag builds, publish Docker tags for the full version only, such as `2.1.0`, plus `latest`.
* Do not publish moving major/minor aliases such as `2.1` or `2`.
* On default-branch builds, avoid synthetic patch versions and publish only non-release channel tags such as `edge` and/or `sha-*`.
* Add workflow-level least-privilege permissions.
* Add lint/build verification to the Docker workflow, not just type-check.
* Consider low-friction Buildx SBOM/provenance output if supported without complicating maintainer workflow.
* Publish Docker images for both `linux/amd64` and `linux/arm64` so NAS/home-server users on ARM64 can use the official image.

## Acceptance Criteria

* [ ] Root `LICENSE` exists and matches `package.json` MIT license.
* [ ] `SECURITY.md`, `CHANGELOG.md`, and `CONTRIBUTING.md` exist with project-specific content.
* [ ] Bug report, feature request, and PR templates exist under `.github/`.
* [ ] Stale Electron/Yarn desktop release workflow no longer runs.
* [ ] README documents license, security reporting, contribution basics, changelog/release expectations, and Docker tag guidance.
* [ ] Docker workflow publishes stable releases from `Vx.y.z` tags using full version plus `latest`.
* [ ] Docker workflow does not publish `2.1` or `2` major/minor aliases.
* [ ] Default-branch Docker builds do not invent synthetic patch versions.
* [ ] Docker workflow has explicit least-privilege permissions and runs lint/type-check/build verification.
* [ ] Docker workflow builds/publishes `linux/amd64` and `linux/arm64` images.
* [ ] Existing Web UI/version changes remain intact.

## Definition of Done

* Research findings are persisted under `research/`.
* Phase 1 is implemented before Phase 2.
* Lint, type-check, and build/test checks pass.
* No git commit or release tag is created by implementation.

## Out of Scope

* Publishing a Docker image or GitHub Release.
* Adding `CODE_OF_CONDUCT.md` unless the maintainer explicitly wants to enforce one.
* Adding CodeQL or signing/cosign workflows in this pass.
* Publishing Docker major/minor aliases such as `2.1` or `2`.
* Changing project licensing without user approval.

## Technical Notes

* Inspected files include `README.md`, `package.json`, `Dockerfile`, `docker-compose.yml`, and `.github/workflows/*.yml`.
* Research references will be written to:
  * `research/open-source-readiness.md`
  * `research/docker-github-release.md`

## Research References

* `research/open-source-readiness.md` — Common OSS community health, licensing, security, contributor readiness, and Docker/Node hardening gaps.
* `research/docker-github-release.md` — Docker/GitHub Actions release conventions, tag channel behavior, stale desktop workflow risks, and supply-chain metadata options.

## Audit Summary

### Must Fix

* Add a root `LICENSE` file matching the declared MIT license.
* Add `SECURITY.md` with private vulnerability reporting guidance and a warning not to post cookies or secrets publicly.
* Remove, disable, or replace `.github/workflows/release.yml` because it still targets a stale Electron/Yarn desktop release flow.
* Add `CHANGELOG.md` or a clear release-notes policy before the next release.
* Fix Docker release channel semantics: release tags should be the stable source of truth; Docker should publish the full version tag such as `2.1.0` plus `latest`, but should not publish moving major/minor aliases such as `2.1` or `2`.

### Should Fix

* Add `CONTRIBUTING.md` with Docker-first local setup, quality commands, branch/PR expectations, and issue triage guidance.
* Add GitHub issue templates and a PR template.
* Add Dependabot config for npm and GitHub Actions.
* Add workflow-level least-privilege `permissions`.
* Document stable version tags vs `latest`/rolling tags in README.
* Publish `linux/arm64` Docker images alongside `linux/amd64` for NAS/home-server users.

### Optional Improvements

* Add README badges for Docker workflow, Docker pulls/version, license, and release.
* Add CodeQL or another JS/TS SAST workflow.
* Add Docker Buildx SBOM/provenance outputs; consider signing only if users need signature verification.
* Add `CODE_OF_CONDUCT.md` only if the maintainer is willing to enforce it.
* Add `SUPPORT.md` or a README support section to separate questions, bugs, and security reports.

## Feasible Approaches

### Approach A: Minimum Open-Source Hygiene (Recommended First Pass)

* Add/repair project health files: `LICENSE`, `SECURITY.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, issue templates, and PR template.
* Remove or disable the stale desktop release workflow.
* Clarify README license/security/release guidance.
* Pros: high trust improvement, low code risk, quick to review.
* Cons: does not fully clean Docker tag automation yet.

### Approach B: Release Pipeline Cleanup

* Refactor Docker workflow so `Vx.y.z` tags publish the full stable version tag and `latest`; default branch publishes `edge`/`sha-*` instead of synthetic patch versions.
* Add workflow permissions, lint/build checks, and optional SBOM/provenance.
* Pros: fixes the most confusing release behavior.
* Cons: higher risk because it changes publishing semantics.

### Approach C: Full OSS Readiness Pass

* Do Approach A and B together, plus badges, Dependabot, multi-arch Docker publishing, and optional CodeQL.
* Pros: fastest path to a polished repo.
* Cons: larger diff and more decisions in one PR.
