import Link from 'next/link';

/**
 * 404 — GAME OVER screen.
 * Keeps the ARHAM-OS aesthetic even on missing routes.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-jet flex flex-col items-center justify-center font-mono px-6 text-center">
      <p className="text-pink/60 text-xs tracking-[0.3em] uppercase mb-4">
        ERROR 0x404
      </p>

      <h1 className="font-display text-5xl md:text-7xl text-pink mb-2">
        GAME OVER
      </h1>

      <p className="text-low text-sm mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist in this save file.
        It may have been moved, deleted, or never loaded.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 border border-chartreuse/40 text-chartreuse text-sm
                   hover:bg-chartreuse/10 hover:border-chartreuse transition-colors duration-300
                   focus-visible:outline-2 focus-visible:outline-chartreuse"
      >
        <span aria-hidden="true">►</span>
        CONTINUE? RESTART
      </Link>
    </div>
  );
}
