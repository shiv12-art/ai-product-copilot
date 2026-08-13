import { Assumption, StructuredInsights, ProductCategory } from '@/lib/types/discovery'

const assumptionTemplates = {
  marketExists: {
    statement: (problem: string) =>
      `There is a large enough market willing to pay for solutions to "${problem}"`,
    validationMethods: [
      'Customer interviews (15+)',
      'Market size analysis',
      'Landing page validation',
      'Industry research',
    ],
    criticality: 'critical' as const,
    timeToValidate: '2-3 weeks',
  },
  problemIsReal: {
    statement: (problem: string) =>
      `The problem "${problem}" is genuinely painful to target users`,
    validationMethods: [
      'Customer interviews',
      'Behavioral observation',
      'Time/cost tracking',
    ],
    criticality: 'critical' as const,
    timeToValidate: '1-2 weeks',
  },
  userIdentified: {
    statement: (users: string) =>
      `${users} are the primary users affected by this problem`,
    validationMethods: ['Customer interviews', 'User research', 'Data analysis'],
    criticality: 'high' as const,
    timeToValidate: '1 week',
  },
  solutionWorks: {
    statement: (problem: string) =>
      `Our proposed solution effectively solves "${problem}"`,
    validationMethods: ['MVP testing', 'Prototype feedback', 'Beta customer'],
    criticality: 'critical' as const,
    timeToValidate: '2-4 weeks',
  },
  canMonetize: {
    statement: (users: string) =>
      `${users} will pay a sustainable price for this solution`,
    validationMethods: [
      'Pricing survey',
      'Early commitments',
      'Willingness-to-pay study',
    ],
    criticality: 'high' as const,
    timeToValidate: '2 weeks',
  },
  canDifferentiate: {
    statement: () =>
      'We can build meaningful differentiation vs. existing competitors',
    validationMethods: [
      'Competitive analysis',
      'Feature differentiation',
      'Customer feedback',
    ],
    criticality: 'high' as const,
    timeToValidate: '1-2 weeks',
  },
}

export function extractAssumptions(
  insights: StructuredInsights,
  category: ProductCategory,
  problemStatement: string
): Assumption[] {
  const assumptions: Assumption[] = []

  // Always include core assumptions
  assumptions.push(
    buildAssumption(
      'problemIsReal',
      assumptionTemplates.problemIsReal,
      insights.primaryProblem,
      estimateConfidence(problemStatement, 'problem')
    )
  )

  assumptions.push(
    buildAssumption(
      'userIdentified',
      assumptionTemplates.userIdentified,
      insights.affectedUsers,
      estimateConfidence(problemStatement, 'user')
    )
  )

  assumptions.push(
    buildAssumption(
      'marketExists',
      assumptionTemplates.marketExists,
      insights.primaryProblem,
      estimateConfidence(problemStatement, 'market')
    )
  )

  assumptions.push(
    buildAssumption(
      'solutionWorks',
      assumptionTemplates.solutionWorks,
      insights.primaryProblem,
      estimateConfidence(problemStatement, 'solution')
    )
  )

  assumptions.push(
    buildAssumption(
      'canMonetize',
      assumptionTemplates.canMonetize,
      insights.affectedUsers,
      estimateConfidence(problemStatement, 'monetize')
    )
  )

  assumptions.push(
    buildAssumption(
      'canDifferentiate',
      assumptionTemplates.canDifferentiate,
      '',
      estimateConfidence(problemStatement, 'differentiate')
    )
  )

  // Add category-specific assumptions
  const categoryAssumptions = getCategoryAssumptions(category)
  assumptions.push(...categoryAssumptions)

  // Sort by criticality
  return assumptions.sort((a, b) => {
    const criticalityOrder = { critical: 3, high: 2, medium: 1, low: 0 }
    return (
      criticalityOrder[b.criticality] - criticalityOrder[a.criticality]
    )
  })
}

function buildAssumption(
  id: string,
  template: any,
  context: string,
  confidence: number
): Assumption {
  return {
    id,
    statement: template.statement(context),
    criticality: template.criticality,
    confidence,
    validationMethods: template.validationMethods,
    timeToValidate: template.timeToValidate,
    consequenceIfWrong:
      generateConsequence(id, context),
  }
}

function estimateConfidence(
  problemStatement: string,
  type: string
): number {
  const validationSignals =
    /validated|tested|interviewed|data|research|survey|pilot|beta/i
  const mentions = (problemStatement.match(validationSignals) || []).length

  const baseConfidence: { [key: string]: number } = {
    problem: 45,
    user: 40,
    market: 30,
    solution: 25,
    monetize: 20,
    differentiate: 35,
  }

  return Math.min(100, (baseConfidence[type] || 30) + mentions * 10)
}

function generateConsequence(id: string, context: string): string {
  const consequences: { [key: string]: string } = {
    problemIsReal:
      'Build solution to problem that users don\'t actually care about',
    userIdentified: 'Miss actual user segment; build for wrong persona',
    marketExists: 'Solution exists but market is too small to be viable',
    solutionWorks: 'Develop great product no one will use',
    canMonetize: 'Build successful product but can\'t sustainably monetize',
    canDifferentiate:
      'Get commoditized; unable to compete against established players',
  }

  return consequences[id] || 'Project viability at risk'
}

function getCategoryAssumptions(
  category: ProductCategory
): Assumption[] {
  const categoryAssumptions: { [key: string]: Assumption[] } = {
    saas: [
      {
        id: 'willPay',
        statement: 'B2B customers will accept recurring subscription model',
        criticality: 'high',
        confidence: 35,
        validationMethods: [
          'Pricing tier testing',
          'Customer willingness study',
        ],
        timeToValidate: '2 weeks',
        consequenceIfWrong: 'Freemium or one-time purchase needed instead',
      },
      {
        id: 'willAdopt',
        statement: 'Switching cost from existing solution is low enough',
        criticality: 'high',
        confidence: 40,
        validationMethods: [
          'Customer interviews',
          'Competitive analysis',
          'Migration cost study',
        ],
        timeToValidate: '1-2 weeks',
        consequenceIfWrong:
          'Acquisition cost too high; need stronger differentiation',
      },
    ],
    marketplace: [
      {
        id: 'networkEffects',
        statement: 'Network effects will drive growth (supply attracts demand)',
        criticality: 'critical',
        confidence: 25,
        validationMethods: [
          'Growth modeling',
          'Cold start strategy test',
          'Ecosystem interviews',
        ],
        timeToValidate: '4+ weeks',
        consequenceIfWrong: 'Cold start problem unsolvable; pivot model',
      },
      {
        id: 'unitEconomics',
        statement: 'Transaction size and frequency supports 20%+ GMV take rate',
        criticality: 'high',
        confidence: 30,
        validationMethods: [
          'Unit economics model',
          'Market analysis',
          'Transaction testing',
        ],
        timeToValidate: '2-3 weeks',
        consequenceIfWrong:
          'Take rate too low; business model not viable at scale',
      },
    ],
    mobile_app: [
      {
        id: 'retention',
        statement: 'Users will engage regularly (DAU/MAU ratio > 0.3)',
        criticality: 'high',
        confidence: 20,
        validationMethods: ['Beta testing', 'Cohort analysis', 'Usage modeling'],
        timeToValidate: '2-4 weeks',
        consequenceIfWrong: 'Churn too high; pivoting or feature redesign needed',
      },
    ],
  }

  return categoryAssumptions[category] || []
}
