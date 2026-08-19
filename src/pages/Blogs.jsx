import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, AlertCircle } from 'lucide-react';
import { sanityClient } from '../sanity/client';
import { BLOGS_QUERY } from '../sanity/queries';
import { urlFor } from '../sanity/image';
import SEO from '../components/SEO';

const CATEGORIES = [
  'All',
  'Sports',
  'Social Media',
  'Branding',
  'Events',
  'Marketing',
  'Behind The Scenes',
  'Cultural Events',
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getCoverUrl(coverImage) {
  if (!coverImage?.asset) return '';
  return urlFor(coverImage).width(800).auto('format').url();
}

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e2dbd3] flex flex-col animate-pulse">
      <div className="aspect-[16/10] bg-[#e2dbd3]" />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-3 w-20 bg-[#e2dbd3] rounded-full" />
        <div className="h-5 w-full bg-[#e2dbd3] rounded-full" />
        <div className="h-5 w-4/5 bg-[#e2dbd3] rounded-full" />
        <div className="h-3 w-full bg-[#ede9e4] rounded-full mt-1" />
        <div className="h-3 w-3/4 bg-[#ede9e4] rounded-full" />
        <div className="flex justify-between mt-4 pt-4 border-t border-[#f0eae4]">
          <div className="h-3 w-24 bg-[#e2dbd3] rounded-full" />
          <div className="h-3 w-16 bg-[#e2dbd3] rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── BLOG CARD ────────────────────────────────────────────────────────────────
function BlogCard({ post }) {
  const slug = post.slug?.current ?? post.slug;
  const imgSrc = getCoverUrl(post.coverImage);

  return (
    <Link
      to={`/blogs/${slug}`}
      className="bg-white rounded-2xl overflow-hidden border border-[#e2dbd3] hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#072541]">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={post.coverImage?.alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#072541] to-[#0f3d6b]">
            <span className="font-display font-black text-white/20 text-4xl">U</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs font-display font-bold text-[#e95f0c] uppercase tracking-wider mb-3">
          <span>{post.category}</span>
        </div>
        <h3 className="font-display text-xl font-black text-[#072541] mb-3 group-hover:text-[#e95f0c] transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-[#4a5568] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-[#f0eae4] text-xs text-[#9ca3af] font-display font-bold">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime || '—'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── MAIN BLOGS PAGE ──────────────────────────────────────────────────────────
export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchBlogs() {
      setLoading(true);
      setError(false);
      try {
        const data = await sanityClient.fetch(BLOGS_QUERY);
        if (!cancelled) setPosts(data ?? []);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBlogs();
    return () => { cancelled = true; };
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (activeCategory === 'All') return true;
    const cat = (post.category || '').toLowerCase();
    const active = activeCategory.toLowerCase();
    if (active === 'events') return cat.includes('event');
    if (active === 'behind the scenes') return cat.includes('behind');
    return cat === active;
  });

  return (
    <div className="bg-[#f8f5f2] min-h-screen">
      <SEO 
        title="Our Blogs & Insights"
        description="Stay updated with insights, design inspiration, case studies, and creative production thoughts from the Unevox team."
      />

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-16 bg-white overflow-hidden">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#072541] leading-[1.05] tracking-tight mb-5">
            Stories Behind<br />
            <span className="text-[#e95f0c]">The Success.</span>
          </h1>
          <p className="text-[#4a5568] text-lg max-w-2xl mx-auto leading-relaxed">
            Explore case studies, creative journeys, campaign breakdowns, and the impact we've created for brands across sports, culture, hospitality, and beyond.
          </p>
        </div>
      </section>

      {/* ── CATEGORIES FILTER ── */}
      <div className="sticky top-[64px] z-40 bg-[#f8f5f2]/95 backdrop-blur-sm border-b border-[#e2dbd3]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div
            className="flex items-center gap-2 overflow-x-auto py-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full font-display text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-200 shrink-0"
                style={{
                  background: activeCategory === cat ? '#072541' : '#ede9e4',
                  color: activeCategory === cat ? 'white' : '#4a5568',
                  boxShadow: activeCategory === cat ? '0 4px 14px rgba(7,37,65,0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BLOG GRID ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="font-display text-2xl font-black text-[#072541] mb-2">
              Something went wrong
            </h2>
            <p className="text-[#4a5568] max-w-sm mb-8">
              We couldn't load the articles right now. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 rounded-full font-display font-bold text-white bg-[#e95f0c] hover:bg-[#c94d08] transition-all duration-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-[#e2dbd3] px-6">
            <div className="w-16 h-16 rounded-full bg-[#f8f5f2] flex items-center justify-center mb-6">
              <ArrowRight className="w-7 h-7 text-[#e95f0c]" />
            </div>
            <h3 className="font-display text-2xl font-black text-[#072541] mb-2">
              No articles yet
            </h3>
            <p className="text-[#4a5568] max-w-sm">
              {activeCategory === 'All'
                ? "We're working on some exciting content. Check back soon!"
                : `We haven't published any "${activeCategory}" articles yet. Browse another category.`}
            </p>
          </div>
        )}

        {/* Blog grid */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
