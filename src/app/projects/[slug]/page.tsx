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
  lead2?: string
  objectives?: string[]
  goals?: { value: string; label: string }[]
  steps?: { n: string; title: string; desc: string }[]
  takeaways?: string[]
  roadmap?: string[]
  url?: string
  alt?: string
  caption?: string
  images?: { url: string; alt: string; caption?: string }[]
  columns?: number
  stats?: { value: string; label: string }[]
  text?: string
  author?: string
  // research
  groups?: { title: string; items: { value: string; label: string }[] }[]
  // ia / chips
  chips?: string[]
  bullets?: string[]
  // design system colors
  swatches?: { color: string; label: string }[]
  // competitive analysis
  features?: string[]
  competitors?: string[]
  matrix?: string[][]
  cards?: { title: string; strengths?: string[]; weaknesses?: string[] }[]
  // personas
  personas?: {
    n: string
    name: string
    meta: string
    bio: string
    sections: { title: string; items: string[] }[]
  }[]
  // empathy maps
  maps?: {
    name: string
    lead?: string
    says?: string[]; thinks?: string[]; feels?: string[]; does?: string[]
    pain_points?: string[]
    opportunities?: string[]
  }[]
}

const Eyebrow = ({ text }: { text?: string }) => text ? (
  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.08em' }}>{text}</p>
) : null

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28, color: 'var(--text)' }}>
    {children}
  </h2>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--text)' }}>{children}</h3>
)

const ListLabel = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{children}</h4>
)

