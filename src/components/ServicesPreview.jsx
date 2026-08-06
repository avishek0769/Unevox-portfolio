import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Share2, Trophy, Megaphone, Briefcase, Sparkles, 
  Calendar, Camera, Play, Video, Palette, Target, ArrowRight 
} from 'lucide-react';

export default function ServicesPreview() {
  const services = [
    {
      title: 'Social Media Management',
      icon: Share2,
      description: 'End-to-end management, content calendars, and community engagement.',
      tag: 'Scale Growth'
    },
    {
      title: 'Sports Media Production',
      icon: Trophy,
      description: 'High-octane coverage of matches, athletic promo videos, and league hype.',
      tag: 'Athletic Vibe'
    },
    {
      title: 'Digital Marketing',
      icon: Megaphone,
      description: 'Performance marketing, PPC, SEO, and paid ad campaign structures.',
      tag: 'Data Driven'
    },
    {
      title: 'Business Development',
      icon: Briefcase,
      description: 'Strategic partnerships, sponsorships, and commercial expansion guides.',
      tag: 'Monetization'
    },
    {
      title: 'Festival Promotions',
      icon: Sparkles,
      description: 'Special campaigns for cultural events, durga puja, and classical festivals.',
      tag: 'Cultural Reach'
    },
    {
      title: 'Event Promotions',
      icon: Calendar,
      description: 'Pre and post event coverage, ticketing campaigns, and stadium hype.',
      tag: 'Live Hype'
    },
    {
      title: 'Photography',
      icon: Camera,
      description: 'Professional sports action shots, corporate headshots, and event photography.',
      tag: 'High Res'
    },
    {
      title: 'Reel Production',
      icon: Play,
      description: 'Short-form portrait videos tailored for maximum Instagram Reels algorithmic reach.',
      tag: 'Going Viral'
    },
    {
      title: 'Video Production',
      icon: Video,
      description: 'Cinematic showreels, corporate videos, commercials, and high-end interviews.',
      tag: 'Production'
    },
    {
      title: 'Creative Graphics',
      icon: Palette,
      description: 'Social posters, stadium ticket designs, merchandise branding, and logo assets.',
      tag: 'Visual Identity'
    },
    {
      title: 'Brand Promotion',
      icon: Target,
      description: 'Outdoors, brand activations, influencer tie-ups, and PR campaigns.',
      tag: 'Brand Value'
    }
  ];

  return (
    <section className="py-24 bg-obsidian relative">
      {/* Background glow */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-volt/20 bg-volt/5 text-volt font-display text-[10px] font-bold uppercase tracking-wider mb-3">
              Capabilities
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Creative Solutions
            </h2>
            <p className="text-text-secondary mt-3 max-w-xl">
              We merge strategic planning with bleeding-edge visual execution to solve complex marketing challenges.
            </p>
          </div>
          <div>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 font-display font-bold text-sm text-volt hover:text-volt-hover group transition-colors duration-200"
            >
              View Detailed Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="glassmorphism-card rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full group"
              >
                <div className="space-y-6">
                  {/* Top line with Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-dark border border-slate-border/80 flex items-center justify-center text-volt group-hover:bg-volt group-hover:text-obsidian group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-text-muted bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      {service.tag}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-volt transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-border/40 flex items-center gap-2 text-xs text-text-muted group-hover:text-volt transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
