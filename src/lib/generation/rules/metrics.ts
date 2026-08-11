import { ProductCategory, KeywordResult } from '@/types/generation'

export async function generateMetricsArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string> {
  const keywordTexts = keywords.slice(0, 3).map((k) => k.word)

  const markdown = `# Success Metrics & KPIs

## Executive Summary
**Product Vision:** ${problemStatement}
**Success Criteria:** Clear, measurable indicators of product-market fit and business growth

## Core Business Metrics

### Growth Metrics
- **Monthly Recurring Revenue (MRR):** \$0 → \$100K by Month 12
- **Annual Run Rate (ARR):** Track growth trajectory
- **Customer Acquisition Cost (CAC):** < \$500
- **Lifetime Value (LTV):** > \$5,000
- **LTV:CAC Ratio:** Target ≥ 3:1

### Retention & Churn
- **Monthly Churn Rate:** Target < 5%
- **Annual Retention:** Target > 80%
- **Customer Lifetime:** 20+ months
- **Win-back Rate:** 10-15% of churned customers

### Market Penetration
- **Total Addressable Market (TAM):** \$XXX Million
- **Serviceable Addressable Market (SAM):** \$XXX Million
- **Market Share Year 1:** 0.1%
- **Market Share Year 3:** 1-2%

## User Engagement Metrics

### Activation
- **Sign-up to First Use:** < 5 minutes
- **First ${keywordTexts[0]} Action:** Within 24 hours
- **Activation Rate:** > 40% of sign-ups

### Usage
- **Daily Active Users (DAU):** Grow 10% MoM
- **Weekly Active Users (WAU):** Grow 15% MoM
- **Monthly Active Users (MAU):** Grow 20% MoM
- **DAU/MAU Ratio:** Target > 40%

### Engagement
- **Session Frequency:** 5+ sessions/week
- **Session Duration:** 15+ minutes average
- **Feature Adoption:** 70%+ use core features
- **Advanced Features:** 30%+ use advanced capabilities

## Product Quality Metrics

### Performance
- **Page Load Time:** < 2 seconds
- **API Response Time:** < 200ms
- **Uptime:** 99.9% SLA
- **Error Rate:** < 0.1%

### Reliability
- **Mean Time to Resolution (MTTR):** < 1 hour
- **System Availability:** 99.95%
- **Data Integrity:** 100%
- **Security Incidents:** Zero in production

### User Experience
- **Net Promoter Score (NPS):** Target 50+
- **Customer Satisfaction (CSAT):** Target 4.5/5
- **System Usability Scale (SUS):** Target 70+
- **Task Completion Rate:** > 90%

## Operational Metrics

### Team Efficiency
- **Feature Delivery Velocity:** 10+ features/quarter
- **Bug Fix Time:** < 48 hours
- **Development Cycle:** 2-week sprints
- **Team Productivity:** 70% sprint completion

### Cost Management
- **Cost Per Customer Acquired:** < \$500
- **Cost Per Retention:** < \$50/month
- **Operating Margin:** Target 40%+
- **Customer Support Cost:** < 15% of ARR

## Revenue Metrics

### Pricing & Monetization
- **Average Revenue Per User (ARPU):** Grow 15% YoY
- **Annual Contract Value (ACV):** > \$5,000
- **Expansion Revenue:** 20% of new revenue
- **Upsell/Cross-sell Rate:** 15% of customer base

### Conversion Funnel
- **Trial Signup Rate:** 10% of visitors
- **Trial to Paid:** 30% conversion
- **Free to Paid:** 20% conversion
- **Enterprise Deals:** 5-10 per year

## Customer Metrics

### Satisfaction
- **Customer Effort Score (CES):** < 3/5
- **First Response Time:** < 2 hours
- **Resolution Rate First Contact:** > 80%
- **Support Ticket Volume:** < 5 per 100 MAU

### Loyalty
- **Net Revenue Retention (NRR):** 110%+
- **Customer Promoter Score:** 60%+
- **Referral Rate:** 10% of customers
- **Repeat Purchase Rate:** 80%+

## Strategic Milestones

### Year 1 Targets
- [ ] Product-Market Fit (PMF) achieved
- [ ] 1,000+ active users
- [ ] \$100K MRR
- [ ] Net Promoter Score > 40
- [ ] 80%+ feature adoption

### Year 2 Targets
- [ ] 10,000+ active users
- [ ] \$1M+ MRR
- [ ] NPS > 50
- [ ] Net Revenue Retention > 110%
- [ ] Enterprise customer base

### Year 3 Targets
- [ ] 50,000+ active users
- [ ] \$5M+ MRR
- [ ] Market leadership position
- [ ] 2%+ market share
- [ ] Path to profitability

## Measurement Framework

### Weekly Reviews
- DAU, WAU, MAU trends
- Activation metrics
- Critical bugs/incidents
- Customer feedback summary

### Monthly Reviews
- Revenue and retention metrics
- Feature adoption rates
- Customer satisfaction scores
- Cohort analysis

### Quarterly Business Reviews (QBRs)
- Strategic progress against milestones
- Competitive positioning updates
- Financial performance and forecasts
- Roadmap adjustments

### Annual Strategy Sessions
- Market opportunity reassessment
- Product vision validation
- Financial modeling for next 3 years
- Organizational alignment

## Key Hypotheses to Validate

1. **${keywordTexts[0]} professionals** value the core offering
2. **Price point** of \$XXX/month is acceptable
3. **Freemium model** drives \$500+ LTV
4. **${keywordTexts[1] || 'Feature'}}** is table stakes for adoption
5. **Partner integrations** accelerate growth 2x

---
*Metrics Dashboard Active*
*Last Updated: ${new Date().toLocaleDateString()}*
`

  return markdown
}
