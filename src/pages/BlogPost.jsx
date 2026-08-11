import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ChevronRight, CheckCircle, ChevronLeft, Play, X } from 'lucide-react';
import { sanityClient } from "../sanity/client";
import { BLOG_BY_SLUG_QUERY } from "../sanity/queries";
import { urlFor } from "../sanity/image";
import { PortableText } from "@portabletext/react";


// ─── GALLERY CARD ─────────────────────────────────────────────────────────────

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 leading-8 text-gray-700">
        {children}
      </p>
    ),

    h2: ({ children }) => (
      <h2 className="mt-12 mb-5 text-3xl font-bold">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 text-2xl font-semibold">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 pl-6 italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc pl-6">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="mb-6 list-decimal pl-6">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em>{children}</em>
    ),

    link: ({ value, children }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {children}
      </a>
    ),
  },
};

function GalleryCard({ item, onClick }) {
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

  const isPortrait = item.aspect === 'portrait';

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      className={`flex flex-col shrink-0 group cursor-pointer ${isPortrait ? 'w-64 sm:w-72' : 'w-80 sm:w-96'
        }`}
    >
      <div
        className={`relative w-full rounded-3xl overflow-hidden border border-[#e2dbd3] bg-black group-hover:border-[#e95f0c] group-hover:shadow-2xl transition-all duration-300 ${isPortrait ? 'aspect-[3/4]' : 'aspect-square'
          }`}
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
          </>
        ) : (
          <img
            src={item.url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        )}
      </div>
    </div>
  );
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/96" onClick={onClose}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#e95f0c] hover:border-[#e95f0c] transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Navigation buttons */}
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

      {/* Main media preview */}
      <div
        className="relative flex items-center justify-center w-full h-full px-20 py-12"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <video
            key={item.url}
            src={item.url}
            controls
            autoPlay
            className="max-w-full max-h-full rounded-xl object-contain"
            style={{ aspectRatio: item.aspect === 'portrait' ? '9/16' : '16/9' }}
          />
        ) : (
          <img
            key={item.url}
            src={item.url}
            alt=""
            className="max-w-full max-h-full rounded-xl object-contain"
          />
        )}
      </div>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs font-display font-bold tracking-widest">
        {index + 1} / {items.length}
      </div>
    </div>
  );
}

// ─── MAIN BLOG POST PAGE ──────────────────────────────────────────────────────

