// Listing query – used by Blogs page and LatestBlogs component
export const BLOGS_QUERY = `
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    readingTime,
    coverImage {
      asset
    },
    client
  }
`;

// Home-page preview – latest 3 blogs only
export const LATEST_BLOGS_QUERY = `
  *[_type == "blog"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    readingTime,
    client,
    coverImage {
      asset
    }
  }
`;

// Full detail query – used by BlogPost page
export const BLOG_BY_SLUG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    readingTime,

    coverImage {
      asset
    },

    client,
    contentProduced,
    results,

    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },

    gallery[] {
      _key,
      type,
      aspect,
      image {
        asset
      },
      video {
        asset->
      }
    }
  }
`;

// Related posts query – latest N posts excluding a given ID
export const RELATED_BLOGS_QUERY = `
  *[_type == "blog" && _id != $currentId] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    readingTime,
    coverImage {
      asset
    }
  }
`;

// Showreel query – all reels ordered by sequence number and creation date
export const SHOWREEL_QUERY = `
  *[_type == "showreel"] | order(order asc, _createdAt asc) {
    "id": _id,
    clientName,
    type,
    videoUrl,
    "videoFileUrl": videoFile.asset->url
  }
`;

// PortfolioPreview – all items grouped by category, sorted by order then createdAt
// Used in PortfolioPreview (home page section) to merge with static data per category
export const PORTFOLIO_PREVIEW_QUERY = `
  *[_type == "portfolioItem"] | order(category asc, order asc, _createdAt asc) {
    "id": _id,
    name,
    category,
    type,
    aspect,
    order,
    "url": select(defined(mediaFile.asset) => mediaFile.asset->url, mediaUrl)
  }
`;

// Portfolio page – all items, no ordering (infinite scroll handles order client-side)
export const PORTFOLIO_ALL_QUERY = `
  *[_type == "portfolioItem"] {
    "id": _id,
    name,
    category,
    type,
    aspect,
    "url": select(defined(mediaFile.asset) => mediaFile.asset->url, mediaUrl)
  }
`;

// Achievements page – all awards ordered by sequence number and creation date
export const AWARDS_QUERY = `
  *[_type == "award"] | order(order asc, _createdAt asc) {
    "id": _id,
    title,
    organization,
    description,
    "image": image.asset->url
  }
`;