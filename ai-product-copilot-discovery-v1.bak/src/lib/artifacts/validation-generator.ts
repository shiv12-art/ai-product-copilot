import { DiscoveryReport } from '@/lib/types/discovery'

export function generateValidationPlan(discovery: DiscoveryReport): string {
  const { assumptions, personas, recommendations } = discovery

  return `# Validation Plan

## Phase 1: Problem Validation (Weeks 1-2)

### Objective
Confirm that the problem is real, frequent, and painful to target users.

### Methodology
**Customer Interviews (10-15 target users)**
- Interview script focused on current pain
- Time spent on problem area
- Cost/impact of current workaround
- Willingness to pay for solution

**Success Criteria**
- 80%+ confirm problem matches our understanding
- Average pain impact score > 7/10
- Frequency confirmed as "constant" or "frequent"

### Key Questions
1. "What's your biggest frustration with ${discovery.insights.primaryProblem.toLowerCase()}?"
2. "How much time does this cost you per week?"
3. "What would solving this be worth to you?"
4. "How would you measure improvement?"

### Contingency
If <80% confirm: Pivot problem statement or target segment

---

## Phase 2: Solution Validation (Weeks 3-4)

### Objective
Validate that our proposed solution actually addresses the pain.

### Methodology
**Prototype Testing (5-10 users)**
- Create mockup/prototype of MVP
- Show target users the prototype
- Gather feedback on approach
- Test willingness to use

**Success Criteria**
- 70%+ say solution would solve their problem
- 60%+ willing to try beta version
- Average feature relevance score > 7/10

### Key Questions
1. "Would this approach solve your problem?"
2. "What's missing from this solution?"
3. "Would you use this if it existed?"
4. "What concerns do you have?"

### Contingency
If <70% validation: Go back to problem understanding

---

## Phase 3: Market Validation (Weeks 5-6)

### Objective
Confirm market size and willingness to pay.

### Methodology
**TAM Analysis**
- Industry research (Gartner, Forrester)
- Customer segment analysis
- Addressable market calculation

**Pricing Survey (50+ users)**
- Present pricing tiers
- Measure willingness to pay
- Test different price points
- Gauge feature value

**Landing Page Test**
- Create simple landing page
- Drive 1,000+ visitors
- Measure conversion to email signup
- Target: 10%+ conversion rate

**Success Criteria**
- Confirmed TAM > \$100M
- 40%+ willing to pay \$10-50/month
- Landing page conversion > 5%

### Contingency
If TAM < \$100M: Pivot to adjacent market

---

## Phase 4: MVP Validation (Weeks 7-12)

### Objective
Launch MVP with early users, measure key metrics.

### Beta Program (100 users)
- Free access for 30-60 days
- Daily communication & support
- Feedback surveys weekly
- Usage analytics tracking

### Success Criteria
- 50%+ weekly active users
- NPS > 30
- 40%+ willing to become paying customers
- Bug reports < 5 per week

### Key Metrics
- Sign-up to first use: < 5 minutes
- Feature discovery rate: > 70%
- Help ticket resolution: < 24 hours
- User satisfaction: > 4/5

---

## Phase 5: Business Model Validation (Week 8+)

### Objective
Confirm freemium model works and unit economics are viable.

### Methodology
**Cohort Analysis**
- Track conversion from free to paid
- Measure churn by cohort
- Calculate CAC and LTV
- Model growth scenarios

**Customer Feedback**
- Pricing satisfaction survey
- Feature value ranking
- Enterprise use case interviews
- Sales cycle assessment

**Success Criteria**
- Free-to-paid conversion: > 5%
- LTV > 3x CAC
- Viral coefficient > 1.1
- 90+ day retention > 50%

---

## Key Assumptions to Validate

### Critical Assumptions
${assumptions.filter(a => a.criticality === 'critical').map((a, i) => `
**${i + 1}. ${a.statement}**
- Confidence: ${a.confidence}%
- Validation Methods: ${a.validationMethods.slice(0, 2).join(', ')}
- Timeline: ${a.timeToValidate}
- If wrong: ${a.consequenceIfWrong}
`).join('\n')}

### High Priority Assumptions
${assumptions.filter(a => a.criticality === 'high').map((a, i) => `
**${i + 1}. ${a.statement}**
- Validation: ${a.validationMethods[0]}
`).join('\n')}

---

## Validation Timeline

| Phase | Timeline | Budget | Key Metric |
|-------|----------|--------|-----------|
| Problem | Weeks 1-2 | \$2k | 80%+ confirm |
| Solution | Weeks 3-4 | \$3k | 70%+ validate |
| Market | Weeks 5-6 | \$5k | 10%+ conversion |
| MVP | Weeks 7-12 | \$50k | NPS > 30 |
| Business | Week 8+ | \$10k | LTV/CAC > 3x |
| **Total** | **12 weeks** | **\$70k** | **Go/No-Go** |

---

## Go/No-Go Criteria

### GO (Proceed to Scale)
- ✅ Problem validated by 80%+ users
- ✅ Solution scores > 70%
- ✅ Free-to-paid conversion > 5%
- ✅ NPS > 30
- ✅ LTV/CAC > 3x

### NO-GO (Pivot or Stop)
- ❌ Problem validation < 60%
- ❌ Solution scores < 50%
- ❌ Free-to-paid conversion < 2%
- ❌ NPS < 10
- ❌ LTV/CAC < 1.5x

---

## Feedback Loop

### Weekly
- Monitor usage analytics
- Respond to user feedback
- Track key metrics

### Monthly
- Analyze cohort retention
- Gather customer interviews
- Adjust product roadmap

### Quarterly
- Full market assessment
- Competitive analysis update
- Strategy review & pivot decision
`
}
