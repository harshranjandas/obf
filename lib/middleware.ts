import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './prisma'

export async function getCurrentUser(request: NextRequest) {
  const sessionId = request.cookies.get('admin-session')?.value
  
  if (!sessionId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: { id: true, email: true, name: true, role: true },
    })
    return user
  } catch (error) {
    return null
  }
}

export async function requireAuth(request: NextRequest) {
  const user = await getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return user
}
