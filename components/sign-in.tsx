import { signIn } from "@/auth"

/**
 * Component for rendering a sign-in form for Spotify.
 * Executes an asynchronous server-side action to handle the sign-in process
 * when the form is submitted.
 *
 * @return {JSX.Element} A form element containing a submit button to sign in with Spotify.
 */
export default function SignIn() {
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