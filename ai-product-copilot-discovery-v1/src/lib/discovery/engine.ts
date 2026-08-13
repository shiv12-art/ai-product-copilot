import { DiscoveryReport, ProductCategory, Generation } from '@/lib/types/discovery'
import { extractStructuredInsights } from './insights-extractor'
import { buildDynamicPersonas } from './persona-builder'
import { extractAssumptions } from './assumption-mapper'
import { scoreOpportunity } from './opportunity-scorer'
import { generateHypotheses } from './hypothesis-generator'
import { generateRecommendations } from './recommendations-generator'
import { generateMarketAnalysis } from './market-analyzer'
import { generateExecutiveDecision } from './executive-decision'
import { generateAllArtifacts, Artifacts } from '@/lib/artifacts/generator'

export interface GenerationWithArtifacts extends Generation {
  artifacts?: Artifacts
}

export async function runDiscoveryAnalysis(
  problemStatement: string,
  category: ProductCategory
): Promise<DiscoveryReport> {
  // Phase 0: Extract structured insights
  const insights = extractStructuredInsights(problemStatement, category)

  // Phase 1: Build dynamic personas
  const personas = buildDynamicPersonas(insights, problemStatement)

  // Phase 2: Surface assumptions
  const assumptions = extractAssumptions(insights, category, problemStatement)

  // Phase 3: Generate testable hypotheses
  const hypotheses = generateHypotheses(insights, problemStatement, category)

  // Phase 4: Score opportunity
  const opportunityScore = scoreOpportunity(insights, problemStatement)

  // Phase 5: Generate recommendations
  const recommendations = generateRecommendations(insights, category)

  // Phase 6: Market analysis
  const marketAnalysis = generateMarketAnalysis(insights, category)

  // Phase 7: Executive decision
  const executiveDecision = generateExecutiveDecision(
    opportunityScore,
    assumptions,
    insights
  )

  return {
    insights,
    personas,
    assumptions,
    hypotheses,
    recommendations,
    opportunityScore,
    marketAnalysis,
    executiveDecision,
  }
}

export async function runFullProductStrategy(
  problemStatement: string,
  category: ProductCategory
): Promise<{ discovery: DiscoveryReport; artifacts: Artifacts }> {
  // Run discovery analysis
  const discovery = await runDiscoveryAnalysis(problemStatement, category)

  // Generate all 7 artifacts
  const artifacts = await generateAllArtifacts(discovery, problemStatement, category)

  return { discovery, artifacts }
}

export function generateId(): string {
  return `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function createGeneration(
  problemStatement: string,
  category: ProductCategory,
  discovery: DiscoveryReport,
  artifacts?: Artifacts
): GenerationWithArtifacts {
  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    problemStatement,
    category,
    discovery,
    artifacts,
  }
}
