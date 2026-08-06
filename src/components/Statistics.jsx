import React from 'react';

const stats = [
  { value: '10+ Lacs', label: 'Audience Interactions' },
  { value: '20+ Lacs', label: 'Total Views' },
  { value: '800+', label: 'Content Pieces' },
  { value: '2,000+', label: 'Instagram Followers' },
  { value: '3,000+', label: 'Facebook Followers' },
];

export default function Statistics() {
  return (
    <section className="py-20 bg-[#072541]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <span className="section-badge mb-6 inline-flex border-[#e95f0c]/50 bg-[#e95f0c]/10 text-[#e95f0c]">
          Client Case Study: Behala SS Sporting Club
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          Driven by Real Impact
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          These impressive milestones were achieved in <span className="text-[#e95f0c] font-bold">just two months</span> for Behala SS Sporting Club through our dedicated social media management and high-octane content strategy.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e95f0c]/50 hover:bg-white/10 transition-all duration-300 ${idx === 4 ? 'col-span-2 lg:col-span-1' : ''
                }`}
            >
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#e95f0c] leading-none mb-3">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider text-center leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
