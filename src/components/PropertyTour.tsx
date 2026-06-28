"use client";

import { useState } from "react";
import RoomViewer, { type RoomKey } from "@/components/RoomViewer";
import VideoModal from "@/components/VideoModal";
import InquiryModal from "@/components/InquiryModal";
import { formatBaths, formatPrice, type Listing } from "@/lib/listings";

const ROOM_TABS: { key: RoomKey; label: string }[] = [
  { key: "bedroom", label: "Bedroom" },
  { key: "living", label: "Living Room" },
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "exterior", label: "Exterior" },
];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
      <div className="mb-0.5 text-xs text-stone-500">{label}</div>
      <div className="text-sm font-medium text-white">{value}</div>
    </div>
  );
}

export default function PropertyTour({ property }: { property: Listing }) {
  const [room, setRoom] = useState<RoomKey>("living");
  const activeRoom = ROOM_TABS.find((tab) => tab.key === room) ?? ROOM_TABS[1];

  return (
    <div className="grid flex-1 min-h-0 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_390px]">
      <main className="flex min-h-[560px] min-w-0 flex-col border-r border-white/10">
        <div className="flex shrink-0 flex-col gap-4 border-b border-white/10 bg-[#0d0c0a]/95 px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-amber-100/70">Interactive room selector</div>
              <h2 className="mt-1 text-lg font-semibold text-white">{activeRoom.label} preview</h2>
            </div>
            <div className="text-xs text-stone-500">Drag to rotate · scroll to zoom</div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {ROOM_TABS.map((tab) => {
              const selected = tab.key === room;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setRoom(tab.key)}
                  className={[
                    "shrink-0 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors",
                    selected
                      ? "border-amber-100/60 bg-amber-100 text-black"
                      : "border-white/10 bg-white/[0.04] text-stone-400 hover:border-amber-100/50 hover:text-white",
                  ].join(" ")}
                  aria-pressed={selected}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <section className="relative min-h-[460px] flex-1">
          <RoomViewer room={room} />
          <div className="pointer-events-none absolute left-4 top-4 rounded-md border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-stone-300 backdrop-blur-sm">
            {activeRoom.label} · 3D preview
          </div>
        </section>
      </main>

      <aside className="min-w-0 border-t border-white/10 bg-[#0a0907] p-5 xl:border-l xl:border-t-0 xl:p-6">
        <div className="sticky top-6 grid gap-5">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
            <div
              className="h-44 bg-cover bg-center p-4"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.22), rgba(0,0,0,.72)), url(${property.image})` }}
            >
              <div className="inline-flex rounded-full border border-amber-100/30 bg-black/45 px-2.5 py-1 text-xs font-medium text-amber-100 backdrop-blur">
                Neighborhood score {property.neighborhoodScore}/10
              </div>
            </div>
            <div className="grid gap-5 p-5">
              <div>
                <div className="mb-1 text-xs uppercase tracking-[0.22em] text-amber-100/70">{property.location}</div>
                <h1 className="text-2xl font-bold leading-tight text-white">{property.title}</h1>
                <p className="mt-2 text-sm text-stone-500">{property.address}</p>
              </div>

              <div className="rounded-lg border border-amber-100/20 bg-amber-100/[0.07] p-4">
                <div className="mb-1 text-xs text-stone-500">Asking Price</div>
                <div className="text-3xl font-bold text-amber-100">
                  {formatPrice(property.price)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Stat label="Bedrooms" value={`${property.beds} beds`} />
                <Stat label="Bathrooms" value={`${formatBaths(property.baths)} baths`} />
                <Stat label="Area" value={`${property.sqft.toLocaleString()} sqft`} />
                <Stat label="Type" value={property.propertyType} />
              </div>

              <div>
                <h2 className="mb-2 text-sm font-semibold text-white">About this property</h2>
                <p className="text-sm leading-relaxed text-stone-400">{property.description}</p>
              </div>

              <div>
                <h2 className="mb-2 text-sm font-semibold text-white">Highlights</h2>
                <div className="flex flex-wrap gap-2">
                  {property.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-stone-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <VideoModal propertyTitle={property.title} triggerLabel="Watch AI Walkthrough →" />

              <InquiryModal property={property} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