const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
    {items.map((item, i) => <li key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{item}</li>)}
  </ul>
)

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
      <main style={{ paddingTop: 56 }}>
        {sections.map((section, idx) => {

          // ── Hero ───────────────────────────────────────────────────────────
          if (section.type === 'hero') {
            return (
              <header key={idx} style={{ background: '#f8f9fa', borderBottom: '1px solid var(--border)', padding: '80px 24px 60px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                  <Eyebrow text={section.eyebrow} />
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 20, color: 'var(--text)' }}>
                    {section.title}
                  </h1>
                  <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 680, marginBottom: 36 }}>{section.lede}</p>
                  {section.meta && (
                    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 32, listStyle: 'none', padding: 0 }}>
                      {section.meta.map((m, i) => (
                        <li key={i}>
                          <span style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.label}</span>
                          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{m.value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </header>
            )
          }

          // ── Overview ───────────────────────────────────────────────────────
          if (section.type === 'overview') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                <div style={{ display: 'grid', gridTemplateColumns: section.card ? '2fr 1fr' : '1fr', gap: 40 }}>
                  <div>
                    {section.prose?.map((p, i) => <p key={i} style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16 }}>{p}</p>)}
                  </div>
                  {section.card && (
                    <div style={{ background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                      <H3>{section.card.title}</H3>
                      {section.card.duration && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}><strong>Duration:</strong> {section.card.duration}</p>}
                      {section.card.responsibility && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}><strong>Responsibility:</strong> {section.card.responsibility}</p>}
                      {section.card.tools && (
                        <>
                          <ListLabel>Tools</ListLabel>
                          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', padding: 0 }}>
                            {section.card.tools.map(t => <li key={t} style={{ padding: '4px 12px', background: '#fff', border: '1px solid var(--border)', borderRadius: 100, fontSize: 12, color: 'var(--text-muted)' }}>{t}</li>)}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </>, false, idx
            )
          }

          // ── Problem ────────────────────────────────────────────────────────
          if (section.type === 'problem') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                {section.lead && <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 36 }}>{section.lead}</p>}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                  {section.objectives && (
                    <div>
                      <ListLabel>Objectives</ListLabel>
                      <BulletList items={section.objectives} />
                    </div>
                  )}
                  {section.goals && (
                    <div>
                      <ListLabel>Goals</ListLabel>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {section.goals.map((g, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{g.value}</span>
                            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{g.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>, true, idx
            )
          }

          // ── Process ────────────────────────────────────────────────────────
          if (section.type === 'process') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {section.steps?.map(step => (
                    <li key={step.n} style={{ display: 'flex', gap: 24, padding: '20px 24px', background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 12 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--border)', flexShrink: 0, lineHeight: 1, minWidth: 40 }}>{step.n}</span>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>{step.title}</h3>
                        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </>, false, idx
            )
          }

          // ── Research ───────────────────────────────────────────────────────
          if (section.type === 'research') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                {section.lead && <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12 }}>{section.lead}</p>}
                {section.lead2 && <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 36 }}>{section.lead2}</p>}
                {section.groups && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                    {section.groups.map((g, gi) => (
                      <div key={gi} style={{ background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                        <ListLabel>{g.title}</ListLabel>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {g.items.map((item, ii) => (
                            <li key={ii} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent)', lineHeight: 1, flexShrink: 0 }}>{item.value}</span>
                              <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </>, true, idx
            )
          }

          // ── IA / Chips section ─────────────────────────────────────────────
          if (section.type === 'ia') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                {section.lead && <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>{section.lead}</p>}
                {section.chips && (
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', padding: 0, marginBottom: 32 }}>
                    {section.chips.map((c, i) => (
                      <li key={i} style={{ padding: '6px 14px', background: 'var(--accent-bg)', color: 'var(--accent)', borderRadius: 100, fontSize: 13, fontWeight: 500 }}>{c}</li>
                    ))}
                  </ul>
                )}
                {section.title && section.bullets && (
                  <div style={{ background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                    <H3>Marketplace user flow</H3>
                    <BulletList items={section.bullets} />
                  </div>
                )}
              </>, false, idx
            )
          }

          // ── Design System ──────────────────────────────────────────────────
          if (section.type === 'design_system') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                {section.lead && <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>{section.lead}</p>}
                {section.swatches && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    {section.swatches.map((sw, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 60, borderRadius: 12, background: sw.color, border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.3, fontFamily: 'var(--font-mono)', whiteSpace: 'pre-line' }}>{sw.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>, true, idx
            )
          }

          // ── Competitive analysis ───────────────────────────────────────────
          if (section.type === 'competitive') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                {section.lead && <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>{section.lead}</p>}
                {section.features && section.competitors && section.matrix && (
                  <div style={{ overflowX: 'auto', marginBottom: 40 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: '10px 16px', background: '#f8f9fa', border: '1px solid var(--border)', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Feature</th>
                          {section.competitors.map((c, i) => (
                            <th key={i} style={{ padding: '10px 12px', background: '#f8f9fa', border: '1px solid var(--border)', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textAlign: 'center', whiteSpace: 'nowrap' }}>{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.features.map((feat, fi) => (
                          <tr key={fi}>
                            <td style={{ padding: '10px 16px', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 500, fontSize: 13 }}>{feat}</td>
                            {(section.matrix![fi] ?? []).map((val, vi) => {
                              const c = val === 'High' ? { bg: '#dcfce7', color: '#16a34a' } : val === 'Medium' ? { bg: '#fef9c3', color: '#a16207' } : { bg: '#fee2e2', color: '#dc2626' }
                              return (
                                <td key={vi} style={{ padding: '10px 12px', border: '1px solid var(--border)', textAlign: 'center' }}>
                                  <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: c.bg, color: c.color }}>{val}</span>
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.cards && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    {section.cards.map((card, ci) => (
                      <div key={ci} style={{ background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
                        <H3>{card.title}</H3>
                        {card.strengths && <><ListLabel>Strengths</ListLabel><BulletList items={card.strengths} /></>}
                        {card.weaknesses && <div style={{ marginTop: 16 }}><ListLabel>Weaknesses</ListLabel><BulletList items={card.weaknesses} /></div>}
                      </div>
                    ))}
                  </div>
                )}
              </>, false, idx
            )
          }

          // ── Personas ───────────────────────────────────────────────────────
          if (section.type === 'personas') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {section.personas?.map((p, pi) => (
                    <div key={pi} style={{ background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
                      <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 6, letterSpacing: '0.08em' }}>{p.n}</p>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{p.name}</h3>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, fontStyle: 'italic' }}>{p.meta}</p>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>{p.bio}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                        {p.sections.map((s, si) => (
                          <div key={si}>
                            <ListLabel>{s.title}</ListLabel>
                            <BulletList items={s.items} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>, true, idx
            )
          }

          // ── Empathy maps ───────────────────────────────────────────────────
          if (section.type === 'empathy_maps') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                  {section.maps?.map((m, mi) => (
                    <div key={mi} style={{ background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{m.name}</h3>
                      {m.lead && <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>{m.lead}</p>}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 24 }}>
                        {m.says && <div><ListLabel>Says</ListLabel><BulletList items={m.says} /></div>}
                        {m.thinks && <div><ListLabel>Thinks</ListLabel><BulletList items={m.thinks} /></div>}
                        {m.feels && <div><ListLabel>Feels</ListLabel><BulletList items={m.feels} /></div>}
                        {m.does && <div><ListLabel>Does</ListLabel><BulletList items={m.does} /></div>}
                      </div>
                      {(m.pain_points || m.opportunities) && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                          {m.pain_points && <div><ListLabel>Key pain points</ListLabel><BulletList items={m.pain_points} /></div>}
                          {m.opportunities && <div><ListLabel>Key opportunities</ListLabel><BulletList items={m.opportunities} /></div>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>, false, idx
            )
          }

          // ── Outcomes ───────────────────────────────────────────────────────
          if (section.type === 'outcomes') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                  {section.takeaways && (
                    <div>
                      <ListLabel>Key takeaways</ListLabel>
                      <BulletList items={section.takeaways} />
                    </div>
                  )}
                  {section.roadmap && (
                    <div>
                      <ListLabel>Roadmap</ListLabel>
                      <BulletList items={section.roadmap} />
                    </div>
                  )}
                </div>
              </>, true, idx
            )
          }

          // ── Full-width image ───────────────────────────────────────────────
          if (section.type === 'image_full') {
            return (
              <div key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                {section.url && (
                  <div style={{ position: 'relative', width: '100%', maxHeight: 560, overflow: 'hidden' }}>
                    <Image src={section.url} alt={section.alt ?? ''} width={1200} height={560} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                  </div>
                )}
                {section.caption && (
                  <div style={{ padding: '12px 24px', background: '#f8f9fa' }}>
                    <p style={{ maxWidth: 900, margin: '0 auto', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{section.caption}</p>
                  </div>
                )}
              </div>
            )
          }

          // ── Two-column images ──────────────────────────────────────────────
          if (section.type === 'image_two_col') {
            return wrap(
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {section.images?.map((img, i) => (
                  <div key={i}>
                    {img.url && (
                      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', background: '#f1f5f9' }}>
                        <Image src={img.url} alt={img.alt} width={560} height={360} style={{ width: '100%', height: 'auto', display: 'block' }} />
                      </div>
                    )}
                    {img.caption && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>{img.caption}</p>}
                  </div>
                ))}
              </div>, false, idx
            )
          }

          // ── Text prose ─────────────────────────────────────────────────────
          if (section.type === 'text_prose') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                {section.title && <H2>{section.title}</H2>}
                {section.prose?.map((p, i) => <p key={i} style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16 }}>{p}</p>)}
              </>, false, idx
            )
          }

          // ── Stats row ──────────────────────────────────────────────────────
          if (section.type === 'stats_row') {
            return wrap(
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 48, listStyle: 'none', padding: 0, justifyContent: 'center' }}>
                {section.stats?.map((s, i) => (
                  <li key={i} style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{s.value}</span>
                    <span style={{ display: 'block', fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>{s.label}</span>
                  </li>
                ))}
              </ul>, true, idx
            )
          }

          // ── Pull quote ─────────────────────────────────────────────────────
          if (section.type === 'quote') {
            return wrap(
              <blockquote style={{ borderLeft: '4px solid var(--accent)', paddingLeft: 28, margin: 0 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700, lineHeight: 1.4, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: section.author ? 16 : 0 }}>
                  &ldquo;{section.text}&rdquo;
                </p>
                {section.author && <footer style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>— {section.author}</footer>}
              </blockquote>, false, idx
            )
          }

          // ── Image grid ─────────────────────────────────────────────────────
          if (section.type === 'image_grid') {
            const cols = section.columns ?? 3
            return wrap(
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
                {section.images?.map((img, i) => img.url ? (
                  <div key={i} style={{ borderRadius: 10, overflow: 'hidden', background: '#f1f5f9' }}>
                    <Image src={img.url} alt={img.alt} width={400} height={280} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                  </div>
                ) : null)}
              </div>, false, idx
            )
          }

          return null
        })}

        {/* Thank you */}
        <section style={{ padding: '80px 24px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>Thank you</h2>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 36 }}>Let&rsquo;s grow together.<br />By Deepak Badgujar, UX Designer.</p>
            <Link href="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'border-color 0.15s' }}>
              ← Back to all work
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function wrap(children: React.ReactNode, alt: boolean, idx: number) {
  return (
    <section key={idx} style={{ background: alt ? 'rgb(248,249,250)' : '#fff', borderBottom: '1px solid var(--border)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}
