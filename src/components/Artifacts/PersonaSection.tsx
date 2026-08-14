'use client'

import React from 'react'
import { ProductCategory } from '@/types/generation'
import { getDefaultPersonas } from '@/lib/generation/templates/personas'
import { PersonaCardGrid } from './PersonaCardGrid'

interface PersonaSectionProps {
  category: ProductCategory
  title?: string
  description?: string
}

export function PersonaSection({
  category,
  title = 'Target Users & Personas',
  description = 'Meet the key personas who will benefit from this product. Each persona represents a distinct user segment with unique pain points and success metrics.',
}: PersonaSectionProps) {
  const personas = getDefaultPersonas(category)

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Personas Grid */}
      <PersonaCardGrid personas={personas} />

      {/* Key Insights */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">
          💡 Key Insights
        </h3>
        <ul className="space-y-2">
          {personas.length > 0 && (
            <>
              <li className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Primary Focus:</strong> {personas
                  .filter((p) => p.type === 'primary')
                  .map((p) => p.name)
                  .join(', ')}{' '}
                are your core users. All features should benefit them.
              </li>
              <li className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Secondary Consideration:</strong> {personas
                  .filter((p) => p.type === 'secondary')
                  .map((p) => p.name)
                  .join(', ')}{' '}
                are important but less critical than primary users.
              </li>
              {personas.filter((p) => p.type === 'tertiary').length > 0 && (
                <li className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Edge Cases:</strong> Don&apos;t over-engineer for {personas
                    .filter((p) => p.type === 'tertiary')
                    .map((p) => p.name)
                    .join(', ')}{' '}
                  unless they represent significant revenue.
                </li>
              )}
              <li className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Budget Holders:</strong> Identify decision-makers early.
                {personas
                  .filter((p) =>
                    p.jobContext.budgetAuthority?.match(/\$|k/i)
                  )
                  .length > 0
                  ? ` ${personas
                      .filter((p) =>
                        p.jobContext.budgetAuthority?.match(/\$|k/i)
                      )
                      .map((p) => p.name)
                      .join(', ')} control significant budgets.`
                  : ''}
              </li>
            </>
          )}
        </ul>
      </div>

      {/* How to Use This Section */}
      <div className="bg-gray-50 dark:bg-gray-950/30 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
          📋 How to Use This Section
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
          <li>
            <strong>Filter by Type:</strong> Use the tabs above to focus on primary, secondary, or
            tertiary personas
          </li>
          <li>
            <strong>Understand Pain Points:</strong> Identify the top 3 pain points for each user
            type
          </li>
          <li>
            <strong>Track Success Metrics:</strong> Each persona has metrics they care about - use
            these to measure success
          </li>
          <li>
            <strong>Address Objections:</strong> Know their typical objections before sales calls
          </li>
          <li>
            <strong>Iterate Based on Job Context:</strong> Understand their department, budget
            authority, and team structure
          </li>
        </ul>
      </div>
    </div>
  )
}
