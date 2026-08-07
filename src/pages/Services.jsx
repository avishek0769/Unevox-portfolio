import React, { useEffect } from 'react';
import { CheckCircle, Trophy, Theater, Compass, Heart, GraduationCap, Building2, UtensilsCrossed } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'cinematography',
    title: 'Cinematography',
    description: 'High-end cinematic productions, showreels, and commercial videos crafted to capture brand narratives and tell stories with maximum impact.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Cinematic Brand & Commercial Films',
      'Promotional Video & Reel Campaigns',
      'High-End Corporate Documentaries',
      'Optimized Short-form Social Media Clips',
      'Professional Post-production & Color Grading'
    ]
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Premium professional photography capturing defining moments with pixel-perfect precision, from high-octane sports action to hospitality food and venue styling.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Action Sports & Live Match Photography',
      'Architectural & Venue Interior Shoots',
      'Commercial Food & Menu Styling shoots',
      'Corporate Portraiture & Event Coverage',
      'High-Resolution Digital Retouching & Editing'
    ]
  },
  {
    id: 'sports-media-production',
    title: 'Sports Media Production',
    description: 'End-to-end sports media coverage designed to fuel fan engagement, elevate leagues, and spotlight athletes across tournaments.',
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96',
    deliverables: [
      'Real-time Gameday Coverage & Edits',
      'Athlete Highlight Reels & Promos',
      'Tournament Hype Videos & Teasers',
      'Multi-camera Live Feed & Broadcast coordination',
      'Behind-the-scenes Team Documentaries'
    ]
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description: 'Turn your profiles into active communities with consistent content calendars, organic copy, and data-driven publishing schedules.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Monthly Content Strategy & Calendars',
      'Custom Graphic Design for Posts & Stories',
      'Active Community Management & Engagement',
      'Influencer Outreach & Campaign Coordination',
      'Analytics & Monthly Performance Reports'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Growth-focused marketing campaigns designed to convert audiences into loyal followers and customer leads.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Paid Social Media Campaigns (Meta & Google Ads)',
      'Search Engine Optimization (SEO) & Marketing',
      'Lead Generation & High-converting Funnels',
      'Pay-Per-Click (PPC) Strategy & Audits',
      'Email Marketing Automation & Campaigns'
    ]
  },
  {
    id: 'creative-design',
    title: 'Creative Design',
    description: 'High-impact graphics, custom illustrations, matchday posters, and promotional merchandise that build a beautiful visual identity.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    deliverables: [
      'Matchday Graphics & Social Media Creatives',
      'Custom Digital Illustrations & Layouts',
      'Event & Pandal Concept Art Design',
      'Premium Merchandise & Apparel Design',
      'Print Design (Brochures, Banners, Posters)'
    ]
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Crafting cohesive identity systems, brand voice guidelines, and logo assets that help businesses stand out and build long-term value.',
    image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Brand Strategy & Market Positioning',
      'Custom Logo Design & Core Visual Identity',
      'Typography & Color Palette Development',
      'Comprehensive Brand Style Guidelines',
      'Brand Tone of Voice & Copywriting Manual'
    ]
  }
];

