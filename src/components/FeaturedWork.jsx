import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 'durand-cup',
    clientName: 'Durand Cup',
    category: 'Sports Media & Coverage',
    year: '2024',
    description:
      'Captured match highlights, behind-the-scenes moments, and social media content throughout Asia\'s oldest football tournament.',
    image: 'https://images.unsplash.com/photo-1766525133589-e3b4b090c04b?q=80&w=1170&auto=format&fit=crop',
    logo: '/client_logos/Durand_Cup.svg.webp',
    accentColor: '#e95f0c',
    stat: '1M+ Views',
    featured: true, // hero card
  },
  {
    id: 'kkr',
    clientName: 'Kolkata Knight Riders',
    category: 'Brand Activation',
    year: '2024',
    description:
      'Produced off-season reels and photography to keep fans engaged beyond the IPL season.',
    image: 'https://images.mid-day.com/images/images/2024/apr/KKR-win_d.jpg',
    logo: '/client_logos/Kolkata_Knight_Riders_Logo.svg',
    accentColor: '#7c3aed',
    stat: '500K+ Reach',
  },
  {
    id: 'cfl-2025',
    clientName: 'CFL 2025',
    category: 'Digital Promotion',
    year: '2025',
    description:
      'Designed match-day graphics, score updates, and motion visuals for the Calcutta Football League.',
    image: 'https://images.unsplash.com/photo-1602674809970-89073c530b0a?q=80&w=1170&auto=format&fit=crop',
    logo: '/client_logos/Calcutta_Football_League.svg',
    accentColor: '#059669',
    stat: '300K+ Reach',
  },
  {
    id: 'cfl-2024',
    clientName: 'CFL 2024',
    category: 'Digital Promotion',
    year: '2024',
    description:
      'Created premium match-day graphics and digital content to elevate the league\'s online presence.',
    image: 'https://images.unsplash.com/photo-1715277331640-d268f7739800?q=80&w=2061&auto=format&fit=crop',
    logo: '/client_logos/Calcutta_Football_League.svg',
    accentColor: '#dc2626',
    stat: '400K+ Views',
  },
  {
    id: 'behala-cup',
    clientName: 'Behala Cup',
    category: 'Official Media Partner',
    year: '2024',
    description:
      'Official media partner delivering match coverage, highlights, and real-time social media content.',
    image: 'https://images.unsplash.com/photo-1613125479732-14543c793349?q=80&w=1170&auto=format&fit=crop',
    logo: '/client_logos/behala_cup.jpeg',
    accentColor: '#d97706',
    stat: '150K+ Reach',
  },
  {
    id: 'behala-ss',
    clientName: 'Behala SS Sporting Club',
    category: 'Social Media Management',
    year: '2024',
    description:
      'Managed social media, produced 800+ creatives, and generated over 2 million total views in just 2 months.',
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=1170&auto=format&fit=crop',
    logo: '/client_logos/behala_ss_sporting_club-logo.png',
    accentColor: '#e95f0c',
    stat: '2M+ Total Views',
    wide: true, // spans 2 columns
  },
];

function HeroCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={project.id}
      className="col-span-1 md:col-span-2 lg:col-span-3 relative group rounded-[2rem] overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[21/8] overflow-hidden">
        <img
          src={project.image}
          alt={project.clientName}
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
          loading="eager"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#072541]/95 via-[#072541]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#072541]/50 via-transparent to-transparent z-10" />

        {/* Glowing accent bar */}
        <div
          className="absolute bottom-0 left-0 h-1 z-20 transition-all duration-700"
          style={{
            width: hovered ? '100%' : '30%',
            background: `linear-gradient(to right, ${project.accentColor}, transparent)`,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-2">
                <img src={project.logo} alt={project.clientName} className="w-full h-full object-contain" />
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-widest text-white backdrop-blur-sm border border-white/20"
                style={{ background: `${project.accentColor}40` }}
              >
                {project.category}
              </span>
            </div>
            <span className="text-white/40 font-display font-bold text-sm tracking-wider">{project.year}</span>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* <div className="text-white/50 font-display text-sm font-bold uppercase tracking-widest mb-2">Featured Project — 01</div> */}
              <h3 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-3" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                {project.clientName}
              </h3>
              <p className="text-white/70 text-base max-w-xl leading-relaxed">{project.description}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
              <div className="text-right">
                <div className="font-display text-3xl font-black" style={{ color: project.accentColor }}>{project.stat}</div>
                <div className="text-white/50 text-xs uppercase tracking-widest font-semibold">Campaign Impact</div>
              </div>
              <Link
                to="/portfolio"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-bold text-sm border border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-[#072541] transition-all duration-300"
              >
                View Case Study <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={project.id}
      className={`group relative rounded-[1.5rem] overflow-hidden cursor-pointer bg-[#072541] shadow-sm hover:shadow-2xl transition-all duration-500 ${project.wide ? 'md:col-span-2' : ''
        }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${project.wide ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
        <img
          src={project.image}
          alt={project.clientName}
          className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'scale-110 brightness-90' : 'scale-100 brightness-75'
            }`}
          loading="lazy"
        />

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#072541] via-[#072541]/40 to-transparent z-10" />

        {/* Hover overlay — full cover slide-up */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-end p-6 transition-all duration-500"
          style={{
            background: hovered
              ? `linear-gradient(to top, ${project.accentColor}ee 0%, ${project.accentColor}99 40%, transparent 100%)`
              : 'transparent',
          }}
        />

        {/* Glowing left border on hover */}
        <div
          className="absolute left-0 top-0 w-1 z-30 transition-all duration-500"
          style={{
            height: hovered ? '100%' : '0%',
            background: project.accentColor,
            boxShadow: `0 0 20px ${project.accentColor}`,
          }}
        />

        {/* Top chips */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-display font-black uppercase tracking-wider text-white backdrop-blur-sm"
            style={{ background: `${project.accentColor}cc` }}
          >
            {project.category}
          </span>
        </div>

        {/* Number index */}
        <div className="absolute top-4 right-4 z-30 font-display font-black text-white/20 text-3xl leading-none select-none">
          {String(index).padStart(2, '0')}
        </div>
      </div>

      {/* Content footer */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-5">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Client logo + name row */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-sm p-1 flex items-center justify-center border border-white/20">
                <img src={project.logo} alt={project.clientName} className="w-full h-full object-contain" />
              </div>
              <span className="text-white/60 font-display text-xs font-bold uppercase tracking-wider">{project.year}</span>
            </div>

            <h3
              className="font-display text-lg font-black text-white leading-tight truncate transition-all duration-300"
              style={{ color: hovered ? 'white' : 'white' }}
            >
              {project.clientName}
            </h3>

            {/* Description on hover */}
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: hovered ? '80px' : '0px', opacity: hovered ? 1 : 0 }}
            >
              <p className="text-white/80 text-xs leading-relaxed mt-1.5 line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            {/* Stat */}
            <div
              className="font-display text-sm font-black leading-tight text-right transition-colors duration-300"
              style={{ color: hovered ? 'white' : project.accentColor }}
            >
              {project.stat}
            </div>

            {/* Arrow button */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: hovered ? 'white' : 'rgba(255,255,255,0.1)',
                color: hovered ? project.accentColor : 'white',
                borderWidth: 1,
                borderColor: hovered ? 'white' : 'rgba(255,255,255,0.2)',
              }}
            >
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const [heroProject, ...restProjects] = projects;

  return (
    <section id="featured-work" className="py-28 bg-[#f8f5f2]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="section-badge mb-4 inline-flex">Our Work</span>
            <h2 className="flex font-display text-5xl sm:text-6xl font-black tracking-tight text-[#072541] leading-none">
              Featured
              <span className="pl-4 block text-[#e95f0c]">Work</span>
            </h2>
            <p className="text-[#4a5568] text-base mt-4 max-w-md leading-relaxed">
              How we capture action, shape narratives, and drive record-breaking audience engagement for our clients.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm bg-[#072541] text-white hover:bg-[#e95f0c] transition-all duration-300 shadow-lg shadow-[#072541]/20"
            >
              Explore Full Portfolio <ArrowUpRight className="w-4 h-4" />
            </Link>
            <p className="text-[#9ca3af] text-xs font-semibold">{projects.length} Projects Showcased</p>
          </div>
        </div>

        {/* ── Hero Card (full width) ── */}
        <div className="mb-6">
          <HeroCard project={heroProject} />
        </div>

        {/* ── Rest of the grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx + 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
