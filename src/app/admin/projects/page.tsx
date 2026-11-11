export const instant = false
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } })
  const published = projects.filter(p => p.is_published).length

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Projects</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>
            {published} of {projects.length} published
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Projects', value: projects.length, color: '#4f46e5', bg: '#eef2ff' },
          { label: 'Published', value: published, color: '#10b981', bg: '#d1fae5' },
          { label: 'Drafts', value: projects.length - published, color: '#f59e0b', bg: '#fef3c7' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 10,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Projects list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {projects.map((project, idx) => (
          <div key={project.id} style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}>
            {/* Order badge */}
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#94a3b8',
              flexShrink: 0,
            }}>
              {String(idx + 1).padStart(2, '0')}
            </div>

            {/* Thumbnail */}
            {project.thumb_url ? (
              <div style={{
                width: 56,
                height: 36,
                borderRadius: 6,
                overflow: 'hidden',
                flexShrink: 0,
                border: '1px solid #f1f5f9',
                background: '#f8fafc',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.thumb_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{
                width: 56,
                height: 36,
                borderRadius: 6,
                background: '#f1f5f9',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}>🖼</div>
            )}

            {/* Title + meta */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{project.title}</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 8px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  background: project.is_published ? '#dcfce7' : '#fef9c3',
                  color: project.is_published ? '#16a34a' : '#a16207',
                }}>
                  {project.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {project.category && <span style={{ color: '#64748b', fontWeight: 500 }}>{project.category} · </span>}
                /{project.slug}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <Link href={`/admin/projects/${project.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  style={{ fontSize: 12, height: 32, borderColor: '#e2e8f0', color: '#374151' }}
                >
                  Edit
                </Button>
              </Link>
              <Link href={`/projects/${project.slug}`} target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  style={{ fontSize: 12, height: 32, color: '#94a3b8' }}
                >
                  View ↗
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
