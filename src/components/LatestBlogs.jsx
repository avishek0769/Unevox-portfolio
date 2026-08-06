import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: 'blog-1',
    title: 'The Stadium Feed: How to Capture Game-Day Adrenaline',
    category: 'Sports Media',
    snippet:
      'Unlocking the secrets to filming fast-paced action on the pitch — camera angles, frame rates, and split-second decisions that drive views.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    clientName: 'Durand Cup',
    clientLogo: '/client_logos/Durand_Cup.svg.webp',
    date: 'Aug 04, 2026',
    readTime: '5 min read',
  },
  {
    id: 'blog-2',
    title: 'Reels That Convert: Hooking the Modern Football Fan',
    category: 'Short-Form Video',
    snippet:
      'Short-form content rules the feed. The hook-retain-reward model that earned KKR and Durand Cup campaigns massive engagement.',
    image: 'https://images.unsplash.com/photo-1540747737956-378724044602?auto=format&fit=crop&w=800&q=80',
    clientName: 'Kolkata Knight Riders',
    clientLogo: '/client_logos/Kolkata_Knight_Riders_Logo.svg',
    date: 'Jul 28, 2026',
    readTime: '4 min read',
  },
  {
    id: 'blog-3',
    title: 'Beyond the Ground: Digital Branding for Athletic Leagues',
    category: 'Brand Strategy',
    snippet:
      'How local and national leagues can build year-round value and keep sponsors happy long after the final whistle.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    clientName: 'Behala SS Sporting Club',
    clientLogo: '/client_logos/behala_ss_sporting_club-logo.png',
    date: 'Jul 15, 2026',
    readTime: '6 min read',
  },
];

export default function LatestBlogs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-badge mb-3 inline-flex">Knowledge</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541]">
              Latest Insights
            </h2>
            <p className="text-[#4a5568] text-base mt-3 max-w-lg">
              Guides on sports marketing, creative direction, and digital content operations.
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
          {blogs.map((post) => (
            <article
              key={post.id}
              className="group bg-[#f8f5f2] border border-[#e2dbd3] rounded-2xl overflow-hidden hover:border-[#e95f0c] hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-sm font-display font-bold text-[#e95f0c]">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-5 text-sm text-[#9ca3af] mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#e95f0c]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#e95f0c]" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#072541] group-hover:text-[#e95f0c] transition-colors line-clamp-2 mb-3">
                  {post.title}
                </h3>
                <p className="text-[#4a5568] text-base leading-relaxed line-clamp-3 flex-1">
                  {post.snippet}
                </p>

                <div className="pt-5 border-t border-[#e2dbd3] mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e2dbd3] bg-white flex items-center justify-center p-1">
                      <img
                        src={post.clientLogo}
                        alt={post.clientName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-semibold text-[#072541]">{post.clientName}</span>
                  </div>
                  <span className="text-sm text-[#e95f0c] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
