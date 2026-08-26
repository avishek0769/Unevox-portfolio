import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const projects = [
  // {
  //   id: 'durand-baghpat',
  //   league: 'Durand Cup',
  //   team: 'Baghpat FC',
  //   // description: "Captured match highlights, behind-the-scenes moments, and social media content throughout Asia's oldest football tournament — fuelling Baghpat FC's digital presence.",
  //   image: 'https://images.unsplash.com/photo-1766525133589-e3b4b090c04b?q=80&w=1170&auto=format&fit=crop',
  //   leagueLogo: '/client_logos/Durand_Cup.svg.webp',
  //   accentColor: '#e95f0c',
  //   slug: '/portfolio?cat=sports',
  //   featured: true,
  // },
  {
    id: 'cfl-behala-ss',
    league: 'Bengal Super League',
    team: 'North 24 Parganas',
    // description: 'End-to-end media coverage for North 24 Parganas across the Bengal Super League — from pre-season promos to post-match rundowns.',
    image: '/media/sports/n24-1.jpg',
    images: [
      '/media/sports/n24-1.jpg',
      // '/media/sports/n24-2.jpg',
      '/media/sports/n24-3.jpg',
      '/media/sports/n24-4.jpg'
    ],
    leagueLogo: '/client_logos/Calcutta_Football_League.svg',
    accentColor: '#059669',
    slug: '/portfolio?cat=sports',
  },
  {
    id: 'cfl-suruchi',
    league: 'Calcutta Football League',
    team: 'Suruchi Sangha',
    // description: 'Creative campaign production and real-time social media content that gave Suruchi Sangha a premium digital identity during the CFL season.',
    image: 'https://images.unsplash.com/photo-1602674809970-89073c530b0a?q=80&w=1170&auto=format&fit=crop',
    images: [
      '/media/sports/cfl-suruchi-1-g.jpg',
      '/media/sports/cfl-suruchi-2-g.jpg',
      '/media/sports/cfl-suruchi-3-g.jpg',
      '/media/sports/cfl-suruchi-4-g.jpg'
    ],
    leagueLogo: '/client_logos/Calcutta_Football_League.svg',
    accentColor: '#7c3aed',
    slug: '/portfolio?cat=sports',
  },
  {
    id: 'bsl-north24',
    league: 'Calcutta Football League',
    team: 'Behala SS',
    // description: 'Match-day graphics, live coverage, and highlight reels that drove Behala SS Sporting Club\'s social media growth throughout the CFL season.',
    image: '/media/sports/bss-2.jpg',
    images: [
      '/media/sports/bss-2.jpg',
      '/media/sports/bss-1.jpg',
      '/media/sports/bss-3.jpg',
      '/media/sports/bss-4.jpg'
    ],
    leagueLogo: '/client_logos/north_24_parganas_logo.png',
    accentColor: '#dc2626',
    slug: '/portfolio?cat=sports',
  },
];

