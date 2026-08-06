import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Compass, Heart } from 'lucide-react';

export default function AboutPreview() {
  const pillars = [
    {
      number: '01',
      title: 'Strategic Marketing',
      description: 'Aligning campaigns with brand objectives to drive growth and high-conversion fan campaigns.'
    },
    {
      number: '02',
      title: 'Creative Storytelling',
      description: 'Drafting high-octane narratives that resonate emotionally and capture sports moments.'
    },
    {
      number: '03',
      title: 'Premium Production',
      description: 'Using high-end camera equipment, audio rigs, and skilled editors for pixel-perfect content.'
    }
  ];

  return (
    <section className="py-24 bg-slate-dark/30 border-y border-slate-border/50 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-volt/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text details (5 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-volt/20 bg-volt/5 text-volt font-display text-[10px] font-bold uppercase tracking-wider">
              Identity
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Who We Are
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed font-normal">
              At Unevox, every project is more than a service—it is a creative journey. We collaborate closely with clients to craft experiences that connect, convert, and leave a lasting impression through strategic marketing, creative storytelling, and premium visual production.
            </p>
            <p className="text-text-muted text-sm leading-relaxed">
              We specialize in bridging the gap between raw stadium energy and digital audiences. Whether managing official media for championships or filming localized campaign stories, we bring a high-end sports-inspired edge.
            </p>
            
            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm text-obsidian bg-volt hover:bg-volt-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-volt/10"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Cards Pillar Grid (7 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-col gap-6">
              {pillars.map((pillar) => (
                <div 
                  key={pillar.number}
                  className="glassmorphism-card rounded-2xl p-6 md:p-8 flex items-start gap-6 group"
                >
                  <div className="font-display font-black text-2xl md:text-3xl text-volt/30 group-hover:text-volt transition-colors shrink-0 mt-1">
                    {pillar.number}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-volt transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
