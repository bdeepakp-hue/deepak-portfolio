'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Project {
  id: number
  title: string
  slug: string
  description: string
  thumb_url: string
  category: string
  is_published: boolean
  order: number
}

export default function ProjectEditForm({ project }: { project: Project }) {
  const router = useRouter()
  const [form, setForm] = useState({ ...project })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    await fetch(`/api/admin/projects/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    router.push('/admin/projects')
  }

  return (
    <Card style={{ maxWidth: 700 }}>
      <CardHeader><CardTitle>{project.title}</CardTitle></CardHeader>
      <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Label>Title</Label>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ marginTop: 6 }} />
        </div>
        <div>
          <Label>Slug</Label>
          <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} style={{ marginTop: 6 }} />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={{ marginTop: 6 }} />
        </div>
        <div>
          <Label>Thumbnail URL</Label>
          <Input value={form.thumb_url} onChange={e => setForm({ ...form, thumb_url: e.target.value })} style={{ marginTop: 6 }} />
        </div>
        <div>
          <Label>Category</Label>
          <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ marginTop: 6 }} />
        </div>
        <div>
          <Label>Order</Label>
          <Input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) })} style={{ marginTop: 6, maxWidth: 100 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" id="published" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} />
          <Label htmlFor="published">Published</Label>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
          <Button variant="ghost" onClick={() => router.push('/admin/projects')}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  )
}
