'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Common/Header'
import { Footer } from '@/components/Common/Footer'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { Generation } from '@/types/generation'
import ReactMarkdown from 'react-markdown'

const ARTIFACTS = ['canvas', 'prd', 'gtm', 'features', 'validation', 'competitive', 'pitch'] as const
const ARTIFACT_TITLES: Record<typeof ARTIFACTS[number], string> = {
  canvas: 'Business Canvas',
  prd: 'Product Requirements',
  gtm: 'Go-to-Market',
  features: 'Feature Specification',
  validation: 'Validation Plan',
  competitive: 'Competitive Analysis',
  pitch: 'Pitch Deck',
}

export default function ArtifactPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const page = params.page as string

  const [generation, setGeneration] = useState<Generation | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')

  const { generations, updateArtifact } = useGenerationStore()

  useEffect(() => {
    const gen = generations.find((g) => g.id === id)
    if (gen) {
      setGeneration(gen)
      const artifactType = page as keyof typeof gen.artifacts
      setEditContent(gen.artifacts[artifactType]?.content || '')
    }
    setLoading(false)
  }, [id, page, generations])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!generation) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <p className="text-red-600 dark:text-red-400">Artifact not found</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Home
          </button>
        </main>
        <Footer />
      </div>
    )
  }

  const currentArtifactType = page as keyof typeof generation.artifacts
  const currentContent = generation.artifacts[currentArtifactType]?.content || ''

  const handleSave = () => {
    updateArtifact(id, currentArtifactType, editContent)
    setIsEditing(false)
  }

  const currentIndex = ARTIFACTS.indexOf(page as any)
  const hasNext = currentIndex < ARTIFACTS.length - 1
  const hasPrev = currentIndex > 0

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{ARTIFACT_TITLES[page as keyof typeof ARTIFACT_TITLES]}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Problem: {generation.problemStatement}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Category: {generation.category} | Generated: {new Date(generation.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Page Indicator */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-1">
            {ARTIFACTS.map((artifact, idx) => (
              <div
                key={artifact}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  page === artifact
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentIndex + 1} of {ARTIFACTS.length}
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4 overflow-x-auto">
          {ARTIFACTS.map((artifact) => (
            <button
              key={artifact}
              onClick={() => router.push(`/results/${id}/${artifact}`)}
              className={`px-4 py-2 rounded whitespace-nowrap transition-colors ${
                page === artifact
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {ARTIFACT_TITLES[artifact]}
            </button>
          ))}
        </div>

        {/* Edit Mode Toggle */}
        <div className="flex justify-end gap-3 mb-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              ✏️ Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                ✓ Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditContent(currentContent)
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ✕ Cancel
              </button>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8 min-h-96">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none"
              placeholder="Edit content here..."
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-100">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-2 ml-4" {...props} />,
                  table: ({ node, ...props }) => <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mb-3" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-gray-300 dark:border-gray-700 p-2" {...props} />,
                  th: ({ node, ...props }) => <th className="border border-gray-300 dark:border-gray-700 p-2 bg-gray-100 dark:bg-gray-800" {...props} />,
                }}
              >
                {currentContent}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between mt-8 gap-4">
          <button
            onClick={() => {
              if (hasPrev) {
                router.push(`/results/${id}/${ARTIFACTS[currentIndex - 1]}`)
              }
            }}
            disabled={!hasPrev}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            ← Previous Page
          </button>
          <button
            onClick={() => router.push('/history')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
          >
            📚 Back to History
          </button>
          <button
            onClick={() => {
              if (hasNext) {
                router.push(`/results/${id}/${ARTIFACTS[currentIndex + 1]}`)
              }
            }}
            disabled={!hasNext}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next Page →
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
