import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Movie Assignment",
  description: "Movie Assignment Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />

        <div className="pb-20 min-h-screen">
          {children}
        </div>

        <footer className="fixed bottom-0 text-2xl left-0 w-full text-center bg-black border-t border-white/10 text-white">
          Made by Anurag Sharma for Assignment.
        </footer>
      </body>
    </html>
  );
}
