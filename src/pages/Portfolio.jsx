import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { sanityClient } from '../sanity/client';
import { PORTFOLIO_ALL_QUERY } from '../sanity/queries';
import SEO from '../components/SEO';

// ─── CAMPAIGN CATEGORIES ──────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'sports', name: 'Sports' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'durga-puja', name: 'Durga Puja' },
  { id: 'industries', name: 'Industries' },
  // { id: 'education', name: 'Education' },
  { id: 'cafe-food', name: 'Cafe & Food' },
  { id: 'banquets', name: 'Banquets' },
];

const MEDIA_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'video', label: 'Video' },
  { id: 'photo', label: 'Photos' },
  { id: 'graphics', label: 'Graphics' },
];

// ─── Derive type from filename: ends "-g.ext" → graphics, otherwise video/photo
function deriveType(url) {
  const noQuery = url.split('?')[0];
  const filename = noQuery.split('/').pop();
  const name = filename.replace(/\.[^.]+$/, ''); // strip extension
  if (name.endsWith('-g')) return 'graphics';
  const ext = filename.split('.').pop().toLowerCase();
  if (['mp4', 'mov', 'webm'].includes(ext)) return 'video';
  return 'photo';
}

// ─── ALL MEDIA ────────────────────────────────────────────────────────────────
// aspect: 'portrait'(9:16) | 'landscape'(16:9) | 'wide'(4:3) | 'tall'(3:4) | default/square(1:1)
const ALL_MEDIA = [
  // ── SPORTS ──
  { id: 'sp-13', categoryId: 'sports', url: '/media/sports/bsl-north-24-1.mp4', aspect: 'portrait' },
  { id: 'sp-14', categoryId: 'sports', url: '/media/sports/bsl-north-24-2.mp4', aspect: 'tall' },
  { id: 'sp-15', categoryId: 'sports', url: '/media/sports/bsl-north-24-3.mp4', aspect: 'portrait' },
  { id: 'sp-16', categoryId: 'sports', url: '/media/sports/bsl-north-24-4.mp4', aspect: 'portrait' },
  { id: 'sp-17', categoryId: 'sports', url: '/media/sports/cfl-bss-1.mp4', aspect: 'portrait' },
  { id: 'sp-18', categoryId: 'sports', url: '/media/sports/cfl-bss-2.mp4', aspect: 'portrait' },
  { id: 'sp-19', categoryId: 'sports', url: '/media/sports/cfl-bss-3.mp4', aspect: 'portrait' },
  { id: 'sp-20', categoryId: 'sports', url: '/media/sports/cfl-bss-4.mp4', aspect: 'portrait' },
  { id: 'sp-21', categoryId: 'sports', url: '/media/sports/fc_banaras-1.mp4', aspect: 'wide' },
  { id: 'sp-31', categoryId: 'sports', url: '/media/sports/fc-banaras-2.mp4', aspect: 'portrait' },
  { id: 'sp-22', categoryId: 'sports', url: '/media/sports/dpdl-1-g.jpg', aspect: 'tall' },
  { id: 'sp-23', categoryId: 'sports', url: '/media/sports/dpdl-1.jpg', aspect: 'tall' },
  { id: 'sp-24', categoryId: 'sports', url: '/media/sports/dpdl-1.mp4', aspect: 'portrait' },
  { id: 'sp-25', categoryId: 'sports', url: '/media/sports/dpdl-2-g.jpg', aspect: 'tall' },
  { id: 'sp-26', categoryId: 'sports', url: '/media/sports/dpdl-2.jpg', aspect: 'tall' },
  { id: 'sp-27', categoryId: 'sports', url: '/media/sports/dpdl-2.mp4', aspect: 'portrait' },
  { id: 'sp-28', categoryId: 'sports', url: '/media/sports/dpdl-3-g.jpg', aspect: 'tall' },
  { id: 'sp-29', categoryId: 'sports', url: '/media/sports/dpdl-3.jpg', aspect: 'tall' },
  { id: 'sp-30', categoryId: 'sports', url: '/media/sports/dpdl-4-g.jpg', aspect: 'tall' },
  { id: 'sp-31', categoryId: 'sports', url: '/media/sports/dpdl-5-g.jpg', aspect: 'tall' },
  { id: 'sp-32', categoryId: 'sports', url: '/media/sports/dpdl-6-g.jpg', aspect: 'tall' },
  { id: 'sp-33', categoryId: 'sports', url: '/media/sports/dpdl-7-g.jpg', aspect: 'tall' },
  { id: 'sp-34', categoryId: 'sports', url: '/media/sports/dpdl-8-g.jpg', aspect: 'tall' },
  { id: 'sp-35', categoryId: 'sports', url: '/media/sports/dpdl-9-g.jpg', aspect: 'tall' },
  { id: 'sp-36', categoryId: 'sports', url: '/media/sports/dpdl-10-g.jpg', aspect: 'tall' },
  { id: 'sp-37', categoryId: 'sports', url: '/media/sports/fc-banaras-1-g.jpg', aspect: 'tall' },
  { id: 'sp-38', categoryId: 'sports', url: '/media/sports/fc-banaras-2-g.jpg', aspect: 'tall' },
  { id: 'sp-39', categoryId: 'sports', url: '/media/sports/fc-banaras-3-g.jpg', aspect: 'tall' },
  { id: 'sp-40', categoryId: 'sports', url: '/media/sports/fc-banaras-4-g.jpg', aspect: 'tall' },
  { id: 'sp-41', categoryId: 'sports', url: '/media/sports/fc-banaras-5-g.jpg', aspect: 'tall' },
  { id: 'sp-1', categoryId: 'sports', url: '/media/sports/n24-1.jpg', aspect: 'tall' },
  { id: 'sp-2', categoryId: 'sports', url: '/media/sports/n24-2.jpg', aspect: 'tall' },
  { id: 'sp-3', categoryId: 'sports', url: '/media/sports/n24-3.jpg', aspect: 'tall' },
  { id: 'sp-4', categoryId: 'sports', url: '/media/sports/n24-4.jpg', aspect: 'tall' },
  { id: 'sp-5', categoryId: 'sports', url: '/media/sports/bss-1.jpg', aspect: 'tall' },
  { id: 'sp-6', categoryId: 'sports', url: '/media/sports/bss-2.jpg', aspect: 'tall' },
  { id: 'sp-7', categoryId: 'sports', url: '/media/sports/bss-3.jpg', aspect: 'tall' },
  { id: 'sp-8', categoryId: 'sports', url: '/media/sports/bss-4.jpg', aspect: 'tall' },
  { id: 'sp-9', categoryId: 'sports', url: '/media/sports/cfl-suruchi-1-g.jpg', aspect: 'tall' },
  { id: 'sp-10', categoryId: 'sports', url: '/media/sports/cfl-suruchi-2-g.jpg', aspect: 'tall' },
  { id: 'sp-11', categoryId: 'sports', url: '/media/sports/cfl-suruchi-3-g.jpg', aspect: 'tall' },
  { id: 'sp-12', categoryId: 'sports', url: '/media/sports/cfl-suruchi-4-g.jpg', aspect: 'tall' },

  // ── CULTURAL ──
  { id: 'cu-1', categoryId: 'cultural', url: '/media/cultural/classical-fest-1.mp4', aspect: 'landscape' },
  { id: 'cu-2', categoryId: 'cultural', url: '/media/cultural/classical-fest-2.mp4', aspect: 'portrait' },
  { id: 'cu-3', categoryId: 'cultural', url: '/media/cultural/classical-fest-3.mp4', aspect: 'portrait' },
  { id: 'cu-4', categoryId: 'cultural', url: '/media/cultural/classical-fest-4.mp4', aspect: 'landscape' },
  { id: 'cu-5', categoryId: 'cultural', url: '/media/cultural/theatre-fest-1.mp4', aspect: 'portrait' },
  { id: 'cu-6', categoryId: 'cultural', url: '/media/cultural/theatre-fest-2.mp4', aspect: 'portrait' },
  { id: 'cu-7', categoryId: 'cultural', url: '/media/cultural/theatre-fest-3.mp4', aspect: 'landscape' },
  { id: 'cu-8', categoryId: 'cultural', url: '/media/cultural/theatre-fest-4.mp4', aspect: 'portrait' },
  { id: 'cu-9', categoryId: 'cultural', url: '/media/cultural/bachonik-1.mp4', aspect: 'landscape' },
  { id: 'cu-10', categoryId: 'cultural', url: '/media/cultural/bachonik-2.mp4', aspect: 'portrait' },
  { id: 'cu-11', categoryId: 'cultural', url: '/media/cultural/bachonik-3.mp4', aspect: 'portrait' },
  { id: 'cu-12', categoryId: 'cultural', url: '/media/cultural/bachonik-4.mp4', aspect: 'portrait' },
  { id: 'cu-13', categoryId: 'cultural', url: '/media/cultural/Godhuli-1.mp4', aspect: 'portrait' },
  { id: 'cu-14', categoryId: 'cultural', url: '/media/cultural/Godhuli-2.mp4', aspect: 'portrait' },
  { id: 'cu-15', categoryId: 'cultural', url: '/media/cultural/Godhuli-3.mp4', aspect: 'portrait' },
  { id: 'cu-16', categoryId: 'cultural', url: '/media/cultural/Godhuli-1-g.jpg', aspect: 'tall' },
  { id: 'cu-17', categoryId: 'cultural', url: '/media/cultural/Godhuli-2-g.jpg', aspect: 'tall' },
  { id: 'cu-18', categoryId: 'cultural', url: '/media/cultural/Godhuli-3-g.jpg', aspect: 'tall' },

  // ── DURGA PUJA ──
  { id: 'dp-1', categoryId: 'durga-puja', url: '/media/durga-puja/behala-club-1.mp4', aspect: 'landscape' },
  { id: 'dp-2', categoryId: 'durga-puja', url: '/media/durga-puja/behala-club-2.mp4', aspect: 'portrait' },
  { id: 'dp-3', categoryId: 'durga-puja', url: '/media/durga-puja/behala-club-3.mp4', aspect: 'portrait' },
  { id: 'dp-4', categoryId: 'durga-puja', url: '/media/durga-puja/behala-club-4.mp4', aspect: 'landscape' },
  { id: 'dp-5', categoryId: 'durga-puja', url: '/media/durga-puja/doc-1.mp4', aspect: 'landscape' },
  { id: 'dp-6', categoryId: 'durga-puja', url: '/media/durga-puja/doc-2.mp4', aspect: 'landscape' },
  { id: 'dp-7', categoryId: 'durga-puja', url: '/media/durga-puja/doc-3.mp4', aspect: 'landscape' },
  { id: 'dp-8', categoryId: 'durga-puja', url: '/media/durga-puja/forum-1.mp4', aspect: 'portrait' },
  { id: 'dp-9', categoryId: 'durga-puja', url: '/media/durga-puja/forum-2.mp4', aspect: 'landscape' },
  { id: 'dp-10', categoryId: 'durga-puja', url: '/media/durga-puja/forum-3.mp4', aspect: 'portrait' },
  { id: 'dp-11', categoryId: 'durga-puja', url: '/media/durga-puja/forum-4.mp4', aspect: 'landscape' },
  { id: 'dp-12', categoryId: 'durga-puja', url: '/media/durga-puja/forum-5.mp4', aspect: 'landscape' },
  { id: 'dp-13', categoryId: 'durga-puja', url: '/media/durga-puja/suruchi-1.mp4', aspect: 'portrait' },
  { id: 'dp-14', categoryId: 'durga-puja', url: '/media/durga-puja/suruchi-2.mp4', aspect: 'landscape' },
  { id: 'dp-15', categoryId: 'durga-puja', url: '/media/durga-puja/suruchi-3.mp4', aspect: 'portrait' },
  { id: 'dp-16', categoryId: 'durga-puja', url: '/media/durga-puja/suruchi-4.mp4', aspect: 'portrait' },
  { id: 'dp-17', categoryId: 'durga-puja', url: '/media/durga-puja/tmss-1.mp4', aspect: 'landscape' },
  { id: 'dp-18', categoryId: 'durga-puja', url: '/media/durga-puja/tmss-2.mp4', aspect: 'landscape' },
  { id: 'dp-19', categoryId: 'durga-puja', url: '/media/durga-puja/tmss-3.mp4', aspect: 'portrait' },

  // ── INDUSTRIES ──
  { id: 'in-1', categoryId: 'industries', url: '/media/industries/creative-1.mp4', aspect: 'portrait' },
  { id: 'in-2', categoryId: 'industries', url: '/media/industries/creative-2.mp4', aspect: 'portrait' },
  { id: 'in-3', categoryId: 'industries', url: '/media/industries/creative-3.mp4', aspect: 'portrait' },
  { id: 'in-4', categoryId: 'industries', url: '/media/industries/creative-4.mp4', aspect: 'portrait' },
  { id: 'in-5', categoryId: 'industries', url: '/media/industries/creative-1-g.jpg', aspect: 'square' },
  { id: 'in-6', categoryId: 'industries', url: '/media/industries/creative-2-g.jpg', aspect: 'square' },
  { id: 'in-7', categoryId: 'industries', url: '/media/industries/creative-3-g.jpg', aspect: 'square' },
  { id: 'in-8', categoryId: 'industries', url: '/media/industries/creative-4-g.jpg', aspect: 'square' },
  { id: 'in-9', categoryId: 'industries', url: '/media/industries/ripley-1-g.jpg', aspect: 'square' },
  { id: 'in-10', categoryId: 'industries', url: '/media/industries/ripley-2-g.jpg', aspect: 'square' },

  // ── CAFE & FOOD ──
  { id: 'cf-1', categoryId: 'cafe-food', url: '/media/cafe-food/lakshmisree-1.mp4', aspect: 'landscape' },
  { id: 'cf-2', categoryId: 'cafe-food', url: '/media/cafe-food/lakshmisree-2.mp4', aspect: 'landscape' },
  { id: 'cf-3', categoryId: 'cafe-food', url: '/media/cafe-food/lakshmisree-3.mp4', aspect: 'portrait' },
  { id: 'cf-4', categoryId: 'cafe-food', url: '/media/cafe-food/lakshmisree-4.mp4', aspect: 'portrait' },
  { id: 'cf-5', categoryId: 'cafe-food', url: '/media/cafe-food/maharaja-1.mp4', aspect: 'portrait' },
  { id: 'cf-6', categoryId: 'cafe-food', url: '/media/cafe-food/maharaja-2.mp4', aspect: 'portrait' },
  { id: 'cf-7', categoryId: 'cafe-food', url: '/media/cafe-food/maharaja-3.mp4', aspect: 'portrait' },
  { id: 'cf-8', categoryId: 'cafe-food', url: '/media/cafe-food/maharaja-4.mp4', aspect: 'portrait' },
  { id: 'cf-9', categoryId: 'cafe-food', url: '/media/cafe-food/maharaja-5.mp4', aspect: 'landscape' },
  { id: 'cf-10', categoryId: 'cafe-food', url: '/media/cafe-food/maharaja-6.mp4', aspect: 'landscape' },
  { id: 'cf-11', categoryId: 'cafe-food', url: '/media/cafe-food/maharaja-7.mp4', aspect: 'portrait' },
  { id: 'cf-12', categoryId: 'cafe-food', url: '/media/cafe-food/shoreline-1.mp4', aspect: 'portrait' },
  { id: 'cf-13', categoryId: 'cafe-food', url: '/media/cafe-food/shoreline-2.mp4', aspect: 'portrait' },
  { id: 'cf-14', categoryId: 'cafe-food', url: '/media/cafe-food/shoreline-3.mp4', aspect: 'portrait' },
  { id: 'cf-15', categoryId: 'cafe-food', url: '/media/cafe-food/shoreline-4.mp4', aspect: 'portrait' },

  // ── BANQUETS ──
  { id: 'bq-1', categoryId: 'banquets', url: '/media/banquets/rainbow-1.mp4', aspect: 'portrait' },
  { id: 'bq-2', categoryId: 'banquets', url: '/media/banquets/rainbow-2.mp4', aspect: 'portrait' },
  { id: 'bq-3', categoryId: 'banquets', url: '/media/banquets/rainbow-3.mp4', aspect: 'portrait' },
  { id: 'bq-4', categoryId: 'banquets', url: '/media/banquets/rainbow-4.mp4', aspect: 'portrait' },
  { id: 'bq-5', categoryId: 'banquets', url: '/media/banquets/rainbow-5.mp4', aspect: 'portrait' },
  { id: 'bq-6', categoryId: 'banquets', url: '/media/banquets/rainbow-6.mp4', aspect: 'portrait' },
  { id: 'bq-7', categoryId: 'banquets', url: '/media/banquets/rainbow-7.mp4', aspect: 'portrait' },
  { id: 'bq-8', categoryId: 'banquets', url: '/media/banquets/rainbow-8.mp4', aspect: 'portrait' },
  { id: 'bq-9', categoryId: 'banquets', url: '/media/banquets/rainbow-9.mp4', aspect: 'portrait' },
  { id: 'bq-10', categoryId: 'banquets', url: '/media/banquets/rainbow-10.mp4', aspect: 'portrait' },
].map((item) => ({ ...item, type: deriveType(item.url) }));

