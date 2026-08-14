export default {
  name: "award",
  title: "Award / Recognition",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Award Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "organization",
      title: "Organization / Event",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Award Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Order / Sequence Number",
      type: "number",
      description: "Used to sort the awards (lower numbers appear first)",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "organization",
      media: "image",
    },
  },
};
