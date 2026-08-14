import { OpportunityScore, StructuredInsights } from '@/lib/types/discovery'

export function scoreOpportunity(
  insights: StructuredInsights,
  problemStatement: string
): OpportunityScore {
  let score = 0

  // Market Size (0-25)
  const marketSizeScore = scoreMarketSize(insights.marketSize)
  score += marketSizeScore

  // Urgency (0-20)
  const urgencyScore = scoreUrgency(insights.urgencyLevel)
  score += urgencyScore

  // Frequency (0-15)
  const frequencyScore = scoreFrequency(insights.frequency)
  score += frequencyScore

  // Competition (0-15)
  const competitionScore = scoreCompetition(insights.competitiveIntensity)
  score += competitionScore

  // Feasibility (0-15)
  const feasibilityScore = scoreFeasibility(problemStatement)
  score += feasibilityScore

  // Capital Requirements (0-10)
  const capitalScore = scoreCapitalRequirements(insights)
  score += capitalScore

  // Normalize to 0-100
  const normalizedScore = Math.min(100, score)

  return {
    score: normalizedScore,
    tier: determineTier(normalizedScore),
    reasoning: generateReasoning(insights, normalizedScore, {
      marketSize: marketSizeScore,
      urgency: urgencyScore,
      frequency: frequencyScore,
      competition: competitionScore,
      feasibility: feasibilityScore,
      capital: capitalScore,
    }),
  }
}

function scoreMarketSize(marketSize: string): number {
  const scores: { [key: string]: number } = {
    large: 25,
    medium: 15,
    niche: 8,
  }
  return scores[marketSize] || 15
}

function scoreUrgency(urgency: string): number {
  const scores: { [key: string]: number } = {
    critical: 20,
    high: 15,
    medium: 10,
    low: 5,
  }
  return scores[urgency] || 10
}

function scoreFrequency(frequency: string): number {
  const scores: { [key: string]: number } = {
    constant: 15,
    frequent: 10,
    occasional: 6,
    rare: 2,
  }
  return scores[frequency] || 8
}

function scoreCompetition(competition: string): number {
  const scores: { [key: string]: number } = {
    low: 15,
    medium: 8,
    high: 3,
  }
  return scores[competition] || 8
}

function scoreFeasibility(problemStatement: string): number {
  // Check for complexity signals
  const complexSignals = /blockchain|quantum|physics|nuclear|hardware|satellite/i
  const hardwareSignals = /chip|semiconductor|manufacturing|fab/i
  const softwareSignals = /software|app|platform|web|mobile/i

  if (complexSignals.test(problemStatement)) return 3
  if (hardwareSignals.test(problemStatement)) return 8
  if (softwareSignals.test(problemStatement)) return 15

  return 8
}

function scoreCapitalRequirements(insights: StructuredInsights): number {
  // Bootstrap-friendly categories get higher scores
  const bootstrappableCategories = [
    'saas',
    'ai_tool',
    'web_app',
    'mobile_app',
    'edtech',
  ]

  // High-capital categories get lower scores
  const expensiveCategories = ['hardware', 'marketplace']

  // Guess based on market size and category indicators
  if (insights.marketSize === 'niche') return 10

  return 6
}

function determineTier(
  score: number
): 'GREEN_LIGHT' | 'YELLOW_CAUTION' | 'RED_FLAG' | 'STOP' {
  if (score >= 80) return 'GREEN_LIGHT'
  if (score >= 60) return 'YELLOW_CAUTION'
  if (score >= 40) return 'RED_FLAG'
  return 'STOP'
}

function generateReasoning(
  insights: StructuredInsights,
  score: number,
  breakdown: { [key: string]: number }
): string {
  const factors: string[] = []

  // Market size factors
  if (insights.marketSize === 'large') {
    factors.push('Large addressable market (+25pts)')
  } else if (insights.marketSize === 'medium') {
    factors.push('Medium-sized market (+15pts)')
  } else {
    factors.push('Niche market (+8pts)')
  }

  // Urgency factors
  if (insights.urgencyLevel === 'critical') {
    factors.push('Critical, blocking problem (+20pts)')
  } else if (insights.urgencyLevel === 'high') {
    factors.push('High-urgency pain point (+15pts)')
  }

  // Frequency factors
  if (insights.frequency === 'constant') {
    factors.push('Constant, daily occurrence (+15pts)')
  } else if (insights.frequency === 'frequent') {
    factors.push('Frequent problem (+10pts)')
  }

  // Competition factors
  if (insights.competitiveIntensity === 'low') {
    factors.push('Low competition (-3pts)')
  } else if (insights.competitiveIntensity === 'high') {
    factors.push('Highly competitive market (-12pts)')
  }

  const reasoning =
    factors.join(' | ') +
    `\n\nScore: ${score}/100 - ${determineTier(score)} recommendation`

  return reasoning
}