// ─── CARD WIDTH/ASPECT HELPERS ────────────────────────────────────────────────
function getCardWidthClass(aspect) {
  switch (aspect) {
    case 'portrait': return 'w-64 sm:w-72';
    case 'landscape': return 'w-80 sm:w-[28rem]';
    case 'wide': return 'w-80 sm:w-96';
    case 'tall': return 'w-64 sm:w-72';
    default: return 'w-72 sm:w-80';
  }
}

function getAspectClass(aspect) {
  switch (aspect) {
    case 'portrait': return 'aspect-[9/16]';
    case 'landscape': return 'aspect-[16/9]';
    case 'wide': return 'aspect-[4/3]';
    case 'tall': return 'aspect-[3/4]';
    default: return 'aspect-square';
  }
}

function getAspectStyle(aspect) {
  switch (aspect) {
    case 'portrait': return { aspectRatio: '9 / 16' };
    case 'landscape': return { aspectRatio: '16 / 9' };
    case 'wide': return { aspectRatio: '4 / 3' };
    case 'tall': return { aspectRatio: '3 / 4' };
    default: return { aspectRatio: '1 / 1' };
  }
}

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────
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

  const widthClass = getCardWidthClass(item.aspect);
  const aspectClass = getAspectClass(item.aspect);

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onClick(item)}
      className={`flex flex-col shrink-0 group cursor-pointer ${widthClass}`}
    >
      <div
        className={`relative w-full rounded-3xl overflow-hidden border border-[#e2dbd3] bg-black group-hover:border-[#e95f0c] group-hover:shadow-2xl transition-all duration-300 ${aspectClass}`}
      >
        <video
          ref={videoRef}
          src={item.url}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${playing
              ? 'opacity-0 scale-75'
              : 'opacity-100 scale-100 group-hover:scale-110 group-hover:bg-[#e95f0c] group-hover:border-[#e95f0c]'
              }`}
          >
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PHOTO / GRAPHICS CARD ────────────────────────────────────────────────────
function PhotoCard({ item, onClick }) {
  const altText = item.alt || `${item.type === 'graphics' ? 'Creative graphic' : 'Portfolio photo'} – ${item.categoryId || 'work'}`;
  const widthClass = getCardWidthClass(item.aspect);
  const aspectClass = getAspectClass(item.aspect);

  return (
    <div
      onClick={() => onClick(item)}
      className={`flex flex-col shrink-0 group cursor-pointer ${widthClass}`}
    >
      <div
        className={`relative w-full rounded-3xl overflow-hidden border border-[#e2dbd3] bg-[#072541] group-hover:border-[#e95f0c] group-hover:shadow-2xl transition-all duration-300 ${aspectClass}`}
      >
        <img
          src={item.url}
          alt={altText}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </div>
  );
}

