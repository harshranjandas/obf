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

import { s3Storage } from '@payloadcms/storage-s3'
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

// Use S3 when env vars are set (e.g. on Vercel). Otherwise use local `uploads` folder.
const useS3 =
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  process.env.S3_REGION

if (process.env.NODE_ENV !== 'test') {
  console.log(useS3 ? `[Payload] S3 uploads enabled (bucket: ${process.env.S3_BUCKET})` : '[Payload] Using local uploads folder (no S3 env vars)')
}

const plugins = [
  ...(useS3
    ? [
        s3Storage({
          collections: {
            uploads: {
              prefix: 'uploads',
            },
          },
          bucket: process.env.S3_BUCKET as string,
          config: {
            region: process.env.S3_REGION as string,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
            },
            ...(process.env.S3_ENDPOINT && { endpoint: process.env.S3_ENDPOINT }),
          },
          // Optional: for large files on Vercel (requires CORS PUT on bucket)
          // clientUploads: true,
        }),
      ]
    : []),
]

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
    push: true, // Set to true to create missing tables (e.g. users_sessions). If you see ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" failed, run scripts/run-fix-locked-documents-fk.sh then set back to false.
  }),
  sharp,
  plugins,
})
