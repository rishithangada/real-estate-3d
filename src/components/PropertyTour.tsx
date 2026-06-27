"use client";

import { useState } from "react";
import RoomViewer, { type RoomKey } from "@/components/RoomViewer";
import VideoModal from "@/components/VideoModal";

type Property = {
  id: string;
  title: string;
  price: number;
  beds: number;
  sqft: number;
  location: string;
  description: string;
};

const ROOM_TABS: { key: RoomKey; label: string }[] = [
  { key: "bedroom", label: "Bedroom" },
  { key: "living", label: "Living Room" },
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "exterior", label: "Exterior" },
];

const PROPERTY_META: Record<string, { address: string; baths: number; score: number; type: string }> = {
  "1": { address: "118 Greene St, New York, NY", baths: 2, score: 9.1, type: "Loft" },
  "2": { address: "22108 Pacific Coast Hwy, Malibu, CA", baths: 4.5, score: 9.6, type: "Villa" },
  "3": { address: "4401 Toro Canyon Rd, Austin, TX", baths: 3, score: 8.8, type: "Single-family" },
};

function formatBaths(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <div className="mb-0.5 text-xs text-gray-500">{label}</div>
      <div className="text-sm font-medium text-white">{value}</div>
    </div>
  );
}

export default function PropertyTour({ property }: { property: Property }) {
  const [room, setRoom] = useState<RoomKey>("living");
  const meta = PROPERTY_META[property.id] ?? PROPERTY_META["1"];
  const activeRoom = ROOM_TABS.find((tab) => tab.key === room) ?? ROOM_TABS[1];

  return (
    <div className="grid flex-1 min-h-0 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px]">
      <main className="flex min-h-[560px] min-w-0 flex-col border-r border-white/10">
        <div className="flex shrink-0 flex-col gap-4 border-b border-white/10 bg-[#0d0d16]/95 px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-indigo-300">Interactive room selector</div>
              <h2 className="mt-1 text-lg font-semibold text-white">{activeRoom.label} preview</h2>
            </div>
            <div className="text-xs text-gray-500">Drag to rotate · scroll to zoom</div>
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
                    "shrink-0 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                    selected
                      ? "border-indigo-400 bg-indigo-500/20 text-indigo-100"
                      : "border-white/10 bg-white/[0.04] text-gray-400 hover:border-indigo-400/50 hover:text-white",
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
          <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-sm">
            {activeRoom.label} · 3D preview
          </div>
        </section>
      </main>

      <aside className="min-w-0 border-t border-white/10 bg-[#0b0b13] p-5 xl:border-l xl:border-t-0 xl:p-6">
        <div className="sticky top-6 grid gap-5">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="h-36 bg-gradient-to-br from-indigo-900/60 via-slate-800 to-violet-950/70 p-4">
              <div className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-200">
                Neighborhood score {meta.score}/10
              </div>
            </div>
            <div className="grid gap-5 p-5">
              <div>
                <div className="mb-1 text-xs uppercase tracking-[0.22em] text-indigo-300">{property.location}</div>
                <h1 className="text-2xl font-bold leading-tight text-white">{property.title}</h1>
                <p className="mt-2 text-sm text-gray-500">{meta.address}</p>
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/40 p-4">
                <div className="mb-1 text-xs text-gray-500">Monthly Rent</div>
                <div className="text-3xl font-bold text-indigo-300">
                  ${property.price.toLocaleString()}
                  <span className="text-base font-normal text-gray-500">/mo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Stat label="Bedrooms" value={`${property.beds} beds`} />
                <Stat label="Bathrooms" value={`${formatBaths(meta.baths)} baths`} />
                <Stat label="Area" value={`${property.sqft.toLocaleString()} sqft`} />
                <Stat label="Type" value={meta.type} />
              </div>

              <div>
                <h2 className="mb-2 text-sm font-semibold text-white">About this property</h2>
                <p className="text-sm leading-relaxed text-gray-400">{property.description}</p>
              </div>

              <VideoModal propertyTitle={property.title} triggerLabel="Watch AI Walkthrough →" />

              <button className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white transition-colors hover:border-indigo-400/40 hover:bg-white/[0.08]">
                Schedule a Viewing
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
