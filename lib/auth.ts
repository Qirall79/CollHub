import { AuthOptions } from "next-auth";
import { db } from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import FortyTwoProvider from "next-auth/providers/42-school";
import DiscordProvider from "next-auth/providers/discord";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID ?? "",
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    session: async ({ session, user }) => {
      if (!user.image) {
        const currentAccount = await db.account.findFirst({
          where: {
            userId: user.id,
          },
          select: {
            provider: true,
            providerAccountId: true,
          },
        });

        if (currentAccount?.provider == "42-school") {
          const res = await axios.post("https://api.intra.42.fr/oauth/token", {
            grant_type: "client_credentials",
            client_id: process.env.FORTY_TWO_CLIENT_ID,
            client_secret: process.env.FORTY_TWO_CLIENT_SECRET,
          });

          const token = res.data.access_token;
          const userData = await axios.get(
            `https://api.intra.42.fr/v2/users/${currentAccount.providerAccountId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          session = {
            ...session,
            user: {
              ...session.user,
              image: userData.data.image.link,
            },
          };
        }
      }
      return {
        ...session,
        user: {
          id: user.id,
          ...session.user,
        }
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};
