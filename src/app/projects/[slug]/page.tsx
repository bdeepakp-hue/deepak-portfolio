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
  // image types
  url?: string
  alt?: string
  caption?: string
  images?: { url: string; alt: string; caption?: string }[]
  columns?: number
  // stats
  stats?: { value: string; label: string }[]
  // quote
  text?: string
  author?: string
}


const Eyebrow = ({ text }: { text?: string }) => text ? (
  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.08em' }}>{text}</p>
) : null

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28, color: 'var(--text)' }}>
    {children}
  </h2>
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
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>
                  <div>
                    {section.prose?.map((p, i) => <p key={i} style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16 }}>{p}</p>)}
                  </div>
                  {section.card && (
                    <div style={{ background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text)' }}>{section.card.title}</h3>
                      {section.card.duration && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}><strong>Duration:</strong> {section.card.duration}</p>}
                      {section.card.responsibility && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}><strong>Responsibility:</strong> {section.card.responsibility}</p>}
                      {section.card.tools && (
                        <>
                          <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tools</p>
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
                      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>Objectives</h3>
                      <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {section.objectives.map((o, i) => <li key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{o}</li>)}
                      </ul>
                    </div>
                  )}
                  {section.goals && (
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>Goals</h3>
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

          // ── Outcomes ───────────────────────────────────────────────────────
          if (section.type === 'outcomes') {
            return wrap(
              <>
                <Eyebrow text={section.eyebrow} />
                <H2>{section.title}</H2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                  {section.takeaways && (
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>Key takeaways</h3>
                      <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {section.takeaways.map((t, i) => <li key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{t}</li>)}
                      </ul>
                    </div>
                  )}
                  {section.roadmap && (
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>Roadmap</h3>
                      <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {section.roadmap.map((r, i) => <li key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{r}</li>)}
                      </ul>
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

// helper to key sections
function wrap(children: React.ReactNode, alt: boolean, idx: number) {
  return (
    <section key={idx} style={{ background: alt ? 'rgb(248,249,250)' : '#fff', borderBottom: '1px solid var(--border)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}