export default function BlogPost() {
  const { slug } = useParams();
  const scrollRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // const post = BLOG_POSTS.find((p) => p.slug === slug);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await sanityClient.fetch(
          BLOG_BY_SLUG_QUERY,
          { slug }
        );

        setPost(data);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  const openLightbox = useCallback((item) => {
    setLightboxIndex(post.gallery.findIndex((m) => m.url === item.url));
  }, [post]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(() => setLightboxIndex((i) => Math.max(0, i - 1)), []);
  const nextItem = useCallback(() => setLightboxIndex((i) => Math.min(post.gallery.length - 1, i + 1)), [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] pt-32 pb-16 text-center">
        <h1 className="font-display text-4xl font-black text-[#072541] mb-4">Post Not Found</h1>
        <p className="text-[#4a5568] mb-8">The case study you are looking for does not exist.</p>
        <Link to="/blogs" className="text-[#e95f0c] font-display font-black flex items-center justify-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="bg-[#f8f5f2] min-h-screen">

      {/* ── HERO HEADER ── */}
      <header className="relative pt-28 pb-16 bg-white overflow-hidden border-b border-[#e2dbd3]">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">

          <div className="flex items-center gap-2 text-xs font-display font-bold text-[#9ca3af] uppercase tracking-wider mb-6">
            <Link to="/blogs" className="hover:text-[#e95f0c] transition-colors">Blogs</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#e95f0c]">{post.category}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#072541] leading-[1.1] mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#4a5568] font-display font-bold pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#e95f0c]" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#e95f0c]" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO COVER IMAGE ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 sm:-mt-12 relative z-20">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#e2dbd3] bg-[#072541]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── CONTENT & DETAILS ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none space-y-12">

          {/* Client Info */}
          <div className="bg-white rounded-2xl p-8 border border-[#e2dbd3] grid grid-cols-1 sm:grid-cols-2 gap-8 shadow-sm">
            <div>
              <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] block mb-1">
                Client
              </span>
              <p className="font-display text-xl font-black text-[#072541]">
                {post.client}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] block mb-1">
                Focus Campaign
              </span>
              <p className="font-display text-xl font-black text-[#072541]">
                {post.category} Management
              </p>
            </div>
          </div>

          {/* Challenge */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mb-4">
              The Challenge
            </h2>
            <p className="text-[#4a5568] leading-relaxed text-lg">
              {post.challenge}
            </p>
          </div>

          {/* Approach */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mb-4">
              Our Approach
            </h2>
            <p className="text-[#4a5568] leading-relaxed text-lg">
              {post.approach}
            </p>
          </div>

          {/* Content Produced */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mb-4">
              Content Produced
            </h2>
            <div className="flex flex-wrap gap-3">
              {post.contentProduced.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#e2dbd3] text-sm font-display font-bold text-[#072541]"
                >
                  <CheckCircle className="w-4 h-4 text-[#e95f0c]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Results stats */}
          <div className="border-t border-b border-[#e2dbd3] py-12 my-12">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#072541] text-center mb-8">
              Campaign Results & Impact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {post.results.map((res, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-[#e2dbd3]">
                  <p className="text-[#e95f0c] font-display font-black text-3xl sm:text-4xl mb-1">
                    {res.value}
                  </p>
                  <p className="text-xs font-display font-bold uppercase tracking-widest text-[#9ca3af]">
                    {res.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── VISUAL HIGHLIGHTS SLIDER ── */}
      <section className="py-16 bg-white border-y border-[#e2dbd3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] block mb-2">
                Gallery
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-[#072541]">
                Visual Highlights
              </h2>
            </div>

            {/* Slider controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-[#e2dbd3] bg-[#f8f5f2] hover:bg-[#e95f0c] hover:border-[#e95f0c] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer text-[#072541]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-[#e2dbd3] bg-[#f8f5f2] hover:bg-[#e95f0c] hover:border-[#e95f0c] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer text-[#072541]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontally scrollable container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-6 overflow-x-auto pb-8 scroll-smooth scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {post.gallery.map((item, idx) => (
              <div key={idx} className="snap-start">
                <GalleryCard item={item} onClick={openLightbox} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCLUSION & FOOTER LINK ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none space-y-12">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mb-4">
              Conclusion
            </h2>
            <p className="text-[#4a5568] leading-relaxed text-lg">
              {post.conclusion}
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#e2dbd3]">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-[#072541] font-display font-black hover:text-[#e95f0c] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>
      </section>

      {/* ── RELATED BLOGS ── */}
      <section className="bg-white py-20 border-t border-[#e2dbd3]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-3xl font-black text-[#072541] mb-12 text-center">
            Related Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rPost) => (
              <Link
                to={`/blogs/${rPost.slug}`}
                key={rPost.id}
                className="group flex flex-col h-full bg-[#f8f5f2] rounded-xl overflow-hidden border border-[#e2dbd3] hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#072541]">
                  <img
                    src={rPost.coverImage}
                    alt={rPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-display font-bold text-[#e95f0c] uppercase tracking-wider mb-2">
                    {rPost.category}
                  </span>
                  <h3 className="font-display text-lg font-black text-[#072541] mb-3 group-hover:text-[#e95f0c] transition-colors leading-snug">
                    {rPost.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f0eae4] text-[10px] text-[#9ca3af] font-display font-bold">
                    <span>{rPost.date}</span>
                    <span>{rPost.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={post.gallery}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

    </article>
  );
}
