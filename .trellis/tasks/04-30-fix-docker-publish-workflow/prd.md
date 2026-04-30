# Fix Docker publish workflow failure

## Goal

Fix the failing Docker Build & Push GitHub Actions workflow and switch to the preferred Docker-only release flow: default-branch pushes publish the moving development image `edge`, while manual `v/Vx.y.z` tags publish immutable version images and move `latest`.

## What I already know

* The user only uses the Docker build/distribution path and does not intend to publish anything to npm.
* The project version metadata is being moved to `2.2.0` in `package.json` and `package-lock.json`.
* The pushed commit triggered `Docker Build & Push` run `25163349644`, which failed.
* `gh run view 25163349644 --log-failed` shows the failing step is `Prepare Docker tags`.
* Failure cause: the workflow used `GITHUB_DEFAULT_BRANCH` under `set -u`, but that environment variable is not provided by GitHub Actions.
* The user rejected automatic Docker patch increments as the main release model.
* The chosen release model has only two public channels:
  * `edge` is the moving development image from each default-branch push.
  * `latest` is the moving stable image from each explicit version tag.
* Git tags preserve the source code snapshot for each published release version; later pushes do not alter old tags such as `v2.2.0`.

## Assumptions

* README should stay close to its original concise user-facing structure and should not become a maintainer/contributor manual.
* `package.json.version` remains project metadata but does not drive Docker image publication on default-branch pushes.
* No npm release/version helper scripts are needed.

## Requirements

* Fix `.github/workflows/docker.yml` so default branch detection does not use undefined `GITHUB_DEFAULT_BRANCH`.
* Change default-branch push behavior:
  * publish only `tophtab/douyu-keep-just-works:edge`
  * do not read `package.json.version` for Docker tags
  * do not query Docker Hub for existing tags
  * do not publish `latest` from default-branch pushes
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
* Update Trellis spec to document this Docker-only `edge`/`latest` release behavior instead of npm release helper scripts or automatic patch increments.
* Set `package.json` and `package-lock.json` version metadata to `2.2.0`.
* Do not create commits, tags, GitHub releases, npm publishes, or Docker publishes during implementation.

## Acceptance Criteria

* [ ] Workflow no longer references undefined `GITHUB_DEFAULT_BRANCH`.
* [ ] Default-branch tag-preparation simulation publishes `edge` only.
* [ ] Manual `Vx.y.z` and `vx.y.z` tag simulations publish exact numeric tag and `latest`.
* [ ] Pull request simulation performs no Docker push.
* [ ] Workflow does not publish `sha-*`, `2.1`, `2`, or auto-incremented patch tags.
* [ ] README structure is close to the original concise deployment README and does not include expanded contributor/security/license/tag/version sections.
* [ ] `package.json` does not contain `version:*` or `release:*` scripts.
* [ ] Trellis specs describe the Docker-only `edge`/`latest` workflow.
* [ ] Lint, type-check, and build/test pass.

## Definition of Done

* Relevant checks pass locally.
* No release/tag/publish side effects are created.
* User gets a clear explanation of the Docker-only `edge`/`latest` release flow.

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
* New decision: remove that Docker Hub query path. Default-branch pushes should be cheap and deterministic, publishing only `edge`; explicit version tags should publish immutable version tags plus `latest`.
