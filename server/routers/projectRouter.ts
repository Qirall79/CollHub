import { z } from "zod";
import { protectedProcedure, router } from "..";
import { db } from "@/lib/db";

const projectRouter = router({
  getProject: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
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
