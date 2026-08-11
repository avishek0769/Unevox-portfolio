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
      asset,
      alt
    },
    client,
    challenge,
    approach,
    contentProduced,
    results,
    gallery[] {
      _key,
      type,
      aspect,
      title,
      alt,
      image {
        asset
      },
      videoUrl
    },
    conclusion
  }
`;

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
      asset,
      alt
    },

    client,
    challenge,
    approach,
    contentProduced,
    results,

    body,

    gallery[] {
      _key,
      type,
      aspect,
      title,
      alt,

      image {
        asset,
        alt
      },

      videoUrl
    },

    conclusion
  }
`;