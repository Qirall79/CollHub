import { db } from "@/lib/db";
import { protectedProcedure, router } from "..";
import { string, z } from "zod";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  current: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;

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
        id: z.string(),
        discord: z.string().optional(),
        github: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        session: { user },
      } = ctx;

      const { id } = input;

      const newUser = await db.user.update({
        where: {
          id,
        },
        data: {
          discord: input.discord,
          github: input.github,
        },
      });

      return user;
    }),
});
