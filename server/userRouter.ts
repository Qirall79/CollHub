import { protectedProcedure, publicProcedure, router } from "./trpc";

export const userRouter = router({
	current: protectedProcedure.query(async ({ctx}) => {
		return ctx.user.name
	})
})