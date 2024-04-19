import { protectedProcedure, router } from "..";

export const userRouter = router({
	current: protectedProcedure.query(({ctx}) => {
		return ctx.session.user;
	})
})