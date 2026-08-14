export default {
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name / Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Campaign Category",
      type: "string",
      options: {
        list: [
          { title: "Sports", value: "sports" },
          { title: "Cultural", value: "cultural" },
          { title: "Durga Puja", value: "durga-puja" },
          { title: "Industries", value: "industries" },
          { title: "Education", value: "education" },
          { title: "Cafe & Food", value: "cafe-food" },
          { title: "Banquets", value: "banquets" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image / Graphics", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "aspect",
      title: "Aspect Ratio",
      type: "string",
      options: {
        list: [
          { title: "Portrait (9:16)", value: "portrait" },
          { title: "Landscape (16:9)", value: "landscape" },
          { title: "Square (1:1)", value: "square" },
          { title: "Wide (4:3)", value: "wide" },
          { title: "Tall (3:4)", value: "tall" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mediaFile",
      title: "Media File (Upload)",
      type: "file",
      description: "Upload the image, graphic, or video file.",
    },
    {
      name: "mediaUrl",
      title: "Media URL / Path (Alternative)",
      type: "string",
      description: "If not uploading a file, specify a path (e.g. /media/cultural/theatre-fest-1.mp4) or external URL.",
    },
    {
      name: "order",
      title: "Order / Sequence Number",
      type: "number",
      description: "Used to sort items within their category (lower numbers appear first)",
    },
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      order: "order",
    },
    prepare({ title, category, order }) {
      return {
        title: `${order !== undefined ? `[#${order}] ` : ""}${title}`,
        subtitle: category ? category.toUpperCase() : "",
      };
    },
  },
};
