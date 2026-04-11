import express from 'express'
import type { CollectGiftConfig, DockerConfig, DoubleCardConfig, FanStatus, Fans, JobConfig } from '../core/types'
import type { LogEntry } from './logger'
import { validateCronExpression } from './cron'
import { getHtml } from './html'

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export interface JobStatus {
  running: boolean
  lastRun: string | null
  nextRun: string | null
}

export interface AppContext {
  getConfig(): DockerConfig | null
  saveCookie(cookie: string): void
  saveTaskConfig(config: {
    collectGift?: CollectGiftConfig | null
    keepalive?: JobConfig | null
    doubleCard?: DoubleCardConfig | null
    ui?: DockerConfig['ui']
  }): Promise<{ config: DockerConfig, fans: Fans[] }>
  syncWithFans(): Promise<{ config: DockerConfig, fans: Fans[] }>
  getStatus(): { collectGift: JobStatus, keepalive: JobStatus, doubleCard: JobStatus }
  getLogs(): LogEntry[]
  clearLogs(): void
  triggerCollectGift(): Promise<void>
  triggerKeepalive(): Promise<void>
  triggerDoubleCard(): Promise<void>
  fetchFans(cookie: string): Promise<Fans[]>
  fetchFansStatus(cookie: string): Promise<FanStatus[]>
}

function maskCookie(cookie: string): string {
  if (cookie.length <= 20) {
    return '***'
  }
  return `${cookie.substring(0, 10)}...${cookie.substring(cookie.length - 10)}`
}

export function createServer(ctx: AppContext): express.Express {
  const app = express()
  app.use(express.json())

  function summarizeConfig(config: DockerConfig | null) {
    return {
      cookieSaved: Boolean(config?.cookie),
      collectGiftConfigured: Boolean(config?.collectGift),
      keepaliveConfigured: Boolean(config?.keepalive),
      doubleCardConfigured: Boolean(config?.doubleCard),
      keepaliveRooms: Object.keys(config?.keepalive?.send || {}).length,
      doubleCardRooms: Object.keys(config?.doubleCard?.send || {}).length,
    }
  }

  function validateCronConfig(name: string, config: { cron: string }): string | null {
    return validateCronExpression(name, config.cron)
  }

  function validateJobConfig(name: string, config: JobConfig): string | null {
    const cronError = validateCronConfig(name, config)
    if (cronError) {
      return cronError
    }
    if (config.model !== 1 && config.model !== 2) {
      return `${name} 分配模式无效`
    }
    if (!config.send || typeof config.send !== 'object') {
      return `${name} 房间配置无效`
    }
    return null
  }

  function validateDoubleCardConfig(config: DoubleCardConfig): string | null {
    const error = validateJobConfig('doubleCard', config)
    if (error) {
      return error
    }
    if (config.enabled !== undefined && (typeof config.enabled !== 'object' || Array.isArray(config.enabled))) {
      return 'doubleCard 勾选配置无效'
    }
    return null
  }

  app.get('/', (_req, res) => {
    res.type('html').send(getHtml())
  })

  app.get('/api/config', (_req, res) => {
    const config = ctx.getConfig()
    if (!config) {
      return res.json({ exists: false })
    }
    res.json({
      exists: true,
      data: { ...config, cookie: maskCookie(config.cookie) },
    })
  })

  app.get('/api/config/raw', (_req, res) => {
    const config = ctx.getConfig()
    if (!config) {
      return res.json({ exists: false })
    }
    res.json({ exists: true, data: config })
  })

  app.get('/api/overview', (_req, res) => {
    const config = ctx.getConfig()
    const status = ctx.getStatus()
    const recentLogs = ctx.getLogs().slice(-10)
    res.json({
      ...summarizeConfig(config),
      timezone: 'Asia/Shanghai',
      ready: Boolean(config?.cookie && (config?.collectGift || config?.keepalive || config?.doubleCard)),
      status,
      recentLogs,
    })
  })

  app.post('/api/cookie', (req, res) => {
    try {
      const cookie = String(req.body?.cookie || '').trim()
      if (!cookie) {
        return res.status(400).json({ error: '缺少 cookie' })
      }
      ctx.saveCookie(cookie)
      res.json({ ok: true })
    } catch (e: unknown) {
      res.status(500).json({ error: errorMessage(e) })
    }
  })

  app.post('/api/config', (req, res) => {
    try {
      const payload = req.body as Partial<DockerConfig>
      if (payload.collectGift) {
        const error = validateCronConfig('collectGift', payload.collectGift)
        if (error) {
          return res.status(400).json({ error })
        }
      }
      if (payload.keepalive) {
        const error = validateJobConfig('keepalive', payload.keepalive)
        if (error) {
          return res.status(400).json({ error })
        }
      }
      if (payload.doubleCard) {
        const error = validateDoubleCardConfig(payload.doubleCard)
        if (error) {
          return res.status(400).json({ error })
        }
      }
      if (payload.ui && typeof payload.ui !== 'object') {
        return res.status(400).json({ error: 'ui 配置无效' })
      }
      ctx.saveTaskConfig({
        collectGift: payload.collectGift,
        keepalive: payload.keepalive,
        doubleCard: payload.doubleCard,
        ui: payload.ui,
      }).then((result) => {
        res.json({ ok: true, data: result })
      }).catch((e: unknown) => {
        res.status(500).json({ error: errorMessage(e) })
      })
    } catch (e: unknown) {
      res.status(500).json({ error: errorMessage(e) })
    }
  })

  app.post('/api/fans/reconcile', async (_req, res) => {
    try {
      const result = await ctx.syncWithFans()
      res.json(result)
    } catch (e: unknown) {
      const message = errorMessage(e)
      if (message === '请先配置 cookie') {
        return res.status(400).json({ error: message })
      }
      res.status(500).json({ error: message })
    }
  })

  app.get('/api/status', (_req, res) => {
    res.json(ctx.getStatus())
  })

  app.get('/api/logs', (_req, res) => {
    res.json(ctx.getLogs())
  })

  app.delete('/api/logs', (_req, res) => {
    ctx.clearLogs()
    res.json({ ok: true })
  })

  app.get('/api/fans', async (_req, res) => {
    const config = ctx.getConfig()
    if (!config?.cookie) {
      return res.status(400).json({ error: '请先配置 cookie' })
    }
    try {
      const fans = await ctx.fetchFans(config.cookie)
      res.json(fans)
    } catch (e: unknown) {
      res.status(500).json({ error: errorMessage(e) })
    }
  })

  app.get('/api/fans/status', async (_req, res) => {
    const config = ctx.getConfig()
    if (!config?.cookie) {
      return res.status(400).json({ error: '请先配置 cookie' })
    }
    try {
      const fans = await ctx.fetchFansStatus(config.cookie)
      res.json(fans)
    } catch (e: unknown) {
      res.status(500).json({ error: errorMessage(e) })
    }
  })

  app.post('/api/trigger/:type', async (req, res) => {
    const { type } = req.params
    try {
      if (type === 'collectGift') {
        await ctx.triggerCollectGift()
      } else if (type === 'keepalive') {
        await ctx.triggerKeepalive()
      } else if (type === 'doubleCard') {
        await ctx.triggerDoubleCard()
      } else {
        return res.status(400).json({ error: '未知任务类型' })
      }
      res.json({ ok: true })
    } catch (e: unknown) {
      const message = errorMessage(e)
      if (
        message === '请先配置 cookie'
        || message.endsWith('未配置')
        || message === '任务正在执行中，请稍后再试'
      ) {
        return res.status(400).json({ error: message })
      }
      res.status(500).json({ error: message })
    }
  })

  return app
}
