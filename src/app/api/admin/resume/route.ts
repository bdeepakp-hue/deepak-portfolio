import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { experiences, certifications, educations } = await req.json()

  for (const exp of experiences) {
    await prisma.experience.update({
      where: { id: exp.id },
      data: { company: exp.company, role: exp.role, start_date: exp.start_date, end_date: exp.end_date, location: exp.location, intro: exp.intro, bullets: exp.bullets },
    })
  }

  for (const cert of certifications) {
    await prisma.certification.update({
      where: { id: cert.id },
      data: { title: cert.title, issuer: cert.issuer, start_date: cert.start_date, end_date: cert.end_date },
    })
  }

  for (const edu of educations) {
    await prisma.education.update({
      where: { id: edu.id },
      data: { degree: edu.degree, institution: edu.institution, start_date: edu.start_date, end_date: edu.end_date },
    })
  }

  return NextResponse.json({ success: true })
}
