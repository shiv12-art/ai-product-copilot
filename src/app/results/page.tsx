'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Artifact {
  content: string
  editedAt?: string
}

interface Generation {
  id: string
  problemStatement: string
  category: string
  artifacts: Record<string, Artifact>
  isBookmarked: boolean
}

const artifactTitles: Record<string, { title: string; emoji: string }> = {
  canvas: { title: 'Product Canvas', emoji: '🎨' },
  prd: { title: 'Product Requirements', emoji: '📋' },
  gtm: { title: 'GTM Strategy', emoji: '🎯' },
  features: { title: 'Features', emoji: '⚙️' },
  validation: { title: 'Validation Plan', emoji: '✅' },
  competitive: { title: 'Competitive Analysis', emoji: '🏆' },
  pitch: { title: 'Pitch Deck', emoji: '🚀' },
}

export default function ResultsPage() {
  const router = useRouter()
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [selectedTab, setSelectedTab] = useState<string>('canvas')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('latestGeneration')
    if (data) {
      setGeneration(JSON.parse(data))
    } else {
      router.push('/')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
  }

  if (!generation) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>No artifacts found</div>
  }

  const currentArtifact = generation.artifacts[selectedTab as keyof typeof generation.artifacts]
  const currentTitle = artifactTitles[selectedTab]
  const handleCopy = () => {
    const content = currentArtifact?.content
    if (content) {
      navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Premium Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>🚀 AI Product Copilot</h1>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Generated Artifacts</p>
          </div>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f0f4f8',
              color: '#1e293b',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e7f0'
              e.currentTarget.style.borderColor = '#94a3b8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f4f8'
              e.currentTarget.style.borderColor = '#cbd5e1'
            }}
          >
            + Create New
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Problem Statement Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>💡</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Problem Statement</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#1e293b', lineHeight: '1.6', fontWeight: '500' }}>{generation.problemStatement}</p>
            </div>
          </div>
        </div>

        {/* Artifact Tabs - Enhanced */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>📚 Artifacts</span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>({Object.keys(artifactTitles).length} documents)</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
          }}>
            {Object.entries(artifactTitles).map(([key, { title, emoji }]) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key)}
                style={{
                  padding: '14px 12px',
                  backgroundColor: selectedTab === key ? '#2563eb' : 'white',
                  color: selectedTab === key ? 'white' : '#1e293b',
                  border: selectedTab === key ? '2px solid #2563eb' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: selectedTab === key ? '700' : '600',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  boxShadow: selectedTab === key ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (selectedTab !== key) {
                    e.currentTarget.style.borderColor = '#94a3b8'
                    e.currentTarget.style.backgroundColor = '#f0f4f8'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTab !== key) {
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.backgroundColor = 'white'
                  }
                }}
              >
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{emoji}</div>
                <div style={{ lineHeight: '1.3' }}>{title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Display - Premium */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          marginBottom: '32px',
        }}>
          {/* Content Header */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <span style={{ fontSize: '28px' }}>{currentTitle?.emoji}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{currentTitle?.title}</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>Professional document template</p>
            </div>
          </div>

          {/* Content Body */}
          <div style={{ padding: '32px' }}>
            <div style={{
              whiteSpace: 'pre-wrap',
              lineHeight: '1.7',
              fontFamily: '"Menlo", "Courier New", monospace',
              fontSize: '13px',
              color: '#334155',
              backgroundColor: '#f8fafc',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              overflowX: 'auto',
              maxHeight: '600px',
              overflowY: 'auto',
            }}>
              {currentArtifact?.content}
            </div>
          </div>
        </div>

        {/* Action Buttons - Enhanced */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleCopy}
            style={{
              padding: '12px 28px',
              backgroundColor: copied ? '#10b981' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)'
              }
            }}
          >
            {copied ? '✅ Copied!' : '📋 Copy Artifact'}
          </button>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '12px 28px',
              backgroundColor: 'white',
              color: '#1e293b',
              border: '2px solid #cbd5e1',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700',
              transition: 'all 0.2s ease',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2563eb'
              e.currentTarget.style.color = '#2563eb'
              e.currentTarget.style.backgroundColor = '#dbeafe'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1'
              e.currentTarget.style.color = '#1e293b'
              e.currentTarget.style.backgroundColor = 'white'
            }}
          >
            🔄 New Generation
          </button>
        </div>
      </main>
    </div>
  )
}
