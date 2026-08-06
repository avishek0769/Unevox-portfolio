import React from 'react';

const stats = [
  { value: '10 Lakh+', label: 'Audience Interactions' },
  { value: '2 Million+', label: 'Total Views' },
  { value: '800+',      label: 'Content Pieces' },
];

export default function Statistics() {
  return (
    <section className="py-20 bg-[#072541]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <span className="section-badge mb-6 inline-flex border-[#e95f0c]/50 bg-[#e95f0c]/10 text-[#e95f0c]">
          Impact Index
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-14 tracking-tight">
          Driven by Real Impact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-3">
              <span className="font-display text-5xl sm:text-6xl font-extrabold text-[#e95f0c] leading-none">
                {stat.value}
              </span>
              <span className="text-base font-semibold text-white/70 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
