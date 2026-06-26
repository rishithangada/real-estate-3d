import Link from "next/link";

// ponytail: inline fallback data — API may not be running at SSR time during dev
const FALLBACK_PROPERTIES = [
  { id: "1", title: "Modern Loft in SoHo", price: 4200, beds: 2, sqft: 1200, location: "SoHo, New York" },
  { id: "2", title: "Beachfront Villa, Malibu", price: 12500, beds: 4, sqft: 3800, location: "Malibu, California" },
  { id: "3", title: "Glass House, Austin", price: 5800, beds: 3, sqft: 2400, location: "West Lake Hills, Austin" },
];

type Property = { id: string; title: string; price: number; beds: number; sqft: number; location: string };

export default function HomePage() {
  const properties: Property[] = FALLBACK_PROPERTIES;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="text-xl font-bold tracking-tight text-white">
          PropVision<span className="text-indigo-400">3D</span>
        </span>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Buy</a>
          <a href="#" className="hover:text-white transition-colors">Rent</a>
          <a href="#" className="hover:text-white transition-colors">Sell</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-indigo-950/40 to-transparent">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-indigo-300 text-xs font-medium mb-6 tracking-wide uppercase">
          Immersive Property Tours
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
          Explore Properties
          <br />
          <span className="text-indigo-400">in 3D</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Walk through your next home before you visit. Rotate, explore, and feel the space — all in your browser.
        </p>

        {/* Search bar */}
        <form className="flex w-full max-w-xl gap-2">
          <input
            type="text"
            placeholder="Search by city, neighborhood, or ZIP..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Search
          </button>
        </form>
      </section>

      {/* Property grid */}
      <section className="flex-1 max-w-6xl mx-auto w-full px-6 pb-20">
        <h2 className="text-xl font-semibold text-white mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p.id}
              className="group bg-white/5 border border-white/[0.08] rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              {/* Thumbnail placeholder */}
              <div className="h-48 bg-gradient-to-br from-indigo-900/40 via-slate-800/60 to-indigo-950/80 relative flex items-center justify-center">
                <svg className="w-12 h-12 text-indigo-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9.75L12 3l9 6.75V21H3V9.75z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 21V12h6v9" />
                </svg>
                <span className="absolute top-3 right-3 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs px-2 py-0.5 rounded-full">
                  3D Tour
                </span>
              </div>

              <div className="p-5">
                <div className="text-xs text-gray-500 mb-1">{p.location}</div>
                <h3 className="font-semibold text-white text-base mb-2 leading-snug">{p.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>{p.beds} beds</span>
                  <span>{p.sqft.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-400 font-bold">
                    ${p.price.toLocaleString()}
                    <span className="text-xs text-gray-500 font-normal">/mo</span>
                  </span>
                  <Link
                    href={`/property/${p.id}`}
                    className="bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 hover:text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    View in 3D
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
