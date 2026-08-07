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

const artifactTitles: Record<string, string> = {
  canvas: 'Product Canvas',
  prd: 'Product Requirements Document',
  gtm: 'Go-to-Market Strategy',
  features: 'Feature Specification',
  validation: 'Validation Plan',
  competitive: 'Competitive Analysis',
  pitch: 'Pitch Deck Outline',
}

export default function ResultsPage() {
  const router = useRouter()
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [selectedTab, setSelectedTab] = useState<string>('canvas')
  const [loading, setLoading] = useState(true)

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

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Generated Artifacts</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Problem: {generation.problemStatement}</p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
        {Object.entries(artifactTitles).map(([key, title]) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key)}
            style={{
              padding: '10px 16px',
              backgroundColor: selectedTab === key ? '#2563eb' : '#f3f4f6',
              color: selectedTab === key ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '14px',
            }}
          >
            {title}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', minHeight: '400px' }}>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontFamily: 'monospace', fontSize: '14px', color: '#333' }}>
          {currentArtifact?.content}
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '10px 16px',
            backgroundColor: '#f3f4f6',
            color: '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ← Back to Home
        </button>
        <button
          onClick={() => {
            const content = currentArtifact?.content
            if (content) {
              navigator.clipboard.writeText(content)
              alert('Copied to clipboard!')
            }
          }}
          style={{
            padding: '10px 16px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          📋 Copy to Clipboard
        </button>
      </div>
    </div>
  )
}
