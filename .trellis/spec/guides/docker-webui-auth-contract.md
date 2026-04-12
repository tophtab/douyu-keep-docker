# Docker WebUI Auth Contract

> **Purpose**: Define the executable contract for Docker WebUI password login, protected API access, and image-local Docker runtime compilation.

---

## Scope

This contract applies when changing any of:

- Docker WebUI login flow in `src/docker/html.ts`
- Docker auth/session routes in `src/docker/server.ts`
- Docker runtime env wiring in `src/docker/index.ts`
- Docker image build pipeline in `Dockerfile`
- Docker deployment defaults in `docker-compose.yml`

---

## Build Contract

Files:

- `Dockerfile`
- `package.json`
- `tsconfig.docker.json`

Required behavior:

1. Docker image build must compile Docker runtime code from `src/core/**/*.ts` and `src/docker/**/*.ts` inside the image.
2. `docker compose up -d --build` must not depend on prebuilt local `build/docker` artifacts.
3. Builder stage must run:
   - `npm ci --ignore-scripts`
   - `npm run build:docker`
4. Runtime stage must:
   - install production deps only
   - copy compiled output from builder stage into `/app/dist`
   - start with `node dist/docker/index.js`

Current command/file contract:

```dockerfile
COPY package.json package-lock.json tsconfig.docker.json ./
RUN npm ci --ignore-scripts
COPY src ./src
RUN npm run build:docker
COPY --from=builder /app/build/docker ./dist/
CMD ["node", "dist/docker/index.js"]
```

`.dockerignore` must exclude at least:

- `node_modules`
- `build`
- `dist`
- `config`

---

## Runtime Env Contract

Files:

- `src/docker/index.ts`
- `docker-compose.yml`

Required env keys:

| Key | Required | Default | Meaning |
|-----|----------|---------|---------|
| `WEB_PASSWORD` | no | `password` | Docker WebUI login password |
| `WEB_PORT` | no | `51417` | Docker WebUI HTTP port |
| `TZ` | recommended | `Asia/Shanghai` | runtime timezone |
| `CONFIG_PATH` | no | `/app/config/config.json` | persisted config file path |

Rules:

- `src/docker/index.ts` must pass `WEB_PASSWORD` into the Express app context.
- `docker-compose.yml` example should expose `WEB_PASSWORD=password`.
- Password must not be logged or returned by API responses.

---

## HTTP API Contract

File:

- `src/docker/server.ts`

### `GET /api/auth/status`

Response:

```json
{
  "authenticated": true
}
```

### `POST /api/auth/login`

Request body:

```json
{
  "password": "password"
}
```

Success response:

```json
{
  "ok": true
}
```

Response headers:

- sets `Set-Cookie: dykw_session=...; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000`

### `POST /api/auth/logout`

Success response:

```json
{
  "ok": true
}
```

Response headers:

- clears `dykw_session` via `Max-Age=0`

### Protected API Boundary

All existing Docker JSON APIs except:

- `/api/auth/status`
- `/api/auth/login`
- `/api/auth/logout`

must reject unauthenticated requests with:

```json
{
  "error": "请先登录"
}
```

and HTTP status `401`.

---

## Session Contract

File:

- `src/docker/server.ts`

Cookie/session rules:

- cookie name: `dykw_session`
- server stores in-memory session tokens
- token issued with `crypto.randomBytes(24).toString('hex')`
- session TTL: `30 days`
- expired sessions are removed before auth checks
- restart clears all sessions

Non-goals:

- no persistent session store
- no username concept
- no password hashing inside app config file

---

## Frontend Contract

File:

- `src/docker/html.ts`

Required behavior:

1. Initial page load shows login shell first.
2. Frontend must call `GET /api/auth/status` before loading protected config/log/task data.
3. Login form submits password to `POST /api/auth/login`.
4. On `401`, client must clear protected page state and return to login shell.
5. Logout button must call `POST /api/auth/logout`.
6. After successful login, client loads:
   - `/api/config/raw`
   - `/api/overview`
   - `/api/logs`
   - fan sync/status when cookie exists

UI state rules:

- login validation message stays local to the page script
- password input is not persisted in config
- incorrect password shows a clear error

---

## Validation Matrix

| Boundary | Condition | Result |
|----------|-----------|--------|
| `POST /api/auth/login` | `password` missing or empty | `400 { "error": "请输入密码" }` |
| `POST /api/auth/login` | password mismatch | `400 { "error": "密码错误" }` |
| protected `/api/*` | no valid session cookie | `401 { "error": "请先登录" }` |
| `POST /api/auth/logout` | no cookie present | `200 { "ok": true }` |
| session lookup | token expired | reject as unauthenticated |

---

## Good / Base / Bad Cases

### Good

- container starts with `WEB_PASSWORD=password`
- browser loads `/`
- user posts correct password
- server issues `dykw_session`
- protected APIs return `200`

### Base

- user refreshes page after login
- `GET /api/auth/status` still returns `authenticated: true`
- page reloads protected data without re-entering password

### Bad

- user posts wrong password
- server returns `400 { "error": "密码错误" }`
- no session cookie is issued

### Bad

- user calls `/api/overview` before login or after logout
- server returns `401 { "error": "请先登录" }`

### Bad

- local source changed but no local build artifacts exist
- `docker compose up -d --build` must still produce a working image because compile happens inside builder stage

---

## Required Verification

Commands:

- `npm run lint`
- `npm run type-check`
- `npm test`
- `docker compose up -d --build`

Manual/HTTP assertions:

- `GET /api/overview` before login returns `401`
- `POST /api/auth/login` with wrong password returns `400`
- `POST /api/auth/login` with correct password returns `200` and `Set-Cookie`
- `GET /api/auth/status` with cookie returns `{"authenticated":true}`
- `POST /api/auth/logout` clears session
- `GET /api/overview` after logout returns `401`
- deleting or ignoring local `build/docker` does not break `docker compose up -d --build`

---

## Related Files

- `Dockerfile`
- `.dockerignore`
- `docker-compose.yml`
- `README.md`
- `src/docker/index.ts`
- `src/docker/server.ts`
- `src/docker/html.ts`
