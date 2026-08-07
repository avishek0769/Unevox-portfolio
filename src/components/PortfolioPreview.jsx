import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const otherCategories = [
  {
    id: 'durga-puja',
    categoryName: 'Durga Puja Campaign',
    description: 'Capturing the grandeur, themes, and emotional devotion of Kolkata\'s biggest street festival across top community pandals.',
    works: [
      {
        id: 'dp-1',
        name: 'Forum Suruchi',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80',
        aspect: 'portrait',
      },
      {
        id: 'dp-2',
        name: 'Behala Nutan Dal',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=600&q=80',
        aspect: 'portrait',
      },
      {
        id: 'dp-3',
        name: 'Newtown Pandal',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1561361062-856753540121?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'dp-4',
        name: 'Behala Club',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1620121470810-64418f75d5b0?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'dp-5',
        name: 'TMSS Puja',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=600&q=80',
        aspect: 'portrait',
      }
    ]
  },
  {
    id: 'cultural-campaign',
    categoryName: 'Cultural Campaign',
    description: 'Promotional campaigns, cinematic summaries, and content curation for prominent classical arts, theater, and music events.',
    works: [
      {
        id: 'cc-1',
        name: 'Classical Festival',
        type: 'video',
        url: '/reels/portrait-reel.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-2',
        name: 'Theatre Fest',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
        aspect: 'portrait',
      },
      {
        id: 'cc-3',
        name: 'Bachonik Utsav',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'cc-4',
        name: 'Shailosik Theatre',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=600&q=80',
        aspect: 'portrait',
      },
      {
        id: 'cc-5',
        name: 'Godhuli Gogone',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=600&q=80',
        aspect: 'portrait',
      }
    ]
  },
  {
    id: 'industries',
    categoryName: 'Industries',
    description: 'Premium corporate messaging, branding materials, industrial documentaries, and product summaries.',
    works: [
      {
        id: 'ind-1',
        name: 'Ripley Group',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'ind-2',
        name: 'Creative Videos',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'ind-3',
        name: 'Vision AV',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'ind-4',
        name: 'Smile Events',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'ind-5',
        name: 'Economic Times',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
        aspect: 'portrait',
      },
      {
        id: 'ind-6',
        name: 'Economic Times',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      }
    ]
  },
  {
    id: 'education',
    categoryName: 'Education',
    description: 'Promotional content, online course graphics, and student spotlight documentaries for leading learning networks.',
    works: [
      {
        id: 'edu-1',
        name: 'Upgrad Kolkata',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'edu-2',
        name: 'Upgrad Kolkata',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      }
    ]
  },
  {
    id: 'cafe-food',
    categoryName: 'Cafe & Food',
    description: 'Stunning commercial food styling, restaurant ambiance shoots, and culinary highlight clips.',
    works: [
      {
        id: 'cf-1',
        name: 'Krysalis Cafe',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'cf-2',
        name: 'Shoreline Bistro',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'cf-3',
        name: 'Maharaja Caterer',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'cf-4',
        name: 'Sree Lakshmi Caterer',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      }
    ]
  },
  {
    id: 'banquets',
    categoryName: 'Banquets',
    description: 'Immersive venue tours and premium event decor photography for wedding and luxury corporate spaces.',
    works: [
      {
        id: 'bq-1',
        name: 'Rainbow Banquet',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      }
    ]
  }
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
      return 'w-[11rem] sm:w-[15rem] aspect-[3/4]';
    }
    if (item.aspect === 'landscape' || item.aspect === 'video') {
      return 'w-[15rem] sm:w-[17rem] aspect-[16/10]';
    }
    return 'w-[12rem] sm:w-[16rem] aspect-square';
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
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
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
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
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

function CategorySection({ category }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-14 last:mb-0 border-b border-[#e2dbd3]/60 pb-8 last:border-b-0 last:pb-0">
      {/* Category header & navigation arrows */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div className="max-w-2xl">
          <h3 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mb-2">
            {category.categoryName}
          </h3>
          <p className="text-[#4a5568] text-xs sm:text-sm leading-relaxed max-w-xl">
            {category.description}
          </p>
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
        className="flex items-center gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
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
  return (
    <section className="py-24 bg-[#f8f5f2] border-t border-[#e2dbd3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
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
          {otherCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>

      </div>
    </section>
  );
}
