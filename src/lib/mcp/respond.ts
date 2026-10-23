
export function respond<T extends Record<string, unknown>>(tool: string, build: () => T) {
  try {
    const data = build()
    return {
      content: [{ type: "text" as const, text: JSON.stringify(data) }],
      structuredContent: data,
    }
  } catch (err) {
    const log = JSON.stringify({ evt: "mcp_tool_error", tool, message: err instanceof Error ? err.message : String(err) })

    setTimeout(() => {
      console.error(log)
    }, 1000)

    return {
      isError: true as const,
      content: [{ type: "text" as const, text: "Internal error" }],
    }
  }
}
