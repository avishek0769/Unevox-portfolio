import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Lightbulb, BookOpen, Star, Handshake,
    ArrowRight, Calendar, ChevronRight, Phone, Package
} from 'lucide-react';
import CustomizePackageModal from '../components/CustomizePackageModal';

// ─── DATA ────────────────────────────────────────────────────────────────────

const team = [
    {
        id: 'team-1',
        name: 'Fullname',
        role: 'Founder & Creative Director',
        bio: 'TODO — Replace with actual founder name and bio once provided by the client.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'team-2',
        name: 'Fullname',
        role: 'Head of Production',
        bio: 'TODO — Replace with actual team member name and bio once provided by the client.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'team-3',
        name: 'Fullname',
        role: 'Social Media Strategist',
        bio: 'TODO — Replace with actual team member name and bio once provided by the client.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
];

const milestones = [
    {
        title: 'Unevox Founded - 2024',
        body: 'Unevox was founded in November 2024 with a vision to bring creative storytelling, digital marketing, and media production together under one roof.',
        accent: '#e95f0c',
    },
    {
        title: 'City’s First Durga Puja Social Campaign',
        body: 'Unevox pioneered a dedicated social media campaign for Kolkata’s Puja clubs, combining photography, reels, videos, and real-time digital storytelling to bring the celebrations to a wider audience.',
        accent: '#7c3aed',
    },
    {
        title: '20+ Brands & Companies',
        body: 'In just 1.6 years, Unevox has built a diverse portfolio by working with 20+ brands, companies, sports organisations, cultural events, and other clients.',
        accent: '#0284c7',
    },
    {
        title: 'A Multi-Genre Creative Portfolio',
        body: 'From sports and cultural events to hospitality, corporate, and digital campaigns, Unevox has developed a strong portfolio across multiple creative genres.',
        accent: '#059669',
    },
    {
        title: 'Recognised by Our Clients',
        body: 'Unevox has been felicitated by clients for outstanding work, creative execution, and quality deliverables across various projects.',
        accent: '#d97706',
    },
];

// ─── HERO ────────────────────────────────────────────────────────────────────

function HeroSection() {
    return (
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-white">
            {/* Accent glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-[#e95f0c]/10 blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#072541] leading-[1.05] tracking-tight mb-8">
                    Every Brand Has a Story.{' '}
                    <br />
                    We Make It
                    <br />
                    <span className="text-[#e95f0c]">Impossible to Ignore.</span>
                </h1>

                <p className="text-black/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                    A creative media agency crafting impactful visual stories through strategy, creativity, and premium content production.
                </p>
            </div>
        </section>
    );
}

// ─── STORY ───────────────────────────────────────────────────────────────────

function StorySection() {
    return (
        <section className="py-28 bg-[#f8f5f2]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left — image block */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                                alt="Unevox team at work"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#072541]/60 to-transparent" />
                        </div>
                        {/* Floating stat card */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-[#e2dbd3]">
                            <p className="text-[#e95f0c] font-display font-black text-3xl">30+</p>
                            <p className="text-[#072541] font-display font-bold text-sm mt-0.5">Total Clients served</p>
                        </div>
                        {/* Decorative accent square */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl border-2 border-[#e95f0c]/30 z-[-1]" />
                    </div>

                    {/* Right — text */}
                    <div>
                        <span className="section-badge mb-6 inline-flex">Our Story</span>
                        <h2 className="font-display text-5xl sm:text-6xl font-black text-[#072541] leading-none tracking-tight mb-8">
                            The Unevox <span className="text-[#e95f0c]">Story</span>
                        </h2>

                        <div className="space-y-5 text-[#4a5568] text-base leading-relaxed">
                            <p>
                                At Unevox, we turn ideas into impactful digital experiences through creative storytelling, strategic social media, and visually engaging content. We work closely with brands, organizations, and events to build stronger identities and meaningful connections with their audiences.
                            </p>
                            <p>
                                For what makes unevox the best is our vision to tell stories that matter 60th glorious year, we planned unique content ideas - from a heartfelt to a and a vibrant dance performance video that beautifully captured the spirit of their celebration and legacy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── TEAM ────────────────────────────────────────────────────────────────────

function TeamCard({ member }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="group bg-white border border-[#e2dbd3] rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#e95f0c]/40 transition-all duration-300"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Photo */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#072541]">
                <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072541]/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#e95f0c] text-white text-xs font-display font-black uppercase tracking-wider">
                        {member.role}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-6">
                <h3 className="font-display text-lg font-black text-[#072541] group-hover:text-[#e95f0c] transition-colors">
                    {member.name}
                </h3>
                <p className="text-[#4a5568] text-sm mt-2 leading-relaxed">{member.bio}</p>
            </div>
        </div>
    );
}

function TeamSection() {
    return (
        <section className="py-28 bg-[#f8f5f2] border-t border-[#e2dbd3]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-16">
                    <span className="section-badge mb-6 inline-flex">The Team</span>
                    <h2 className="font-display text-5xl sm:text-6xl font-black text-[#072541] leading-none tracking-tight">
                        Meet The People <span className="text-[#e95f0c]">Behind Unevox</span>
                    </h2>
                    <p className="text-[#4a5568] text-base mt-4 max-w-lg mx-auto leading-relaxed">
                        A passionate group of creatives, strategists, and storytellers dedicated to exceptional work.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {team.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── JOURNEY / TIMELINE ──────────────────────────────────────────────────────

function JourneySection() {
    return (
        <section className="py-28 bg-white border-t border-[#e2dbd3] overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                <div className="text-center mb-20">
                    <span className="section-badge mb-6 inline-flex">
                        <Calendar className="w-3.5 h-3.5 mr-1" /> Milestones
                    </span>
                    <h2 className="font-display text-5xl sm:text-6xl font-black text-[#072541] leading-none tracking-tight">
                        Our <span className="text-[#e95f0c]">Journey</span>
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical spine */}
                    <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-[#e2dbd3] -translate-x-1/2" />

                    <div className="space-y-12">
                        {milestones.map((item, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <div
                                    key={i}
                                    className={`relative flex items-start gap-8 sm:gap-0 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                                        }`}
                                >
                                    {/* Text block */}
                                    <div className={`pl-16 sm:pl-0 flex-1 ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                                        {/* <span
                                            className="inline-block text-xs font-display font-black uppercase tracking-widest mb-1"
                                            style={{ color: item.accent }}
                                        >
                                            {item.year}
                                        </span> */}
                                        <h3 className="font-display text-xl font-bold text-[#072541] mb-1">{item.title}</h3>
                                        <p className="text-[#4a5568] text-sm leading-relaxed">{item.body}</p>
                                    </div>

                                    {/* Dot */}
                                    <div
                                        className="absolute left-8 sm:left-1/2 top-1 w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 shrink-0 transition-transform duration-300 hover:scale-125"
                                        style={{ background: item.accent, boxShadow: `0 0 10px ${item.accent}88` }}
                                    />

                                    {/* Empty spacer for alternating side */}
                                    <div className="hidden sm:block flex-1" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTASection({ onBookCall }) {
    const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

    return (
        <>
            <section className="py-28 bg-[#072541] relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#e95f0c]/15 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e95f0c]/40 bg-[#e95f0c]/10 text-[#e95f0c] text-xs font-display font-black uppercase tracking-widest mb-8">
                        Start a Conversation
                    </span>
                    <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                        Let's Create Something{' '}
                        <span className="text-[#e95f0c]">Extraordinary</span>{' '}
                        Together.
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
                        Whether you're a sports club, brand, business, or event organizer — let's bring your story to life.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onBookCall}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#e95f0c] text-white font-display font-bold text-base hover:bg-[#d04f08] transition-all duration-300 shadow-xl shadow-[#e95f0c]/30 cursor-pointer"
                        >
                            <Phone className="w-4 h-4" /> Book a Free Call
                        </button>
                        <button
                            onClick={() => setIsCustomizeOpen(true)}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-display font-bold text-base hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <Package className="w-4 h-4" /> Customize Your Package
                        </button>
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/70 font-display font-bold text-base hover:bg-white/10 transition-all duration-300"
                        >
                            View Our Portfolio <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <CustomizePackageModal
                isOpen={isCustomizeOpen}
                onClose={() => setIsCustomizeOpen(false)}
            />
        </>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function About({ onBookCall }) {
    return (
        <div>
            <HeroSection />
            <StorySection />
            <TeamSection />
            <JourneySection />
            <CTASection onBookCall={onBookCall} />
        </div>
    );
}
