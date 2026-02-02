'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pages: 0,
    partners: 0,
    jobs: 0,
    applications: 0,
    socialNetworks: 0,
    analytics: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [pagesRes, partnersRes, jobsRes, networksRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/pages'),
        fetch('/api/admin/partners'),
        fetch('/api/admin/jobs'),
        fetch('/api/admin/social-networks'),
        fetch('/api/admin/analytics'),
      ])

      const pages = await pagesRes.json()
      const partners = await partnersRes.json()
      const jobs = await jobsRes.json()
      const networks = await networksRes.json()
      const analytics = await analyticsRes.json()

      const totalApplications = jobs.reduce((acc: number, job: any) => acc + (job.applications?.length || 0), 0)

      setStats({
        pages: pages.length || 0,
        partners: partners.length || 0,
        jobs: jobs.length || 0,
        applications: totalApplications,
        socialNetworks: networks.length || 0,
        analytics: analytics.stats?.totalEvents || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const collections = [
    { href: '/admin/pages', label: 'Pages', icon: '📄', count: stats.pages },
    { href: '/admin/partners', label: 'Partners', icon: '🤝', count: stats.partners },
    { href: '/admin/jobs', label: 'Jobs', icon: '💼', count: stats.jobs },
    { href: '/admin/job-applications', label: 'Job Applications', icon: '📋', count: stats.applications },
    { href: '/admin/social-networks', label: 'Social Networks', icon: '🔗', count: stats.socialNetworks },
    { href: '/admin/analytics', label: 'Analytics', icon: '📈', count: stats.analytics },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Collections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {collections.map((collection) => (
          <Link
            key={collection.href}
            href={collection.href}
            className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition group relative"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{collection.icon}</span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  // Handle add new item - could navigate to create page
                  window.location.href = `${collection.href}/new`
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-gray-900"
                title="Add new"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <h3 className="text-base font-semibold text-gray-900">{collection.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
