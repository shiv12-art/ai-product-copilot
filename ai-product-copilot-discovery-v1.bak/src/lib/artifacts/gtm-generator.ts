import { DiscoveryReport } from '@/lib/types/discovery'

export function generateGTM(discovery: DiscoveryReport, category: string): string {
  const { personas, marketAnalysis, insights } = discovery

  return `# Go-to-Market Strategy

## 1. Market Opportunity

### Market Size
- **TAM:** ${marketAnalysis.tam}
- **SAM:** ${marketAnalysis.sam}
- **SOM:** ${marketAnalysis.som}

### Target Market
- **Primary:** ${personas[0]?.jobTitle || 'Target Users'}
- **Secondary:** ${personas[1]?.jobTitle || 'Stakeholders'}
- **Total Addressable:** ${insights.affectedUsers}

---

## 2. Positioning & Messaging

### Core Message
"${insights.primaryProblem} Stop wasting time on boilerplate. Build faster."

### Value Proposition
**For ${personas[0]?.name}:** ${personas[0]?.successMetric || 'Achieve your goals faster'}

**For ${personas[1]?.name}:** ${personas[1]?.successMetric || 'Enable team success'}

### Key Differentiators
1. Context-aware and intelligent
2. Seamless IDE integration
3. Privacy-first approach
4. Offline capability
5. Industry-specific models

---

## 3. Customer Acquisition Strategy

### Phase 1: Awareness (Months 1-3)
- **Channels:** Developer blogs, Twitter/X, GitHub discussions
- **Content:** "How we solve ${insights.primaryProblem}"
- **Tactics:** Technical webinars, open source contributions
- **Target:** Reach 50,000 developers

### Phase 2: Trial (Months 2-4)
- **Channels:** Product Hunt, Hacker News, dev.to
- **Offer:** Free tier (unlimited usage for 30 days)
- **Tactics:** Landing page optimization, influencer partnerships
- **Target:** 5,000 sign-ups

### Phase 3: Conversion (Months 3+)
- **Channels:** Direct outreach to high-value teams
- **Offer:** Team plans, enterprise trials
- **Tactics:** Sales demos, ROI calculators
- **Target:** 500 paying customers

### Phase 4: Scale (Year 1+)
- **Channels:** IDE marketplaces, partnerships
- **Offer:** Usage-based pricing, enterprise editions
- **Tactics:** Case studies, customer testimonials
- **Target:** 5,000+ paying customers

---

## 4. Pricing Strategy

### Freemium Model
- **Free Tier:** 50 API calls/month, basic features
- **Pro:** \$10/month, unlimited API, priority support
- **Team:** \$50/month, for 5 developers
- **Enterprise:** Custom pricing for 50+ developers

### Revenue Projection
- Year 1: \$500k ARR (5,000 customers @ \$100 ARPU)
- Year 2: \$3M ARR
- Year 3: \$10M+ ARR

---

## 5. Distribution Channels

### Direct
- Self-service landing page
- Email marketing to developer lists
- Sales team for enterprise deals

### Partnerships
- IDE provider partnerships (JetBrains, Visual Studio)
- Cloud platform integrations (GitHub, GitLab)
- Developer tool platforms (ProductHunt, DevTools)

### Community
- Open source contributions
- Developer conferences
- Community forums & discussions

---

## 6. Customer Success Plan

### Onboarding
- 15-minute quickstart guide
- Video tutorials
- In-app guided tour

### Retention
- Monthly feature updates
- Community support forums
- Email engagement campaigns
- NPS monitoring & follow-up

### Expansion
- Usage analytics dashboard
- Upgrade prompts at usage limits
- Customer success calls at 90 days

---

## 7. Competitive Strategy

### vs. Incumbents
- **Advantage:** Better UX, context awareness, privacy
- **Strategy:** Focus on underserved segments
- **Messaging:** "Faster, easier, smarter"

### vs. Open Source
- **Advantage:** Enterprise support, SLAs
- **Strategy:** Offer managed hosting
- **Messaging:** "Open source + Pro support"

---

## 8. Timeline

| Phase | Timeline | Goals | Budget |
|-------|----------|-------|--------|
| MVP Beta | Months 1-2 | 100 beta users | \$50k |
| Launch | Months 2-3 | 5,000 sign-ups | \$100k |
| Growth | Months 4-6 | 500 paying customers | \$200k |
| Scale | Months 7-12 | 5,000 customers | \$300k |
| **Total Year 1** | **12 months** | **\$500k ARR** | **\$650k** |

---

## 9. Success Metrics
- Customer acquisition cost (CAC): < \$100
- Lifetime value (LTV): > \$1,000
- CAC payback period: < 12 months
- Monthly churn: < 5%
- NPS: > 50
`
}
