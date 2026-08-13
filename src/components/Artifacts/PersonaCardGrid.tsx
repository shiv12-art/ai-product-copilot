'use client'

import React, { useState } from 'react'
import { Persona } from '@/lib/generation/templates/personas'
import { PersonaCard } from './PersonaCard'

interface PersonaCardGridProps {
  personas: Persona[]
  onPersonaSelect?: (persona: Persona) => void
}

type FilterType = 'all' | 'primary' | 'secondary' | 'tertiary'

export function PersonaCardGrid({ personas, onPersonaSelect }: PersonaCardGridProps) {
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

  const filteredPersonas =
    filterType === 'all' ? personas : personas.filter((p) => p.type === filterType)

  const handlePersonaClick = (persona: Persona) => {
    setSelectedPersona(persona)
    onPersonaSelect?.(persona)
  }

  const primaryCount = personas.filter((p) => p.type === 'primary').length
  const secondaryCount = personas.filter((p) => p.type === 'secondary').length
  const tertiaryCount = personas.filter((p) => p.type === 'tertiary').length

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setFilterType('all')}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-colors
            ${
              filterType === 'all'
                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          All Personas ({personas.length})
        </button>

        <button
          onClick={() => setFilterType('primary')}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-colors
            ${
              filterType === 'primary'
                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          ⭐ Primary ({primaryCount})
        </button>

        <button
          onClick={() => setFilterType('secondary')}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-colors
            ${
              filterType === 'secondary'
                ? 'bg-purple-600 dark:bg-purple-700 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          ◆ Secondary ({secondaryCount})
        </button>

        <button
          onClick={() => setFilterType('tertiary')}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-colors
            ${
              filterType === 'tertiary'
                ? 'bg-gray-600 dark:bg-gray-700 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          ○ Tertiary ({tertiaryCount})
        </button>
      </div>

      {/* Info Text */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>⭐ Primary:</strong> Core user, table-stakes for success
          {' | '}
          <strong>◆ Secondary:</strong> Important user, nice-to-have features
          {' | '}
          <strong>○ Tertiary:</strong> Edge case user, lower priority
        </p>
      </div>

      {/* Persona Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonas.map((persona, idx) => (
          <div
            key={idx}
            onClick={() => handlePersonaClick(persona)}
            className="cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <PersonaCard
              persona={persona}
              isHighlighted={selectedPersona?.name === persona.name}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPersonas.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">No personas found</p>
          <p className="text-sm">Try selecting a different filter</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Total Personas
            </p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
              {personas.length}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
              Primary
            </p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-200 mt-1">
              {primaryCount}
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Secondary
            </p>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-200 mt-1">
              {secondaryCount}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-950/30 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Tertiary
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-200 mt-1">
              {tertiaryCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
