import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    const jwt = await getToken({ req });
    const access = jwt?.accessToken;
    if (!access) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL("https://api.spotify.com/v1/me/top/tracks");
    url.searchParams.set("limit", "20");

    const r = await fetch(url, {
        headers: { Authorization: `Bearer ${access}` },
        cache: "no-store",
    });

    const body = await r.json().catch(() => ({}));
    return NextResponse.json(body, { status: r.status });
}
