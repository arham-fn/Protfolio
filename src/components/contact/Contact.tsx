'use client';

import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[85vh] py-24 px-6 sm:px-12 lg:px-24 flex flex-col justify-center font-mono border-b border-light/5"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="text-pink text-xs uppercase tracking-widest mb-2 flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 bg-pink inline-block animate-ping" />
            COMMUNICATION PROTOCOL // INSERT COIN
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-light">
            CONNECT
          </h2>
          <p className="text-sm text-light/60 mt-3 max-w-xl">
            Available freelance-first for AI-integrated full-stack web and mobile apps, or hardware diagnostic consulting.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Quick Direct Links */}
          <div className="space-y-4">
            <div className="text-xs text-chartreuse uppercase font-bold tracking-wider mb-2">
              VERIFIED CHANNELS:
            </div>

            <div className="p-4 border border-light/10 bg-jet/60 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-light/50">EMAIL:</span>
                <span className="text-chartreuse font-bold">
                  [PLACEHOLDER: email]
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light/50">LINKEDIN:</span>
                <span className="text-pink font-bold">
                  [PLACEHOLDER: LinkedIn URL]
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light/50">GITHUB:</span>
                <span className="text-light/80 font-bold">
                  [PLACEHOLDER: GitHub URL]
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light/50">UPWORK:</span>
                <span className="text-chartreuse font-bold">
                  [PLACEHOLDER: Upwork URL]
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-light/50">FIVERR:</span>
                <span className="text-pink font-bold">
                  [PLACEHOLDER: Fiverr URL]
                </span>
              </div>
            </div>

            <div className="p-4 border border-chartreuse/30 bg-chartreuse/[0.02] text-xs text-light/70">
              <span className="text-chartreuse font-bold block mb-1">
                LOCATION & TIMEZONE:
              </span>
              Faisalabad, Pakistan (PKT / UTC+5) · Open to global asynchronous and synchronous contracts.
            </div>
          </div>

          {/* Form */}
          <div className="p-6 border border-pink/40 bg-jet">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-light/60 uppercase mb-1">
                    YOUR IDENTIFIER / NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    className="w-full bg-black border border-light/20 p-2.5 text-light focus:border-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-light/60 uppercase mb-1">
                    RETURN FREQUENCY / EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@domain.com"
                    className="w-full bg-black border border-light/20 p-2.5 text-light focus:border-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-light/60 uppercase mb-1">
                    MISSION BRIEF / MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about the app, integration, or machine..."
                    className="w-full bg-black border border-light/20 p-2.5 text-light focus:border-pink focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-pink text-white font-bold text-xs uppercase tracking-widest hover:bg-chartreuse hover:text-jet transition-all shadow-[0_0_16px_rgba(255,31,142,0.4)]"
                >
                  INSERT COIN // TRANSMIT DISPATCH
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-3">
                <span className="text-chartreuse text-xl block">
                  TRANSMISSION DISPATCHED
                </span>
                <p className="text-xs text-light/70">
                  Acknowledgement packet received. Will respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-3 py-1 border border-light/20 text-xs text-light/50 hover:text-light"
                >
                  SEND ANOTHER
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
