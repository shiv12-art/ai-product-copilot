import { Hypothesis, StructuredInsights, ProductCategory } from '@/lib/types/discovery'

export function generateHypotheses(
  insights: StructuredInsights,
  problemStatement: string,
  category: ProductCategory
): Hypothesis[] {
  const hypotheses: Hypothesis[] = []

  // Core hypothesis: Problem frequency
  hypotheses.push({
    statement: `${insights.frequency === 'constant' ? 'Constant' : 'Frequent'} occurrence drives adoption urgency`,
    criticality: 'critical',
    confidence: insights.frequency === 'constant' ? 75 : 50,
    validationMethod:
      'Track user engagement frequency; measure time-to-activation',
  })

  // Market hypothesis
  if (insights.marketSize === 'large') {
    hypotheses.push({
      statement: 'Large market size supports sustainable unit economics',
      criticality: 'high',
      confidence: 60,
      validationMethod: 'TAM/SAM/SOM analysis + cohort analysis',
    })
  }

  // Competition hypothesis
  if (insights.competitiveIntensity === 'high') {
    hypotheses.push({
      statement: 'Must differentiate on speed, UX, or vertical specialization',
      criticality: 'critical',
      confidence: 70,
      validationMethod: 'Competitive feature matrix + customer feedback',
    })
  }

  // User adoption hypothesis
  hypotheses.push({
    statement: 'Target users will adopt within 2 weeks of onboarding',
    criticality: 'high',
    confidence: 40,
    validationMethod: 'Beta testing + onboarding flow analysis',
  })

  // Category-specific hypotheses
  const categoryHypotheses = generateCategoryHypotheses(category, insights)
  hypotheses.push(...categoryHypotheses)

  return hypotheses.slice(0, 5) // Limit to 5 most critical
}

function generateCategoryHypotheses(
  category: ProductCategory,
  insights: StructuredInsights
): Hypothesis[] {
  const hypotheses: Hypothesis[] = []

  switch (category) {
    case 'saas':
      hypotheses.push({
        statement:
          'Users will accept $10-50/month pricing for solution to this problem',
        criticality: 'high',
        confidence: 35,
        validationMethod: 'Pricing survey + willingness-to-pay study',
      })
      break

    case 'marketplace':
      hypotheses.push({
        statement: 'Network effects will be self-reinforcing after critical mass',
        criticality: 'critical',
        confidence: 25,
        validationMethod: 'Growth modeling + supply/demand balance testing',
      })
      break

    case 'mobile_app':
      hypotheses.push({
        statement: 'Push notifications drive 30%+ re-engagement',
        criticality: 'high',
        confidence: 50,
        validationMethod: 'A/B testing notification strategies',
      })
      break

    case 'ai_tool':
      hypotheses.push({
        statement: 'Context awareness reduces time-to-value by 50%',
        criticality: 'high',
        confidence: 40,
        validationMethod: 'Comparative user testing vs. generic tools',
      })
      break

    case 'fintech':
      hypotheses.push({
        statement: 'Users prioritize security/compliance over feature richness',
        criticality: 'high',
        confidence: 60,
        validationMethod: 'User interview analysis + feature prioritization',
      })
      break

    default:
      break
  }

  return hypotheses
}
