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

export default function Footer({ onBookCall }) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    quickLinks: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Achievements', path: '/achievements' },
      { name: 'Blogs', path: '/blogs' },
      { name: 'Contact', path: '/contact' }
    ],
    services: [
      { name: 'Social Media Management', path: '/services' },
      { name: 'Sports Media Production', path: '/services' },
      { name: 'Digital Marketing', path: '/services' },
      { name: 'Business Development', path: '/services' },
      { name: 'Festival Promotions', path: '/services' },
      { name: 'Event Promotions', path: '/services' }
    ]
  };

  return (
    <footer className="relative bg-obsidian border-t border-slate-border/80 pt-20 pb-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-volt/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-volt to-electric-cyan p-[1px] overflow-hidden">
                <div className="absolute inset-0 bg-obsidian rounded-xl" />
                <span className="relative font-display font-black text-xl text-volt z-10">U</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white tracking-wide leading-none">UNEVOX</span>
                <span className="text-[9px] text-text-secondary tracking-widest font-semibold uppercase">CREATIVE AGENCY</span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Where brands breathe, and every pixel pulses with purpose. We are the premier creative partner for sports organizations, festivals, and growth-driven brands.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-card border border-slate-border/60 flex items-center justify-center text-text-secondary hover:text-volt hover:border-volt transition-all duration-200"
                aria-label="Instagram link"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-card border border-slate-border/60 flex items-center justify-center text-text-secondary hover:text-volt hover:border-volt transition-all duration-200"
                aria-label="Facebook link"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-card border border-slate-border/60 flex items-center justify-center text-text-secondary hover:text-volt hover:border-volt transition-all duration-200"
                aria-label="YouTube link"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-card border border-slate-border/60 flex items-center justify-center text-text-secondary hover:text-volt hover:border-volt transition-all duration-200"
                aria-label="LinkedIn link"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-100 border-l-2 border-volt pl-3">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-text-secondary hover:text-volt transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-border group-hover:bg-volt group-hover:w-2 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-100 border-l-2 border-volt pl-3">Our Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-text-secondary hover:text-volt transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-border group-hover:bg-volt group-hover:w-2 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information Column */}
          <div className="space-y-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-100 border-l-2 border-volt pl-3">Contact info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPin className="w-5 h-5 text-volt shrink-0 mt-0.5" />
                <span>87 Satyen Roy Road, Behala, Kolkata - 700034</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail className="w-5 h-5 text-volt shrink-0" />
                <a href="mailto:unevox.connect@gmail.com" className="hover:text-volt transition-colors">unevox.connect@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <Phone className="w-5 h-5 text-volt shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="tel:8617228753" className="hover:text-volt transition-colors">8617228753</a>
                  <a href="tel:9123638485" className="hover:text-volt transition-colors">9123638485</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-text-muted text-center md:text-left">
            &copy; {currentYear} Unevox Services OPC Pvt. Ltd. All rights reserved. Where brands breathe.
          </p>
          <div className="flex items-center gap-6">
            <button 
              onClick={onBookCall}
              className="text-xs text-text-secondary hover:text-volt transition-colors font-semibold"
            >
              Book Consultation
            </button>
            <button
              onClick={handleScrollToTop}
              className="w-10 h-10 rounded-full bg-slate-card border border-slate-border/80 flex items-center justify-center text-text-secondary hover:text-volt hover:border-volt hover:scale-105 active:scale-95 transition-all duration-200"
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
