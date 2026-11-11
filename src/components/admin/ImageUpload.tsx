'use client'

import { useRef, useState } from 'react'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
  hint?: string
  aspectRatio?: string   // e.g. '16/9', '1/1'
  maxHeightPx?: number
}

export default function ImageUpload({
  value,
  onChange,
  label,
  hint,
  aspectRatio = '16/9',
  maxHeightPx = 220,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  const upload = async (file: File) => {
    setError('')
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Upload failed'); return }
      onChange(data.url)
    } catch {
      setError('Upload failed — check connection')
    } finally {
      setUploading(false)
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
    e.target.value = ''
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) upload(file)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {label}
        </label>
      )}

      {/* Preview / Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          position: 'relative',
          borderRadius: 10,
          border: `2px dashed ${dragging ? '#4f46e5' : value ? '#e2e8f0' : '#cbd5e1'}`,
          background: dragging ? '#eef2ff' : value ? '#000' : '#f8fafc',
          cursor: uploading ? 'default' : 'pointer',
          overflow: 'hidden',
          minHeight: 100,
          maxHeight: maxHeightPx,
          aspectRatio,
          transition: 'border-color 0.15s, background 0.15s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Existing image preview */}
        {value && !uploading && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}

        {/* Overlay hover */}
        {value && !uploading && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
            gap: 8,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'rgba(255,255,255,0.9)', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#0f172a', opacity: 0 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
              className="upload-replace-btn"
            >
              <Upload size={12} /> Replace
            </div>
          </div>
        )}

        {/* Empty state */}
        {!value && !uploading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 24, color: '#94a3b8' }}>
            <ImageIcon size={28} strokeWidth={1.5} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 500, margin: 0, color: '#64748b' }}>Click or drag to upload</p>
              <p style={{ fontSize: 11, margin: '2px 0 0', color: '#94a3b8' }}>JPG, PNG, WebP — max 10 MB</p>
            </div>
          </div>
        )}

        {/* Uploading spinner */}
        {uploading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#4f46e5' }}>
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: 12, margin: 0, color: '#64748b' }}>Uploading…</p>
          </div>
        )}
      </div>

      {/* URL input below */}
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://... or /images/..."
          style={{
            flex: 1, height: 34, padding: '0 10px', fontSize: 12,
            border: '1px solid #e2e8f0', borderRadius: 7,
            color: '#475569', background: '#fff', outline: 'none',
            fontFamily: 'var(--font-mono)',
          }}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            type="button"
            title="Clear"
            style={{ width: 34, height: 34, borderRadius: 7, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#94a3b8' }}
          >
            <X size={13} />
          </button>
        )}
        <button
          onClick={() => inputRef.current?.click()}
          type="button"
          disabled={uploading}
          style={{ padding: '0 12px', height: 34, borderRadius: 7, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, color: '#475569', whiteSpace: 'nowrap' }}
          onMouseEnter={e => { if (!uploading) { e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.color = '#4f46e5' } }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569' }}
        >
          <Upload size={12} />
          Upload
        </button>
      </div>

      {hint && <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{hint}</p>}
      {error && <p style={{ fontSize: 12, color: '#dc2626', margin: 0 }}>{error}</p>}

      <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .upload-replace-btn { transition: opacity 0.15s !important; }
      `}</style>
    </div>
  )
}
