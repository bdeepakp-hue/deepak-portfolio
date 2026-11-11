'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

interface Experience {
  id: string
  company: string
  role: string
  start_date: string
  end_date: string
  location: string
  intro: string
  bullets: unknown
  order: number
}

interface Certification {
  id: string
  title: string
  issuer: string
  start_date: string
  end_date: string
  order: number
}

interface Education {
  id: string
  degree: string
  institution: string
  start_date: string
  end_date: string
  order: number
}

export default function ResumeForm({ experiences: initExp, certifications: initCerts, educations: initEdus }: {
  experiences: Experience[]
  certifications: Certification[]
  educations: Education[]
}) {
  const [experiences, setExperiences] = useState(initExp)
  const [certifications, setCertifications] = useState(initCerts)
  const [educations, setEducations] = useState(initEdus)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/resume', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experiences, certifications, educations }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateExp = (id: string, key: keyof Experience, value: string | string[]) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [key]: value } : e))
  }

  const updateCert = (id: string, key: keyof Certification, value: string) => {
    setCertifications(certifications.map(c => c.id === id ? { ...c, [key]: value } : c))
  }

  const updateEdu = (id: string, key: keyof Education, value: string) => {
    setEducations(educations.map(e => e.id === id ? { ...e, [key]: value } : e))
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <Tabs defaultValue="experience">
        <TabsList style={{ marginBottom: 24 }}>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="experience">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {experiences.map((exp, idx) => (
              <Card key={exp.id}>
                <CardHeader><CardTitle style={{ fontSize: 15 }}>{exp.company}</CardTitle></CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <Label>Company</Label>
                      <Input value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} style={{ marginTop: 6 }} />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)} style={{ marginTop: 6 }} />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input value={exp.start_date} onChange={e => updateExp(exp.id, 'start_date', e.target.value)} style={{ marginTop: 6 }} />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input value={exp.end_date} onChange={e => updateExp(exp.id, 'end_date', e.target.value)} style={{ marginTop: 6 }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <Label>Location</Label>
                      <Input value={exp.location} onChange={e => updateExp(exp.id, 'location', e.target.value)} style={{ marginTop: 6 }} />
                    </div>
                  </div>
                  <div>
                    <Label>Intro</Label>
                    <Textarea value={exp.intro} onChange={e => updateExp(exp.id, 'intro', e.target.value)} rows={2} style={{ marginTop: 6 }} />
                  </div>
                  <div>
                    <Label>Bullets (one per line)</Label>
                    <Textarea
                      value={(exp.bullets as string[]).join('\n')}
                      onChange={e => updateExp(exp.id, 'bullets', e.target.value.split('\n'))}
                      rows={6}
                      style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 13 }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {certifications.map(cert => (
              <Card key={cert.id}>
                <CardContent style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label>Title</Label>
                    <Input value={cert.title} onChange={e => updateCert(cert.id, 'title', e.target.value)} style={{ marginTop: 6 }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label>Issuer</Label>
                    <Input value={cert.issuer} onChange={e => updateCert(cert.id, 'issuer', e.target.value)} style={{ marginTop: 6 }} />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input value={cert.start_date} onChange={e => updateCert(cert.id, 'start_date', e.target.value)} style={{ marginTop: 6 }} />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input value={cert.end_date} onChange={e => updateCert(cert.id, 'end_date', e.target.value)} style={{ marginTop: 6 }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {educations.map(edu => (
              <Card key={edu.id}>
                <CardContent style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label>Degree</Label>
                    <Input value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} style={{ marginTop: 6 }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label>Institution</Label>
                    <Input value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} style={{ marginTop: 6 }} />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input value={edu.start_date} onChange={e => updateEdu(edu.id, 'start_date', e.target.value)} style={{ marginTop: 6 }} />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input value={edu.end_date} onChange={e => updateEdu(edu.id, 'end_date', e.target.value)} style={{ marginTop: 6 }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Separator style={{ margin: '24px 0' }} />
      <Button onClick={save} disabled={saving}>
        {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save All Changes'}
      </Button>
    </div>
  )
}
