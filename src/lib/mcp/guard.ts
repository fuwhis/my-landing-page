import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const MAX_BODY_BYTES = 16 * 1024
export const RATE_LIMT = 30 // requests
export const RATE_WINDOW_MS = 60000 // 60s

type LimitResult = { success: boolean, resetAt: number }
type Limiter = (key: string) => Promise<LimitResult>

/**
 * Per-instance fallback (dev, or no Redis configured). On serverless each instance
 * keeps its own counter, so this is only best-effort protection.
 */
function createMemoryLimiter(): Limiter {
  const hits = new Map<string, { count: number; resetAt: number }>()

  return async (key) => {
    const now = Date.now()
    if (hits.size > 5_000) {
      for (const [k, v] of hits) {
        if (v.resetAt <= now) {
          hits.delete(k) // delete expired record 
        }
      }
      if (hits.size > 5_000) {
        hits.clear() // hard cap on memory
      }
    }
    const cur = hits.get(key)
    if (!cur || cur.resetAt <= now) {
      const resetAt = now + RATE_WINDOW_MS
      hits.set(key, { count: 1, resetAt })
      return { success: true, resetAt }
    }
    cur.count += 1
    return { success: cur.count <= RATE_LIMT, resetAt: cur.resetAt }
  }
}

/** Share across all instances: the limiter that actually works on serverless */
function createUpstashLimiter(): Limiter {
  const rl = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(RATE_LIMT, `${RATE_WINDOW_MS / 1000} s`),
    prefix: "mcp"
  })

  return async (key) => {
    const r = await rl.limit(key)
    return { success: r.success, resetAt: r.reset }
  }
}

const limiter: Limiter = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? createUpstashLimiter()
  : createMemoryLimiter()

const jsonRpcError = (status: number, message: string, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message }, id: null }), {
    status,
    headers: { "content-type": "application/json", ...headers },
  })

function clientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  )
}

/** Returns a Response to short-circuit the request, or null to let it through. */
export async function guard(req: Request): Promise<Response | null> {
  const length = Number(req.headers.get('content-length') ?? 0)
  if (length > MAX_BODY_BYTES) return jsonRpcError(413, "Payload too large.")

  try {
    const { success, resetAt } = await limiter(clientIp(req))
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))
      return jsonRpcError(429, "Rate limit exceeded", { "retry-after": String(retryAfter) })
    }
  } catch (err) {
    const log = JSON.stringify({ evt: "mcp_ratelimit_error", message: err instanceof Error ? err.message : String(err) })

    setTimeout(() => {
      console.error(log)
    }, 1000)
  }
  return null
} 