/* ─── Hero Card (featured — full width) ─── */
function HeroCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={project.slug}
      id={project.id}
      className="block relative rounded-[2rem] overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] sm:aspect-[16/7] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.league} — ${project.team}`}
          className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
          style={{ filter: hovered ? 'brightness(0.95)' : 'brightness(0.8)' }}
          loading="eager"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#072541]/90 via-[#072541]/35 to-transparent z-10" />

        {/* Accent bar */}
        <div
          className="absolute bottom-0 left-0 h-[3px] z-20 transition-all duration-700 ease-out"
          style={{
            width: hovered ? '100%' : '25%',
            background: `linear-gradient(to right, ${project.accentColor}, transparent)`,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-12">

          {/* Bottom row — league / team / CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="flex-1 min-w-0">
              {/* League label */}
              <p className="font-display text-lg sm:text-2xl font-extrabold tracking-tight text-white/90 mb-1">
                {project.league}
              </p>
              {/* Team name — hero-size */}
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2 sm:mb-3">
                {project.team}
              </h3>
              <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                {project.description}
              </p>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-display font-bold text-xs sm:text-sm border border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-[#072541] transition-all duration-300 whitespace-nowrap">
                View Portfolio <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Regular Card ─── */
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let intervalId = null;
    if (hovered && project.images?.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 2000);
    } else {
      setCurrentImageIndex(0);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [hovered, project.images]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (project.images?.length > 1) {
      // Trigger the first transition immediately
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Link
      to={project.slug}
      id={project.id}
      className="block group relative rounded-[1.5rem] overflow-hidden cursor-pointer bg-[#072541] shadow-sm hover:shadow-2xl transition-all duration-500 aspect-[3/4]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images (slideshow on hover) */}
      {project.images && project.images.length > 0 ? (
        project.images.map((imgUrl, imgIdx) => (
          <img
            key={imgIdx}
            src={imgUrl}
            alt={`${project.league} — ${project.team}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${imgIdx === currentImageIndex ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
              }`}
            style={{ filter: hovered ? 'brightness(0.95)' : 'brightness(0.8)' }}
            loading="lazy"
          />
        ))
      ) : (
        <img
          src={project.image}
          alt={`${project.league} — ${project.team}`}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          style={{ filter: hovered ? 'brightness(0.95)' : 'brightness(0.8)' }}
          loading="lazy"
        />
      )}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#072541]/80 via-[#072541]/20 to-transparent z-10" />

      {/* Accent overlay on hover */}
      {/* <div
        className="absolute inset-x-0 bottom-0 z-20 transition-all duration-500 ease-out"
        style={{
          height: '100%',
          background: `linear-gradient(to top, ${project.accentColor}bb 0%, ${project.accentColor}45 20%, transparent 80%)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0%)' : 'translateY(12%)',
        }}
      /> */}

      {/* Glowing left border */}
      <div
        className="absolute left-0 top-0 w-[3px] z-30 transition-all duration-500 ease-out"
        style={{
          height: hovered ? '100%' : '0%',
          background: project.accentColor,
          boxShadow: hovered ? `0 0 16px ${project.accentColor}` : 'none',
        }}
      />

      {/* Index number */}
      <div className="absolute top-4 right-4 z-30 font-display font-black text-white/15 text-3xl leading-none select-none">
        {String(index).padStart(2, '0')}
      </div>

      {/* Footer content */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* League name */}
            <div className="mb-1">
              <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-white/90">
                {project.league}
              </span>
            </div>

            {/* Team name */}
            <h3 className="font-display text-base sm:text-lg font-black text-white leading-tight">
              {project.team}
            </h3>

            {/* Description on hover */}
            <div
              className="overflow-hidden transition-all duration-500 ease-out"
              style={{ maxHeight: hovered ? '72px' : '0px', opacity: hovered ? 1 : 0 }}
            >
              <p className="text-white/80 text-xs leading-relaxed mt-1.5 line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
            style={{
              background: hovered ? 'white' : 'rgba(255,255,255,0.1)',
              color: hovered ? project.accentColor : 'white',
              border: `1px solid ${hovered ? 'white' : 'rgba(255,255,255,0.2)'}`,
            }}
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Section ─── */
export default function FeaturedWork() {
  const heroProject = projects.find((p) => p.featured);
  const restProjects = projects.filter((p) => !p.featured);

  return (
    <section id="featured-work" className="py-20 sm:py-28 bg-[#f8f5f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-[#072541] leading-none">
              Featured <span className="text-[#e95f0c]">Work</span>
            </h2>
            <p className="text-[#4a5568] text-base mt-4 max-w-md leading-relaxed">
              How we capture action, shape narratives, and drive record-breaking audience engagement.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm bg-[#072541] text-white hover:bg-[#e95f0c] transition-all duration-300 shadow-lg shadow-[#072541]/20"
            >
              Explore Full Portfolio <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hero card (Only if a featured project exists) */}
        {heroProject && (
          <div className="mb-5 sm:mb-6">
            <HeroCard project={heroProject} />
          </div>
        )}

        {/* Grid for regular cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {restProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={heroProject ? idx + 2 : idx + 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
