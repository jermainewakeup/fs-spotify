import Link from "next/link";
export default async function Home() {
    const displayedHeader = "Dogify";
    const displayedSubHeader = "See how your taste compares to your peers";
    const displayedSpotifyText = "Dashboard";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-8 sm:p-16 text-center">
            <section className="max-w-2xl flex flex-col items-center gap-6">
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
                    {displayedHeader}
                </h1>
                <p className="text-lg sm:text-xl text-foreground/80">
                    {displayedSubHeader}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center rounded-md bg-green-500 px-5 py-3 font-medium text-white shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    >
                        {displayedSpotifyText}
                    </Link>
                    <a
                        href=""
                        className="inline-flex items-center justify-center rounded-md border border-foreground/20 px-5 py-3 font-medium hover:bg-foreground/5"
                    >
                        Coming Soon
                    </a>
                </div>
            </section>

            <section id="features" className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="rounded-lg border border-foreground/10 p-5">
                    <h3 className="font-semibold mb-1">Top Tracks</h3>
                    <p className="text-sm text-foreground/70">See your most-played tracks over time ranges.</p>
                </div>
                <div className="rounded-lg border border-foreground/10 p-5">
                    <h3 className="font-semibold mb-1">Artist Insights</h3>
                    <p className="text-sm text-foreground/70">Break down your listening habits by artist and genre.</p>
                </div>
                <div className="rounded-lg border border-foreground/10 p-5">
                    <h3 className="font-semibold mb-1">Shareable Stats</h3>
                    <p className="text-sm text-foreground/70">Export bite-sized summaries to share with friends.</p>
                </div>
            </section>
        </main>
    );
}
