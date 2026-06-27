import Link from "next/link";
import PropertyTour from "@/components/PropertyTour";

type Property = {
  id: string;
  title: string;
  price: number;
  beds: number;
  sqft: number;
  location: string;
  description: string;
};

const PROPERTIES: Record<string, Property> = {
  "1": {
    id: "1",
    title: "Modern Loft in SoHo",
    price: 4200,
    beds: 2,
    sqft: 1200,
    location: "SoHo, New York",
    description:
      "A stunning open-plan loft with exposed brick walls, floor-to-ceiling windows, and designer finishes throughout. Polished concrete floors and 14-foot ceilings create an airy, gallery-like atmosphere.",
  },
  "2": {
    id: "2",
    title: "Beachfront Villa, Malibu",
    price: 12500,
    beds: 4,
    sqft: 3800,
    location: "Malibu, California",
    description:
      "Breathtaking Pacific Ocean views from every room. Features a chef's kitchen, infinity pool, and direct beach access. Contemporary architecture blends indoor and outdoor living seamlessly.",
  },
  "3": {
    id: "3",
    title: "Glass House, Austin",
    price: 5800,
    beds: 3,
    sqft: 2400,
    location: "West Lake Hills, Austin",
    description:
      "Architecturally iconic home with walls of glass overlooking the Texas Hill Country. Smart home automation, a rooftop terrace, and heated lap pool set this property apart.",
  },
};

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = PROPERTIES[id] ?? PROPERTIES["1"];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors">
          PropVision<span className="text-indigo-400">3D</span>
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to listings
        </Link>
      </nav>

      <PropertyTour property={property} />
    </div>
  );
}
