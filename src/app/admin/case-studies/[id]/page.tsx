export const instant = false
import { prisma } from '@/lib/db'
import CaseStudyEditor from '@/components/admin/CaseStudyEditor'
import { notFound } from 'next/navigation'

export default async function AdminCaseStudyEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({
    where: { id: parseInt(id) },
    include: { caseStudy: true },
  })
  if (!project) notFound()

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: '#111' }}>{project.title}</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>Edit case study sections as JSON</p>
      <CaseStudyEditor project={project} caseStudy={project.caseStudy} />
    </div>
  )
}
