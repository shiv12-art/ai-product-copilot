import { DiscoveryReport } from '@/lib/types/discovery'

export function generateMetricsAndOKRs(discovery: DiscoveryReport): string {
  const { personas, recommendations, executiveDecision } = discovery

  return `# Key Metrics & OKRs

## Year 1 OKRs

### OKR 1: Achieve Product-Market Fit
**Objective:** Validate the product solves a real problem with willingness to pay

**Key Results:**
1. **NPS Score > 30** by Month 6, > 50 by Month 12
   - Target: 50+ NPS indicates strong product fit
   - Measurement: Monthly NPS survey
   - Baseline: 0 (new product)

2. **Free-to-Paid Conversion > 5%** by Month 9
   - Target: 5% of free users convert to paid
   - Measurement: Analytics tracking
   - Baseline: 0% (MVP stage)

3. **90-Day Retention > 50%** by Month 12
   - Target: 50% of Day 1 users still active at Day 90
   - Measurement: Cohort analysis
   - Baseline: 0% (pre-launch)

**Ownership:** Product & Engineering
**Confidence:** ${executiveDecision.confidenceScore}%

---

### OKR 2: Build Sustainable Unit Economics
**Objective:** Achieve LTV:CAC ratio > 3x and path to profitability

**Key Results:**
1. **CAC < \$100** by Month 12
   - Target: Customer acquisition cost under \$100
   - Measurement: Marketing spend / new customers
   - Baseline: \$0 (no marketing spend yet)

2. **LTV > \$300** by Month 12
   - Target: Lifetime value per customer > \$300
   - Measurement: (ARPU × Lifetime) / Churn
   - Baseline: \$0 (insufficient data)

3. **LTV:CAC Ratio > 3x** by Month 12
   - Target: Every \$1 spent acquires \$3 in LTV
   - Measurement: LTV / CAC
   - Baseline: 0 (pre-launch)

**Ownership:** Finance & Growth
**Confidence:** 65%

---

### OKR 3: Achieve Scale & Growth
**Objective:** Build sustainable business with strong growth trajectory

**Key Results:**
1. **5,000 Paying Customers** by Month 12
   - Target: 5,000 customers paying \$100+ ARPU
   - Measurement: Subscription analytics
   - Baseline: 0

2. **\$500K ARR** by Month 12
   - Target: \$500K annual recurring revenue
   - Measurement: MRR × 12
   - Baseline: \$0

3. **100K Total Registered Users** by Month 12
   - Target: 100K free + paid users
   - Measurement: Active user count
   - Baseline: 0

**Ownership:** Sales & Marketing
**Confidence:** 55%

---

## Core Metrics Dashboard

### User Acquisition Metrics
| Metric | Q1 Target | Q2 Target | Q3 Target | Q4 Target | Owner |
|--------|-----------|-----------|-----------|-----------|-------|
| New Sign-ups | 5,000 | 12,000 | 25,000 | 50,000 | Growth |
| Conversion Rate (Sign-up to Trial) | 8% | 10% | 12% | 15% | Product |
| Paid Conversions | 250 | 600 | 1,200 | 2,500 | Sales |
| Marketing Cost per Acquisition | \$200 | \$150 | \$100 | \$80 | Finance |

### User Engagement Metrics
| Metric | Q1 Target | Q2 Target | Q3 Target | Q4 Target | Owner |
|--------|-----------|-----------|-----------|-----------|-------|
| Daily Active Users (DAU) | 1,000 | 3,000 | 8,000 | 15,000 | Product |
| Weekly Active Users (WAU) | 2,500 | 7,000 | 18,000 | 40,000 | Product |
| Monthly Active Users (MAU) | 5,000 | 12,000 | 25,000 | 50,000 | Product |
| DAU/MAU Ratio | 20% | 25% | 32% | 30% | Product |
| Avg. Sessions per User/Week | 3.5 | 4.0 | 4.5 | 5.0 | Product |

### Retention & Churn Metrics
| Metric | Target | Measurement | Owner |
|--------|--------|-------------|-------|
| Day 1 Retention | > 50% | % users active Day 1 | Product |
| Day 7 Retention | > 40% | % users active Day 7 | Product |
| Day 30 Retention | > 30% | % users active Day 30 | Product |
| Month 3 Retention | > 50% | % paid users active M3 | Product |
| Monthly Churn Rate | < 5% | % churned accounts/month | Finance |
| Annual Churn Rate | < 40% | % churned customers/year | Finance |

### Revenue Metrics
| Metric | Q1 | Q2 | Q3 | Q4 | Full Year |
|--------|----|----|----|----|-----------|
| Monthly Recurring Revenue (MRR) | \$15K | \$35K | \$75K | \$150K | \$175K |
| Annual Recurring Revenue (ARR) | \$180K | \$420K | \$900K | \$1.8M | \$500K avg |
| Average Revenue Per User (ARPU) | \$60 | \$58 | \$62 | \$60 | \$60 |
| Paid User Count | 250 | 600 | 1,200 | 2,500 | 2,500 |
| Revenue Growth (MoM) | - | 133% | 114% | 100% | 110% avg |

### Unit Economics
| Metric | Q1 | Q2 | Q3 | Q4 | Target |
|--------|----|----|----|----|--------|
| CAC (Customer Acquisition Cost) | \$200 | \$150 | \$110 | \$85 | < \$100 |
| LTV (Lifetime Value) | \$180 | \$232 | \$310 | \$360 | > \$300 |
| LTV:CAC Ratio | 0.9x | 1.5x | 2.8x | 4.2x | > 3.0x |
| Payback Period | 40 months | 26 months | 14 months | 9 months | < 12 months |

### Product Metrics
| Metric | Target | Measurement | Owner |
|--------|--------|-------------|-------|
| Feature Adoption Rate | > 70% | % users using top 3 features | Product |
| Feature Success Rate | > 80% | % successful API calls / total | Engineering |
| Time to First Value | < 5 min | Avg time to first success | Product |
| Support Ticket Response Time | < 4 hours | Avg response time | Support |
| Support Ticket Resolution Time | < 24 hours | Avg resolution time | Support |
| Uptime SLA | 99.5% | System availability | Engineering |
| API Response Time | < 500ms | P95 response time | Engineering |

### Customer Satisfaction
| Metric | Q1 | Q2 | Q3 | Q4 | Target |
|--------|----|----|----|----|--------|
| NPS (Net Promoter Score) | 10 | 20 | 35 | 45 | > 50 |
| CSAT (Customer Satisfaction) | 7.0 | 7.5 | 8.0 | 8.2 | > 8.0 |
| Customer Effort Score | 6.5 | 7.0 | 7.5 | 8.0 | > 7.5 |
| Support Quality Rating | 7.0 | 7.5 | 8.0 | 8.2 | > 8.0 |

---

## Leading Indicators (Weekly/Daily)

### Product Engagement
- Active users today: Target 30% of MAU
- New features adopted: Target > 60% within 1 week
- Bugs reported: Target < 2 per week
- API errors: Target < 0.1%

### Growth Metrics
- Sign-ups: Target 1,000/week by Q4
- Free-to-paid conversions: Target 50+/week by Q4
- Customer NPS: Target +1 point/week on average

### Retention Health
- Week 1 retention: Target > 50%
- Churn risk alerts: Target < 5% of paid users at risk

---

## Lagging Indicators (Monthly)

- MRR and ARR growth
- Customer count growth
- Revenue per user trends
- CAC trend
- LTV trend
- LTV:CAC ratio
- Churn rate
- NPS score
- Feature adoption trends

---

## Success Thresholds

### Go (Exceeding Targets)
- ✅ NPS > 40 by Month 6
- ✅ Free-to-paid conversion > 10%
- ✅ ARR > \$750K by Month 12
- ✅ LTV:CAC > 4x
- ✅ Churn < 3% monthly

### Proceed (Meeting Targets)
- ⚠️ NPS 25-40
- ⚠️ Free-to-paid conversion 5-10%
- ⚠️ ARR \$500K-750K
- ⚠️ LTV:CAC 2.5x-4x
- ⚠️ Churn 3-5% monthly

### Caution (Below Targets)
- 🟡 NPS 10-25
- 🟡 Free-to-paid conversion 2-5%
- 🟡 ARR < \$500K
- 🟡 LTV:CAC < 2.5x
- 🟡 Churn > 5% monthly

### Pivot/Stop (Critical Misses)
- ❌ NPS < 10
- ❌ Free-to-paid conversion < 2%
- ❌ ARR < \$250K
- ❌ LTV:CAC < 1.5x
- ❌ Churn > 10% monthly

---

## Reporting Cadence

| Frequency | Owner | Audience |
|-----------|-------|----------|
| Daily | Product | Ops team |
| Weekly | Leadership | Exec team |
| Monthly | Finance | Board |
| Quarterly | Strategy | Investors |

---

## Dashboard Links
- Analytics: [Your Analytics Tool]
- Financial: [Your Finance Tool]
- Customer: [Your CRM]
- Product: [Your Product Analytics]
`
}
