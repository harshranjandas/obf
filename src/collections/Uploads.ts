import type { CollectionConfig } from 'payload'

export const Uploads: CollectionConfig = {
  slug: 'uploads',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    create: () => true, // Allow public uploads for job applications
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: {
    staticDir: 'uploads',
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'audio/*',
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/ogg',
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Alternative text for images',
      },
    },
  ],
}
