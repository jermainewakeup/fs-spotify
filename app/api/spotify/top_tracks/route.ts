import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    const jwt = await getToken({ req });
    const access = jwt?.accessToken;
    if (!access) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const r = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=20", {
        headers: { Authorization: `Bearer ${access}` },
        cache: "no-store",
    });
    return NextResponse.json(await r.json());
}
