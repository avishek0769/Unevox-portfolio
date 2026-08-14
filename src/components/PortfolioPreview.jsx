import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const otherCategories = [
  {
    id: 'durga-puja',
    categoryName: 'Durga Puja Campaign',
    description: 'Unevox partners with some of Kolkata’s most renowned Durga Puja committees, delivering end-to-end media coverage, social media management, cinematic reels, photography, promotional creatives, and real-time event storytelling. Through visually compelling content and strategic digital campaigns, we help transform each celebration into a memorable digital experience while amplifying audience engagement and cultural reach.',
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
        id: 'cc-2',
        name: 'Behala Theatre Festival',
        type: 'video',
        url: '/media/cultural/theatre-fest-1.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-1',
        name: 'Beahala Classical Festival',
        type: 'video',
        url: '/media/cultural/classical-fest-3.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-3',
        name: 'Bachonik Utsav',
        type: 'video',
        url: '/media/cultural/bachonik-1.mp4',
        aspect: 'square',
      },
      {
        id: 'cc-4',
        name: 'Beahala Classical Festival',
        type: 'video',
        url: '/media/cultural/classical-fest-4.mp4',
        aspect: 'square',
      },
      {
        id: 'cc-5',
        name: 'Behala Theatre Festival',
        type: 'video',
        url: '/media/cultural/theatre-fest-2.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-6',
        name: 'Behala Theatre Festival',
        type: 'video',
        url: '/media/cultural/theatre-fest-3.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-7',
        name: 'Bachonik Utsav',
        type: 'video',
        url: '/media/cultural/bachonik-3.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-8',
        name: 'Shailosik Theatre',
        type: 'video',
        url: '/media/cultural/Godhuli-1.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-9',
        name: 'Shailosik Theatre',
        type: 'image',
        url: '/media/cultural/Godhuli-1-g.jpg',
        aspect: 'portrait',
      },
      {
        id: 'cc-10',
        name: 'Shailosik Theatre',
        type: 'video',
        url: '/media/cultural/Godhuli-2.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-11',
        name: 'Shailosik Theatre',
        type: 'image',
        url: '/media/cultural/Godhuli-2-g.jpg',
        aspect: 'portrait',
      },
      {
        id: 'cc-12',
        name: 'Shailosik Theatre',
        type: 'video',
        url: '/media/cultural/Godhuli-3.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-13',
        name: 'Shailosik Theatre',
        type: 'image',
        url: '/media/cultural/Godhuli-3-g.jpg',
        aspect: 'portrait',
      },
      {
        id: 'cc-14',
        name: 'Behala Theatre Festival',
        type: 'video',
        url: '/media/cultural/theatre-fest-4.mp4',
        aspect: 'portrait',
      },
      {
        id: 'cc-15',
        name: 'Bachonik Utsav',
        type: 'video',
        url: '/media/cultural/bachonik-4.mp4',
        aspect: 'portrait',
      },
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
      },
      {
        id: 'edu-3',
        name: 'Upgrad Kolkata',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
        aspect: 'square',
      },
      {
        id: 'edu-4',
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
      return 'w-[13rem] sm:w-[17rem] aspect-[3/4]';
    }
    if (item.aspect === 'landscape' || item.aspect === 'video') {
      return 'w-[15rem] sm:w-[18rem] aspect-[16/10]';
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
                ? 'scale-75'
                : 'scale-100 group-hover:scale-110 group-hover:bg-[#e95f0c] group-hover:border-[#e95f0c]'
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
          <p className="text-[#4a5568] text-xs sm:text-sm leading-relaxed">
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
          className="absolute hidden md:block -right-[1rem] top-[33rem] h-[20rem] opacity-55 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(12deg) translateX(20%)' }}
        />
        {/* Kans flowers: Bottom of the durga puja section */}
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[0] md:-right-[3%] top-[59rem] md:top-[48rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[12%] md:right-[4%] top-[59rem] md:top-[48rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[12%] top-[48rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[17%] top-[48rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[27%] top-[48rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[33%] top-[48rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[38%] top-[48rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[45%] md:right-[50%] top-[59rem] md:top-[48rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[55%] top-[48rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[71%] top-[48rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block right-[77%] top-[48rem] h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[60%] md:right-[83%] top-[59rem] md:top-[48rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <img
          src="/assets/kans-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[75%] md:right-[88%] top-[59rem] md:top-[48rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0"
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
          className="absolute hidden md:block right-[80%] md:right-[0%] top-[97.5rem] md:top-[85.5rem] h-[4.5rem] md:h-[16rem] w-auto object-contain pointer-events-none select-none z-0 opacity-65"
        />
        <img
          src="/assets/tribe-3-man.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[1%] md:right-[10%] top-[97.5rem] md:top-[95.3rem] h-[4.5rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />
        <img
          src="/assets/tribe-2-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[19%] md:top-[95.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />

        <img
          src="/assets/elephant.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[27%] md:right-[25%] top-[96.5rem] md:top-[93.3rem] h-[5.5rem] md:h-[8rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />
        <img
          src="/assets/tribe-3-man.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[58%] md:right-[36%] top-[97.5rem] md:top-[95.3rem] md:top-[95.3rem] h-[4.5rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />

        <img
          src="/assets/tribe-2-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[47%] md:top-[95.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35 -rotate-6"
        />
        <img
          src="/assets/tribe-3-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[54%] md:top-[95.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />

        <img
          src="/assets/tribe-tree.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[85%] md:right-[62%] top-[95rem] md:top-[89.5rem] h-[7rem] md:h-[12rem] w-auto object-contain pointer-events-none select-none z-0 opacity-65"
        />

        <img
          src="/assets/deer.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[75%] md:top-[95rem] md:h-[5.8rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35 -rotate-6"
        />
        <img
          src="/assets/deer.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[71.5%] md:top-[95rem] md:h-[5.8rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35 -rotate-6"
        />
        <img
          src="/assets/tribe-3-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[80%] md:top-[95.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />
        <img
          src="/assets/tribe-2-man.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[89%] md:top-[95.3rem] md:h-[6rem] w-auto object-contain pointer-events-none select-none z-0 opacity-35"
        />

        {/* Grass */}
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[0%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[0%] md:right-[10%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[20%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[27%] md:right-[30%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[40%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[50%] md:right-[50%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[60%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute md:right-[70%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute hidden md:block md:right-[80%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
        />
        <img
          src="/assets/grass.png"
          alt=""
          aria-hidden="true"
          className="absolute right-[90%] md:right-[90%] top-[100.5rem] md:top-[99.3rem] h-[2rem] md:h-[3rem] w-auto object-contain pointer-events-none select-none z-0 opacity-45"
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
          className="absolute hidden md:block right-[-1rem] md:top-[63rem] h-[7rem] md:h-[10rem] w-auto object-contain pointer-events-none select-none z-0 opacity-40 rotate-180"
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

      {/* ── Cafe decorative images — anchored to the section edge ── */}
      {/* <>
        <img
          src="/assets/food-front.png"
          alt="food-front"
          aria-hidden="true"
          className="absolute hidden md:block left-[34%] md:-left-[4%] top-[128rem] md:top-[185rem] h-[25rem] md:h-[25rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
        <img
          src="/assets/food-side.png"
          alt="food-side"
          aria-hidden="true"
          className="absolute left-[34%] md:left-[80%] top-[162rem] md:top-[161rem] h-[22rem] md:h-[24rem] opacity-65 w-auto object-contain pointer-events-none select-none z-0"
          style={{ transform: 'translateY(-50%) translateX(-30%)', filter: 'saturate(0.7)' }}
        />
      </> */}

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
          {otherCategories.map((category) => (
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
