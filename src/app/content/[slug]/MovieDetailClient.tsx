"use client";
import React, { useState } from "react";
import Image from "next/image";
import VibeChart from "@/components/VibeChart";
import Meter from "@/components/Meter";

export default function MovieDetailClient({ movie }: { movie: any }) {
  const [open, setOpen] = useState(false);

  const heroSrc = movie.backdrop || movie.banner || movie.hero || movie.poster;

  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{6,11})(?:\?|&|$)/);
    const id = match ? match[1] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  };

  const embedUrl = getEmbedUrl(movie.trailerUrl);

  return (
    <>
      {/* ================================
         🔥 HERO SECTION 
      =================================*/}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${heroSrc})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-end pb-10">
          <div className="flex gap-10 items-end w-full">

            {/* Poster */}
            <div className="w-40 sm:w-48 lg:w-56 -mt-32 relative z-10">
              <Image
                src={movie.poster}
                alt={movie.title}
                width={400}
                height={600}
                className="rounded-xl w-full h-auto shadow-2xl object-cover"
              />
            </div>

            {/* Right side (Title + buttons + meta) */}
            <div className="text-white w-full max-w-3xl">
              <p className="opacity-80 text-sm mb-2">
                {movie.type?.toUpperCase()} • {movie.year || movie.releaseYear} •{" "}
                {movie.runtime || movie.duration}
              </p>

              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                {movie.title}
              </h1>

              {/* Buttons */}
              <div className="mt-5 flex gap-4">
                <button
                  onClick={() => setOpen(true)}
                  className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center gap-2"
                >
                  ▶ Play Trailer
                </button>

                <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium">
                  Bookmark
                </button>
              </div>

              {/* Small meta row */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-y-3 text-sm text-gray-300">
                <div>
                  <strong className="text-white">Director</strong>
                  <div>{movie.director || "—"}</div>
                </div>

                <div>
                  <strong className="text-white">Country</strong>
                  <div>{movie.country || "—"}</div>
                </div>

                <div>
                  <strong className="text-white">Language</strong>
                  <div>{movie.language || "—"}</div>
                </div>

                <div>
                  <strong className="text-white">Age Rating</strong>
                  <div>{movie.ageRating || "—"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================
           MAIN CONTENT + SIDEBAR
      =================================*/}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-12">

          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {(movie.genres || []).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full bg-white/10 text-gray-200 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </section>

          {/* Cast */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5">Cast</h2>

            {movie.cast?.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-2">
                {movie.cast.map((actor: any) => (
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
                    <p className="text-white mt-2 text-sm">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.role}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No cast data available.</p>
            )}
          </section>

          {/* Crew */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5">Crew</h2>

            {movie.crew?.length > 0 ? (
              <div className="flex flex-wrap gap-10">
                {movie.crew.map((person: any) => (
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
                    <p className="text-white font-medium">{person.name}</p>
                    <p className="text-gray-400 text-sm">{person.job}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No crew information.</p>
            )}
          </section>

          {/* Movie Assignmnet Meter */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5">Movie Assignmnet Meter</h2>
            <Meter data={movie.moctaleMeter} />
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-8">

          {/* VIBE CHART BLOCK */}
          <div className="bg-white/5 p-6 rounded-xl">
            <VibeChart data={movie.vibe || {}} />
          </div>

          {/* TICKET LINKS */}
          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">Tickets On</h3>
            {(movie.tickets || []).map((t: any) => (
              <a
                key={t.name}
                href={t.url}
                target="_blank"
                className="block text-gray-200 hover:text-white py-2"
              >
                {t.name} →
              </a>
            ))}
            {(!movie.tickets || movie.tickets.length === 0) && (
              <p className="text-gray-400 text-sm">No ticket sources available.</p>
            )}
          </div>
        </aside>
      </div>

      {/* ================================
           TRAILER MODAL
      =================================*/}
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
