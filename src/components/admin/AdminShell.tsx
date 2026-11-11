'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import AdminSidebar from './AdminSidebar'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/profile': 'Profile & Hero',
  '/admin/projects': 'Projects',
  '/admin/case-studies': 'Case Studies',
  '/admin/process': 'Process Steps',
  '/admin/resume': 'Resume',
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/admin/login'

  if (isLogin) return <>{children}</>

  const title = pageTitles[pathname] ?? pageTitles[Object.keys(pageTitles).find(k => k !== '/admin' && pathname.startsWith(k)) ?? ''] ?? 'Admin'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height: 56, background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', flexShrink: 0,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <h1 style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', margin: 0 }}>{title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" target="_blank" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 8,
              border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 500,
              color: '#475569', textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.color = '#0f172a' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569' }}
            >
              <ExternalLink size={13} />
              View Site
            </Link>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#4f46e5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff',
            }}>DB</div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
