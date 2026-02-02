'use client'

import { useEffect, useState } from 'react'

interface SocialNetwork {
  id: string
  name: string
  url: string
  icon: string | null
  enabled: boolean
  order: number
}

export default function SocialNetworksManagement() {
  const [networks, setNetworks] = useState<SocialNetwork[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNetworks()
  }, [])

  const fetchNetworks = async () => {
    try {
      const response = await fetch('/api/admin/social-networks')
      if (response.ok) {
        const data = await response.json()
        setNetworks(data)
      }
    } catch (error) {
      console.error('Error fetching social networks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      const response = await fetch(`/api/admin/social-networks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !enabled }),
      })
      if (response.ok) {
        fetchNetworks()
      }
    } catch (error) {
      console.error('Error updating network:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this social network?')) return

    try {
      const response = await fetch(`/api/admin/social-networks/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchNetworks()
      }
    } catch (error) {
      console.error('Error deleting network:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Social Networks</h1>
        <button
          onClick={() => {
            const name = prompt('Network name (e.g., LinkedIn, Instagram):')
            const url = prompt('URL:')
            if (name && url) {
              fetch('/api/admin/social-networks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, url, enabled: true }),
              }).then(() => fetchNetworks())
            }
          }}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Network
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {networks.map((network) => (
              <tr key={network.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{network.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <a href={network.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {network.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggle(network.id, network.enabled)}
                    className={`px-2 py-1 text-xs rounded ${
                      network.enabled
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {network.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(network.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
