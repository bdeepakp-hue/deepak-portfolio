export const instant = false
import { prisma } from '@/lib/db'
import ResumeForm from '@/components/admin/ResumeForm'

export default async function AdminResumePage() {
  const [experiences, certifications, educations] = await Promise.all([
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.certification.findMany({ orderBy: { order: 'asc' } }),
    prisma.education.findMany({ orderBy: { order: 'asc' } }),
  ])

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#111' }}>Resume</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>Manage experience, certifications and education</p>
      <ResumeForm experiences={experiences} certifications={certifications} educations={educations} />
    </div>
  )
}
