import Link from "next/link";
import RoomViewer from "@/components/RoomViewer";

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

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Left: Property info */}
        <aside className="lg:w-[380px] shrink-0 flex flex-col p-8 border-r border-white/10 overflow-y-auto">
          <div className="text-xs text-indigo-400 uppercase tracking-widest mb-2">{property.location}</div>
          <h1 className="text-2xl font-bold text-white leading-tight mb-6">{property.title}</h1>

          {/* Price */}
          <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-xl p-4 mb-6">
            <div className="text-xs text-gray-500 mb-1">Monthly Rent</div>
            <div className="text-3xl font-bold text-indigo-400">
              ${property.price.toLocaleString()}
              <span className="text-base text-gray-500 font-normal">/mo</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Stat label="Bedrooms" value={`${property.beds} beds`} />
            <Stat label="Area" value={`${property.sqft.toLocaleString()} sqft`} />
            <Stat label="Type" value="Apartment" />
            <Stat label="Available" value="Now" />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-white mb-2">About this property</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{property.description}</p>
          </div>

          {/* 3D controls hint */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-gray-500 mb-6">
            <div className="text-gray-300 font-medium mb-2">3D Viewer Controls</div>
            <ul className="space-y-1">
              <li>🖱 <span>Drag to rotate</span></li>
              <li>🖱 <span>Scroll to zoom</span></li>
              <li>🖱 <span>Right-drag to pan</span></li>
            </ul>
          </div>

          {/* CTA */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors text-sm">
            Schedule a Viewing
          </button>
        </aside>

        {/* Right: 3D Viewer */}
        <main className="flex-1 relative min-h-[400px] lg:min-h-0">
          <RoomViewer />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400">
            3D Room Preview — drag to explore
          </div>
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/8 rounded-lg p-3">
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="text-sm font-medium text-white">{value}</div>
    </div>
  );
}
