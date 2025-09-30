// app/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ReportGenerator, { type Track } from "@/components/report-generator"; // note: capitalized file

type TopTracks = { items: Track[] };

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    // Call the route URL, NOT the .ts file
    const res = await fetch("/api/spotify/top_tracks", { cache: "no-store" });
    if (!res.ok) return <main className="p-6">Failed to load</main>;

    const data: TopTracks = await res.json(); // expects { items: [{ id, name }] }
    return <ReportGenerator items={data.items ?? []} />;
}
