import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export default function ContactCTA({ onBookCall }) {
  return (
    <section className="py-24 bg-slate-dark/30 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 radial-glow-green pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Glowing Banner Box */}
        <div className="relative w-full rounded-3xl overflow-hidden glassmorphism p-8 md:p-16 text-center border border-white/5 shadow-2xl">
          {/* Neon Top Line Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-volt via-electric-cyan to-electric-purple" />
          
          {/* Inner details */}
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-volt/30 bg-volt/15 text-volt font-display text-[10px] font-bold uppercase tracking-wider mb-2 animate-pulse-subtle">
              <Sparkles className="w-3.5 h-3.5" />
              Let's Collaborate
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Book Your Free Consultation
            </h2>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Ready to scale your brand's presence? Book a free 30-minute consultation call to map out your digital reach, content strategy, and media production schedules.
            </p>

            <div className="pt-6">
              <button
                onClick={onBookCall}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl font-display font-bold text-obsidian bg-volt hover:bg-volt-hover hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-xl shadow-volt/20 mx-auto"
              >
                <Calendar className="w-5 h-5" />
                Book Free Call
              </button>
            </div>

            {/* Quick check details */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-volt" />
                30-Minute Video Session
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-volt" />
                No Obligations
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-volt" />
                Custom Growth Roadmap Included
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
