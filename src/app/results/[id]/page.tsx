'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Common/Header'
import { Footer } from '@/components/Common/Footer'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { Generation } from '@/types/generation'
import ReactMarkdown from 'react-markdown'

const ARTIFACTS = ['canvas', 'prd', 'gtm', 'features', 'validation', 'competitive', 'metrics'] as const
const ARTIFACT_TITLES: Record<typeof ARTIFACTS[number], string> = {
  canvas: 'Business Canvas',
  prd: 'Product Requirements',
  gtm: 'Go-to-Market',
  features: 'Feature Specification',
  validation: 'Validation Plan',
  competitive: 'Competitive Analysis',
  metrics: 'Success Metrics',
}

export default function ResultDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const page = (params.page as string) || 'canvas'

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{ARTIFACT_TITLES[currentArtifactType]}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Problem: {generation.problemStatement}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Category: {generation.category} | Generated: {new Date(generation.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          {ARTIFACTS.map((artifact) => (
            <button
              key={artifact}
              onClick={() => router.push(`/results/${id}/${artifact}`)}
              className={`px-4 py-2 rounded transition-colors ${
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
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditContent(currentContent)
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none"
              placeholder="Edit content here..."
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{currentContent}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => {
              const currentIndex = ARTIFACTS.indexOf(currentArtifactType)
              if (currentIndex > 0) {
                router.push(`/results/${id}/${ARTIFACTS[currentIndex - 1]}`)
              }
            }}
            disabled={ARTIFACTS.indexOf(currentArtifactType) === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => router.push('/history')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to History
          </button>
          <button
            onClick={() => {
              const currentIndex = ARTIFACTS.indexOf(currentArtifactType)
              if (currentIndex < ARTIFACTS.length - 1) {
                router.push(`/results/${id}/${ARTIFACTS[currentIndex + 1]}`)
              }
            }}
            disabled={ARTIFACTS.indexOf(currentArtifactType) === ARTIFACTS.length - 1}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
