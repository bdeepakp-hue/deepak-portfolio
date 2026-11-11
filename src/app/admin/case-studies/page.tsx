export const instant = false
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default async function AdminCaseStudiesPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: { caseStudy: true },
  })

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#111' }}>Case Studies</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>Manage case study content for each project</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map(project => (
          <Card key={project.id}>
            <CardContent style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111', margin: 0 }}>{project.title}</h3>
                  <Badge variant={project.caseStudy ? 'default' : 'secondary'} style={{ fontSize: 11 }}>
                    {project.caseStudy ? `${(project.caseStudy.sections as unknown[]).length} sections` : 'No content'}
                  </Badge>
                </div>
                <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>{project.slug}</p>
              </div>
              <Link href={`/admin/case-studies/${project.id}`}>
                <Button variant="outline" size="sm">Edit Content</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
