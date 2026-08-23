import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { sanityClient } from '../sanity/client';
import { PORTFOLIO_PREVIEW_QUERY } from '../sanity/queries';

// category IDs map to Sanity portfolioItem.category values
const otherCategories = [
  {
    id: 'durga-puja',
    categoryName: 'Durga Puja Campaign',
    description: 'Unevox partners with some of Kolkata’s most renowned Durga Puja committees, delivering end-to-end media coverage, social media management, cinematic reels, photography, promotional creatives, and real-time event storytelling. Through visually compelling content and strategic digital campaigns, we help transform each celebration into a memorable digital experience while amplifying audience engagement and cultural reach.',
    works: [
      { id: 'dp-1', order: 1, name: 'Behala Natun Dal', type: 'video', url: '/media/durga-puja/doc-1.mp4', aspect: 'square' },
      { id: 'dp-2', order: 2, name: 'Behala Natun Dal', type: 'video', url: '/media/durga-puja/doc-2.mp4', aspect: 'square' },
      { id: 'dp-3', order: 3, name: 'TMSS Behala', type: 'video', url: '/media/durga-puja/doc-3.mp4', aspect: 'portrait' },
    ],
  },
  {
    id: 'cultural-campaign',
    categoryName: 'Cultural Campaign',
    description: 'Promotional campaigns, cinematic summaries, and content curation for prominent classical arts, theater, and music events.',
    works: [
      { id: 'cc-2', order: 1, name: 'Behala Theatre Festival', type: 'video', url: '/media/cultural/theatre-fest-1.mp4', aspect: 'portrait' },
      { id: 'cc-1', order: 2, name: 'Beahala Classical Festival', type: 'video', url: '/media/cultural/classical-fest-3.mp4', aspect: 'portrait' },
      { id: 'cc-3', order: 3, name: 'Bachonik Utsav', type: 'video', url: '/media/cultural/bachonik-1.mp4', aspect: 'square' },
      { id: 'cc-4', order: 4, name: 'Beahala Classical Festival', type: 'video', url: '/media/cultural/classical-fest-4.mp4', aspect: 'square' },
      { id: 'cc-5', order: 5, name: 'Behala Theatre Festival', type: 'video', url: '/media/cultural/theatre-fest-2.mp4', aspect: 'portrait' },
      { id: 'cc-6', order: 6, name: 'Behala Theatre Festival', type: 'video', url: '/media/cultural/theatre-fest-3.mp4', aspect: 'portrait' },
      { id: 'cc-7', order: 7, name: 'Bachonik Utsav', type: 'video', url: '/media/cultural/bachonik-3.mp4', aspect: 'portrait' },
      { id: 'cc-8', order: 8, name: 'Shailosik Theatre', type: 'video', url: '/media/cultural/Godhuli-1.mp4', aspect: 'portrait' },
      { id: 'cc-9', order: 9, name: 'Shailosik Theatre', type: 'image', url: '/media/cultural/Godhuli-1-g.jpg', aspect: 'portrait' },
      { id: 'cc-10', order: 10, name: 'Shailosik Theatre', type: 'video', url: '/media/cultural/Godhuli-2.mp4', aspect: 'portrait' },
      { id: 'cc-11', order: 11, name: 'Shailosik Theatre', type: 'image', url: '/media/cultural/Godhuli-2-g.jpg', aspect: 'portrait' },
      { id: 'cc-12', order: 12, name: 'Shailosik Theatre', type: 'video', url: '/media/cultural/Godhuli-3.mp4', aspect: 'portrait' },
      { id: 'cc-13', order: 13, name: 'Shailosik Theatre', type: 'image', url: '/media/cultural/Godhuli-3-g.jpg', aspect: 'portrait' },
      { id: 'cc-14', order: 14, name: 'Behala Theatre Festival', type: 'video', url: '/media/cultural/theatre-fest-4.mp4', aspect: 'portrait' },
      { id: 'cc-15', order: 15, name: 'Bachonik Utsav', type: 'video', url: '/media/cultural/bachonik-4.mp4', aspect: 'portrait' },
    ],
  },
  {
    id: 'industries',
    categoryName: 'Industries',
    description: 'Premium corporate messaging, branding materials, industrial documentaries, and product summaries.',
    works: [
      { id: 'ind-1', order: 1, name: 'Ripley Group', type: 'image', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', aspect: 'portrait' },
      { id: 'ind-2', order: 2, name: 'Creative Videos', type: 'image', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
      { id: 'ind-3', order: 3, name: 'Vision AV', type: 'image', url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
      { id: 'ind-4', order: 4, name: 'Smile Events', type: 'image', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
      { id: 'ind-5', order: 5, name: 'Economic Times', type: 'image', url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80', aspect: 'portrait' },
      { id: 'ind-6', order: 6, name: 'Economic Times', type: 'image', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
    ],
  },
  {
    id: 'cafe-food',
    categoryName: 'Cafe & Food',
    description: 'Elevate your culinary brand with meticulous food styling, atmospheric restaurant interior photography, and cinematic video clips designed to captivate diners.',
    works: [
      // { id: 'cf-1', order: 1, name: 'Krysalis Cafe', type: 'image', url: '/media/cafe-food/krysalis-1.mp4', aspect: 'portrait' },
      { id: 'cf-2', order: 2, name: 'Shoreline Cafe', type: 'video', url: '/media/cafe-food/shoreline-1.mp4', aspect: 'portrait' },
      { id: 'cf-3', order: 3, name: 'Maharaja Caterer', type: 'video', url: '/media/cafe-food/maharaja-1.mp4', aspect: 'portrait' },
      { id: 'cf-4', order: 4, name: 'Lakshmisree Caterer', type: 'video', url: '/media/cafe-food/lakshmisree-1.mp4', aspect: 'square' },
      { id: 'cf-5', order: 5, name: 'Shoreline Cafe', type: 'video', url: '/media/cafe-food/shoreline-2.mp4', aspect: 'portrait' },
      { id: 'cf-6', order: 6, name: 'Shoreline Cafe', type: 'video', url: '/media/cafe-food/shoreline-3.mp4', aspect: 'portrait' },
      { id: 'cf-7', order: 7, name: 'Shoreline Cafe', type: 'video', url: '/media/cafe-food/shoreline-4.mp4', aspect: 'portrait' },
      { id: 'cf-8', order: 8, name: 'Maharaja Caterer', type: 'video', url: '/media/cafe-food/maharaja-2.mp4', aspect: 'portrait' },
      { id: 'cf-9', order: 9, name: 'Maharaja Caterer', type: 'video', url: '/media/cafe-food/maharaja-3.mp4', aspect: 'portrait' },
      { id: 'cf-10', order: 10, name: 'Maharaja Caterer', type: 'video', url: '/media/cafe-food/maharaja-4.mp4', aspect: 'portrait' },
      { id: 'cf-11', order: 11, name: 'Maharaja Caterer', type: 'video', url: '/media/cafe-food/maharaja-5.mp4', aspect: 'square' },
      { id: 'cf-12', order: 12, name: 'Maharaja Caterer', type: 'video', url: '/media/cafe-food/maharaja-6.mp4', aspect: 'square' },
      { id: 'cf-13', order: 13, name: 'Maharaja Caterer', type: 'video', url: '/media/cafe-food/maharaja-7.mp4', aspect: 'portrait' },
      { id: 'cf-14', order: 14, name: 'Lakshmisree Caterer', type: 'video', url: '/media/cafe-food/lakshmisree-2.mp4', aspect: 'square' },
      { id: 'cf-15', order: 15, name: 'Lakshmisree Caterer', type: 'video', url: '/media/cafe-food/lakshmisree-3.mp4', aspect: 'portrait' },
      { id: 'cf-16', order: 16, name: 'Lakshmisree Caterer', type: 'video', url: '/media/cafe-food/lakshmisree-4.mp4', aspect: 'portrait' },
    ],
  },
  {
    id: 'education',
    categoryName: 'Education',
    description: 'Promotional content, online course graphics, and student spotlight documentaries for leading learning networks.',
    works: [
      { id: 'edu-1', order: 1, name: 'Upgrad Kolkata', type: 'image', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80', aspect: 'portrait' },
      { id: 'edu-2', order: 2, name: 'Upgrad Kolkata', type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
      { id: 'edu-3', order: 3, name: 'Upgrad Kolkata', type: 'image', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
      { id: 'edu-4', order: 4, name: 'Upgrad Kolkata', type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
    ],
  },
  {
    id: 'banquets',
    categoryName: 'Banquets',
    description: 'Immersive venue tours and premium event decor photography for wedding and luxury corporate spaces.',
    works: [
      { id: 'bq-1', order: 1, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-1.mp4', aspect: 'portrait' },
      { id: 'bq-2', order: 2, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-2.mp4', aspect: 'portrait' },
      { id: 'bq-3', order: 3, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-3.mp4', aspect: 'portrait' },
      { id: 'bq-4', order: 4, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-4.mp4', aspect: 'portrait' },
      { id: 'bq-5', order: 5, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-5.mp4', aspect: 'portrait' },
      { id: 'bq-6', order: 6, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-6.mp4', aspect: 'portrait' },
      { id: 'bq-7', order: 7, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-7.mp4', aspect: 'portrait' },
      { id: 'bq-8', order: 8, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-8.mp4', aspect: 'portrait' },
      { id: 'bq-9', order: 9, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-9.mp4', aspect: 'portrait' },
      { id: 'bq-10', order: 10, name: 'Rainbow Banquet', type: 'video', url: '/media/banquets/rainbow-10.mp4', aspect: 'portrait' },
    ],
  },
];

function MediaCard({ item }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay blocked:', err));
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Compact sizing for reduced media slider height
  const getAspectClass = () => {
    if (item.aspect === 'portrait') {
      return 'w-[13rem] sm:w-[17rem] aspect-[3/4]';
    }
    if (item.aspect === 'landscape' || item.aspect === 'video') {
      return 'w-[15rem] sm:w-[20rem] aspect-[16/10]';
    }
    return 'w-[15rem] sm:w-[23rem] aspect-[4/3]';
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative shrink-0 rounded-2xl overflow-hidden border border-[#e2dbd3] bg-black hover:border-[#e95f0c] hover:shadow-xl transition-all duration-300 group cursor-pointer ${getAspectClass()}`}
    >
      {item.type === 'video' ? (
        <>
          <video
            ref={videoRef}
            src={item.url}
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover duration-300"
          />
          {/* Play indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div
              className={`w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${isPlaying
                ? 'opacity-0 scale-75'
                : 'opacity-100 scale-100 group-hover:scale-110 group-hover:bg-[#e95f0c] group-hover:border-[#e95f0c]'
                }`}
            >
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            </div>
          </div>
        </>
      ) : (
        <img
          src={item.url}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
      )}

      {/* Subtle bottom glassmorphic badge for work title */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 z-20">
        <p className="text-white text-xs sm:text-sm font-display font-bold leading-tight drop-shadow-sm truncate">
          {item.name}
        </p>
      </div>
    </div>
  );
}

function CategorySection({ category, isDurgaPuja, isCultural }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <div className={`mb-14 last:mb-0 ${!isCultural ? "border-b" : ""} border-[#e2dbd3]/60 pb-8 last:border-b-0 last:pb-0`}>
      {/* Category header & navigation arrows */}
      <div className="relative z-10 flex items-end justify-between gap-6 mb-6">
        <div className="max-w-2xl">
          {/* Heading — swap text for image on Durga Puja */}
          {isDurgaPuja ? (
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/assets/durga-puja.png"
                alt="Durga Puja Campaign"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <span className="font-display text-2xl sm:text-3xl font-black text-[#072541]">
                Campaign
              </span>
            </div>
          ) : (
            <h3 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mb-2">
              {category.categoryName}
            </h3>
          )}
          <p className="text-[#4a5568] text-xs sm:text-sm leading-relaxed mb-3">
            {category.description}
          </p>
          {isDurgaPuja && (
            <Link
              to="/durga-puja"
              className="inline-flex items-center gap-1 text-[#e95f0c] hover:text-[#072541] text-xs sm:text-sm font-display font-bold hover:underline underline-offset-4 transition-colors"
            >
              Explore Durga Puja Campaigns <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full border border-[#e2dbd3] bg-white hover:bg-[#e95f0c] hover:border-[#e95f0c] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer text-[#072541]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full border border-[#e2dbd3] bg-white hover:bg-[#e95f0c] hover:border-[#e95f0c] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer text-[#072541]"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal media slider */}
      <div
        ref={scrollRef}
        className={`relative z-10 flex items-center gap-5 overflow-x-auto ${isDurgaPuja || isCultural ? "pb-[6rem]" : "pb-4 md:pb-6"} scroll-smooth scrollbar-none snap-x snap-mandatory`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {category.works.map((work) => (
          <div key={work.id} className="snap-start">
            <MediaCard item={work} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPreview() {
  // State holds categories with works that may be augmented from Sanity
  const [categories, setCategories] = useState(otherCategories);

  useEffect(() => {
    let active = true;
    async function fetchPortfolioItems() {
      try {
        const data = await sanityClient.fetch(PORTFOLIO_PREVIEW_QUERY);
        if (!active || !data || data.length === 0) return;

        // Group Sanity items by category
        const sanityByCategory = {};
        data.forEach((item) => {
          if (!item.url) return; // skip items with no resolved URL
          const catId = item.category;
          if (!sanityByCategory[catId]) sanityByCategory[catId] = [];
          sanityByCategory[catId].push(item);
        });

        // Merge into each static category, then sort all works by order
        setCategories((prev) =>
          prev.map((cat) => {
            // Map static id → Sanity category value
            // 'cultural-campaign' → 'cultural', others match directly
            const sanityCatKey = cat.id === 'cultural-campaign' ? 'cultural' : cat.id;
            const sanityWorks = sanityByCategory[sanityCatKey] || [];
            const merged = [...cat.works, ...sanityWorks];
            merged.sort((a, b) => {
              const oa = a.order ?? Infinity;
              const ob = b.order ?? Infinity;
              return oa - ob;
            });
            return { ...cat, works: merged };
          })
        );
      } catch (err) {
        console.error('PortfolioPreview: Sanity fetch failed, using static data:', err);
      }
    }
    fetchPortfolioItems();
    return () => { active = false; };
  }, []);

  return (
    <section className="relative py-24 bg-[#f8f5f2] border-t border-[#e2dbd3] overflow-hidden">
      {/* ── Durga Puja decorative images — anchored to the section edge ── */}
      <>
        {/* Durga Maa: Horizontally centred, in the Durga puja section */}
        <img
          src="/assets/durga-maa.png"
          alt=""
          aria-hidden="true"
          className="absolute left-[34%] top-[30rem] md:left-[63%] md:top-[22rem] h-[25rem] md:h-[33rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        {/* Dhak: right bottom corner - in the Durga Puja section (desktop only) */}
        <img
          src="/assets/dhak.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block -right-[1rem] top-[36rem] h-[20rem] opacity-55 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(12deg) translateX(20%)' }}
        />
        {/* Kans flowers: Bottom of the durga puja section */}
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[0] md:-right-[3%] top-[61.4rem] md:top-[50.5rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[12%] md:right-[4%] top-[61.4rem] md:top-[50.5rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[12%] top-[50.5rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[17%] top-[50.5rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[27%] top-[50.5rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[33%] top-[50.5rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[38%] top-[50.5rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[45%] md:right-[50%] top-[61.4rem] md:top-[50.5rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[55%] top-[50.5rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[71%] top-[50.5rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[77%] top-[50.5rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[60%] md:right-[83%] top-[61.4rem] md:top-[50.5rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[75%] md:right-[88%] top-[61.4rem] md:top-[50.5rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
      </>

      {/* ── Cultural Campaign decorative images — anchored to the section edge ── */}
      <>
        {/* <img
          src="/assets/banner-tribal.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block -left-[1rem] top-[65rem] h-[15rem] w-auto object-contain pointer-events-none select-none z-0 opacity-25"
        />
        <img
          src="/assets/banner-tribal.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block -right-[1rem] top-[65rem] h-[15rem] w-auto object-contain pointer-events-none select-none z-0 opacity-25"
        /> */}

        <img
          src="/assets/tribe-tree.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[0%] md:top-[88.5rem] md:h-[16rem] w-auto object-contain pointer-events-none select-none z-0 opacity-65"
        />
        <img
          src="/assets/tribe-3-man.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[1%] md:right-[10%] top-[102.5rem] md:top-[98.3rem] h-[4.5rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />
        <img
          src="/assets/tribe-2-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[19%] md:top-[98.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />

        <img
          src="/assets/elephant.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[27%] md:right-[25%] top-[101rem] md:top-[96.3rem] h-[5.5rem] md:h-[8rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />
        <img
          src="/assets/tribe-3-man.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[58%] md:right-[36%] top-[102.5rem] md:top-[98.3rem] md:top-[98.3rem] h-[4.5rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />

        <img
          src="/assets/tribe-2-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[47%] md:top-[98.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35 -rotate-6"
        />
        <img
          src="/assets/tribe-3-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[54%] md:top-[98.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />

        <img
          src="/assets/tribe-tree.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[85%] md:right-[62%] top-[100rem] md:top-[92.5rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0 opacity-65"
        />

        <img
          src="/assets/deer.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[75%] md:top-[98rem] md:h-[5.8rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35 -rotate-6"
        />
        <img
          src="/assets/deer.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[71.5%] md:top-[98rem] md:h-[5.8rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35 -rotate-6"
        />
        <img
          src="/assets/tribe-3-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[80%] md:top-[98.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />
        <img
          src="/assets/tribe-2-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[89%] md:top-[98.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />

        {/* Grass */}
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[0%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[0%] md:right-[10%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[20%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[27%] md:right-[30%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[40%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[50%] md:right-[50%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[60%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute md:right-[70%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[80%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[90%] md:right-[90%] top-[105.5rem] md:top-[102.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />

        {/* Tribal Tree */}
        {/* <img
          src="/assets/tribe-tree.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[87%] md:top-[70rem] md:h-[30rem] w-auto object-contain pointer-events-none select-none z-0 opacity-65"
        /> */}

        {/* Tribal Flower */}
        <img
          src="/assets/flower-design.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[-1rem] md:top-[66rem] h-[7rem] md:h-[10rem] w-auto object-contain pointer-events-none select-none z-0 opacity-40 rotate-180"
        />

        {/* Chakra */}
        {/* <img
          src="/assets/chakra.png"
          alt="chakra"
          aria-hidden="true"
          className="absolute left-[14%] md:-left-[15%] top-[67rem] md:top-[65rem] h-[20rem] md:h-[27rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ filter: 'saturate(0.7)' }}
        /> */}
      </>

      {/* ── Industries decorative images — anchored to the section edge ── */}
      {/* <>
        <img
          src="/assets/buildings.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute left-[30%] md:left-[77%] top-[116rem] md:top-[122.5rem] h-[25rem] md:h-[30rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
      </> */}

      {/* ── Cafe & Food decorative images — anchored to the section edge ── */}
      <>
        <img
          src="/assets/cafe.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute -left-[10%] md:-left-[9%] top-[153rem] md:top-[161rem] h-[20rem] md:h-[30rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/bulbs.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute left-[35%] md:left-[12%] top-[142.2rem] md:top-[145.8rem] h-[6rem] md:h-[10rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/lights.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute left-[80%] md:left-[60%] top-[141.5rem] md:top-[144.3rem] h-[6rem] md:h-[8rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0 opacity-25"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/lights.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute hidden md:block md:left-[38%] md:top-[144.3rem] h-[7rem] md:h-[8rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0 opacity-25"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/lights.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute hidden md:block md:left-[83%] md:top-[144.3rem] h-[7rem] md:h-[8rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0 opacity-25"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/cafe-board.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute hidden md:block md:-right-[2.7%] md:top-[150rem] md:h-[10rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/plants.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute hidden md:block md:-right-[10%] md:top-[172rem] md:h-[10rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
      </>

      {/* ── Banquet decorative images — anchored to the section edge ── */}
      <>
        <img
          src="/assets/light-1.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute left-[1%] md:-left-[1.2%] top-[211rem] md:top-[223.5rem] h-[11rem] md:h-[15rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/sitting.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute -left-[3%] md:-left-[4%] top-[235rem] md:top-[245rem] h-[13rem] md:h-[17rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/light-2.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute left-[60%] md:left-[65%] top-[207.3rem] md:top-[218.75rem] h-[4rem] md:h-[5rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/light-3.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute left-[75%] md:left-[70%] top-[208.6rem] md:top-[220.2rem] h-[7rem] md:h-[8rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/light-3.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute left-[85%] md:left-[74%] top-[208.6rem] md:top-[220.2rem] h-[7rem] md:h-[8rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        {/* <img
          src="/assets/flower-1.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute hidden md:block md:left-[94%] md:top-[245rem] md:h-[13rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        /> */}
      </>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-[#072541] leading-none">
              Our Other <span className="text-[#e95f0c]">Work</span>
            </h2>
            <p className="text-[#4a5568] text-base mt-4 max-w-lg leading-relaxed">
              Premium campaigns and media collections for cultural festivals, theatre groups, corporate operations, and hospitality brands.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm bg-[#072541] text-white hover:bg-[#e95f0c] transition-all duration-300 shadow-lg shadow-[#072541]/20 shrink-0"
          >
            See Full Portfolio <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* List of category sections */}
        <div className="space-y-12">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              isDurgaPuja={category.id === 'durga-puja'}
              isCultural={category.id === 'cultural-campaign'}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
