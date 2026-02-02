'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  onLogout: () => void
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true)
  const pathname = usePathname()

  const collections = [
    { href: '/admin/pages', label: 'Pages', icon: '📄' },
    { href: '/admin/partners', label: 'Partners', icon: '🤝' },
    { href: '/admin/jobs', label: 'Jobs', icon: '💼' },
    { href: '/admin/job-applications', label: 'Job Applications', icon: '📋' },
    { href: '/admin/social-networks', label: 'Social Networks', icon: '🔗' },
    { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className={`bg-gray-100 h-screen flex flex-col transition-all duration-300 border-r border-gray-200 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-4 hover:bg-gray-200 transition flex items-center justify-center"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Collections Section */}
      <div className="flex-1 overflow-y-auto">
        <button
          onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-200 transition"
        >
          <span className={`font-semibold text-gray-900 ${isCollapsed ? 'hidden' : ''}`}>
            Collections
          </span>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${isCollectionsOpen ? 'rotate-180' : ''} ${isCollapsed ? 'mx-auto' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Collections List */}
        {isCollectionsOpen && (
          <nav className="px-2 py-2">
            {collections.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg mb-1 transition ${
                  isActive(item.href)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Bottom Icon */}
      <button
        onClick={onLogout}
        className="p-4 hover:bg-gray-200 transition flex items-center justify-center"
        title="Logout"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}
