import { publicProcedure, router } from "./trpc";
import { userRouter } from "./userRouter";

export const appRouter = router({
	hello: publicProcedure.query(async () => {
		return "Hello World!"
	}),
	user: userRouter
})

export type AppRouter = typeof appRouter;