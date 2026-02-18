import type { CollectionConfig } from 'payload'

// When S3 env vars are set, disable local storage so uploads go only to S3
const useS3 =
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  process.env.S3_REGION

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
    ...(useS3 ? { disableLocalStorage: true } : { staticDir: 'uploads' }),
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
