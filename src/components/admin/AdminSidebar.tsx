'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, User, FolderOpen, BookOpen, Settings2, FileText, LogOut, ExternalLink } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/profile', label: 'Profile & Hero', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/case-studies', label: 'Case Studies', icon: BookOpen },
  { href: '/admin/process', label: 'Process', icon: Settings2 },
  { href: '/admin/resume', label: 'Resume', icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: 260,
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: '#4f46e5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 800, color: '#fff',
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}>DB</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>Deepak Badgujar</p>
            <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.3 }}>Portfolio CMS</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569', padding: '8px 12px 4px', margin: 0 }}>Menu</p>
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px',
              margin: '2px 0',
              fontSize: 14, fontWeight: 500,
              color: isActive ? '#fff' : '#94a3b8',
              background: isActive ? '#4f46e5' : 'transparent',
              textDecoration: 'none',
              borderRadius: 8,
              transition: 'background 0.15s, color 0.15s',
            }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#e2e8f0' } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8' } }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/" target="_blank" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 12px', borderRadius: 8,
          fontSize: 13, color: '#64748b', textDecoration: 'none',
          transition: 'color 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b' }}
        >
          <ExternalLink size={14} />
          View Site
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 12px', borderRadius: 8, width: '100%',
          fontSize: 13, color: '#64748b',
          background: 'transparent', border: 'none', cursor: 'pointer',
          transition: 'color 0.15s, background 0.15s',
          textAlign: 'left',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent' }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
