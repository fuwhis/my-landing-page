import { ContactSchema, ProfileSchema, ProjectsResultSchema, findProjects, getPublicContact, getPublicProfile } from "@/lib/mcp/content"
import { createMcpHandler } from "mcp-handler"
import { z } from "zod"

const READ_ONLY = { readOnlyHint: true, openWorldHint: false } as const

// MCP clients read `content` (text); newer ones also use `structuredContent`
const respond = <T extends Record<string, unknown>>(data: T) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data) }],
  structuredContent: data,
})

// const json = (value: unknown) => ({
//   content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
// })

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_profile",
      {
        title: "Get profile",
        description: "Who Fuwhis is: role, location, availability for work, summary, about text and key metrics. Does not include contact details; use get_contact for those.",
        outputSchema: ProfileSchema,
        annotations: READ_ONLY,
      },
      async () => respond(getPublicProfile()),
    )

    server.registerTool(
      "get_projects",
      {
        title: "Get projects",
        description: "List Fuwhis's public portfolio projects. Each project has title, category, description, impact and stack (array of technologies). Call without arguments to get all projects.",
        inputSchema: z.object({
          tech: z
            .string()
            .optional()
            .describe("Filter by technology, partial and case-insensitive. Examples: 'React', 'vue', 'Next.js'.")
        }),
        outputSchema: ProjectsResultSchema,
        annotations: READ_ONLY,
      },
      async ({ tech }) => respond(findProjects(tech))
    )

    server.registerTool(
      "get_contact",
      {
        title: "Get contact",
        description:
          "How to reach Fuwhis: email, public profile links (GitHub, LinkedIn, CV) and a note on response time.",
        outputSchema: ContactSchema,
        annotations: READ_ONLY,
      },
      async () => respond(getPublicContact()),
    )
  },
  {
    serverInfo: { name: "fuwhis-portfolio", version: "0.1.0" },
    instructions:
      "Read-only server exposing the public portfolio of Fuwhis (Nguyen Phu Quy), a frontend engineer. Use get_profile for who he is, get_projects for his work (optionally filtered by technology) and get_contact for how to reach him.",
    maxSubscriptions: 0, // stateless server: reject subscriptions instead of holding SSE streams open
    verboseLogs: process.env.NODE_ENV === "development",
  },
)

export { handler as GET, handler as POST }
