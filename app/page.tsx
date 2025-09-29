import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Handles the rendering of the main authenticated home page.
 * Ensures the user is authenticated before rendering the UI.
 * Redirects to the sign-in page if no valid session is found.
 *
 * @return {Promise<JSX.Element>} A promise resolving to the authenticated home page UI.
 */
export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    const res = await fetch("/api/spotify/top_tracks/route.ts", {cache : "no-store"});
    if (!res.ok) return <main className="p-6">Failed to load</main>;
    const data: Report = await res.json();

    return data
}
