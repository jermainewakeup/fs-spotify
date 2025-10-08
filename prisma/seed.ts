import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const tracksToSeed = [
    // High Uniqueness Scores (Niche/Less Common Genres)
    { spotifyId: 'mock1', title: 'Data Structures Dance', artist: 'Algorithmics', uniquenessScore: 95.1, genre: 'Math Rock' },
    { spotifyId: 'mock2', title: 'Latency Loop', artist: 'JUCE Boys', uniquenessScore: 88.6, genre: 'Ambient Noise' },
    { spotifyId: 'mock3', title: 'Schema Flow', artist: 'The Full Stack', uniquenessScore: 78.4, genre: 'Experimental Jazz' },

    // Mid Uniqueness Scores (Emerging/Sub-Genre)
    { spotifyId: 'mock4', title: 'Next.js Nexus', artist: 'Vercel Vision', uniquenessScore: 65.9, genre: 'Hyperpop' },
    { spotifyId: 'mock5', title: 'PostgreSQL Groove', artist: 'Database Crew', uniquenessScore: 54.0, genre: 'Lo-fi Beats' },

    // Lower Uniqueness Scores (Popular/Common Genres)
    { spotifyId: 'mock6', title: 'Hooks Hype', artist: 'React Rhythms', uniquenessScore: 48.7, genre: 'Indie Pop' },
    { spotifyId: 'mock7', title: 'TypeScript Dreams', artist: 'Static Typing', uniquenessScore: 33.2, genre: 'Hip Hop' },
    { spotifyId: 'mock8', title: 'The Barista Life', artist: 'Starbucks Symphony', uniquenessScore: 21.5, genre: 'Pop' },
    { spotifyId: 'mock9', title: 'Git Commit', artist: 'Version Control', uniquenessScore: 18.0, genre: 'Pop' },
    { spotifyId: 'mock10', title: 'Linux Mint Melody', artist: 'The Dual Booters', uniquenessScore: 10.3, genre: 'Rock' },
];

async function main() {
    console.log(`Start seeding ${tracksToSeed.length} mock tracks, including genre data...`);

    // Clear existing track data before seeding to ensure a fresh demo state
    await prisma.track.deleteMany({});
    console.log("Cleared existing Track records.");

    for (const trackData of tracksToSeed) {
        await prisma.track.create({
            data: trackData,
        });
        console.log(`Created track: ${trackData.title} (${trackData.genre})`);
    }

    console.log(`Seeding finished successfully.`);
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
