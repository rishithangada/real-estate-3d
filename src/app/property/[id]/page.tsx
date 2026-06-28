import Link from "next/link";
import PropertyTour from "@/components/PropertyTour";
import { formatBaths, formatPrice, getListing, VAULTED_LISTINGS } from "@/lib/listings";

export function generateStaticParams() {
  return VAULTED_LISTINGS.map((listing) => ({ id: listing.id }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getListing(id);

  return (
    <div className="min-h-screen bg-[#070706] text-stone-50">
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#070706]/90 px-5 py-4 backdrop-blur sm:px-8 lg:px-12">
        <Link href="/" className="text-xl font-semibold tracking-[0.18em] text-white transition-colors hover:text-amber-100">
          VAULTED
        </Link>
        <Link href="/" className="text-sm text-stone-400 transition-colors hover:text-white">
          Back to listings
        </Link>
      </nav>

      <header
        className="relative min-h-[430px] bg-cover bg-center"
        style={{ backgroundImage: `url(${property.image})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,0.96),rgba(7,7,6,0.62),rgba(7,7,6,0.18))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070706] to-transparent" />
        <div className="relative z-10 flex min-h-[430px] items-end px-5 pb-10 sm:px-8 lg:px-12">
          <div className="max-w-5xl">
            <div className="mb-4 inline-flex rounded-full border border-amber-100/30 bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-amber-100 backdrop-blur">
              Vaulted private listing
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">{property.title}</h1>
            <p className="mt-3 text-base text-stone-300">{property.address}</p>
            <div className="mt-7 grid max-w-4xl grid-cols-2 gap-3 text-sm sm:grid-cols-5">
              <div className="rounded-lg border border-white/10 bg-black/35 p-3 backdrop-blur">
                <div className="text-stone-500">Price</div>
                <div className="mt-1 font-semibold text-white">{formatPrice(property.price)}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/35 p-3 backdrop-blur">
                <div className="text-stone-500">Beds</div>
                <div className="mt-1 font-semibold text-white">{property.beds}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/35 p-3 backdrop-blur">
                <div className="text-stone-500">Baths</div>
                <div className="mt-1 font-semibold text-white">{formatBaths(property.baths)}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/35 p-3 backdrop-blur">
                <div className="text-stone-500">Area</div>
                <div className="mt-1 font-semibold text-white">{property.sqft.toLocaleString()} sqft</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/35 p-3 backdrop-blur">
                <div className="text-stone-500">Score</div>
                <div className="mt-1 font-semibold text-white">{property.neighborhoodScore}/10</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <PropertyTour property={property} />
    </div>
  );
}
