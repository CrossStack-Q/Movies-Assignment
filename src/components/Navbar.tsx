import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border-b border-black/10 dark:border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Movie Assignment
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/explore" className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white">Explore</Link>
          <Link href="/schedule" className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white">Schedule</Link>
          <Link href="/categories" className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white">Categories</Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
