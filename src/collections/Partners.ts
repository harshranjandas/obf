import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'fullName', 'order'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'imageStaticPath',
      type: 'text',
      label: 'Image path (static)',
      admin: {
        description: 'Use a path like /images/partners/name.jpg when the file is in public/images/partners/ (commit the file to the repo). Overrides Upload when set.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'uploads',
      admin: {
        description: 'Or upload an image (on Vercel, requires S3 env vars). Ignored if Image path (static) is set.',
      },
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
