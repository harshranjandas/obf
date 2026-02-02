import type { CollectionConfig } from 'payload'

export const Analytics: CollectionConfig = {
  slug: 'analytics',
  admin: {
    useAsTitle: 'eventType',
    defaultColumns: ['eventType', 'page', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Allow public tracking
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'eventType',
      type: 'text',
      required: true,
    },
    {
      name: 'page',
      type: 'text',
    },
    {
      name: 'referrer',
      type: 'text',
    },
    {
      name: 'userAgent',
      type: 'text',
    },
    {
      name: 'ip',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'device',
      type: 'text',
    },
    {
      name: 'browser',
      type: 'text',
    },
    {
      name: 'os',
      type: 'text',
    },
    {
      name: 'metadata',
      type: 'json',
    },
  ],
}
