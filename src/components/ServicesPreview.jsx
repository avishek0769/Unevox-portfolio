import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Trophy, Megaphone, Camera, Video, Palette, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Trophy,
    title: 'Sports Media Production',
    description:
      'High-octane match coverage, athlete promos, and league hype reels that put your brand at the heart of the action.',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description:
      'End-to-end content calendars, daily publishing, and community growth strategies tailored to your audience.',
  },
  {
    icon: Video,
    title: 'Video & Reel Production',
    description:
      'Cinematic showreels, short-form content, and corporate films crafted for maximum platform reach.',
  },
  {
    icon: Camera,
    title: 'Photography',
    description:
      'Professional sports action shots, event photography, and product imagery shot with precision and passion.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Performance campaigns, paid ads, and organic growth plans that convert audiences into loyal followers.',
  },
  {
    icon: Palette,
    title: 'Creative Graphics & Branding',
    description:
      'Visual identity systems, matchday posters, merchandise design, and premium brand assets.',
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-badge mb-3 inline-flex">Capabilities</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#072541]">
              What We Do
            </h2>
            <p className="text-[#4a5568] text-base mt-3 max-w-lg">
              Six focused disciplines — every one built to push your brand further.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-display font-bold text-base text-[#e95f0c] hover:underline shrink-0"
          >
            See all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card-light rounded-2xl p-8 flex flex-col gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#e95f0c]/10 flex items-center justify-center text-[#e95f0c] group-hover:bg-[#e95f0c] group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#072541] mb-3 group-hover:text-[#e95f0c] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#4a5568] text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-[#e2dbd3] flex items-center gap-2 text-sm text-[#e95f0c] font-semibold">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
