"use client";

export type RoomKey = "bedroom" | "living" | "kitchen" | "bathroom" | "exterior";

const ROOM_LABELS: Record<RoomKey, string> = {
  bedroom: "Bedroom",
  living: "Living Room",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  exterior: "Exterior",
};

export default function RoomViewer({ room = "living" }: { room?: RoomKey }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black" data-room={room}>
      <div className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-sm font-semibold text-white shadow-lg">
        Sample 3D Tour · {ROOM_LABELS[room]}
      </div>
      <iframe
        title={`Sample 3D Tour - ${ROOM_LABELS[room]}`}
        src="https://my.matterport.com/show/?m=SxQL3iGyoDo"
        className="h-full w-full border-0"
        allow="fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
    </div>
  );
}
