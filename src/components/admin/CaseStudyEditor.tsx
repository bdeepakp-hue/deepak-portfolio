'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import {
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Eye, Save, ArrowLeft, Image as ImageIcon,
  Type, AlignLeft, BarChart2, Columns, List, Quote, Grid
} from 'lucide-react'
import ImageUpload from './ImageUpload'

// ─── Section type definitions ────────────────────────────────────────────────

export type SectionType =
  | 'hero'
  | 'overview'
  | 'problem'
  | 'process'
  | 'outcomes'
  | 'image_full'
  | 'image_two_col'
  | 'text_prose'
  | 'stats_row'
  | 'quote'
  | 'image_grid'

interface Section {
  type: SectionType
  eyebrow?: string
  title?: string
  lede?: string
  lead?: string
  url?: string
  alt?: string
  caption?: string
  text?: string
  author?: string
  columns?: number
  prose?: string[]
  objectives?: string[]
  takeaways?: string[]
  roadmap?: string[]
  meta?: { label: string; value: string }[]
  goals?: { value: string; label: string }[]
  steps?: { n: string; title: string; desc: string }[]
  stats?: { value: string; label: string }[]
  images?: { url: string; alt: string; caption?: string }[]
  card?: { title: string; duration?: string; responsibility?: string; tools?: string[] }
}

const SECTION_TEMPLATES: Record<SectionType, { label: string; icon: React.ComponentType<{ size?: number; color?: string }>; color: string; default: Section }> = {
  hero: {
    label: 'Hero Header',
    icon: Type,
    color: '#4f46e5',
    default: { type: 'hero', eyebrow: 'Case study · Category', title: 'Project Title', lede: 'Short description of the project.', meta: [{ label: 'Duration', value: '6 weeks' }, { label: 'Role', value: 'UX Designer' }, { label: 'Team', value: '3 designers' }] },
  },
  overview: {
    label: 'Overview',
    icon: AlignLeft,
    color: '#0891b2',
    default: { type: 'overview', eyebrow: '01 / Overview', title: 'Overview', prose: ['Write your overview here.'], card: { title: 'Project details', duration: '6 weeks', responsibility: 'UX Designer', tools: ['Figma', 'FigJam'] } },
  },
  problem: {
    label: 'Problem & Goals',
    icon: List,
    color: '#dc2626',
    default: { type: 'problem', eyebrow: '02 / Problem', title: 'Problem & goals', lead: 'Describe the core problem here.', objectives: ['Objective 1', 'Objective 2'], goals: [{ value: '15%', label: 'Metric improvement' }] },
  },
  process: {
    label: 'Process Steps',
    icon: Grid,
    color: '#7c3aed',
    default: { type: 'process', eyebrow: '03 / Process', title: 'Design thinking process', steps: [{ n: '01', title: 'Empathize', desc: 'Description.' }, { n: '02', title: 'Define', desc: 'Description.' }] },
  },
  outcomes: {
    label: 'Outcomes',
    icon: BarChart2,
    color: '#059669',
    default: { type: 'outcomes', eyebrow: '04 / Outcomes', title: 'Key takeaways & roadmap', takeaways: ['Takeaway 1'], roadmap: ['Roadmap item 1'] },
  },
  image_full: {
    label: 'Full-width Image',
    icon: ImageIcon,
    color: '#d97706',
    default: { type: 'image_full', url: '', alt: '', caption: '' },
  },
  image_two_col: {
    label: 'Two-column Images',
    icon: Columns,
    color: '#d97706',
    default: { type: 'image_two_col', images: [{ url: '', alt: '', caption: '' }, { url: '', alt: '', caption: '' }] },
  },
  text_prose: {
    label: 'Text Block',
    icon: AlignLeft,
    color: '#475569',
    default: { type: 'text_prose', eyebrow: '', title: '', prose: ['Paragraph text here.'] },
  },
  stats_row: {
    label: 'Stats Row',
    icon: BarChart2,
    color: '#0891b2',
    default: { type: 'stats_row', stats: [{ value: '80%', label: 'Metric label' }, { value: '25%', label: 'Another metric' }] },
  },
  quote: {
    label: 'Pull Quote',
    icon: Quote,
    color: '#7c3aed',
    default: { type: 'quote', text: 'Write your pull quote here.', author: '' },
  },
  image_grid: {
    label: 'Image Grid',
    icon: Grid,
    color: '#d97706',
    default: { type: 'image_grid', columns: 3, images: [{ url: '', alt: '' }, { url: '', alt: '' }, { url: '', alt: '' }] },
  },
}

// ─── Individual section editors ───────────────────────────────────────────────

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
      <Label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</Label>
      {children}
    </div>
  )
}