const INDUSTRIES = [
  { name: 'Sports', icon: Trophy, desc: 'Clubs, leagues, and individual athletes.' },
  { name: 'Cultural Organizations', icon: Compass, desc: 'Festivals, classical academies, and history boards.' },
  { name: 'Festivals & Events', icon: Heart, desc: 'Mega Durga Pujas, community festivals, and event hosts.' },
  { name: 'Hospitality', icon: UtensilsCrossed, desc: 'Aesthetic cafes, restaurants, and premium banquets.' },
  { name: 'Theatre', icon: Theater, desc: 'Independent troupes, drama festivals, and stage venues.' },
  { name: 'Corporate', icon: Building2, desc: 'Industrial logistics groups, service providers, and startups.' },
  { name: 'Education', icon: GraduationCap, desc: 'E-learning networks, colleges, and training academies.' }
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'Understanding your brand goals, target audience, and current market positioning.' },
  { num: '02', title: 'Strategy', desc: 'Crafting content plans, visual frameworks, and timeline goals tailored for you.' },
  { num: '03', title: 'Production', desc: 'Deploying our photography, film crews, and copywriters to capture elite raw assets.' },
  { num: '04', title: 'Post Production', desc: 'Editing, retouching, color grading, and styling visual deliverables.' },
  { num: '05', title: 'Publishing', desc: 'Deploying campaigns across platforms with strategic calendar schedules.' },
  { num: '06', title: 'Growth', desc: 'Monitoring performance parameters, optimizing campaigns, and expanding community reach.' }
];

export default function Services() {
  // Scroll to hash-anchor on page load or hash change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="bg-[#f8f5f2] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-16 bg-white overflow-hidden border-b border-[#e2dbd3]">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#072541] leading-[1.05] tracking-tight mb-5">
            Creative Services
          </h1>
          <p className="text-[#4a5568] text-lg max-w-2xl mx-auto leading-relaxed">
            From cinematic productions and sports media to branding and digital marketing, we help businesses create memorable experiences that engage audiences and build lasting brand value.
          </p>
        </div>
      </section>

      {/* ── EDITORIAL SERVICES SECTIONS ── */}
      <section className="py-24 space-y-24">
        {SERVICES_DATA.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={service.id}
              id={service.id}
              className="max-w-7xl mx-auto px-6 md:px-8 scroll-mt-24"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center`}>

                {/* Image wrapper */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-[#e2dbd3] shadow-md bg-white group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content wrapper */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c]">
                    Service {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-black text-[#072541]">
                    {service.title}
                  </h2>
                  <p className="text-[#4a5568] text-base leading-relaxed">
                    {service.description}
                  </p>

                  <div className="border-t border-[#e2dbd3] pt-6">
                    <h4 className="font-display font-bold text-sm text-[#072541] uppercase tracking-wider mb-4">
                      Core Deliverables
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-sm text-[#4a5568]">
                          <CheckCircle className="w-4 h-4 text-[#e95f0c] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="py-24 bg-white border-y border-[#e2dbd3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[#072541] tracking-tight">
              Industries We Have Served
            </h2>
            <p className="text-[#4a5568] mt-3 text-base">
              Bringing specialized digital campaigns and high-production content strategies to diverse sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {INDUSTRIES.map((ind, idx) => {
              const IconComp = ind.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#f8f5f2] border border-[#e2dbd3] rounded-2xl p-6 transition-all duration-300 hover:border-[#e95f0c] hover:shadow-md group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#e2dbd3] flex items-center justify-center text-[#e95f0c] mb-4 group-hover:bg-[#e95f0c] group-hover:text-white transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#072541] mb-2">
                    {ind.name}
                  </h4>
                  <p className="text-xs text-[#4a5568] leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CREATIVE PROCESS TIMELINE ── */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[#072541] tracking-tight">
              Our Creative Process
            </h2>
            <p className="text-[#4a5568] mt-3 text-base">
              A systematic roadmap from initial brainstorms to campaign results and business growth.
            </p>
          </div>

          {/* Timeline Grid layout */}
          <div className="relative">
            {/* Horizontal connection line on desktop */}
            <div className="hidden lg:block absolute top-[33px] left-8 right-8 h-[2px] bg-[#e2dbd3]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                  {/* Step bubble */}
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#e2dbd3] group-hover:border-[#e95f0c] flex items-center justify-center font-display font-black text-[#072541] text-lg mb-6 transition-all duration-300 shadow-sm relative">
                    {step.num}
                    {/* Tiny decorative pulse dot inside */}
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#e95f0c] border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h4 className="font-display font-black text-[#072541] text-lg mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#4a5568] leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
