import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Movie Assignment
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/explore" className="text-gray-300 hover:text-white">Explore</Link>
          <Link href="/schedule" className="text-gray-300 hover:text-white">Schedule</Link>
        </div>
      </div>
    </nav>
  );
}
