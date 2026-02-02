import { getPayload } from 'payload'
import config from '@payload-config'

async function init() {
  const payload = await getPayload({ config })
  
  // This will initialize the database and create tables
  console.log('Payload initialized successfully')
  
  process.exit(0)
}

init().catch((error) => {
  console.error('Error initializing Payload:', error)
  process.exit(1)
})
