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
      <Hero onBookCall={onBookCall} />
      <TrustedBy />
      <FeaturedWork />
      <SportsShowreel />
      <Statistics />
      <ServicesPreview />
      <PortfolioPreview />
      <AboutPreview />
      <LatestBlogs />
      <ContactCTA onBookCall={onBookCall} />
    </div>
  );
}
