import { StructuredInsights, ProductCategory } from '@/lib/types/discovery'

export function extractStructuredInsights(
  problemStatement: string,
  category: ProductCategory
): StructuredInsights {
  const painPatterns = {
    efficiency: /slow|tedious|manual|repetitive|time-consuming|waste|takes too long/i,
    cost: /expensive|costly|unaffordable|high-cost|price/i,
    availability: /unavailable|rare|hard to find|limited access|access|shortage/i,
    quality: /poor|inconsistent|unreliable|broken|ineffective|low quality/i,
    fragmentation: /scattered|fragmented|disjointed|siloed|disconnected|multiple tools/i,
    safety: /unsafe|risky|vulnerable|exposed|security|unsafe|dangerous/i,
    coordination: /communication|collaboration|coordination|alignment|coordination/i,
    knowledge: /knowledge gap|learning curve|expertise|hard to learn|steep learning/i,
  }

  const urgencyPatterns = {
    critical: /blocking|preventing|emergency|can't|unable|broken|critical/i,
    high: /struggle|difficult|painful|frustrated|waste|lose/i,
    medium: /annoying|suboptimal|slow|could improve|somewhat/i,
    low: /nice to have|would like|could benefit|eventually/i,
  }

  const frequencyPatterns = {
    constant: /daily|always|every|constantly|ongoing/i,
    frequent: /often|regularly|multiple times|weekly|recurring/i,
    occasional: /sometimes|occasionally|some|periodic/i,
    rare: /rarely|once in a while|infrequent/i,
  }

  const marketPatterns = {
    large: /enterprise|corporate|millions|global|worldwide|large market/i,
    medium: /growing|scaling|companies|teams|organizations/i,
    niche: /specific|niche|specialized|vertical/i,
  }

  // Analyze pain patterns
  const painScores = Object.entries(painPatterns).map(([type, regex]) => ({
    type,
    score: (problemStatement.match(regex) || []).length,
  }))
  const primaryPains = painScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((p) => p.type)

  // Determine urgency
  let urgencyLevel: 'critical' | 'high' | 'medium' | 'low' = 'medium'
  for (const [level, regex] of Object.entries(urgencyPatterns)) {
    if (regex.test(problemStatement)) {
      urgencyLevel = level as any
      break
    }
  }

  // Determine frequency
  let frequency: 'constant' | 'frequent' | 'occasional' | 'rare' = 'frequent'
  for (const [freq, regex] of Object.entries(frequencyPatterns)) {
    if (regex.test(problemStatement)) {
      frequency = freq as any
      break
    }
  }

  // Determine market size
  let marketSize: 'large' | 'medium' | 'niche' = 'medium'
  for (const [size, regex] of Object.entries(marketPatterns)) {
    if (regex.test(problemStatement)) {
      marketSize = size as any
      break
    }
  }

  // Extract affected users
  const affectedUsers = extractAffectedUsers(problemStatement)

  // Determine competitive intensity based on category
  const competitiveIntensity = determineCompetitiveIntensity(category)

  // Extract root causes
  const rootCauses = extractRootCauses(problemStatement)

  // Extract current workarounds
  const currentWorkarounds = extractWorkarounds(problemStatement)

  // Calculate cost of status quo
  const costOfStatusQuo = calculateCost(problemStatement, urgencyLevel, frequency)

  return {
    primaryProblem: extractPrimaryProblem(problemStatement),
    affectedUsers,
    urgencyLevel,
    frequency,
    rootCauses,
    currentWorkarounds,
    costOfStatusQuo,
    marketSize,
    competitiveIntensity,
  }
}

function extractPrimaryProblem(problemStatement: string): string {
  const sentences = problemStatement.split(/[.!?]+/)
  return sentences[0]?.trim() || problemStatement
}

function extractAffectedUsers(problemStatement: string): string {
  const userPatterns = {
    developers: /developer|engineer|programmer|coder|technical/i,
    managers: /manager|director|leader|executive|CEO|founder/i,
    creatives: /designer|creator|artist|marketer|content/i,
    operators: /support|operations|customer|sales|account/i,
    teams: /team|group|department|division|organization/i,
  }

  const identified: string[] = []
  for (const [user, regex] of Object.entries(userPatterns)) {
    if (regex.test(problemStatement)) {
      identified.push(user)
    }
  }

  return identified.length > 0 ? identified.join(', ') : 'Not clearly specified'
}

function extractRootCauses(problemStatement: string): string[] {
  const causes = {
    'Too many tools': /scattered|fragmented|multiple|5 tools|disconnected/i,
    'Tools not integrated': /integration|connect|sync|bridge|incompatible/i,
    'Wrong tool for job': /not designed for|built for different|wrong tool/i,
    'Skill gap': /learning curve|expertise|knowledge|training|learn/i,
    'Process issue': /workflow|process|procedure|method|way we work/i,
    'Technology gap': /technology|outdated|legacy|no automation/i,
    'Cost barrier': /expensive|costly|unaffordable|can't afford/i,
  }

  const identified: string[] = []
  for (const [cause, regex] of Object.entries(causes)) {
    if (regex.test(problemStatement)) {
      identified.push(cause)
    }
  }

  return identified.length > 0
    ? identified
    : ['Inefficient current process', 'Lack of appropriate tooling']
}

function extractWorkarounds(problemStatement: string): string[] {
  const common = [
    'Manual processes',
    'Workarounds using existing tools',
    'Copy-paste from previous work',
    'Third-party integrations',
    'Consultant/expert help',
  ]
  return common.slice(0, 2)
}

function calculateCost(
  problemStatement: string,
  urgencyLevel: string,
  frequency: string
): string {
  const timeIndicators =
    /(\d+)\s*(hour|day|week|month|year)|(\d+)%|significant|substantial|major/i.test(
      problemStatement
    )
  const costIndicators = /expensive|costly|price|financial/i.test(problemStatement)

  if (urgencyLevel === 'critical' && frequency === 'constant') {
    return 'Critical - blocking productivity or causing major financial loss'
  } else if (urgencyLevel === 'high' && frequency === 'frequent') {
    return 'Significant - causing measurable time/cost waste'
  } else if (timeIndicators) {
    return 'Quantifiable - measurable time/cost impact'
  }

  return 'Moderate - ongoing inefficiency or friction'
}

function determineCompetitiveIntensity(
  category: ProductCategory
): 'high' | 'medium' | 'low' {
  const highIntensity = ['ai_tool', 'saas', 'mobile_app', 'fintech']
  const mediumIntensity = ['marketplace', 'social_network', 'gaming', 'edtech']
  const lowIntensity = ['hardware', 'service_marketplace', 'community', 'healthcare']

  if (highIntensity.includes(category)) return 'high'
  if (mediumIntensity.includes(category)) return 'medium'
  return 'low'
}
