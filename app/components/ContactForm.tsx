'use client';

import { useState } from "react";


export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-all duration-300 focus:-translate-y-1"
      />
      <textarea
        rows={4}
        placeholder="Tell us about your business..."
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
      />
      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs">Something went wrong — please try again or WhatsApp us.</p>
      )}
    </div>
  );
}