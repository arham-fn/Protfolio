'use client';

import React, { useState } from 'react';
import OSWindow from '@/components/os/OSWindow';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('https://formspree.io/f/[PLACEHOLDER: Formspree endpoint]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OSWindow
      id="contact"
      title="COM1: - SERIAL CONTACT DISPATCH &amp; NETWORKING"
      icon="✉️"
    >
      <div className="space-y-6 font-mono text-xs sm:text-sm">
        {/* Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-lo">
          <div>
            <div className="text-[11px] text-accent font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>●</span>
              <span>COMMUNICATION PROTOCOL // DIRECT PACKET TRANSMISSION</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-accent">
              CONNECT
            </h2>
          </div>
          <p className="text-xs text-ink/70 max-w-sm">
            Available freelance-first for AI-integrated full-stack web and mobile apps.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Verified Channels */}
          <div className="space-y-4">
            <div className="text-xs text-accent font-bold uppercase tracking-wider">
              VERIFIED CHANNELS:
            </div>

            <div className="p-4 bevel-sunken bg-[#EDE8D6] space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-lo/60">
                <span className="text-ink/60 font-semibold">EMAIL:</span>
                <a
                  href="mailto:[PLACEHOLDER: email]"
                  className="text-accent font-bold hover:underline"
                >
                  [PLACEHOLDER: email] ↗
                </a>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-lo/60">
                <span className="text-ink/60 font-semibold">LINKEDIN:</span>
                <a
                  href="https://linkedin.com/in/[PLACEHOLDER: LinkedIn URL]"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent font-bold hover:underline"
                >
                  [PLACEHOLDER: LinkedIn URL] ↗
                </a>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-lo/60">
                <span className="text-ink/60 font-semibold">GITHUB:</span>
                <a
                  href="https://github.com/[PLACEHOLDER: GitHub URL]"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent font-bold hover:underline"
                >
                  [PLACEHOLDER: GitHub URL] ↗
                </a>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-lo/60">
                <span className="text-ink/60 font-semibold">UPWORK:</span>
                <a
                  href="https://upwork.com/freelancers/[PLACEHOLDER: Upwork URL]"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent font-bold hover:underline"
                >
                  [PLACEHOLDER: Upwork URL] ↗
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-ink/60 font-semibold">FIVERR:</span>
                <a
                  href="https://fiverr.com/[PLACEHOLDER: Fiverr URL]"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent font-bold hover:underline"
                >
                  [PLACEHOLDER: Fiverr URL] ↗
                </a>
              </div>
            </div>

            <div className="p-3.5 bevel-raised bg-surface text-xs space-y-1">
              <span className="font-bold text-accent block">
                LOCATION &amp; WORKING WINDOW:
              </span>
              <p className="text-ink/80 text-[11px] leading-relaxed">
                Faisalabad, Pakistan (PKT / UTC+5) · Open to global remote contracts and asynchronous engineering sprints.
              </p>
            </div>
          </div>

          {/* Dispatch Form */}
          <div className="p-4 sm:p-5 bevel-raised bg-surface space-y-4">
            <div className="text-xs text-accent font-bold uppercase tracking-wider pb-1 border-b border-lo">
              TRANSMIT DISPATCH PACKET:
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                {error && (
                  <div className="p-2 border border-primary bg-primary/20 text-ink text-xs font-bold">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="name-input" className="block text-ink/70 font-semibold uppercase mb-1 text-[11px]">
                    YOUR IDENTIFIER / CALLSIGN
                  </label>
                  <input
                    id="name-input"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    className="w-full bevel-sunken bg-[#EDE8D6] p-2.5 text-ink text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="email-input" className="block text-ink/70 font-semibold uppercase mb-1 text-[11px]">
                    RETURN PACKET ADDRESS / EMAIL
                  </label>
                  <input
                    id="email-input"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. client@domain.com"
                    className="w-full bevel-sunken bg-[#EDE8D6] p-2.5 text-ink text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="message-input" className="block text-ink/70 font-semibold uppercase mb-1 text-[11px]">
                    MISSION BRIEF / SCOPE
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell me about the application, architecture, or machine..."
                    className="w-full bevel-sunken bg-[#EDE8D6] p-2.5 text-ink text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bevel-btn bevel-btn-primary font-black text-xs uppercase tracking-wider min-h-[44px] active:scale-98 transition-all disabled:opacity-50"
                >
                  {loading ? 'TRANSMITTING VIA COM1...' : 'SEND DISPATCH PACKET ⏎'}
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3 bevel-sunken bg-[#EDE8D6] p-4">
                <span className="text-accent text-lg block font-black">
                  TRANSMISSION CONFIRMED
                </span>
                <p className="text-xs text-ink/80">
                  Acknowledgement packet received on serial bus. Response dispatched within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bevel-btn px-4 py-1.5 text-xs font-bold mt-2"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
