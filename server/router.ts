import { protectedProcedure, publicProcedure, router } from ".";
import { userRouter } from "./routers/userRouter";

export const appRouter = router({
	hello: publicProcedure.query(() => {
		return "Hello world!"
	}),
	users: userRouter
})

export type AppRouter = typeof appRouter;