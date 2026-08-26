import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight, PhoneCall, ArrowUpRight, Globe, Sparkles, Tv, TrendingUp, Award, ShieldCheck } from 'lucide-react';
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
];

// ─── WHY PUJA CAMPAIGNS INFO CARDS ──────────────────────────────────────────
const WHY_CARDS = [
  { icon: Globe, title: 'Reach Audiences Beyond the Venue', desc: 'Connect with millions of devotees globally who cannot visit the physical pandal.' },
  { icon: Sparkles, title: 'Build a Strong Digital Identity', desc: 'Establish your club as a digital-first cultural landmark with premium content.' },
  { icon: Tv, title: 'Showcase Theme and Creativity', desc: 'Highlight the meticulous craftsmanship, clay modeling, and artistic details.' },
  { icon: TrendingUp, title: 'Increase Social Engagement', desc: 'Drive viral conversations, comments, and shares across Instagram, YouTube, and Facebook.' },
  { icon: Award, title: 'Content That Lasts Beyond the Festival', desc: 'Archive your puja\'s legacy forever with professional, high-definition media assets.' },
  { icon: ShieldCheck, title: 'Build a Recognizable Brand Year After Year', desc: 'Build anticipation and attract premium sponsorship deals with consistent year-on-year growth.' },
];

// ─── CLUB-SPECIFIC RESULTS ──────────────────────────────────────────────────
const CLUB_RESULTS = [
  {
    name: 'Suruchi Sangha',
    logo: '/client_logos/Suruchi_Sangha-logo.png',
    campaign: 'Cinematic Narrative Campaign',
    desc: 'Complete digital strategy & theme storytelling launch. The thematic teaser went viral across social media channels, drawing unprecedented footfall.',
    stats: [
      { value: '2.4M+', label: 'Total Views' },
      { value: '1.2M+', label: 'Reach' },
      { value: '+45%', label: 'Engagement' },
    ]
  },
  {
    name: 'Behala Nutan Dal',
    logo: '/client_logos/behala_nutan_dal-logo.png',
    campaign: 'Art & Craft Documentary Series',
    desc: 'An in-depth, artistic video feature profiling the sculptors and pandal planners. Widely shared by design and heritage forums.',
    stats: [
      { value: '1800+', label: 'Facebook Followers in a month' },
      { value: '1300+', label: 'Instagram Followers in a month' },
      { value: '600K+', label: 'Profile Visits' },
    ]
  },
  // {
  //   name: 'Behala SS Sporting Club',
  //   logo: '/client_logos/behala_ss_sporting_club-logo.png',
  //   campaign: 'Real-Time Festive Recap',
  //   desc: 'Daily 60-second high-energy recaps of peak crowd interactions, VIP visitor experiences, and interactive audience contests.',
  //   stats: [
  //     { value: '1.6M+', label: 'Impressions' },
  //     { value: '+210%', label: 'Follower Growth' },
  //     { value: '150K+', label: 'Interactions' },
  //   ]
  // }
];

// ─── STATIC MEDIA CONTENT DEFINITIONS ───────────────────────────────────────
const STATIC_DOCUMENTARIES = [
  { id: 'doc-1', name: 'Behind the Art of Suruchi Sangha', type: 'video', url: '/media/durga-puja/doc-1.mp4', aspect: 'landscape' },
  { id: 'doc-2', name: 'The Making of Kumartuli Clay', type: 'video', url: '/media/durga-puja/doc-2.mp4', aspect: 'landscape' },
  { id: 'doc-2', name: 'The Making of Kumartuli Clay', type: 'video', url: '/media/durga-puja/doc-3.mp4', aspect: 'landscape' },
];

const STATIC_REELS = [
  { id: 'reel-1', name: 'Vibrant Sindur Khela Reels', type: 'video', url: '/media/durga-puja/durga-5.mp4', aspect: 'portrait' },
  { id: 'reel-2', name: 'Dhak Beats Live Showcase', type: 'video', url: '/media/cultural/classical-fest-2.mp4', aspect: 'portrait' },
  { id: 'reel-3', name: 'Maha Aarti Festive Devotion', type: 'video', url: '/media/cultural/classical-fest-3.mp4', aspect: 'portrait' },
];

const STATIC_PHOTOGRAPHY = [
  { id: 'photo-1', name: 'Suruchi Sangha Divine Protima', type: 'photo', url: '/media/durga-puja/durga-1.jpg', aspect: 'wide' },
  { id: 'photo-2', name: 'Architectural Details Behala Nutan Dal', type: 'photo', url: '/media/durga-puja/durga-2.jpg', aspect: 'tall' },
  { id: 'photo-3', name: 'Pandal Lighting Glow at Night', type: 'photo', url: '/media/durga-puja/durga-3.jpg', aspect: 'landscape' },
];

const STATIC_GRAPHICS = [
  { id: 'graphic-1', name: 'Subho Nabami Greeting Creative', type: 'graphics', url: '/media/durga-puja/durga-4-g.jpg', aspect: 'portrait' },
  { id: 'graphic-2', name: 'Ashtami Countdown Digital Art', type: 'graphics', url: 'https://images.unsplash.com/photo-1620121470810-64418f75d5b0?auto=format&fit=crop&w=600&q=80', aspect: 'landscape' },
  { id: 'graphic-3', name: 'Puja Announcement Invitation', type: 'graphics', url: 'https://images.unsplash.com/photo-1561361062-856753540121?auto=format&fit=crop&w=600&q=80', aspect: 'landscape' },
];

