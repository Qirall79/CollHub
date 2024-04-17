import { AuthOptions } from "next-auth";
import { db } from "./db";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID ?? "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
		})
	],
	adapter: PrismaAdapter(db) as Adapter
}