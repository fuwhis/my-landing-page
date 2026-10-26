import {
  ContactSchema,
  ExperienceResultSchema,
  ProfileSchema,
  ProjectsResultSchema,
  SkillsSchema,
  findExperience,
  findProjects,
  getPublicContact,
  getPublicProfile,
  getPublicSkills,
} from '@/lib/mcp/content';
import { guard } from '@/lib/mcp/guard';
import { respond } from '@/lib/mcp/respond';
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

const READ_ONLY = { readOnlyHint: true, openWorldHint: false } as const;

// MCP clients read `content` (text); newer ones also use `structuredContent`
// const respond = <T extends Record<string, unknown>>(data: T) => ({
//   content: [{ type: "text" as const, text: JSON.stringify(data) }],
//   structuredContent: data,
// })

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_profile',
      {
        title: 'Get profile',
        description:
          'Who Fuwhis is: role, location, availability for work, summary, about text and key metrics. Does not include contact details; use get_contact for those.',
        outputSchema: ProfileSchema,
        annotations: READ_ONLY,
      },
      async () => respond('get_profile', getPublicProfile),
    );

    server.registerTool(
      'get_projects',
      {
        title: 'Get projects',
        description:
          "List Fuwhis's public portfolio projects. Each project has title, category, description, impact and stack (array of technologies). Call without arguments to get all projects.",
        inputSchema: z.object({
          tech: z
            .string()
            .optional()
            .describe(
              "Filter by technology, partial and case-insensitive. Examples: 'React', 'vue', 'Next.js'.",
            ),
        }),
        outputSchema: ProjectsResultSchema,
        annotations: READ_ONLY,
      },
      async ({ tech }) => respond('get_projects', () => findProjects(tech)),
    );

    server.registerTool(
      'get_contact',
      {
        title: 'Get contact',
        description:
          'How to reach Fuwhis: email, public profile links (GitHub, LinkedIn, CV) and a note on response time.',
        outputSchema: ContactSchema,
        annotations: READ_ONLY,
      },
      async () => respond('get_contact', getPublicContact),
    );

    server.registerTool(
      'get_experience',
      {
        title: 'Get experience',
        description:
          "Fuwhis's employment history, most recent first: company, role, location, start and end month, outcome, highlights and technologies used. Use it for questions about years of experience, employers, roles and responsibilities. For the products he built use get_projects.",
        inputSchema: z.object({
          tech: z
            .string()
            .max(50)
            .optional()
            .describe(
              "Only roles where this technology was used, partial and case-insensitive. Examples: 'React', 'pinia', 'GraphQL'.",
            ),
        }),
        outputSchema: ExperienceResultSchema,
        annotations: READ_ONLY,
      },
      async ({ tech }) => respond('get_experience', () => findExperience(tech)),
    );

    server.registerTool(
      'get_skills',
      {
        title: 'Get skills',
        description:
          "Fuwhis's self-reported technical skills grouped by category (frontend, state and data flow, UI systems, quality and workflow, AI-augmented workflow, deployment). This is a claimed list, not proof of depth: for evidence of use see get_experience and get_projects.",
        outputSchema: SkillsSchema,
        annotations: READ_ONLY,
      },
      async () => respond('get_skills', getPublicSkills),
    );
  },
  {
    serverInfo: { name: 'fuwhis-portfolio', version: '0.1.0' },
    instructions:
      'Read-only server exposing the public portfolio of Fuwhis (Nguyen Phu Quy), a frontend engineer. Use get_profile for who he is, get_projects for his work (optionally filtered by technology) and get_contact for how to reach him.',
    maxSubscriptions: 0, // stateless server: reject subscriptions instead of holding SSE streams open
    verboseLogs: process.env.NODE_ENV === 'development',
    onEvent: (e) => {
      // Tool name only exists on REQUEST_RECEIVED. Never log `arguments`: they are user input.
      if (e.type === 'REQUEST_RECEIVED') {
        const params = e.parameters as
          | { params?: { name?: unknown } }
          | undefined;
        const tool =
          e.method === 'tools/call' && typeof params?.params?.name === 'string'
            ? params.params.name
            : undefined;
        console.log(
          JSON.stringify({ evt: 'mcp_request', method: e.method, tool }),
        );
      } else if (e.type === 'REQUEST_COMPLETED') {
        console.log(
          JSON.stringify({ evt: 'mcp_done', method: e.method, ms: e.duration }),
        );
      } else if (e.type === 'ERROR') {
        console.error(
          JSON.stringify({
            evt: 'mcp_error',
            severity: e.severity,
            context: e.context,
            message: String(e.error),
          }),
        );
      }
    },
  },
);

const guarded = async (req: Request) => (await guard(req)) ?? handler(req);

export { guarded as GET, guarded as POST };
