export const instant = false
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminCaseStudiesPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: { caseStudy: true },
  })

  const withContent = projects.filter(p => p.caseStudy).length

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Case Studies</h1>
        <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>
          {withContent} of {projects.length} have content
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Projects', value: projects.length, color: '#4f46e5', bg: '#eef2ff' },
          { label: 'With Content', value: withContent, color: '#10b981', bg: '#d1fae5' },
          { label: 'Need Content', value: projects.length - withContent, color: '#f43f5e', bg: '#ffe4e6' },
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

      {/* Case studies list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {projects.map((project, idx) => {
          const sections = project.caseStudy ? (project.caseStudy.sections as unknown[]).length : 0
          const hasThumb = project.caseStudy?.thumb_url
          const hasContent = !!project.caseStudy

          return (
            <div key={project.id} style={{
              background: '#fff',
              border: `1px solid ${hasContent ? '#e2e8f0' : '#fecaca'}`,
              borderRadius: 12,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              {/* Order */}
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
                <div style={{ width: 56, height: 36, borderRadius: 6, overflow: 'hidden', flexShrink: 0, border: '1px solid #f1f5f9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.thumb_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ width: 56, height: 36, borderRadius: 6, background: '#f1f5f9', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🖼</div>
              )}

              {/* Title + status */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{project.title}</span>
                  {hasContent ? (
                    <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#dcfce7', color: '#16a34a' }}>
                      {sections} section{sections !== 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#ffe4e6', color: '#f43f5e' }}>
                      No content
                    </span>
                  )}
                  {hasThumb && (
                    <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#eef2ff', color: '#4f46e5' }}>
                      Has thumb
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>/{project.slug}</div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <Link href={`/admin/case-studies/${project.id}`}>
                  <Button
                    variant={hasContent ? 'outline' : 'default'}
                    size="sm"
                    style={{
                      fontSize: 12,
                      height: 32,
                      ...(hasContent
                        ? { borderColor: '#e2e8f0', color: '#374151' }
                        : { background: '#4f46e5', color: '#fff', border: 'none' }),
                    }}
                  >
                    {hasContent ? 'Edit' : 'Add Content'}
                  </Button>
                </Link>
                {hasContent && (
                  <Link href={`/projects/${project.slug}`} target="_blank">
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ fontSize: 12, height: 32, color: '#94a3b8' }}
                    >
                      View ↗
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
