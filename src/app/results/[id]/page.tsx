'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { Generation } from '@/types/generation'
import { ArtifactTabs } from '@/components/Artifacts/ArtifactTabs'
import { LoadingAnimation } from '@/components/Common/LoadingAnimation'
import { Button } from '@/components/Common/Button'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'

interface ResultsPageProps {
  params: {
    id: string
  }
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const router = useRouter()
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getGeneration, setCurrentGeneration } = useGenerationStore()

  useEffect(() => {
    const gen = getGeneration(params.id)
    if (gen) {
      setGeneration(gen)
      setCurrentGeneration(gen)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [params.id, getGeneration, setCurrentGeneration])

  if (isLoading) {
    return <LoadingAnimation message="Loading your artifacts..." />
  }

  if (!generation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Generation Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The artifacts you're looking for don't exist or have been deleted.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-3 text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Back
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Product Artifacts
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Generated from: <span className="font-medium">{generation.category.replace('_', ' ').toUpperCase()}</span>
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              <Plus size={16} />
              New Plan
            </Link>
          </div>

          {/* Problem Statement */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Problem Statement</p>
            <p className="text-gray-900 dark:text-gray-100">{generation.problemStatement}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ArtifactTabs generation={generation} />
      </div>
    </main>
  )
}
