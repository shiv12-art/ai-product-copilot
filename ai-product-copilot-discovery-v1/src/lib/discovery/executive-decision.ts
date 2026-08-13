import { OpportunityScore, Assumption, StructuredInsights } from '@/lib/types/discovery'

export interface ExecutiveDecision {
  opportunityScore: number
  confidenceScore: number
  recommendation: 'go' | 'proceed_with_caution' | 'pivot' | 'no_go'
  topReasons: string[]
  nextActions: string[]
}

export function generateExecutiveDecision(
  opportunityScore: OpportunityScore,
  assumptions: Assumption[],
  insights: StructuredInsights
): ExecutiveDecision {
  // Calculate confidence based on assumption validation
  const criticalAssumptions = assumptions.filter((a) => a.criticality === 'critical')
  const avgAssumptionConfidence =
    criticalAssumptions.length > 0
      ? Math.round(
          criticalAssumptions.reduce((sum, a) => sum + a.confidence, 0) /
            criticalAssumptions.length
        )
      : 50

  // Adjust confidence based on opportunity score tier
  const tierConfidenceBoost = {
    GREEN_LIGHT: 20,
    YELLOW_CAUTION: 0,
    RED_FLAG: -15,
    STOP: -30,
  }

  const confidenceScore = Math.max(
    10,
    Math.min(
      95,
      avgAssumptionConfidence + (tierConfidenceBoost[opportunityScore.tier] || 0)
    )
  )

  // Determine recommendation
  const recommendation = determineRecommendation(
    opportunityScore.tier,
    confidenceScore
  )

  // Generate top reasons
  const topReasons = generateTopReasons(
    opportunityScore,
    assumptions,
    insights,
    recommendation
  )

  // Generate next actions
  const nextActions = generateNextActions(recommendation, assumptions)

  return {
    opportunityScore: opportunityScore.score,
    confidenceScore,
    recommendation,
    topReasons,
    nextActions,
  }
}

function determineRecommendation(
  tier: string,
  confidence: number
): 'go' | 'proceed_with_caution' | 'pivot' | 'no_go' {
  if (tier === 'STOP') return 'no_go'
  if (tier === 'RED_FLAG') return 'pivot'
  if (tier === 'YELLOW_CAUTION') {
    return confidence > 65 ? 'proceed_with_caution' : 'pivot'
  }
  return 'go'
}

function generateTopReasons(
  opportunityScore: OpportunityScore,
  assumptions: Assumption[],
  insights: StructuredInsights,
  recommendation: string
): string[] {
  const reasons: string[] = []

  // Reason 1: Market/Opportunity
  if (insights.marketSize === 'large') {
    reasons.push('Large addressable market opportunity (TAM: $50B+)')
  } else if (insights.marketSize === 'medium') {
    reasons.push('Medium-sized market with growth potential')
  }

  // Reason 2: Problem Severity
  if (insights.urgencyLevel === 'critical') {
    reasons.push('Solves critical, blocking problem for users')
  } else if (insights.urgencyLevel === 'high') {
    reasons.push('Addresses high-urgency pain point with frequent occurrence')
  }

  // Reason 3: Competitive Position
  if (insights.competitiveIntensity === 'low') {
    reasons.push('Low competitive intensity - room to establish leadership')
  } else if (insights.competitiveIntensity === 'medium') {
    reasons.push('Medium competition - clear differentiation needed')
  } else {
    reasons.push('Highly competitive - must execute excellently')
  }

  // Add risk/concern if proceeding with caution or pivoting
  if (recommendation === 'proceed_with_caution' || recommendation === 'pivot') {
    const highRiskAssumptions = assumptions.filter(
      (a) => a.criticality === 'critical' && a.confidence < 50
    )
    if (highRiskAssumptions.length > 0) {
      reasons.push(
        `⚠️ Critical assumptions need validation: ${highRiskAssumptions[0].statement}`
      )
    }
  }

  return reasons.slice(0, 3)
}

function generateNextActions(
  recommendation: string,
  assumptions: Assumption[]
): string[] {
  const actions: string[] = []

  if (recommendation === 'go') {
    actions.push('✓ Schedule customer validation interviews')
    actions.push('✓ Build product roadmap & technical spike')
    actions.push('✓ Recruit 5-10 beta customers')
  } else if (recommendation === 'proceed_with_caution') {
    actions.push('⚠️ Validate top 3 critical assumptions immediately')
    actions.push('⚠️ Run customer discovery interviews (10+)')
    actions.push('⚠️ Build prototype before full commitment')
  } else if (recommendation === 'pivot') {
    const criticalAssumptions = assumptions.filter(
      (a) => a.criticality === 'critical' && a.confidence < 40
    )
    if (criticalAssumptions.length > 0) {
      actions.push(
        `🔄 Reconsider problem/market: ${criticalAssumptions[0].statement}`
      )
    }
    actions.push('🔄 Explore adjacent markets or use cases')
    actions.push('🔄 Reframe problem statement based on research')
  } else {
    actions.push('❌ Do not pursue this opportunity currently')
    actions.push('❌ Revisit if market conditions change')
    actions.push('❌ Explore alternative problem space')
  }

  return actions
}
