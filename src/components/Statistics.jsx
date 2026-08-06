import React from 'react';
import { Eye, Users, Film, TrendingUp } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Statistics() {
  const metrics = [
    {
      value: '10 Lakh+',
      label: 'Audience Interactions',
      description: 'Total comments, shares, reactions, and direct fan engagement across platforms.',
      icon: Users,
      color: 'from-volt to-lime-400'
    },
    {
      value: '2 Million+',
      label: 'Total Views',
      description: 'Organic impressions and video views generated across our client channels.',
      icon: Eye,
      color: 'from-electric-cyan to-blue-400'
    },
    {
      value: '800+',
      label: 'Content Pieces',
      description: 'Premium reels, graphic matches, hype videos, and matchday posters produced.',
      icon: Film,
      color: 'from-electric-purple to-pink-500'
    },
    {
      value: '2000+',
      label: 'Instagram Followers',
      description: 'Active organic community following our creative journey on Instagram.',
      icon: InstagramIcon,
      color: 'from-pink-500 to-orange-400'
    },
    {
      value: '3000+',
      label: 'Facebook Followers',
      description: 'Engaged local sports and cultural network connected via Facebook.',
      icon: FacebookIcon,
      color: 'from-blue-600 to-blue-400'
    }
  ];

  return (
    <section className="py-24 bg-slate-dark/40 border-y border-slate-border/50 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-volt/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/20 bg-electric-cyan/5 text-electric-cyan font-display text-[10px] font-bold uppercase tracking-wider mb-3">
            Performance Index
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Driven by Real Impact
          </h2>
          <p className="text-text-secondary mt-2">
            Our creative strategies aren't just beautiful—they are backed by real audience growth and high retention.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => {
            const MetricIcon = metric.icon;
            return (
              <div 
                key={index}
                className="glassmorphism-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle back glowing element */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/2 rounded-full blur-xl group-hover:bg-volt/5 transition-all duration-300" />
                
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-slate-card border border-slate-border/60 flex items-center justify-center text-text-secondary group-hover:text-volt transition-colors">
                    <MetricIcon className="w-5 h-5" />
                  </div>
                  
                  {/* Label */}
                  <div>
                    <h4 className="font-display text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                      {metric.label}
                    </h4>
                    <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </div>

                {/* Big Number */}
                <div className="mt-8 pt-4 border-t border-slate-border/40">
                  <span className={`font-display text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small callout footer */}
        <div className="mt-12 p-4 rounded-2xl border border-slate-border/40 bg-slate-dark/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-volt/10 flex items-center justify-center text-volt shrink-0">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
            <p className="text-xs text-text-secondary">
              All stats are tracked quarterly and verified across official YouTube, Instagram, and Facebook dashboards.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">
            Last Updated: Aug 2026
          </span>
        </div>

      </div>
    </section>
  );
}
