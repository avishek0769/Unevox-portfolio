import React, { useState } from 'react';
import { ArrowUpRight, Grid3x3, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'cultural', name: 'Cultural Events' },
  { id: 'theatre', name: 'Theatre' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'education', name: 'Education' },
];

const projects = [
  {
    id: 'behala-classical',
    title: 'Behala Classical Festival',
    client: 'Classical Music Association',
    category: 'cultural',
    label: 'Cultural Events',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    desc: 'Live event coverage, artist reels, and social media campaign.',
    accentColor: '#0284c7',
  },
  {
    id: 'godhuli',
    title: 'Godhuli Gagone',
    client: 'Bratya Theatre Group',
    category: 'theatre',
    label: 'Theatre & Stage',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    desc: 'Cinematic trailer, actor promo cards, and offline marketing graphics.',
    accentColor: '#7c3aed',
  },
  {
    id: 'cafe-krysalis',
    title: 'Café Krysalis',
    client: 'Krysalis Hospitality',
    category: 'hospitality',
    label: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    desc: 'Food photography, organic reels, and social channel management.',
    accentColor: '#d97706',
  },
  {
    id: 'ripley',
    title: 'Ripley Group Corporate Film',
    client: 'Ripley Logistics',
    category: 'corporate',
    label: 'Corporate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    desc: 'Corporate documentary on container transport and cargo supply.',
    accentColor: '#059669',
  },
  {
    id: 'upgrad',
    title: 'upGrad Kolkata Centre Launch',
    client: 'upGrad Kolkata',
    category: 'education',
    label: 'Education',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    desc: 'Launch photography, student campaigns, and visual graphics.',
    accentColor: '#e95f0c',
  },
  {
    id: 'caesar',
    title: 'Caesar Stage Production',
    client: 'Shakespeare Guild Kolkata',
    category: 'theatre',
    label: 'Theatre & Stage',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
    desc: 'Teaser campaigns, digital media partnership, and stage visuals.',
    accentColor: '#7c3aed',
  },
  {
    id: 'maharaja',
    title: 'Maharaja Caterer Rebranding',
    client: 'Maharaja Group',
    category: 'hospitality',
    label: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    desc: 'Logo redesign, packaging, and digital menu assets.',
    accentColor: '#d97706',
  },
  {
    id: 'rainbow',
    title: 'Rainbow House Banquet',
    client: 'Rainbow Banquets Ltd.',
    category: 'hospitality',
    label: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    desc: 'Wedding season reels and localized Facebook ad campaigns.',
    accentColor: '#dc2626',
  },
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-[#072541] cursor-pointer shadow-sm transition-all duration-500 hover:shadow-2xl aspect-[4/3]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          hovered ? 'scale-110' : 'scale-100'
        }`}
        style={{ filter: hovered ? 'brightness(0.7)' : 'brightness(0.55)' }}
        loading="lazy"
      />

      {/* Permanent bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#072541] via-[#072541]/30 to-transparent z-10" />

      {/* Accent hover overlay */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 transition-all duration-500 ease-out"
        style={{
          height: '100%',
          background: `linear-gradient(to top, ${project.accentColor}cc 0%, ${project.accentColor}66 30%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0%)' : 'translateY(10%)',
        }}
      />

      {/* Glowing left bar */}
      <div
        className="absolute left-0 top-0 w-[3px] z-30 transition-all duration-500 ease-out"
        style={{
          height: hovered ? '100%' : '0%',
          background: project.accentColor,
          boxShadow: hovered ? `0 0 12px ${project.accentColor}` : 'none',
        }}
      />

      {/* Label chip - top */}
      <div
        className="absolute top-3 left-4 z-30 px-2.5 py-0.5 rounded-md text-xs font-display font-bold text-white backdrop-blur-sm"
        style={{ background: `${project.accentColor}cc` }}
      >
        {project.label}
      </div>

      {/* Content footer */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
        <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-0.5">{project.client}</p>
        <div className="flex items-end justify-between gap-2">
          <h3 className="font-display text-base font-black text-white leading-tight flex-1">
            {project.title}
          </h3>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: hovered ? 'white' : 'rgba(255,255,255,0.12)',
              color: hovered ? project.accentColor : 'white',
              border: `1px solid ${hovered ? 'white' : 'rgba(255,255,255,0.2)'}`,
            }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Desc on hover */}
        <div
          className="overflow-hidden transition-all duration-400 ease-out"
          style={{ maxHeight: hovered ? '60px' : '0px', opacity: hovered ? 1 : 0 }}
        >
          <p className="text-white/75 text-xs leading-relaxed mt-2 line-clamp-2">
            {project.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPreview() {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <section className="py-24 bg-[#f8f5f2] border-t border-[#e2dbd3]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="section-badge mb-4 inline-flex">Beyond the Arena</span>
            <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-[#072541] leading-none">
              Our Other <span className="text-[#e95f0c]">Work</span>
            </h2>
            <p className="text-[#4a5568] text-base mt-4 max-w-lg leading-relaxed">
              Premium campaigns for corporate houses, cultural events, theatre, and hospitality.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm bg-[#072541] text-white hover:bg-[#e95f0c] transition-all duration-300 shadow-lg shadow-[#072541]/20 shrink-0"
          >
            See All Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10" style={{ scrollbarWidth: 'none' }}>
          <Filter className="w-4 h-4 text-[#9ca3af] shrink-0 mr-1" />
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-full font-display text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-250 shrink-0"
              style={{
                background: activeTab === tab.id ? '#072541' : '#f1ede8',
                color: activeTab === tab.id ? 'white' : '#4a5568',
                boxShadow: activeTab === tab.id ? '0 4px 14px rgba(7,37,65,0.25)' : 'none',
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Grid3x3 className="w-10 h-10 text-[#e2dbd3] mx-auto mb-3" />
            <p className="text-[#9ca3af] font-display font-bold">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
