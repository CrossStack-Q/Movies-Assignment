"use client";

import React, { useState } from "react";
import Image from "next/image";
import VibeChart from "@/components/VibeChart";
import Meter from "@/components/Meter";

export default function MovieDetailClient({ movie }: { movie: any }) {
  const [open, setOpen] = useState(false);

  const heroSrc = movie.backdrop || movie.banner || movie.hero || movie.poster;

  const getEmbedUrl = (url:any) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{6,11})(?:\?|&|$)/);
    const id = match ? match[1] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  };

  const embedUrl = getEmbedUrl(movie.trailerUrl);

  return (
    <>
      <div
        className="relative w-full h-[60vh] bg-cover bg-center text-black dark:text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${heroSrc})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-end pb-10">
          <div className="flex gap-10 items-end w-full">
            <div className="w-40 sm:w-48 lg:w-56 -mt-32 relative z-10">
              <Image
                src={movie.poster}
                alt={movie.title}
                width={400}
                height={600}
                className="rounded-xl w-full h-auto shadow-2xl object-cover"
              />
            </div>

            <div className="w-full max-w-3xl">
              <p className="opacity-80 text-sm mb-2 text-gray-100 dark:text-gray-300">
                {movie.type?.toUpperCase()} • {movie.year || movie.releaseYear} •{" "}
                {movie.runtime || movie.duration}
              </p>

              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                {movie.title}
              </h1>

              <div className="mt-5 flex gap-4">
                <button
                  onClick={() => setOpen(true)}
                  className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center gap-2"
                >
                  ▶ Play Trailer
                </button>

                <button className="px-5 py-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 text-black dark:text-white font-medium">
                  Bookmark
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-y-3 text-sm">
                <div>
                  <strong className="text-black dark:text-white">Director</strong>
                  <div className="text-gray-800 dark:text-gray-300">{movie.director || "—"}</div>
                </div>

                <div>
                  <strong className="text-black dark:text-white">Country</strong>
                  <div className="text-gray-800 dark:text-gray-300">{movie.country || "—"}</div>
                </div>

                <div>
                  <strong className="text-black dark:text-white">Language</strong>
                  <div className="text-gray-800 dark:text-gray-300">{movie.language || "—"}</div>
                </div>

                <div>
                  <strong className="text-black dark:text-white">Age Rating</strong>
                  <div className="text-gray-800 dark:text-gray-300">{movie.ageRating || "—"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 text-black dark:text-white">

        <div className="lg:col-span-2 space-y-12">

          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movie.overview}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(movie.genres || []).map((genre:any) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 text-gray-700 dark:text-gray-200 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-5">Cast</h2>

            {movie.cast?.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-2">
                {movie.cast.map((actor:any) => (
                  <div key={actor.name} className="min-w-[110px] text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                      <Image
                        src={actor.photo}
                        alt={actor.name}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="mt-2 text-sm text-black dark:text-white">{actor.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{actor.role}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No cast data available.</p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-5">Crew</h2>

            {movie.crew?.length > 0 ? (
              <div className="flex flex-wrap gap-10">
                {movie.crew.map((person:any) => (
                  <div key={person.name}>
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                      <Image
                        src={person.photo}
                        alt={person.name}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="font-medium text-black dark:text-white">{person.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{person.job}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No crew information.</p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold mb-5">Movie Assignment Meter</h2>
            <Meter data={movie.moctaleMeter} />
          </section>
        </div>

        
        <aside className="space-y-8">

          <div className="p-6 rounded-xl bg-black/10 dark:bg-white/5">
            <VibeChart data={movie.vibe || {}} />
          </div>

          <div className="p-6 rounded-xl bg-black/10 dark:bg-white/5">
            <h3 className="text-lg font-semibold mb-3">Tickets On</h3>
            {(movie.tickets || []).map((t:any) => (
              <a
                key={t.name}
                href={t.url}
                target="_blank"
                className="block py-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white"
              >
                {t.name} →
              </a>
            ))}
            {(!movie.tickets || movie.tickets.length === 0) && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">No ticket sources available.</p>
            )}
          </div>
        </aside>
      </div>

      {open && embedUrl && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
