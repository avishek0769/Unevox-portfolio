import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all',        name: 'All' },
  { id: 'cultural',   name: 'Cultural Events' },
  { id: 'theatre',    name: 'Theatre' },
  { id: 'hospitality',name: 'Hospitality' },
  { id: 'corporate',  name: 'Corporate' },
  { id: 'education',  name: 'Education' },
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
  },
  {
    id: 'godhuli',
    title: 'Godhuli Gagone',
    client: 'Bratya Theatre Group',
    category: 'theatre',
    label: 'Theatre & Stage',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    desc: 'Cinematic trailer, actor promo cards, and offline marketing graphics.',
  },
  {
    id: 'cafe-krysalis',
    title: 'Café Krysalis',
    client: 'Krysalis Hospitality',
    category: 'hospitality',
    label: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    desc: 'Food photography, organic reels, and social channel management.',
  },
  {
    id: 'ripley',
    title: 'Ripley Group Corporate Film',
    client: 'Ripley Logistics',
    category: 'corporate',
    label: 'Corporate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    desc: 'Corporate documentary on container transport and cargo supply.',
  },
  {
    id: 'upgrad',
    title: 'upGrad Kolkata Centre Launch',
    client: 'upGrad Kolkata',
    category: 'education',
    label: 'Education',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    desc: 'Launch photography, student campaigns, and visual graphics.',
  },
  {
    id: 'caesar',
    title: 'Caesar Stage Production',
    client: 'Shakespeare Guild Kolkata',
    category: 'theatre',
    label: 'Theatre & Stage',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
    desc: 'Teaser campaigns, digital media partnership, and stage visuals.',
  },
  {
    id: 'maharaja',
    title: 'Maharaja Caterer Rebranding',
    client: 'Maharaja Group',
    category: 'hospitality',
    label: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    desc: 'Logo redesign, packaging, and digital menu assets.',
  },
  {
    id: 'rainbow',
    title: 'Rainbow House Banquet',
    client: 'Rainbow Banquets Ltd.',
    category: 'hospitality',
    label: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    desc: 'Wedding season reels and localized Facebook ad campaigns.',
  },
];

export default function PortfolioPreview() {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="section-badge mb-3 inline-flex">Beyond the Arena</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541]">
              Our Other Work
            </h2>
            <p className="text-[#4a5568] text-base mt-3 max-w-lg">
              Premium campaigns for corporate houses, cultural events, theatre, and hospitality.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-display font-bold text-base text-[#e95f0c] hover:underline shrink-0"
          >
            See All Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 border-b border-[#e2dbd3]">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-display text-sm font-bold uppercase tracking-wide whitespace-nowrap cursor-pointer transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#e95f0c] text-white shadow-md'
                  : 'bg-[#f1ede8] text-[#4a5568] hover:text-[#072541]'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden bg-[#f8f5f2] border border-[#e2dbd3] hover:border-[#e95f0c] hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-sm font-display font-bold text-[#e95f0c]">
                  {project.label}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm font-bold text-[#9ca3af] uppercase tracking-wider">{project.client}</p>
                <h3 className="font-display text-lg font-bold text-[#072541] mt-1 mb-2 group-hover:text-[#e95f0c] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#4a5568] text-sm leading-relaxed flex-1">{project.desc}</p>
                <div className="pt-4 border-t border-[#e2dbd3] mt-4 flex items-center justify-between">
                  <span className="text-sm text-[#9ca3af] font-medium">View Details</span>
                  <ArrowUpRight className="w-4 h-4 text-[#e95f0c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
