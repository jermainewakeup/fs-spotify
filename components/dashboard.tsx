import React from "react";

type Track = {
    id: string;
    title: string;
    artist: string;
    genre: string;
};

const MOCK_TRACKS: Track[] = [
    { id: "t1", title: "Parasite",       artist: "jermainewakeup", genre: "Downtempo" },
    { id: "t2", title: "Fine Now",       artist: "jermainewakeup", genre: "Rap" },
    { id: "t3", title: "Oroborous",      artist: "jermainewakeup", genre: "Rock" },
    { id: "t4", title: "Say Something",  artist: "jermainewakeup", genre: "Electronic" },
    { id: "t5", title: "Heartless",      artist: "jermainewakeup", genre: "Electronic" },
    { id: "t6", title: "Patron Saints",  artist: "Ka",             genre: "Rap" },
    { id: "t7", title: "Motivation",     artist: "Lil B",          genre: "Rap" },
    { id: "t8", title: "So Hard",        artist: "Mac Dre",        genre: "Rap" },
    { id: "t9", title: "Ascension",      artist: "Mac Miller",     genre: "Rap" },
    { id: "t10", title: "Zim Zim",       artist: "Billy Boyo",     genre: "Reggae" },
];

const GLOBAL_PLAY_COUNTS: Record<string, number> = {
    t1: 12,   // Parasite (rare-ish)
    t2: 220,  // Fine Now (popular)
    t3: 18,
    t4: 65,
    t5: 40,
    t6: 7,    // Ka deep cut (rare)
    t7: 33,
    t8: 55,
    t9: 90,
    t10: 4,   // Billy Boyo classic (rare)
};

const USER_RECENT_PLAYS: Record<string, number> = {
    t1: 3,
    t2: 1,
    t3: 1,
    t4: 1,
    t5: 2,
    t6: 2,
    t7: 1,
    t8: 1,
    t9: 1,
    t10: 1,
};

function computeRows(tracks: Track[]) {
    // “Rarity” ~ 1 / (global frequency). Add +1 so unseen tracks don’t explode.
    // Normalize to a 0–100 score for display.
    const rarity = (g: number) => 1 / (g + 1);

    const rarities = tracks.map(t => rarity(GLOBAL_PLAY_COUNTS[t.id] ?? 0));
    const maxRarity = Math.max(...rarities, 1);

    const rows = tracks.map(t => {
        const global = GLOBAL_PLAY_COUNTS[t.id] ?? 0;
        const r = rarity(global);
        const weight = USER_RECENT_PLAYS[t.id] ?? 1; // repeat plays boost influence
        const trackScore = (r / maxRarity) * 100 * Math.min(2, weight);
        return {
            ...t,
            globalPlays: global,
            userPlays: weight,
            rarityRaw: r,
            score: trackScore,
        };
    });

    const totalWeight = rows.reduce((s, r) => s + (r.userPlays || 1), 0);
    const overallUniqueness =
        rows.reduce((s, r) => s + r.rarityRaw * (r.userPlays || 1), 0) /
        Math.max(1, totalWeight);

    // Sort descending by score
    rows.sort((a, b) => b.score - a.score);

    return { rows, overallUniquenessNormalized: (overallUniqueness / maxRarity) * 100 };
}

export default function Dashboard() {
    const { rows, overallUniquenessNormalized } = computeRows(MOCK_TRACKS);

    return (
        <main className="min-h-screen p-4 font-sans">
            <section id="tracks" className="flex flex-col items-center max-w-2xl mx-auto py-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold">Top Tracks</h1>
                    <p className="text-sm text-gray-400 mt-1">Calculated from <em>global frequency</em> (rarer tracks contribute more)</p>

                    {/* Overall score */}
                    <div className="mt-3 inline-flex items-baseline gap-3 rounded-xl border border-gray-700 px-3 py-2">
                        <span className="text-xs uppercase text-gray-400">Overall Uniqueness</span>
                        <span className="text-xl font-bold text-green-500">
              {overallUniquenessNormalized.toFixed(1)}%
            </span>
                        <details className="ml-2 cursor-pointer">
                            <summary className="text-xs text-gray-400 underline decoration-dotted">Why?</summary>
                            <div className="mt-2 max-w-md text-left text-sm text-gray-300">
                                We estimate rarity as <code>1 / (globalPlays + 1)</code>.
                                Your overall score is the **weighted average** of rarity across tracks you played,
                                giving a small boost to repeats. Popular tracks (high global plays) contribute less.
                            </div>
                        </details>
                    </div>
                </div>

                {/* Table */}
                <div className="w-full rounded-lg shadow-xl border border-gray-700">
                    <h2 className="text-lg font-semibold mb-0 border-b border-gray-700 p-4 text-gray-400">
                        Top {rows.length} Tracks by Uniqueness
                    </h2>

                    <ul className="divide-y divide-gray-700">
                        {rows.map((track, index) => (
                            <li key={track.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-bold w-5 text-gray-400">{index + 1}.</span>
                                    <div>
                                        <p className="font-medium">{track.title}</p>
                                        <p className="text-xs text-gray-400">
                                            {track.artist} • <span className="font-semibold text-green-300">{track.genre}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-semibold uppercase text-gray-500">Score</p>
                                    <span className="text-base font-bold text-green-500">
                    {track.score.toFixed(1)}%
                  </span>
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        global:{track.globalPlays} • you:{track.userPlays}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Raw JSON  */}
                    <details className="p-4">
                        <summary className="cursor-pointer text-sm text-gray-400 underline decoration-dotted">
                            View raw JSON
                        </summary>
                        <pre className="mt-3 max-h-72 overflow-auto rounded bg-black/40 p-3 text-xs text-gray-200">
{JSON.stringify(rows, null, 2)}
            </pre>
                    </details>
                </div>
            </section>
        </main>
    );
}
