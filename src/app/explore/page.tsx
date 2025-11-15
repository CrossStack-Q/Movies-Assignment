import { getExploreData } from "@/lib/getExploreData";
import Image from "next/image";
import Link from "next/link";

export default function ExplorePage() {
  const explore = getExploreData();

  return (
    <main className="max-w-7xl mx-auto py-10 px-12">

      <h1 className="text-4xl font-bold mb-10">Explore</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span>🔥</span> Talk Of The Town
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {explore.talk_of_town.map((item, index) => (
            <Link href={`/content/${item.slug}`} key={index}>
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <Image
                src={item.poster}
                alt={item.title}
                width={300}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.tag}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span>🤍</span> Editor’s Pick Of The Week
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          
          {explore.editors_pick.map((item, index) => (
            <Link href={`/content/${item.slug}`} key={index}>
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <Image
                src={item.poster}
                alt={item.title}
                width={300}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.tag}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </section>

     
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span>🤯</span> Popular Now
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {explore.coming_soon.map((item, index) => (
            <Link href={`/content/${item.slug}`} key={index}>
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <Image
                src={item.poster}
                alt={item.title}
                width={300}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.tag}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
