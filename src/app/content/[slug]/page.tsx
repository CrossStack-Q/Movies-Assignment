import React from "react";
import MovieDetailClient from "@/app/content/[slug]/MovieDetailClient";
import movies from "@/data/movies.json"; 

type Params = { params: { slug: string } };

export default function MoviePage({ params }: Params) {
  const { slug } = params;
  const movie = (movies as any[]).find((m) => m.slug === slug);

  if (!movie) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold">Movie not found</h1>
        <p className="mt-4">No movie with slug <strong>{slug}</strong></p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <MovieDetailClient movie={movie} />
    </main>
  );
}
