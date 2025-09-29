import {auth} from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = (session as any).accessToken;
    const result = await fetch('https://api.spotify.com/v1/me/top/tracks',{
        method: 'GET', headers: {Authorization: 'Bearer' + token}
    })

    const data = await result.json()
    return data.items
}