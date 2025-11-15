"use client";
import { useState } from "react";

export default function TypeTabs({
  onCategoryChange,
  onSubFilterChange,
}: {
  onCategoryChange?: (type: string | null) => void;
  onSubFilterChange?: (sub: string | null) => void;
}) {
  const [active, setActive] = useState<"Movies" | "Series" | null>(null);
  const [sub, setSub] = useState<string | null>(null);

  const MOVIE_FILTERS = ["In Theatres", "On OTT"];
  const SERIES_FILTERS = ["New Season", "Trending", "Upcoming"];

  const toggleMain = (category: "Movies" | "Series") => {
    if (active === category) {
      setActive(null);
      setSub(null);
      onCategoryChange?.(null);
      onSubFilterChange?.(null);
    } else {
      const defaultSub =
        category === "Movies" ? "In Theatres" : "New Season";

      setActive(category);
      setSub(defaultSub);

      onCategoryChange?.(category);
      onSubFilterChange?.(defaultSub);
    }
  };

  const changeSub = (option: string) => {
    setSub(option);
    onSubFilterChange?.(option);
  };

  return (
    <div className="flex items-center gap-3">

      {!active && (
        <>
          <button
            onClick={() => toggleMain("Movies")}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            Movies
          </button>

          <button
            onClick={() => toggleMain("Series")}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            Series
          </button>
        </>
      )}
      {active === "Movies" && (
        <>
          <button
            onClick={() => toggleMain("Movies")}
            className="px-5 py-2 rounded-full bg-purple-600 text-white shadow-md"
          >
            ✓ Movies
          </button>

          {MOVIE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => changeSub(f)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                sub === f
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
              }`}
            >
              {sub === f ? "✓" : ""} {f}
            </button>
          ))}
        </>
      )}

      {active === "Series" && (
        <>
          <button
            onClick={() => toggleMain("Series")}
            className="px-5 py-2 rounded-full bg-purple-600 text-white shadow-md"
          >
            ✓ Series
          </button>

          {SERIES_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => changeSub(f)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                sub === f
                  ? "bg-purple-500 text-white shadow-lg"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
              }`}
            >
              {sub === f ? "✓" : ""} {f}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
