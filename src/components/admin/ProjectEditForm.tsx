'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'
import { FolderOpen, Save, X, Eye, EyeOff, Hash, ArrowLeft } from 'lucide-react'

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

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>
        {children}
      </label>
      {hint && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{hint}</div>}
    </div>
  )
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

  const f = (key: keyof typeof form) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  })

  return (
    <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page header */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <FolderOpen size={18} color="#4f46e5" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{project.title}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>/{project.slug}</div>
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '4px 10px',
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          background: form.is_published ? '#dcfce7' : '#fef9c3',
          color: form.is_published ? '#16a34a' : '#a16207',
        }}>
          {form.is_published ? <Eye size={11} /> : <EyeOff size={11} />}
          {form.is_published ? 'Published' : 'Draft'}
        </span>
      </div>

      {/* Thumbnail */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px' }}>
        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Thumbnail Image
        </div>
        <ImageUpload
          value={form.thumb_url}
          onChange={v => setForm({ ...form, thumb_url: v })}
          aspectRatio="16/9"
          maxHeightPx={220}
          hint="Recommended: 800×500px WebP · Max 10 MB"
        />
      </div>

      {/* Core details */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
          Project Details
        </div>

        <div>
          <FieldLabel>Title</FieldLabel>
          <Input {...f('title')} placeholder="Project title" />
        </div>

        <div>
          <FieldLabel hint="URL-friendly identifier — changes must be unique">Slug</FieldLabel>
          <div style={{ position: 'relative' }}>
            <Hash size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <Input {...f('slug')} placeholder="project-slug" style={{ paddingLeft: 30, fontFamily: 'monospace', fontSize: 13 }} />
          </div>
        </div>

        <div>
          <FieldLabel hint="Short description shown on the homepage card">Description</FieldLabel>
          <Textarea {...f('description')} rows={3} placeholder="A concise summary of the project and its impact..." />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <FieldLabel hint="e.g. Product Design, UX Research">Category</FieldLabel>
            <Input {...f('category')} placeholder="Product Design" />
          </div>
          <div>
            <FieldLabel hint="Lower number = displayed first">Display Order</FieldLabel>
            <Input
              type="number"
              value={form.order}
              onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              placeholder="1"
            />
          </div>
        </div>
      </div>

      {/* Visibility toggle */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Visibility</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            {form.is_published ? 'This project is live on your portfolio' : 'This project is hidden from your portfolio'}
          </div>
        </div>
        <button
          onClick={() => setForm({ ...form, is_published: !form.is_published })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 8,
            border: `1px solid ${form.is_published ? '#86efac' : '#e2e8f0'}`,
            background: form.is_published ? '#f0fdf4' : '#f8fafc',
            color: form.is_published ? '#16a34a' : '#64748b',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {form.is_published ? <Eye size={15} /> : <EyeOff size={15} />}
          {form.is_published ? 'Published' : 'Set as Draft'}
        </button>
      </div>

      {/* Action bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
      }}>
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/projects')}
          style={{ color: '#64748b', gap: 6 }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </Button>
        <Button
          onClick={save}
          disabled={saving}
          style={{ background: '#4f46e5', color: '#fff', border: 'none', gap: 8 }}
        >
          {saving ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              Saving...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Save size={14} /> Save Changes
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
