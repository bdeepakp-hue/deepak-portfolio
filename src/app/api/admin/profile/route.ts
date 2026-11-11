import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { heroTags, ...profileData } = body

  const profile = await prisma.profile.findFirst()
  if (profile) {
    await prisma.profile.update({ where: { id: profile.id }, data: profileData })
  } else {
    await prisma.profile.create({ data: profileData })
  }

  if (heroTags) {
    await prisma.heroTag.deleteMany()
    for (let i = 0; i < heroTags.length; i++) {
      await prisma.heroTag.create({ data: { label: heroTags[i], order: i } })
    }
  }

  return NextResponse.json({ success: true })
}
