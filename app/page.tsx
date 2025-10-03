// app/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    return null;
}
