// app/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ReportGenerator, { type Track } from "@/components/report-generator";

type TopTracks = {
    items: Track[]
}

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    const res = await fetch('/api/spotify/top_tracks/', {cache: "no-store"})
    const data: TopTracks = await res.json()

    return <ReportGenerator items={(data.items ?? []).map(t => ({ id: t.id, name: t.name }))} />;
}
