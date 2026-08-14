import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { sanityClient } from '../sanity/client';
import { SHOWREEL_QUERY } from '../sanity/queries';


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

  const isPortrait = reel.type === 'portrait';

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-col shrink-0 group cursor-pointer ${isPortrait ? 'w-64 sm:w-72' : 'w-80 sm:w-96'
        }`}
    >
      {/* Video Container */}
      <div
        className={`relative w-full rounded-3xl overflow-hidden border border-[#e2dbd3] bg-black group-hover:border-[#e95f0c] group-hover:shadow-2xl transition-all duration-300 ${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'
          }`}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src={reel.videoUrl}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Play indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${isPlaying
              ? 'opacity-0 scale-75'
              : 'opacity-100 scale-100 group-hover:scale-110 group-hover:bg-[#e95f0c] group-hover:border-[#e95f0c]'
              }`}
          >
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Details below video component */}
      <div className="mt-4 px-1">
        <h3 className="font-display font-bold text-base sm:text-lg text-[#072541] group-hover:text-[#e95f0c] transition-colors leading-tight">
          {reel.clientName}
        </h3>
      </div>
    </div>
  );
}

export default function Showreel() {
  const [reels, setReels] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    let active = true;
    async function getReels() {
      try {
        const data = await sanityClient.fetch(SHOWREEL_QUERY);
        if (active && data && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.id,
            clientName: item.clientName,
            videoUrl: item.videoFileUrl || item.videoUrl,
            type: item.type,
          }));
          setReels(formatted);
        }
      } catch (error) {
        console.error('Error fetching showreels from Sanity, using fallback:', error);
      }
    }
    getReels();
    return () => {
      active = false;
    };
  }, []);

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
          {reels.map((reel) => (
            <div key={reel.id} className="snap-start">
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
