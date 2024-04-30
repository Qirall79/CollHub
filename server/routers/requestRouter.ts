import { z } from "zod";
import { protectedProcedure, router } from "..";
import { db } from "@/lib/db";

export const requestRouter = router({
  sendRequest: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        body: z.string().optional(),
        discord: z.string(),
        github: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { projectId, body, discord, github } = input;

      const user = await db.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (user && discord && !user?.discord) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            discord,
          },
        });
      }

      if (user && github && !user?.github) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            github,
          },
        });
      }

      const request = await db.request.create({
        data: {
          projectId,
          senderId: ctx.session.user.id,
          body,
        },
      });

      return request;
    }),
});
