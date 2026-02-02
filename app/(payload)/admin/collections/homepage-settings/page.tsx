import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import config from '@payload-config'

/**
 * Homepage Settings is a single-document collection. Redirect the list view
 * to the only document's edit page so the form always loads.
 */
export const dynamic = 'force-dynamic'

export default async function HomepageSettingsRedirect() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'homepage-settings',
    limit: 1,
  })
  if (result.docs.length > 0) {
    const id = result.docs[0].id
    redirect(`/admin/collections/homepage-settings/${id}`)
  }
  redirect('/admin')
}
