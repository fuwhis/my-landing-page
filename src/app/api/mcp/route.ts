import { projects } from "@/data/projects"
import { createMcpHandler } from "mcp-handler"
import { z } from "zod"

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_projects",
      {
        title: "Get projects",
        description: "List Fuwhis's public projects, optionally filtered by tech.",
        inputSchema: { tech: z.string().optional() },
      },
      async ({ tech }) => {
        const items = tech
          ? projects.filter(p => p.stack.includes(tech))
          : projects
        return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] }
      }
    )
    server.registerTool(
      "get_profile",
      {
        title: "Get profile",
        description: "Get Fuwhis's profile",
        inputSchema: z.string().optional()
      },
      async (profile) => {
        return { content: [{ type: "text", text: JSON.stringify(profile, null, 2) }] }
      }
    )
  },
  // { verboseLogs: true }
  { serverInfo: { name: "fuwhis-portfolio", version: "0.1.0" } },
)

export { handler as GET, handler as POST }
