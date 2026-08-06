import React, { useRef, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';

const ROW1_TESTIMONIALS = [
  {
    name: 'Joydeep Mukherjee',
    company: 'Kolkata Knight Riders (KKR)',
    designation: 'Head of Digital Content',
    rating: 5,
    review: 'Unevox delivered spectacular gameday reel concepts that resonated deeply with our fan base. Their ability to capture stadium emotions and translate them into high-performing short-form videos is unmatched.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Col. S. P. Singh',
    company: 'Durand Cup Organizing Committee',
    designation: 'Media Coordinator',
    rating: 5,
    review: 'Capturing the heritage and pace of Durand Cup across multiple stadiums was a massive challenge. The Unevox crew handled the intense match schedules and delivered same-day edits that elevated our reach.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Subrata Dutta',
    company: 'IFA Bengal (CFL)',
    designation: 'Senior Vice President',
    rating: 5,
    review: 'The match coverage and promotional campaign reels produced by Unevox for CFL 2025 gave the tournament a highly professional, modern feel. Engagement metrics on our social channels skyrocketed.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Anirban Banerjee',
    company: 'Behala Sports Club (Behala Cup)',
    designation: 'Tournament Director',
    rating: 5,
    review: 'Unevox did a complete rebranding overhaul for Behala Cup. Their promotional teasers and live coverage helped us secure premium corporate sponsors and record-breaking stadium attendance.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Sujit Sen',
    company: 'Behala SS Sporting Club',
    designation: 'General Secretary',
    rating: 5,
    review: 'Their photography team has an incredible eye for action. Every matchday summary and training reel captured the raw dedication of our squad. Highly recommended for sports branding.',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
  },
];

const ROW2_TESTIMONIALS = [
  {
    name: 'Arijit Maitra',
    company: 'Suruchi Sangha',
    designation: 'Cultural Secretary',
    rating: 5,
    review: 'Unevox captured the grand scale and artistic detailing of our festival installations. Their festive reels and campaign strategy generated millions of impressions online.',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Sandip Chakraborty',
    company: 'Behala Nutan Dal',
    designation: 'Executive Member',
    rating: 5,
    review: 'Their social media coverage of our festival theme was spectacular. The edits were polished, fast-paced, and drove unprecedented crowd engagement during the festive week.',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Amitav Ray',
    company: 'Ripley Group',
    designation: 'Head of Corporate Communications',
    rating: 5,
    review: 'We partnered with Unevox for our corporate video production. Their professionalism, scriptwriting quality, and cinematography resulted in a premium video that we proudly present to clients.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Rhea Kapoor',
    company: 'Café Krysalis',
    designation: 'Co-founder',
    rating: 5,
    review: "Unevox crafted a warm, gourmet aesthetic for our social media handles. Their photography and creative videos perfectly portray our cafe's ambiance and food styling.",
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Vikram Malhotra',
    company: 'Rainbow House Banquet',
    designation: 'General Manager',
    rating: 5,
    review: 'The promotional campaigns and venue photography created by Unevox helped showcase our banquets in the most premium light, leading to a direct surge in wedding bookings.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
];

function TestimonialCard({ item }) {
  return (
    <div className="w-[350px] sm:w-[420px] shrink-0 bg-white border border-[#e2dbd3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#e95f0c] transition-all duration-300 group">
      <div>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#e95f0c] text-[#e95f0c]" />
          ))}
        </div>
        <p className="text-[#4a5568] text-sm sm:text-base leading-relaxed mb-6 font-medium italic">
          "{item.review}"
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#f0eae4]">
        {item.photo && (
          <img
            src={item.photo}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover border border-[#e2dbd3]"
          />
        )}
        <div>
          <h4 className="font-display font-bold text-sm sm:text-base text-[#072541] group-hover:text-[#e95f0c] transition-colors leading-tight">
            {item.name}
          </h4>
          <p className="text-xs text-[#9ca3af] font-semibold mt-0.5">
            {item.designation ? `${item.designation}, ` : ''}{item.company}
          </p>
        </div>
      </div>
    </div>
  );
}

function ScrollingRow({ items, direction = 'left' }) {
  const containerRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    const speed = 0.6; // Scroll speed multiplier

    const scrollLoop = () => {
      if (!isHovered.current) {
        if (direction === 'left') {
          container.scrollLeft += speed;
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0;
          }
        } else {
          container.scrollLeft -= speed;
          if (container.scrollLeft <= 0) {
            container.scrollLeft = container.scrollWidth / 2;
          }
        }
      }
      animationId = requestAnimationFrame(scrollLoop);
    };

    // Pre-scroll slightly for right row to avoid immediate jump
    if (direction === 'right') {
      container.scrollLeft = container.scrollWidth / 2;
    }

    animationId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationId);
  }, [direction]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      className="flex gap-6 overflow-x-auto py-4 scrollbar-none select-none cursor-grab active:cursor-grabbing"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {[...items, ...items].map((item, idx) => (
        <TestimonialCard key={idx} item={item} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#f8f5f2] border-t border-[#e2dbd3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-14">
        <span className="section-badge mb-3 inline-flex">
          <MessageSquare className="w-3.5 h-3.5 mr-1" /> Reviews
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541]">
          What Our Clients Say
        </h2>
        <p className="text-[#4a5568] text-base mt-3 max-w-xl">
          The trust of our clients is the foundation of everything we create.
        </p>
      </div>

      {/* Scrolling Marquees */}
      <div className="space-y-6">
        <ScrollingRow items={ROW1_TESTIMONIALS} direction="left" />
        <ScrollingRow items={ROW2_TESTIMONIALS} direction="right" />
      </div>
    </section>
  );
}
