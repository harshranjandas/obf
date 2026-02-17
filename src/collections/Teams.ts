import type { CollectionConfig } from 'payload'
import { isAdmin } from '../lib/constants'

export const Teams: CollectionConfig = {
  slug: 'teams',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'status', 'displayOnHome', 'displayOrder'],
    description: 'Team members and their profiles for display on the site.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => isAdmin(user),
    update: ({ req: { user } }) => isAdmin(user),
    delete: ({ req: { user } }) => isAdmin(user),
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create' && data && data.displayOrder == null) {
          const existing = await req.payload.find({
            collection: 'teams',
            limit: 1,
            sort: '-displayOrder',
          })
          const maxOrder = (existing.docs[0] as { displayOrder?: number })?.displayOrder ?? 0
          data.displayOrder = maxOrder + 1
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the team member',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or position',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Biography or background information',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'uploads',
      required: true,
      admin: {
        description: 'Profile image',
      },
    },
    {
      name: 'linkedIn',
      label: 'Linked In',
      type: 'text',
      admin: {
        description: 'LinkedIn profile URL',
      },
    },
    {
      name: 'twitter',
      type: 'text',
      admin: {
        description: 'Twitter handle or URL',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Contact email address',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      admin: {
        description: 'Active team members are displayed on the site. Inactive team members are hidden.',
      },
    },
    {
      name: 'displayOnHome',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display this team member on the home page',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order for team members (lower numbers appear first). Leave empty to use default ordering.',
      },
    },
  ],
}
