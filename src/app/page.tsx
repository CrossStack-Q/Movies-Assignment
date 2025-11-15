"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import moviesData from "@/data/movies.json";
import Link from "next/link";

export default function HomePage() {
  const movies = moviesData as any[];

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("latest");


  const filtered = useMemo(() => {
    let list = [...movies];

    if (search.trim() !== "") {
      list = list.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      list = list.filter((m) => m.type === selectedType);
    }

    if (selectedGenre !== "all") {
      list = list.filter((m) => m.genres?.includes(selectedGenre));
    }

    if (selectedLanguage !== "all") {
      list = list.filter((m) => m.language === selectedLanguage);
    }

    if (sortBy === "latest") {
      list.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => (a.year || 0) - (b.year || 0));
    } else if (sortBy === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      list.sort((a, b) => (b.moctaleMeter?.score || 0) - (a.moctaleMeter?.score || 0));
    }

    return list;
  }, [search, selectedType, selectedGenre, selectedLanguage, sortBy, movies]);

  const uniqueGenres = Array.from(
    new Set(movies.flatMap((m) => m.genres || []))
  );
  const uniqueLanguages = Array.from(
    new Set(movies.map((m) => m.language).filter(Boolean))
  );

  return (
    <main className="max-w-7xl mx-auto py-10 px-6 lg:px-12">

      <h1 className="text-4xl font-bold mb-8">🎬 Explore Movies</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        
        <input
          type="text"
          placeholder="Search movies..."
          className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 bg-white/10 rounded-xl border border-white/20"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A → Z</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">

        <select
          className="px-4 py-2 bg-white/10 rounded-xl border border-white/20"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>

        <select
          className="px-4 py-2 bg-white/10 rounded-xl border border-white/20"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All Genres</option>
          {uniqueGenres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 bg-white/10 rounded-xl border border-white/20"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="all">All Languages</option>
          {uniqueLanguages.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {filtered.map((movie) => (
          <Link
            href={`/content/${movie.slug}`}
            key={movie.slug}
            className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition"
          >
            <Image
              src={movie.poster}
              alt={movie.title}
              width={300}
              height={400}
              className="w-full h-auto object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{movie.title}</h3>
              <p className="text-xs text-gray-400">{movie.year} • {movie.type}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-400 mt-10 text-center text-lg">
          No movies found with current filters.
        </p>
      )}
    </main>
  );
}
