'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  'SaaS',
  'B2C App',
  'Marketplace',
  'Hardware',
  'Service',
  'Community',
  'AI Tool'
]

const EXAMPLES = [
  { title: 'Async Communication', text: 'Build a tool to help remote teams manage asynchronous communication without Slack overload.' },
  { title: 'Habit Tracker', text: 'A habit-tracking app that makes building streaks fun and rewarding with gamification.' },
  { title: 'Storage Marketplace', text: 'Create an Airbnb-style marketplace for storing seasonal items in unused basements and garages.' }
]

export function InputForm() {
  const [problem, setProblem] = useState('')
  const [category, setCategory] = useState('')
  const router = useRouter()

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!category) {
      alert('Please select a category')
      return
    }
    // Store data and redirect to results
    router.push('/results')
  }

  const handleExample = (text: string) => {
    setProblem(text)
    setCategory('saas')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label htmlFor="problem" className="block text-sm font-semibold mb-2">
            Your Product Idea or Problem Statement
          </label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="e.g., Build a tool to help remote teams manage asynchronous communication..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            minLength={20}
            maxLength={2000}
          />
          <p className="text-xs text-gray-500 mt-1">{problem.length}/2000 characters</p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold mb-2">
            Product Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat.toLowerCase().replace(' ', '-')}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!problem.trim() || !category}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ✨ Generate Artifacts
        </button>
      </form>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <p className="text-sm font-semibold mb-3">📚 Try an example:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {EXAMPLES.map(ex => (
            <button
              key={ex.title}
              onClick={() => handleExample(ex.text)}
              className="p-3 text-left text-sm bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
            >
              <p className="font-semibold text-blue-900 dark:text-blue-100">{ex.title}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{ex.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
