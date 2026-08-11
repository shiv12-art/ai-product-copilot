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
  | 'social'
  | 'service'
  | 'community'

export interface Artifacts {
  canvas: string
  prd: string
  gtm: string
  features: string
  validation: string
  competitive: string
  metrics: string
}

export interface Feedback {
  rating?: 1 | 2 | 3 | 4 | 5
  isHelpful?: boolean
  comment?: string
  submittedAt?: string
}

export interface Analytics {
  createdAt: string
  generatedAt: string
  firstViewed?: string
  lastViewed?: string
  viewCount: number
}

export interface Generation {
  id: string
  createdAt: string
  updatedAt: string
  problemStatement: string
  category: ProductCategory
  industry?: string
  projectName?: string
  tags?: string[]
  artifacts: {
    canvas: { content: string; editedAt?: string }
    prd: { content: string; editedAt?: string }
    gtm: { content: string; editedAt?: string }
    features: { content: string; editedAt?: string }
    validation: { content: string; editedAt?: string }
    competitive: { content: string; editedAt?: string }
    metrics: { content: string; editedAt?: string }
  }
  isBookmarked: boolean
  feedback?: Feedback
  shareToken?: string
  isPublic?: boolean
  viewCount?: number
  analytics?: Analytics
}

export type ArtifactType = keyof Artifacts

export interface KeywordResult {
  word: string
  score: number
  frequency: number
}

export interface GenerationConfig {
  includeTimelines: boolean
  includeRiskAssessment: boolean
  includeValidationPlan: boolean
  detailLevel: 'brief' | 'standard' | 'detailed'
}

export interface UserFeedback {
  generationId: string
  rating?: 1 | 2 | 3 | 4 | 5
  isHelpful?: boolean
  comment?: string
  submittedAt: string
}
