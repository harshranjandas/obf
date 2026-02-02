import type { CollectionConfig } from 'payload'

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'jobTitle', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Allow public submissions
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      required: true,
      admin: {
        description: 'The job this application is for',
      },
    },
    {
      name: 'jobTitle',
      type: 'text',
      admin: {
        description: 'Job title at the time of application',
        readOnly: true,
      },
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'contactNumber',
      type: 'text',
    },
    {
      name: 'noticePeriod',
      type: 'text',
    },
    {
      name: 'currentLocation',
      type: 'text',
    },
    {
      name: 'currentCompany',
      type: 'text',
    },
    {
      name: 'portfolioUrl',
      type: 'text',
      admin: {
        description: 'Portfolio or personal website URL',
      },
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'uploads',
      admin: {
        description: 'Resume/CV file',
      },
    },
    {
      name: 'coverLetter',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this application',
        position: 'sidebar',
      },
    },
  ],
}
