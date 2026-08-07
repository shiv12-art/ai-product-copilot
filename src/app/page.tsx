'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categoryMap: Record<string, string> = {
  'SaaS': 'saas',
  'B2C App': 'b2c_app',
  'Marketplace': 'marketplace',
  'Hardware': 'hardware',
  'Service': 'service',
  'Community': 'community',
  'AI Tool': 'ai_tool',
}

export default function Home() {
  const router = useRouter()
  const [problemStatement, setProblemStatement] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!problemStatement.trim() || !category) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const categoryKey = categoryMap[category]

      const artifacts = {
        canvas: { content: `# Product Canvas\n\n## Problem\n${problemStatement}\n\n## Solution\nA comprehensive solution for the identified problem.\n\n## Target Market\n${category} companies seeking innovation.\n\n## Key Features\n- Feature 1\n- Feature 2\n- Feature 3`, editedAt: new Date().toISOString() },
        prd: { content: `# Product Requirements Document\n\n## Overview\n${problemStatement}\n\n## Requirements\n1. Requirement 1\n2. Requirement 2\n3. Requirement 3\n\n## Success Criteria\n- Metric 1\n- Metric 2\n- Metric 3`, editedAt: new Date().toISOString() },
        gtm: { content: `# Go-to-Market Strategy\n\n## Strategy for ${category}\n\n### Target Audience\nIdentified target market for ${category}\n\n### Launch Plan\n1. Phase 1: Beta\n2. Phase 2: Launch\n3. Phase 3: Scale\n\n### Success Metrics\n- User acquisition\n- Retention rate\n- Revenue growth`, editedAt: new Date().toISOString() },
        features: { content: `# Feature Specification\n\n## Core Features\n\n### Feature 1\nDescription and requirements\n\n### Feature 2\nDescription and requirements\n\n### Feature 3\nDescription and requirements\n\n## Technical Stack\n- Frontend\n- Backend\n- Database`, editedAt: new Date().toISOString() },
        validation: { content: `# Validation Plan\n\n## Key Assumptions\n1. Customers have the problem\n2. Solution addresses problem\n3. Customers willing to pay\n\n## Validation Experiments\n- Customer interviews\n- Landing page tests\n- MVP testing\n\n## Success Criteria\n- 80%+ problem validation\n- 70%+ solution fit\n- 50%+ willing to pay`, editedAt: new Date().toISOString() },
        competitive: { content: `# Competitive Analysis\n\n## Market Overview\nAnalysis of ${category} market\n\n## Key Competitors\n1. Competitor A\n2. Competitor B\n3. Competitor C\n\n## Competitive Advantage\n- Unique value proposition\n- Technology differentiation\n- Customer experience`, editedAt: new Date().toISOString() },
        pitch: { content: `# Pitch Deck Outline\n\n## 1. Problem\n${problemStatement}\n\n## 2. Solution\nHow we solve the problem\n\n## 3. Market\nMarket size and opportunity\n\n## 4. Business Model\nHow we make money\n\n## 5. Team\nWho we are\n\n## 6. Financials\nProjections and funding needs`, editedAt: new Date().toISOString() },
      }

      const generation = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        problemStatement,
        category: categoryKey,
        artifacts,
        isBookmarked: false,
      }

      localStorage.setItem('latestGeneration', JSON.stringify(generation))
      router.push('/results')
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Failed to generate artifacts')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚀 AI Product Copilot</h1>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>Generate professional product artifacts in seconds</p>
      <p style={{ fontSize: '14px', color: '#666' }}>No sign-ups. No APIs. Works in your browser.</p>

      <div style={{ marginTop: '40px', maxWidth: '600px', margin: '40px auto' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Your Product Idea</label>
            <textarea
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Describe your product..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '120px', fontFamily: 'inherit' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
            >
              <option value="">Select a category...</option>
              <option>SaaS</option>
              <option>B2C App</option>
              <option>Marketplace</option>
              <option>Hardware</option>
              <option>Service</option>
              <option>Community</option>
              <option>AI Tool</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px',
              backgroundColor: loading ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {loading ? '⏳ Generating...' : '✨ Generate Artifacts'}
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
