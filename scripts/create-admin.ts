import { prisma } from '../lib/prisma'
import { hashPassword } from '../lib/auth'

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@onebigfuture.com'
  const password = process.env.ADMIN_PASSWORD || 'changeme123'
  
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log('Admin user already exists!')
    return
  }

  const hashedPassword = await hashPassword(password)
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })
  
  console.log('Admin user created successfully!')
  console.log('Email:', user.email)
  console.log('Please change the default password after first login!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
