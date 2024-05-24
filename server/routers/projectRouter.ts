import { z } from "zod";
import { protectedProcedure, router } from "..";
import { db } from "@/lib/db";

const projectRouter = router({
  getAll: protectedProcedure
    .input(
      z.object({
        query: z.string().optional(),
        page: z.number().optional(),
        cursor: z.string().optional(),
        filters: z.object({
          languages: z.string().optional(),
          sort: z.enum(["asc", "desc"])
        })
      })
    )
    .query(async ({ input, ctx }) => {
      const { query, cursor, filters } = input;
      console.log("SORT: ", filters?.sort);
      
      const limit = 9;

      // if there are filters
      let projects = await db.project.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              discord: true,
              github: true,
            },
          },
          requests: {
            select: {
              senderId: true,
            },
          },
        },
        orderBy: {
          createdAt: filters.sort,
        },
        where: {
          AND: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              authorId: {
                not: ctx.session.user.id,
              },
            },
            {
              technologies: {
                hasSome: filters.languages?.length ? filters.languages.toLowerCase().split(",") : [" "],
              }
            }
          ],
        },
        take: query?.length ? undefined : limit + 1,
        cursor: cursor?.length ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (projects.length > limit) {
        const nextItem = projects.pop();
        nextCursor = nextItem?.id;
      }

      return {
        projects,
        nextCursor,
      };
    }),
  getUserProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await db.project.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
      include: {
        author: true
      }
    });
    return projects;
  }),
  getProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const project = await db.project.findFirst({
        where: {
          id,
        },
      });

      return project;
    }),
  createProject: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        technologies: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, description, technologies } = input;
      const { id: authorId } = ctx.session.user;

      const project = await db.project.create({
        data: {
          authorId,
          title,
          description,
          technologies: technologies.toLowerCase().split(","),
        },
      });
      return project;
    }),
  deleteProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      await db.project.delete({
        where: {
          id,
        },
      });
      return id;
    }),
});

export default projectRouter;
