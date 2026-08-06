import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

const stats = [
  { value: '1 M+', label: 'Audience Interactions' },
  { value: '2 M+', label: 'Total Views' },
  { value: '800+', label: 'Content Pieces' },
  { value: '2,000+', label: 'Instagram Followers' },
  { value: '3,000+', label: 'Facebook Followers' },
];

export default function Statistics() {
  const handleScrollToBehalaSS = () => {
    document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' });
    // Highlight the card or scroll to it
    setTimeout(() => {
      const card = document.getElementById('behala-ss');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('ring-4', 'ring-[#e95f0c]', 'scale-[1.02]');
        setTimeout(() => {
          card.classList.remove('ring-4', 'ring-[#e95f0c]', 'scale-[1.02]');
        }, 2000);
      }
    }, 800);
  };

  return (
    <section className="py-20 bg-[#072541]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <span className="section-badge mb-6 inline-flex border-[#e95f0c]/50 bg-[#e95f0c]/10 text-[#e95f0c]">
          Case Study Highlights
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          Driven by Real Impact
        </h2>
        <p className="text-white/80 text-lg max-w-3xl mx-auto mb-14 leading-relaxed">
          These outstanding milestones were achieved in <span className="text-white font-extrabold underline decoration-[#e95f0c] decoration-2">just two months</span> specifically for our client{' '}
          <strong className="text-white font-black text-xl tracking-wide uppercase px-2 py-0.5 bg-[#e95f0c] rounded-md inline-block shadow-md">
            Behala SS Sporting Club
          </strong>{' '}
          through our dedicated social media management and high-octane content strategy.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 max-w-6xl mx-auto mb-16">
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleScrollToBehalaSS}
            className="btn-primary px-8 py-3.5 text-base flex items-center gap-2 shadow-lg shadow-[#e95f0c]/20 cursor-pointer"
          >
            <FileText className="w-5 h-5" />
            See Behala SS Case Study
          </button>

          <Link
            to="/portfolio"
            className="px-8 py-3.5 rounded-full font-display font-bold text-base text-white border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
          >
            See All Case Studies
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
