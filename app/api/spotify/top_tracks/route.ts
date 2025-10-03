import { Tracks } from "@/backend/Spotify-Manager"
import {auth} from "@/auth"
import {NextResponse} from "next/server";
import prisma from "@/prisma";
export async function GET(){
    const session = await auth();
    if (!session) return NextResponse.json({error:"No such session"}, {status:401});

    const acct = await prisma.account.findFirst({
        where: {userId: session.user.id ,provider: "spotify"},
        select: {access_token: true, refresh_token: true, expires_at: true},
    })
    if (!acct?.access_token) return NextResponse.json({ error: "No Spotify account/token" }, { status: 403 });

    const token = acct?.access_token;

    const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=20", {
        method: "GET",
        headers: {'Authorization': 'Bearer ' + token},
        cache: "no-store",
    })

    return NextResponse.json(await res.json(), { status: res.status });}