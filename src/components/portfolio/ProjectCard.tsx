'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  id: number
  slug: string
  title: string
  description: string
  thumb_url: string
}

export default function ProjectCard({ id, slug, title, description, thumb_url }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link key={id} href={`/projects/${slug}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--card-bg)',
          border: `1px solid ${hovered ? 'var(--text-dim)' : 'var(--border)'}`,
          borderRadius: 16,
          overflow: 'hidden',
          padding: 24,
          transition: 'border-color 0.2s, transform 0.2s',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          cursor: 'pointer',
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: 20, borderRadius: 8, overflow: 'hidden', background: 'var(--bg3)' }}>
          <Image src={thumb_url} alt={title} fill style={{ objectFit: 'contain' }} />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>{title}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{description}</p>
      </div>
    </Link>
  )
}
