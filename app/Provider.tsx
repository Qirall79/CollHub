"use client"

import { trpc } from "@/lib/trpcClient"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { useState } from "react"
import superjson from "superjson"
import {httpBatchLink} from "@trpc/client"
import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"

const url = 'http://localhost:3000/api/trpc/'

export const Provider = ({children} : {children: React.ReactNode}) => {

	const [queryClient] = useState(() => {
		return new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: true
				}
			}
		})
	})

	const trpcClient = trpc.createClient({
		links: [
			httpBatchLink({
				url,
				transformer: superjson
			}),
		]
	})

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient} >
				<NextUIProvider>
					<SessionProvider>
						{children}
					</SessionProvider>
				</NextUIProvider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}