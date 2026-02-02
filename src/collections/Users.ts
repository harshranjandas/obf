import type { CollectionConfig } from 'payload'
import { UserRole, isAdmin } from '../lib/constants'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && data && !data.role) {
          data.role = UserRole.ADMIN
        }
        return data
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return isAdmin(user)
    },
    create: async ({ req }) => {
      // Allow first user creation (when no users exist)
      // This works for both /api/users/first-register and regular create operations
      if (!req.user) {
        try {
          if (req.payload) {
            const existingUsers = await req.payload.find({
              collection: 'users',
              limit: 1,
              overrideAccess: true, // Bypass access control to check if users exist
            })
            // If no users exist, allow creation (first user)
            if (existingUsers.totalDocs === 0) {
              return true
            }
          }
        } catch (error) {
          // If query fails, allow creation (likely first user scenario)
          return true
        }
        // If users exist and user is not authenticated, deny
        return false
      }
      // For authenticated users, require admin role
      return isAdmin(req.user)
    },
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (isAdmin(user)) return true
      return user.id === id
    },
    delete: ({ req: { user } }) => {
      return isAdmin(user)
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: false,
      defaultValue: UserRole.ADMIN,
      options: [
        { label: 'Admin', value: UserRole.ADMIN },
        { label: 'Recruiter', value: UserRole.RECRUITER },
      ],
      admin: {
        description: 'User role determines access permissions.',
      },
      access: {
        update: ({ req: { user } }) => {
          return isAdmin(user)
        },
      },
    },
  ],
}
