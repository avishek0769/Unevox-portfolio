import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

/* ── Image carousel (commented out, kept for reference) ─────────────────────
const slides = [
  {
    url: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Football stadium aerial',
  },
  {
    url: 'https://images.unsplash.com/photo-1766525133589-e3b4b090c04b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Cricket stadium lights',
  },
  {
    url: 'https://images.unsplash.com/photo-1777529565155-049acfe14129?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Stadium overhead view',
  },
  {
    url: 'https://images.unsplash.com/photo-1766525133589-e3b4b090c04b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Neon sports turf',
  },
];
─────────────────────────────────────────────────────────────────────────── */

export default function Hero({ onBookCall }) {
  /* ── Carousel state (commented out along with slides) ───────────────────────
  const [current, setCurrent] = useState(0);

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  ─────────────────────────────────────────────────────────────────────────── */

  const handleScrollToWork = () => {
    document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* ── Background video ────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          src="/media/sports/fc_banaras-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Light blue-tinted vignette overlay (same as DurgaPuja hero) ──── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0000009d] via-[#0000006a] to-[#0000009d]" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full pt-20 pb-20">
        <div className="max-w-3xl space-y-8">
          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            Where brands{' '}
            <span className="text-[#e95f0c]">breathe</span>, and every pixel{' '}
            <span className="underline decoration-[#e95f0c] decoration-4 underline-offset-4">
              pulses
            </span>{' '}
            with purpose.
          </h1>

          {/* Sub-copy */}
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl">
            A premier sports-inspired creative agency — capturing high-octane moments,
            engineering digital strategies, and building campaigns that drive massive
            audience engagement.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onBookCall}
              className="btn-primary px-8 py-4 text-base flex items-center gap-2 shadow-lg shadow-[#e95f0c]/30 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Book Free Call
            </button>
            <button
              onClick={handleScrollToWork}
              className="px-8 py-4 rounded-full font-display font-bold text-base text-white border-2 border-white/60 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              View Our Work
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Carousel dot indicators (commented out) ─────────────────────────
      <div className="absolute bottom-10 right-8 z-10 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              idx === current
                ? 'w-6 h-2 bg-[#e95f0c]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      ─────────────────────────────────────────────────────────────────────── */}

    </section>
  );
}
