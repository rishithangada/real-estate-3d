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
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 text-sm"
      >
        <span>⚡</span>
        <span>{triggerLabel}</span>
        {/* filmstrip icon */}
        <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 2v4M10 2v4M14 2v4M18 2v4M6 18v4M10 18v4M14 18v4M18 18v4" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">AI Video Generation</h2>
                <p className="text-xs text-gray-500">Turn your listing into a cinematic walkthrough</p>
              </div>
              <button
                onClick={close}
                className="text-gray-500 hover:text-white transition-colors text-2xl leading-none ml-4"
              >
                ×
              </button>
            </div>

            {done ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎬</div>
                <p className="text-white font-semibold mb-2 text-lg">You&apos;re on the waitlist!</p>
                <p className="text-gray-400 text-sm">We&apos;ll email you when your video is ready.</p>
                <button
                  onClick={close}
                  className="mt-6 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-300 text-sm mb-2 font-medium">
                  Turn this property into a cinematic listing video
                </p>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Using Higgsfield AI, we&apos;ll generate a professional walkthrough video from the 3D model.
                  Estimated generation time: 2–3 minutes.
                </p>
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Email address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notify}
                      onChange={(e) => setNotify(e.target.checked)}
                      className="rounded border-white/20 bg-white/5 accent-indigo-500 w-4 h-4"
                    />
                    <span className="text-sm text-gray-400">Notify me when ready</span>
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl transition-all text-sm mt-2"
                  >
                    Join Waitlist
                  </button>
                </form>
                <p className="text-xs text-gray-600 mt-4 text-center">Powered by Higgsfield AI — coming soon</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
