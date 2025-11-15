import Hero16x9 from "@/components/Hero16x9";

export default function MovieDetail({ params }) {
  const slug = params.slug;

  return (
    <main>
      <Hero16x9
        src="/assets/fruits-basket.webp"
        title="Movie Title"
        subtitle="Genre • 2024 • Hindi"
        rating={8.4}
        language="Hindi"
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
        <p className="text-gray-300 leading-relaxed">
          This is a sample movie description. Replace with real content if needed.
        </p>
      </div>
    </main>
  );
}
