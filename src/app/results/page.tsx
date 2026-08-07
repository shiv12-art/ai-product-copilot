'use client'

import { Header } from '@/components/Common/Header'
import { Footer } from '@/components/Common/Footer'
import { useState } from 'react'

const ARTIFACTS = [
  { id: 'canvas', label: 'Canvas', content: 'Product Canvas - One-page overview' },
  { id: 'prd', label: 'PRD', content: 'Product Requirements Document' },
  { id: 'gtm', label: 'GTM', content: 'Go-to-Market Strategy' },
  { id: 'features', label: 'Features', content: 'Feature Specification' },
  { id: 'validation', label: 'Validation', content: 'Validation Plan' },
  { id: 'competitors', label: 'Competitors', content: 'Competitive Analysis' },
  { id: 'pitch', label: 'Pitch Deck', content: 'Pitch Deck Outline' }
]

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState('canvas')

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Generated Artifacts</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {ARTIFACTS.map(artifact => (
            <button
              key={artifact.id}
              onClick={() => setActiveTab(artifact.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === artifact.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {artifact.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <div className="prose dark:prose-invert max-w-none">
            <h2>{ARTIFACTS.find(a => a.id === activeTab)?.label}</h2>
            <p>{ARTIFACTS.find(a => a.id === activeTab)?.content}</p>
          </div>
        </div>

        {/* Export */}
        <div className="mt-6">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
            📥 Export
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
