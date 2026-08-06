import React from 'react';
import { Award, ShieldAlert, Zap, Globe, Trophy, Play, Star, Sparkles, Smile, Shield } from 'lucide-react';

export default function TrustedBy() {
  const clients = [
    { name: 'Kolkata Knight Riders', icon: Trophy, category: 'Sports' },
    { name: 'Durand Cup', icon: Award, category: 'Sports' },
    { name: 'Calcutta Football League', icon: Shield, category: 'Sports' },
    { name: 'North 24 Parganas Football Team', icon: Award, category: 'Sports' },
    { name: 'Behala SS Sporting Club', icon: Zap, category: 'Sports' },
    { name: 'Behala Cup', icon: Trophy, category: 'Sports' },
    { name: 'Playport Turf', icon: Globe, category: 'Sports' },
    { name: 'Ripley Group', icon: Star, category: 'Corporate' },
    { name: 'Rainbow House Banquet', icon: Smile, category: 'Hospitality' },
    { name: 'Behala Nutan Dal', icon: Sparkles, category: 'Cultural' },
    { name: 'Suruchi Sangha', icon: Sparkles, category: 'Cultural' },
    { name: 'Tarun Matri Sevak Samity', icon: Sparkles, category: 'Cultural' },
    { name: 'Behala Classical Festival', icon: Play, category: 'Festival' },
    { name: 'Behala Bachonik Utsav', icon: Play, category: 'Festival' },
    { name: 'Godhuli Gagone', icon: Star, category: 'Theatre' },
    { name: 'Caesar', icon: Star, category: 'Theatre' },
    { name: 'Harshadhwani Season 10', icon: Sparkles, category: 'Festival' },
    { name: 'Café Krysalis', icon: Smile, category: 'Hospitality' },
    { name: 'Maharaja Caterer', icon: Smile, category: 'Hospitality' },
    { name: 'Creative Video', icon: Play, category: 'Corporate' },
    { name: 'upGrad Kolkata Support Centre', icon: Globe, category: 'Education' }
  ];

  // Split into two groups for double marquee
  const row1 = clients.slice(0, 11);
  const row2 = clients.slice(11);

  return (
    <section className="py-20 bg-obsidian/40 border-y border-slate-border/50 relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-card/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-10 text-center">
        <h3 className="font-display text-xs font-bold uppercase tracking-widest text-volt mb-3">TRUSTED BY ELITE BRANDS & TEAMS</h3>
        <p className="text-sm text-text-secondary max-w-xl mx-auto">
          Collaborating with championships, national clubs, and industry leaders to deliver content that scores.
        </p>
      </div>

      {/* Marquee Row 1 (scrolls left) */}
      <div className="w-full overflow-hidden flex flex-col gap-6 relative">
        {/* Soft edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap pr-6">
            {row1.map((client, idx) => {
              const ClientIcon = client.icon;
              return (
                <div 
                  key={`r1-${idx}`} 
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glassmorphism border border-white/5 hover:border-volt/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-dark flex items-center justify-center text-text-secondary group-hover:text-volt transition-colors">
                    <ClientIcon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-sm tracking-wide text-slate-200 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-text-muted px-2 py-0.5 rounded bg-white/5">
                    {client.category}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Duplicate for infinite loop */}
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap pr-6" aria-hidden="true">
            {row1.map((client, idx) => {
              const ClientIcon = client.icon;
              return (
                <div 
                  key={`r1-dup-${idx}`} 
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glassmorphism border border-white/5 hover:border-volt/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-dark flex items-center justify-center text-text-secondary group-hover:text-volt transition-colors">
                    <ClientIcon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-sm tracking-wide text-slate-200 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-text-muted px-2 py-0.5 rounded bg-white/5">
                    {client.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Marquee Row 2 (scrolls right / reverse direction inline style or custom css) */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap pr-6 [animation-direction:reverse]">
            {row2.map((client, idx) => {
              const ClientIcon = client.icon;
              return (
                <div 
                  key={`r2-${idx}`} 
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glassmorphism border border-white/5 hover:border-volt/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-dark flex items-center justify-center text-text-secondary group-hover:text-volt transition-colors">
                    <ClientIcon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-sm tracking-wide text-slate-200 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-text-muted px-2 py-0.5 rounded bg-white/5">
                    {client.category}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Duplicate for infinite loop */}
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap pr-6 [animation-direction:reverse]" aria-hidden="true">
            {row2.map((client, idx) => {
              const ClientIcon = client.icon;
              return (
                <div 
                  key={`r2-dup-${idx}`} 
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glassmorphism border border-white/5 hover:border-volt/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-dark flex items-center justify-center text-text-secondary group-hover:text-volt transition-colors">
                    <ClientIcon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-sm tracking-wide text-slate-200 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-text-muted px-2 py-0.5 rounded bg-white/5">
                    {client.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
