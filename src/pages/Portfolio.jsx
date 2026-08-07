import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, X, ChevronLeft, ChevronRight, Phone, ArrowRight } from 'lucide-react';

// ─── CLIENT DATA ──────────────────────────────────────────────────────────────
// Each client has an id, display name, and media array.
// aspect: 'portrait'(9:16) | 'square'(1:1) | 'landscape'(16:9)
// type: 'image' | 'video'

const CLIENTS = [
  { id: 'all', name: 'All Clients' },
  { id: 'kkr', name: 'Kolkata Knight Riders' },
  { id: 'durand', name: 'Durand Cup' },
  { id: 'cfl25', name: 'CFL 2025' },
  { id: 'cfl24', name: 'CFL 2024' },
  { id: 'behala-cup', name: 'Behala Cup' },
  { id: 'bss', name: 'Behala SS Sporting Club' },
  { id: 'n24p', name: 'North 24 Parganas Football' },
  { id: 'playport', name: 'Playport Turf' },
  { id: 'bcf', name: 'Behala Classical Festival' },
  { id: 'godhuli', name: 'Godhuli Gagone' },
  { id: 'caesar', name: 'Caesar' },
  { id: 'krysalis', name: 'Café Krysalis' },
  { id: 'rainbow', name: 'Rainbow House Banquet' },
  { id: 'ripley', name: 'Ripley Group' },
  { id: 'upgrad', name: 'upGrad Kolkata' },
];

