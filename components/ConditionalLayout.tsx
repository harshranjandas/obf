'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <main className="flex flex-col min-h-screen space-y-4 md:space-y-6">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
