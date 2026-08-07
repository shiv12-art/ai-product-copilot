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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Header */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'rgba(255,255,255,0.95)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>🚀 AI Product Copilot</h1>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ← New Generation
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Problem Statement */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '30px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0',
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Problem Statement</p>
          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b', lineHeight: '1.6' }}>{generation.problemStatement}</p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginBottom: '30px',
        }}>
          {Object.entries(artifactTitles).map(([key, { title, emoji }]) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key)}
              style={{
                padding: '16px',
                backgroundColor: selectedTab === key ? '#2563eb' : 'white',
                color: selectedTab === key ? 'white' : '#475569',
                border: selectedTab === key ? '2px solid #2563eb' : '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== key) {
                  e.currentTarget.style.borderColor = '#94a3b8'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== key) {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                }
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>{emoji}</div>
              <div>{title}</div>
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          marginBottom: '30px',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{currentTitle?.emoji}</span>
            {currentTitle?.title}
          </h2>
          <div style={{
            whiteSpace: 'pre-wrap',
            lineHeight: '1.8',
            fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
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

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleCopy}
            style={{
              padding: '12px 24px',
              backgroundColor: copied ? '#16a34a' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background-color 0.2s',
            }}
          >
            {copied ? '✅ Copied to Clipboard!' : '📋 Copy This Artifact'}
          </button>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f3f4f6',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            🔄 Create New
          </button>
        </div>
      </div>
    </div>
  )
}
