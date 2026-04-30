# Optimize Docker Workflow Builds

## Goal

Reduce normal Docker workflow runtime while preserving multi-architecture release images. Normal branch and pull request builds should avoid expensive arm64 emulation; release tag builds should still publish amd64 and arm64 images efficiently.

## Requirements

* Keep pull request validation and default-branch Docker publishing focused on `linux/amd64`.
* Keep release tag publishing as a multi-architecture image for `linux/amd64` and `linux/arm64`.
* Avoid QEMU for normal builds.
* Prefer native arm64 hosted runners for release arm64 builds when GitHub Actions supports them.
* Add Buildx GitHub Actions cache so dependency-install layers and other reusable Docker build layers can be reused across runs.
* Keep existing tag/channel behavior:
  * default branch pushes publish `edge`
  * release tags matching `Vx.y.z` or `vx.y.z` publish `<version>` and `latest`
  * pull requests build but do not push images
* Keep lint, type-check, and Docker build validation in the workflow.

## Acceptance Criteria

* [ ] Pull request and default-branch runs build only `linux/amd64`.
* [ ] Release tag runs build both `linux/amd64` and `linux/arm64`.
* [ ] Release arm64 builds run on a native arm64 runner instead of QEMU.
* [ ] Release multi-arch tags resolve to a manifest list covering both architectures.
* [ ] Buildx cache is configured for Docker image builds.
* [ ] Workflow YAML is syntactically valid and preserves existing Docker Hub login behavior.

## Definition of Done

* Workflow structure is clear enough to maintain.
* `npm run lint` and `npm run type-check` pass locally if code/config changes warrant it.
* The final review checks branch, pull request, and release tag behavior separately.

## Technical Approach

Use a single workflow with separate jobs rather than separate workflow files:

* A validation job runs checkout, Node setup, dependency install, lint, type-check, and Docker runtime compile once.
* A normal Docker job builds and optionally pushes `linux/amd64` for pull requests and default-branch pushes.
* Release builds use a platform matrix:
  * `linux/amd64` on `ubuntu-latest`
  * `linux/arm64` on `ubuntu-24.04-arm`
* Release platform jobs push temporary per-architecture tags.
* A final release manifest job combines those temporary tags into the public version tags using `docker buildx imagetools create`.
* Docker build steps use `cache-from: type=gha` and `cache-to: type=gha,mode=max`.

## Decision (ADR-lite)

**Context**: Building `linux/arm64` on an amd64 runner via QEMU made npm and TypeScript steps dominate runtime. Normal master builds do not need a release-grade multi-arch image.

**Decision**: Keep normal builds amd64-only. Reserve multi-arch output for release tags, split release architecture builds across native runners, and merge the result into a manifest list.

**Consequences**: Release workflow is more structured, with temporary architecture tags and a manifest merge job. Normal runs should be much faster, while release runs retain multi-arch support and should avoid the QEMU penalty.

## Out of Scope

* Changing the Dockerfile runtime architecture or Node version.
* Changing application code.
* Publishing non-release branch images beyond the existing `edge` behavior.
* Adding GHCR publishing.

## Technical Notes

* Current slow path was observed in GitHub Actions logs: arm64 `npm ci`, runtime dependency install, and `npm run build:docker` were much slower under QEMU.
* Relevant files:
  * `.github/workflows/docker.yml`
  * `Dockerfile`
  * `package.json`
* Official references checked before task creation:
  * Docker Buildx GitHub Actions cache supports `cache-from: type=gha` and `cache-to: type=gha,mode=max`.
  * Docker documents splitting multi-platform builds across runners and merging manifests.
  * GitHub hosted runners include Linux arm64 labels such as `ubuntu-24.04-arm`.
