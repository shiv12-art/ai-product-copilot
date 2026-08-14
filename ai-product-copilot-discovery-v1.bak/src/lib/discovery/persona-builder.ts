import { DynamicPersona, StructuredInsights } from '@/lib/types/discovery'

const personaTemplates = {
  developer: {
    baseTitle: 'Developer',
    variants: {
      junior: 'Junior Developer',
      senior: 'Senior Developer',
      lead: 'Tech Lead',
    },
  },
  manager: {
    baseTitle: 'Manager',
    variants: {
      product: 'Product Manager',
      project: 'Project Manager',
      engineering: 'Engineering Manager',
    },
  },
  creator: {
    baseTitle: 'Creator',
    variants: {
      designer: 'Product Designer',
      marketer: 'Marketing Professional',
      content: 'Content Creator',
    },
  },
  operator: {
    baseTitle: 'Operator',
    variants: {
      support: 'Support Specialist',
      sales: 'Sales Professional',
      ops: 'Operations Manager',
    },
  },
}

export function buildDynamicPersonas(
  insights: StructuredInsights,
  problemStatement: string
): DynamicPersona[] {
  const personas: DynamicPersona[] = []

  // Primary persona
  const primaryPersona = buildPrimaryPersona(insights, problemStatement)
  personas.push(primaryPersona)

  // Secondary persona if applicable
  if (shouldIncludeSecondaryPersona(insights)) {
    const secondaryPersona = buildSecondaryPersona(insights, problemStatement)
    personas.push(secondaryPersona)
  }

  return personas
}

function buildPrimaryPersona(
  insights: StructuredInsights,
  problemStatement: string
): DynamicPersona {
  const userType = inferUserType(insights.affectedUsers)
  const experienceLevel = inferExperience(problemStatement)
  const buyingPower = inferBuyingPower(problemStatement)

  return {
    name: generatePersonaName(userType),
    jobTitle: generateJobTitle(userType, experienceLevel),
    primaryPain: insights.primaryProblem,
    frequency: insights.frequency,
    costOfPain: insights.costOfStatusQuo,
    currentSolution: inferCurrentSolution(insights.currentWorkarounds),
    unmetNeeds: generateUnmetNeeds(insights.rootCauses),
    buyingPower: buyingPower as 'high' | 'medium' | 'low',
    decisionSpeed: inferDecisionSpeed(buyingPower),
    riskTolerance: inferRiskTolerance(problemStatement),
    successMetric: generateSuccessMetric(insights),
  }
}

function buildSecondaryPersona(
  insights: StructuredInsights,
  problemStatement: string
): DynamicPersona {
  // Alternate persona - typically stakeholder/decision maker
  const primaryType = inferUserType(insights.affectedUsers)
  const secondaryType = getAlternatePersonaType(primaryType)

  return {
    name: generatePersonaName(secondaryType),
    jobTitle: generateJobTitle(secondaryType, 'intermediate'),
    primaryPain: `Overhead from team's ${insights.primaryProblem.toLowerCase()}`,
    frequency: 'frequent',
    costOfPain: 'Impact on team productivity and retention',
    currentSolution: 'Workarounds, escalations',
    unmetNeeds: [
      'Better team productivity',
      'Reduced churn',
      'Measurable improvements',
    ],
    buyingPower: 'high' as const,
    decisionSpeed: 'slow' as const,
    riskTolerance: 'medium' as const,
    successMetric: 'Team velocity, retention, satisfaction scores',
  }
}

function shouldIncludeSecondaryPersona(insights: StructuredInsights): boolean {
  // Include secondary if problem affects multiple user types
  return insights.affectedUsers.includes(',')
}

function inferUserType(affectedUsers: string): string {
  if (affectedUsers.includes('developer')) return 'developer'
  if (affectedUsers.includes('manager')) return 'manager'
  if (affectedUsers.includes('designer') || affectedUsers.includes('creator'))
    return 'creator'
  if (affectedUsers.includes('support') || affectedUsers.includes('sales'))
    return 'operator'
  return 'developer'
}

