import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const serviceLinks = [
  'Social Media Management',
  'Sports Media Production',
  'Digital Marketing',
  'Videography',
  'Photography',
  'Creative Graphics & Branding',
];

const socials = [
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/unevox_' },
  { Icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com' },
  { Icon: YoutubeIcon, label: 'YouTube', href: 'https://youtube.com' },
  { Icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function Footer({ onBookCall }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#072541] text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img src="/assets/unevox_logo.png" alt="Unevox" className="h-12 w-auto brightness-0 invert" />
              <span className="font-display font-black text-xl tracking-tighter text-white">UNEVOX</span>
            </Link>
            <p className="text-base text-white/60 leading-relaxed max-w-xs">
              Where brands breathe, and every pixel pulses with purpose. Premier creative partner for sports, culture, and growth.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-[#e95f0c] hover:border-[#e95f0c]/50 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="font-display text-base font-bold uppercase tracking-widest text-white border-l-2 border-[#e95f0c] pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-base text-white/60 hover:text-[#e95f0c] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#e95f0c] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="font-display text-base font-bold uppercase tracking-widest text-white border-l-2 border-[#e95f0c] pl-3">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((name) => (
                <li key={name}>
                  <Link
                    to="/services"
                    className="text-base text-white/60 hover:text-[#e95f0c] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#e95f0c] transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="font-display text-base font-bold uppercase tracking-widest text-white border-l-2 border-[#e95f0c] pl-3">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base text-white/60">
                <MapPin className="w-5 h-5 text-[#e95f0c] shrink-0 mt-0.5" />
                <span>87 Satyen Roy Road, Behala, Kolkata – 700034</span>
              </li>
              <li className="flex items-center gap-3 text-base text-white/60">
                <Mail className="w-5 h-5 text-[#e95f0c] shrink-0" />
                <a href="mailto:unevox.connect@gmail.com" className="hover:text-[#e95f0c] transition-colors">
                  unevox.connect@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-base text-white/60">
                <Phone className="w-5 h-5 text-[#e95f0c] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:8617228753" className="hover:text-[#e95f0c] transition-colors">8617228753</a>
                  <a href="tel:9123638485" className="hover:text-[#e95f0c] transition-colors">9123638485</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-sm text-white/40 text-center sm:text-left">
            &copy; {year} Unevox Services OPC Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={onBookCall}
              className="text-sm font-semibold text-white/50 hover:text-[#e95f0c] transition-colors cursor-pointer"
            >
              Book Consultation
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#e95f0c] hover:border-[#e95f0c]/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
