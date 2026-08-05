'use client'

import { useEffect, useState } from 'react'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { Generation } from '@/types/generation'
import Link from 'next/link'
import { Trash2, Star, ArrowRight } from 'lucide-react'

export default function HistoryPage() {
  const [mounted, setMounted] = useState(false)
  const { generations, deleteGeneration, toggleBookmark } = useGenerationStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const sortedGenerations = [...generations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const bookmarked = sortedGenerations.filter((g) => g.isBookmarked)
  const recent = sortedGenerations.filter((g) => !g.isBookmarked)

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Generation History
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage your saved product plans and artifacts
        </p>

        {generations.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No generations yet. Create your first product plan!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Create Plan <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Bookmarked */}
            {bookmarked.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star size={24} className="text-yellow-500" />
                  Bookmarked
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarked.map((gen) => (
                    <GenerationCard
                      key={gen.id}
                      generation={gen}
                      onDelete={deleteGeneration}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Recent */}
            {recent.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Recent ({recent.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recent.map((gen) => (
                    <GenerationCard
                      key={gen.id}
                      generation={gen}
                      onDelete={deleteGeneration}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

interface GenerationCardProps {
  generation: Generation
  onDelete: (id: string) => void
  onToggleBookmark: (id: string) => void
}

function GenerationCard({ generation, onDelete, onToggleBookmark }: GenerationCardProps) {
  const date = new Date(generation.createdAt)
  const formattedDate = date.toLocaleDateString()
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const problemPreview = generation.problemStatement.slice(0, 100)
  const hasMore = generation.problemStatement.length > 100

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <Link
          href={`/results/${generation.id}`}
          className="flex-1"
        >
          <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            {generation.category.replace('_', ' ').toUpperCase()}
          </div>
        </Link>
        <button
          onClick={() => onToggleBookmark(generation.id)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          title={generation.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          <Star
            size={20}
            className={
              generation.isBookmarked
                ? 'fill-yellow-500 text-yellow-500'
                : 'text-gray-400'
            }
          />
        </button>
      </div>

      <Link href={`/results/${generation.id}`}>
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 hover:text-gray-900 dark:hover:text-white">
          {problemPreview}
          {hasMore && '...'}
        </p>
      </Link>

      <div className="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-500">
        <span>
          {formattedDate} at {formattedTime}
        </span>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/results/${generation.id}`}
          className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 rounded text-sm font-medium transition-colors text-center"
        >
          View
        </Link>
        <button
          onClick={() => onDelete(generation.id)}
          className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 rounded text-sm font-medium transition-colors flex items-center justify-center"
          title="Delete this generation"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
