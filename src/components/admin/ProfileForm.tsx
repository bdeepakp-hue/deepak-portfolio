'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Profile {
  id: number
  name: string
  tagline: string
  hero_eyebrow: string
  hero_title: string
  hero_lede: string
  bio: string
  email: string
  phone: string
  linkedin_url: string
  behance_url: string
  resume_url: string
}

interface HeroTag {
  id: number
  label: string
  order: number
}

export default function ProfileForm({ profile, heroTags }: { profile: Profile | null; heroTags: HeroTag[] }) {
  const [form, setForm] = useState({
    name: profile?.name ?? '',
    tagline: profile?.tagline ?? '',
    hero_eyebrow: profile?.hero_eyebrow ?? '',
    hero_title: profile?.hero_title ?? '',
    hero_lede: profile?.hero_lede ?? '',
    bio: profile?.bio ?? '',
    email: profile?.email ?? '',
    phone: profile?.phone ?? '',
    linkedin_url: profile?.linkedin_url ?? '',
    behance_url: profile?.behance_url ?? '',
    resume_url: profile?.resume_url ?? '',
  })
  const [tags, setTags] = useState(heroTags.map(t => t.label))
  const [newTag, setNewTag] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, heroTags: tags }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (i: number) => setTags(tags.filter((_, idx) => idx !== i))

  const field = (key: keyof typeof form, label: string, multiline = false) => (
    <div style={{ marginBottom: 16 }}>
      <Label htmlFor={key} style={{ marginBottom: 6, display: 'block' }}>{label}</Label>
      {multiline ? (
        <Textarea id={key} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} rows={6} />
      ) : (
        <Input id={key} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
      )}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800 }}>
      <Card>
        <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent>
          {field('hero_eyebrow', 'Hero Eyebrow')}
          {field('hero_title', 'Hero Title')}
          {field('hero_lede', 'Hero Lede', true)}
          <div style={{ marginBottom: 16 }}>
            <Label style={{ marginBottom: 10, display: 'block' }}>Hero Tags</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {tags.map((t, i) => (
                <Badge key={i} variant="secondary" style={{ cursor: 'pointer', gap: 4 }} onClick={() => removeTag(i)}>
                  {t} ×
                </Badge>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Add tag..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <Button type="button" variant="outline" onClick={addTag}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Personal Info</CardTitle></CardHeader>
        <CardContent>
          {field('name', 'Full Name')}
          {field('tagline', 'Tagline')}
          {field('bio', 'About / Bio', true)}
          <Separator style={{ margin: '16px 0' }} />
          {field('email', 'Email')}
          {field('phone', 'Phone')}
          {field('linkedin_url', 'LinkedIn URL')}
          {field('behance_url', 'Behance URL')}
          {field('resume_url', 'Resume URL')}
        </CardContent>
      </Card>

      <div>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
