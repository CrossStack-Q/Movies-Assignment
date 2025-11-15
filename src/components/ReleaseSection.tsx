import Image from "next/image";
import Link from "next/link";

interface ReleaseItem {
  title: string;
  poster: string;
  label?: string;
  type: string;
  releaseDate?: string;
  slug: string;
}

export default function ReleaseSection({
  title,
  items,
}: {
  title: string;
  items: ReleaseItem[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-5">{title}</h2>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
        {items.map((movie) => (
          <Link
            href={`/content/${movie.slug}`}
            key={movie.slug}
            className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition"
          >
            <div className="relative w-full">
              <Image
                src={movie.poster}
                alt={movie.title}
                width={300}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="p-3">
              <h3 className="font-semibold text-sm text-white leading-tight">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {movie.label || movie.type.toUpperCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
