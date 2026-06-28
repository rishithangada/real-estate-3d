"use client";

import { useState, type FormEvent } from "react";
import type { Listing } from "@/lib/listings";

type Inquiry = {
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
};

export default function InquiryModal({ property }: { property: Listing }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    const payload: Inquiry = {
      propertyId: property.id,
      propertyTitle: property.title,
      ...form,
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Inquiry failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white transition-colors hover:border-amber-100/40 hover:bg-white/[0.08]"
      >
        Schedule a Tour
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-lg border border-white/10 bg-[#0d0c0a] p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Schedule a Tour</h2>
                <p className="mt-1 text-sm text-stone-500">{property.title}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-2xl leading-none text-stone-500 hover:text-white">
                x
              </button>
            </div>

            {status === "sent" ? (
              <div className="rounded-lg border border-emerald-200/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
                Inquiry received. We will follow up with available tour times.
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-3">
                <input required placeholder="Name" value={form.name} onChange={(e) => update("name", e.target.value)} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white" />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white" />
                <input required placeholder="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white" />
                <input required type="date" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white [color-scheme:dark]" />
                <textarea placeholder="Message" value={form.message} onChange={(e) => update("message", e.target.value)} className="min-h-24 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white" />
                <button disabled={status === "submitting"} className="rounded-lg bg-amber-100 px-4 py-2 font-semibold text-black disabled:opacity-60">
                  {status === "submitting" ? "Sending..." : "Submit inquiry"}
                </button>
                {status === "error" && <p className="text-sm text-red-200">Could not send inquiry. Try again.</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
