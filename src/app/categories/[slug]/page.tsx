import movies from "@/data/movies.json";

export function generateStaticParams() {
  const set = new Set<string>();

  movies.forEach((m) => {
    (m.genres || []).forEach((g: string) => {
      set.add(g.toLowerCase().replace(/\s+/g, "-"));
    });
  });

  return Array.from(set).map((slug) => ({ slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const categoryName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const list = movies.filter((m) =>
    (m.genres || []).some(
      (g: string) =>
        g.toLowerCase().replace(/\s+/g, "-") === slug
    )
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <h4 className="uppercase text-gray-400 text-sm">Category</h4>
      <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
      <p className="text-gray-400 mb-10">{list.length} Items</p>

      {/* MOVIE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {list.map((m) => (
          <a
            key={m.slug}
            href={`/content/${m.slug}`}
            className="group"
          >
            <img
              src={m.poster}
              className="rounded-xl w-full h-auto group-hover:opacity-80 transition"
            />

            <div className="mt-2">
              <h3 className="text-sm font-semibold">{m.title}</h3>
              <p className="text-xs text-gray-400">
                {m.type?.toUpperCase()} • {m.releaseYear || m.year}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="h-20" />
    </main>
  );
}
