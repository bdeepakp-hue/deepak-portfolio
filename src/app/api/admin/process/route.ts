import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { steps } = await req.json()
  for (const step of steps) {
    await prisma.processStep.update({ where: { id: step.id }, data: { phase: step.phase, title: step.title, description: step.description, output_label: step.output_label, output_tag: step.output_tag, order: step.order } })
  }
  return NextResponse.json({ success: true })
}
