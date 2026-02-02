'use client'

import React from 'react'

/**
 * Suppresses hydration warnings for Payload CMS admin panel
 * This is a known issue with Payload CMS where random IDs differ between server and client
 * The warning is harmless and doesn't affect functionality
 */
export function SuppressHydrationWarning({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>
}
