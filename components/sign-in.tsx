import { signIn, auth} from "@/auth"
import {redirect} from "next/navigation";

/**
 * Component for rendering a sign-in form for Spotify.
 * Executes an asynchronous server-side action to handle the sign-in process
 * when the form is submitted.
 *
 * @return {JSX.Element} A form element containing a submit button to sign in with Spotify.
 */
export default async function SignIn() {
    const session = await auth() // Check if the user is already signed in
    if (session) redirect("/")           // If they are, redirect to the home page
    return (
        <form
            action={async () => {
                "use server"
                await signIn("spotify")
            }}
        >
            <button type="submit">Sign in with Spotify</button>
        </form>
    )
}