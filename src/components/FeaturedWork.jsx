import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedWork() {
  const featuredProjects = [
    {
      id: 'durand-cup',
      clientName: 'Durand Cup',
      category: 'Sports Media & Coverage',
      description: 'Official visual coverage, promotional reels, and live social media management for Asia\'s oldest football tournament.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80' // Soccer stadium/action
    },
    {
      id: 'kolkata-knight-riders',
      clientName: 'Kolkata Knight Riders',
      category: 'Brand Activation & Media',
      description: 'Creating high-impact fan engagement reels and coverage during the IPL season in Kolkata.',
      image: 'https://images.unsplash.com/photo-1531415080290-bc9b8a3423b0?auto=format&fit=crop&w=800&q=80' // Cricket stadium lights
    },
    {
      id: 'cfl-2025',
      clientName: 'Calcutta Football League 2025',
      category: 'Digital Promotion & Coverage',
      description: 'Comprehensive digital storytelling and match-day graphics for the historical football league.',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80' // High-energy turf glow
    },
    {
      id: 'cfl-2024',
      clientName: 'Calcutta Football League 2024',
      category: 'Video Production',
      description: 'Produced 100+ match-day reels, behind-the-scenes content, and client brand promotions.',
      image: 'https://images.unsplash.com/photo-1540747737956-378724044602?auto=format&fit=crop&w=800&q=80' // Stadium overhead
    },
    {
      id: 'behala-cup',
      clientName: 'Behala Cup',
      category: 'Official Media Partnership',
      description: 'Complete branding overhaul, live streams, video content, and tournament highlights coverage.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80' // Sports arena / event excitement
    },
    {
      id: 'behala-ss-sporting-club',
      clientName: 'Behala SS Sporting Club',
      category: 'Social Media Management',
      description: 'Designing strategic graphics, publishing schedules, and promotional content for the athletic club.',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6edd1dec1d?auto=format&fit=crop&w=800&q=80' // Football pitch detail
    }
  ];

  return (
    <section id="featured-work" className="py-24 bg-obsidian relative">
      {/* Subtle Grid overlay background */}
      <div className="absolute inset-0 sports-grid-pattern opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-volt/20 bg-volt/5 text-volt font-display text-[10px] font-bold uppercase tracking-wider mb-3">
              Showcase
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Featured Work
            </h2>
            <p className="text-text-secondary mt-3 max-w-xl">
              Take a look at how we capture action, shape narratives, and drive record-breaking fan interactions.
            </p>
          </div>
          <div>
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 font-display font-bold text-sm text-volt hover:text-volt-hover group transition-colors duration-200"
            >
              Explore Full Portfolio
              <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <div 
              key={project.id}
              className="group rounded-3xl overflow-hidden bg-slate-card border border-slate-border/50 hover:border-volt/30 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-dark">
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-card via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={project.image} 
                  alt={project.clientName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Index tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg glassmorphism text-[10px] font-display font-bold text-volt">
                  0{idx + 1}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-volt mb-2">
                  {project.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-volt transition-colors">
                  {project.clientName}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                
                <div className="pt-4 border-t border-slate-border/50 flex items-center justify-between">
                  <span className="text-xs text-text-muted font-medium">Read case study</span>
                  <div className="w-8 h-8 rounded-full bg-slate-dark border border-slate-border group-hover:bg-volt group-hover:border-volt group-hover:text-obsidian flex items-center justify-center text-volt transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
