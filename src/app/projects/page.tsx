'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { Generation, ProductCategory } from '@/types/generation'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/UI/Card'
import { Badge } from '@/components/UI/Badge'
import { Input } from '@/components/UI/Input'
import { Empty } from '@/components/UI/Empty'

const CATEGORY_LABELS: Record<ProductCategory, string> = {
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

const CATEGORY_COLORS: Record<ProductCategory, 'primary' | 'success' | 'warning' | 'error' | 'info'> = {
  saas: 'primary',
  mobile_app: 'info',
  web_app: 'primary',
  marketplace: 'success',
  b2c_app: 'warning',
  hardware: 'error',
  ai_tool: 'primary',
  fintech: 'success',
  healthcare: 'error',
  edtech: 'info',
  gaming: 'warning',
  social: 'primary',
  service: 'success',
  community: 'info',
}

type SortOption = 'recent' | 'name' | 'rating'
type ViewMode = 'grid' | 'list'

export default function ProjectsPage() {
  const router = useRouter()
  const { generations, getGeneration } = useGenerationStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  // Filter projects
  let filteredProjects = [...generations]

  if (selectedCategory !== 'all') {
    filteredProjects = filteredProjects.filter((gen) => gen.category === selectedCategory)
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredProjects = filteredProjects.filter(
      (gen) =>
        gen.projectName?.toLowerCase().includes(query) ||
        gen.problemStatement.toLowerCase().includes(query)
    )
  }

  // Sort projects
  filteredProjects.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.projectName || a.problemStatement).localeCompare(
          b.projectName || b.problemStatement
        )
      case 'rating':
        const ratingA = a.feedback?.rating ?? 0
        const ratingB = b.feedback?.rating ?? 0
        return ratingB - ratingA
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      useGenerationStore.setState((state) => ({
        generations: state.generations.filter((gen) => gen.id !== id),
      }))
    }
  }

  const handleDuplicate = (id: string) => {
    const original = getGeneration(id)
    if (original) {
      useGenerationStore.getState().duplicateGeneration(id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Your Projects</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
            <Button
              size="lg"
              variant="primary"
              onClick={() => router.push('/')}
            >
              + Create New
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <Input
              placeholder="Search by project name or idea..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name A-Z</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title="Grid view"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title="List view"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredProjects.length === 0 ? (
          <div className="mt-8">
            <Empty
              title="No projects yet"
              description={searchQuery ? 'Try adjusting your search criteria' : 'Create your first product strategy to get started'}
              action={{
                label: 'Create New Project',
                onClick: () => router.push('/'),
              }}
            />
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={viewMode === 'list' ? 'block' : ''}
              >
                <Card
                  variant="elevated"
                  isHoverable={true}
                  className="h-full cursor-pointer transition-all"
                  onClick={() => router.push(`/results?id=${project.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {project.projectName || project.problemStatement.substring(0, 50)}
                      </h3>
                      <Badge variant={CATEGORY_COLORS[project.category]} size="sm" className="mt-2">
                        {CATEGORY_LABELS[project.category]}
                      </Badge>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        useGenerationStore.getState().toggleBookmark(project.id)
                      }}
                      className="text-xl hover:scale-110 transition-transform"
                    >
                      {project.isBookmarked ? '⭐' : '☆'}
                    </button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {project.problemStatement}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                    <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    {project.feedback?.rating && (
                      <span className="text-cyan-500 font-medium">
                        ★ {project.feedback.rating}/5
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="primary" fullWidth className="flex-1">
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDuplicate(project.id)}
                      title="Duplicate"
                    >
                      📋
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(project.id)}
                      title="Delete"
                    >
                      🗑️
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
