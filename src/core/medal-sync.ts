import type { DockerConfig, DoubleCardConfig, Fans, JobConfig, SendGift, ThemeMode, sendConfig } from './types'

const DEFAULT_KEEPALIVE_CRON = '0 0 8 * * *'
const DEFAULT_DOUBLE_CARD_CRON = '0 0 */4 * * *'
const DEFAULT_THEME_MODE: ThemeMode = 'system'
const DEFAULT_GIFT_ID = 268

function createDefaultSendItem(roomId: number, model: 1 | 2): SendGift {
  return {
    roomId,
    giftId: DEFAULT_GIFT_ID,
    number: model === 2 ? 1 : 0,
    percentage: model === 1 ? 1 : 0,
    count: 0,
  }
}

function mergeSendConfig(send: sendConfig | undefined, fans: Fans[], model: 1 | 2): sendConfig {
  const next: sendConfig = {}

  for (const fan of fans) {
    const key = String(fan.roomId)
    next[key] = send?.[key]
      ? { ...send[key] }
      : createDefaultSendItem(fan.roomId, model)
  }

  return next
}

export function createDefaultKeepaliveConfig(fans: Fans[]): JobConfig {
  return {
    cron: DEFAULT_KEEPALIVE_CRON,
    model: 1,
    send: mergeSendConfig(undefined, fans, 1),
    time: '跟随执行模式',
    timeValue: [0, 1, 2, 3, 4, 5, 6],
  }
}

export function reconcileKeepaliveConfig(config: JobConfig | undefined, fans: Fans[]): JobConfig | undefined {
  if (!config) {
    return undefined
  }

  return {
    ...config,
    send: mergeSendConfig(config.send, fans, config.model),
  }
}

function buildEnabledMap(config: DoubleCardConfig | undefined, fans: Fans[]): Record<string, boolean> {
  const enabled: Record<string, boolean> = {}

  for (const fan of fans) {
    const key = String(fan.roomId)
    if (config?.enabled && key in config.enabled) {
      enabled[key] = Boolean(config.enabled[key])
      continue
    }

    // Migration path: old configs only stored selected rooms in send.
    enabled[key] = Boolean(config?.send?.[key])
  }

  return enabled
}

export function createDefaultDoubleCardConfig(fans: Fans[]): DoubleCardConfig {
  return {
    cron: DEFAULT_DOUBLE_CARD_CRON,
    model: 1,
    send: mergeSendConfig(undefined, fans, 1),
    enabled: buildEnabledMap(undefined, fans),
  }
}

export function reconcileDoubleCardConfig(config: DoubleCardConfig | undefined, fans: Fans[]): DoubleCardConfig | undefined {
  if (!config) {
    return undefined
  }

  return {
    ...config,
    send: mergeSendConfig(config.send, fans, config.model),
    enabled: buildEnabledMap(config, fans),
  }
}

export function reconcileDockerConfig(config: DockerConfig, fans: Fans[]): DockerConfig {
  return {
    ...config,
    ui: {
      themeMode: config.ui?.themeMode || DEFAULT_THEME_MODE,
    },
    keepalive: reconcileKeepaliveConfig(config.keepalive, fans),
    doubleCard: reconcileDoubleCardConfig(config.doubleCard, fans),
  }
}

export function createDefaultDockerConfig(): DockerConfig {
  return {
    cookie: '',
    ui: {
      themeMode: DEFAULT_THEME_MODE,
    },
    keepalive: createDefaultKeepaliveConfig([]),
  }
}
