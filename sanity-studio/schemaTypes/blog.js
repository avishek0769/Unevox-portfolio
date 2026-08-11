export default {
    name: "blog",
    title: "Blog",
    type: "document",

    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },

        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },

        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Sports", value: "Sports" },
                    { title: "Cultural Events", value: "Cultural Events" },
                    { title: "Social Media", value: "Social Media" },
                    { title: "Digital Marketing", value: "Digital Marketing" },
                    { title: "Branding", value: "Branding" },
                    { title: "Behind the Scenes", value: "Behind the Scenes" },
                ],
            },
            validation: (Rule) => Rule.required(),
        },

        {
            name: "excerpt",
            title: "Summary (one liner)",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required().max(300),
        },

        {
            name: "publishedAt",
            title: "Publish Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        },

        {
            name: "readingTime",
            title: "Reading Time",
            type: "string",
            description: 'Example: "5 min read"',
        },

        {
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        },

        {
            name: "client",
            title: "Client",
            type: "string",
        },

        {
            name: "contentProduced",
            title: "Content Produced",
            type: "array",
            of: [{ type: "string" }],
        },

        {
            name: "results",
            title: "Results",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "label",
                            title: "Label",
                            type: "string",
                        },
                        {
                            name: "value",
                            title: "Value",
                            type: "string",
                        },
                    ],
                },
            ],
        },

        {
            name: "gallery",
            title: "Gallery",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "galleryItem",
                    title: "Media Item",
                    fields: [
                        {
                            name: "type",
                            title: "Media Type",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Image", value: "image" },
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
                                    { title: "Landscape", value: "landscape" },
                                    { title: "Portrait", value: "portrait" },
                                    { title: "Square", value: "square" },
                                ],
                                layout: "radio",
                            },
                            validation: (Rule) => Rule.required(),
                        },

                        // Shown when type === "image"
                        {
                            name: "image",
                            title: "Image File",
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                            hidden: ({ parent }) => parent?.type !== "image",
                        },

                        // Shown when type === "video"
                        {
                            name: "video",
                            title: "Video File",
                            type: "file",
                            options: {
                                accept: "video/*",
                            },
                            hidden: ({ parent }) => parent?.type !== "video",
                        },
                    ],
                    preview: {
                        select: {
                            type: "type",
                            aspect: "aspect",
                            media: "image",
                        },
                        prepare({ type, aspect, media }) {
                            return {
                                title: `${type ?? "media"} · ${aspect ?? ""}`,
                                media,
                            };
                        },
                    },
                },
            ],
        },

        {
            name: "body",
            title: "Blog Content",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H1", value: "h1" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [
                        { title: "Bullet", value: "bullet" },
                        { title: "Numbered", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Bold", value: "strong" },
                            { title: "Italic", value: "em" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                },
            ],
        },
    ],

    preview: {
        select: {
            title: "title",
            subtitle: "category",
            media: "coverImage",
        },
    },
};