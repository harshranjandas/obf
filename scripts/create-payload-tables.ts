import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables
dotenv.config({
  path: path.resolve(dirname, '../.env'),
})

const initPayload = async () => {
  try {
    console.log('Initializing Payload CMS and creating database tables...')
    console.log('This may take a moment...')
    
    // This will initialize Payload and trigger database table creation
    const payloadInstance = await getPayload({ config })
    
    console.log('✓ Payload initialized successfully!')
    console.log('✓ Database tables created!')
    console.log('')
    console.log('You can now:')
    console.log('1. Start the server: npm run dev')
    console.log('2. Access the admin panel: http://localhost:3002/admin')
    console.log('3. Create your first admin user through the admin panel')
    
    process.exit(0)
  } catch (error) {
    console.error('Error initializing Payload:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    process.exit(1)
  }
}

initPayload()