// ─── MEDIA CARD ROUTER ────────────────────────────────────────────────────────
function MediaCard({ item, onClick }) {
  if (item.type === 'video') return <VideoCard item={item} onClick={onClick} />;
  return <PhotoCard item={item} onClick={onClick} />;
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
  const catName = CATEGORIES.find((c) => c.id === item.categoryId)?.name ?? item.categoryId;

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
            className="max-w-full max-h-full rounded-xl object-contain"
            style={getAspectStyle(item.aspect)}
          />
        ) : (
          <img
            key={item.id}
            src={item.url}
            alt={catName}
            className="max-w-full max-h-full rounded-xl object-contain"
          />
        )}

        {/* Caption */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-white/90 font-display font-bold text-base">{catName}</p>
          <p className="text-white/40 text-xs font-display uppercase tracking-widest mt-0.5">{item.type}</p>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs font-display font-bold tracking-widest">
        {index + 1} / {items.length}
      </div>
    </div>
  );
}

// ─── FILTER PILL ─────────────────────────────────────────────────────────────
function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full font-display text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-200 shrink-0"
      style={{
        background: active ? '#072541' : '#ede9e4',
        color: active ? 'white' : '#4a5568',
        boxShadow: active ? '0 4px 14px rgba(7,37,65,0.25)' : 'none',
      }}
    >
      {children}
    </button>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read ?cat= from URL on mount; fall back to 'all'
  const paramCat = searchParams.get('cat') ?? 'all';
  const validCat = CATEGORIES.some((c) => c.id === paramCat) ? paramCat : 'all';

  const [activeCat, setActiveCat] = useState(validCat);
  const [activeType, setActiveType] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  // allMedia = static items merged with any Sanity items
  const [allMedia, setAllMedia] = useState(ALL_MEDIA);

  useEffect(() => {
    let active = true;
    async function fetchSanityItems() {
      try {
        const data = await sanityClient.fetch(PORTFOLIO_ALL_QUERY);
        if (!active || !data || data.length === 0) return;
        // Build a set of existing URLs to avoid duplicates
        const existingUrls = new Set(ALL_MEDIA.map((m) => m.url));
        const sanityItems = data
          .filter((item) => item.url && !existingUrls.has(item.url))
          .map((item) => ({
            id: item.id,
            categoryId: item.category,
            url: item.url,
            aspect: item.aspect || 'landscape',
            type: item.type === 'video' ? 'video' : deriveType(item.url),
          }));
        if (sanityItems.length > 0) {
          setAllMedia([...ALL_MEDIA, ...sanityItems]);
        }
      } catch (err) {
        console.error('Portfolio: Sanity fetch failed, using static data:', err);
      }
    }
    fetchSanityItems();
    return () => { active = false; };
  }, []);

  // Keep URL in sync when user changes the campaign filter
  const handleSetCat = useCallback((id) => {
    setActiveCat(id);
    setSearchParams(id === 'all' ? {} : { cat: id }, { replace: true });
  }, [setSearchParams]);

  const filtered = allMedia.filter((m) => {
    if (m.categoryId === 'education') return false;
    const catMatch = activeCat === 'all' || m.categoryId === activeCat;
    const typeMatch = activeType === 'all' || m.type === activeType;
    return catMatch && typeMatch;
  });

  const openLightbox = useCallback((item) => {
    setLightboxIndex(filtered.findIndex((m) => m.id === item.id));
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(() => setLightboxIndex((i) => Math.max(0, i - 1)), []);
  const nextItem = useCallback(() => setLightboxIndex((i) => Math.min(filtered.length - 1, i + 1)), [filtered.length]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  const activeCatName = CATEGORIES.find((c) => c.id === activeCat)?.name ?? 'All';

  return (
    <div className="bg-[#f8f5f2] min-h-screen">
      <SEO
        title={`${activeCatName} Portfolio`}
        description={`Explore our creative works, videography, photography, and campaign graphics for ${activeCatName} category.`}
      />

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

      {/* ── FILTERS (sticky) ── */}
      <div className="sticky top-[64px] z-40 bg-[#f8f5f2]/95 backdrop-blur-sm border-b border-[#e2dbd3]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row gap-4 md:gap-14 items-start md:items-center overflow-scroll">

          {/* Campaign category row */}
          <div className="pt-3 pb-1">
            <p className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] mb-1.5">
              Campaign
            </p>

            <div
              className="flex items-center gap-2 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none' }}
            >
              {CATEGORIES.map((c) => (
                <Pill
                  key={c.id}
                  active={activeCat === c.id}
                  onClick={() => handleSetCat(c.id)}
                >
                  {c.name}
                </Pill>
              ))}
            </div>
          </div>

          {/* Media type row */}
          <div>
            <p className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] mb-1.5">
              Media Type
            </p>

            <div className="flex items-center gap-2">
              {MEDIA_TYPES.map((t) => (
                <Pill
                  key={t.id}
                  active={activeType === t.id}
                  onClick={() => setActiveType(t.id)}
                >
                  {t.label}
                </Pill>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── SLIDER SHOWCASE ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">

        {/* Heading & Slider Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#072541]">
              {activeCat === 'all' ? 'All Campaigns' : activeCatName}
              {activeType !== 'all' && (
                <span className="ml-3 text-[#e95f0c]">— {MEDIA_TYPES.find((t) => t.id === activeType)?.label}</span>
              )}
            </h2>
            <p className="text-[#9ca3af] text-sm mt-1">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} found • Hover to play videos, click to view full media
            </p>
          </div>

          {/* Scroll navigation arrows */}
          {filtered.length > 0 && (
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
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-32 text-center text-[#9ca3af] font-display font-bold text-lg">
            No media for this selection yet.
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex items-center gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filtered.map((item) => (
              <div key={item.id} className="snap-start shrink-0">
                <MediaCard item={item} onClick={openLightbox} />
              </div>
            ))}
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
