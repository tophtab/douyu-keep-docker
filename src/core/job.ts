import dayjs from 'dayjs'
import { getDid, getGiftNumber, parseDyAndSidFromCookie, sendGift, sleep } from './api'
import { collectGiftViaPage } from './collect-gift'
import { checkDoubleCard } from './double-card'
import { computeGiftCountOfNumber, computeGiftCountOfPercentage, computeGiftCountWithDoubleCard } from './gift'
import type { DoubleCardConfig, JobConfig, Logger, sendArgs, sendConfig } from './types'

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function checkTimeCondition(config: JobConfig, log: Logger): boolean {
  const dayOfWeek = dayjs().day() as 0 | 1 | 2 | 3 | 4 | 5 | 6
  if (config.time === '自定义' && config.timeValue && !config.timeValue.includes(dayOfWeek)) {
    log('未满足赠送时机，跳过本次任务')
    return false
  }
  return true
}

async function collectAndGetNumber(cookie: string, log: Logger): Promise<number> {
  log('正在领取荧光棒...')
  await collectGiftViaPage(cookie)

  let number = 0
  try {
    number = await getGiftNumber(cookie)
  } catch (error) {
    log(`获取荧光棒数量失败: ${error}`)
    return 0
  }
  if (number === 0) {
    log('荧光棒数量为0, 结束任务')
  } else {
    log(`荧光棒数量为${number}`)
  }
  return number
}

async function sendGifts(jobs: sendConfig, cookie: string, log: Logger): Promise<void> {
  let args: sendArgs
  try {
    args = parseDyAndSidFromCookie(cookie)
  } catch (error: unknown) {
    log(`获取参数失败: ${errorMessage(error)}`)
    return
  }

  let failedNumber = 0
  for (const item of Object.values(jobs)) {
    try {
      if (item.count === 0) {
        continue
      }

      item.count = (item.count ?? 0) + failedNumber

      log(`即将赠送${item.roomId}房间${item.count}个荧光棒`)
      const did = await getDid(item.roomId.toString(), cookie)
      args.did = did
      await sendGift(args, item, cookie)
      failedNumber = 0
      log(`赠送${item.roomId}房间${item.count}个荧光棒成功`)
    } catch (error) {
      failedNumber += item?.count ?? 0
      log(`${item.roomId}房间赠送失败: ${error}, ${item.count}个荧光棒自动移交给下一个房间`)
    }
    await sleep(2000)
  }

  if (failedNumber > 0) {
    log(`任务执行完毕, 有${failedNumber}个荧光棒未赠送成功`)
  } else {
    log('任务执行完毕')
  }
}

export async function executeKeepaliveJob(config: JobConfig, cookie: string, log: Logger): Promise<void> {
  if (!checkTimeCondition(config, log)) {
    return
  }

  const number = await collectAndGetNumber(cookie, log)
  if (number === 0) {
    return
  }
  await sleep(2000)

  const { model, send } = config
  let jobs: sendConfig = {}
  try {
    if (model === 1) {
      jobs = await computeGiftCountOfPercentage(number, JSON.parse(JSON.stringify(send)))
    } else {
      jobs = await computeGiftCountOfNumber(number, JSON.parse(JSON.stringify(send)))
    }
  } catch (error: unknown) {
    log(`计算赠送数量失败: ${errorMessage(error)}`)
    return
  }

  await sendGifts(jobs, cookie, log)
}

export async function executeDoubleCardJob(config: DoubleCardConfig, cookie: string, log: Logger): Promise<void> {
  const number = await collectAndGetNumber(cookie, log)
  if (number === 0) {
    return
  }
  await sleep(2000)

  const { model, send, enabled } = config
  const activeSend = Object.values(send).reduce((prev, item) => {
    const roomKey = String(item.roomId)
    if (enabled && !enabled[roomKey]) {
      return prev
    }
    prev[roomKey] = item
    return prev
  }, {} as sendConfig)

  if (Object.keys(activeSend).length === 0) {
    log('未勾选任何双倍卡房间，跳过本次任务')
    return
  }

  const doubleCardRooms: Record<string, boolean> = {}
  for (const item of Object.values(activeSend)) {
    const doubleInfo = await checkDoubleCard(item.roomId, cookie)
    doubleCardRooms[String(item.roomId)] = doubleInfo.active
    if (doubleInfo.active) {
      log(`房间${item.roomId}检测到双倍亲密度卡生效`)
    }
  }

  let jobs: sendConfig | null = null
  try {
    jobs = await computeGiftCountWithDoubleCard(number, activeSend, doubleCardRooms, model)
  } catch (error: unknown) {
    log(`计算赠送数量失败: ${errorMessage(error)}`)
    return
  }

  if (jobs === null) {
    log('未检测到双倍卡，荧光棒已保留')
    return
  }

  await sendGifts(jobs, cookie, log)
}
