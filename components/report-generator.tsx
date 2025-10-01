// components/ReportGenerator.tsx
export type Track = {
    id: string;
    name: string;
};
export default async function ReportGenerator({ items }: { items: Track[] }) {
    if (!items.length) return <main className="p-6">No tracks.</main>;
    return (
        <main className="p-6">
            <h1 className="text-xl mb-3">Your Top Tracks</h1>
            <ul>
                {items.map((t) => (
                    <li key={t.id}>{t.name}</li>
                ))}
            </ul>
        </main>
    );
}
