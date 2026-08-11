'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { Generation } from '@/types/generation'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/UI/Card'
import { Badge } from '@/components/UI/Badge'
import { ShareDialog } from '@/components/Share/ShareDialog'
import { ExportMenu } from '@/components/Export/ExportMenu'

const ARTIFACT_CONFIG: Record<string, { title: string; emoji: string; description: string }> = {
  canvas: { title: 'Product Canvas', emoji: '📋', description: 'Business model overview' },
  prd: { title: 'PRD', emoji: '📄', description: 'Product requirements' },
  gtm: { title: 'GTM Strategy', emoji: '🎯', description: 'Go-to-market plan' },
  features: { title: 'Features', emoji: '⭐', description: 'Feature specifications' },
  validation: { title: 'Validation', emoji: '✅', description: 'Validation plan' },
  competitive: { title: 'Competitors', emoji: '🏆', description: 'Competitive analysis' },
  metrics: { title: 'Metrics', emoji: '📊', description: 'Success metrics' },
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

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getGeneration, updateArtifact, toggleBookmark, setCurrentGeneration, duplicateGeneration, deleteGeneration } = useGenerationStore()

  const [generation, setGeneration] = useState<Generation | null>(null)
  const [selectedTab, setSelectedTab] = useState<string>('canvas')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [exportMenuOpen, setExportMenuOpen] = useState(false)

  useEffect(() => {
    const id = searchParams.get('id')
    let data: Generation | undefined

    if (id) {
      data = getGeneration(id)
    } else {
      const latestData = localStorage.getItem('latestGeneration')
      if (latestData) {
        data = JSON.parse(latestData)
      }
    }

    if (data) {
      setGeneration(data)
      setCurrentGeneration(data)
    } else {
      router.push('/projects')
    }
    setLoading(false)
  }, [router, searchParams, getGeneration, setCurrentGeneration])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading artifacts...</p>
        </div>
      </div>
    )
  }

  if (!generation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
        <Card>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/projects')}>Back to Projects</Button>
          </div>
        </Card>
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

  const handleDuplicate = () => {
    duplicateGeneration(generation.id)
    alert('Project duplicated! Check your projects list.')
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      deleteGeneration(generation.id)
      router.push('/projects')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/projects')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              title="Back to projects"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{generation.projectName || 'Untitled Project'}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Created {new Date(generation.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">{CATEGORY_LABELS[generation.category as keyof typeof CATEGORY_LABELS]}</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Artifact Tabs */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">Select Artifact</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(ARTIFACT_CONFIG).map(([key, { title, emoji, description }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTab(key)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedTab === key
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-2">{emoji}</div>
                  <p className={`font-semibold text-sm ${selectedTab === key ? 'text-cyan-900 dark:text-cyan-100' : 'text-gray-900 dark:text-gray-100'}`}>
                    {title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Artifact Content */}
          {artifactConfig && currentArtifact && (
            <Card variant="elevated" className="min-h-96">
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {artifactConfig.emoji} {artifactConfig.title}
                  </h3>
                  {currentArtifact.editedAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last edited {new Date(currentArtifact.editedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={copied ? 'success' : 'secondary'}
                  onClick={handleCopy}
                >
                  {copied ? '✓ Copied' : '📋 Copy'}
                </Button>
              </div>

              {/* Artifact Content */}
              <div className="prose dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {currentArtifact.content}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Quick Actions Card */}
            <Card variant="elevated">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  size="sm"
                  onClick={() => {
                    const token = useGenerationStore.getState().generateShareToken(generation.id)
                    const url = `${window.location.origin}/share/${token}`
                    setShareUrl(url)
                    setShareDialogOpen(true)
                  }}
                >
                  🔗 Share
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  size="sm"
                  onClick={() => setExportMenuOpen(true)}
                >
                  📥 Export
                </Button>
                <Button variant="secondary" fullWidth size="sm" onClick={handleDuplicate}>
                  📋 Duplicate
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  size="sm"
                  onClick={() => toggleBookmark(generation.id)}
                >
                  {generation.isBookmarked ? '⭐ Saved' : '☆ Save'}
                </Button>
              </div>
            </Card>

            {/* Project Info Card */}
            <Card variant="elevated">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {CATEGORY_LABELS[generation.category as keyof typeof CATEGORY_LABELS]}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Created</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(generation.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {generation.viewCount ? (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Views</p>
                    <p className="font-medium text-gray-900 dark:text-white">{generation.viewCount}</p>
                  </div>
                ) : null}
                {generation.feedback?.rating ? (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Rating</p>
                    <p className="font-medium text-cyan-500">★ {generation.feedback.rating}/5</p>
                  </div>
                ) : null}
              </div>
            </Card>

            {/* Danger Zone */}
            <Card variant="elevated" className="border-red-200 dark:border-red-800/50">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
              <Button variant="danger" fullWidth size="sm" onClick={handleDelete}>
                🗑️ Delete Project
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        shareUrl={shareUrl}
        projectName={generation.projectName || 'Product Strategy'}
      />

      {/* Export Menu */}
      <ExportMenu
        isOpen={exportMenuOpen}
        onClose={() => setExportMenuOpen(false)}
        generation={generation}
      />
    </div>
  )
}
