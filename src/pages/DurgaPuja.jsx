import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight, PhoneCall, ArrowUpRight } from 'lucide-react';
import { sanityClient } from '../sanity/client';
import { PORTFOLIO_ALL_QUERY } from '../sanity/queries';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

// ─── STATIC DATA FOR CLUBS ───────────────────────────────────────────────────
const CLUBS = [
  {
    name: 'Suruchi Sangha',
    logo: '/client_logos/Suruchi_Sangha-logo.png',
    work: 'Comprehensive digital campaign management, cinematic theme storytelling reels, real-time social handle coverage, and sponsor spotlight highlights.',
    testimonial: 'Unevox transformed our digital presence. Their cinematic reels captured the true art and soul of our theme, making our pandal go viral across Bengal.',
  },
  {
    name: 'Behala Nutan Dal',
    logo: '/client_logos/behala_nutan_dal-logo.png',
    work: 'In-depth craft documentary, architectural lighting showcase reels, and countdown creative design.',
    testimonial: 'The theme documentary created by Unevox was exceptional. They beautifully highlighted the tireless efforts of our artists and craftsmen.',
  },
  {
    name: 'Behala SS Sporting Club',
    logo: '/client_logos/behala_ss_sporting_club-logo.png',
    work: 'Real-time crowd engagement, high-octane daily summaries, and interactive visitor contest curation.',
    testimonial: 'Superb dedication from the team. Their live coverage kept our global audience connected and engaged with the pandal throughout the five days.',
  },
  {
    name: 'Tarun Matri Sevak Samity',
    logo: '/client_logos/tarun_matri_sevak_samity-logo.png',
    work: 'Cinematic teaser release, digital visitor guide maps, and VIP visit coverage highlights.',
    testimonial: 'Outstanding execution. Their sports-agency style pace and high-production value drove massive traffic to our social pages.',
  },
];

// ─── WHY PUJA CAMPAIGNS INFO CARDS ──────────────────────────────────────────
const WHY_CARDS = [
  { title: 'Reach Audiences Beyond the Venue', desc: 'Connect with millions of devotees globally who cannot visit the physical pandal.' },
  { title: 'Build a Strong Digital Identity', desc: 'Establish your club as a digital-first cultural landmark with premium content.' },
  { title: 'Showcase Theme and Creativity', desc: 'Highlight the meticulous craftsmanship, clay modeling, and artistic details.' },
  { title: 'Increase Social Engagement', desc: 'Drive viral conversations, comments, and shares across Instagram, YouTube, and Facebook.' },
  { title: 'Content That Lasts Beyond the Festival', desc: 'Archive your puja\'s legacy forever with professional, high-definition media assets.' },
  { title: 'Build a Recognizable Brand Year After Year', desc: 'Build anticipation and attract premium sponsorship deals with consistent year-on-year growth.' },
];

// ─── STATS RESULTS ──────────────────────────────────────────────────────────
const STATS = [
  { value: '10L+', label: 'Audience Interactions' },
  { value: '2M+', label: 'Total Campaign Views' },
  { value: '800+', label: 'Content Pieces Produced' },
  { value: '40%+', label: 'Engagement Rate Growth' },
];

// ─── STATIC MEDIA CONTENT DEFINITIONS ───────────────────────────────────────
const STATIC_DOCUMENTARIES = [
  { id: 'static-doc-1', name: 'Behind the Art of Suruchi Sangha', type: 'video', url: '/media/durga-puja/durga-5.mp4', aspect: 'portrait' },
  { id: 'static-doc-2', name: 'The Making of Kumartuli Clay', type: 'video', url: '/media/cultural/theatre-fest-1.mp4', aspect: 'portrait' },
];

const STATIC_REELS = [
  { id: 'static-reel-1', name: 'Vibrant Sindur Khela Reels', type: 'video', url: '/media/durga-puja/durga-5.mp4', aspect: 'portrait' },
  { id: 'static-reel-2', name: 'Dhak Beats Live Showcase', type: 'video', url: '/media/cultural/classical-fest-2.mp4', aspect: 'portrait' },
  { id: 'static-reel-3', name: 'Maha Aarti Festive Devotion', type: 'video', url: '/media/cultural/classical-fest-3.mp4', aspect: 'portrait' },
];

const STATIC_PHOTOGRAPHY = [
  { id: 'static-photo-1', name: 'Suruchi Sangha Divine Protima', type: 'photo', url: '/media/durga-puja/durga-1.jpg', aspect: 'wide' },
  { id: 'static-photo-2', name: 'Architectural Details Behala Nutan Dal', type: 'photo', url: '/media/durga-puja/durga-2.jpg', aspect: 'tall' },
  { id: 'static-photo-3', name: 'Pandal Lighting Glow at Night', type: 'photo', url: '/media/durga-puja/durga-3.jpg', aspect: 'landscape' },
];

