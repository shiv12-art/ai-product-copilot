export default function ResultsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Generated Artifacts</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
        {['Canvas', 'PRD', 'GTM', 'Features', 'Validation', 'Competitors', 'Pitch'].map((tab) => (
          <button
            key={tab}
            style={{
              padding: '8px 16px',
              backgroundColor: tab === 'Canvas' ? '#2563eb' : '#e5e7eb',
              color: tab === 'Canvas' ? 'white' : 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Canvas</h2>
        <p style={{ color: '#666' }}>Product overview and key information will appear here.</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '8px 16px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          📥 Export
        </button>
      </div>
    </div>
  )
}
