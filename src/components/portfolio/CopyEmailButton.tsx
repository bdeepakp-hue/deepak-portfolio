'use client'

import { useState } from 'react'

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button onClick={copy} style={{
      padding: '4px 12px', background: 'var(--bg3)', border: '1px solid var(--border)',
      borderRadius: 6, fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer',
      fontFamily: 'var(--font-mono)', transition: 'border-color 0.2s',
    }}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
