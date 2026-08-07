export default function SettingsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Settings</h1>

      <div style={{ backgroundColor: 'white', padding: '24px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Theme</h2>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" />
          <span>Dark Mode</span>
        </label>
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Data</h2>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>All your data is stored locally in your browser.</p>
        <button style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          🗑️ Clear All Data
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>About</h2>
        <p style={{ fontSize: '14px', color: '#666' }}>AI Product Copilot v1.1</p>
        <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
          <a href="https://github.com/shiv12-art/ai-product-copilot" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
            GitHub Repository
          </a>
        </p>
      </div>
    </div>
  )
}
