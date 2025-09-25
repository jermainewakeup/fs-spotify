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
    return <main>{
        <p className="flex justify-center items-center font-bold">
            Your Spotify Stats
        </p>
    }</main>;
}
