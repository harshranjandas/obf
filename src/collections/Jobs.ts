import type { CollectionConfig } from 'payload'
import { isAdmin } from '../lib/constants'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'locationType', 'location', 'status', 'displayOrder'],
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
        if (operation === 'create' && !data.displayOrder) {
          const existingJobs = await req.payload.find({
            collection: 'jobs',
            limit: 1,
            sort: '-displayOrder',
          })
          const maxOrder = (existingJobs.docs[0] as { displayOrder?: number })?.displayOrder || 0
          data.displayOrder = maxOrder + 1
        }
        return data
      },
    ],
  },
  fields: [
    // Title
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title as displayed on the listing and detail page (max ___ characters)',
      },
    },
    // Location Type - using select with radio appearance
    {
      name: 'locationType',
      label: 'Location Type',
      type: 'select',
      required: true,
      options: [
        { label: 'On-site', value: 'onsite' },
        { label: 'Remote', value: 'remote' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'Other:', value: 'other' },
      ],
    },
    {
      name: 'locationTypeOther',
      label: ' ',
      type: 'text',
      admin: {
        condition: (data) => data?.locationType === 'other',
      },
    },
    // Location
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true,
      admin: {
        description: 'Job location for on-site/hybrid jobs in the format City Name (IN)',
      },
    },
    // Notification Emails - keep as textarea (no rich text editor)
    {
      name: 'notificationEmails',
      label: 'Notification Emails',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Email addresses that should receive applications for this role.',
      },
    },
    // The Role - rich text editor
    {
      name: 'theRole',
      label: 'The Role',
      type: 'richText',
      required: true,
      admin: {
        description: 'Primary job description shown at the top of the dedicated JD page. Describe the opportunity and impact of the role. Use paragraphs.',
      },
    },
    // What You'll Do - rich text editor
    {
      name: 'whatYouDo',
      label: "What You'll Do",
      type: 'richText',
      required: true,
      admin: {
        description: 'Outline key responsibilities and day-to-day expectations in bullet points.',
      },
    },
    // What We're Looking For - rich text editor
    {
      name: 'whatWereLookingFor',
      label: "What We're Looking For",
      type: 'richText',
      required: true,
      admin: {
        description: 'List skills, experience, or qualities for ideal candidates in bullet points.',
      },
    },
    // Preferred Experience - rich text editor
    {
      name: 'preferredExperience',
      label: 'Preferred Experience',
      type: 'richText',
      admin: {
        description: 'List as applicable- experience, background/profile, hard skills, and qualifications for ideal candidates, as well as profiles that are not a fit.',
      },
    },
    // Life at OBF - rich text editor
    {
      name: 'lifeAtOBF',
      label: 'Life at OBF',
      type: 'richText',
      admin: {
        description: 'Standard text describing the work culture and perks of working at OBF.',
      },
    },
    // How to Apply - rich text editor
    {
      name: 'howToApply',
      label: 'How to Apply',
      type: 'richText',
      admin: {
        description: 'Specify extra materials to be submitted.',
      },
    },
    // Optional Extra Section 1
    {
      name: 'extraSection1Title',
      label: 'Optional Extra Section Title',
      type: 'text',
      admin: {
        description: 'Custom heading for this section',
      },
    },
    {
      name: 'extraSection1Description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'Use bullet points or paragraphs.',
      },
    },
    // Optional Extra Section 2
    {
      name: 'extraSection2Title',
      label: 'Optional Extra Section Title',
      type: 'text',
      admin: {
        description: 'Custom heading for this section',
      },
    },
    {
      name: 'extraSection2Description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'Use bullet points or paragraphs.',
      },
    },
    // Optional Extra Section 3
    {
      name: 'extraSection3Title',
      label: 'Optional Extra Section Title',
      type: 'text',
      admin: {
        description: 'Custom heading for this section',
      },
    },
    {
      name: 'extraSection3Description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'Use bullet points or paragraphs.',
      },
    },
    // Optional Extra Section 4
    {
      name: 'extraSection4Title',
      label: 'Optional Extra Section Title',
      type: 'text',
      admin: {
        description: 'Custom heading for this section',
      },
    },
    {
      name: 'extraSection4Description',
      label: 'Description',
      type: 'richText',
      admin: {
        description: 'Use bullet points or paragraphs.',
      },
    },
    // Status - using select for better visibility
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'unpublished',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Not Published', value: 'unpublished' },
      ],
      admin: {
        description: 'Published jobs appear on the careers page. Unpublished jobs stay hidden.',
      },
    },
    // Display Order
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      required: true,
      admin: {
        description: 'Lower numbers surface first.',
      },
    },
  ],
}
