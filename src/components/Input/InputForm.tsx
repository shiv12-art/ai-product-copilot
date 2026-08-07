'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['SaaS', 'B2C App', 'Marketplace', 'Hardware', 'Service', 'Community', 'AI Tool']

const EXAMPLES = [
  { title: 'Async Communication', text: 'Build a tool to help remote teams manage asynchronous communication without Slack overload.' },
  { title: 'Habit Tracker', text: 'A habit-tracking app that makes building streaks fun and rewarding with gamification.' },
  { title: 'Storage Marketplace', text: 'Create an Airbnb-style marketplace for storing seasonal items in unused basements and garages.' }
]

export function InputForm() {
  const [problem, setProblem] = useState('')
  const [category, setCategory] = useState('')
  const router = useRouter()

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (category) router.push('/results')
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="problem" className="block text-sm font-semibold mb-2">
            Your Product Idea
          </label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="e.g., Build a tool to help remote teams..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            rows={5}
            maxLength={2000}
          />
          <p className="text-xs text-gray-500 mt-1">{problem.length}/2000</p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg"
          >
            <option value="">Select...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg">
          ✨ Generate
        </button>
      </form>

      <div className="border-t pt-6">
        <p className="text-sm font-semibold mb-3">Examples:</p>
        <div className="grid gap-3">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.title}
              onClick={() => setProblem(ex.text)}
              className="p-3 text-left text-sm bg-blue-50 dark:bg-blue-900/20 rounded"
            >
              <p className="font-semibold">{ex.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
