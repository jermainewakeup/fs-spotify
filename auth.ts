import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "database" },
    providers: [
        Spotify({
            clientId: process.env.AUTH_SPOTIFY_ID!,
            clientSecret: process.env.AUTH_SPOTIFY_SECRET!,
            authorization: { params: { scope: "user-top-read" } },
        }),
    ]
});
