import { z } from "zod";
import { protectedProcedure, router } from "..";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const projectRouter = router({
  getAll: protectedProcedure.query(async () => {
    const projects = await db.project.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            discord: true,
            github: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
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
          technologies,
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
