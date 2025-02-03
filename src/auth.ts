import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProviders from "next-auth/providers/github";
import {prisma} from "@/lib";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("GITHUB_ID and GITHUB_SECRET is required");
}

export const {handlers: { GET, POST }, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProviders({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({session, user}) {
            if (session && user) {
                session.user.id = user.id;
            }
            return session;
    },
    },
});





