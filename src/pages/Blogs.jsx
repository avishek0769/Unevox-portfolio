import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Case Studies',
  'Sports',
  'Social Media',
  'Branding',
  'Events',
  'Marketing',
  'Behind The Scenes',
];

export const BLOG_POSTS = [
  {
    id: 'post-1',
    slug: 'kkr-campaign',
    category: 'Sports',
    title: 'KKR Fan Engagement Campaign: Building the 12th Man Spirit',
    excerpt: 'How Unevox captured the energy of Eden Gardens to grow KKR\'s digital fan base by over 40% in a single season through premium cinematic reels.',
    date: 'April 24, 2025',
    readingTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1778864874646-1da1647a22df',
    client: 'Kolkata Knight Riders',
    challenge: 'Connecting with fans during off-stadium hours, creating virality in a noisy digital landscape, and maintaining consistent post-match hype.',
    approach: 'We deployed dedicated fast-action creators to capture Eden Gardens fan cams, cinematic player walkouts, off-field player banter, and high-impact sound-designed reels that fans could instantly share.',
    contentProduced: ['Cinematic Reels', 'Matchday Photography', 'Fan Reaction Videos', 'Social Media Graphics'],
    results: [
      { label: 'Audience Reach', value: '10M+ Reach' },
      { label: 'Engagement Increase', value: '45% Lift' },
      { label: 'Follower Growth', value: '120k+ New Fans' },
    ],
    gallery: [
      { type: 'image', aspect: 'landscape', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80' },
      { type: 'video', aspect: 'portrait', url: '/media/portrait-reel.mp4', thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', aspect: 'square', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', aspect: 'landscape', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80' },
    ],
    conclusion: 'By shifting focus from standard score updates to highly stylized, emotional fan narratives, we built a digital home for the KKR community that kept Eden Gardens alive on screens long after the last ball.',
  },
  {
    id: 'post-2',
    slug: 'durand-cup-coverage',
    category: 'Case Studies',
    title: 'Durand Cup 2024: Documenting Asia\'s Oldest Football Tournament',
    excerpt: 'A behind-the-scenes look at how we produced high-octane visual coverage for 43 matches in 30 days, capturing football heritage in India.',
    date: 'September 12, 2024',
    readingTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
    client: 'Durand Cup Organizing Committee',
    challenge: 'Managing high-volume, multi-city tournament content pipelines under strict broadcasting and media embargo deadlines.',
    approach: 'We formed decentralized teams across venues with standardized cloud-based asset tagging. Editors worked overnight to deliver same-day highlight reels, match trailers, and legendary player spotlights.',
    contentProduced: ['High-Definition Live Reels', 'Creative Retouching', 'Gameday Carousels', 'Official Tournament Promos'],
    results: [
      { label: 'Total Reel Views', value: '5.2M Views' },
      { label: 'Social Engagement', value: '38% Growth' },
      { label: 'National Syndication', value: 'Featured on Star Sports' },
    ],
    gallery: [
      { type: 'video', aspect: 'portrait', url: '/media/portrait-reel.mp4', thumbnail: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', aspect: 'landscape', url: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80' },
      { type: 'video', aspect: 'square', url: '/media/square-type-reel.mp4', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80' }
    ],
    conclusion: 'Our agile content workflows ensured Durand Cup maintained top-of-mind relevance throughout the month, proving that legacy sports properties can connect with Gen-Z using the right platform format strategy.',
  },
  {
    id: 'post-3',
    slug: 'behala-cup-2025',
    category: 'Events',
    title: 'Behala Cup 2025: Crafting the Visual Identity of a Local Legacy',
    excerpt: 'From tournament logo redesign to high-production live teasers, discover how we turned a local community cup into a premium sports festival.',
    date: 'January 18, 2025',
    readingTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80',
    client: 'Behala Sports Club',
    challenge: 'Modernizing a community tournament branding system to attract high-tier corporate sponsorships and wider regional engagement.',
    approach: 'We created an urban, street-art inspired visual identity for Behala Cup. This was applied across all tournament jersey designs, local banners, and digital marketing reels featuring local team stars.',
    contentProduced: ['Visual Brand Strategy', 'Promo Showreels', 'Matchday Graphics', 'Social Media Management'],
    results: [
      { label: 'Local Reach', value: '250k+ Reach' },
      { label: 'Stadium Turnout', value: 'Record 20k Fans' },
      { label: 'Sponsorship Value', value: '2.5x Increase' },
    ],
    gallery: [
      { type: 'image', aspect: 'landscape', url: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1200&q=80' },
      { type: 'video', aspect: 'portrait', url: '/media/portrait-reel.mp4', thumbnail: 'https://images.unsplash.com/photo-1624718501777-1f6e5e38a1b1?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', aspect: 'square', url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80' }
    ],
    conclusion: 'Elevating grassroots events through high-end digital design and cinematic video doesn\'t just benefit spectators—it creates a robust monetization platform for organizers and sponsors.',
  },
  {
    id: 'post-4',
    slug: 'behala-classical-festival',
    category: 'Behind The Scenes',
    title: 'Behala Classical Festival: Capturing the Soul of Indian Classical Music',
    excerpt: 'An artistic and visual exploration of capturing acoustic excellence and heritage stage settings on camera.',
    date: 'December 20, 2024',
    readingTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1759560245150-8dcbb7f01142',
    client: 'BCF Organizing Committee',
    challenge: 'Capturing low-light, warm-toned classical stages and intimate musical expressions silently without disrupting the live acoustic experience.',
    approach: 'Our photographers worked with silent mirrorless shutters in key stage pockets. We adopted a cinematic, moody color grade that highlighted the rich wooden tones, smoke, and classical instruments.',
    contentProduced: ['Aesthetic Stage Photography', 'Artist Portrayal Interviews', 'Recap Documentaries'],
    results: [
      { label: 'Archival Engagement', value: '30k+ Views' },
      { label: 'Brand Positioning', value: 'Premium Artistry' },
    ],
    gallery: [
      { type: 'image', aspect: 'landscape', url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80' },
      { type: 'video', aspect: 'portrait', url: '/media/portrait-reel.mp4', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', aspect: 'square', url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80' }
    ],
    conclusion: 'Visual content for cultural festivals requires an understanding of the art form itself. By letting the music guide the rhythm of our edits, we created a digital archive that respected and elevated the heritage stage.',
  },
];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase() || (activeCategory === 'Case Studies' && p.slug.endsWith('campaign') || p.slug.endsWith('coverage')));

  return (
    <div className="bg-[#f8f5f2] min-h-screen">

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              to={`/blogs/${post.slug}`}
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#e2dbd3] hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#072541]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-display font-bold text-[#e95f0c] uppercase tracking-wider mb-3">
                  <span>{post.category}</span>
                </div>
                <h3 className="font-display text-xl font-black text-[#072541] mb-3 group-hover:text-[#e95f0c] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-[#4a5568] text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#f0eae4] text-xs text-[#9ca3af] font-display font-bold">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
