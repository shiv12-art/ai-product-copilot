/**
 * Persona Card Component Demo
 *
 * This page demonstrates the PersonaCard and PersonaCardGrid components
 * with sample personas from the SaaS category.
 *
 * To view: navigate to /demo/personas in your app
 */

'use client'

import React, { useState } from 'react'
import { ProductCategory } from '@/types/generation'
import { getDefaultPersonas } from '@/lib/generation/templates/personas'
import { PersonaSection } from '@/components/Artifacts/PersonaSection'

const DEMO_CATEGORIES: ProductCategory[] = [
  'saas',
  'b2c_app',
  'marketplace',
  'ai_tool',
  'mobile_app',
]

export default function PersonaDemo() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('saas')
  const personas = getDefaultPersonas(selectedCategory)

  const getCategoryLabel = (cat: ProductCategory): string => {
    const labels: Record<ProductCategory, string> = {
      saas: '📊 SaaS',
      b2c_app: '📱 B2C App',
      marketplace: '🛍️ Marketplace',
      hardware: '🔧 Hardware',
      service: '🎯 Service',
      community: '👥 Community',
      ai_tool: '🤖 AI Tool',
      mobile_app: '📲 Mobile App',
      web_app: '🌐 Web App',
      fintech: '💳 FinTech',
      healthcare: '🏥 Healthcare',
      edtech: '🎓 EdTech',
      gaming: '🎮 Gaming',
      social: '💬 Social',
    }
    return labels[cat] || cat
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-800 dark:to-cyan-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">👥 PersonaCard Component Demo</h1>
          <p className="text-blue-100 text-lg">
            Beautiful, scannable persona cards for your product artifacts
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Selector */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Select Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {DEMO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                    selectedCategory === cat
                      ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
                  }
                `}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
              Category
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {getCategoryLabel(selectedCategory)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
              Total Personas
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {personas.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
              Primary Users
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {personas.filter((p) => p.type === 'primary').length}
            </p>
          </div>
        </div>

        {/* Persona Section - Full Component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <PersonaSection
            category={selectedCategory}
            title={`Target Users & Personas - ${getCategoryLabel(selectedCategory)}`}
            description="Click on any persona card to highlight it. Use the filter buttons to view specific user types."
          />
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-gray-100 dark:bg-gray-900 rounded-lg p-6 border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📝 How to Use in Your Artifacts
          </h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// 1. Import the PersonaSection component
import { PersonaSection } from '@/components/Artifacts/PersonaSection'

// 2. Use it in your artifact display
export function ArtifactViewer({ category, generation }) {
  return (
    <div>
      {/* Other artifact content */}

      {/* Replace markdown personas with component */}
      <PersonaSection category={category} />
    </div>
  )
}

// 3. Or use in the PRD generation
export async function generatePRDArtifact(
  problemStatement: string,
  category: ProductCategory
): Promise<string | React.ReactElement> {
  // Return component instead of markdown
  return <PersonaSection category={category} />
}`}
          </pre>
        </div>

        {/* Features List */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ✨ Component Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                🎨 Visual Design
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>✓ Color-coded by user type (primary/secondary/tertiary)</li>
                <li>✓ Dark mode support</li>
                <li>✓ Hover animations</li>
                <li>✓ Responsive grid layout</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-2">
                📊 Data Display
              </h4>
              <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                <li>✓ Name, role, goal statement</li>
                <li>✓ Department & team structure</li>
                <li>✓ Budget authority with reports-to</li>
                <li>✓ Pain points with descriptions</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-200 mb-2">
                🎯 Interactivity
              </h4>
              <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1">
                <li>✓ Filter by persona type</li>
                <li>✓ Click to highlight individual personas</li>
                <li>✓ Summary statistics dashboard</li>
                <li>✓ Key insights callouts</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-2">
                💡 Smart Features
              </h4>
              <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
                <li>✓ Success metrics per persona</li>
                <li>✓ Typical objections section</li>
                <li>✓ Automatic persona type detection</li>
                <li>✓ Actionable insights generation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-blue-500">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Integration Checklist
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4" />
              <span>
                <strong>Component Created:</strong> PersonaCard, PersonaCardGrid, PersonaSection ✓
              </span>
            </li>
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4" />
              <span>
                <strong>Update PRD Generation:</strong> Replace markdown persona section with
                component
              </span>
            </li>
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4" />
              <span>
                <strong>Update Artifact Viewer:</strong> Support rendering React components alongside
                markdown
              </span>
            </li>
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4" />
              <span>
                <strong>Add Export Support:</strong> Include persona cards in PDF exports
              </span>
            </li>
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4" />
              <span>
                <strong>Test All Categories:</strong> Verify with each of 14 product categories
              </span>
            </li>
            <li className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4" />
              <span>
                <strong>Deploy & Monitor:</strong> Track user engagement with new persona display
              </span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>PersonaCard Component Demo • Part of Track 1: UI/UX Enhancements</p>
        </div>
      </footer>
    </div>
  )
}
