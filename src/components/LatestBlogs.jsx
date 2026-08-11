import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { sanityClient } from '../sanity/client';
import { LATEST_BLOGS_QUERY } from '../sanity/queries';
import { urlFor } from '../sanity/image';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function SkeletonCard() {
  return (
    <div className="bg-[#f8f5f2] border border-[#e2dbd3] rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="aspect-[16/10] bg-[#e2dbd3]" />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="h-3 w-24 bg-[#e2dbd3] rounded-full" />
          <div className="h-3 w-16 bg-[#e2dbd3] rounded-full" />
        </div>
        <div className="h-5 w-full bg-[#e2dbd3] rounded-full" />
        <div className="h-5 w-3/4 bg-[#e2dbd3] rounded-full" />
        <div className="h-3 w-full bg-[#ede9e4] rounded-full mt-1" />
        <div className="h-3 w-5/6 bg-[#ede9e4] rounded-full" />
        <div className="flex justify-between mt-4 pt-4 border-t border-[#e2dbd3]">
          <div className="h-3 w-20 bg-[#e2dbd3] rounded-full" />
          <div className="h-3 w-10 bg-[#e2dbd3] rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function LatestBlogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(LATEST_BLOGS_QUERY)
      .then((data) => { if (!cancelled) setPosts(data ?? []); })
      .catch(() => { if (!cancelled) setPosts([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Don't render the section at all if we loaded and there's nothing
  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541]">
              Client Case Study Blogs
            </h2>
            <p className="text-[#4a5568] text-base mt-3 max-w-lg">
              Case study blogs about how our services improved our client's businesses, social media and their impact
            </p>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 font-display font-bold text-base text-[#e95f0c] hover:underline shrink-0"
          >
            Read All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((n) => <SkeletonCard key={n} />)
            : posts.map((post) => {
                const slug = post.slug?.current ?? post.slug;
                const imgSrc = post.coverImage?.asset
                  ? urlFor(post.coverImage).width(700).auto('format').url()
                  : '';

                return (
                  <Link
                    key={post._id}
                    to={`/blogs/${slug}`}
                    className="group bg-[#f8f5f2] border border-[#e2dbd3] rounded-2xl overflow-hidden hover:border-[#e95f0c] hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#072541]">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={post.coverImage?.alt || post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#072541] to-[#0f3d6b] flex items-center justify-center">
                          <span className="font-display font-black text-white/20 text-4xl">U</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-5 text-sm text-[#9ca3af] mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#e95f0c]" />
                          {formatDate(post.publishedAt)}
                        </span>
                        {post.readingTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-[#e95f0c]" />
                            {post.readingTime}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-xl font-bold text-[#072541] group-hover:text-[#e95f0c] transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-[#4a5568] text-base leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="pt-5 border-t border-[#e2dbd3] mt-5 flex items-center justify-between">
                        {post.client ? (
                          <span className="text-sm font-semibold text-[#072541]">{post.client}</span>
                        ) : (
                          <span className="text-sm font-semibold text-[#e95f0c] uppercase tracking-wider text-xs">
                            {post.category}
                          </span>
                        )}
                        <span className="text-sm text-[#e95f0c] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}
