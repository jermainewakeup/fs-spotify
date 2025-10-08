import React from 'react';

type Track = {
    id: string;
    title: string;
    artist: string;
    genre: string;
};

const MOCK_TRACKS: Track[] = [
    { id: 't1', title: 'Parasite', artist: 'jermainewakeup', genre: 'Downtempo' },
    { id: 't2', title: 'Fine Now', artist: 'jermainewakeup', genre: 'Rap' },
    { id: 't3', title: 'Oroborous', artist: 'jermainewakeup', genre: 'Rock' },
    { id: 't4', title: 'Say Something', artist: 'jermainewakeup', genre: 'Electronic' },
    { id: 't5', title: 'Heartless', artist: 'jermainewakeup', genre: 'Electronic' },
    { id: 't6', title: 'Patron Saints', artist: 'Ka', genre: 'Rap' },
    { id: 't7', title: 'Motivation', artist: 'Lil B', genre: 'Rap' },
    { id: 't8', title: 'So Hard', artist: 'Mac Dre', genre: 'Rap' },
    { id: 't9', title: 'Ascension', artist: 'Mac Miller', genre: 'Rap' },
    { id: 't10', title: 'Zim Zim', artist: 'Billy Boyo', genre: 'Reggae' },
];

export default function Dashboard() {

    const totalTracks = MOCK_TRACKS.length;

    const genreCounts = MOCK_TRACKS.reduce((acc, track) => {
        acc[track.genre] = (acc[track.genre] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const tracksWithScores = MOCK_TRACKS.map(track => {
        const genreCount = genreCounts[track.genre];

        const uniquenessScore = (1 - (genreCount / totalTracks)) * 100;

        return {
            ...track,
            uniquenessScore: uniquenessScore,
        };
    });

    const tracks = tracksWithScores.sort((a, b) => b.uniquenessScore - a.uniquenessScore);

    return (
        <main className="min-h-screen p-4 font-sans ">
            <section id="tracks" className="flex flex-col items-center max-w-2xl mx-auto py-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold ">
                        <span className="block">Top Tracks</span>
                        <span className="text-sm font-medium  mt-1 block">
                            (Calculated based on genre rarity)
                        </span>
                    </h1>
                </div>

                <div className="w-full  p-4 rounded-lg shadow-xl border border-gray-700 ">
                    <h2 className="text-lg font-semibold  mb-3 border-b pb-2 text-gray-400">
                        Top {tracks.length} Tracks by Uniqueness
                    </h2>

                    <ul className="divide-y divide-gray-700 ">
                        {tracks.map((track, index) => (
                            <li key={track.id} className="flex justify-between items-center py-3">

                                {/* Rank and Title */}
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-bold w-4 ">{index + 1}.</span>
                                    <div>
                                        <p className="font-medium ">{track.title}</p>
                                        <p className="text-xs ">{track.artist} • <span className="font-semibold text-green-300">{track.genre}</span></p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold uppercase text-gray-500">Score</p>
                                    <span className="text-base font-bold text-green-500">
                                        {track.uniquenessScore.toFixed(1)}%
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
};
