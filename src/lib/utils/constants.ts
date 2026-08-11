import { ProductCategory } from '@/types/generation'

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'saas', label: 'SaaS (Software as a Service)' },
  { value: 'b2c_app', label: 'B2C App (Mobile/Web)' },
  { value: 'marketplace', label: 'Marketplace (Two-Sided Network)' },
  { value: 'hardware', label: 'Hardware Product' },
  { value: 'service', label: 'Professional Service' },
  { value: 'community', label: 'Community Platform' },
  { value: 'ai_tool', label: 'AI/ML Tool' },
]

export const INDUSTRIES = [
  'FinTech',
  'HealthTech',
  'EdTech',
  'E-commerce',
  'Social',
  'Productivity',
  'Entertainment',
  'Travel',
  'Real Estate',
  'HR/Recruitment',
  'Marketing',
  'Analytics',
  'Security',
  'DevTools',
  'Other',
]

export const ARTIFACT_NAMES = {
  canvas: 'Product Canvas',
  prd: 'Product Requirements Document',
  gtm: 'Go-to-Market Strategy',
  features: 'Feature Specification',
  validation: 'Validation Plan',
} as const

export const ARTIFACT_DESCRIPTIONS = {
  canvas: 'One-page product overview with key business model elements',
  prd: 'Comprehensive product specification with vision, strategy, and roadmap',
  gtm: 'Launch strategy covering positioning, channels, and timeline',
  features: 'Detailed feature specifications with acceptance criteria',
  validation: 'Customer discovery and experiment plan to validate assumptions',
} as const

export const MAX_GENERATIONS = 100
export const MAX_PROBLEM_LENGTH = 2000
export const MIN_PROBLEM_LENGTH = 50

export const STORAGE_KEYS = {
  generations: 'apc_generations',
  settings: 'apc_settings',
  lastVisited: 'apc_lastVisited',
  shareTokens: 'apc_share_tokens',
  userFeedback: 'apc_user_feedback',
  generationAnalytics: 'apc_generation_analytics',
  schemaVersion: 'apc_schema_version',
} as const

export const SCHEMA_VERSION = 2

export const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'from',
  'up',
  'about',
  'into',
  'through',
  'during',
  'is',
  'are',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'do',
  'does',
  'did',
  'will',
  'would',
  'could',
  'should',
  'may',
  'might',
  'can',
  'this',
  'that',
  'these',
  'those',
  'i',
  'you',
  'he',
  'she',
  'it',
  'we',
  'they',
  'what',
  'which',
  'who',
  'when',
  'where',
  'why',
  'how',
])
