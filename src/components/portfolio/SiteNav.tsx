'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1030,
      background: '#fff',
      borderBottom: '1px solid var(--border)',
      fontFamily: 'var(--font-sans)',
    }}>
      <nav style={{
        maxWidth: 1320, margin: '0 auto',
        padding: '0 24px',
        height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }} aria-label="Primary">
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em', color: 'rgb(17,18,26)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
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

        <ul style={{ display: 'flex', alignItems: 'center', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
          {[
            { href: '/#work', label: 'Work' },
            { href: '/#process', label: 'Process' },
            { href: '/#about', label: 'About' },
            { href: '/#contact', label: 'Contact' },
            { href: '/resume', label: 'Resume' },
          ].map(link => (
            <li key={link.href}>
              <Link href={link.href} style={{ color: 'rgb(62,66,80)', textDecoration: 'none', fontSize: 15, fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgb(67,85,232)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgb(62,66,80)')}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li style={{ width: 1, height: 18, background: 'rgb(210,214,224)' }} aria-hidden />
          <li>
            <a href="https://www.linkedin.com/in/deepakbadgujar/" target="_blank" rel="noopener" aria-label="LinkedIn"
              style={{ display: 'block', width: 20, height: 20, backgroundColor: '#0a66c2', WebkitMaskImage: 'url(/nav-linkedin.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/nav-linkedin.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}
            />
          </li>
          <li>
            <a href="https://www.behance.net/deepakbadgujar" target="_blank" rel="noopener" aria-label="Behance"
              style={{ display: 'block', width: 20, height: 20, backgroundColor: '#1769ff', WebkitMaskImage: 'url(/nav-behance.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/nav-behance.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}
