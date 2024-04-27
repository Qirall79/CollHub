import { z } from "zod";
import { protectedProcedure, router } from "..";
import { db } from "@/lib/db";

const projectRouter = router({
  getAll: protectedProcedure.query(async () => {
    const projects = await db.project.findMany();

    return projects;
  }),
  getProject: protectedProcedure.input(z.object({
    id: z.string()
  })).query(async ({ input }) => {
    const {id} = input;
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
        technologies: z.array(z.object({
          name: z.string()
        }))
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, description } = input;
      const { id: authorId } = ctx.session.user;

      const project = await db.project.create({
        data: {
          authorId,
          title,
          description,
        },
      });

      return project;
    }),
});

export default projectRouter;
