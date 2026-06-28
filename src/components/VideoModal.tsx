"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function VideoModal({
  propertyTitle,
  triggerLabel = "Generate AI Listing Video",
}: {
  propertyTitle: string;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [notify, setNotify] = useState(true);
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    // ponytail: localStorage waitlist — swap for real API when Higgsfield integration lands
    localStorage.setItem(
      `higgsfield_waitlist_${propertyTitle}`,
      JSON.stringify({ email, notify, ts: Date.now() })
    );
    setDone(true);
  }

  function close() {
    setOpen(false);
    setDone(false);
    setEmail("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-100 py-3.5 text-sm font-semibold text-black shadow-lg shadow-black/30 transition-colors duration-200 hover:bg-white"
      >
        <span>{triggerLabel}</span>
        <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 2v4M10 2v4M14 2v4M18 2v4M6 18v4M10 18v4M14 18v4M18 18v4" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#0d0c0a] p-8 shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">AI Video Generation</h2>
                <p className="text-xs text-stone-500">Turn your listing into a cinematic walkthrough</p>
              </div>
              <button
                onClick={close}
                className="ml-4 text-2xl leading-none text-stone-500 transition-colors hover:text-white"
              >
                ×
              </button>
            </div>

            {done ? (
              <div className="text-center py-8">
                <p className="text-white font-semibold mb-2 text-lg">You&apos;re on the waitlist!</p>
                <p className="text-stone-400 text-sm">We&apos;ll email you when your video is ready.</p>
                <button
                  onClick={close}
                  className="mt-6 text-sm text-amber-100 transition-colors hover:text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-stone-300 text-sm mb-2 font-medium">
                  Turn this property into a cinematic listing video
                </p>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                  Using Higgsfield AI, we&apos;ll generate a professional walkthrough video from the 3D model.
                  Estimated generation time: 2-3 minutes.
                </p>
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="text-xs text-stone-400 mb-1.5 block font-medium">Email address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition placeholder:text-stone-600 focus:border-amber-100/60 focus:outline-none focus:ring-1 focus:ring-amber-100/40"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notify}
                      onChange={(e) => setNotify(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-white/5 accent-amber-100"
                    />
                    <span className="text-sm text-stone-400">Notify me when ready</span>
                  </label>
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-lg bg-amber-100 py-3 text-sm font-medium text-black transition-colors hover:bg-white"
                  >
                    Join Waitlist
                  </button>
                </form>
                <p className="mt-4 text-center text-xs text-stone-600">Powered by Higgsfield AI, coming soon</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
