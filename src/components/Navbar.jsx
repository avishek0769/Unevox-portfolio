import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, Sparkles } from 'lucide-react';

export default function Navbar({ onBookCall }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' }
  ];

  // Helper to check if link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-obsidian/85 backdrop-blur-md border-b border-slate-border/50 shadow-lg' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-volt to-electric-cyan p-[1px] overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <div className="absolute inset-0 bg-obsidian rounded-xl" />
            <span className="relative font-display font-black text-xl text-volt tracking-tighter z-10">U</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-electric-cyan rounded-full blur-md opacity-70 group-hover:bg-volt transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-white tracking-wide leading-none group-hover:text-volt transition-colors">UNEVOX</span>
            <span className="text-[9px] text-text-secondary tracking-widest font-semibold uppercase">CREATIVE AGENCY</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-display text-sm font-semibold tracking-wide transition-all duration-200 hover:text-volt ${
                isActive(link.path) ? 'text-volt border-b-2 border-volt pb-1' : 'text-slate-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Call CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onBookCall}
            className="px-6 py-2.5 rounded-full font-display font-bold text-sm text-obsidian bg-volt hover:bg-volt-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-volt/10"
          >
            <PhoneCall className="w-4 h-4" />
            Book Free Call
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={onBookCall}
            className="p-2 rounded-full text-volt bg-volt/10 hover:bg-volt/20 transition-all duration-200"
            aria-label="Book Call"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-card border border-slate-border/80 focus:outline-none transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-y-0 right-0 w-[280px] z-50 bg-slate-dark/95 border-l border-slate-border/80 backdrop-blur-xl shadow-2xl p-6 transition-transform duration-300 transform lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-border/80">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-white">UNEVOX</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-slate-border text-text-secondary hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`font-display text-base font-semibold transition-all duration-200 py-1 ${
                isActive(link.path) ? 'text-volt border-l-2 border-volt pl-3' : 'text-slate-300 hover:text-volt hover:pl-2'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-6 border-t border-slate-border/80 mt-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onBookCall();
              }}
              className="w-full justify-center px-6 py-3 rounded-xl font-display font-bold text-obsidian bg-volt hover:bg-volt-hover transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-volt/20"
            >
              <PhoneCall className="w-4 h-4" />
              Book Free Call
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
