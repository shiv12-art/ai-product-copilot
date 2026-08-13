/**
 * Persona Renderer
 *
 * This module provides utilities to render personas as rich components
 * instead of plain markdown text. It bridges the artifact generation
 * system with the new PersonaCard UI components.
 *
 * Usage:
 * 1. In artifact generation, detect persona sections
 * 2. Replace markdown with JSX component calls
 * 3. Render using PersonaSection component
 */

import React from 'react'
import { ProductCategory } from '@/types/generation'
import { getDefaultPersonas } from '../generation/templates/personas'
import { PersonaSection } from '@/components/Artifacts/PersonaSection'

/**
 * Creates a React component that renders personas as rich cards
 * instead of markdown text.
 *
 * @param category - Product category to determine which personas to show
 * @returns React component that renders persona cards
 *
 * @example
 * // In artifact generation
 * const personaComponent = createPersonaRenderer('saas')
 * // Then render in artifact viewer:
 * <ArtifactRenderer component={personaComponent} />
 */
export function createPersonaRenderer(category: ProductCategory) {
  return <PersonaSection category={category} />
}

/**
 * Checks if a markdown section is a persona section
 * Useful for transforming artifact content
 *
 * @param content - Markdown content to check
 * @returns true if content appears to be persona section
 */
export function isPersonaSection(content: string): boolean {
  return (
    content.includes('Target Users') ||
    content.includes('Personas') ||
    content.includes('### ') &&
    content.includes('PRIMARY') ||
    content.includes('SECONDARY') ||
    content.includes('TERTIARY')
  )
}

/**
 * Extracts persona section from markdown artifact
 *
 * @param content - Full artifact markdown
 * @returns persona section or null if not found
 */
export function extractPersonaSection(content: string): string | null {
  const lines = content.split('\n')
  let inPersonaSection = false
  let personaContent: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Start of persona section
    if (
      line.includes('Target Users') ||
      line.includes('## 3. Target Users')
    ) {
      inPersonaSection = true
      continue
    }

    // End of persona section (next ## or ### heading)
    if (inPersonaSection && line.match(/^##\s/) && !line.includes('Target Users')) {
      break
    }

    if (inPersonaSection) {
      personaContent.push(line)
    }
  }

  return personaContent.length > 0 ? personaContent.join('\n').trim() : null
}

/**
 * Configuration for persona rendering
 * Can be extended for different display modes
 */
export const PERSONA_RENDER_CONFIG = {
  // Show cards instead of markdown
  useCards: true,

  // Display filters (primary, secondary, tertiary)
  showFilters: true,

  // Show summary statistics
  showStats: true,

  // Show key insights section
  showInsights: true,

  // Cards per row on different screen sizes
  gridColumns: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },

  // Color scheme
  colors: {
    primary: 'blue',
    secondary: 'purple',
    tertiary: 'gray',
  },
}

/**
 * Hook-like function to get persona rendering options
 * Allows customization per artifact or category
 */
export function getPersonaRenderConfig(
  category?: ProductCategory
): typeof PERSONA_RENDER_CONFIG {
  // Could customize per category here
  return PERSONA_RENDER_CONFIG
}