const STATIC_GRAPHICS = [
  { id: 'static-graphic-1', name: 'Subho Nabami Greeting Creative', type: 'graphics', url: '/media/durga-puja/durga-4-g.jpg', aspect: 'portrait' },
  { id: 'static-graphic-2', name: 'Ashtami Countdown Digital Art', type: 'graphics', url: 'https://images.unsplash.com/photo-1620121470810-64418f75d5b0?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
  { id: 'static-graphic-3', name: 'Puja Announcement Invitation', type: 'graphics', url: 'https://images.unsplash.com/photo-1561361062-856753540121?auto=format&fit=crop&w=600&q=80', aspect: 'square' },
];

const STATIC_FILMS = [
  { id: 'static-film-1', name: 'Utsav - The Soul of Kolkata', type: 'video', url: '/media/durga-puja/durga-5.mp4', aspect: 'portrait' },
  { id: 'static-film-2', name: 'Pride of Behala Cultural Heritage', type: 'video', url: '/media/cultural/classical-fest-1.mp4', aspect: 'wide' },
];

// ─── MULTI-MARQUEE CLIENT LOGOS ──────────────────────────────────────────────
const MARQUEE_LOGOS = [
  '/client_logos/Suruchi_Sangha-logo.png',
  '/client_logos/behala_nutan_dal-logo.png',
  '/client_logos/behala_ss_sporting_club-logo.png',
  '/client_logos/tarun_matri_sevak_samity-logo.png',
];

export default function DurgaPuja({ onBookCall }) {
  const [sanityItems, setSanityItems] = useState([]);
  const [lightboxState, setLightboxState] = useState({ isOpen: false, items: [], index: 0 });

  useEffect(() => {
    async function fetchSanityPuja() {
      try {
        const data = await sanityClient.fetch(PORTFOLIO_ALL_QUERY);
        const items = (data ?? []).filter((item) => item.category === 'durga-puja');
        setSanityItems(items);
      } catch (err) {
        console.error('Failed to fetch Durga Puja items from Sanity:', err);
      }
    }
    fetchSanityPuja();
  }, []);

  // Classify sanity items based on type, aspect and name
  const sanityVideos = sanityItems.filter((i) => i.type === 'video');
  const sanityImages = sanityItems.filter((i) => i.type === 'photo' || i.type === 'image' || i.type === 'graphics');

  const sanityDoc = sanityVideos.filter((i) => i.name.toLowerCase().includes('doc') || i.name.toLowerCase().includes('behind'));
  const sanityReels = sanityVideos.filter((i) => i.aspect === 'portrait' || i.aspect === 'tall');
  const sanityFilms = sanityVideos.filter((i) => !sanityReels.includes(i) && !sanityDoc.includes(i));
  const sanityGraphics = sanityImages.filter((i) => i.type === 'graphics' || i.name.toLowerCase().includes('graphic') || i.name.toLowerCase().includes('post') || i.url.includes('-g.'));
  const sanityPhoto = sanityImages.filter((i) => !sanityGraphics.includes(i));

  // Merge static & sanity items safely
  const documentaries = [...sanityDoc, ...STATIC_DOCUMENTARIES];
  const reels = [...sanityReels, ...STATIC_REELS];
  const photography = [...sanityPhoto, ...STATIC_PHOTOGRAPHY];
  const graphics = [...sanityGraphics, ...STATIC_GRAPHICS];
  const films = [...sanityFilms, ...STATIC_FILMS];

  const handleOpenLightbox = (items, index) => {
    setLightboxState({ isOpen: true, items, index });
  };

  const handleCloseLightbox = () => {
    setLightboxState({ isOpen: false, items: [], index: 0 });
  };

  const handlePrev = () => {
    setLightboxState((prev) => ({ ...prev, index: Math.max(0, prev.index - 1) }));
  };

  const handleNext = () => {
    setLightboxState((prev) => ({ ...prev, index: Math.min(prev.items.length - 1, prev.index + 1) }));
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Durga Puja Digital Campaigns",
    "serviceType": "Digital Media Production & Campaign Management",
    "provider": {
      "@type": "Organization",
      "name": "Unevox",
      "url": "https://unevox.com"
    },
    "areaServed": "Kolkata, West Bengal",
    "description": "Premium cinematic videography, professional documentary, reels, and digital campaign management for Kolkata Durga Puja Clubs."
  };

  return (
    <div className="relative w-full bg-[#f8f5f2] overflow-hidden">
      <SEO
        title="Durga Puja Campaigns | Unevox"
        description="Transform your Puja celebrations into premium digital experiences. Unevox specializes in cinematic storytelling, documentaries, short-form reels, graphics and digital strategy for Kolkata's top Durga Puja clubs."
        canonicalUrl="https://unevox.com/durga-puja"
        structuredData={schemaData}
      />

      {/* Decorative Bengali Motif accents */}
      <div className="absolute top-10 right-4 w-48 h-48 opacity-10 pointer-events-none select-none">
        <img src="/assets/kans-flower.png" alt="Kans Flower Accent" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-[35%] left-4 w-40 h-40 opacity-15 pointer-events-none select-none">
        <img src="/assets/durga-maa.png" alt="Durga Maa Accent" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-[65%] right-4 w-40 h-40 opacity-10 pointer-events-none select-none">
        <img src="/assets/dhak.png" alt="Dhak Accent" className="w-full h-full object-contain" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-6 bg-gradient-to-br from-[#072541] via-[#0b2f52] to-[#0e3a61] text-white">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <video
            src="/media/durga-puja/durga-5.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#072541] via-transparent to-[#072541]/80 z-1" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e95f0c]/20 border border-[#e95f0c]/30 text-[#e95f0c] text-xs uppercase tracking-widest font-display font-extrabold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e95f0c] animate-pulse" />
            {`Durga Puja Campaigns`}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1] uppercase">
            {`Turning Puja Celebrations`} <br className="hidden md:inline" />
            <span className="text-[#e95f0c]">{`Into Digital Experiences`}</span>
          </h1>
          <p className="text-white/80 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Unevox brings high-octane storytelling, cinematic production, and professional digital management to Kolkata's most iconic Durga Puja committees. We amplify your theme, connect with the global diaspora, and drive massive social engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookCall}
              className="btn-primary w-full sm:w-auto px-8 py-4 text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#e95f0c]/30"
            >
              <PhoneCall className="w-5 h-5" />
              {`Start Your Puja Campaign`}
            </button>
            <a
              href="#clubs"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-display font-bold text-base hover:bg-white/10 transition-colors text-center cursor-pointer"
            >
              {`See Our Work`}
            </a>
          </div>
        </div>
      </section>

      {/* Clubs Testimonials Section */}
      <section id="clubs" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="section-badge inline-flex mb-3 bg-[#e95f0c]/10 text-[#e95f0c] border border-[#e95f0c]/20">
            {`Our Collaborations`}
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#072541] mb-4">
            {`KOLKATA'S PROUD PUJA CLUBS`}
          </h2>
          <p className="text-[#4a5568] max-w-2xl mx-auto text-sm sm:text-base">
            We partner with the city's finest creators to transform magnificent physical pandals into interactive global narratives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CLUBS.map((club) => (
            <div
              key={club.name}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#e2dbd3] hover:border-[#e95f0c] transition-all duration-300 hover:shadow-xl group flex flex-col justify-between"
            >
              <div className="absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <span className="font-serif text-7xl font-extrabold text-[#e95f0c]">“</span>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#f8f5f2] border border-[#e2dbd3] p-1 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img src={club.logo} alt={club.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-[#072541]">
                      {club.name}
                    </h3>
                    <p className="text-xs text-[#e95f0c] uppercase font-bold tracking-wider">{`Campaign Partner`}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#072541]/60 tracking-wider block mb-1">{`Scope of Work`}:</span>
                    <p className="text-[#4a5568] text-sm leading-relaxed">{club.work}</p>
                  </div>
                  <blockquote className="border-l-4 border-[#e95f0c] pl-4 italic text-[#072541] text-sm leading-relaxed bg-[#f8f5f2]/40 py-2 pr-2 rounded-r-xl">
                    {club.testimonial}
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info / Why Section */}
      <section className="py-20 bg-[#072541] text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(233,95,12,0.15),transparent)] z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-badge inline-flex mb-3 bg-[#e95f0c]/20 text-[#e95f0c] border border-[#e95f0c]/30">
              {`Why Professional Digital Coverage?`}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4 uppercase">
              {`AMPING UP THE FESTIVITY`}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
              Durga Puja is a global carnival. Elevating it online requires a highly dynamic, swift, and cinematic approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CARDS.map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e95f0c]/40 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e95f0c]/20 border border-[#e95f0c]/30 flex items-center justify-center text-[#e95f0c] font-display font-extrabold text-lg mb-5 group-hover:scale-110 transition-transform">
                  {`0${i + 1}`}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#e95f0c] transition-colors">
                  {card.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#e95f0c] mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#072541] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slider Content Subsections */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-24 relative z-10">
        <ContentSliderSection
          label="DOCUMENTARY"
          heading="Behind the Art"
          description="In-depth theme coverage and interviews with kumartuli idol makers and pandal architects."
          items={documentaries}
          onOpenLightbox={handleOpenLightbox}
        />
        <ContentSliderSection
          label="REELS & SHORTS"
          heading="Vibrant Festive Energy"
          description="High-energy, fast-cut vertical short clips showcasing local rituals, dhak beats, and crowds."
          items={reels}
          onOpenLightbox={handleOpenLightbox}
        />
        <ContentSliderSection
          label="PHOTOGRAPHY"
          heading="The Festive Canvas"
          description="High-definition landscape and portrait shots of the deity, art displays, and candid devotions."
          items={photography}
          onOpenLightbox={handleOpenLightbox}
        />
        <ContentSliderSection
          label="CREATIVE GRAPHICS"
          heading="Digital Brand Canvas"
          description="Stunning social creatives, countdown posts, announcements and festival greetings."
          items={graphics}
          onOpenLightbox={handleOpenLightbox}
        />
        <ContentSliderSection
          label="CAMPAIGN FILMS"
          heading="Cinematic Storytelling"
          description="Widescreen, premium brand narrative films celebrating the core social messages of the puja."
          items={films}
          onOpenLightbox={handleOpenLightbox}
        />
      </section>

      {/* Scrolling Client Marquee */}
      <section className="py-12 bg-white border-y border-[#e2dbd3] overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <p className="text-xs uppercase font-extrabold text-[#072541]/60 tracking-widest">{`Featured Campaign Partners`}</p>
        </div>
        <div className="relative w-full overflow-hidden flex flex-col justify-center">
          {/* Loop marquee container */}
          <div className="flex gap-20 items-center justify-start whitespace-nowrap animate-marquee py-2 select-none pointer-events-none">
            {/* Duplicated list to prevent blank gaps */}
            {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt="Puja Client Logo"
                className="h-16 sm:h-20 w-auto object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-[#072541] to-[#0e3a61] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,95,12,0.15),transparent)] z-0" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 uppercase">
            {`Make Your Puja Unforgettable`}
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Secure premium digital presence and professional media storytelling. Book your slots for the upcoming festive season before campaigns fill up.
          </p>
          <button
            onClick={onBookCall}
            className="btn-primary px-8 py-4 text-base flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg shadow-[#e95f0c]/30"
          >
            <PhoneCall className="w-5 h-5" />
            {`Plan Your Puja Campaign`}
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxState.isOpen && (
        <Lightbox
          items={lightboxState.items}
          index={lightboxState.index}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

// ─── LOCAL CONTENT SLIDER COMPONENT ──────────────────────────────────────────
function ContentSliderSection({ label, heading, description, items, onOpenLightbox }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="border-b border-[#e2dbd3]/60 pb-12 last:border-b-0 last:pb-0">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold text-[#e95f0c] tracking-widest block mb-2">
            {label}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mb-2">
            {heading}
          </h3>
          <p className="text-[#4a5568] text-xs sm:text-sm leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

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

      <div
        ref={scrollRef}
        className="relative z-10 flex items-center gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <div key={item.id} className="snap-start" onClick={() => onOpenLightbox(items, idx)}>
            <MediaCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOCAL MEDIA CARD COMPONENT ──────────────────────────────────────────────
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
            muted
            className="absolute inset-0 w-full h-full object-cover duration-300"
          />
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

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 z-20">
        <p className="text-white text-xs sm:text-sm font-display font-bold leading-tight drop-shadow-sm truncate">
          {item.name}
        </p>
      </div>
    </div>
  );
}

// ─── LOCAL LIGHTBOX COMPONENT ────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/96" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#e95f0c] hover:border-[#e95f0c] transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>

      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#e95f0c] hover:border-[#e95f0c] transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {index < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#e95f0c] hover:border-[#e95f0c] transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div
        className="relative flex items-center justify-center w-full h-full px-20 py-12"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <video
            key={item.id}
            src={item.url}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-[80vh] rounded-xl shadow-2xl"
          />
        ) : (
          <img
            key={item.id}
            src={item.url}
            alt={item.name}
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/90 z-20">
          <p className="font-display font-bold text-lg sm:text-xl drop-shadow">{item.name}</p>
        </div>
      </div>
    </div>
  );
}
