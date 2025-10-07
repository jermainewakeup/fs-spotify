import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prisma";

export async function GET() {

    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized: No active session" }, { status: 401 });
    }

    const acct = await prisma.account.findFirst({
        where: {
            userId: session.user.id,
            provider: "spotify"
        },
        select: {
            access_token: true,
            refresh_token: true,
            expires_at: true
        },
    });

    if (!acct?.access_token) {
        return NextResponse.json({ error: "Spotify account not linked or token missing" }, { status: 403 });
    }

    const token = acct.access_token;


    const spotifyRes = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        cache: "no-store",
    });

    if (!spotifyRes.ok) {
        let errorBody;
        try {
            errorBody = await spotifyRes.json();
        } catch (e) {
            errorBody = { message: "Spotify error without JSON body" };
        }
        return NextResponse.json(errorBody, { status: spotifyRes.status });
    }

    return NextResponse.json(await spotifyRes.json(), { status: 200 });
}