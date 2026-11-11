export const instant = false
import { prisma } from '@/lib/db'
import SiteNav from '@/components/portfolio/SiteNav'
import SiteFooter from '@/components/portfolio/SiteFooter'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ where: { is_published: true }, select: { slug: true } })
  return projects.map(p => ({ slug: p.slug }))
}

type Section = {
  type: string
  eyebrow?: string
  title?: string
  lede?: string
  meta?: { label: string; value: string }[]
  prose?: string[]
  card?: { title: string; duration?: string; responsibility?: string; tools?: string[] }
  lead?: string
  objectives?: string[]
  goals?: { value: string; label: string }[]
  steps?: { n: string; title: string; desc: string }[]
  takeaways?: string[]
  roadmap?: string[]
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { caseStudy: true },
  })

  if (!project) notFound()

  const sections = project.caseStudy ? (project.caseStudy.sections as Section[]) : []

  return (
    <>
      <SiteNav />
      <main>
        {sections.map((section, idx) => {
          if (section.type === 'hero') {
            return (
              <header key={idx} style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--border)', padding: '80px 24px 60px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 20, letterSpacing: '0.08em' }}>{section.eyebrow}</p>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 20 }}>{section.title}</h1>
                  <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 680, marginBottom: 32 }}>{section.lede}</p>
                  {section.meta && (
                    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 32, listStyle: 'none', padding: 0 }}>
                      {section.meta.map((m, i) => (
                        <li key={i}>
                          <span style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 4, letterSpacing: '0.08em' }}>{m.label}</span>
                          <span style={{ fontSize: 15, fontWeight: 600 }}>{m.value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </header>
            )
          }

          if (section.type === 'overview') {
            return (
              <section key={idx} style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.08em' }}>{section.eyebrow}</p>
                  <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>{section.title}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, flexWrap: 'wrap' }}>
                    <div>
                      {section.prose?.map((p, i) => <p key={i} style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16 }}>{p}</p>)}
                    </div>
                    {section.card && (
                      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{section.card.title}</h3>
                        {section.card.duration && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}><strong>Duration:</strong> {section.card.duration}</p>}
                        {section.card.responsibility && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}><strong>Responsibility:</strong> {section.card.responsibility}</p>}
                        {section.card.tools && (
                          <>
                            <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 8, letterSpacing: '0.08em' }}>Tools</p>
                            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', padding: 0 }}>
                              {section.card.tools.map(t => <li key={t} style={{ padding: '3px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 100, fontSize: 12, color: 'var(--text-muted)' }}>{t}</li>)}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          if (section.type === 'problem') {
            return (
              <section key={idx} style={{ padding: '80px 24px', background: 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.08em' }}>{section.eyebrow}</p>
                  <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>{section.title}</h2>
                  {section.lead && <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>{section.lead}</p>}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                    {section.objectives && (
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Objectives</h3>
                        <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {section.objectives.map((o, i) => <li key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{o}</li>)}
                        </ul>
                      </div>
                    )}
                    {section.goals && (
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Goals</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {section.goals.map((g, i) => (
                            <li key={i}>
                              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{g.value}</span>
                              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{g.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          if (section.type === 'process') {
            return (
              <section key={idx} style={{ padding: '80px 24px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.08em' }}>{section.eyebrow}</p>
                  <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>{section.title}</h2>
                  <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {section.steps?.map(step => (
                      <li key={step.n} style={{ display: 'flex', gap: 24, padding: '20px 24px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 10 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: 'var(--border)', flexShrink: 0, lineHeight: 1 }}>{step.n}</span>
                        <div>
                          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{step.title}</h3>
                          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )
          }

          if (section.type === 'outcomes') {
            return (
              <section key={idx} style={{ padding: '80px 24px', background: 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.08em' }}>{section.eyebrow}</p>
                  <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>{section.title}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                    {section.takeaways && (
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Key takeaways</h3>
                        <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {section.takeaways.map((t, i) => <li key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{t}</li>)}
                        </ul>
                      </div>
                    )}
                    {section.roadmap && (
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Roadmap</h3>
                        <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {section.roadmap.map((r, i) => <li key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{r}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          return null
        })}

        {/* Thank you / back link */}
        <section style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>Thank you</h2>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 32 }}>Let&rsquo;s grow together.<br />By Deepak Badgujar, UX Designer.</p>
            <Link href="/#work" style={{ display: 'inline-block', padding: '12px 24px', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14 }}>
              ← Back to all work
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
