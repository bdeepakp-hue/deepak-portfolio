export const instant = false
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111' }}>Projects</h1>
          <p style={{ color: '#6b7280', marginTop: 4 }}>Manage portfolio case studies</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {projects.map(project => (
          <Card key={project.id} style={{ overflow: 'hidden' }}>
            <CardContent style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
                <span style={{ fontSize: 20, color: '#d1d5db' }}>⠿</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111', margin: 0 }}>{project.title}</h3>
                    <Badge variant={project.is_published ? 'default' : 'secondary'} style={{ fontSize: 11 }}>
                      {project.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.description}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <Link href={`/admin/projects/${project.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Link href={`/projects/${project.slug}`} target="_blank">
                  <Button variant="ghost" size="sm">View</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
