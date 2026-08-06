import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 'durand-cup',
    clientName: 'Durand Cup',
    category: 'Sports Media & Coverage',
    description:
      "Official visual coverage, promotional reels, and live social media management for Asia's oldest football tournament.",
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    wide: true, // spans 2 columns
  },
  {
    id: 'kkr',
    clientName: 'Kolkata Knight Riders',
    category: 'Brand Activation & Media',
    description:
      'High-impact fan engagement reels and coverage during the IPL season in Kolkata.',
    image: 'https://images.unsplash.com/photo-1531415080290-bc9b8a3423b0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cfl-2025',
    clientName: 'CFL 2025',
    category: 'Digital Promotion',
    description:
      'Comprehensive digital storytelling and match-day graphics for the historic Calcutta Football League.',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cfl-2024',
    clientName: 'CFL 2024',
    category: 'Video Production',
    description:
      'Produced 100+ match-day reels, behind-the-scenes content, and brand promotions.',
    image: 'https://images.unsplash.com/photo-1540747737956-378724044602?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'behala-cup',
    clientName: 'Behala Cup',
    category: 'Official Media Partner',
    description:
      'Complete branding, live streams, video content, and tournament highlights coverage.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'behala-ss',
    clientName: 'Behala SS Sporting Club',
    category: 'Social Media Management',
    description:
      'Strategic graphics, publishing schedules, and promotional content for the athletic club.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6edd1dec1d?auto=format&fit=crop&w=800&q=80',
  },
];

function ProjectCard({ project, index }) {
  return (
    <div
      className={`group rounded-3xl overflow-hidden bg-white border border-[#e2dbd3] hover:border-[#e95f0c] hover:shadow-xl transition-all duration-300 flex flex-col ${
        project.wide ? 'md:col-span-2' : ''
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-[#f1ede8] ${
          project.wide ? 'aspect-[21/9]' : 'aspect-[16/10]'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#072541]/60 via-transparent to-transparent z-10" />
        <img
          src={project.image}
          alt={project.clientName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Index tag */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-sm font-display font-bold text-[#e95f0c]">
          0{index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-sm font-display font-bold uppercase tracking-wider text-[#e95f0c] mb-2">
          {project.category}
        </span>
        <h3 className="font-display text-xl font-bold text-[#072541] mb-3 group-hover:text-[#e95f0c] transition-colors">
          {project.clientName}
        </h3>
        <p className="text-[#4a5568] text-base leading-relaxed mb-6 flex-1">
          {project.description}
        </p>
        <div className="pt-4 border-t border-[#e2dbd3] flex items-center justify-between">
          <span className="text-sm text-[#9ca3af] font-medium">View case study</span>
          <div className="w-9 h-9 rounded-full border border-[#e2dbd3] group-hover:bg-[#e95f0c] group-hover:border-[#e95f0c] flex items-center justify-center text-[#e95f0c] group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  return (
    <section id="featured-work" className="py-24 bg-[#f8f5f2] dot-grid">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-badge mb-3 inline-flex">Showcase</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541]">
              Featured Work
            </h2>
            <p className="text-[#4a5568] text-base mt-3 max-w-xl">
              A look at how we capture action, shape narratives, and drive record fan interactions.
            </p>
          </div>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 font-display font-bold text-base text-[#e95f0c] hover:underline"
          >
            Explore Full Portfolio <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Grid — Durand Cup is col-span-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
