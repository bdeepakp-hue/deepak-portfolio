'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Briefcase, GraduationCap, Award, Save, Check, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'

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

type TabKey = 'experience' | 'certifications' | 'education'

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: 6 }}>
      {children}
    </label>
  )
}

function SectionHeader({ icon: Icon, title, subtitle, color = '#4f46e5' }: {
  icon: React.ElementType
  title: string
  subtitle: string
  color?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={18} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{subtitle}</div>
      </div>
    </div>
  )
}

export default function ResumeForm({ experiences: initExp, certifications: initCerts, educations: initEdus }: {
  experiences: Experience[]
  certifications: Certification[]
  educations: Education[]
}) {
  const [experiences, setExperiences] = useState(initExp)
  const [certifications, setCertifications] = useState(initCerts)
  const [educations, setEducations] = useState(initEdus)
  const [activeTab, setActiveTab] = useState<TabKey>('experience')
  const [expandedExp, setExpandedExp] = useState<string | null>(initExp[0]?.id ?? null)
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
    setTimeout(() => setSaved(false), 2500)
  }

  const updateExp = (id: string, key: keyof Experience, value: string | string[]) =>
    setExperiences(experiences.map(e => e.id === id ? { ...e, [key]: value } : e))

  const updateCert = (id: string, key: keyof Certification, value: string) =>
    setCertifications(certifications.map(c => c.id === id ? { ...c, [key]: value } : c))

  const updateEdu = (id: string, key: keyof Education, value: string) =>
    setEducations(educations.map(e => e.id === id ? { ...e, [key]: value } : e))

  const tabs: { key: TabKey; label: string; icon: React.ElementType; count: number; color: string }[] = [
    { key: 'experience', label: 'Experience', icon: Briefcase, count: experiences.length, color: '#4f46e5' },
    { key: 'certifications', label: 'Certifications', icon: Award, count: certifications.length, color: '#f59e0b' },
    { key: 'education', label: 'Education', icon: GraduationCap, count: educations.length, color: '#10b981' },
  ]

  return (
    <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Tab Bar */}
      <div style={{
        display: 'flex',
        gap: 4,
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: 6,
      }}>
        {tabs.map(tab => {
          const active = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                background: active ? tab.color : 'transparent',
                color: active ? '#fff' : '#64748b',
                transition: 'all 0.15s',
              }}
            >
              <tab.icon size={15} />
              {tab.label}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                borderRadius: 10,
                background: active ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                color: active ? '#fff' : '#94a3b8',
                fontSize: 11,
                fontWeight: 700,
              }}>{tab.count}</span>
            </button>
          )
        })}
      </div>

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SectionHeader icon={Briefcase} title="Work Experience" subtitle="Your professional history — most recent first" color="#4f46e5" />
          {experiences.map((exp, idx) => {
            const isOpen = expandedExp === exp.id
            return (
              <div key={exp.id} style={{
                background: '#fff',
                border: `1px solid ${isOpen ? '#c7d2fe' : '#e2e8f0'}`,
                borderRadius: 12,
                overflow: 'hidden',
              }}>
                <button
                  onClick={() => setExpandedExp(isOpen ? null : exp.id)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
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
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#4f46e5',
                    flexShrink: 0,
                  }}>
                    {(exp.company || 'Co').slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{exp.company || `Company ${idx + 1}`}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                      {[exp.role, exp.start_date && exp.end_date ? `${exp.start_date} – ${exp.end_date}` : ''].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                  {isOpen ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
                </button>

                {isOpen && (
                  <div style={{ padding: '20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <div>
                        <FieldLabel>Company</FieldLabel>
                        <Input value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} placeholder="Company name" />
                      </div>
                      <div>
                        <FieldLabel>Role / Title</FieldLabel>
                        <Input value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)} placeholder="e.g. Senior Product Designer" />
                      </div>
                      <div>
                        <FieldLabel>Start Date</FieldLabel>
                        <Input value={exp.start_date} onChange={e => updateExp(exp.id, 'start_date', e.target.value)} placeholder="e.g. Jan 2021" />
                      </div>
                      <div>
                        <FieldLabel>End Date</FieldLabel>
                        <Input value={exp.end_date} onChange={e => updateExp(exp.id, 'end_date', e.target.value)} placeholder="e.g. Present" />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <FieldLabel>Location</FieldLabel>
                        <Input value={exp.location} onChange={e => updateExp(exp.id, 'location', e.target.value)} placeholder="City, Country or Remote" />
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Intro / Summary</FieldLabel>
                      <Textarea value={exp.intro} onChange={e => updateExp(exp.id, 'intro', e.target.value)} rows={2} placeholder="Brief overview of this role..." />
                    </div>
                    <div>
                      <FieldLabel>Key Contributions (one per line)</FieldLabel>
                      <Textarea
                        value={(exp.bullets as string[]).join('\n')}
                        onChange={e => updateExp(exp.id, 'bullets', e.target.value.split('\n'))}
                        rows={5}
                        placeholder="Led redesign of checkout flow, reducing drop-off by 32%&#10;Established design system used across 3 product teams&#10;..."
                        style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 13 }}
                      />
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Each line becomes a bullet point</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SectionHeader icon={Award} title="Certifications" subtitle="Professional certifications and achievements" color="#f59e0b" />
          {certifications.map((cert, idx) => (
            <div key={cert.id} style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={14} color="#f59e0b" />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                  {cert.title || `Certification ${idx + 1}`}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldLabel>Certification Title</FieldLabel>
                  <Input value={cert.title} onChange={e => updateCert(cert.id, 'title', e.target.value)} placeholder="e.g. Google UX Design Certificate" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldLabel>Issuing Organization</FieldLabel>
                  <Input value={cert.issuer} onChange={e => updateCert(cert.id, 'issuer', e.target.value)} placeholder="e.g. Google / Coursera" />
                </div>
                <div>
                  <FieldLabel>Start / Issue Date</FieldLabel>
                  <Input value={cert.start_date} onChange={e => updateCert(cert.id, 'start_date', e.target.value)} placeholder="e.g. 2023" />
                </div>
                <div>
                  <FieldLabel>End / Expiry Date</FieldLabel>
                  <Input value={cert.end_date} onChange={e => updateCert(cert.id, 'end_date', e.target.value)} placeholder="e.g. No Expiry" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SectionHeader icon={GraduationCap} title="Education" subtitle="Academic background and qualifications" color="#10b981" />
          {educations.map((edu, idx) => (
            <div key={edu.id} style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={14} color="#10b981" />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                  {edu.degree || `Degree ${idx + 1}`}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldLabel>Degree / Course</FieldLabel>
                  <Input value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} placeholder="e.g. Bachelor of Design (B.Des)" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldLabel>Institution / University</FieldLabel>
                  <Input value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} placeholder="e.g. National Institute of Design" />
                </div>
                <div>
                  <FieldLabel>Start Year</FieldLabel>
                  <Input value={edu.start_date} onChange={e => updateEdu(edu.id, 'start_date', e.target.value)} placeholder="e.g. 2008" />
                </div>
                <div>
                  <FieldLabel>End Year</FieldLabel>
                  <Input value={edu.end_date} onChange={e => updateEdu(edu.id, 'end_date', e.target.value)} placeholder="e.g. 2012" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
          {saved ? 'All changes saved' : 'Changes apply to all tabs'}
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
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Save size={14} /> Save All Changes</span>
          )}
        </Button>
      </div>
    </div>
  )
}
