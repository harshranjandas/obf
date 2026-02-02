'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewJobPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: '',
    companyWebsite: '',
    location: '',
    locationType: '',
    notificationEmails: '',
    jobDescription: '',
    displayOrder: '',
    theRoleTitle: 'The Role',
    theRoleDescription: '',
    whatYouDoTitle: "What You'll Do",
    whatYouDoDescription: '',
    whatWereLookingForTitle: "What We're Looking For",
    whatWereLookingForDescription: '',
    lifeAtCompanyTitle: '',
    lifeAtCompanyDescription: '',
    showUsYourWorkTitle: 'Show Us Your Work',
    showUsYourWorkDescription: '',
    status: 'unpublished',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Convert description fields to arrays (split by newlines or keep as single strings)
      const whatYouDo = formData.whatYouDoDescription
        ? formData.whatYouDoDescription.split('\n').filter((line) => line.trim())
        : []
      const whatWereLookingFor = formData.whatWereLookingForDescription
        ? formData.whatWereLookingForDescription.split('\n').filter((line) => line.trim())
        : []
      const preferredExperience: string[] = [] // Can be added later

      const response = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          subTitle: formData.company,
          location: formData.location,
          locationType: formData.locationType,
          type: formData.type,
          logo: formData.companyWebsite,
          theRole: formData.theRoleDescription || formData.jobDescription,
          whatYouDo,
          whatWereLookingFor,
          preferredExperience,
          published: formData.status === 'published',
          order: formData.displayOrder ? parseInt(formData.displayOrder) : 0,
        }),
      })

      if (response.ok) {
        const job = await response.json()
        router.push(`/admin/jobs/${job.id}`)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create job')
      }
    } catch (error) {
      console.error('Error creating job:', error)
      alert('An error occurred while creating the job')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <Link href="/admin/jobs" className="hover:text-gray-900">
          Jobs
        </Link>
        <span className="mx-2">/</span>
        <span>Create New</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formData.title || '[Untitled]'}
          </h1>
          <p className="text-gray-600">Creating new Job</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSaving || !formData.title}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Details Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Job title as displayed on the listing and detail page (80 characters max)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                    >
                      <option value="">Select a value</option>
                    </select>
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Associated portfolio company (leave empty for in-house jobs)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  >
                    <option value="">Select a value</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Job type</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Website Link
                  </label>
                  <input
                    type="url"
                    value={formData.companyWebsite}
                    onChange={(e) => handleChange('companyWebsite', e.target.value)}
                    placeholder="Optional URL for the company website. Include https://"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="SDA, Delhi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Job location for on-site/hybrid jobs in the format Location, City for India and City, Country for places outside India.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
                  <select
                    value={formData.locationType}
                    onChange={(e) => handleChange('locationType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  >
                    <option value="">Select a value</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Work location type</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Emails <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.notificationEmails}
                    onChange={(e) => handleChange('notificationEmails', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email addresses that should receive applications for this role.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.jobDescription}
                    onChange={(e) => handleChange('jobDescription', e.target.value)}
                    placeholder="Start typing, or press '/' for commands...."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Primary job description shown at the top of the detail page.
                  </p>
                </div>
              </div>
            </section>

            {/* The Role Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">The Role</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.theRoleTitle}
                    onChange={(e) => handleChange('theRoleTitle', e.target.value)}
                    placeholder="The Role"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">Optional custom heading for this section.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={6}
                    value={formData.theRoleDescription}
                    onChange={(e) => handleChange('theRoleDescription', e.target.value)}
                    placeholder="Start typing, or press '/' for commands..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Describe the opportunity and impact of the role.
                  </p>
                </div>
              </div>
            </section>

            {/* What You'll Do Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What You'll Do</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.whatYouDoTitle}
                    onChange={(e) => handleChange('whatYouDoTitle', e.target.value)}
                    placeholder="What You'll Do"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">Optional custom heading for this section.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={6}
                    value={formData.whatYouDoDescription}
                    onChange={(e) => handleChange('whatYouDoDescription', e.target.value)}
                    placeholder="Start typing, or press '/' for commands..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Outline key responsibilities and day-to-day expectations.
                  </p>
                </div>
              </div>
            </section>

            {/* What We're Looking For Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What We're Looking For</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.whatWereLookingForTitle}
                    onChange={(e) => handleChange('whatWereLookingForTitle', e.target.value)}
                    placeholder="What We're Looking For"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">Optional custom heading for this section.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={6}
                    value={formData.whatWereLookingForDescription}
                    onChange={(e) => handleChange('whatWereLookingForDescription', e.target.value)}
                    placeholder="Start typing, or press '/' for commands..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    List skills, experience, or qualities for ideal candidates.
                  </p>
                </div>
              </div>
            </section>

            {/* Life at Company Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Life at Company</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.lifeAtCompanyTitle}
                    onChange={(e) => handleChange('lifeAtCompanyTitle', e.target.value)}
                    placeholder="Life at Company Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">Optional custom heading for this section.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={6}
                    value={formData.lifeAtCompanyDescription}
                    onChange={(e) => handleChange('lifeAtCompanyDescription', e.target.value)}
                    placeholder="Start typing, or press '/' for commands...."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Share what makes life at this company unique.
                  </p>
                </div>
              </div>
            </section>

            {/* Show Us Your Work Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Show Us Your Work</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.showUsYourWorkTitle}
                    onChange={(e) => handleChange('showUsYourWorkTitle', e.target.value)}
                    placeholder="Show Us Your Work"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">Optional custom heading for this section.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={6}
                    value={formData.showUsYourWorkDescription}
                    onChange={(e) => handleChange('showUsYourWorkDescription', e.target.value)}
                    placeholder="Start typing, or press '/' for commands..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Optional prompt or instructions for candidate submissions.
                  </p>
                </div>
              </div>
            </section>

            {/* Add Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-4">
                Add any custom sections with a label and HTML content.
              </p>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                + Add Section
              </button>
            </div>

            {/* Status Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Status</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 appearance-none bg-white"
                  >
                    <option value="unpublished">Unpublished</option>
                    <option value="published">Published</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Published jobs appear on the careers page. Unpublished jobs stay hidden.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Order</h3>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => handleChange('displayOrder', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <p className="mt-1 text-xs text-gray-500">
                Lower numbers surface first. Leave empty to auto-assign.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
