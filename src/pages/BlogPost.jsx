import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Clock, ChevronRight,
  CheckCircle, ChevronLeft, Play, X, AlertCircle
} from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { sanityClient } from '../sanity/client';
import { BLOG_BY_SLUG_QUERY, RELATED_BLOGS_QUERY } from '../sanity/queries';
import { urlFor } from '../sanity/image';

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

function getCoverUrl(coverImage, w = 1400) {
  if (!coverImage?.asset) return '';
  return urlFor(coverImage).width(w).auto('format').url();
}

function getGalleryUrl(item) {
  if (item.type === 'video') {
    // Uploaded file asset — resolve the URL from the asset document
    return item.video?.asset?.url || '';
  }
  if (item.image?.asset) return urlFor(item.image).width(1200).auto('format').url();
  return '';
}

// ─── PORTABLE TEXT COMPONENTS ────────────────────────────────────────────────

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-[#4a5568] leading-8 text-lg">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="font-display text-4xl sm:text-5xl font-black text-[#072541] mt-14 mb-5 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl sm:text-3xl font-black text-[#072541] mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl sm:text-2xl font-black text-[#072541] mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 pr-4 py-4 border-l-4 border-[#e95f0c] bg-[#f8f5f2] rounded-r-2xl italic text-[#072541] font-display font-bold text-xl">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 space-y-2 pl-6 list-disc text-[#4a5568] text-lg">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 space-y-2 pl-6 list-decimal text-[#4a5568] text-lg">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="leading-7">{children}</li>,
    number: ({ children }) => <li className="leading-7">{children}</li>,
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#072541]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#e95f0c] font-semibold hover:underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10 rounded-2xl overflow-hidden border border-[#e2dbd3] shadow-sm">
          <img
            src={urlFor(value).width(1000).auto('format').url()}
            alt={value.alt || ''}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="text-center text-xs text-[#9ca3af] px-4 py-2 bg-[#f8f5f2] font-display italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// ─── GALLERY CARD ─────────────────────────────────────────────────────────────

function GalleryCard({ item, onClick }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaUrl = getGalleryUrl(item);
  const isPortrait = item.aspect === 'portrait';

  const handleMouseEnter = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      className={`flex flex-col shrink-0 group cursor-pointer ${isPortrait ? 'w-64 sm:w-72' : 'w-80 sm:w-96'}`}
    >
      <div
        className={`relative w-full rounded-3xl overflow-hidden border border-[#e2dbd3] bg-black group-hover:border-[#e95f0c] group-hover:shadow-2xl transition-all duration-300 ${isPortrait ? 'aspect-[3/4]' : 'aspect-square'}`}
      >
        {item.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={mediaUrl}
              loop playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100 group-hover:scale-110 group-hover:bg-[#e95f0c] group-hover:border-[#e95f0c]'}`}>
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={mediaUrl}
            alt={item.alt || ''}
            loading="lazy"
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
  const mediaUrl = item ? getGalleryUrl(item) : '';

  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handle);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handle);
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
            key={mediaUrl}
            src={mediaUrl}
            controls autoPlay
            className="max-w-full max-h-full rounded-xl object-contain"
            style={{ aspectRatio: item.aspect === 'portrait' ? '9/16' : '16/9' }}
          />
        ) : (
          <img
            key={mediaUrl}
            src={mediaUrl}
            alt={item.alt || ''}
            className="max-w-full max-h-full rounded-xl object-contain"
          />
        )}
      </div>

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
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function fetchPost() {
      setLoading(true);
      setError(false);
      setPost(null);
      setRelatedPosts([]);

      try {
        const data = await sanityClient.fetch(BLOG_BY_SLUG_QUERY, { slug });
        if (cancelled) return;
        setPost(data ?? null);

        if (data?._id) {
          const related = await sanityClient.fetch(RELATED_BLOGS_QUERY, {
            currentId: data._id,
            limit: 3,
          });
          if (!cancelled) setRelatedPosts(related ?? []);
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost();
    return () => { cancelled = true; };
  }, [slug]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  const openLightbox = useCallback((item) => {
    if (!post?.gallery) return;
    const idx = post.gallery.findIndex((m) => getGalleryUrl(m) === getGalleryUrl(item));
    setLightboxIndex(idx >= 0 ? idx : 0);
  }, [post]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevItem = useCallback(() => setLightboxIndex((i) => Math.max(0, i - 1)), []);
  const nextItem = useCallback(() => setLightboxIndex((i) => Math.min((post?.gallery?.length ?? 1) - 1, i + 1)), [post]);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] flex flex-col items-center justify-center pt-32 pb-16 gap-4">
        <div className="w-12 h-12 border-4 border-[#e95f0c] border-t-transparent rounded-full animate-spin" />
        <p className="font-display font-bold text-lg text-[#072541]">Loading article…</p>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] flex flex-col items-center justify-center pt-32 pb-16 text-center px-6">
        <AlertCircle className="w-14 h-14 text-red-400 mb-4" />
        <h1 className="font-display text-3xl font-black text-[#072541] mb-2">Something went wrong</h1>
        <p className="text-[#4a5568] mb-8 max-w-sm">We couldn't load this article. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 rounded-full font-display font-bold text-white bg-[#e95f0c] hover:bg-[#c94d08] transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Not found ──
  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] pt-32 pb-16 text-center px-6">
        <h1 className="font-display text-4xl font-black text-[#072541] mb-4">Post Not Found</h1>
        <p className="text-[#4a5568] mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blogs" className="inline-flex items-center gap-2 text-[#e95f0c] font-display font-black hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  const coverUrl = getCoverUrl(post.coverImage);
  const hasGallery = Array.isArray(post.gallery) && post.gallery.length > 0;
  const hasResults = Array.isArray(post.results) && post.results.length > 0;
  const hasContent = Array.isArray(post.contentProduced) && post.contentProduced.length > 0;
  const hasBody = Array.isArray(post.body) && post.body.length > 0;

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
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e95f0c]" />
                <span>{post.readingTime}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── COVER IMAGE ── */}
      {coverUrl && (
        <div className="max-w-6xl mx-auto px-6 -mt-8 sm:-mt-12 relative z-20">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#e2dbd3] bg-[#072541]">
            <img
              src={coverUrl}
              alt={post.coverImage?.alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ── ARTICLE BODY ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-10">

          {/* Client / category info card */}
          {(post.client || post.category) && (
            <div className="bg-white rounded-2xl p-8 border border-[#e2dbd3] grid grid-cols-1 sm:grid-cols-2 gap-8 shadow-sm">
              {post.client && (
                <div>
                  <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] block mb-1">
                    Client
                  </span>
                  <p className="font-display text-xl font-black text-[#072541]">{post.client}</p>
                </div>
              )}
              {post.category && (
                <div>
                  <span className="text-[10px] font-display font-black uppercase tracking-widest text-[#e95f0c] block mb-1">
                    Category
                  </span>
                  <p className="font-display text-xl font-black text-[#072541]">{post.category}</p>
                </div>
              )}
            </div>
          )}

          {/* Portable Text body */}
          {hasBody && (
            <div>
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}

          {/* Content Produced */}
          {hasContent && (
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
          )}

          {/* Results */}
          {hasResults && (
            <div className="border-t border-b border-[#e2dbd3] py-12">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#072541] text-center mb-8">
                Campaign Results &amp; Impact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
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
          )}


        </div>

        <div className="mt-16 pt-8 border-t border-[#e2dbd3]">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-[#072541] font-display font-black hover:text-[#e95f0c] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>
      </section>

      {/* ── VISUAL HIGHLIGHTS SLIDER ── */}
      {hasGallery && (
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

            <div
              ref={scrollRef}
              className="flex items-center gap-6 overflow-x-auto pb-8 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {post.gallery.map((item, idx) => (
                <div key={item._key || idx} className="snap-start">
                  <GalleryCard item={item} onClick={openLightbox} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED BLOGS ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-20 border-t border-[#e2dbd3]">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="font-display text-3xl font-black text-[#072541] mb-12 text-center">
              Related Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rPost) => {
                const rSlug = rPost.slug?.current ?? rPost.slug;
                const rImg = rPost.coverImage?.asset
                  ? urlFor(rPost.coverImage).width(600).auto('format').url()
                  : '';
                return (
                  <Link
                    to={`/blogs/${rSlug}`}
                    key={rPost._id}
                    className="group flex flex-col h-full bg-[#f8f5f2] rounded-xl overflow-hidden border border-[#e2dbd3] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-[#072541]">
                      {rImg ? (
                        <img
                          src={rImg}
                          alt={rPost.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#072541] to-[#0f3d6b]" />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[10px] font-display font-bold text-[#e95f0c] uppercase tracking-wider mb-2">
                        {rPost.category}
                      </span>
                      <h3 className="font-display text-lg font-black text-[#072541] mb-3 group-hover:text-[#e95f0c] transition-colors leading-snug">
                        {rPost.title}
                      </h3>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f0eae4] text-[10px] text-[#9ca3af] font-display font-bold">
                        <span>{formatDate(rPost.publishedAt)}</span>
                        <span>{rPost.readingTime || ''}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
