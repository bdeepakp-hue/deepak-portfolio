export const instant = false
import { prisma } from '@/lib/db'
import SiteNav from '@/components/portfolio/SiteNav'
import SiteFooter from '@/components/portfolio/SiteFooter'
import Link from 'next/link'
import Image from 'next/image'
import CopyEmailButton from '@/components/portfolio/CopyEmailButton'

export default async function HomePage() {
  const [profile, heroTags, projects, processSteps, toolGroups] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.heroTag.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({ where: { is_published: true }, orderBy: { order: 'asc' } }),
    prisma.processStep.findMany({ orderBy: { order: 'asc' } }),
    prisma.toolGroup.findMany({ orderBy: { order: 'asc' }, include: { tools: { orderBy: { order: 'asc' } } } }),
  ])

  if (!profile) return <div>No profile data.</div>

  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '80px 24px 60px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, letterSpacing: '0.05em' }}>
              {profile.hero_eyebrow}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 900, marginBottom: 24 }}>
              {profile.hero_title.split('product decisions people trust.')[0]}
              <span style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #80ff44 50%, #00e5ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                product decisions people trust.
              </span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 680, lineHeight: 1.7, marginBottom: 32 }}>
              {profile.hero_lede}
            </p>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 10, listStyle: 'none', padding: 0, margin: '0 0 48px' }}>
              {heroTags.map(tag => (
                <li key={tag.id} style={{ padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 100, fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {tag.label}
                </li>
              ))}
            </ul>
            <a href="#work" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text-muted)' }} aria-label="Scroll to case studies">
              <span style={{ width: 28, height: 44, border: '2px solid var(--border)', borderRadius: 14, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6px 0' }}>
                <span style={{ width: 4, height: 8, background: 'var(--text-muted)', borderRadius: 2, animation: 'scrollDot 1.5s ease-in-out infinite' }} />
              </span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>Scroll</span>
            </a>
          </div>
        </section>

        {/* Work */}
        <section id="work" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 48, letterSpacing: '0.1em' }}>01 / Work</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {projects.map(project => (
                <Link key={project.id} href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--card-bg)', border: '1px solid var(--border)',
                    borderRadius: 16, overflow: 'hidden', padding: 24,
                    transition: 'border-color 0.2s, transform 0.2s',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--text-dim)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
                  >
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '62%', marginBottom: 20, borderRadius: 8, overflow: 'hidden', background: 'var(--bg3)' }}>
                      <Image src={project.thumb_url} alt={project.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>{project.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.1em' }}>02 / Process</p>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>How I work</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>The same four moves on every project, scaled to the size of the problem.</p>
            </div>
            <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2, listStyle: 'none', padding: 0, counterReset: 'process' }}>
              {processSteps.map(step => (
                <li key={step.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ display: 'inline-block', padding: '3px 10px', border: '1px solid var(--border)', borderRadius: 100, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {step.phase}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 600 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1 }}>{step.description}</p>
                  <span style={{ display: 'inline-block', padding: '3px 10px', background: 'var(--bg3)', borderRadius: 100, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', alignSelf: 'flex-start' }}>
                    {step.output_tag}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* About */}
        <section id="about" style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.1em' }}>03 / About</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 32 }}>About me</h2>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div style={{ width: 72, height: 72, background: 'var(--bg3)', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', flexShrink: 0 }}>
                DB
              </div>
              <div style={{ flex: 1, minWidth: 280 }}>
                {profile.bio.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16 }}>{para}</p>
                ))}
                <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 24, marginBottom: 16 }}>Tools & Technologies</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {toolGroups.map(group => (
                    <div key={group.id}>
                      <h4 style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 8, letterSpacing: '0.08em' }}>{group.name}</h4>
                      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', padding: 0 }}>
                        {group.tools.map(tool => (
                          <li key={tool.id} style={{ padding: '4px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 100, fontSize: 12, color: 'var(--text-muted)' }}>
                            {tool.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, letterSpacing: '0.1em' }}>04 / Contact</p>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>Let&rsquo;s talk</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>Open to product design and UX research roles. Reach out directly, or find me on LinkedIn.</p>
            </div>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, display: 'flex', flexWrap: 'wrap', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 10, letterSpacing: '0.1em' }}>Email</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <a href={`mailto:${profile.email}`} style={{ fontSize: 16, color: 'var(--text)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>{profile.email}</a>
                  <CopyEmailButton email={profile.email} />
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 10, letterSpacing: '0.1em' }}>LinkedIn</h3>
                <a href={profile.linkedin_url} target="_blank" rel="noopener" style={{ color: 'var(--text-muted)', fontSize: 14, textDecoration: 'none' }}>
                  linkedin.com/in/deepakbadgujar
                </a>
              </div>
              <div>
                <h3 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 10, letterSpacing: '0.1em' }}>Portfolio deck</h3>
                <Link href="/resume" style={{ color: 'var(--text-muted)', fontSize: 14, textDecoration: 'none' }}>
                  View résumé
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </>
  )
}
