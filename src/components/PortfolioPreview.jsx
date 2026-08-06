import React, { useState } from 'react';
import { ArrowUpRight, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PortfolioPreview() {
  const categories = [
    { id: 'all', name: 'All Industries' },
    { id: 'cultural', name: 'Cultural Events' },
    { id: 'theatre', name: 'Theatre' },
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'education', name: 'Education' }
  ];

  const projects = [
    {
      id: 'behala-classical',
      title: 'Behala Classical Festival',
      client: 'Classical Music Association',
      category: 'cultural',
      categoryLabel: 'Cultural Events',
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80', // Music concert
      desc: 'Complete live event coverage, artist reels, and social media branding campaign.'
    },
    {
      id: 'godhuli-gagone',
      title: 'Godhuli Gagone Play Promo',
      client: 'Bratya Theatre Group',
      category: 'theatre',
      categoryLabel: 'Theatre & Stage',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80', // Theatre lights/acting
      desc: 'Cinematic trailer video, actor promo cards, and offline ticket marketing graphics.'
    },
    {
      id: 'cafe-krysalis',
      title: 'Café Krysalis Social Launch',
      client: 'Krysalis Hospitality',
      category: 'hospitality',
      categoryLabel: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', // Cafe interior
      desc: 'High-aesthetic food photography, organic reels, and social channel management.'
    },
    {
      id: 'ripley-group',
      title: 'Ripley Group Corporate Video',
      client: 'Ripley Logistics',
      category: 'corporate',
      categoryLabel: 'Corporate',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', // Modern architecture
      desc: 'High-end corporate documentary highlighting container transport and cargo supply lines.'
    },
    {
      id: 'upgrad-learning',
      title: 'Kolkata Learning Centre Opening',
      client: 'upGrad Kolkata',
      category: 'education',
      categoryLabel: 'Education',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', // Students / Education
      desc: 'Pre-launch photography, local student target campaigns, and visual graphics.'
    },
    {
      id: 'caesar-theatre',
      title: 'Caesar Stage Production',
      client: 'Shakespeare Guild Kolkata',
      category: 'theatre',
      categoryLabel: 'Theatre & Stage',
      image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80', // Stage curtain
      desc: 'Official digital media partnership, teaser campaigns, and stage visual design.'
    },
    {
      id: 'maharaja-caterer',
      title: 'Maharaja Caterer Rebranding',
      client: 'Maharaja Group',
      category: 'hospitality',
      categoryLabel: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', // Restaurant food plating
      desc: 'Modern logo redesign, packaging designs, and digital menu assets.'
    },
    {
      id: 'rainbow-house',
      title: 'Rainbow House Banquets Promotion',
      client: 'Rainbow Banquets Ltd.',
      category: 'hospitality',
      categoryLabel: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80', // Wedding banquets
      desc: 'Wedding season visual reels and localized targeted Facebook ads.'
    }
  ];

  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section className="py-24 bg-obsidian relative">
      {/* Background design */}
      <div className="absolute inset-0 sports-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/20 bg-electric-cyan/5 text-electric-cyan font-display text-[10px] font-bold uppercase tracking-wider mb-3">
              Diversified Work
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Beyond the Arena
            </h2>
            <p className="text-text-secondary mt-2">
              We also craft premium campaigns and digital experiences for corporate houses, cultural events, theatre, and hospitality.
            </p>
          </div>
          <div>
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 font-display font-bold text-sm text-volt hover:text-volt-hover group transition-colors duration-200"
            >
              See All Projects
              <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-slate-border/50">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-volt text-obsidian shadow-lg shadow-volt/15'
                  : 'bg-slate-card text-text-secondary border border-slate-border/60 hover:text-white hover:border-slate-border'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group bg-slate-card/60 border border-slate-border/40 rounded-2xl overflow-hidden flex flex-col h-full hover:border-volt/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-dark">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-card via-transparent to-transparent opacity-80 z-10" />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-lg glassmorphism text-[9px] font-display font-bold uppercase text-volt">
                  {project.categoryLabel}
                </div>
              </div>

              {/* Description */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] text-text-muted font-bold font-display uppercase tracking-wider">
                    {project.client}
                  </span>
                  <h3 className="font-display text-base font-bold text-white mt-1 group-hover:text-volt transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed mt-2">
                    {project.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-border/30 mt-4 flex items-center justify-between text-[11px] text-text-muted font-medium">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-volt" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
