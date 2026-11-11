export const instant = false
import { prisma } from '@/lib/db'
import ProfileForm from '@/components/admin/ProfileForm'

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findFirst()
  const heroTags = await prisma.heroTag.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#111' }}>Profile & Hero</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>Edit your personal info and hero section</p>
      <ProfileForm profile={profile} heroTags={heroTags} />
    </div>
  )
}
