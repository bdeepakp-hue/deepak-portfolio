'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { GitMerge, Save, Check, ChevronDown, ChevronUp } from 'lucide-react'

interface ProcessStep {
  id: string
  phase: string
  title: string
  description: string
  output_label: string
  output_tag: string
  order: number
}

const STEP_COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function ProcessForm({ steps: initialSteps }: { steps: ProcessStep[] }) {
  const [steps, setSteps] = useState(initialSteps)
  const [expanded, setExpanded] = useState<string | null>(initialSteps[0]?.id ?? null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const updateStep = (id: string, key: keyof ProcessStep, value: string | number) => {
    setSteps(steps.map(s => s.id === id ? { ...s, [key]: value } : s))
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/process', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ steps }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
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
          <GitMerge size={18} color="#4f46e5" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Design Process Steps</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>Define the phases of your design process — shown on the homepage</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {steps.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              title={s.phase || `Step ${i + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: expanded === s.id ? STEP_COLORS[i % STEP_COLORS.length] : '#cbd5e1',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Steps */}
      {steps.map((step, idx) => {
        const color = STEP_COLORS[idx % STEP_COLORS.length]
        const isOpen = expanded === step.id
        return (
          <div
            key={step.id}
            style={{
              background: '#fff',
              border: `1px solid ${isOpen ? color + '40' : '#e2e8f0'}`,
              borderRadius: 12,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            {/* Step header / toggle */}
            <button
              onClick={() => setExpanded(isOpen ? null : step.id)}
              style={{
                width: '100%',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: isOpen ? '1px solid #f1f5f9' : 'none',
                textAlign: 'left',
              }}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: color + '15',
                color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                  {step.phase || `Step ${idx + 1}`}
                </div>
                {step.title && (
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {step.title}
                  </div>
                )}
              </div>
              {step.output_tag && (
                <span style={{
                  padding: '3px 10px',
                  background: color + '15',
                  color,
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {step.output_tag}
                </span>
              )}
              {isOpen ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
            </button>

            {/* Expanded fields */}
            {isOpen && (
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                      Phase Name
                    </label>
                    <Input
                      value={step.phase}
                      onChange={e => updateStep(step.id, 'phase', e.target.value)}
                      placeholder="e.g. Discover"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                      Title
                    </label>
                    <Input
                      value={step.title}
                      onChange={e => updateStep(step.id, 'title', e.target.value)}
                      placeholder="e.g. Understand the problem"
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                    Description
                  </label>
                  <Textarea
                    value={step.description}
                    onChange={e => updateStep(step.id, 'description', e.target.value)}
                    rows={3}
                    placeholder="Describe what happens in this phase..."
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                      Output Label
                    </label>
                    <Input
                      value={step.output_label}
                      onChange={e => updateStep(step.id, 'output_label', e.target.value)}
                      placeholder="e.g. Deliverable"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                      Output Tag
                    </label>
                    <Input
                      value={step.output_tag}
                      onChange={e => updateStep(step.id, 'output_tag', e.target.value)}
                      placeholder="e.g. User Research Report"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

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
          {saved ? 'All changes saved successfully' : `${steps.length} process steps`}
        </span>
        <Button
          onClick={save}
          disabled={saving}
          style={{ background: saved ? '#10b981' : '#4f46e5', color: '#fff', border: 'none', gap: 8 }}
        >
          {saving ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
              Saving...
            </span>
          ) : saved ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14} /> Saved</span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Save size={14} /> Save All Steps</span>
          )}
        </Button>
      </div>
    </div>
  )
}
