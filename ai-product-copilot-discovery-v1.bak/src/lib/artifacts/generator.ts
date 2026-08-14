import { DiscoveryReport, ProductCategory, Generation } from '@/lib/types/discovery'
import { generateProductCanvas } from './canvas-generator'
import { generatePRD } from './prd-generator'
import { generateGTM } from './gtm-generator'
import { generateRoadmap } from './roadmap-generator'
import { generateValidationPlan } from './validation-generator'
import { generateCompetitiveAnalysis } from './competitive-generator'
import { generateMetricsAndOKRs } from './metrics-generator'

export interface Artifacts {
  canvas: string
  prd: string
  gtm: string
  roadmap: string
  validation: string
  competitive: string
  metrics: string
}

export async function generateAllArtifacts(
  discovery: DiscoveryReport,
  problemStatement: string,
  category: ProductCategory
): Promise<Artifacts> {
  // Generate all 7 artifacts in parallel for speed
  const [canvas, prd, gtm, roadmap, validation, competitive, metrics] = await Promise.all([
    Promise.resolve(generateProductCanvas(discovery, problemStatement)),
    Promise.resolve(generatePRD(discovery, problemStatement)),
    Promise.resolve(generateGTM(discovery, category)),
    Promise.resolve(generateRoadmap(discovery)),
    Promise.resolve(generateValidationPlan(discovery)),
    Promise.resolve(generateCompetitiveAnalysis(discovery, category)),
    Promise.resolve(generateMetricsAndOKRs(discovery)),
  ])

  return {
    canvas,
    prd,
    gtm,
    roadmap,
    validation,
    competitive,
    metrics,
  }
}

export function createGenerationWithArtifacts(
  generation: Generation,
  artifacts: Artifacts
): Generation {
  return {
    ...generation,
    artifacts,
  } as any // Extended generation with artifacts
}
