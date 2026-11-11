export const instant = false
import { prisma } from '@/lib/db'
import ProcessForm from '@/components/admin/ProcessForm'

export default async function AdminProcessPage() {
  const steps = await prisma.processStep.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#111' }}>Process Steps</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>Edit how I work section</p>
      <ProcessForm steps={steps} />
    </div>
  )
}
