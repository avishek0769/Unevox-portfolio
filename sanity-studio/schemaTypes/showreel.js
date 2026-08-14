export default {
  name: "showreel",
  title: "Showreel",
  type: "document",
  fields: [
    {
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Order / Sequence Number",
      type: "number",
      description: "Used to sort the reels (lower numbers appear first)",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Layout Type",
      type: "string",
      options: {
        list: [
          { title: "Portrait (3:4)", value: "portrait" },
          { title: "Square (1:1)", value: "square" },
          { title: "Landscape (4:3)", value: "landscape" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "videoFile",
      title: "Video File (Upload)",
      type: "file",
      options: {
        accept: "video/*",
      },
    },
    {
      name: "videoUrl",
      title: "Video URL / Path (Alternative)",
      type: "string",
      description: "If you don't upload a video file, you can specify an external URL or a local path (e.g. /media/sports/fc_banaras-1.mp4)",
    },
  ],
  preview: {
    select: {
      title: "clientName",
      order: "order",
      type: "type",
    },
    prepare({ title, order, type }) {
      return {
        title: `${order !== undefined ? `[#${order}] ` : ""}${title}`,
        subtitle: type,
      };
    },
  },
};
