import Link from "next/link";
import { formatBaths, formatPrice, VAULTED_LISTINGS } from "@/lib/listings";

const HERO_IMAGE = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070706] text-stone-50">
      <section
        className="relative min-h-[86vh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,0.95)_0%,rgba(7,7,6,0.72)_42%,rgba(7,7,6,0.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070706] to-transparent" />

        <nav className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="text-2xl font-semibold tracking-[0.18em] text-white">
            VAULTED
          </Link>
          <div className="hidden items-center gap-7 text-sm text-stone-300 md:flex">
            <a href="#listings" className="transition-colors hover:text-white">Buy</a>
            <a href="#listings" className="transition-colors hover:text-white">Sell</a>
            <a href="#listings" className="transition-colors hover:text-white">Private Client</a>
          </div>
          <Link
            href="/property/1"
            className="rounded-full border border-amber-200/40 bg-black/30 px-4 py-2 text-sm font-medium text-amber-100 backdrop-blur transition-colors hover:bg-amber-100 hover:text-black"
          >
            View 3D Tour
          </Link>
        </nav>

        <div className="relative z-10 flex min-h-[calc(86vh-88px)] items-end px-5 pb-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-5xl">
            <div className="mb-5 inline-flex rounded-full border border-amber-200/25 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-amber-100 backdrop-blur">
              Private luxury homes with immersive tours
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Find the address that already feels inevitable.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
              Vaulted curates exceptional homes with cinematic listing data, neighborhood context, and interactive 3D room previews before the first showing.
            </p>

            <form className="mt-9 grid gap-3 rounded-2xl border border-white/12 bg-[#11100d]/85 p-3 shadow-2xl shadow-black/40 backdrop-blur md:grid-cols-[minmax(0,1fr)_160px_140px_auto]">
              <label className="min-w-0">
                <span className="sr-only">Search location</span>
                <input
                  type="search"
                  placeholder="City, neighborhood, address, or ZIP"
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-amber-200/60"
                />
              </label>
              <select
                aria-label="Minimum beds"
                className="h-[52px] rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none focus:border-amber-200/60"
                defaultValue=""
              >
                <option value="" className="bg-[#11100d]">Any beds</option>
                <option className="bg-[#11100d]">3+ beds</option>
                <option className="bg-[#11100d]">4+ beds</option>
                <option className="bg-[#11100d]">5+ beds</option>
              </select>
              <select
                aria-label="Price range"
                className="h-[52px] rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none focus:border-amber-200/60"
                defaultValue=""
              >
                <option value="" className="bg-[#11100d]">Any price</option>
                <option className="bg-[#11100d]">$5M+</option>
                <option className="bg-[#11100d]">$10M+</option>
                <option className="bg-[#11100d]">$20M+</option>
              </select>
              <button
                type="submit"
                className="h-[52px] rounded-xl bg-amber-100 px-6 text-sm font-semibold text-black transition-colors hover:bg-white"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0c0b09] px-5 py-5 sm:px-8 lg:px-12">
        <div className="grid gap-4 text-sm text-stone-400 md:grid-cols-4">
          {[
            ["$58.5M", "Featured inventory"],
            ["4", "Private-market homes"],
            ["9.5/10", "Avg. neighborhood score"],
            ["3D", "Every listing tour-ready"],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline justify-between border-white/10 md:border-r md:pr-6 last:md:border-r-0">
              <span className="text-2xl font-semibold text-white">{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="listings" className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-amber-100/70">Featured listings</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Exceptional homes now touring</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-400">
            Real-looking comps, premium addresses, and interactive room previews for a darker, sharper real estate buying flow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {VAULTED_LISTINGS.map((listing) => (
            <article
              key={listing.id}
              className="group overflow-hidden rounded-lg border border-white/10 bg-[#11100d] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-100/40"
            >
              <Link href={`/property/${listing.id}`} className="block">
                <div
                  className="relative h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${listing.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    3D Tour
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-2xl font-semibold text-white">{formatPrice(listing.price)}</div>
                    <div className="mt-1 text-sm text-stone-300">{listing.location}</div>
                  </div>
                </div>
                <div className="grid gap-4 p-5">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-white">{listing.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-stone-500">{listing.address}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-md bg-white/[0.05] px-2 py-2 text-stone-300">
                      <span className="block font-semibold text-white">{listing.beds}</span>beds
                    </div>
                    <div className="rounded-md bg-white/[0.05] px-2 py-2 text-stone-300">
                      <span className="block font-semibold text-white">{formatBaths(listing.baths)}</span>baths
                    </div>
                    <div className="rounded-md bg-white/[0.05] px-2 py-2 text-stone-300">
                      <span className="block font-semibold text-white">{listing.sqft.toLocaleString()}</span>sqft
                    </div>
                  </div>
                  <span className="text-sm font-medium text-amber-100 transition-colors group-hover:text-white">
                    Open listing →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
