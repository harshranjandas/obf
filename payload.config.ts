import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import pg from 'pg'

// Neon (and some Postgres setups) can have an empty search_path; set it on each connection so unqualified table names resolve.
const { Pool } = pg
class PoolWithSearchPath extends Pool {
  constructor(config: pg.PoolConfig) {
    super(config)
    this.on('connect', (client) => {
      void client.query('SET search_path TO public')
    })
  }
}
const pgWithSearchPath = { ...pg, Pool: PoolWithSearchPath }

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Advisors } from './src/collections/Advisors'
import { Users } from './src/collections/Users'
import { Pages } from './src/collections/Pages'
import { Partners } from './src/collections/Partners'
import { Teams } from './src/collections/Teams'
import { Jobs } from './src/collections/Jobs'
import { JobApplications } from './src/collections/JobApplications'
import { SocialNetworks } from './src/collections/SocialNetworks'
import { Analytics } from './src/collections/Analytics'
import { Uploads } from './src/collections/Uploads'
import { HomepageSettings } from './src/collections/HomepageSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    suppressHydrationWarning: true,
  },
  collections: [
    Users,
    Pages,
    Partners,
    Advisors,
    Teams,
    Jobs,
    JobApplications,
    SocialNetworks,
    Analytics,
    Uploads,
    HomepageSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pg: pgWithSearchPath,
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
    },
    push: false, // Disabled so app starts without blocking on schema push; run scripts/run-fix-locked-documents-fk.sh if you add new collections
  }),
  sharp,
  // Build plugins at runtime so BLOB_READ_WRITE_TOKEN is read when the server runs (not at build time).
  // On Vercel: set BLOB_READ_WRITE_TOKEN in Project → Settings → Environment Variables.
  plugins: (() => {
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (!token) return []
    return [
      vercelBlobStorage({
        enabled: true,
        collections: { uploads: true },
        token,
        // false = server uploads to Blob (works for images under Vercel’s 4.5MB body limit)
        clientUploads: false,
      }),
    ]
  })(),
})
