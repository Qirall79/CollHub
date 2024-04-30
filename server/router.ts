import { router } from ".";
import projectRouter from "./routers/projectRouter";
import { requestRouter } from "./routers/requestRouter";
import { userRouter } from "./routers/userRouter";

export const appRouter = router({
	users: userRouter,
	projects: projectRouter,
	requests: requestRouter
})

export type AppRouter = typeof appRouter;