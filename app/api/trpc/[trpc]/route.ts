import { createTRPCContext } from "@/server/context"
import { appRouter } from "@/server/router"
import {fetchRequestHandler} from "@trpc/server/adapters/fetch"
import { NextRequest } from "next/server"

const createContext = async (req: NextRequest) => {
	return createTRPCContext({headers: req.headers});
}

const handler = (req: NextRequest) => {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createContext(req),
	})
}

export {handler as GET, handler as POST};