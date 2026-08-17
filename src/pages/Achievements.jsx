import React, { useState, useEffect } from 'react';
import { Award, Target, Trophy, Milestone } from 'lucide-react';
import { sanityClient } from '../sanity/client';
import { AWARDS_QUERY } from '../sanity/queries';

const MILESTONES = [
  {
    title: 'Kolkata’s First Durga Puja Social Campaign',
    description:
      'Started a dedicated social media campaign for Kolkata’s Puja clubs, covering celebrations through photography, reels, videos, and digital storytelling.',
    icon: Target,
  },
  {
    title: '20+ Brands & Companies',
    description:
      'In just 1.6 years, Unevox has worked with more than 20 brands and companies across sports, cultural events, hospitality, corporate, and other creative industries.',
    icon: Trophy,
  },
  {
    title: 'Multi-Genre Creative Expertise',
    description:
      'Built a strong portfolio across multiple genres, combining social media, digital campaigns, photography, video production, and creative storytelling.',
    icon: Award,
  },
  {
    title: 'Client Recognition',
    description:
      'Been felicitated by clients for outstanding work, creative execution, and quality deliverables across various projects.',
    icon: Award,
  },
];

// Empty list to demonstrate the condition: "Hide this section if no certifications exist"
const CERTIFICATIONS = [];

export default function Achievements() {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    let active = true;
    async function fetchAwards() {
      try {
        const data = await sanityClient.fetch(AWARDS_QUERY);
        if (active && data) {
          setAwards(data);
        }
      } catch (err) {
        console.error('Achievements: Sanity fetch failed:', err);
      }
    }
    fetchAwards();
    return () => { active = false; };
  }, []);

  return (
    <div className="bg-[#f8f5f2] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-16 bg-white overflow-hidden">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#072541] leading-[1.05] tracking-tight mb-5">
            Celebrating Every<br />
            <span className="text-[#e95f0c]">Milestone.</span>
          </h1>
          <p className="text-[#4a5568] text-lg max-w-2xl mx-auto leading-relaxed">
            Every achievement reflects our commitment to creativity, quality, and delivering meaningful results for our clients.
          </p>
        </div>
      </section>

      {/* ── AWARDS & RECOGNITIONS ── */}
      {awards.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <div className="mb-12">
            <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] block mb-2">
              Recognitions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#072541]">
              Awards & Accolades
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#e2dbd3] hover:shadow-xl transition-all duration-300 group"
              >
                {award.image && (
                  <div className="aspect-[16/9] overflow-hidden relative bg-[#072541]">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <p className="text-[#e95f0c] font-display font-bold text-xs uppercase tracking-widest mb-1">
                    {award.organization}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-[#072541] mb-3">
                    {award.title}
                  </h3>
                  <p className="text-[#4a5568] text-sm leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TIMELINE MILESTONES ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16 border-t border-[#e2dbd3]">
        <div className="mb-12 text-center">
          <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] block mb-2">
            Our Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#072541]">
            Key Milestones
          </h2>
        </div>

        <div className="relative border-l border-[#e2dbd3] ml-4 md:ml-32 pl-8 md:pl-12 space-y-12">
          {MILESTONES.map((milestone, idx) => {
            const Icon = milestone.icon;
            return (
              <div key={idx} className="relative group">
                {/* Year tag for large screen (placed in left gutter) */}
                <div className="hidden md:block absolute -left-44 top-6 text-right w-28">
                  <span className="text-xs font-display font-bold text-[#e95f0c] uppercase tracking-widest">
                    Unevox
                  </span>
                </div>

                {/* Timeline node */}
                <div className="absolute -left-[40px] md:-left-[56px] top-8 w-4 h-4 md:w-4 md:h-4 rounded-full bg-[#f8f5f2] border-2 border-[#e95f0c] flex items-center justify-center text-[#e95f0c] group-hover:bg-[#e95f0c] group-hover:text-white transition-all duration-300">
                  {/* <Icon className="w-4 h-4 md:w-5 md:h-5" /> */}
                </div>

                {/* Content card */}
                <div className="bg-white rounded-2xl border border-[#e2dbd3] p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-display text-lg sm:text-xl font-black text-[#072541] mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-[#4a5568] text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CERTIFICATIONS (Hidden if none) ── */}
      {CERTIFICATIONS.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 border-t border-[#e2dbd3]">
          <div className="mb-12">
            <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] block mb-2">
              Credentials
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#072541]">
              Certifications & Affiliations
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="bg-white border border-[#e2dbd3] p-6 rounded-2xl">
                <h3 className="font-display font-bold text-lg text-[#072541]">{cert.name}</h3>
                <p className="text-sm text-[#4a5568]">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
