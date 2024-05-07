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

      if (user && !user?.discord) {
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
          discord,
          github,
        },
      });

      return request;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const requests = await db.request.findMany({
      where: {
        AND: [
          {
            project: {
              authorId: ctx.session.user.id,
            },
          },
          { ignored: null },
        ],
      },
      include: {
        sender: {
          select: {
            name: true,
            image: true,
          },
        },
        project: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return requests;
  }),
  ignore: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      await db.request.update({
        where: {
          id,
        },
        data: {
          ignored: true,
        },
      });
    }),
});
