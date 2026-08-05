import { Generation, ProductCategory, Artifacts } from '@/types/generation'
import { extractKeywords } from './keywords'
import { generateCanvasArtifact } from './rules/canvas'
import { generatePRDArtifact } from './rules/prd'
import { generateGTMArtifact } from './rules/gtm'
import { generateFeaturesArtifact } from './rules/features'
import { generateValidationArtifact } from './rules/validation'
import { generateUUID } from '@/lib/utils/uuid'

export async function generateArtifacts(
  problemStatement: string,
  category: ProductCategory
): Promise<Generation> {
  const id = generateUUID()
  const now = new Date().toISOString()

  // Extract keywords from problem statement
  const keywords = extractKeywords(problemStatement)

  // Generate all 5 artifacts in parallel
  const [canvas, prd, gtm, features, validation] = await Promise.all([
    generateCanvasArtifact(problemStatement, category, keywords),
    generatePRDArtifact(problemStatement, category, keywords),
    generateGTMArtifact(problemStatement, category, keywords),
    generateFeaturesArtifact(problemStatement, category, keywords),
    generateValidationArtifact(problemStatement, category, keywords),
  ])

  const generation: Generation = {
    id,
    createdAt: now,
    updatedAt: now,
    problemStatement,
    category,
    artifacts: {
      canvas: { content: canvas },
      prd: { content: prd },
      gtm: { content: gtm },
      features: { content: features },
      validation: { content: validation },
    },
    isBookmarked: false,
  }

  return generation
}
