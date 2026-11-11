'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <nav style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }} aria-label="Primary">
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
          Deepak Badgujar
        </Link>

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5 }}
          className="nav-toggle"
          aria-label="Toggle navigation"
        >
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', borderRadius: 2 }} />
        </button>

        <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
          {[
            { href: '/#work', label: 'Work' },
            { href: '/#process', label: 'Process' },
            { href: '/#about', label: 'About' },
            { href: '/#contact', label: 'Contact' },
            { href: '/resume', label: 'Resume' },
          ].map(link => (
            <li key={link.href}>
              <Link href={link.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li style={{ width: 1, height: 20, background: 'var(--border)' }} aria-hidden />
          <li>
            <a href="https://www.linkedin.com/in/deepakbadgujar/" target="_blank" rel="noopener" aria-label="LinkedIn"
              style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >in</a>
          </li>
          <li>
            <a href="https://www.behance.net/deepakbadgujar" target="_blank" rel="noopener" aria-label="Behance"
              style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >Bē</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
