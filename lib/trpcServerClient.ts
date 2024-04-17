import { createCallerFactory } from "@/server";
import { createTRPCContext } from "@/server/context";
import { appRouter } from "@/server/router";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { cache } from "react";

const createCaller = createCallerFactory(appRouter);

const createContext = cache(() => {
	const heads = new Headers(headers());
	heads.set("x-trpc-source", "rsc");
  
	return createTRPCContext({
	  headers: heads,
	});
  });

export const trpcServer = createCaller(createContext, {
	onError: ({error}) => {
		if (error.code == 'UNAUTHORIZED')
			redirect("/api/auth/signin");
	}
});