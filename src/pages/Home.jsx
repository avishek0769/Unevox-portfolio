import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import FeaturedWork from '../components/FeaturedWork';
import Statistics from '../components/Statistics';
import ServicesPreview from '../components/ServicesPreview';
import Showreel from '../components/Showreel';
import PortfolioPreview from '../components/PortfolioPreview';
import AboutPreview from '../components/AboutPreview';
import Testimonials from '../components/Testimonials';
import LatestBlogs from '../components/LatestBlogs';
import ContactCTA from '../components/ContactCTA';
import SEO from '../components/SEO';

export default function Home({ onBookCall }) {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Unevox",
    "url": "https://unevox.com",
    "logo": "https://unevox.com/assets/unevox_logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918617228753",
      "contactType": "customer service",
      "email": "unevox.connect@gmail.com"
    },
    "sameAs": [
      "https://www.instagram.com/unevox_",
      "https://facebook.com",
      "https://youtube.com",
      "https://linkedin.com"
    ]
  };

  return (
    <div className="relative w-full">
      <SEO 
        title="Home"
        description="Unevox is a premier sports-inspired creative agency specializing in social media management, sports media production, videography, photography, and branding."
        structuredData={homeSchema}
      />
      <Hero onBookCall={onBookCall} />
      <TrustedBy />
      <FeaturedWork />
      <Showreel />
      <Statistics />
      <PortfolioPreview />
      <ServicesPreview />
      <AboutPreview />
      <Testimonials />
      <LatestBlogs />
      <ContactCTA onBookCall={onBookCall} />
    </div>
  );
}
