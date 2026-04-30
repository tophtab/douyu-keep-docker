# Fix Docker publish workflow failure

## Goal

Fix the failing Docker Build & Push GitHub Actions workflow and restore the preferred Docker-only versioning flow: default-branch pushes automatically publish the next patch image tag, while manual `v/Vx.y.z` tags publish an explicit version line.

## What I already know

* The user only uses the Docker build/distribution path and does not intend to publish anything to npm.
* The project version metadata is being moved to `2.2.0` in `package.json` and `package-lock.json`.
* The pushed commit triggered `Docker Build & Push` run `25163349644`, which failed.
* `gh run view 25163349644 --log-failed` shows the failing step is `Prepare Docker tags`.
* Failure cause: the workflow used `GITHUB_DEFAULT_BRANCH` under `set -u`, but that environment variable is not provided by GitHub Actions.
* The user prefers the earlier automatic patch scheme:
  * Each `master` push should publish the next patch number in the current `package.json` major/minor line.
  * Existing version lines continue by incrementing from Docker Hub tags, for example `2.1.1` -> `2.1.2`.
  * A new bigger version line starts from the manually selected base version, for example `package.json` `2.2.0` publishes `2.2.0` when no `2.2.*` tag exists yet.
  * The user may also manually create a `v/V2.2.0` git tag to publish an exact explicit version.

## Assumptions

* README should stay close to its original concise user-facing structure and should not become a maintainer/contributor manual.
* `package.json.version` is the base version line for automatic patching.
* Docker Hub existing numeric tags are the source for deciding the next patch on default-branch builds.
* No npm release/version helper scripts are needed.

## Requirements

* Fix `.github/workflows/docker.yml` so default branch detection does not use undefined `GITHUB_DEFAULT_BRANCH`.
* Restore automatic patch tag behavior for default-branch pushes:
  * read `package.json.version`
  * derive `major.minor`
  * query Docker Hub for existing matching `major.minor.patch` tags
  * publish `max(existingPatch + 1, basePatch)` when matching tags exist, otherwise publish the base package version
  * publish that numeric Docker tag and `latest`
* Support manual explicit release tags with either uppercase or lowercase prefix:
  * `V2.2.0` and `v2.2.0` both publish Docker tags `2.2.0` and `latest`
* Pull request builds must validate only and must not log in to Docker Hub or push images.
* Do not publish moving major/minor aliases such as `2.1` or `2`.
* Keep multi-arch Docker platforms `linux/amd64,linux/arm64`.
* Keep QEMU setup before Buildx.
* Restore README to a concise structure close to the pre-open-source-readiness version:
  * top nav: Docker deployment, configuration suggestions, acknowledgements
  * keep intro, Docker deployment, configuration suggestions, disclaimer, acknowledgements
  * do not include expanded `镜像标签`, `参与贡献`, `安全问题`, or `许可证` sections in README
* Keep contributor/security/license details in their dedicated files instead of surfacing them in README.
* Remove `package.json` scripts for `version:*` and `release:*` if present.
* Update Trellis spec to document this Docker-only auto-patch release behavior instead of npm release helper scripts.
* Set `package.json` and `package-lock.json` version metadata to `2.2.0`.
* Do not create commits, tags, GitHub releases, npm publishes, or Docker publishes during implementation.

## Acceptance Criteria

* [ ] Workflow no longer references undefined `GITHUB_DEFAULT_BRANCH`.
* [ ] Default-branch tag-preparation simulation produces the base version for a new version line, then the next numeric patch tag after existing tags.
* [ ] Manual `Vx.y.z` and `vx.y.z` tag simulations publish exact numeric tag and `latest`.
* [ ] Pull request simulation performs no Docker push.
* [ ] Workflow does not publish `edge`, `sha-*`, `2.1`, or `2` tags.
* [ ] README structure is close to the original concise deployment README and does not include expanded contributor/security/license/tag/version sections.
* [ ] `package.json` does not contain `version:*` or `release:*` scripts.
* [ ] Trellis specs describe the Docker-only auto-patch workflow.
* [ ] Lint, type-check, and build/test pass.

## Definition of Done

* Relevant checks pass locally.
* No release/tag/publish side effects are created.
* User gets a clear explanation of the Docker-only auto-patch release flow.

## Out of Scope

* Publishing an npm package.
* Publishing a Docker image in this turn.
* Creating a git tag unless the user explicitly asks.
* Changing Docker image names or Docker Hub secrets.
* Documenting maintainer-only version workflows in README.

## Technical Notes

* Failing run: `25163349644`
* Failed command: `elif [[ "${GITHUB_REF_NAME}" == "${GITHUB_DEFAULT_BRANCH}" ]]; then`
* Previous working auto-patch workflow queried Docker Hub tags and computed the next patch number from the current `package.json` major/minor line.
