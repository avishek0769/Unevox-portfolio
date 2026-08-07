import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    number: '01',
    title: 'Brand Building & Strategic Marketing',
    description:
      'Helping brands grow through thoughtful positioning, strategic marketing, and campaigns that create lasting impact.',
  },
  {
    number: '02',
    title: 'Digital Campaigns',
    description:
      'Executing high-impact digital campaigns, social media management, and content strategies that drive visibility, engagement, and audience growth.',
  },
  {
    number: '03',
    title: 'Creative Film Making',
    description:
      'Producing cinematic reels, commercial films, event coverage, photography, and visual storytelling that brings every brand and event to life.',
  },
];

export default function AboutPreview() {
  return (
    <section className="py-24 bg-[#f8f5f2] border-y border-[#e2dbd3]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <div className="space-y-7">
            <span className="section-badge inline-flex">Identity</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541] leading-tight">
              Who We Are
            </h2>
            <p className="text-[#4a5568] text-lg leading-relaxed">
              At Unevox, every project is more than a service — it is a creative journey. We collaborate closely with clients to craft experiences that connect, convert, and leave a lasting impression through strategic marketing, creative storytelling, and premium visual production.
            </p>
            <Link
              to="/about"
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-base"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — pillars */}
          <div className="flex flex-col gap-6">
            {pillars.map((p) => (
              <div
                key={p.number}
                className="card-light rounded-2xl p-7 flex items-start gap-6 group"
              >
                <span className="font-display font-black text-3xl text-[#e95f0c]/25 group-hover:text-[#e95f0c] transition-colors shrink-0">
                  {p.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#072541] mb-2 group-hover:text-[#e95f0c] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[#4a5568] text-base leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
