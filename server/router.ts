import { router } from ".";
import projectRouter from "./routers/projectRouter";
import { userRouter } from "./routers/userRouter";

export const appRouter = router({
	users: userRouter,
	projects: projectRouter
})

export type AppRouter = typeof appRouter;