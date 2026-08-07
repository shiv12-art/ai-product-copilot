export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚀 AI Product Copilot</h1>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>Generate professional product artifacts in seconds</p>
      <p style={{ fontSize: '14px', color: '#666' }}>No sign-ups. No APIs. Works in your browser.</p>

      <div style={{ marginTop: '40px', maxWidth: '600px', margin: '40px auto' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Your Product Idea</label>
            <textarea
              placeholder="Describe your product..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '120px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Category</label>
            <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}>
              <option>Select a category...</option>
              <option>SaaS</option>
              <option>B2C App</option>
              <option>Marketplace</option>
              <option>Hardware</option>
              <option>Service</option>
              <option>Community</option>
              <option>AI Tool</option>
            </select>
          </div>

          <button type="button" style={{ padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
            ✨ Generate Artifacts
          </button>
        </form>
      </div>

      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📋</div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>7 Artifacts</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Canvas, PRD, GTM, Features, Validation, Competitors, Pitch</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Instant</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Generate all artifacts in under 2 seconds</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛟</div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Professional</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Export as PDF or Markdown</p>
        </div>
      </div>
    </div>
  )
}
