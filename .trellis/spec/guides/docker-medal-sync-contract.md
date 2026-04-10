# Docker Medal Sync Contract

> **Purpose**: Define the executable cross-layer contract for Docker WebUI medal-driven keepalive and double-card management.

---

## Scope

This contract covers:

- persisted Docker config shape in `src/core/types.ts`
- Docker HTTP APIs in `src/docker/server.ts`
- medal reconciliation logic in `src/core/medal-sync.ts`
- Docker WebUI request/response expectations in `src/docker/html.ts`

It applies when the WebUI manages:

- Cookie
- keepalive task config
- double-card task config
- theme preference
- medal-list-driven reconciliation

---

## Data Flow

```text
Douyu cookie
  -> GET medal list (`getFansList`)
  -> reconcile keepalive + doubleCard config (`reconcileDockerConfig`)
  -> save config to disk
  -> restart Docker schedulers
  -> render latest config + medal table in WebUI
```

Boundary owners:

- Douyu fetch + merge rules: `src/core/medal-sync.ts`
- config persistence + scheduler restart: `src/docker/index.ts`
- HTTP validation + JSON responses: `src/docker/server.ts`
- UI forms + save/sync actions: `src/docker/html.ts`

---

## Persisted Config Contract

File: `src/core/types.ts`

```ts
type ThemeMode = 'light' | 'dark' | 'system'

interface DockerUiConfig {
  themeMode?: ThemeMode
}

interface JobConfig {
  cron: string
  model: 1 | 2
  send: Record<string, SendGift>
  time?: '跟随执行模式' | '自定义'
  timeValue?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[]
}

interface DoubleCardConfig extends JobConfig {
  enabled?: Record<string, boolean>
}

interface DockerConfig {
  cookie: string
  ui?: DockerUiConfig
  keepalive?: JobConfig
  doubleCard?: DoubleCardConfig
}
```

Field rules:

- `ui.themeMode`
  - allowed values: `light`, `dark`, `system`
  - omitted value defaults to `system`
- `keepalive.send`
  - room set must match the current medal list after reconciliation
- `doubleCard.send`
  - room set must match the current medal list after reconciliation
- `doubleCard.enabled`
  - key is room id string
  - `true` means the room participates in double-card detection and send candidate selection
  - missing value behaves as `false`

---

## HTTP API Contract

### `POST /api/config`

File: `src/docker/server.ts`

Purpose:

- save keepalive config
- save double-card config
- save UI preference
- trigger post-save medal reconciliation when task config is present and cookie exists

Request payload:

```json
{
  "ui": { "themeMode": "system" },
  "keepalive": {
    "cron": "0 0 8 * * *",
    "model": 1,
    "time": "跟随执行模式",
    "timeValue": [0, 1, 2, 3, 4, 5, 6],
    "send": {
      "123456": {
        "roomId": 123456,
        "giftId": 268,
        "number": 0,
        "percentage": 50,
        "count": 0
      }
    }
  },
  "doubleCard": {
    "cron": "0 0 */4 * * *",
    "model": 1,
    "enabled": {
      "123456": true
    },
    "send": {
      "123456": {
        "roomId": 123456,
        "giftId": 268,
        "number": 0,
        "percentage": 50,
        "count": 0
      }
    }
  }
}
```

Allowed omission/removal rules:

- omit `keepalive` to preserve current keepalive config
- send `"keepalive": null` to disable keepalive
- omit `doubleCard` to preserve current double-card config
- send `"doubleCard": null` to disable double-card
- send only `ui` to update theme preference without touching task configs

Success response:

```json
{
  "ok": true,
  "data": {
    "config": { "...": "latest persisted config" },
    "fans": []
  }
}
```

Notes:

- `data.fans` may be empty when saving UI-only changes or when task config is saved before cookie exists
- when task config is saved and cookie exists, response config reflects post-reconciliation state

### `POST /api/fans/reconcile`

File: `src/docker/server.ts`

Purpose:

- fetch the latest medal list using the saved cookie
- reconcile keepalive and double-card room config against the medal list
- persist the updated config