function StringArrayEditor({ value, onChange, placeholder = 'Add item' }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {value.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 6 }}>
          <Input value={item} onChange={e => { const a = [...value]; a[i] = e.target.value; onChange(a) }} style={{ fontSize: 13 }} />
          <Button variant="ghost" size="sm" onClick={() => onChange(value.filter((_, j) => j !== i))} style={{ padding: '0 8px', color: '#ef4444' }}><Trash2 size={13} /></Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...value, ''])} style={{ alignSelf: 'flex-start', fontSize: 12, gap: 4 }}>
        <Plus size={12} /> {placeholder}
      </Button>
    </div>
  )
}

function SectionEditor({ section, onChange }: { section: Section; onChange: (s: Section) => void }) {
  const upd = (key: string, val: unknown) => onChange({ ...section, [key]: val })

  const sharedFields = (
    <>
      <FieldRow label="Eyebrow">
        <Input value={(section.eyebrow as string) ?? ''} onChange={e => upd('eyebrow', e.target.value)} placeholder="01 / Section name" style={{ fontSize: 13 }} />
      </FieldRow>
      <FieldRow label="Title">
        <Input value={(section.title as string) ?? ''} onChange={e => upd('title', e.target.value)} placeholder="Section title" style={{ fontSize: 13 }} />
      </FieldRow>
    </>
  )

  if (section.type === 'hero') {
    const meta = (section.meta as { label: string; value: string }[]) ?? []
    return (
      <>
        {sharedFields}
        <FieldRow label="Lede / Subtitle">
          <Textarea value={(section.lede as string) ?? ''} onChange={e => upd('lede', e.target.value)} rows={3} style={{ fontSize: 13 }} />
        </FieldRow>
        <FieldRow label="Meta items (label + value pairs)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {meta.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 6 }}>
                <Input placeholder="Label" value={m.label} onChange={e => { const a = [...meta]; a[i] = { ...a[i], label: e.target.value }; upd('meta', a) }} style={{ fontSize: 13, flex: 1 }} />
                <Input placeholder="Value" value={m.value} onChange={e => { const a = [...meta]; a[i] = { ...a[i], value: e.target.value }; upd('meta', a) }} style={{ fontSize: 13, flex: 1 }} />
                <Button variant="ghost" size="sm" onClick={() => upd('meta', meta.filter((_, j) => j !== i))} style={{ padding: '0 8px', color: '#ef4444' }}><Trash2 size={13} /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => upd('meta', [...meta, { label: '', value: '' }])} style={{ alignSelf: 'flex-start', fontSize: 12, gap: 4 }}>
              <Plus size={12} /> Add meta
            </Button>
          </div>
        </FieldRow>
      </>
    )
  }

  if (section.type === 'overview') {
    const card = (section.card as { title: string; duration?: string; responsibility?: string; tools?: string[] }) ?? { title: 'Project details' }
    return (
      <>
        {sharedFields}
        <FieldRow label="Paragraphs">
          <StringArrayEditor value={(section.prose as string[]) ?? []} onChange={v => upd('prose', v)} placeholder="Add paragraph" />
        </FieldRow>
        <FieldRow label="Sidebar card — Title">
          <Input value={card.title} onChange={e => upd('card', { ...card, title: e.target.value })} style={{ fontSize: 13 }} />
        </FieldRow>
        <FieldRow label="Sidebar card — Duration">
          <Input value={card.duration ?? ''} onChange={e => upd('card', { ...card, duration: e.target.value })} placeholder="6 weeks" style={{ fontSize: 13 }} />
        </FieldRow>
        <FieldRow label="Sidebar card — Responsibility">
          <Input value={card.responsibility ?? ''} onChange={e => upd('card', { ...card, responsibility: e.target.value })} style={{ fontSize: 13 }} />
        </FieldRow>
        <FieldRow label="Sidebar card — Tools (comma separated)">
          <Input value={(card.tools ?? []).join(', ')} onChange={e => upd('card', { ...card, tools: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} placeholder="Figma, FigJam" style={{ fontSize: 13 }} />
        </FieldRow>
      </>
    )
  }

  if (section.type === 'problem') {
    const goals = (section.goals as { value: string; label: string }[]) ?? []
    return (
      <>
        {sharedFields}
        <FieldRow label="Lead paragraph">
          <Textarea value={(section.lead as string) ?? ''} onChange={e => upd('lead', e.target.value)} rows={2} style={{ fontSize: 13 }} />
        </FieldRow>
        <FieldRow label="Objectives">
          <StringArrayEditor value={(section.objectives as string[]) ?? []} onChange={v => upd('objectives', v)} placeholder="Add objective" />
        </FieldRow>
        <FieldRow label="Goals (value + label)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {goals.map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 6 }}>
                <Input placeholder="15%" value={g.value} onChange={e => { const a = [...goals]; a[i] = { ...a[i], value: e.target.value }; upd('goals', a) }} style={{ fontSize: 13, width: 90 }} />
                <Input placeholder="Metric label" value={g.label} onChange={e => { const a = [...goals]; a[i] = { ...a[i], label: e.target.value }; upd('goals', a) }} style={{ fontSize: 13, flex: 1 }} />
                <Button variant="ghost" size="sm" onClick={() => upd('goals', goals.filter((_, j) => j !== i))} style={{ padding: '0 8px', color: '#ef4444' }}><Trash2 size={13} /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => upd('goals', [...goals, { value: '', label: '' }])} style={{ alignSelf: 'flex-start', fontSize: 12, gap: 4 }}>
              <Plus size={12} /> Add goal
            </Button>
          </div>
        </FieldRow>
      </>
    )
  }

  if (section.type === 'process') {
    const steps = (section.steps as { n: string; title: string; desc: string }[]) ?? []
    return (
      <>
        {sharedFields}
        <FieldRow label="Steps">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', padding: 12, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <Input placeholder="01" value={s.n} onChange={e => { const a = [...steps]; a[i] = { ...a[i], n: e.target.value }; upd('steps', a) }} style={{ fontSize: 13, width: 54 }} />
                <Input placeholder="Step title" value={s.title} onChange={e => { const a = [...steps]; a[i] = { ...a[i], title: e.target.value }; upd('steps', a) }} style={{ fontSize: 13, flex: 1 }} />
                <Textarea placeholder="Description" value={s.desc} onChange={e => { const a = [...steps]; a[i] = { ...a[i], desc: e.target.value }; upd('steps', a) }} rows={2} style={{ fontSize: 13, flex: 2 }} />
                <Button variant="ghost" size="sm" onClick={() => upd('steps', steps.filter((_, j) => j !== i))} style={{ padding: '0 8px', color: '#ef4444' }}><Trash2 size={13} /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => upd('steps', [...steps, { n: `0${steps.length + 1}`, title: '', desc: '' }])} style={{ alignSelf: 'flex-start', fontSize: 12, gap: 4 }}>
              <Plus size={12} /> Add step
            </Button>
          </div>
        </FieldRow>
      </>
    )
  }

  if (section.type === 'outcomes') {
    return (
      <>
        {sharedFields}
        <FieldRow label="Key takeaways">
          <StringArrayEditor value={(section.takeaways as string[]) ?? []} onChange={v => upd('takeaways', v)} placeholder="Add takeaway" />
        </FieldRow>
        <FieldRow label="Roadmap items">
          <StringArrayEditor value={(section.roadmap as string[]) ?? []} onChange={v => upd('roadmap', v)} placeholder="Add roadmap item" />
        </FieldRow>
      </>
    )
  }

  if (section.type === 'image_full') {
    return (
      <>
        <ImageUpload
          label="Image"
          value={section.url ?? ''}
          onChange={v => upd('url', v)}
          aspectRatio="16/9"
          maxHeightPx={240}
        />
        <FieldRow label="Alt text">
          <Input value={section.alt ?? ''} onChange={e => upd('alt', e.target.value)} style={{ fontSize: 13 }} />
        </FieldRow>
        <FieldRow label="Caption (optional)">
          <Input value={section.caption ?? ''} onChange={e => upd('caption', e.target.value)} style={{ fontSize: 13 }} />
        </FieldRow>
      </>
    )
  }

  if (section.type === 'image_two_col') {
    const images = (section.images as { url: string; alt: string; caption?: string }[]) ?? [{ url: '', alt: '' }, { url: '', alt: '' }]
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {images.map((img, i) => (
          <div key={i} style={{ padding: 12, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#64748b', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Image {i + 1}</p>
            <ImageUpload value={img.url} onChange={v => { const a = [...images]; a[i] = { ...a[i], url: v }; upd('images', a) }} aspectRatio="4/3" maxHeightPx={160} />
            <div style={{ marginTop: 8 }}>
              <FieldRow label="Alt text"><Input value={img.alt} onChange={e => { const a = [...images]; a[i] = { ...a[i], alt: e.target.value }; upd('images', a) }} style={{ fontSize: 13 }} /></FieldRow>
              <FieldRow label="Caption"><Input value={img.caption ?? ''} onChange={e => { const a = [...images]; a[i] = { ...a[i], caption: e.target.value }; upd('images', a) }} style={{ fontSize: 13 }} /></FieldRow>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (section.type === 'text_prose') {
    return (
      <>
        {sharedFields}
        <FieldRow label="Paragraphs">
          <StringArrayEditor value={(section.prose as string[]) ?? []} onChange={v => upd('prose', v)} placeholder="Add paragraph" />
        </FieldRow>
      </>
    )
  }

  if (section.type === 'stats_row') {
    const stats = (section.stats as { value: string; label: string }[]) ?? []
    return (
      <FieldRow label="Stats">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 6 }}>
              <Input placeholder="80%" value={s.value} onChange={e => { const a = [...stats]; a[i] = { ...a[i], value: e.target.value }; upd('stats', a) }} style={{ fontSize: 13, width: 90 }} />
              <Input placeholder="Metric label" value={s.label} onChange={e => { const a = [...stats]; a[i] = { ...a[i], label: e.target.value }; upd('stats', a) }} style={{ fontSize: 13, flex: 1 }} />
              <Button variant="ghost" size="sm" onClick={() => upd('stats', stats.filter((_, j) => j !== i))} style={{ padding: '0 8px', color: '#ef4444' }}><Trash2 size={13} /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => upd('stats', [...stats, { value: '', label: '' }])} style={{ alignSelf: 'flex-start', fontSize: 12, gap: 4 }}>
            <Plus size={12} /> Add stat
          </Button>
        </div>
      </FieldRow>
    )
  }

  if (section.type === 'quote') {
    return (
      <>
        <FieldRow label="Quote text">
          <Textarea value={(section.text as string) ?? ''} onChange={e => upd('text', e.target.value)} rows={3} style={{ fontSize: 13 }} />
        </FieldRow>
        <FieldRow label="Author / attribution (optional)">
          <Input value={(section.author as string) ?? ''} onChange={e => upd('author', e.target.value)} style={{ fontSize: 13 }} />
        </FieldRow>
      </>
    )
  }

  if (section.type === 'image_grid') {
    const images = (section.images as { url: string; alt: string }[]) ?? []
    const cols = (section.columns as number) ?? 3
    return (
      <>
        <FieldRow label="Columns (2–4)">
          <div style={{ display: 'flex', gap: 6 }}>
            {[2, 3, 4].map(n => (
              <button key={n} type="button" onClick={() => upd('columns', n)} style={{ width: 36, height: 32, borderRadius: 7, border: `1px solid ${cols === n ? '#4f46e5' : '#e2e8f0'}`, background: cols === n ? '#eef2ff' : '#fff', color: cols === n ? '#4f46e5' : '#64748b', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>{n}</button>
            ))}
          </div>
        </FieldRow>
        <FieldRow label="Images">
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(cols, 3)}, 1fr)`, gap: 10 }}>
            {images.map((img, i) => (
              <div key={i} style={{ padding: 10, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <ImageUpload value={img.url} onChange={v => { const a = [...images]; a[i] = { ...a[i], url: v }; upd('images', a) }} aspectRatio="4/3" maxHeightPx={120} />
                <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                  <Input placeholder="Alt" value={img.alt} onChange={e => { const a = [...images]; a[i] = { ...a[i], alt: e.target.value }; upd('images', a) }} style={{ fontSize: 12 }} />
                  <Button variant="ghost" size="sm" onClick={() => upd('images', images.filter((_, j) => j !== i))} style={{ padding: '0 6px', color: '#ef4444', flexShrink: 0 }}><Trash2 size={12} /></Button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => upd('images', [...images, { url: '', alt: '' }])} style={{ minHeight: 80, borderRadius: 8, border: '2px dashed #cbd5e1', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: '#94a3b8' }}>
              <Plus size={14} /> Add
            </button>
          </div>
        </FieldRow>
      </>
    )
  }

  return <p style={{ fontSize: 13, color: '#94a3b8' }}>Unknown section type: {section.type}</p>
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

interface Project { id: number; title: string; slug: string; thumb_url: string }
interface CaseStudy { id: number; project_id: number; sections: unknown; thumb_url: string }

export default function CaseStudyEditor({ project, caseStudy }: { project: Project; caseStudy: CaseStudy | null }) {
  const router = useRouter()
  const [sections, setSections] = useState<Section[]>((caseStudy?.sections as Section[]) ?? [])
  const [thumbUrl, setThumbUrl] = useState(caseStudy?.thumb_url ?? project.thumb_url ?? '')
  const [expanded, setExpanded] = useState<number | null>(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [showAddMenu, setShowAddMenu] = useState(false)

  const save = async () => {
    setSaving(true)
    setError('')
    const res = await fetch(`/api/admin/case-studies/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections, thumb_url: thumbUrl }),
    })
    setSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500) }
    else setError('Failed to save.')
  }

  const addSection = (type: SectionType) => {
    setSections(prev => [...prev, { ...SECTION_TEMPLATES[type].default }])
    setExpanded(sections.length)
    setShowAddMenu(false)
  }

  const moveUp = (i: number) => { if (i === 0) return; const a = [...sections]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; setSections(a); setExpanded(i - 1) }
  const moveDown = (i: number) => { if (i === sections.length - 1) return; const a = [...sections]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; setSections(a); setExpanded(i + 1) }
  const remove = (i: number) => { setSections(sections.filter((_, j) => j !== i)); setExpanded(null) }
  const updateSection = (i: number, s: Section) => { const a = [...sections]; a[i] = s; setSections(a) }

  return (
    <div style={{ maxWidth: 820 }}>

      {/* Thumb URL */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <ImageIcon size={15} color="#4f46e5" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Thumbnail Image</span>
          <Badge variant="secondary" style={{ fontSize: 10 }}>shown on home page project cards</Badge>
        </div>
        <ImageUpload
          value={thumbUrl}
          onChange={setThumbUrl}
          aspectRatio="16/9"
          maxHeightPx={200}
          hint="Recommended: 800×500px WebP"
        />
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
        {sections.map((section, i) => {
          const tmpl = SECTION_TEMPLATES[section.type as SectionType]
          const isOpen = expanded === i
          const Icon = tmpl?.icon ?? Type
          return (
            <div key={i} style={{ background: '#fff', border: `1px solid ${isOpen ? '#c7d2fe' : '#e2e8f0'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.15s' }}>
              {/* Section header */}
              <div
                onClick={() => setExpanded(isOpen ? null : i)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer', userSelect: 'none' }}
              >
                <GripVertical size={14} color="#cbd5e1" />
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${tmpl?.color ?? '#64748b'}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={13} color={tmpl?.color ?? '#64748b'} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{tmpl?.label ?? section.type}</span>
                  {(section.title || section.eyebrow) && (
                    <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>
                      {`${section.title ?? section.eyebrow ?? ''}`}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 2 }} onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" onClick={() => moveUp(i)} disabled={i === 0} style={{ padding: '4px 6px', height: 28 }}><ChevronUp size={12} /></Button>
                  <Button variant="ghost" size="sm" onClick={() => moveDown(i)} disabled={i === sections.length - 1} style={{ padding: '4px 6px', height: 28 }}><ChevronDown size={12} /></Button>
                  <Button variant="ghost" size="sm" onClick={() => remove(i)} style={{ padding: '4px 6px', height: 28, color: '#ef4444' }}><Trash2 size={12} /></Button>
                </div>
                {isOpen ? <ChevronUp size={14} color="#94a3b8" /> : <ChevronDown size={14} color="#94a3b8" />}
              </div>

              {/* Section body */}
              {isOpen && (
                <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ paddingTop: 14 }}>
                    <SectionEditor section={section} onChange={s => updateSection(i, s)} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add section */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Button
          variant="outline"
          onClick={() => setShowAddMenu(!showAddMenu)}
          style={{ width: '100%', gap: 6, fontSize: 13, borderStyle: 'dashed', color: '#64748b' }}
        >
          <Plus size={14} /> Add Section
        </Button>
        {showAddMenu && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, marginTop: 4,
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)', padding: 8,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
          }}>
            {(Object.entries(SECTION_TEMPLATES) as [SectionType, typeof SECTION_TEMPLATES[SectionType]][]).map(([type, tmpl]) => {
              const Icon = tmpl.icon
              return (
                <button key={type} onClick={() => addSection(type)} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                  borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer',
                  textAlign: 'left', transition: 'background 0.1s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${tmpl.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={13} color={tmpl.color} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{tmpl.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Action bar */}
      {error && <p style={{ fontSize: 13, color: '#dc2626', marginBottom: 10 }}>{error}</p>}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button onClick={save} disabled={saving} style={{ gap: 6, background: '#4f46e5', color: '#fff', border: 'none' }}>
          <Save size={14} />
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
        </Button>
        <Button variant="outline" onClick={() => window.open(`/projects/${project.slug}`, '_blank')} style={{ gap: 6 }}>
          <Eye size={14} /> Preview
        </Button>
        <Button variant="ghost" onClick={() => router.push('/admin/case-studies')} style={{ gap: 6, color: '#64748b' }}>
          <ArrowLeft size={14} /> Back
        </Button>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>{sections.length} section{sections.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}
