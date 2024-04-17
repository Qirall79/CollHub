import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson"
import { createTRPCContext } from "./context";

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ctx, next}) => {
	if (!ctx.session || !ctx.session.user)
		throw new TRPCError({code: 'UNAUTHORIZED'})

	return next({
		ctx: {
			session: { ...ctx.session, user: ctx.session.user }
		}
	});
})
export const createCallerFactory = t.createCallerFactory;