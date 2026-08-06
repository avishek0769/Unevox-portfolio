import React from 'react';
import { Calendar } from 'lucide-react';

export default function ContactCTA({ onBookCall }) {
  return (
    <section className="py-24 bg-[#072541] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
        <span className="section-badge mb-6 inline-flex border-[#e95f0c]/50 bg-[#e95f0c]/10 text-[#e95f0c]">
          Let's Collaborate
        </span>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
          Book Your Free Consultation
        </h2>

        <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Ready to scale your brand's presence? Book a free 30-minute call to map out your digital reach, content strategy, and media production schedules.
        </p>

        <button
          onClick={onBookCall}
          className="btn-primary px-10 py-4 text-lg flex items-center gap-3 mx-auto shadow-xl shadow-[#e95f0c]/30 cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          Book Free Call
        </button>

        {/* Perks row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
          {['30-Minute Video Session', 'No Obligations', 'Custom Growth Roadmap Included'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e95f0c]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
