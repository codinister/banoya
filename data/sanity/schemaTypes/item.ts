import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'item',
  title: 'Item',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
    }),

    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),

    defineField({
      name: 'desc',
      title: 'Description',
      type: 'blockContent',
    }),

    defineField({
      name: 'category',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),

    defineField({
      name: 'qty',
      title: 'Qty',
      type: 'number',
    }),

    defineField({
      name: 'sold',
      title: 'Sold',
      type: 'number',
    }),

    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
});
