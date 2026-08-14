'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { runDiscoveryAnalysis, createGeneration, generateId } from '@/lib/discovery/engine'
import { ProductCategory } from '@/lib/types/discovery'

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'saas', label: 'SaaS' },
  { value: 'mobile_app', label: 'Mobile App' },
  { value: 'web_app', label: 'Web App' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'b2c_app', label: 'B2C App' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'ai_tool', label: 'AI Tool' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'social_network', label: 'Social Network' },
  { value: 'service_marketplace', label: 'Service Marketplace' },
  { value: 'community', label: 'Community' },
]

export default function Home() {
  const router = useRouter()
  const [problemStatement, setProblemStatement] = useState('')
  const [category, setCategory] = useState<ProductCategory>('saas')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!problemStatement.trim()) {
      setError('Please enter a problem statement')
      return
    }

    if (problemStatement.length < 20) {
      setError('Problem statement must be at least 20 characters')
      return
    }

    if (problemStatement.length > 500) {
      setError('Problem statement must be under 500 characters')
      return
    }

    setError('')
    setLoading(true)

    try {
      const discovery = await runDiscoveryAnalysis(problemStatement, category)
      const generation = createGeneration(problemStatement, category, discovery)

      // Store in localStorage
      const stored = localStorage.getItem('discoveries') || '[]'
      const discoveries = JSON.parse(stored)
      discoveries.unshift(generation)
      localStorage.setItem('discoveries', JSON.stringify(discoveries.slice(0, 20)))

      // Redirect to results
      router.push(`/discovery/${generation.id}`)
    } catch (err) {
      setError('Failed to run analysis. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-500 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            Product Discovery Intelligence Engine
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Analyze your product idea before building. Get structured insights, opportunity scoring,
            dynamic personas, assumption mapping, and executive decisions.
          </p>
          <div className="flex items-center gap-4 text-sm opacity-80">
            <span>8 Analysis Sections</span>
            <span>•</span>
            <span>Instant Results</span>
            <span>•</span>
            <span>Validation Roadmap</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Analyze Your Product Idea</h2>

          {/* Input Form */}
          <div className="space-y-6">
            {/* Problem Statement */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Problem Statement <span className="text-red-500">*</span>
              </label>
              <textarea
                value={problemStatement}
                onChange={(e) => {
                  setProblemStatement(e.target.value)
                  setError('')
                }}
                placeholder="Describe the problem your product would solve. Be specific about who has the problem and what pain it causes."
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-500">
                  {problemStatement.length} / 500 characters
                </span>
                {problemStatement.length >= 20 && problemStatement.length <= 500 && (
                  <span className="text-xs text-green-600">✓ Good length</span>
                )}
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Product Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed py-3 font-semibold text-lg"
            >
              {loading ? 'Analyzing...' : 'Analyze & Generate Discovery Report'}
            </button>
          </div>
        </div>

        {/* 8 Analysis Sections Preview */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-8">What You'll Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h4 className="font-semibold mb-2">Structured Insights</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Target users, pain points, desired outcomes, current alternatives
              </p>
            </div>

            <div className="card">
              <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
              <h4 className="font-semibold mb-2">Opportunity Assessment</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Market potential, pain severity, feasibility, monetization (1-10 score)
              </p>
            </div>

            <div className="card">
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <h4 className="font-semibold mb-2">Dynamic Personas</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Goals, pain points, buying triggers extracted from your problem statement
              </p>
            </div>

            <div className="card">
              <div className="text-2xl font-bold text-blue-600 mb-2">4</div>
              <h4 className="font-semibold mb-2">Assumptions</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                User, product, market, and revenue assumptions with validation methods
              </p>
            </div>

            <div className="card">
              <div className="text-2xl font-bold text-blue-600 mb-2">5</div>
              <h4 className="font-semibold mb-2">Hypotheses</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Testable hypotheses with key assumptions to validate
              </p>
            </div>

            <div className="card">
              <div className="text-2xl font-bold text-blue-600 mb-2">6</div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                MVP scope, first features, and biggest risks to mitigate
              </p>
            </div>

            <div className="card">
              <div className="text-2xl font-bold text-blue-600 mb-2">7</div>
              <h4 className="font-semibold mb-2">Market Analysis</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                TAM, SAM, SOM sizing and competitive landscape analysis
              </p>
            </div>

            <div className="card">
              <div className="text-2xl font-bold text-blue-600 mb-2">8</div>
              <h4 className="font-semibold mb-2">Executive Decision</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Opportunity score, confidence %, Go/No-Go with top reasons and actions
              </p>
            </div>
          </div>
        </div>

        {/* Sample Problems */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold mb-3">Try these examples:</h4>
          <div className="space-y-2 text-sm">
            <p>
              💡 <span className="font-medium">AI Tool:</span> "Developers waste 30-40% of their time on boilerplate code. We want an AI that understands their codebase context and generates relevant code snippets in their IDE."
            </p>
            <p>
              💡 <span className="font-medium">SaaS:</span> "Teams use 5+ communication tools (Slack, Teams, Discord, Email, SMS). They lose context constantly switching between platforms."
            </p>
            <p>
              💡 <span className="font-medium">Marketplace:</span> "Fitness enthusiasts can't find qualified trainers in their city. Trainers struggle to get consistent clients."
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