const STATIC_FILMS = [
  { id: 'film-1', name: 'Utsav - The Soul of Kolkata', type: 'video', url: '/media/durga-puja/durga-5.mp4', aspect: 'portrait' },
  { id: 'film-2', name: 'Pride of Behala Cultural Heritage', type: 'video', url: '/media/cultural/classical-fest-1.mp4', aspect: 'wide' },
];

// ─── MULTI-MARQUEE CLIENT LOGOS ──────────────────────────────────────────────
const MARQUEE_LOGOS = [
  '/client_logos/Suruchi_Sangha-logo.png',
  '/client_logos/behala_nutan_dal-logo.png',
  '/client_logos/behala_ss_sporting_club-logo.png',
  '/client_logos/tarun_matri_sevak_samity-logo.png',
];

export default function DurgaPuja({ onBookCall }) {
  const [lightboxState, setLightboxState] = useState({ isOpen: false, items: [], index: 0 });

  // Classify static items directly
  const documentaries = STATIC_DOCUMENTARIES;
  const reels = STATIC_REELS;
  const photography = STATIC_PHOTOGRAPHY;
  const graphics = STATIC_GRAPHICS;
  const films = STATIC_FILMS;

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
      {/* <div className="absolute top-10 right-4 w-48 h-48 opacity-10 pointer-events-none select-none">
        <img src="/assets/kans-flower.png" alt="Kans Flower Accent" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-[35%] left-4 w-40 h-40 opacity-15 pointer-events-none select-none">
        <img src="/assets/durga-maa.png" alt="Durga Maa Accent" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-[65%] right-4 w-40 h-40 opacity-10 pointer-events-none select-none">
        <img src="/assets/dhak.png" alt="Dhak Accent" className="w-full h-full object-contain" />
      </div> */}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-6 text-white">
        {/* Full-visibility background video */}
        <div className="absolute inset-0 z-0">
          <video
            src="/media/durga-puja/doc-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Very light blue-tinted vignette — same treatment as Home hero */}
        <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#000000bd] via-[#00000062] to-[#000000bd]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
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
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4 uppercase">
              {`Why Your Puja Needs a Digital Presence ?`}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
              Durga Puja is a global carnival. Elevating it online requires a highly dynamic, swift, and cinematic approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="relative p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e95f0c]/50 hover:bg-white/8 transition-all duration-300 group overflow-hidden"
                >
                  {/* Subtle glow accent on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e95f0c]/0 to-transparent group-hover:via-[#e95f0c]/70 transition-all duration-500" />
                  {/* Icon badge */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e95f0c]/30 to-[#e95f0c]/10 border border-[#e95f0c]/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-[#e95f0c]/50 transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#e95f0c]" strokeWidth={2} />
                  </div>
                  {/* Card number watermark */}
                  <span className="absolute top-5 right-6 font-display text-5xl font-black text-white/5 group-hover:text-white/8 transition-colors select-none leading-none">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#e95f0c] transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section — per-club performance */}
      <section className="py-24 px-6 bg-[#f8f5f2] relative z-10 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(233,95,12,0.06) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(7,37,65,0.05) 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs uppercase font-extrabold text-[#e95f0c] tracking-widest mb-3">CAMPAIGN RESULTS</p>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#072541] uppercase mb-4">Numbers That Speak</h2>
            <p className="text-[#4a5568] max-w-xl mx-auto text-sm sm:text-base">
              Real performance data from Unevox-powered campaigns across Kolkata's biggest puja clubs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CLUB_RESULTS.map((club, ci) => (
              <div key={ci} className="group relative rounded-3xl overflow-hidden bg-white border border-[#e2dbd3] hover:border-[#e95f0c]/40 hover:shadow-2xl transition-all duration-500">
                {/* Top accent gradient bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#e95f0c] via-[#ff8c42] to-[#e95f0c]" />
                <div className="p-7 sm:p-8">
                  {/* Club identity */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#f8f5f2] border border-[#e2dbd3] p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                      <img src={club.logo} alt={club.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-black text-[#072541] leading-tight">{club.name}</h3>
                      <p className="text-xs text-[#e95f0c] font-bold uppercase tracking-wider mt-0.5">{club.campaign}</p>
                    </div>
                  </div>

                  {/* Campaign description */}
                  <p className="text-[#4a5568] text-sm leading-relaxed mb-6 border-l-2 border-[#e2dbd3] pl-3 group-hover:border-[#e95f0c]/50 transition-colors">
                    {club.desc}
                  </p>

                  {/* Per-stat metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {club.stats.map((stat, si) => (
                      <div key={si} className="text-center bg-[#f8f5f2] rounded-2xl p-3 group-hover:bg-[#072541]/5 transition-colors">
                        <div className="font-display text-xl sm:text-2xl font-black text-[#e95f0c] tracking-tight leading-none mb-1">{stat.value}</div>
                        <div className="text-[10px] font-bold text-[#072541]/60 uppercase tracking-wider leading-tight">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slider Content Subsections */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12 relative z-10">
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
      <section className="py-14 bg-white border-y border-[#e2dbd3] overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-xs uppercase font-extrabold text-[#072541]/50 tracking-widest">{`Our Campaign Partners`}</p>
        </div>
        <div className="relative w-full overflow-hidden">
          {/* 4 copies so -25% CSS translate gives a perfect seamless loop */}
          <div className="flex gap-20 items-center whitespace-nowrap animate-marquee py-2 select-none pointer-events-none">
            {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt="Puja Partner Logo"
                className="h-16 sm:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
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
            {`Make Your Puja`} <br className="hidden md:inline" />
            <span className="text-[#e95f0c]">{`Unforgettable`}</span>
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
        {/* <p className="text-white text-xs sm:text-sm font-display font-bold leading-tight drop-shadow-sm truncate">
          {item.name}
        </p> */}
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
