'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { Generation } from '@/types/generation'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/UI/Card'
import { Badge } from '@/components/UI/Badge'
import { Empty } from '@/components/UI/Empty'

const ARTIFACT_CONFIG: Record<string, { title: string; emoji: string }> = {
  canvas: { title: 'Product Canvas', emoji: '📋' },
  prd: { title: 'PRD', emoji: '📄' },
  gtm: { title: 'GTM Strategy', emoji: '🎯' },
  features: { title: 'Features', emoji: '⭐' },
  validation: { title: 'Validation', emoji: '✅' },
  competitive: { title: 'Competitors', emoji: '🏆' },
  metrics: { title: 'Metrics', emoji: '📊' },
}

const CATEGORY_LABELS: Record<string, string> = {
  saas: 'SaaS',
  mobile_app: 'Mobile App',
  web_app: 'Web App',
  marketplace: 'Marketplace',
  b2c_app: 'B2C App',
  hardware: 'Hardware',
  ai_tool: 'AI Tool',
  fintech: 'Fintech',
  healthcare: 'Healthcare',
  edtech: 'EdTech',
  gaming: 'Gaming',
  social: 'Social Network',
  service: 'Service',
  community: 'Community',
}

export default function SharePage() {
  const params = useParams()
  const router = useRouter()
  const { getGenerationByToken, incrementViewCount } = useGenerationStore()

  const [generation, setGeneration] = useState<Generation | null>(null)
  const [selectedTab, setSelectedTab] = useState<string>('canvas')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const token = params.token as string

  useEffect(() => {
    if (token) {
      const gen = getGenerationByToken(token)
      if (gen) {
        setGeneration(gen)
        incrementViewCount(gen.id)
      }
    }
    setLoading(false)
  }, [token, getGenerationByToken, incrementViewCount])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading shared artifacts...</p>
        </div>
      </div>
    )
  }

  if (!generation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4">
        <Empty
          title="Shared Artifact Not Found"
          description="This shared link may have expired or is no longer available."
          action={{
            label: 'Create Your Own Strategy',
            onClick: () => router.push('/'),
          }}
        />
      </div>
    )
  }

  const currentArtifact = generation.artifacts[selectedTab as keyof typeof generation.artifacts]
  const artifactConfig = ARTIFACT_CONFIG[selectedTab]

  const handleCopy = () => {
    if (currentArtifact?.content) {
      navigator.clipboard.writeText(currentArtifact.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareOnSocial = (platform: string) => {
    const url = window.location.href
    const text = `Check out this ${CATEGORY_LABELS[generation.category as keyof typeof CATEGORY_LABELS]} strategy generated with AI Product Copilot!`

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Shared Product Strategy
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Generated with AI Product Copilot
            </p>
          </div>
          <Button variant="primary" onClick={() => router.push('/')}>
            Create Your Own
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Project Info */}
        <Card variant="elevated" className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                Problem Statement
              </p>
              <p className="text-gray-900 dark:text-white leading-relaxed">
                {generation.problemStatement}
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                Category
              </p>
              <Badge variant="primary" size="md">
                {CATEGORY_LABELS[generation.category as keyof typeof CATEGORY_LABELS]}
              </Badge>
              {generation.viewCount && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  👁️ Viewed {generation.viewCount} times
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Share Buttons */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Share link copied to clipboard!')
            }}
          >
            🔗 Copy Link
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => shareOnSocial('twitter')}
          >
            𝕏 Share on Twitter
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => shareOnSocial('linkedin')}
          >
            💼 Share on LinkedIn
          </Button>
        </div>

        {/* Artifact Tabs */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
            Artifacts (7 Documents)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.entries(ARTIFACT_CONFIG).map(([key, { title, emoji }]) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedTab === key
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Artifact Content */}
        {artifactConfig && currentArtifact && (
          <Card variant="elevated">
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {artifactConfig.emoji} {artifactConfig.title}
                </h3>
              </div>
              <Button
                size="sm"
                variant={copied ? 'primary' : 'secondary'}
                onClick={handleCopy}
              >
                {copied ? '✓ Copied' : '📋 Copy'}
              </Button>
            </div>

            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-auto max-h-96 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-950">
              {currentArtifact.content}
            </div>
          </Card>
        )}

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Card variant="outlined" className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Love this strategy?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Create your own professional product artifacts in seconds with AI Product Copilot.
            </p>
            <Button variant="primary" size="lg" onClick={() => router.push('/')}>
              Generate Your Strategy Now
            </Button>
          </Card>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <div>
            <div className="text-2xl mb-2">✨</div>
            <p>100% Free</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🔒</div>
            <p>Privacy First</p>
          </div>
          <div>
            <div className="text-2xl mb-2">⚡</div>
            <p>Instant Results</p>
          </div>
        </div>
      </div>
    </div>
  )
}
