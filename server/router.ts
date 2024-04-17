import { protectedProcedure, publicProcedure, router } from ".";

export const appRouter = router({
	hello: publicProcedure.query(() => {
		return "Hello world!"
	}),
	getProtectedRoute: protectedProcedure.query(() => {
		return "This is a protected route"
	})
})

export type AppRouter = typeof appRouter;