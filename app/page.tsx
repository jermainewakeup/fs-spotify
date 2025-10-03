// app/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    const response = await fetch ("/api/spotify/top_tracks", {cache: "no-store"});
    const data = await response.json();

    return <pre className="p-4 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>;
}
