'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { generateArtifacts } from '@/lib/generation/generator'
import { ProductCategory } from '@/types/generation'
import { PRODUCT_CATEGORIES, MIN_PROBLEM_LENGTH, MAX_PROBLEM_LENGTH } from '@/lib/utils/constants'

export function InputForm() {
  const router = useRouter()
  const [problemStatement, setProblemStatement] = useState('')
  const [category, setCategory] = useState<ProductCategory>('saas')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { addGeneration } = useGenerationStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!problemStatement.trim()) {
      setError('Please enter a problem statement')
      return
    }

    if (problemStatement.length < MIN_PROBLEM_LENGTH) {
      setError(`Problem statement must be at least ${MIN_PROBLEM_LENGTH} characters`)
      return
    }

    if (problemStatement.length > MAX_PROBLEM_LENGTH) {
      setError(`Problem statement must not exceed ${MAX_PROBLEM_LENGTH} characters`)
      return
    }

    setIsLoading(true)

    try {
      const generation = await generateArtifacts(problemStatement, category)
      addGeneration(generation)
      router.push(`/results/${generation.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate artifacts')
    } finally {
      setIsLoading(false)
    }
  }

  const charCount = problemStatement.length

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Select */}
      <div>
        <label htmlFor="category" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Product Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ProductCategory)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Problem Statement */}
      <div>
        <label htmlFor="problem" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Problem Statement / Product Idea
        </label>
        <textarea
          id="problem"
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          placeholder="Describe your product idea or the problem you're solving..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={6}
        />
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {charCount} / {MAX_PROBLEM_LENGTH} characters
          </span>
          {charCount < MIN_PROBLEM_LENGTH && (
            <span className="text-red-500">
              Minimum {MIN_PROBLEM_LENGTH} characters required
            </span>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || charCount < MIN_PROBLEM_LENGTH}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all hover:shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </span>
        ) : (
          'Generate Artifacts'
        )}
      </button>

      {/* Example Ideas */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Example ideas:</p>
        <div className="space-y-2">
          {[
            'A tool to help remote teams manage asynchronous communication without Slack overload',
            'Habit-tracking app with gamified rewards and social challenges',
            'Marketplace to rent unused storage space (basement, garage) to homeowners',
          ].map((example, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setProblemStatement(example)}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}