const ALL_MEDIA = [
  // ── KKR ──
  { id: 'kkr-1', clientId: 'kkr', type: 'image', aspect: 'landscape', span2: true, thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1920&q=90' },
  { id: 'kkr-2', clientId: 'kkr', type: 'image', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1920&q=90' },
  { id: 'kkr-3', clientId: 'kkr', type: 'video', aspect: 'portrait', thumbnail: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80', url: '/reels/portrait-reel.mp4' },
  // ── DURAND ──
  { id: 'durand-1', clientId: 'durand', type: 'video', aspect: 'portrait', thumbnail: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80', url: '/reels/portrait-reel.mp4' },
  { id: 'durand-2', clientId: 'durand', type: 'image', aspect: 'landscape', span2: true, thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=90' },
  { id: 'durand-3', clientId: 'durand', type: 'video', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80', url: '/reels/square-type-reel.mp4' },
  // ── CFL25 ──
  { id: 'cfl25-1', clientId: 'cfl25', type: 'video', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80', url: '/reels/square-type-reel.mp4' },
  { id: 'cfl25-2', clientId: 'cfl25', type: 'image', aspect: 'landscape', span2: true, thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=1920&q=90' },
  // ── CFL24 ──
  { id: 'cfl24-1', clientId: 'cfl24', type: 'image', aspect: 'landscape', thumbnail: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1920&q=90' },
  { id: 'cfl24-2', clientId: 'cfl24', type: 'video', aspect: 'portrait', thumbnail: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=800&q=80', url: '/reels/portrait-reel.mp4' },
  // ── BEHALA CUP ──
  { id: 'bc-1', clientId: 'behala-cup', type: 'video', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80', url: '/reels/square-type-reel.mp4' },
  { id: 'bc-2', clientId: 'behala-cup', type: 'image', aspect: 'landscape', thumbnail: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1920&q=90' },
  // ── BSS ──
  { id: 'bss-1', clientId: 'bss', type: 'video', aspect: 'portrait', thumbnail: 'https://images.unsplash.com/photo-1624718501777-1f6e5e38a1b1?auto=format&fit=crop&w=800&q=80', url: '/reels/portrait-reel.mp4' },
  { id: 'bss-2', clientId: 'bss', type: 'image', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1920&q=90' },
  // ── N24P ──
  { id: 'n24p-1', clientId: 'n24p', type: 'image', aspect: 'landscape', span2: true, thumbnail: 'https://images.unsplash.com/photo-1542144612-1b726c7f6b96?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1542144612-1b726c7f6b96?auto=format&fit=crop&w=1920&q=90' },
  // ── PLAYPORT ──
  { id: 'pp-1', clientId: 'playport', type: 'image', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1484920795226-7a8d9b2e3b43?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1484920795226-7a8d9b2e3b43?auto=format&fit=crop&w=1920&q=90' },
  // ── BCF ──
  { id: 'bcf-1', clientId: 'bcf', type: 'image', aspect: 'landscape', span2: true, thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1920&q=90' },
  { id: 'bcf-2', clientId: 'bcf', type: 'video', aspect: 'portrait', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', url: '/reels/portrait-reel.mp4' },
  // ── GODHULI ──
  { id: 'gg-1', clientId: 'godhuli', type: 'video', aspect: 'portrait', thumbnail: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80', url: '/reels/portrait-reel.mp4' },
  { id: 'gg-2', clientId: 'godhuli', type: 'image', aspect: 'landscape', thumbnail: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1920&q=90' },
  // ── CAESAR ──
  { id: 'cs-1', clientId: 'caesar', type: 'image', aspect: 'landscape', span2: true, thumbnail: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1920&q=90' },
  // ── KRYSALIS ──
  { id: 'ck-1', clientId: 'krysalis', type: 'image', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=90' },
  { id: 'ck-2', clientId: 'krysalis', type: 'video', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80', url: '/reels/square-type-reel.mp4' },
  // ── RAINBOW ──
  { id: 'rb-1', clientId: 'rainbow', type: 'image', aspect: 'landscape', span2: true, thumbnail: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1920&q=90' },
  // ── RIPLEY ──
  { id: 'rp-1', clientId: 'ripley', type: 'video', aspect: 'landscape', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', url: '/reels/square-type-reel.mp4' },
  { id: 'rp-2', clientId: 'ripley', type: 'image', aspect: 'square', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=90' },
  // ── UPGRAD ──
  { id: 'ug-1', clientId: 'upgrad', type: 'image', aspect: 'landscape', span2: true, thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=90' },
];

const PAGE_SIZE = 12;

// ─── ASPECT → CSS ─────────────────────────────────────────────────────────────

function getAspectStyle(aspect) {
  if (aspect === 'portrait') return { aspectRatio: '9 / 16' };
  if (aspect === 'landscape') return { aspectRatio: '16 / 9' };
  return { aspectRatio: '1 / 1' };
}

// ─── VIDEO CARD (hover-to-play) ───────────────────────────────────────────────

function VideoCard({ item, onClick }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => { });
    }
  };
  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-black cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
      style={getAspectStyle(item.aspect)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onClick(item)}
    >
      {/* Poster */}
      <img
        src={item.thumbnail}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-0' : 'opacity-100'}`}
      />
      {/* Video */}
      <video
        ref={videoRef}
        src={item.url}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Static play icon (hidden while playing) */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── IMAGE CARD ───────────────────────────────────────────────────────────────

function ImageCard({ item, onClick }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-[#072541] cursor-pointer group hover:shadow-2xl transition-all duration-300"
      style={getAspectStyle(item.aspect)}
      onClick={() => onClick(item)}
    >
      <img
        src={item.thumbnail}
        alt=""
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
  );
}

// ─── MEDIA CARD ROUTER ────────────────────────────────────────────────────────

function MediaCard({ item, onClick }) {
  if (item.type === 'video') return <VideoCard item={item} onClick={onClick} />;
  return <ImageCard item={item} onClick={onClick} />;
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

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
  const clientName = CLIENTS.find((c) => c.id === item.clientId)?.name ?? item.clientId;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/96" onClick={onClose}>
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#e95f0c] hover:border-[#e95f0c] transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#e95f0c] hover:border-[#e95f0c] transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next */}
      {index < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#e95f0c] hover:border-[#e95f0c] transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Media */}
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
            muted
            className="max-w-full max-h-full rounded-xl object-contain"
            style={getAspectStyle(item.aspect)}
          />
        ) : (
          <img
            key={item.id}
            src={item.url}
            alt={clientName}
            className="max-w-full max-h-full rounded-xl object-contain"
          />
        )}

        {/* Caption */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-white/90 font-display font-bold text-base">{clientName}</p>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs font-display font-bold tracking-widest">
        {index + 1} / {items.length}
      </div>
    </div>
  );
}

// ─── MASONRY ITEM DYNAMIC ROW SPAN ──────────────────────────────────────────

function MasonryItem({ children, isSpan2, item }) {
  const itemRef = useRef(null);
  const [spans, setSpans] = useState(0);

  const calculateSpans = useCallback(() => {
    if (itemRef.current) {
      const height = itemRef.current.firstElementChild?.offsetHeight || itemRef.current.offsetHeight;
      const rowHeight = 10;
      const gap = 16;
      const numSpans = Math.ceil((height + gap) / (rowHeight + gap));
      setSpans(numSpans);
    }
  }, []);

  useEffect(() => {
    calculateSpans();
    // Run again next frame to guarantee layout is computed
    const id = requestAnimationFrame(calculateSpans);

    // Also re-run after a small delay in case images or videos have not fully laid out
    const timeoutId = setTimeout(calculateSpans, 150);

    window.addEventListener('resize', calculateSpans);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateSpans);
    };
  }, [calculateSpans, item]);

  return (
    <div
      ref={itemRef}
      className={isSpan2 ? 'sm:col-span-2' : 'col-span-1'}
      style={{
        gridRowEnd: spans ? `span ${spans}` : 'auto',
      }}
    >
      <div onLoad={calculateSpans}>
        {children}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeClientId, setActiveClientId] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const activeClient = CLIENTS.find((c) => c.id === activeClientId);

  const filtered = activeClientId === 'all'
    ? ALL_MEDIA
    : ALL_MEDIA.filter((m) => m.clientId === activeClientId);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const openLightbox = useCallback((item) => {
    setLightboxIndex(filtered.findIndex((m) => m.id === item.id));
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(() => setLightboxIndex((i) => Math.max(0, i - 1)), []);
  const nextItem = useCallback(() => setLightboxIndex((i) => Math.min(filtered.length - 1, i + 1)), [filtered.length]);

  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [activeClientId]);

  return (
    <div className="bg-[#f8f5f2] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-16 bg-white overflow-hidden">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#072541] leading-[1.05] tracking-tight mb-5">
            Our Work Speaks<br />
            <span className="text-[#e95f0c]">Before We Do.</span>
          </h1>
          <p className="text-[#4a5568] text-lg max-w-2xl mx-auto leading-relaxed">
            From stadiums to cultural festivals, from cinematic reels to brand campaigns — explore the stories we've brought to life.
          </p>
        </div>
      </section>

      {/* ── CLIENT FILTER ── */}
      <div className="sticky top-[64px] z-40 bg-[#f8f5f2]/95 backdrop-blur-sm border-b border-[#e2dbd3]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] pt-3 pb-1">
            Browse by Client
          </p>
          <div
            className="flex items-center gap-2 overflow-x-auto pb-3"
            style={{ scrollbarWidth: 'none' }}
          >
            {CLIENTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveClientId(c.id)}
                className="px-4 py-2 rounded-full font-display text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-200 shrink-0"
                style={{
                  background: activeClientId === c.id ? '#072541' : '#ede9e4',
                  color: activeClientId === c.id ? 'white' : '#4a5568',
                  boxShadow: activeClientId === c.id ? '0 4px 14px rgba(7,37,65,0.25)' : 'none',
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GALLERY ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">

        {/* Active client heading */}
        <div className="mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#072541]">
            {activeClientId === 'all' ? 'All Client Galleries' : activeClient?.name}
          </h2>
          <p className="text-[#9ca3af] text-sm mt-1">
            {activeClientId === 'all'
              ? `Showing curated work across all ${CLIENTS.length - 1} clients`
              : `Curated media from Unevox's work with ${activeClient?.name}`}
          </p>
        </div>

        {visible.length === 0 ? (
          <div className="py-32 text-center text-[#9ca3af] font-display font-bold">No media for this client yet.</div>
        ) : (
          /* CSS Grid with dynamic MasonryItem to prevent unnecessary vertical gaps */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-row-dense auto-rows-[10px]">
            {visible.map((item) => {
              const isSpan2 = item.aspect === 'landscape' && item.span2;
              return (
                <MasonryItem key={item.id} isSpan2={isSpan2} item={item}>
                  <MediaCard item={item} onClick={openLightbox} />
                </MasonryItem>
              );
            })}
          </div>
        )}

        {hasMore && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#072541] text-[#072541] font-display font-bold text-base hover:bg-[#072541] hover:text-white transition-all duration-300"
            >
              Show More Work <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </div>
  );
}
