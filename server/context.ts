import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export const createTRPCContext = async (opts: {headers: Headers}) => {
	const session = await getServerSession(authOptions);

	return {
		session,
		...opts
	}
}