function getAlternatePersonaType(primaryType: string): string {
  const alternates: { [key: string]: string } = {
    developer: 'manager',
    manager: 'developer',
    creator: 'manager',
    operator: 'manager',
  }
  return alternates[primaryType] || 'manager'
}

function inferExperience(problemStatement: string): string {
  if (/junior|beginner|entry-level|new/i.test(problemStatement)) return 'junior'
  if (/senior|veteran|expert|experienced/i.test(problemStatement)) return 'senior'
  if (/lead|principal|head/i.test(problemStatement)) return 'lead'
  return 'intermediate'
}

function inferBuyingPower(problemStatement: string): string {
  if (/enterprise|corporate|large organization|fortune|s&p/i.test(problemStatement))
    return 'high'
  if (/startup|founder|bootstrap|early-stage/i.test(problemStatement))
    return 'low'
  if (/agency|consultant|team|department/i.test(problemStatement))
    return 'medium'
  return 'medium'
}

function inferDecisionSpeed(buyingPower: string): 'fast' | 'medium' | 'slow' {
  if (buyingPower === 'high') return 'slow'
  if (buyingPower === 'low') return 'fast'
  return 'medium'
}

function inferRiskTolerance(problemStatement: string): 'high' | 'medium' | 'low' {
  if (/startup|early-stage|growth|innovation/i.test(problemStatement))
    return 'high'
  if (/enterprise|regulated|compliance|security/i.test(problemStatement))
    return 'low'
  return 'medium'
}

function generatePersonaName(userType: string): string {
  const names: { [key: string]: string[] } = {
    developer: ['Alex Chen', 'Jordan Smith', 'Sam Taylor'],
    manager: ['Sarah Martinez', 'Michael Johnson', 'Lisa Wong'],
    creator: ['Emma Davis', 'David Lee', 'Jessica Brown'],
    operator: ['Chris Anderson', 'Maria Garcia', 'James Wilson'],
  }
  const typeNames = names[userType] || names.developer
  return typeNames[Math.floor(Math.random() * typeNames.length)]
}

function generateJobTitle(userType: string, experience: string): string {
  const templates = personaTemplates[userType as keyof typeof personaTemplates]
  if (!templates) return 'Professional'

  if (experience === 'junior' || experience === 'beginner')
    return `Junior ${templates.baseTitle}`
  if (experience === 'senior' || experience === 'expert')
    return `Senior ${templates.baseTitle}`
  if (experience === 'lead')
    return `${templates.baseTitle} Lead`

  return templates.baseTitle
}

function generateUnmetNeeds(rootCauses: string[]): string[] {
  const needsMap: { [key: string]: string } = {
    'Too many tools': 'Unified, integrated solution',
    'Tools not integrated': 'Better integrations or consolidation',
    'Wrong tool for job': 'Purpose-built tool for this use case',
    'Skill gap': 'Easier onboarding and learning',
    'Process issue': 'Optimized workflow',
    'Technology gap': 'Modern, automated approach',
    'Cost barrier': 'More affordable option',
  }

  return rootCauses
    .map((cause) => needsMap[cause] || cause)
    .slice(0, 3)
}

function generateSuccessMetric(insights: StructuredInsights): string {
  if (insights.urgencyLevel === 'critical') {
    return `Reduce ${insights.primaryProblem.toLowerCase()} by 50%+`
  }

  if (insights.frequency === 'constant') {
    return `Save 5+ hours per week on ${insights.primaryProblem.toLowerCase()}`
  }

  return `Improve efficiency and reduce friction in ${insights.primaryProblem.toLowerCase()}`
}

function inferCurrentSolution(workarounds: string[]): string {
  return workarounds[0] || 'Manual processes'
}
