"use client";

import { useState, useMemo } from "react";
import movies from "@/data/movies.json";

export default function CategoriesPage() {
  const [query, setQuery] = useState("");

  const allCategories = useMemo(() => {
    const set = new Set<string>();

    movies.forEach((m) => {
      (m.genres || []).forEach((g: string) => set.add(g));
    });

    return Array.from(set).sort();
  }, []);

  const filtered = allCategories.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce((acc, cat) => {
    const letter = cat[0].toUpperCase();
    acc[letter] = acc[letter] || [];
    acc[letter].push(cat);
    return acc;
  }, {} as Record<string, string[]>);

  const letters = Object.keys(grouped).sort();

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Categories</h1>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search category"
          className="px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/20 w-72"
        />
      </div>

      <div className="space-y-16">
        {letters.map((letter) => (
          <section key={letter}>
            <h2 className="text-3xl font-bold mb-6">{letter}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[letter].map((cat) => (
                <a
                  key={cat}
                  href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-6 py-3 bg-black/10 dark:bg-white/10 rounded-xl hover:bg-black/20 dark:hover:bg-white/20 border border-black/10 dark:border-white/10"
                >
                  {cat}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
