import { LRUCache } from "lru-cache"
import { NextRequest } from "next/server"

const RATE_LIMIT_WINDOW = 30 * 60 * 1000

type RateLimitEntry = {
  timestamp: number
  email: string
  ip: string
}

const rateLimitCache = new LRUCache<string, RateLimitEntry>({
  max: 500,
  ttl: RATE_LIMIT_WINDOW,
})

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const cfConnectingIp = request.headers.get("cf-connecting-ip")

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }

  return cfConnectingIp || realIp || "unknown"
}

export function checkRateLimit(
  request: NextRequest,
  email: string
): { allowed: false; retryAfter: number } | { allowed: true } {
  const ip = getClientIp(request)

  const ipKey = `ip:${ip}`
  const emailKey = `email:${email.toLowerCase()}`

  const now = Date.now()

  const ipEntry = rateLimitCache.get(ipKey)
  if (ipEntry && now - ipEntry.timestamp < RATE_LIMIT_WINDOW) {
    return {
      allowed: false,
      retryAfter: RATE_LIMIT_WINDOW - (now - ipEntry.timestamp),
    }
  }

  const emailEntry = rateLimitCache.get(emailKey)
  if (emailEntry && now - emailEntry.timestamp < RATE_LIMIT_WINDOW) {
    return {
      allowed: false,
      retryAfter: RATE_LIMIT_WINDOW - (now - emailEntry.timestamp),
    }
  }

  const entry: RateLimitEntry = {
    timestamp: now,
    email: email.toLowerCase(),
    ip,
  }

  rateLimitCache.set(ipKey, entry)
  rateLimitCache.set(emailKey, entry)

  return { allowed: true }
}

export function clearRateLimit(email: string, ip?: string): void {
  rateLimitCache.delete(`email:${email.toLowerCase()}`)
  if (ip) {
    rateLimitCache.delete(`ip:${ip}`)
  }
}
