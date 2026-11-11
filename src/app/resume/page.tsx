export const instant = false
import { prisma } from '@/lib/db'
import SiteNav from '@/components/portfolio/SiteNav'
import SiteFooter from '@/components/portfolio/SiteFooter'

export default async function ResumePage() {
  const [profile, experiences, certifications, educations, toolGroups] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.certification.findMany({ orderBy: { order: 'asc' } }),
    prisma.education.findMany({ orderBy: { order: 'asc' } }),
    prisma.toolGroup.findMany({ orderBy: { order: 'asc' }, include: { tools: { orderBy: { order: 'asc' } } } }),
  ])

  if (!profile) return <div>No data.</div>

  return (
    <>
      <SiteNav />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
            DEEPAK<br />BADGUJAR
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{profile.phone}</span>
              <span style={{ color: 'var(--border)' }}>·</span>
              <a href={`mailto:${profile.email}`} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>{profile.email}</a>
            </div>
            <a href={profile.behance_url} target="_blank" rel="noopener" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>deepakbadgujar.myportfolio.com</a>
            <a href={profile.linkedin_url} target="_blank" rel="noopener" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>linkedin.com/in/deepakbadgujar</a>
          </div>
        </header>

        <div style={{ width: '100%', height: 1, background: 'var(--border)', marginBottom: 48 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48 }}>
          {/* Sidebar */}
          <aside>
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>SKILLS</h2>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Research</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {['Persona Development', 'User Interview', 'Usability Testing', 'Analytics Tools', 'Information Architecture', 'User Journey', 'Interaction Design', 'Wireframe', 'Prototyping', 'Mood Board'].map(s => (
                    <li key={s} style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Principles & Methodologies</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {['Design Thinking', 'User-Centered Design (UCD)', 'Agile & Lean UX', 'Accessibility', 'Design System', 'Responsive Design'].map(s => (
                    <li key={s} style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>TOOLS</h2>
              {toolGroups.map(group => (
                <div key={group.id} style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{group.name}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {group.tools.map(t => <li key={t.id} style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.name}</li>)}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <h2 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>PERSONAL INFO</h2>
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Known Languages</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>English, Hindi, Marathi</p>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Permanent Location</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>FL. No. B2, Narayan Complex, Hingne Khurd, Sinhagad Road, Pune 411 051</p>
              </div>
            </section>
          </aside>

          {/* Main */}
          <div>
            {/* Summary */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>SUMMARY</h2>
              {profile.bio.split('\n\n').slice(0, 2).map((para, i) => (
                <p key={i} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 12 }}>{para}</p>
              ))}
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                <strong>Focus Areas:</strong> <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Product Design | Enterprise SaaS | AI-First UX | UX Strategy | Design Systems | Interaction Design</span>
              </p>
            </section>

            {/* Experience */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>EXPERIENCE</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {experiences.map(exp => (
                  <article key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, flexWrap: 'wrap', gap: 4 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700 }}>{exp.company}</h3>
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{exp.start_date} – {exp.end_date} | {exp.location}</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>{exp.role}</p>
                    {exp.intro && <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 10 }}>{exp.intro}</p>}
                    <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {(exp.bullets as string[]).map((b, i) => (
                        <li key={i} style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{b}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>CERTIFICATIONS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {certifications.map(cert => (
                  <article key={cert.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600 }}>{cert.title}</h3>
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{cert.start_date} – {cert.end_date}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{cert.issuer}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>EDUCATION</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {educations.map(edu => (
                  <article key={edu.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600 }}>{edu.degree}</h3>
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{edu.start_date} – {edu.end_date}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{edu.institution}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
