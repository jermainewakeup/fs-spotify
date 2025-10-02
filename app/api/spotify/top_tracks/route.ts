// app/api/top-tracks/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prisma"; // ensure you export a default PrismaClient instance

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const account = await prisma.account.findFirst({
        where: { userId: session.user.id, provider: "spotify" },
        select: { access_token: true, refresh_token: true, expires_at: true },
    });

    if (!account?.access_token) {
        return NextResponse.json({ error: "No linked Spotify account" }, { status: 400 });
    }

    const url = new URL("https://api.spotify.com/v1/me/top/tracks");
    url.searchParams.set("limit", "20");

    const r = await fetch(url, {
        headers: { Authorization: `Bearer ${account.access_token}` },
        cache: "no-store",
    });

    const body = await r.json().catch(() => ({}));
    return NextResponse.json(body, { status: r.status });
}
