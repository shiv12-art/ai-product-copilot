import { ProductCategory, KeywordResult } from '@/types/generation'
import { getDefaultFeatures } from '../templates/features'
import { getDefaultPersonas } from '../templates/personas'

export async function generatePRDArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string> {
  const features = getDefaultFeatures(category).slice(0, 6)
  const personas = getDefaultPersonas(category)
  const timeline = generateTimeline(category)

  const markdown = `# Product Requirements Document (PRD)

## 1. Product Overview
**Product Name:** ${generateProductName(keywords)}
**Category:** ${category.replace('_', ' ').toUpperCase()}
**Version:** 1.0

### Vision Statement
To create a product that solves the core challenge: "${problemStatement}"

## 2. Problem Statement
${problemStatement}

## 3. Target Users & Personas

${personas
  .map(
    (p) => `
### ${p.name} (${p.type.toUpperCase()})
- **Role:** ${p.role}
- **Goal:** ${p.goal}
- **Pain Point:** ${p.pain}
`
  )
  .join('\n')}

## 4. Core Features

${features.map((f, i) => `${i + 1}. **${f}**`).join('\n')}

## 5. Success Metrics
- Market adoption rate within first 6 months
- Customer satisfaction score (NPS > 50)
- Monthly active users growth
- Revenue targets
- Feature adoption rates

## 6. Development Roadmap

${timeline}

## 7. Technical Approach
- Scalable cloud-based architecture
- Mobile-first responsive design
- API-driven backend services
- Comprehensive analytics tracking
- Security and data privacy compliance

## 8. Go-to-Market Strategy
- Launch with MVP to target segment
- Iterative feature releases based on feedback
- Strategic partnerships for distribution
- Content marketing and thought leadership
- Community building and word-of-mouth

## 9. Risks & Mitigation
- **Market Risk:** Validate demand through interviews
- **Competition Risk:** Differentiate through unique features
- **Technical Risk:** Build with scalable architecture
- **Team Risk:** Hire experienced talent early
- **Financial Risk:** Plan for 18-24 month runway

## 10. Success Criteria
- Achieve product-market fit within 12 months
- Reach 10,000+ active users
- Maintain > 80% monthly retention
- Net Promoter Score (NPS) > 50
- Achieve profitability or secured funding

---
*Last Updated: ${new Date().toLocaleDateString()}*
`

  return markdown
}

function generateProductName(keywords: KeywordResult[]): string {
  if (keywords.length === 0) return 'Innovation Product'
  const firstKeyword = keywords[0].word.charAt(0).toUpperCase() + keywords[0].word.slice(1)
  return firstKeyword
}

function generateTimeline(category: ProductCategory): string {
  const months = category === 'hardware' ? 16 : category === 'ai_tool' ? 12 : 8

  return `### Phase 1: MVP (Months 1-3)
- Core feature development
- User testing and feedback
- Beta launch with early adopters

### Phase 2: Optimization (Months 4-6)
- Feature refinement based on feedback
- Performance and reliability improvements
- Expanded feature set

### Phase 3: Growth (Months 7-${months})
- Full market launch
- Marketing and acquisition campaigns
- Additional feature releases
- Team expansion`
}
