# Research: Docker GitHub Release

- Query: Research GitHub Actions and Docker image release conventions for open-source Docker/Node.js projects: tag triggers, semantic version tags, latest tag behavior, provenance/SBOM/signing, stale desktop workflows, and README badges; map recommendations to this repo.
- Scope: mixed
- Date: 2026-04-30

## Findings

### Files Found

- `.github/workflows/docker.yml` - Current Docker Hub publish workflow. It runs on `workflow_dispatch`, pushes to `master`, and tags matching `V*.*.*`; validates TypeScript; generates Docker tags; builds/pushes with Buildx.
- `.github/workflows/release.yml` - Current desktop/Electron release workflow. It runs on manual dispatch and `V*.*.*` tags, then tries to run `yarn install` and `yarn build --publish always` across macOS, Windows, and Ubuntu.
- `Dockerfile` - Multi-stage Node 18 image; builds TypeScript in a builder stage and runs `node dist/docker/index.js` in the runtime stage.
- `docker-compose.yml` - Defaults to `tophtab/douyu-keep-just-works:latest` unless `DOCKER_IMAGE` / `DOCKER_TAG` are provided.
- `package.json` - Package version is `2.1.0`; build/test scripts are Docker-only; release scripts create uppercase `V` tags.
- `README.md` - Documents Docker deployment with `latest` and says GitHub Workflow publishes the Docker Hub image, but currently has no status/image badges.
- `.dockerignore` - Excludes local build artifacts, config, git metadata, Trellis/agent files, and docs from image context.

### Code Patterns

- Docker workflow triggers default branch and release tags: `.github/workflows/docker.yml:3`-`.github/workflows/docker.yml:8`.
- The original Docker workflow published on every `master` push, not only formal release tags: `.github/workflows/docker.yml:5`-`.github/workflows/docker.yml:7`.
- The original non-tag build path computed a synthetic next patch by querying Docker Hub tags: `.github/workflows/docker.yml:35`-`.github/workflows/docker.yml:65`. This made a branch build look like a release version without updating `package.json` or creating a git tag.
- In the original workflow, `latest` was enabled only when `docker/metadata-action` saw the default branch: `.github/workflows/docker.yml:73`-`.github/workflows/docker.yml:75`. A `Vx.y.z` tag push published the version tag but likely did not move `latest`.
- Before the multi-arch update, Docker build pushed only `linux/amd64`: `.github/workflows/docker.yml:86`-`.github/workflows/docker.yml:94`.
- The original Buildx invocation did not request SBOM/provenance attestation outputs: `.github/workflows/docker.yml:86`-`.github/workflows/docker.yml:94`.
- The original workflow did not define least-privilege `permissions`; it used Docker Hub credentials through secrets: `.github/workflows/docker.yml:80`-`.github/workflows/docker.yml:84`.
- Desktop release workflow is stale against current repo shape: it builds an Electron app with Yarn (`.github/workflows/release.yml:30`-`.github/workflows/release.yml:35`), but the repo has Docker-only npm scripts (`package.json:13`-`package.json:25`) and no Electron runtime directories were found under `src/`.
- The Ubuntu Snapcraft step condition is unreachable because the matrix uses `ubuntu-latest` while the step checks `ubuntu-22.04`: `.github/workflows/release.yml:15`-`.github/workflows/release.yml:21`.
- Dockerfile compiles inside the image and runs the compiled Docker entrypoint: `Dockerfile:1`-`Dockerfile:28`.
- Compose and README instruct users to deploy `latest`: `docker-compose.yml:3`, `README.md:21`-`README.md:44`.
- README release docs match the uppercase `V*.*.*` workflow contract: `README.md:52`-`README.md:68`.
- Package scripts intentionally separate local version iteration from release tags: `package.json:19`-`package.json:24`.
- Spec says the supported deployable is the Docker WebUI compiled by `npm run build:docker`, and Docker images must run `node dist/docker/index.js`: `.trellis/spec/backend/directory-structure.md:84`-`.trellis/spec/backend/directory-structure.md:104`.
- Spec explicitly says not to reintroduce Electron/Vue desktop packaging unless desktop support is restored: `.trellis/spec/backend/directory-structure.md:71`-`.trellis/spec/backend/directory-structure.md:76`.
- Spec records that release tags currently use uppercase `V*.*.*`: `.trellis/spec/backend/directory-structure.md:217`-`.trellis/spec/backend/directory-structure.md:255`.

### External References

- GitHub Docs, "Publishing Docker images": https://docs.github.com/en/actions/publishing-packages/publishing-docker-images
  - Common pattern: checkout, login to registry, extract Docker metadata, then build and push with `docker/build-push-action`.
  - Relevant guidance: GitHub recommends pinning third-party actions to a commit SHA for stronger supply-chain safety.
- Docker `metadata-action` README: https://github.com/docker/metadata-action
  - Common pattern: derive image tags and OCI labels from Git refs instead of hand-assembling tags in shell.
  - Relevant tag types: `semver`, `ref`, `sha`, `raw`; `latest` can be conditionally enabled.
