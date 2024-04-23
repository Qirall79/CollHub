import { z } from "zod";
import { protectedProcedure, router } from "..";
import { db } from "@/lib/db";

const projectRouter = router({
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
        authorId: z.string(),
        title: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { authorId, title, description } = input;

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
