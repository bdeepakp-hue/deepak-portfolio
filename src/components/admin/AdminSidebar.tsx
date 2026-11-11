'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/profile', label: 'Profile & Hero', icon: '👤' },
  { href: '/admin/projects', label: 'Projects', icon: '◈' },
  { href: '/admin/case-studies', label: 'Case Studies', icon: '📋' },
  { href: '/admin/process', label: 'Process', icon: '⟳' },
  { href: '/admin/resume', label: 'Resume', icon: '📄' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: 240, minHeight: '100vh', background: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0,
    }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: '#111', textDecoration: 'none', display: 'block' }}>
          Deepak Badgujar
        </Link>
        <p style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>CMS Admin</p>
      </div>

      <nav style={{ flex: 1, padding: '12px 0' }}>
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 20px',
              fontSize: 14, fontWeight: 500,
              color: isActive ? '#111' : '#6b7280',
              background: isActive ? '#f3f4f6' : 'transparent',
              textDecoration: 'none',
              borderRadius: 0,
              transition: 'background 0.15s, color 0.15s',
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '16px 20px', borderTop: '1px solid #e5e7eb' }}>
        <Separator style={{ marginBottom: 12 }} />
        <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{ width: '100%', justifyContent: 'flex-start', color: '#6b7280', fontSize: 13 }}>
          Sign out
        </Button>
        <Link href="/" target="_blank" style={{ display: 'block', marginTop: 8, fontSize: 12, color: '#9ca3af', textDecoration: 'none' }}>
          View site →
        </Link>
      </div>
    </aside>
  )
}
