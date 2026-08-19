import React, { useState } from 'react';
import { Calendar, Package } from 'lucide-react';
import CustomizePackageModal from './CustomizePackageModal';

export default function ContactCTA({ onBookCall }) {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  return (
    <>
      <section className="py-24 bg-[#072541] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img
              src="/assets/unevox_logo.png"
              alt="Unevox Logo"
              className="h-12 w-auto object-contain brightness-0 invert"
            />
            <span className="font-display font-black text-2xl tracking-tighter text-white">UNEVOX</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Book Your Free Consultation
          </h2>

          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Ready to scale your brand's presence? Book a free 30-minute call to map out your digital reach, content strategy, and media production schedules.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookCall}
              className="btn-primary px-10 py-4 text-lg flex items-center gap-3 shadow-xl shadow-[#e95f0c]/30 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Book Free Call
            </button>
            <button
              onClick={() => setIsCustomizeOpen(true)}
              className="px-10 py-4 rounded-full border border-white/30 text-white font-display font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <Package className="w-5 h-5" />
              Customize Your Package
            </button>
          </div>

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

      <CustomizePackageModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
    </>
  );
}
