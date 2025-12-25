import Tag from "./ui/Tag";

export default function EventCard({ date, type, title, location, className = "" }) {
    return (
        <div className={`p-4 dashed-border-b dashed-border-r flex flex-col h-full hover:bg-black hover:text-white transition-colors group ${className}`} style={{ minHeight: "240px" }}>
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold uppercase">{date}</span>
                {type && (
                    <Tag className="group-hover:text-white group-hover:border-white">
                        {type}
                    </Tag>
                )}
            </div>

            <h3 className="text-2xl font-bold uppercase leading-tight mb-auto font-headline">
                {title}
            </h3>

            <div className="mt-4 pt-4 border-t border-dashed border-gray-300 group-hover:border-white w-full">
                <p className="text-sm uppercase tracking-wide">{location}</p>
            </div>
        </div>
    );
}
