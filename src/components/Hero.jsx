import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

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

export default function Hero({ onBookCall }) {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToWork = () => {
    document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden mt-[64px]">
      {/* ── Background carousel ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#072541]/85 via-[#072541]/60 to-[#072541]/30" />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full pt-20 pb-20">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-display text-sm font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#e95f0c] animate-pulse-subtle" />
            Unevox Services OPC Pvt. Ltd.
          </div>

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

          {/* Quick stats row */}
          <div className="flex items-center gap-8 pt-4">
            {[
              { value: '2M+', label: 'Total Views' },
              { value: '10L+', label: 'Interactions' },
              { value: '800+', label: 'Media Pieces' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/60 font-semibold uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel dot indicators */}
      <div className="absolute bottom-10 right-8 z-10 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${idx === current
              ? 'w-6 h-2 bg-[#e95f0c]'
              : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
