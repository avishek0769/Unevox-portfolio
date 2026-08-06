import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const otherProjects = [
  {
    id: 'behala-classical-festival',
    clientName: 'Behala Classical Festival',
    category: 'Cultural Events',
    description: 'Unevox is privileged to be associated with the prestigious Behala Classical Festival, a cultural extravaganza celebrating classical music and dance. Our comprehensive media strategy and high-quality social media content amplify the festival\'s reach, transforming performances into a digital spectacle.',
    media: [
      {
        id: 'bcf-m1',
        type: 'video',
        url: '/reels/potrait-reel.mp4',
        aspect: 'portrait',
        title: 'Artist Backstage Diary',
      },
      {
        id: 'bcf-m2',
        type: 'video',
        url: '/reels/square-type-reel.mp4',
        aspect: 'square',
        title: 'Live Raga Showcase',
      },
      {
        id: 'bcf-m3',
        type: 'image',
        url: 'https://instagram.fccu31-2.fna.fbcdn.net/v/t51.82787-15/766465159_18465576463119165_5715035789826230194_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=110&_nc_map=urlgen_bucketless&ig_cache_key=Mzk1NzcxNzEwODIzNDQ5MzQ5Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMjgzOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=kiLznT-dd_EQ7kNvwH7xDLx&_nc_oc=AdoCfYF9lGpzJpjuGVa0iWxyNse5BHtJAhIqKi0WNyFjO8X8mZFA9a4kIa1rWp68w_k&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fccu31-2.fna&_nc_gid=ai2KmdEsXoVtc5R5JbLeoQ&_nc_ss=7a22e&oh=00_AQG_o6rt6ry2dsRduqBvSwmaXDK27W6kKqKoXPeHRecwkg&oe=6A7A6704',
        aspect: 'potrait',
        title: 'Performance Stage Setting',
      },
      {
        id: 'bcf-m4',
        type: 'image',
        url: 'https://instagram.fccu31-2.fna.fbcdn.net/v/t51.82787-15/766465159_18465576463119165_5715035789826230194_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=110&_nc_map=urlgen_bucketless&ig_cache_key=Mzk1NzcxNzEwODIzNDQ5MzQ5Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMjgzOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=kiLznT-dd_EQ7kNvwH7xDLx&_nc_oc=AdoCfYF9lGpzJpjuGVa0iWxyNse5BHtJAhIqKi0WNyFjO8X8mZFA9a4kIa1rWp68w_k&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fccu31-2.fna&_nc_gid=ai2KmdEsXoVtc5R5JbLeoQ&_nc_ss=7a22e&oh=00_AQG_o6rt6ry2dsRduqBvSwmaXDK27W6kKqKoXPeHRecwkg&oe=6A7A6704',
        aspect: 'square',
        title: 'Vocalist Close-up Shot',
      }
    ]
  },
  {
    id: 'cafe-krysalis',
    clientName: 'Café Krysalis',
    category: 'Hospitality & Branding',
    description: 'Social channel management, commercial food styling photography, and organic video marketing campaigns for Café Krysalis, highlighting the space as Kolkata\'s premier aesthetic culinary destination.',
    media: [
      {
        id: 'ck-m2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        aspect: 'video',
        title: 'Café Aesthetic Interiors',
      },
      {
        id: 'ck-m3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
        aspect: 'square',
        title: 'Gourmet Plates Shoot',
      }
    ]
  },
  {
    id: 'ripley-group',
    clientName: 'Ripley Group',
    category: 'Corporate Media',
    description: 'Corporate documentary production detailing shipping and container transport services. We captured large-scale logistics operations, heavy cargo handling, and harbor operations.',
    media: [
      {
        id: 'rg-m2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        aspect: 'video',
        title: 'Ripley Cargo Operations',
      },
      {
        id: 'rg-m3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        aspect: 'square',
        title: 'Port Containers Landscape',
      }
    ]
  },
  {
    id: 'durga-puja-campaigns',
    clientName: 'Durga Puja Campaigns',
    category: 'Festival Media & Cultural Events',
    description:
      'Unevox partners with some of Kolkata’s most renowned Durga Puja committees, delivering end-to-end media coverage, social media management, cinematic reels, photography, promotional creatives, and real-time event storytelling. Through visually compelling content and strategic digital campaigns, we help transform each celebration into a memorable digital experience while amplifying audience engagement and cultural reach.',
    media: [
      {
        id: 'dpc-m1',
        type: 'image',
        url: 'https://www.esamskriti.com/essays/docfile/8_6742.jpg',
        aspect: 'square',
        title: 'Durga Puja Cinematic Reel',
      },
      {
        id: 'dpc-m2',
        type: 'image',
        url: 'https://i.pinimg.com/736x/d5/9e/72/d59e728d2d44e1f83aa3c113d61e4686.jpg',
        aspect: 'potrait',
        title: 'Festival Highlight Film',
      },
      {
        id: 'dpc-m3',
        type: 'image',
        url: 'https://c9admin.cottage9.com/uploads/2401/A-Comprehensive-Guide-to-Maa-Durga-Puja-Rituals-and-Significance.jpg',
        aspect: 'square',
        title: 'Durga Puja Photography',
      },
      {
        id: 'dpc-m4',
        type: 'image',
        url: 'https://digpu.com/wp-content/uploads/2023/10/1-4.jpg',
        aspect: 'square',
        title: 'Pandal & Crowd Coverage',
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

  const getAspectClass = () => {
    if (item.aspect === 'portrait' || item.aspect === 'potrait') {
      return 'w-64 sm:w-72 aspect-[3/4]';
    }
    return 'w-80 sm:w-96 aspect-square';
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative shrink-0 rounded-3xl overflow-hidden border border-[#e2dbd3] bg-black hover:border-[#e95f0c] hover:shadow-2xl transition-all duration-300 group cursor-pointer ${getAspectClass()}`}
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
              className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${isPlaying
                ? 'opacity-0 scale-75'
                : 'opacity-100 scale-100 group-hover:scale-110 group-hover:bg-[#e95f0c] group-hover:border-[#e95f0c]'
                }`}
            >
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            </div>
          </div>
        </>
      ) : (
        <img
          src={item.url}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      )}
    </div>
  );
}

function ProjectSection({ project }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12 last:mb-0 border-b border-[#e2dbd3]/60 pb-5 last:border-b-0 last:pb-0">
      {/* Sub-Header & Scroll Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="max-w-3xl">
          <span className="text-[#e95f0c] text-xs font-display font-black uppercase tracking-widest block mb-2">
            {project.category}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mb-3">
            {project.clientName}
          </h3>
          <p className="text-[#4a5568] text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-2 shrink-0">
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
      </div>

      {/* Horizontal media slider */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 overflow-x-auto pb-6 scroll-smooth scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {project.media.map((item) => (
          <div key={item.id} className="snap-start">
            <MediaCard item={item} />
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
            <span className="section-badge mb-4 inline-flex">Beyond the Arena</span>
            <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-[#072541] leading-none">
              Our Other <span className="text-[#e95f0c]">Work</span>
            </h2>
            <p className="text-[#4a5568] text-base mt-4 max-w-lg leading-relaxed">
              Premium campaigns and media collections for cultural festivals, theatre groups, and corporate operations.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm bg-[#072541] text-white hover:bg-[#e95f0c] transition-all duration-300 shadow-lg shadow-[#072541]/20 shrink-0"
          >
            See Full Portfolio <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* List of project subsections */}
        <div className="space-y-16">
          {otherProjects.map((project) => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
