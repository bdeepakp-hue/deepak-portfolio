export const instant = false
import { prisma } from '@/lib/db'
import ProjectEditForm from '@/components/admin/ProjectEditForm'
import { notFound } from 'next/navigation'

export default async function AdminProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id: parseInt(id) } })
  if (!project) notFound()

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#111' }}>Edit Project</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>Update project details</p>
      <ProjectEditForm project={project} />
    </div>
  )
}
