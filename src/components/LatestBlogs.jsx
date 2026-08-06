import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

export default function LatestBlogs() {
  const blogs = [
    {
      id: 'blog-1',
      title: 'The Stadium Feed: How to Capture Game-Day Adrenaline',
      category: 'Sports Media',
      snippet: 'Unlocking the secrets to filming fast-paced action on the pitch. Learn how camera angles, frame rates, and split-second decisions drive views.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      author: 'Avishek Adhikary',
      date: 'Aug 04, 2026',
      readTime: '5 min read'
    },
    {
      id: 'blog-2',
      title: 'Reels That Convert: Hooking the Modern Football Fan',
      category: 'Short-Form Video',
      snippet: 'Short-form content rules the feed. We break down the hook-retain-reward model that earned KKR and Durand Cup campaigns massive engagement.',
      image: 'https://images.unsplash.com/photo-1540747737956-378724044602?auto=format&fit=crop&w=800&q=80',
      author: 'Rohit Sen',
      date: 'Jul 28, 2026',
      readTime: '4 min read'
    },
    {
      id: 'blog-3',
      title: 'Beyond the Ground: Digital Branding for Athletic Leagues',
      category: 'Brand Strategy',
      snippet: 'How local and national leagues can build year-round value and keep sponsors happy long after the final whistle has blown.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
      author: 'Debayan Mitra',
      date: 'Jul 15, 2026',
      readTime: '6 min read'
    }
  ];

  return (
    <section className="py-24 bg-obsidian relative">
      {/* Background design */}
      <div className="absolute inset-0 sports-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-volt/20 bg-volt/5 text-volt font-display text-[10px] font-bold uppercase tracking-wider mb-3">
              Knowledge
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Latest Insights
            </h2>
            <p className="text-text-secondary mt-3 max-w-xl">
              Stay ahead with our guides on sports marketing, creative direction, and digital content operations.
            </p>
          </div>
          <div>
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-2 font-display font-bold text-sm text-volt hover:text-volt-hover group transition-colors duration-200"
            >
              Read All Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article 
              key={post.id}
              className="group bg-slate-card border border-slate-border/50 rounded-3xl overflow-hidden hover:border-volt/30 transition-all duration-300 flex flex-col h-full"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-dark">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-card via-transparent to-transparent opacity-80 z-10" />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg glassmorphism text-[10px] font-display font-bold text-volt">
                  {post.category}
                </div>
              </div>

              {/* Blog Details */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Meta stats */}
                  <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-volt" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-volt" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-volt transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm leading-relaxed mt-3 line-clamp-3">
                    {post.postSnippet || post.snippet}
                  </p>
                </div>

                {/* Author & CTA */}
                <div className="pt-6 border-t border-slate-border/50 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-border flex items-center justify-center text-volt">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-slate-300 font-semibold">{post.author}</span>
                  </div>

                  <span className="text-xs text-volt font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article
                    <ArrowRight className="w-3 h-3" />
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
