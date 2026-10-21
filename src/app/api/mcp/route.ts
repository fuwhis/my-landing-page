import { profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { createMcpHandler } from "mcp-handler"
import { z } from "zod"

const json = (value: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
})

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_projects",
      {
        title: "Get projects",
        description: "List Fuwhis's public projects, optionally filtered by tech (case-insensitive).",
        inputSchema: z.object({ tech: z.string().optional().describe("Exact technology name to filter by, case-insensitive. Examples: 'React', 'TypeScript', 'Next.js'.") }),
        annotations: { readOnlyHint: true, openWorldHint: false },
      },
      async ({ tech }) => {
        const q = tech?.toLowerCase()
        const items = q
          ? projects.filter((p) => p.stack.some((s) => s.toLowerCase() === q))
          : projects
        return json(items)
      },
    )

    server.registerTool(
      "get_profile",
      {
        title: "Get profile",
        description: "Get Fuwhis's public profile: role, experience, and contact links.",
        annotations: { readOnlyHint: true },
      },
      async () => json(profile),
    )
  },
  // { verboseLogs: true } -> truyền chung vào object bên dưới khi cần debug
  { serverInfo: { name: "fuwhis-portfolio", version: "0.1.0" } },
)

export { handler as GET, handler as POST }
