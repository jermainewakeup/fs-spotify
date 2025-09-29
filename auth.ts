import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
import {PrismaAdapter} from "@auth/prisma-adapter";
import { prisma } from "@/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session : {strategy: "jwt"},
    providers: [
        Spotify({authorization: {params: {scope: "user-top-read"}}})],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.expiresAt = Date.now() + (account.expires_in ?? 3600) * 1000;
                token.refreshToken = account.refresh_token; // also saved in Account by adapter
            }
            return token;
        },
        async session({session,token}){
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (session as any).accessToken = token.accessToken;
            return session;
        }
    }


})