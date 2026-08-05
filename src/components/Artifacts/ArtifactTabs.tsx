'use client'

import { useState } from 'react'
import { Generation, ArtifactType } from '@/types/generation'
import { ARTIFACT_NAMES, ARTIFACT_DESCRIPTIONS } from '@/lib/utils/constants'
import { MarkdownViewer } from './MarkdownViewer'
import { EditableContent } from './EditableContent'
import { ExportMenu } from './ExportMenu'

interface ArtifactTabsProps {
  generation: Generation
}

const ARTIFACT_TYPES: ArtifactType[] = ['canvas', 'prd', 'gtm', 'features', 'validation']

export function ArtifactTabs({ generation }: ArtifactTabsProps) {
  const [activeTab, setActiveTab] = useState<ArtifactType>('canvas')
  const [editMode, setEditMode] = useState(false)

  const currentArtifact = generation.artifacts[activeTab]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        {ARTIFACT_TYPES.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              activeTab === tab
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
            }`}
            title={ARTIFACT_DESCRIPTIONS[tab]}
          >
            {ARTIFACT_NAMES[tab]}
          </button>
        ))}
      </div>

      {/* Artifact Content */}
      <div className="space-y-4">
        {/* Header with Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {ARTIFACT_NAMES[activeTab]}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {ARTIFACT_DESCRIPTIONS[activeTab]}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                editMode
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {editMode ? 'Done Editing' : 'Edit'}
            </button>
            <ExportMenu
              artifact={currentArtifact.content}
              artifactName={ARTIFACT_NAMES[activeTab]}
              generation={generation}
            />
          </div>
        </div>

        {/* Artifact Viewer/Editor */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          {editMode ? (
            <EditableContent
              content={currentArtifact.content}
              artifactType={activeTab}
              generationId={generation.id}
              onSave={() => {}}
            />
          ) : (
            <MarkdownViewer content={currentArtifact.content} />
          )}
        </div>

        {/* Metadata */}
        <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
          <p>
            Created: {new Date(generation.createdAt).toLocaleDateString()} at{' '}
            {new Date(generation.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {currentArtifact.editedAt && (
            <p>
              Last edited: {new Date(currentArtifact.editedAt).toLocaleDateString()} at{' '}
              {new Date(currentArtifact.editedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
