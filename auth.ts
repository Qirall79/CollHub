import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import FortyTwo from "next-auth/providers/42-school";

const config = {
	providers: [
		Github,
	],
} satisfies NextAuthConfig;

export const {handlers, signIn, signOut, auth} = NextAuth(config);