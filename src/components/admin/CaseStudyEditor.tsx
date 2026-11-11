'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Project {
  id: number
  title: string
  slug: string
}

interface CaseStudy {
  id: number
  project_id: number
  sections: unknown
}

export default function CaseStudyEditor({ project, caseStudy }: { project: Project; caseStudy: CaseStudy | null }) {
  const router = useRouter()
  const [json, setJson] = useState(JSON.stringify(caseStudy?.sections ?? [], null, 2))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setError('')
    try {
      JSON.parse(json)
    } catch {
      setError('Invalid JSON — please fix before saving.')
      return
    }

    setSaving(true)
    const res = await fetch(`/api/admin/case-studies/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections: JSON.parse(json) }),
    })
    setSaving(false)

    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      setError('Failed to save.')
    }
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <Card>
        <CardHeader>
          <CardTitle>Sections JSON</CardTitle>
          <CardDescription>
            Edit the sections array. Each section has a &quot;type&quot; field: hero, overview, problem, process, outcomes.
            Save to apply changes immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={json}
            onChange={e => setJson(e.target.value)}
            rows={30}
            style={{ fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre' }}
          />
          {error && <p style={{ color: '#dc2626', fontSize: 13, marginTop: 8 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Sections'}
            </Button>
            <Button variant="ghost" onClick={() => router.push('/admin/case-studies')}>Back</Button>
            <Button variant="outline" onClick={() => window.open(`/projects/${project.slug}`, '_blank')}>
              Preview →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
