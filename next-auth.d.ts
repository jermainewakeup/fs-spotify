import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        expiresAt?: number;
        refreshToken?: string;
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            id?: string | null;
        };
    }

    interface User {
        id: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number; // ms epoch
    }
}
