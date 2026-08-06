import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight, Film, ChevronLeft, ChevronRight } from 'lucide-react';

const reelsData = [
  {
    id: 'reel-1',
    title: 'Behala SS Sporting Club Promo',
    clientName: 'Behala SS Sporting Club',
    category: 'Club Hype',
    videoUrl: '/reels/potrait-reel.mp4',
    type: 'portrait',
  },
  {
    id: 'reel-2',
    title: 'Durand Cup Matchday Hype',
    clientName: 'Durand Cup',
    category: 'Tournament Promo',
    videoUrl: '/reels/square-type-reel.mp4',
    type: 'square',
  },
  {
    id: 'reel-3',
    title: 'Kolkata Knight Riders Fan Activation',
    clientName: 'Kolkata Knight Riders',
    category: 'Fan Engagement',
    videoUrl: '/reels/potrait-reel.mp4',
    type: 'portrait',
  },
  {
    id: 'reel-4',
    title: 'Calcutta Football League Anthem',
    clientName: 'CFL 2025',
    category: 'League Anthem',
    videoUrl: '/reels/square-type-reel.mp4',
    type: 'square',
  },
  {
    id: 'reel-5',
    title: 'Behala Classical Festival Highlight',
    clientName: 'Behala Classical Festival',
    category: 'Cultural Event',
    videoUrl: '/reels/potrait-reel.mp4',
    type: 'portrait',
  },
  {
    id: 'reel-6',
    title: 'Behala Cup Official Highlights',
    clientName: 'Behala Cup',
    category: 'Finals Coverage',
    videoUrl: '/reels/square-type-reel.mp4',
    type: 'square',
  },
];

function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay blocked:', err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative shrink-0 rounded-3xl overflow-hidden border border-[#e2dbd3] bg-black hover:border-[#e95f0c] hover:shadow-2xl transition-all duration-300 group cursor-pointer ${
        reel.type === 'portrait' ? 'w-64 sm:w-72 aspect-[9/16]' : 'w-80 sm:w-96 aspect-square'
      }`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Static overlay details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 flex flex-col justify-between p-5">
        {/* Top Details */}
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-display font-bold text-white tracking-wider uppercase">
            {reel.category}
          </span>
          <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-mono text-white/60 uppercase">
            {reel.type}
          </span>
        </div>

        {/* Play indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${
              isPlaying
                ? 'opacity-0 scale-75'
                : 'opacity-100 scale-100 group-hover:scale-110 group-hover:bg-[#e95f0c] group-hover:border-[#e95f0c]'
            }`}
          >
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Bottom Details */}
        <div className="space-y-1">
          <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#e95f0c] transition-colors leading-tight">
            {reel.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-semibold">
            {reel.clientName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SportsShowreel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#f8f5f2] border-y border-[#e2dbd3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-badge mb-3 inline-flex">
              <Film className="w-3.5 h-3.5 mr-1" /> Shorts & Reels
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541]">
              Media Showreel
            </h2>
            <p className="text-[#4a5568] text-base mt-3 max-w-xl">
              Hover over any video card to play the social media reel. Scroll horizontally to view all productions.
            </p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            {/* Scroll navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-[#e2dbd3] bg-white hover:bg-[#e95f0c] hover:border-[#e95f0c] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer text-[#072541]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-[#e2dbd3] bg-white hover:bg-[#e95f0c] hover:border-[#e95f0c] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer text-[#072541]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-display font-bold text-base text-[#e95f0c] hover:underline"
            >
              See Portfolio <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scrollable container area */}
        <div
          ref={scrollRef}
          className="flex items-center gap-6 overflow-x-auto pb-8 scroll-smooth scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reelsData.map((reel) => (
            <div key={reel.id} className="snap-start">
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
