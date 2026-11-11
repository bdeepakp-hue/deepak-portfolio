export const instant = false
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { FolderOpen, Settings2, Briefcase, User, BookOpen, FileText, ArrowRight } from 'lucide-react'

// Inline styles via className — hover effects done in CSS to avoid event handlers in Server Components
const hoverStyles = `
  .dash-stat-card { transition: box-shadow 0.15s, transform 0.15s; }
  .dash-stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-1px); }
  .dash-action-card { transition: box-shadow 0.15s, border-color 0.15s; }
  .dash-action-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.07); border-color: #c7d2fe !important; }
`

export default async function AdminDashboard() {
  const [projectCount, processCount, expCount] = await Promise.all([
    prisma.project.count(),
    prisma.processStep.count(),
    prisma.experience.count(),
  ])

  const stats = [
    { label: 'Projects', value: projectCount, href: '/admin/projects', icon: FolderOpen, color: '#4f46e5', bg: '#eef2ff' },
    { label: 'Process Steps', value: processCount, href: '/admin/process', icon: Settings2, color: '#059669', bg: '#ecfdf5' },
    { label: 'Experience', value: expCount, href: '/admin/resume', icon: Briefcase, color: '#d97706', bg: '#fffbeb' },
  ]

  const quickActions = [
    { href: '/admin/profile', label: 'Edit Profile & Hero', desc: 'Update bio, tagline, contact info', icon: User, color: '#4f46e5' },
    { href: '/admin/projects', label: 'Manage Projects', desc: 'Add or edit portfolio projects', icon: FolderOpen, color: '#7c3aed' },
    { href: '/admin/case-studies', label: 'Case Studies', desc: 'Edit detailed case study content', icon: BookOpen, color: '#0891b2' },
    { href: '/admin/process', label: 'Process Steps', desc: 'Update your design process', icon: Settings2, color: '#059669' },
    { href: '/admin/resume', label: 'Resume', desc: 'Experience, education, certifications', icon: FileText, color: '#d97706' },
  ]

  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening'
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ maxWidth: 900 }}>
      <style dangerouslySetInnerHTML={{ __html: hoverStyles }} />
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
          {greeting}, Deepak 👋
        </h2>
        <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>{dateStr}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <Link key={stat.href} href={stat.href} style={{ textDecoration: 'none' }}>
              <div className="dash-stat-card" style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14,
                padding: '20px 22px',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={stat.color} />
                  </div>
                  <ArrowRight size={14} color="#cbd5e1" />
                </div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: 4, fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#64748b', margin: '0 0 14px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {quickActions.map(action => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href} style={{ textDecoration: 'none' }}>
                <div className="dash-action-card" style={{
                  background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12,
                  padding: '16px 18px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer',
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${action.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={action.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', margin: '0 0 2px' }}>{action.label}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{action.desc}</p>
                  </div>
                  <ArrowRight size={14} color="#cbd5e1" style={{ flexShrink: 0 }} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer note */}
      <div style={{ marginTop: 32, padding: '14px 18px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>
          Changes are reflected on the live site immediately after saving. <Link href="/" target="_blank" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>View live site →</Link>
        </p>
      </div>
    </div>
  )
}
