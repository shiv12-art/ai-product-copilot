import { Recommendation, StructuredInsights, ProductCategory } from '@/lib/types/discovery'

export function generateRecommendations(
  insights: StructuredInsights,
  category: ProductCategory
): Recommendation {
  const mvpScope = generateMVPScope(insights, category)
  const firstFeatures = generateFirstFeatures(insights, category)
  const risks = generateRisks(insights, category)

  return {
    mvpScope,
    firstFeatures,
    risks,
  }
}

function generateMVPScope(
  insights: StructuredInsights,
  category: ProductCategory
): string[] {
  const scope: string[] = []

  scope.push(`Address core pain: ${insights.primaryProblem}`)

  if (insights.rootCauses.includes('Too many tools')) {
    scope.push('Consolidate or integrate fragmented workflows')
  }

  if (insights.frequency === 'constant') {
    scope.push('Optimize for daily/repeated use')
  }

  if (insights.marketSize === 'niche') {
    scope.push('Build for specific vertical/segment first')
  }

  // Category-specific scope
  switch (category) {
    case 'saas':
      scope.push('Authentication & basic analytics')
      scope.push('CSV import/export for data portability')
      break
    case 'mobile_app':
      scope.push('Seamless mobile-first experience')
      scope.push('Offline support if relevant')
      break
    case 'marketplace':
      scope.push('Supply-side onboarding')
      scope.push('Demand-side discovery')
      break
    case 'ai_tool':
      scope.push('Accurate context understanding')
      scope.push('Fast response time (<2s)')
      break
  }

  return scope.slice(0, 4)
}

function generateFirstFeatures(
  insights: StructuredInsights,
  category: ProductCategory
): string[] {
  const features: string[] = []

  // Core feature addressing main pain
  features.push(`Core: Solve ${insights.primaryProblem}`)

  // Workflow optimization
  if (insights.rootCauses.includes('Process issue')) {
    features.push('Optimized workflow UI')
  }

  // Integration/consolidation if needed
  if (insights.rootCauses.includes('Too many tools')) {
    features.push('Basic integrations with common tools')
  }

  // Category-specific first features
  switch (category) {
    case 'saas':
      features.push('Team collaboration basics')
      features.push('Reporting/analytics dashboard')
      break
    case 'mobile_app':
      features.push('Push notifications')
      features.push('In-app onboarding tutorial')
      break
    case 'marketplace':
      features.push('Provider profile + ratings')
      features.push('Search & discovery')
      break
    case 'fintech':
      features.push('Secure transaction flow')
      features.push('Transaction history & insights')
      break
  }

  return features.slice(0, 3)
}

function generateRisks(
  insights: StructuredInsights,
  category: ProductCategory
): string[] {
  const risks: string[] = []

  if (insights.competitiveIntensity === 'high') {
    risks.push('Crowded market: need clear differentiation')
  }

  if (insights.marketSize === 'niche') {
    risks.push('Small addressable market limits scale potential')
  }

  if (insights.frequency !== 'constant') {
    risks.push('Lower usage frequency may impact retention')
  }

  // Category-specific risks
  switch (category) {
    case 'marketplace':
      risks.push('Cold start problem: chicken-and-egg supply/demand')
      break
    case 'saas':
      risks.push('High switching costs from incumbents')
      break
    case 'ai_tool':
      risks.push('Rapid competitive improvements from well-funded players')
      break
    case 'hardware':
      risks.push('High capital requirements & long development cycle')
      break
  }

  return risks.slice(0, 3)
}
