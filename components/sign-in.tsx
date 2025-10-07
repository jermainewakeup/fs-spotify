import { signIn, auth} from "@/auth"
import {redirect} from "next/navigation";

export default async function SignIn() {
    const session = await auth() // Check if the user is already signed in
    if (session) redirect("/")           // If they are, redirect to the home page
    return await signIn("spotify")
}