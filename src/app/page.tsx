export const instant = false
import { prisma } from '@/lib/db'
import SiteNav from '@/components/portfolio/SiteNav'
import SiteFooter from '@/components/portfolio/SiteFooter'
import Link from 'next/link'
import CopyEmailButton from '@/components/portfolio/CopyEmailButton'
import ProjectCard from '@/components/portfolio/ProjectCard'

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
        <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '150px 24px 88px', background: '#f8f9fa' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', width: '100%', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', marginBottom: 24, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              {profile.hero_eyebrow}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6.4vw, 4.25rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', maxWidth: 900, marginBottom: 24, color: 'var(--text)' }}>
              {profile.hero_title.split('product decisions people trust.')[0]}
              <span style={{ background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                product decisions people trust.
              </span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 680, lineHeight: 1.7, marginBottom: 32 }}>
              {profile.hero_lede}
            </p>
            <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, listStyle: 'none', padding: 0, margin: '36px 0 0' }}>
              {heroTags.map(tag => (
                <li key={tag.id} style={{ padding: '8px 16px', borderRadius: 999, fontSize: 14, fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-bg)' }}>
                  {tag.label}
                </li>
              ))}
            </ul>
            <a href="#work" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--text-muted)', marginTop: 44 }} aria-label="Scroll to case studies">
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
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
                  thumb_url={project.thumb_url}
                />
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
            <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 28, listStyle: 'none', padding: 0 }}>
              {processSteps.map(step => (
                <li key={step.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 28, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(20,22,40,0.06)' }}>
                  <span style={{ display: 'inline-block', padding: '8px 15px', fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--accent)', background: 'var(--accent-bg)', borderRadius: 999 }}>
                    {step.phase}
                  </span>
                  <h3 style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', marginTop: 26, lineHeight: 1.5, color: 'var(--text)' }}>{step.title}</h3>
                  <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.78, margin: '12px 0 16px', flexGrow: 1 }}>{step.description}</p>
                  <span style={{ display: 'inline-block', padding: '8px 15px', fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--accent)', background: 'var(--accent-bg)', borderRadius: 999, marginTop: 'auto' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '218px minmax(0,1fr)', gap: '48px 114px', padding: '58px 58px 52px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 32, boxShadow: '0 1px 3px rgba(20,22,40,0.06)' }}>
              <div style={{ width: 218, height: 218, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--accent)', background: 'linear-gradient(135deg, var(--accent-bg), rgb(240,238,253))', border: '1px solid rgb(226,228,240)', boxShadow: '0 6px 16px rgba(67,85,232,0.1)', flexShrink: 0 }}>
                DB
              </div>
              <div>
                {profile.bio.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontSize: 22, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 22 }}>{para}</p>
                ))}
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--text)', margin: '40px 0 0' }}>Tools &amp; Technologies</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 16 }}>
                  {toolGroups.map(group => (
                    <div key={group.id}>
                      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>{group.name}</h4>
                      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 12, listStyle: 'none', padding: 0 }}>
                        {group.tools.map(tool => (
                          <li key={tool.id} style={{ padding: '9px 17px', fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text)', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 999 }}>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 72px', padding: '62px 60px 56px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 36, boxShadow: '0 1px 3px rgba(20,22,40,0.06)' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>Email</h3>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <a href={`mailto:${profile.email}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 24, lineHeight: 1.3, color: 'var(--text)', textDecoration: 'none' }}>{profile.email}</a>
                  <CopyEmailButton email={profile.email} />
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>LinkedIn</h3>
                <a href={profile.linkedin_url} target="_blank" rel="noopener" style={{ display: 'inline-block', paddingBottom: 2, fontSize: 24, color: 'var(--text)', borderBottom: '2px solid var(--border)', textDecoration: 'none' }}>
                  linkedin.com/in/deepakbadgujar
                </a>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>Portfolio deck</h3>
                <Link href="/resume" style={{ display: 'inline-block', paddingBottom: 2, fontSize: 24, color: 'var(--text)', borderBottom: '2px solid var(--border)', textDecoration: 'none' }}>
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
