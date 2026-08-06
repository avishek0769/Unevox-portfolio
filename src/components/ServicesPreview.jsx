import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, Trophy, Megaphone, Camera, Video, Palette, ArrowRight, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Trophy,
    num: '01',
    title: 'Sports Media Production',
    description:
      'High-octane match coverage, athlete promos, and league hype reels that put your brand at the heart of the action.',
    accent: '#e95f0c',
  },
  {
    icon: Share2,
    num: '02',
    title: 'Social Media Management',
    description:
      'End-to-end content calendars, daily publishing, and community growth strategies tailored to your audience.',
    accent: '#7c3aed',
  },
  {
    icon: Video,
    num: '03',
    title: 'Video & Reel Production',
    description:
      'Cinematic showreels, short-form content, and corporate films crafted for maximum platform reach.',
    accent: '#0284c7',
  },
  {
    icon: Camera,
    num: '04',
    title: 'Photography',
    description:
      'Professional sports action shots, event photography, and product imagery shot with precision and passion.',
    accent: '#059669',
  },
  {
    icon: Megaphone,
    num: '05',
    title: 'Digital Marketing',
    description:
      'Performance campaigns, paid ads, and organic growth plans that convert audiences into loyal followers.',
    accent: '#dc2626',
  },
  {
    icon: Palette,
    num: '06',
    title: 'Creative Graphics & Branding',
    description:
      'Visual identity systems, matchday posters, merchandise design, and premium brand assets.',
    accent: '#d97706',
  },
];

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className="relative bg-white border border-[#e2dbd3] rounded-2xl p-7 flex flex-col gap-5 overflow-hidden group cursor-pointer transition-all duration-400 hover:shadow-xl hover:border-transparent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sliding accent left border */}
      <div
        className="absolute left-0 top-0 w-[3px] rounded-l-2xl transition-all duration-500 ease-out"
        style={{
          height: hovered ? '100%' : '0%',
          background: service.accent,
          boxShadow: hovered ? `0 0 12px ${service.accent}88` : 'none',
        }}
      />

      {/* Ghost number — large background character */}
      <div
        className="absolute right-4 top-2 font-display font-black text-6xl leading-none select-none pointer-events-none transition-all duration-500"
        style={{ color: hovered ? `${service.accent}18` : 'rgba(7,37,65,0.05)' }}
      >
        {service.num}
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0"
        style={{
          background: hovered ? service.accent : `${service.accent}18`,
          color: hovered ? 'white' : service.accent,
        }}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3
          className="font-display text-lg font-bold mb-2 transition-colors duration-300"
          style={{ color: hovered ? service.accent : '#072541' }}
        >
          {service.title}
        </h3>
        <p className="text-[#4a5568] text-sm leading-relaxed">{service.description}</p>
      </div>

      {/* Footer link */}
      <div
        className="flex items-center gap-1.5 text-sm font-display font-bold transition-all duration-300 mt-1"
        style={{ color: hovered ? service.accent : '#9ca3af' }}
      >
        Learn more
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300"
          style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0px)' }}
        />
      </div>
    </div>
  );
}

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Subtle orange glow top-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />
      {/* Subtle purple glow bottom-right */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="section-badge mb-4 inline-flex border-[#e95f0c]/40 bg-[#e95f0c]/10 text-[#e95f0c]">
              Capabilities
            </span>
            <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-black leading-none">
              What We <span className="text-[#e95f0c]">Do</span>
            </h2>
            <p className="text-black/50 text-base mt-4 max-w-md leading-relaxed">
              Six focused disciplines — every one built to push your brand further into the spotlight.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm border border-white/20 text-[#e95f0c] hover:bg-white hover:text-[#072541] transition-all duration-300 shrink-0"
          >
            See All Services <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
