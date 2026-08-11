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