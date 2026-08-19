import React from 'react';

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://unevox.com/assets/unevox_logo.png',
  structuredData
}) {
  const siteTitle = title ? `${title} | Unevox` : 'Unevox | Social Media Marketing & Sports Production Agency';
  const siteDescription = description || 'Unevox is a premier sports-inspired creative agency specializing in social media management, sports media production, videography, photography, and branding.';
  
  // Safe canonical URL resolution
  let currentUrl = 'https://unevox.com';
  if (typeof window !== 'undefined') {
    currentUrl = canonicalUrl || `${window.location.origin}${window.location.pathname}`;
  } else if (canonicalUrl) {
    currentUrl = canonicalUrl;
  }

  return (
    <>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Unevox" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </>
  );
}
