'use client'

import { useState, useEffect } from 'react'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { ArtifactType } from '@/types/generation'

interface EditableContentProps {
  content: string
  artifactType: ArtifactType
  generationId: string
  onSave: () => void
}

export function EditableContent({
  content,
  artifactType,
  generationId,
  onSave,
}: EditableContentProps) {
  const [editedContent, setEditedContent] = useState(content)
  const [hasChanges, setHasChanges] = useState(false)
  const { updateArtifact } = useGenerationStore()

  useEffect(() => {
    setHasChanges(editedContent !== content)
  }, [editedContent, content])

  const handleSave = () => {
    updateArtifact(generationId, artifactType, editedContent)
    setHasChanges(false)
    onSave()
  }

  return (
    <div className="space-y-4">
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-96 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        placeholder="Edit your artifact here..."
      />

      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {editedContent.length} characters
        </p>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
