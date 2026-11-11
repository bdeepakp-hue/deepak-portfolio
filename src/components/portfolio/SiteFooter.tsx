export default function SiteFooter() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
          © 2026 Deepak Badgujar
        </p>
      </div>
    </footer>
  )
}