- Docker `build-push-action` README: https://github.com/docker/build-push-action
  - Common pattern: Buildx-based image builds with optional `platforms`, `push`, `tags`, `labels`, `provenance`, and `sbom` inputs.
  - Relevant supply-chain feature: `provenance: true` and `sbom: true` can request attestations during build/push.
- GitHub Docs, "Adding a workflow status badge": https://docs.github.com/en/actions/how-tos/monitor-workflows/add-a-status-badge
  - Common README pattern: expose CI/release health with a workflow badge, optionally scoped by branch or event.

### Recommended Release Convention For This Repo

1. Treat `Vx.y.z` git tags as the stable release source of truth.
   - Keep uppercase `V` unless intentionally migrating all scripts, specs, README text, and workflow triggers together. The repo already encodes uppercase release tags in `package.json`, README, and Trellis spec.
   - On tag pushes, publish immutable Docker tags such as `2.1.0` plus `latest`; this project intentionally does not publish moving aliases such as `2.1` or `2`.

2. Decide and document what `latest` means, then make the workflow match.
   - Best fit for open-source user expectations: `latest` should move only on stable release tags, because README and compose examples install `latest` by default.
   - If maintainers prefer default-branch rolling images, rename that channel to `edge`, `master`, or `sha-*`, and make README say `latest` is rolling or recommend pinned semver tags for stable deployments.
   - Current repo mismatch: formal tag releases do not clearly move `latest`, while branch pushes do; this can leave Docker Hub `latest` pointing at a synthetic non-git version.

3. Remove synthetic branch versioning.
   - Avoid querying Docker Hub to invent the next patch version for default-branch builds.
   - Default-branch builds should use non-release tags such as `edge`, `master`, and/or `sha-<shortsha>`.
   - Release builds should get their version only from the git tag and package metadata.

4. Keep Docker publishing and desktop releasing separate; remove or disable stale desktop workflow.
   - `.github/workflows/release.yml` should be deleted, renamed/disabled, or converted into a Docker/GitHub Release workflow.
   - The desktop workflow found during the audit was inconsistent with the Docker-only spec and likely failed because it expected Yarn/Electron build machinery that is not present.

5. Add explicit workflow permissions and optional supply-chain metadata.
   - For Docker Hub-only pushes, set minimal permissions such as `contents: read`. If using GitHub artifact attestations or signing workflows, grant only the required additional permissions.
   - Consider `provenance: true` and `sbom: true` on `docker/build-push-action` for release builds. This is useful for open-source consumers and relatively low-friction with Buildx.
   - Signing with Cosign/keyless signatures is relevant if the project wants a stronger supply-chain posture, but it adds verification/documentation burden. For this repo, SBOM/provenance is a better first step than signing unless users explicitly need signature verification.

6. README badges should reflect the maintained surface, not stale desktop support.
   - Add a Docker workflow status badge for `.github/workflows/docker.yml`.
   - Add Docker image badges such as Docker pulls/version/image size if the Docker Hub repository is public.
   - Avoid a desktop release badge unless desktop support is restored.
   - Consider adding license and current release/version badges near the title.

7. Multi-arch is required for this repo.
   - The original workflow published only `linux/amd64`.
   - NAS/home-server users often run ARM64 devices, so publish `linux/amd64,linux/arm64` and document both supported platforms in README.

### Example Target Shape

Recommended Docker workflow behavior:

- `pull_request`: build only, no push.
- `push` to `master`: build and optionally push `edge` plus `sha-*`; do not publish semver or `latest`.
- `push` tag `V*.*.*`: build and push `latest` and `x.y.z` only; do not publish `x.y` or `x` aliases; optionally attach SBOM/provenance.
- `workflow_dispatch`: allow manual rebuild, but require an explicit input for whether to push stable tags.

Recommended README behavior:

- Show badges for Docker workflow health, Docker pulls, Docker version, license.
- Prefer a pinned semver deployment example for stability, or clearly label `latest` as the stable release channel after the workflow is fixed to move it on tag releases.
- Remove language that implies desktop releases exist unless the stale desktop workflow is restored intentionally.

## Related Specs

- `.trellis/spec/backend/index.md` - Backend/Docker runtime guidelines are the relevant current spec layer.
- `.trellis/spec/frontend/index.md` - Confirms current UI is Docker WebUI served from `src/docker/html.ts`; legacy Vue/Electron guidance is historical.
- `.trellis/spec/backend/directory-structure.md` - Defines Docker-only runtime boundary, release tag expectations, and anti-patterns around reintroducing desktop packaging.
- `.trellis/spec/backend/quality-guidelines.md` - Notes current quality gates are pragmatic build/type/lint checks; release workflow changes should preserve explicit verification.

## Caveats / Not Found

- No active Trellis task was set, so this artifact was written to the exact task path requested by the user.
- No local `yarn.lock`, Electron packaging config, `src/main`, `src/renderer`, or `src/preload` files were found during this research pass, which supports treating `.github/workflows/release.yml` as stale.
- I did not query Docker Hub live tag history for `tophtab/douyu-keep-just-works`; recommendations are based on repository workflow behavior and common GitHub Actions/Docker conventions.
- I did not modify workflows or README in this research pass.
