'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = [
  { label: 'SaaS', value: 'saas', emoji: '☁️' },
  { label: 'Mobile App', value: 'mobile_app', emoji: '📱' },
  { label: 'Web App', value: 'web_app', emoji: '🌐' },
  { label: 'Marketplace', value: 'marketplace', emoji: '🛒' },
  { label: 'B2C App', value: 'b2c_app', emoji: '👥' },
  { label: 'Hardware', value: 'hardware', emoji: '⚙️' },
  { label: 'AI Tool', value: 'ai_tool', emoji: '🤖' },
  { label: 'Fintech', value: 'fintech', emoji: '💰' },
  { label: 'Healthcare', value: 'healthcare', emoji: '🏥' },
  { label: 'EdTech', value: 'edtech', emoji: '📚' },
  { label: 'Gaming', value: 'gaming', emoji: '🎮' },
  { label: 'Social Network', value: 'social', emoji: '💬' },
  { label: 'Service', value: 'service', emoji: '🔧' },
  { label: 'Community', value: 'community', emoji: '🤝' },
]

const categoryMap: Record<string, string> = Object.fromEntries(
  categories.map(c => [c.label, c.value])
)

const sampleProblems = [
  {
    title: 'Remote Team Collaboration',
    description: 'Teams struggle with asynchronous collaboration, scattered communication, and lack of context when working across time zones.',
    category: 'SaaS',
  },
  {
    title: 'AI Code Assistant',
    description: 'Developers spend too much time on boilerplate code and repetitive tasks. They need an AI tool that understands their codebase context.',
    category: 'AI Tool',
  },
  {
    title: 'Fitness Marketplace',
    description: 'Fitness professionals are underutilized. We want to create a marketplace connecting certified trainers with people seeking personalized fitness guidance.',
    category: 'Marketplace',
  },
  {
    title: 'Mental Health Mobile App',
    description: 'Young adults struggle with anxiety and depression but avoid seeking help. A mobile app offering accessible mental health support could help.',
    category: 'Mobile App',
  },
  {
    title: 'Fintech Investment Platform',
    description: 'Millennial investors want to invest fractional shares in diversified portfolios with low fees and social trading features.',
    category: 'Fintech',
  },
]

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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Header */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>🚀 AI Product Copilot</h1>
      </div>

      {/* Main Content */}
      <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '700', color: '#0f172a', marginBottom: '16px', lineHeight: '1.2' }}>
            Transform Your Product Idea Into Reality
          </h2>
          <p style={{ fontSize: '18px', color: '#475569', marginBottom: '8px', lineHeight: '1.6' }}>
            Generate comprehensive product artifacts in seconds. No sign-ups, no APIs, completely offline.
          </p>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '0' }}>
            Canvas • PRD • GTM Strategy • Features • Validation • Competitive Analysis • Pitch Deck
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          marginBottom: '60px',
        }}>
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Problem Statement Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                📝 Describe Your Product Idea
              </label>
              <textarea
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder="e.g., I want to build a productivity tool that helps remote teams collaborate better..."
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0',
                  minHeight: '120px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: '#334155',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Category Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                🎯 Product Category
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '10px',
              }}>
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.label)}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: category === cat.label ? '2px solid #2563eb' : '2px solid #e2e8f0',
                      backgroundColor: category === cat.label ? '#dbeafe' : '#f8fafc',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: category === cat.label ? '#1e40af' : '#475569',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{cat.emoji}</div>
                    <div>{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !problemStatement.trim() || !category}
              style={{
                padding: '16px',
                backgroundColor: loading || !problemStatement.trim() || !category ? '#cbd5e1' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading || !problemStatement.trim() || !category ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'background-color 0.2s',
                marginTop: '8px',
              }}
              onMouseEnter={(e) => {
                if (!loading && problemStatement.trim() && category) {
                  e.currentTarget.style.backgroundColor = '#1d4ed8'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && problemStatement.trim() && category) {
                  e.currentTarget.style.backgroundColor = '#2563eb'
                }
              }}
            >
              {loading ? '⏳ Generating Artifacts...' : '✨ Generate All 7 Artifacts'}
            </button>
          </form>

          {/* Sample Problems */}
          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '2px solid #e2e8f0' }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
              ✨ Try Sample Problems
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {sampleProblems.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setProblemStatement(sample.description)
                    setCategory(sample.category)
                  }}
                  style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb'
                    e.currentTarget.style.backgroundColor = '#dbeafe'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1'
                    e.currentTarget.style.backgroundColor = '#f8fafc'
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{sample.title}</div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>{sample.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div style={{
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>📋</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>7 Complete Artifacts</h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
              Product Canvas, PRD, GTM Strategy, Feature Spec, Validation Plan, Competitive Analysis & Pitch Deck
            </p>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚡</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>Instant Generation</h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
              All artifacts generated in under 2 seconds. No waiting, no delays, pure speed.
            </p>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔒</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>100% Private</h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
              Works completely offline in your browser. Your data never leaves your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
