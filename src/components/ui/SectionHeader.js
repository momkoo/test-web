export default function SectionHeader({ title, url = "#" }) {
    return (
        <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-8">
            <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight">
                {title}
            </h2>
            <a href={url} className="text-sm font-bold uppercase hover:underline">
                더보기 +
            </a>
        </div>
    );
}
