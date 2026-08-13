export type ProductCategory =
  | 'saas'
  | 'mobile_app'
  | 'web_app'
  | 'marketplace'
  | 'b2c_app'
  | 'hardware'
  | 'ai_tool'
  | 'fintech'
  | 'healthcare'
  | 'edtech'
  | 'gaming'
  | 'social_network'
  | 'service_marketplace'
  | 'community'

export interface StructuredInsights {
  primaryProblem: string
  affectedUsers: string
  urgencyLevel: 'critical' | 'high' | 'medium' | 'low'
  frequency: 'constant' | 'frequent' | 'occasional' | 'rare'
  rootCauses: string[]
  currentWorkarounds: string[]
  costOfStatusQuo: string
  marketSize: 'large' | 'medium' | 'niche'
  competitiveIntensity: 'high' | 'medium' | 'low'
}

export interface DynamicPersona {
  name: string
  jobTitle: string
  primaryPain: string
  frequency: string
  costOfPain: string
  currentSolution: string
  unmetNeeds: string[]
  buyingPower: 'high' | 'medium' | 'low'
  decisionSpeed: 'fast' | 'medium' | 'slow'
  riskTolerance: 'high' | 'medium' | 'low'
  successMetric: string
}

export interface Assumption {
  id: string
  statement: string
  criticality: 'critical' | 'high' | 'medium' | 'low'
  confidence: number
  validationMethods: string[]
  timeToValidate: string
  consequenceIfWrong: string
}

export interface OpportunityScore {
  score: number
  tier: 'GREEN_LIGHT' | 'YELLOW_CAUTION' | 'RED_FLAG' | 'STOP'
  reasoning: string
}

export interface Hypothesis {
  statement: string
  criticality: 'critical' | 'high' | 'medium'
  confidence: number
  validationMethod: string
}

export interface Recommendation {
  mvpScope: string[]
  firstFeatures: string[]
  risks: string[]
}

export interface DiscoveryReport {
  insights: StructuredInsights
  personas: DynamicPersona[]
  assumptions: Assumption[]
  hypotheses: Hypothesis[]
  recommendations: Recommendation
  opportunityScore: OpportunityScore
  marketAnalysis: {
    tam: string
    sam: string
    som: string
  }
  executiveDecision: {
    opportunityScore: number
    confidenceScore: number
    recommendation: 'go' | 'proceed_with_caution' | 'pivot' | 'no_go'
    topReasons: string[]
    nextActions: string[]
  }
}

export interface Generation {
  id: string
  createdAt: string
  problemStatement: string
  category: ProductCategory
  discovery: DiscoveryReport
}
