'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Sparkles, AtSign, Tag, Save, Check, Link2 } from 'lucide-react'

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

function SectionCard({ icon: Icon, title, subtitle, children }: {
  icon: React.ElementType
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: '#eef2ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={18} color="#4f46e5" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ padding: '20px 24px' }}>
        {children}
      </div>
    </div>
  )
}

function FieldRow({ children, cols = 1 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 16,
      marginBottom: 16,
    }}>
      {children}
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
        {label}
      </label>
      {children}
      {hint && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{hint}</div>}
    </div>
  )
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
    setTimeout(() => setSaved(false), 2500)
  }

  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (i: number) => setTags(tags.filter((_, idx) => idx !== i))

  const f = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820 }}>
      {/* Hero Section */}
      <SectionCard icon={Sparkles} title="Hero Section" subtitle="Displayed at the top of your portfolio homepage">
        <FieldRow>
          <Field label="Eyebrow Text" hint="Short label above the main title (e.g. 'Senior Product Designer')">
            <Input {...f('hero_eyebrow')} placeholder="Senior Product Designer" />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="Hero Title" hint="Main headline — wrap key phrase in {curly braces} for gradient effect">
            <Input {...f('hero_title')} placeholder="Designing products that {people love}" />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="Hero Lede" hint="Supporting sentence below the title">
            <Textarea {...f('hero_lede')} rows={3} placeholder="A brief intro about your work and expertise..." />
          </Field>
        </FieldRow>

        <Field label="Hero Tags" hint="Click a tag to remove it">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10, minHeight: 32 }}>
            {tags.map((t, i) => (
              <span
                key={i}
                onClick={() => removeTag(i)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  background: '#eef2ff',
                  color: '#4f46e5',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid #c7d2fe',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fce7f3'; (e.currentTarget as HTMLElement).style.borderColor = '#f9a8d4'; (e.currentTarget as HTMLElement).style.color = '#be185d' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#eef2ff'; (e.currentTarget as HTMLElement).style.borderColor = '#c7d2fe'; (e.currentTarget as HTMLElement).style.color = '#4f46e5' }}
              >
                <Tag size={10} />
                {t}
                <span style={{ opacity: 0.6, marginLeft: 2 }}>×</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              placeholder="Type a tag and press Enter or Add..."
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              style={{ maxWidth: 320 }}
            />
            <Button type="button" variant="outline" onClick={addTag} size="sm">
              Add Tag
            </Button>
          </div>
        </Field>
      </SectionCard>

      {/* Personal Info */}
      <SectionCard icon={User} title="Personal Info" subtitle="Your name, bio, and contact details">
        <FieldRow cols={2}>
          <Field label="Full Name">
            <Input {...f('name')} placeholder="Deepak Badgujar" />
          </Field>
          <Field label="Tagline" hint="Short description for meta/SEO">
            <Input {...f('tagline')} placeholder="Senior Product Designer" />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="About / Bio" hint="Shown in the About section of the homepage">
            <Textarea {...f('bio')} rows={5} placeholder="Tell your story — background, expertise, and what drives your design work..." />
          </Field>
        </FieldRow>

        <div style={{ height: 1, background: '#f1f5f9', margin: '16px 0' }} />

        <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6 }}>
          <AtSign size={12} />
          Contact & Links
        </div>
        <FieldRow cols={2}>
          <Field label="Email">
            <Input {...f('email')} type="email" placeholder="hello@deepakbadgujar.in" />
          </Field>
          <Field label="Phone">
            <Input {...f('phone')} placeholder="+91 98765 43210" />
          </Field>
        </FieldRow>
        <FieldRow cols={2}>
          <Field label="LinkedIn URL">
            <div style={{ position: 'relative' }}>
              <Link2 size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <Input {...f('linkedin_url')} placeholder="https://linkedin.com/in/deepakbadgujar" style={{ paddingLeft: 32 }} />
            </div>
          </Field>
          <Field label="Behance URL">
            <div style={{ position: 'relative' }}>
              <Link2 size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <Input {...f('behance_url')} placeholder="https://behance.net/deepakbadgujar" style={{ paddingLeft: 32 }} />
            </div>
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="Resume PDF URL" hint="Link to downloadable resume">
            <div style={{ position: 'relative' }}>
              <Link2 size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <Input {...f('resume_url')} placeholder="https://..." style={{ paddingLeft: 32 }} />
            </div>
          </Field>
        </FieldRow>
      </SectionCard>

      {/* Save Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
      }}>
        <span style={{ fontSize: 13, color: '#94a3b8' }}>
          {saved ? 'All changes saved successfully' : 'Unsaved changes will be lost on navigation'}
        </span>
        <Button
          onClick={save}
          disabled={saving}
          style={{
            background: saved ? '#10b981' : '#4f46e5',
            color: '#fff',
            border: 'none',
            gap: 8,
            transition: 'background 0.3s',
          }}
        >
          {saving ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              Saving...
            </span>
          ) : saved ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Check size={14} /> Saved
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
