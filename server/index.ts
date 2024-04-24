import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson"
import { createTRPCContext } from "./context";

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson
})

export const trpcError = (opts: {other: any}) => {

}
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ctx, next}) => {
	if (!ctx.session || !ctx.session.user)
		throw new TRPCError({code: 'INTERNAL_SERVER_ERROR', })

	const user = ctx.session.user as {
		id: string;
		name?: string | null | undefined;
		email?: string | null | undefined;
		image?: string | null | undefined;
	}

	return next({
		ctx: {
			session: { ...ctx.session, user},
		} 
	});
})
export const createCallerFactory = t.createCallerFactory;