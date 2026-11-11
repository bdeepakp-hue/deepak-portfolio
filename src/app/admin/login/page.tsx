'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/admin')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left panel */}
      <div style={{
        width: '45%', background: '#0f172a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 48,
      }} className="hidden-mobile">
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: '#4f46e5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 800, color: '#fff',
          fontFamily: 'var(--font-display)',
          marginBottom: 24,
        }}>DB</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', margin: '0 0 12px', textAlign: 'center', fontFamily: 'var(--font-display)' }}>
          Portfolio CMS
        </h2>
        <p style={{ fontSize: 15, color: '#64748b', textAlign: 'center', lineHeight: 1.6, maxWidth: 280 }}>
          Manage your portfolio content — projects, case studies, resume and more.
        </p>

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 280 }}>
          {['Projects & Case Studies', 'Hero & Profile', 'Resume & Experience', 'Process Steps'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f46e5', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#475569' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 48,
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              Sign in to your admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Label htmlFor="email" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Email address</Label>
              <Input
                id="email" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@deepak.com"
                required
                style={{ height: 42, fontSize: 14 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Label htmlFor="password" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Password</Label>
              <Input
                id="password" type="password"
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ height: 42, fontSize: 14 }}
              />
            </div>

            {error && (
              <div style={{
                padding: '10px 14px', borderRadius: 8,
                background: '#fef2f2', border: '1px solid #fecaca',
                fontSize: 13, color: '#dc2626',
              }}>
                {error}
              </div>
            )}

            <Button
              type="submit" disabled={loading}
              style={{
                height: 44, fontSize: 14, fontWeight: 600,
                background: '#4f46e5', color: '#fff',
                border: 'none', borderRadius: 8, cursor: 'pointer',
                marginTop: 4,
              }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </Button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
