# Research: open-source readiness

- Query: Common open-source project readiness conventions for a small Docker/Node.js project: required/recommended repository files, documentation, licensing, contribution/security/community health files, release/versioning basics, mapped to this repository.
- Scope: mixed
- Date: 2026-04-30

## Findings

### Files Found

- `README.md` - User-facing project overview, Docker deployment instructions, version iteration notes, configuration advice, disclaimer, and acknowledgements.
- `package.json` - Node.js package metadata, MIT license declaration, repository URL, scripts for lint/type-check/build/version/release.
- `Dockerfile` - Multi-stage Node 18 Docker build and runtime image.
- `docker-compose.yml` - Minimal Compose example for Docker Hub image, config volume, port, timezone, and WebUI password.
- `.dockerignore` - Excludes dependencies, build output, runtime config, Trellis/agent metadata, docs, and VCS metadata from Docker build context.
- `.gitignore` - Excludes dependencies, build output, IDE metadata, local AI/workflow metadata, and local runtime config.
- `.github/workflows/docker.yml` - Type-checks, builds, and publishes Docker image on `master`, `V*.*.*` tags, and manual dispatch.
- `.github/workflows/release.yml` - Legacy-looking Electron release workflow using Yarn and `yarn build --publish always`.
- `config.example.json` - Example runtime configuration with placeholder cookies, CookieCloud credentials, UI, and task cron settings.
- Not found in root or `.github/`: `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, issue templates, pull request template, Dependabot config, support file, governance file.

### Code Patterns

- Package metadata declares `"license": "MIT"` but no root license text file was found, so GitHub/license scanners may not expose the project as clearly licensed: `package.json:11`.
- Package metadata already exposes project identity, version, author, contributors, and repository URL: `package.json:2`, `package.json:3`, `package.json:5`, `package.json:6`, `package.json:12`.
- Quality commands are present and should be documented for contributors: `package.json:14`, `package.json:15`, `package.json:18`.
- Version and release scripts exist and use `npm version`, including `V`-prefixed release tags compatible with the Docker workflow: `package.json:19`, `package.json:22`.
- README covers project purpose, Docker deployment, logs, release scripts, config advice, disclaimer, and acknowledgements, but does not yet cover local development, contribution flow, security reporting, license summary, support expectations, or release notes: `README.md:7`, `README.md:21`, `README.md:46`, `README.md:52`, `README.md:70`, `README.md:77`, `README.md:83`.
- Docker instructions are practical and Compose-first, using the published Docker Hub image and persistent `/app/config`: `README.md:23`, `README.md:28`, `README.md:33`, `README.md:40`, `docker-compose.yml:3`, `docker-compose.yml:8`.
- Dockerfile already uses a two-stage build and production-only install, matching common Node container practice in broad shape: `Dockerfile:1`, `Dockerfile:11`, `Dockerfile:20`, `Dockerfile:22`.
- Dockerfile currently runs as the image default user, not an explicit non-root user; this is a security hardening gap compared with Docker's Node guidance: `Dockerfile:11`, `Dockerfile:28`.
- `.dockerignore` excludes runtime config and local metadata from image build context, which is important because config may contain cookies or credentials: `.dockerignore:5`, `.dockerignore:7`, `.dockerignore:8`.
- `.gitignore` excludes local runtime config, reducing accidental cookie/credential commits: `.gitignore:16`.
- Docker workflow publishes `latest` from the default branch and a version tag from package/tag logic, but it does not declare workflow-level `permissions`, does not run lint, and has only one target platform: `.github/workflows/docker.yml:5`, `.github/workflows/docker.yml:25`, `.github/workflows/docker.yml:68`, `.github/workflows/docker.yml:91`.
- Release workflow appears stale relative to the Docker-only project direction because it builds an Electron app with Yarn across desktop OS targets: `.github/workflows/release.yml:1`, `.github/workflows/release.yml:15`, `.github/workflows/release.yml:30`, `.trellis/tasks/04-30-open-source-readiness-audit/prd.md:13`.
- The PRD already identifies the audit scope and expected gaps, including missing community files and stale release automation: `.trellis/tasks/04-30-open-source-readiness-audit/prd.md:5`, `.trellis/tasks/04-30-open-source-readiness-audit/prd.md:11`, `.trellis/tasks/04-30-open-source-readiness-audit/prd.md:16`.

### External References

1. GitHub community health and licensing docs:
   - GitHub's community profile checklist looks for recommended health files such as `README`, `CODE_OF_CONDUCT`, `LICENSE`, and `CONTRIBUTING`; it also recognizes issue templates under `.github/ISSUE_TEMPLATE`: https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/about-community-profiles-for-public-repositories
   - GitHub recommends a root license file such as `LICENSE.txt`, `LICENSE.md`, or `LICENSE.rst`; without a license, default copyright applies and users lack clear reuse rights: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository
   - GitHub security policy docs recommend `SECURITY.md` with supported versions and vulnerability reporting instructions: https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/adding-a-security-policy-to-your-repository
2. OpenSSF Scorecard:
   - Scorecard assesses open-source security posture across maintenance, vulnerabilities, security policy, license, CI tests, binary artifacts, branch protection, dangerous workflow patterns, pinned dependencies, token permissions, and packaging: https://scorecard.dev/
3. Docker Node.js guide:
   - Docker's Node guide recommends production-ready images with multi-stage builds, lean runtime stages, `.dockerignore`, and non-root runtime users: https://docs.docker.com/guides/nodejs/containerize/
4. Release/versioning conventions:
   - Keep a Changelog recommends a human-readable `CHANGELOG.md`, latest version first, release dates, grouped change types, and an `Unreleased` section: https://keepachangelog.com/en/1.1.0/
   - Semantic Versioning defines `MAJOR.MINOR.PATCH`, immutable released versions, and patch/minor/major increment semantics; `v1.2.3` is common as a tag name even though the semantic version is `1.2.3`: https://semver.org/

### Repository-Mapped Recommendations

#### Must Fix Before Presenting as Open Source

- Add a root `LICENSE` file matching the declared MIT license in `package.json`; keep the package metadata license field as-is unless the owner chooses a different license.
- Add a short `SECURITY.md` with supported versions, non-public vulnerability reporting path, expected response policy, and a note that runtime cookies/secrets should not be posted in public issues.
- Remove or disable the stale Electron `.github/workflows/release.yml` unless desktop releases are still supported; it conflicts with the current Docker-only direction and may mislead contributors.
- Add `CHANGELOG.md` or a release-notes policy in README before the next release so users can see notable changes outside GitHub Actions logs and tags.
- Update README with a clear license section, local development commands (`npm ci`, `npm run type-check`, `npm run lint`, `npm run build:docker`), release tag convention (`V*.*.*`), and how to report issues without sharing cookies.

#### Should Fix for Contributor Readiness

- Add `CONTRIBUTING.md` with supported scope, Docker-first development setup, quality commands, branch/PR expectations, and guidance for issues involving platform/login/cookie failures.
- Add `.github/ISSUE_TEMPLATE/bug_report.yml` and `.github/ISSUE_TEMPLATE/feature_request.yml`; for bug reports, explicitly ask for sanitized logs, Docker image tag, Node/Docker version, config shape, and reproduction steps, while warning not to paste cookies.
- Add `.github/pull_request_template.md` with checklist items for type-check/lint/build, docs updates, config/schema effects, and screenshots for WebUI changes.
- Add a lightweight `CODE_OF_CONDUCT.md` only if the maintainer is willing to enforce it; GitHub surfaces it as a community health file, but it should not be added as empty ceremony.
- Add Dependabot config for npm and GitHub Actions updates; pair it with CI checks so dependency PRs are actionable.
- Add workflow-level minimum `permissions`, especially `contents: read` by default and elevated package/release permissions only where needed; this maps directly to OpenSSF's token permissions check.
- Consider adding CodeQL or another JavaScript/TypeScript SAST workflow if this becomes a broader public project; for a small maintainer-owned utility, this is useful but lower priority than `SECURITY.md`, Dependabot, and workflow permissions.

#### Docker/Node Specific Hardening

- Keep the existing multi-stage Docker build and production dependency install; both align with Docker's Node guidance.
- Add an explicit non-root runtime user in the final image, ensuring `/app/config` remains writable by that user.
- Consider pinning the Node major/minor image tag or documenting the base image update policy; `node:18-slim` is stable but Node 18 is old for new releases as of 2026, so future cleanup should evaluate current LTS migration separately.
- Keep `.dockerignore` excluding `config/`; consider also excluding `.github/`, `*.log`, and local environment files if any are introduced.
- README should document the Docker image tags users should prefer: `latest` for rolling default branch builds versus version tags for reproducible deployment.

#### Optional Community/Project Polish

- Add `.github/SUPPORT.md` or a README support section if the maintainer wants to distinguish questions, bug reports, and private vulnerability reports.
- Add repository topics, description, and social preview on GitHub; these are not files but improve discoverability.
- Add a simple release checklist in `CONTRIBUTING.md` or README rather than a heavier governance process.
- Consider a `docs/` folder only if README grows too large; for this small project, keeping essentials in README plus focused community files is enough.

### Related Specs

- `.trellis/spec/backend/index.md` - Current project guidance says backend includes shared core logic and the Docker Express runtime; relevant because this audit maps the repo as Docker-first.
- `.trellis/spec/frontend/index.md` - Current UI guidance says the supported UI is the Docker WebUI served from `src/docker/html.ts`, and legacy Vue/Electron renderer guidance is historical.
- `.trellis/workflow.md` - Research must be persisted under the task `research/` directory.

## Caveats / Not Found

- No active Trellis task was set by `task.py current --source`; this research used the user-provided task path `.trellis/tasks/04-30-open-source-readiness-audit/` as the task directory.
- This research did not inspect remote GitHub repository settings such as branch protection, repository topics, Dependabot alerts, secret scanning, or GitHub Releases because those are not visible from local files.
- No root `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, issue templates, PR template, support file, governance file, or Dependabot config were found in the local repository.
- The `find` command surfaced license files under `node_modules/` and old `dist/` artifacts; those are dependency/build artifacts and do not satisfy the repository's own root license/community health files.
- Legal and platform-compliance language should be reviewed by the maintainer; this audit can identify conventions but cannot provide legal advice.
