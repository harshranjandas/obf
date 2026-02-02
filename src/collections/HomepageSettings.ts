import type { CollectionConfig } from 'payload'

export const HomepageSettings: CollectionConfig = {
  slug: 'homepage-settings',
  admin: {
    useAsTitle: 'title',
    description: 'Manage homepage settings. Only one settings entry is allowed. If an entry exists, edit it instead of creating a new one.',
    defaultColumns: ['title'],
    hideAPIURL: false,
    listSearchableFields: ['title'],
  },
  access: {
    read: () => true, // Public read for frontend
    create: async ({ req }) => {
      // Only allow creation if no settings exist
      if (!req.user) return false
      try {
        const existing = await req.payload.find({
          collection: 'homepage-settings',
          limit: 1,
          overrideAccess: true,
        })
        return existing.totalDocs === 0
      } catch {
        return true // Allow if query fails
      }
    },
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        // Prevent creating if an entry already exists
        if (operation === 'create' && req.payload) {
          try {
            const existing = await req.payload.find({
              collection: 'homepage-settings',
              limit: 1,
              overrideAccess: true,
            })
            if (existing.totalDocs > 0) {
              throw new Error('Only one Homepage Settings entry is allowed. Please edit the existing entry instead.')
            }
          } catch (error) {
            // If it's our custom error, re-throw it
            if (error instanceof Error && error.message.includes('Only one Homepage Settings entry')) {
              throw error
            }
            // Otherwise, allow creation if query fails (first time setup)
          }
        }
        // Ensure title is always set
        if (operation === 'create' && data && !data.title) {
          data.title = 'Homepage Settings'
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data, operation }) => {
        // Ensure title is always set
        if (operation === 'create' && data && !data.title) {
          data.title = 'Homepage Settings'
        }
        
        // Convert string descriptions to rich text format for Coming Soon Cards
        if (data.comingSoonCards && Array.isArray(data.comingSoonCards)) {
          data.comingSoonCards = data.comingSoonCards.map((card: any) => {
            if (card.description) {
              // If it's a string, convert to rich text format
              if (typeof card.description === 'string') {
                const lines = card.description.split('\n').filter((line: string) => line.trim() !== '')
                if (lines.length === 0) {
                  // Empty string - create empty rich text
                  card.description = {
                    root: {
                      type: 'root',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          type: 'paragraph',
                          format: '',
                          indent: 0,
                          version: 1,
                          children: [],
                        },
                      ],
                    },
                  }
                } else {
                  card.description = {
                    root: {
                      type: 'root',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: lines.map((line: string) => ({
                        type: 'paragraph',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: line, format: 0, style: '', mode: 'normal', version: 1 }],
                      })),
                    },
                  }
                }
              } else if (typeof card.description === 'object' && card.description !== null) {
                // Ensure it has the correct structure
                if (!card.description.root) {
                  card.description = {
                    root: {
                      type: 'root',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          type: 'paragraph',
                          format: '',
                          indent: 0,
                          version: 1,
                          children: [],
                        },
                      ],
                    },
                  }
                }
              } else {
                // Null or undefined - create empty rich text
                card.description = {
                  root: {
                    type: 'root',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        type: 'paragraph',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [],
                      },
                    ],
                  },
                }
              }
            } else {
              // No description - create empty rich text
              card.description = {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [],
                    },
                  ],
                },
              }
            }
            return card
          })
        }
        
        return data
      },
    ],
    afterRead: [
      async ({ doc }) => {
        // Convert string descriptions to rich text format for Coming Soon Cards
        if (doc.comingSoonCards && Array.isArray(doc.comingSoonCards)) {
          doc.comingSoonCards = doc.comingSoonCards.map((card: any) => {
            if (card.description) {
              // If it's a string, convert to rich text format
              if (typeof card.description === 'string') {
                const lines = card.description.split('\n').filter((line: string) => line.trim() !== '')
                if (lines.length === 0) {
                  // Empty string - create empty rich text
                  card.description = {
                    root: {
                      type: 'root',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          type: 'paragraph',
                          format: '',
                          indent: 0,
                          version: 1,
                          children: [],
                        },
                      ],
                    },
                  }
                } else {
                  card.description = {
                    root: {
                      type: 'root',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: lines.map((line: string) => ({
                        type: 'paragraph',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: line, format: 0, style: '', mode: 'normal', version: 1 }],
                      })),
                    },
                  }
                }
              } else if (typeof card.description === 'object' && card.description !== null) {
                // Ensure it has the correct structure
                if (!card.description.root || !card.description.root.type) {
                  card.description = {
                    root: {
                      type: 'root',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          type: 'paragraph',
                          format: '',
                          indent: 0,
                          version: 1,
                          children: [],
                        },
                      ],
                    },
                  }
                }
              } else {
                // Null or undefined - create empty rich text
                card.description = {
                  root: {
                    type: 'root',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        type: 'paragraph',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [],
                      },
                    ],
                  },
                }
              }
            } else {
              // No description - create empty rich text
              card.description = {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [],
                    },
                  ],
                },
              }
            }
            return card
          })
        }
        return doc
      },
    ],
  },
  // Disable versions for cleaner singleton behavior
  versions: false,
  fields: [
    {
      name: 'title',
      label: 'Settings Name',
      type: 'text',
      required: true,
      defaultValue: 'Homepage Settings',
      admin: {
        description: 'Internal name for these settings',
        readOnly: true, // Make it read-only since it's a singleton
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Introduction Section',
          fields: [
            {
              name: 'introHeading',
              label: 'Introduction Title',
              type: 'text',
              required: true,
              defaultValue: 'India In The 21st Century',
              admin: {
                description: 'Title for the introduction section',
              },
            },
            {
              name: 'introContent',
              label: 'Introduction Content',
              type: 'richText',
              required: true,
              admin: {
                description: 'Introduction paragraphs (each paragraph will be displayed separately)',
              },
            },
          ],
        },
        {
          label: 'Homepage SEO',
          fields: [
            {
              name: 'seoTitle',
              label: 'SEO Title',
              type: 'text',
              admin: {
                description: 'Title for search engines and browser tab (e.g. One Big Future – India In The 21st Century)',
              },
            },
            {
              name: 'seoDescription',
              label: 'Meta Description',
              type: 'textarea',
              admin: {
                description: 'Short description for search results and social sharing (typically 150–160 characters)',
              },
            },
            {
              name: 'seoKeywords',
              label: 'Keywords',
              type: 'text',
              admin: {
                description: 'Comma-separated keywords for search engines (e.g. India, future, podcast, vision)',
              },
            },
          ],
        },
        {
          label: 'Homepage Audio',
          fields: [
            {
              name: 'audioEnabled',
              label: 'Enable Audio Player',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show/hide the audio player on the homepage',
              },
            },
            {
              name: 'audioFile',
              label: 'Audio File',
              type: 'upload',
              relationTo: 'uploads',
              admin: {
                description: 'Upload an MP3 or audio file for the homepage player',
              },
            },
            {
              name: 'audioName',
              label: 'Audio Name',
              type: 'text',
              defaultValue: 'OBF Podcast',
              admin: {
                description: 'Display name for the audio (shown in player)',
              },
            },
          ],
        },
        {
          label: 'Coming Soon Section',
          fields: [
            {
              name: 'comingSoonLabel',
              label: 'Section Label',
              type: 'text',
              defaultValue: 'Explore One Big future',
            },
            {
              name: 'comingSoonHeading',
              label: 'Section Heading',
              type: 'text',
              defaultValue: 'Coming Soon',
            },
            {
              name: 'comingSoonCards',
              label: 'Coming Soon Cards',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Description',
                  type: 'richText',
                  required: true,
                  defaultValue: {
                    root: {
                      type: 'root',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [
                        {
                          type: 'paragraph',
                          format: '',
                          indent: 0,
                          version: 1,
                          children: [],
                        },
                      ],
                    },
                  },
                  admin: {
                    description: 'Card description with formatting support (use Enter for new lines)',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'uploads',
                },
                {
                  name: 'backgroundColor',
                  label: 'Background Color',
                  type: 'text',
                  defaultValue: '#FFF1E7',
                  admin: {
                    description: 'Hex color code (e.g., #FFF1E7)',
                  },
                },
                {
                  name: 'textColor',
                  label: 'Text Color',
                  type: 'text',
                  defaultValue: '#EF671F',
                  admin: {
                    description: 'Hex color code for text (e.g., #EF671F)',
                  },
                },
                {
                  name: 'backgroundImage',
                  label: 'Background Image',
                  type: 'upload',
                  relationTo: 'uploads',
                  admin: {
                    description: 'Optional background gradient image',
                  },
                },
              ],
              admin: {
                description: 'Cards displayed in the Coming Soon section (typically 3 cards)',
              },
            },
          ],
        },
        {
          label: 'Share Your Vision Section',
          fields: [
            {
              name: 'shareVisionLabel',
              label: 'Section Label',
              type: 'text',
              defaultValue: 'SHARE YOUR VISION',
            },
            {
              name: 'shareVisionHeading',
              label: 'Section Heading',
              type: 'text',
              defaultValue: "What Is Your Dream For India's Future?",
            },
            {
              name: 'shareVisionDescription',
              label: 'Description',
              type: 'richText',
              required: true,
            },
            {
              name: 'shareVisionButtonText',
              label: 'Button Text',
              type: 'text',
              defaultValue: 'Contact us',
            },
            {
              name: 'shareVisionButtonLink',
              label: 'Button Link',
              type: 'text',
              defaultValue: '/contact-us',
            },
          ],
        },
        {
          label: 'Address',
          fields: [
            {
              name: 'address',
              label: 'Address',
              type: 'textarea',
              required: true,
              defaultValue: 'C7, SDA Commercial Complex\nOpposite IIT Campus\nNew Delhi 110016, India',
              admin: {
                description: 'Company address displayed in the footer',
              },
            },
          ],
        },
        {
          label: 'Social Networks',
          fields: [
            {
              name: 'socialNetworks',
              label: 'Social Network Links',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  label: 'Platform Name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., LinkedIn, Instagram, YouTube, etc.',
                  },
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Full URL to the social media profile',
                  },
                },
                {
                  name: 'enabled',
                  label: 'Enable',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Show/hide this social network link',
                  },
                },
                {
                  name: 'order',
                  label: 'Display Order',
                  type: 'number',
                  defaultValue: 0,
                  admin: {
                    description: 'Lower numbers appear first',
                  },
                },
              ],
              admin: {
                description: 'Social media links displayed in the footer',
              },
            },
          ],
        },
      ],
    },
  ],
}
