import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { sections } = await req.json()
  const projectId = parseInt(id)

  const existing = await prisma.caseStudy.findUnique({ where: { project_id: projectId } })
  if (existing) {
    await prisma.caseStudy.update({ where: { project_id: projectId }, data: { sections } })
  } else {
    await prisma.caseStudy.create({ data: { project_id: projectId, sections } })
  }

  return NextResponse.json({ success: true })
}
