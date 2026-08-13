import { ProductCategory, KeywordResult } from '@/types/generation'
import { getDefaultFeatures } from '../templates/features'

export async function generateFeaturesArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string> {
  const features = getDefaultFeatures(category).slice(0, 8)
  const featureRows = features.map((feature, index) => generateFeatureRow(feature, index + 1))

  const markdown = `# Feature Specification Sheet

## Overview
Detailed specifications for core features of the product.

## Feature Table

| # | Feature Name | User Benefit | Acceptance Criteria | Priority | Effort |
|---|---|---|---|---|---|
${featureRows.join('\n')}

## Feature Descriptions

${features
  .map(
    (feature, idx) => `
### ${idx + 1}. ${feature}

**User Story:**
As a user, I want to use ${feature.toLowerCase()} so that I can achieve my goal.

**Acceptance Criteria:**
- [ ] Feature is fully implemented
- [ ] User can access the feature
- [ ] Feature works as intended
- [ ] Error handling is in place

**Dependencies:**
- Core authentication system
- Database infrastructure

**Estimated Effort:** ${getEffortEstimate(idx)}

**Timeline:** ${getFeatureTimeline(idx)}

---
`
  )
  .join('\n')}

## Success Metrics
- Feature adoption rate
- User engagement with feature
- Support tickets related to feature
- Feature-related bug count

---
*Generated: ${new Date().toLocaleDateString()}*
`

  return markdown
}

function generateFeatureRow(feature: string, index: number): string {
  const priorities = ['High', 'High', 'Medium', 'Medium', 'Medium', 'Low', 'Low', 'Low']
  const efforts = ['3-5 days', '5-7 days', '1-2 weeks', '2-3 weeks', '3-4 weeks', '1 week', '2 weeks', '2-3 weeks']

  return `| ${index} | ${feature} | Improves user experience | Feature works as designed | ${priorities[index - 1]} | ${efforts[index - 1]} |`
}

function getEffortEstimate(index: number): string {
  const estimates = ['Small (3-5 days)', 'Small (3-5 days)', 'Medium (1-2 weeks)', 'Medium (1-2 weeks)', 'Medium (2-3 weeks)', 'Large (3-4 weeks)', 'Large (3-4 weeks)', 'XL (4+ weeks)']
  return estimates[index] || 'Large (3-4 weeks)'
}

function getFeatureTimeline(index: number): string {
  const phases = ['MVP - Phase 1', 'MVP - Phase 1', 'MVP - Phase 2', 'Phase 2', 'Phase 3', 'Phase 3', 'Phase 4', 'Post-Launch']
  return phases[index] || 'Post-Launch'
}