Request payload:

- none

Success response:

```json
{
  "config": { "...": "latest reconciled config" },
  "fans": [
    {
      "roomId": 123456,
      "name": "主播A",
      "level": 12,
      "rank": 34,
      "intimacy": "12345/15000",
      "today": 450
    }
  ]
}
```

---

## Reconciliation Rules

File: `src/core/medal-sync.ts`

### Keepalive

- if `keepalive` is not configured, do nothing
- if medal room already exists in `keepalive.send`, preserve the old send item
- if medal room is new:
  - `model === 1` -> default `percentage = 1`
  - `model === 2` -> default `number = 1`
- rooms removed from the medal list must be removed from `keepalive.send`

### Double Card

- if `doubleCard` is not configured, do nothing
- if medal room already exists in `doubleCard.send`, preserve the old send item
- if medal room is new:
  - default send item follows the same model defaults as keepalive
  - `enabled[roomId] = false`
- if `enabled[roomId]` already exists, preserve it
- migration rule for old config without `enabled`:
  - existing `doubleCard.send[roomId]` means `enabled[roomId] = true`
  - new rooms default to `false`
- rooms removed from the medal list must be removed from both `doubleCard.send` and `doubleCard.enabled`

### UI Preference

- `ui.themeMode` defaults to `system`
- saving theme preference must not remove current keepalive or double-card config

---

## Validation Matrix

| Boundary | Condition | Result |
|----------|-----------|--------|
| `POST /api/config` | invalid `keepalive.cron` / `doubleCard.cron` missing | `400 { error }` |
| `POST /api/config` | invalid `model` | `400 { error }` |
| `POST /api/config` | `send` missing or not object | `400 { error }` |
| `POST /api/config` | `doubleCard.enabled` present but not object | `400 { error }` |
| `POST /api/fans/reconcile` | cookie missing | `400 { error: '请先配置 cookie' }` |
| medal fetch | Douyu request fails | `500 { error }`, persisted config remains unchanged |
| medal fetch | empty medal list | persist empty room sets without throwing |

---

## Error Matrix

| Operation | Error Handling Rule |
|-----------|---------------------|
| save config | validate at route boundary, do not mutate config on invalid payload |
| reconcile medals | throw in helper, catch in route, return simple JSON error |
| start scheduler | log runtime failure and keep process alive |
| run double-card job with no enabled rooms | log actionable skip message and return successfully |

---

## Good / Base / Bad Cases

### Good

- current keepalive has rooms `100`, `200`
- current double-card has rooms `100`, `200`, with `enabled.100 = true`, `enabled.200 = false`
- latest medal list becomes `100`, `200`, `300`

Expected:

- keepalive preserves `100`, `200` values
- keepalive adds `300` with default `1` or `1%`
- double-card preserves `100`, `200` send values
- double-card preserves existing enabled map
- double-card adds room `300` with default send value and `enabled.300 = false`

### Base

- medal list unchanged

Expected:

- reconciliation is idempotent
- saved config shape remains stable
- scheduler restart does not lose existing task values

### Bad

- cookie exists but Douyu medal request fails

Expected:

- `/api/fans/reconcile` returns `500`
- previous config file remains unchanged
- WebUI surfaces the error and does not silently reset task config

---

## Required Verification

Commands:

- `npm run build:docker`
- `node scripts/build.js`

Manual assertions:

- WebUI loads with no cookie and can save theme-only changes
- saving Cookie enables medal reconciliation actions
- after medal reconciliation, keepalive rooms match medal list
- unchanged keepalive room values remain untouched
- unchanged double-card room values and checked states remain untouched
- new medal rooms appear in keepalive and double-card
- new medal rooms are unchecked in double-card
- removed medal rooms disappear from both task configs
- double-card execution skips when no room is checked

---

## Related Files

- `src/core/types.ts`
- `src/core/medal-sync.ts`
- `src/core/job.ts`
- `src/docker/index.ts`
- `src/docker/server.ts`
- `src/docker/html.ts`
- `config.example.json`
- `README.md`
