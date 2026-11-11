export const instant = false
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [projectCount, processCount, expCount] = await Promise.all([
    prisma.project.count(),
    prisma.processStep.count(),
    prisma.experience.count(),
  ])

  const stats = [
    { label: 'Projects', value: projectCount, href: '/admin/projects', color: '#3b82f6' },
    { label: 'Process Steps', value: processCount, href: '/admin/process', color: '#10b981' },
    { label: 'Experience Entries', value: expCount, href: '/admin/resume', color: '#f59e0b' },
  ]

  const quickLinks = [
    { href: '/admin/profile', label: 'Edit Profile & Hero' },
    { href: '/admin/projects', label: 'Manage Projects' },
    { href: '/admin/case-studies', label: 'Edit Case Studies' },
    { href: '/admin/process', label: 'Update Process Steps' },
    { href: '/admin/resume', label: 'Update Resume' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#111' }}>Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>Manage your portfolio content</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
        {stats.map(stat => (
          <Link key={stat.href} href={stat.href} style={{ textDecoration: 'none' }}>
            <Card style={{ cursor: 'pointer', borderTop: `3px solid ${stat.color}` }}>
              <CardHeader style={{ paddingBottom: 8 }}>
                <CardTitle style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <span style={{ fontSize: 36, fontWeight: 700, color: '#111' }}>{stat.value}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#111' }}>Quick Actions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
        {quickLinks.map(link => (
          <Link key={link.href} href={link.href} style={{
            display: 'block', padding: '12px 16px',
            background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
            color: '#374151', textDecoration: 'none', fontSize: 14, fontWeight: 500,
            transition: 'border-color 0.15s',
          }}>
            {link.label} →
          </Link>
        ))}
      </div>
    </div>
  )
}
