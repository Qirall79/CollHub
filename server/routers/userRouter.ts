import { db } from "@/lib/db";
import { protectedProcedure, router } from "..";
import { string, z } from "zod";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  current: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
  getUser: protectedProcedure
    .query(async ({ ctx }) => {
      const { id } = ctx.session.user;

      const user = await db.user.findFirst({
        where: {
          id,
        },
      });

      return user;
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        discord: z.string().optional(),
        github: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;

      const newUser = await db.user.update({
        where: {
          id,
        },
        data: {
          discord: input.discord,
          github: input.github,
        },
      });

      return newUser;
    }),
});
