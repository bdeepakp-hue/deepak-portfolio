'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface ProcessStep {
  id: string
  phase: string
  title: string
  description: string
  output_label: string
  output_tag: string
  order: number
}

export default function ProcessForm({ steps: initialSteps }: { steps: ProcessStep[] }) {
  const [steps, setSteps] = useState(initialSteps)
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
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {steps.map((step, idx) => (
          <Card key={step.id}>
            <CardHeader>
              <CardTitle style={{ fontSize: 15 }}>Step {idx + 1}: {step.phase}</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <Label>Phase</Label>
                <Input value={step.phase} onChange={e => updateStep(step.id, 'phase', e.target.value)} style={{ marginTop: 6 }} />
              </div>
              <div>
                <Label>Title</Label>
                <Input value={step.title} onChange={e => updateStep(step.id, 'title', e.target.value)} style={{ marginTop: 6 }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <Label>Description</Label>
                <Textarea value={step.description} onChange={e => updateStep(step.id, 'description', e.target.value)} rows={3} style={{ marginTop: 6 }} />
              </div>
              <div>
                <Label>Output Label</Label>
                <Input value={step.output_label} onChange={e => updateStep(step.id, 'output_label', e.target.value)} style={{ marginTop: 6 }} />
              </div>
              <div>
                <Label>Output Tag</Label>
                <Input value={step.output_tag} onChange={e => updateStep(step.id, 'output_tag', e.target.value)} style={{ marginTop: 6 }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Separator style={{ margin: '24px 0' }} />
      <Button onClick={save} disabled={saving}>
        {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save All Steps'}
      </Button>
    </div>
  )
}
