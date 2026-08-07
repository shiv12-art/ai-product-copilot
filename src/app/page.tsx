'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/Common/Header'
import { Footer } from '@/components/Common/Footer'
import { InputForm } from '@/components/Input/InputForm'

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Product Copilot
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Transform your product idea into a complete development plan in minutes
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              No sign-ups. No APIs. Works entirely in your browser.
            </p>
          </div>

          {/* Input Form */}
          <InputForm />

          {/* Features Overview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-semibold mb-2">7 Artifacts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Canvas, PRD, GTM, Features, Validation, Competitors, Pitch
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Instant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate all artifacts in under 2 seconds
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-2xl mb-2">🛟</div>
              <h3 className="font-semibold mb-2">Professional</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Export as PDF or Markdown for stakeholder reviews
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 space-y-4">
            <h2 className="text-2xl font-bold mb-6">Common Questions</h2>

            <details className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer">
              <summary className="font-semibold hover:text-blue-600 dark:hover:text-blue-400">
                How does AI Product Copilot work?
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                It uses intelligent rule-based generation to analyze your problem statement and create artifacts based on proven product management frameworks. No external APIs or AI services—everything runs in your browser.
              </p>
            </details>

            <details className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer">
              <summary className="font-semibold hover:text-blue-600 dark:hover:text-blue-400">
                Can I edit the generated artifacts?
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Yes! You can edit any section directly in the app, and your changes are automatically saved. You can also export multiple versions and compare them.
              </p>
            </details>

            <details className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer">
              <summary className="font-semibold hover:text-blue-600 dark:hover:text-blue-400">
                Is my data secure?
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Completely. All data stays in your browser using localStorage. Nothing is sent to external servers. You can clear your data anytime from settings.
              </p>
            </details>

            <details className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer">
              <summary className="font-semibold hover:text-blue-600 dark:hover:text-blue-400">
                How many generations can I store?
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                You can store up to 10 generations in your browser. Older ones are automatically archived when you exceed the limit.
              </p>
            </details>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
