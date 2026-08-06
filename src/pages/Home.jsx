import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import FeaturedWork from '../components/FeaturedWork';
import Statistics from '../components/Statistics';
import ServicesPreview from '../components/ServicesPreview';
import SportsShowreel from '../components/SportsShowreel';
import PortfolioPreview from '../components/PortfolioPreview';
import AboutPreview from '../components/AboutPreview';
import LatestBlogs from '../components/LatestBlogs';
import ContactCTA from '../components/ContactCTA';

export default function Home({ onBookCall }) {
  return (
    <div className="relative w-full">
      {/* 1. Hero Section */}
      <Hero onBookCall={onBookCall} />

      {/* 2. Trusted By Client Marquee */}
      <TrustedBy />

      {/* 3. Featured Work Grid */}
      <FeaturedWork />

      {/* 4. Statistics Index */}
      <Statistics />

      {/* 5. Services Preview Index */}
      <ServicesPreview />

      {/* 6. Sports Showreel Theater */}
      <SportsShowreel />

      {/* 7. Portfolio Preview Tabbed Filters */}
      <PortfolioPreview />

      {/* 8. About Preview Grid */}
      <AboutPreview />

      {/* 9. Latest Blogs Cards */}
      <LatestBlogs />

      {/* 10. Final Call to Action Consultation Banner */}
      <ContactCTA onBookCall={onBookCall} />
    </div>
  );
}
