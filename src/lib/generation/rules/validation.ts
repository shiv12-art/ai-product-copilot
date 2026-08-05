import { ProductCategory, KeywordResult } from '@/types/generation'

export async function generateValidationArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string> {
  const questions = generateValidationQuestions(category)
  const experiments = generateExperiments(category)
  const metrics = generateMetrics(category)

  const markdown = `# Validation Plan

## Executive Summary
This plan outlines how to validate key assumptions and de-risk the product before full launch.

## Key Assumptions to Test
1. **Market Problem:** Customers actually have the problem we're solving
2. **Product Solution:** Our solution effectively addresses the problem
3. **Customer Willingness:** Customers are willing to pay for the solution
4. **Distribution:** We can reach customers efficiently
5. **Unit Economics:** The business model is sustainable

## Customer Discovery Questions

### Problem Validation
1. What is your biggest challenge with ${getChallenge(category)}?
2. How are you currently solving this problem?
3. How much time/money do you spend on this problem?
4. What would an ideal solution look like for you?
5. Have you tried other solutions? What didn't work?

### Solution Validation
6. Based on our product description, does this address your problem?
7. What features are most important to you?
8. What would prevent you from using this product?
9. How would you recommend this to others?
10. What price would feel fair for this solution?

### Willingness to Pay
11. Would you use this product if it was free?
12. Would you be willing to pay \$X/month?
13. When would you want to start using this?
14. What would be your biggest concern as a customer?

---

## Validation Experiments

${experiments.map((exp) => `### ${exp.name}
**Objective:** ${exp.objective}
**Duration:** ${exp.duration}
**Success Criteria:** ${exp.criteria}
**Sample Size:** ${exp.sample}

---`).join('\n')}

## Metrics to Track

### Awareness Metrics
${metrics.awareness.map((m) => `- ${m}`).join('\n')}

### Engagement Metrics
${metrics.engagement.map((m) => `- ${m}`).join('\n')}

### Conversion Metrics
${metrics.conversion.map((m) => `- ${m}`).join('\n')}

### Retention Metrics
${metrics.retention.map((m) => `- ${m}`).join('\n')}

## Success Thresholds

| Metric | Target | Green Flag | Yellow Flag | Red Flag |
|--------|--------|-----------|------------|----------|
| Problem Validation | 80%+ agree problem exists | 80%+ | 60-80% | <60% |
| Solution Validation | 70%+ would use product | 70%+ | 50-70% | <50% |
| Willingness to Pay | 50%+ willing to pay | 50%+ | 30-50% | <30% |
| Landing Page CTR | 5%+ click-through | 5%+ | 2-5% | <2% |
| Email Signup | 20%+ conversion | 20%+ | 10-20% | <10% |

## Learning Plan

### Monthly Reviews
- Analyze validation metrics
- Identify assumptions that didn't hold
- Adjust product roadmap based on feedback
- Update go-to-market strategy

### Decision Framework
- **All green flags:** Proceed with full launch
- **Mixed flags:** Adjust product and retest
- **All red flags:** Pivot or restart

## Timeline

### Month 1: Interviews & Landing Page
- Conduct 20 customer interviews
- Build landing page
- Create email waitlist

### Month 2: MVP Testing
- Release MVP to early adopters
- Gather usage data and feedback
- Refine product based on insights

### Month 3: Paid Validation
- Run small paid advertising campaign
- Measure CAC and conversion rates
- Refine messaging and positioning

### Month 4: Launch Prep
- Address feedback from validation
- Prepare launch assets
- Build partnerships and integrations

## Go/No-Go Criteria

### Go (Launch)
- Problem validation: ≥80% confirmed
- Solution validation: ≥70% confirmed
- CAC < \$X (industry benchmark)
- Retention rate: ≥60%

### No-Go (Pivot/Pause)
- Problem validation: <60%
- Customer acquisition cost too high
- Retention rate: <20%
- Cannot secure initial customers

---
*Plan Updated: ${new Date().toLocaleDateString()}*
`

  return markdown
}

function getChallenge(category: ProductCategory): string {
  const challenges: Record<ProductCategory, string> = {
    saas: 'your workflow',
    b2c_app: 'personal productivity',
    marketplace: 'buying and selling',
    hardware: 'your daily life',
    service: 'managing services',
    community: 'finding your people',
    ai_tool: 'building AI applications',
  }
  return challenges[category] || 'your workflow'
}

function generateExperiments(category: ProductCategory) {
  return [
    {
      name: 'Landing Page Validation',
      objective: 'Measure interest and collect leads',
      duration: '2 weeks',
      criteria: '>100 signups, >5% conversion rate',
      sample: 'Paid traffic (Google, Facebook)',
    },
    {
      name: 'Customer Interview Sprint',
      objective: 'Validate problem and solution',
      duration: '2 weeks',
      criteria: '≥80% confirm problem, ≥70% would use',
      sample: '20-30 target customers',
    },
    {
      name: 'MVP Testing with Early Adopters',
      objective: 'Test product-market fit',
      duration: '4 weeks',
      criteria: '≥60% weekly retention, NPS > 40',
      sample: '50-100 beta users',
    },
    {
      name: 'Pricing Validation',
      objective: 'Test willingness to pay',
      duration: '1 week',
      criteria: '≥50% would pay, CAC < \$X',
      sample: 'Survey 50+ potential customers',
    },
  ]
}

function generateMetrics(category: ProductCategory) {
  return {
    awareness: [
      'Landing page views',
      'Email signups',
      'Social media followers',
      'PR mentions',
    ],
    engagement: [
      'Time on site',
      'Feature usage rate',
      'User-generated content',
      'In-app activity',
    ],
    conversion: [
      'Landing page conversion rate',
      'Free-to-paid conversion',
      'Feature adoption rate',
      'Customer lifetime value (CLV)',
    ],
    retention: [
      'Daily active users (DAU)',
      'Weekly retention rate',
      'Monthly churn rate',
      'Net Promoter Score (NPS)',
    ],
  }
}
