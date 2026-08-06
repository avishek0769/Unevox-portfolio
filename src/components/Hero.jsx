import React from 'react';
import { ArrowUpRight, Calendar, Play } from 'lucide-react';

export default function Hero({ onBookCall }) {
  const handleScrollToWork = () => {
    const featuredWorkSection = document.getElementById('featured-work');
    if (featuredWorkSection) {
      featuredWorkSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden sports-grid-pattern">
      {/* Background Radial Glows */}
      <div className="absolute inset-0 radial-glow-green pointer-events-none" />
      <div className="absolute inset-0 radial-glow-cyan pointer-events-none" />
      
      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />

      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-slate-border/20 pointer-events-none hidden md:block" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-slate-border/20 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-volt/30 bg-volt/10 text-volt font-display text-xs font-bold uppercase tracking-wider animate-pulse-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-volt" />
              Unevox Services OPC Pvt. Ltd.
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Where brands <span className="text-volt glow-text-volt">breathe</span>, and every pixel <span className="bg-gradient-to-r from-volt to-electric-cyan bg-clip-text text-transparent">pulses</span> with purpose.
            </h1>

            {/* Short Introduction */}
            <p className="text-text-secondary text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We are a premier sports-inspired creative agency. From the stadium turf to the digital feed, we capture high-octane moments, engineer digital strategies, and build campaigns that drive massive audience engagement.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onBookCall}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-bold text-obsidian bg-volt hover:bg-volt-hover hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-volt/20"
              >
                <Calendar className="w-5 h-5" />
                Book Free Call
              </button>
              <button
                onClick={handleScrollToWork}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-bold text-white bg-slate-card border border-slate-border hover:border-volt/50 hover:bg-slate-card/80 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                View Featured Work
                <ArrowUpRight className="w-5 h-5 text-volt" />
              </button>
            </div>
            
            {/* Quick Metrics preview */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 border-t border-slate-border/30">
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-white">2M+</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase font-semibold">Total Views</p>
              </div>
              <div className="border-x border-slate-border/50">
                <p className="font-display text-xl sm:text-2xl font-bold text-volt">10L+</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase font-semibold">Interactions</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-white">800+</p>
                <p className="text-[10px] sm:text-xs text-text-secondary uppercase font-semibold">Media Pieces</p>
              </div>
            </div>
          </div>

          {/* Visual Column / Interactive Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] rounded-3xl overflow-hidden glassmorphism border border-slate-border flex items-center justify-center group">
              {/* Inner glowing ring */}
              <div className="absolute inset-4 rounded-[20px] border border-dashed border-slate-border/40 group-hover:border-volt/30 transition-colors duration-500" />
              
              {/* Spinning/pulsing neon circles */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-volt/10 animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-[60%] h-[60%] rounded-full border border-electric-cyan/10 animate-[spin_20s_linear_infinite_reverse]" />
              
              {/* Glass dashboard elements */}
              <div className="absolute top-8 left-8 p-3 rounded-2xl glassmorphism border border-white/5 flex items-center gap-3 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                <div className="w-8 h-8 rounded-lg bg-volt/20 flex items-center justify-center text-volt">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Showreel</p>
                  <p className="text-xs text-white font-bold font-display">Play Sports Reel</p>
                </div>
              </div>

              <div className="absolute bottom-10 right-8 p-3.5 rounded-2xl glassmorphism border border-white/5 flex flex-col gap-1 shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Live Action</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute" />
                  <span className="text-xs text-white font-display font-semibold">Durand Cup 2025</span>
                </div>
              </div>

              {/* Central high-end mock design representing pixels/camera lens */}
              <div className="w-[45%] h-[45%] rounded-full bg-gradient-to-br from-slate-card to-obsidian border border-slate-border shadow-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-volt/20 to-electric-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Simulated Lens Aperture / Pixel Focus */}
                <div className="w-[70%] h-[70%] rounded-full border border-slate-border bg-obsidian flex items-center justify-center">
                  <div className="w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-volt to-electric-cyan shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
