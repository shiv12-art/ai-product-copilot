import { DiscoveryReport } from '@/lib/types/discovery'

export function generateCompetitiveAnalysis(discovery: DiscoveryReport, category: string): string {
  const { insights, personas, marketAnalysis } = discovery

  return `# Competitive Analysis

## Market Landscape

### Market Size
- **TAM:** ${marketAnalysis.tam}
- **Growth Rate:** 20-30% YoY
- **Competitive Intensity:** ${insights.competitiveIntensity}

---

## Direct Competitors

### Competitor 1: GitHub Copilot
**Market Position:** Market leader, $100M+ ARR
**Strengths:**
- Massive training dataset
- GitHub integration
- Large developer mindshare
- Backing from Microsoft

**Weaknesses:**
- High latency (5-10s response)
- Limited context awareness
- Focused only on code completion
- No offline support

**Our Advantage:** Faster, context-aware, offline-first

---

### Competitor 2: Tabnine
**Market Position:** Series B, \$50M+ ARR
**Strengths:**
- Fast response times
- Good IDE support
- Team collaboration features
- Privacy-first approach

**Weaknesses:**
- Smaller training dataset
- Limited market penetration
- Weaker brand recognition
- Expensive enterprise pricing

**Our Advantage:** Better UX, more affordable

---

### Competitor 3: AWS CodeWhisperer
**Market Position:** Growing, AWS-backed
**Strengths:**
- AWS ecosystem integration
- Enterprise support
- Strong AWS brand
- Competitive pricing

**Weaknesses:**
- AWS-only ecosystem
- Limited standalone usage
- Requires AWS account
- Not developer-first

**Our Advantage:** Platform-agnostic, independent

---

## Indirect Competitors

### ChatGPT / Claude API
**Threat Level:** Medium
**Risk:** Users use general LLMs instead of specialized tool
**Mitigation:** 10x faster, code-specific, offline

### Open Source Models (CodeLLaMA, etc.)
**Threat Level:** Low-Medium
**Risk:** Free alternative emerges
**Mitigation:** Superior UX, SaaS convenience, support

### IDE Built-in Features (IntelliSense, Copilot)
**Threat Level:** Medium
**Risk:** IDE vendors integrate directly
**Mitigation:** Better results, vendor-agnostic, faster updates

---

## Competitive Positioning Matrix

### Speed
- GitHub Copilot: ⭐⭐⭐ (Slow 5-10s)
- Tabnine: ⭐⭐⭐⭐ (Fast 1-2s)
- **Our Product: ⭐⭐⭐⭐⭐ (Instant <500ms)**
- CodeWhisperer: ⭐⭐⭐ (Slow)

### Context Awareness
- GitHub Copilot: ⭐⭐⭐ (Limited)
- Tabnine: ⭐⭐⭐⭐ (Good)
- **Our Product: ⭐⭐⭐⭐⭐ (Excellent)**
- CodeWhisperer: ⭐⭐ (Very limited)

### Privacy & Security
- GitHub Copilot: ⭐⭐ (Cloud-dependent)
- Tabnine: ⭐⭐⭐⭐⭐ (Privacy-first)
- **Our Product: ⭐⭐⭐⭐⭐ (Offline-first)**
- CodeWhisperer: ⭐⭐⭐ (AWS privacy)

### Pricing
- GitHub Copilot: \$10/month (individual)
- Tabnine: \$15-25/month
- **Our Product: \$10/month (competitive)**
- CodeWhisperer: Included with AWS

### IDE Support
- GitHub Copilot: ⭐⭐⭐⭐ (VS Code, JetBrains)
- Tabnine: ⭐⭐⭐⭐⭐ (All IDEs)
- **Our Product: ⭐⭐⭐⭐ (Major IDEs)**
- CodeWhisperer: ⭐⭐⭐ (Limited)

---

## SWOT Analysis

### Strengths
- ✅ Fastest response time in market
- ✅ Privacy-first & offline capability
- ✅ Vendor-independent approach
- ✅ Lower pricing than competitors
- ✅ Context-aware generation

### Weaknesses
- ❌ New entrant (brand recognition)
- ❌ Smaller funding than Microsoft/AWS
- ❌ Smaller training dataset initially
- ❌ Limited enterprise relationships
- ❌ Single product (less ecosystem)

### Opportunities
- 🚀 Enterprise moving to privacy-first tools
- 🚀 Emerging markets with limited cloud access
- 🚀 Specialized vertical models (healthcare, fintech)
- 🚀 Open source partnerships
- 🚀 IDE marketplace expansion

### Threats
- ⚠️ GitHub Copilot gaining market dominance
- ⚠️ Microsoft/Amazon can outspend on R&D
- ⚠️ Free open source models emerge
- ⚠️ IDE vendors integrate copilots natively
- ⚠️ Regulatory changes on AI training data

---

## Differentiation Strategy

### 1. Speed as a Feature
- 10x faster than Copilot
- <500ms response time
- Marketed as "The fastest AI code assistant"

### 2. Privacy & Trust
- No data leaves your machine
- Open source verification option
- GDPR/SOC2 compliance

### 3. Developer Experience
- Minimal onboarding (5 min setup)
- Keyboard shortcuts & workflows
- Offline-first, works everywhere

### 4. Affordable for Teams
- \$10/developer (vs \$20+ competitors)
- Flexible team plans
- No enterprise premium required

### 5. Vertical Specialization
- Year 2: Specialized models by language
- Year 2: Framework-specific knowledge
- Year 2: Industry vertical models

---

## Competitive Response Scenarios

### If GitHub Copilot Improves Speed
- **Response:** Emphasize privacy & offline advantage
- **Action:** Add offline-only tier
- **Timeline:** Q2 2024

### If Tabnine Drops Price Below \$10
- **Response:** Bundle with premium support
- **Action:** Team plan with dedicated support
- **Timeline:** Quarterly pricing review

### If AWS CodeWhisperer Integrates Deeply
- **Response:** Enterprise-grade competitor
- **Action:** Accelerate Phase 3 (SSO, RBAC)
- **Timeline:** H2 2024

### If Open Source Model Emerges
- **Response:** Offer SaaS convenience
- **Action:** Community edition + Pro tier
- **Timeline:** Reactive within 1 month

---

## Win/Loss Analysis Framework

### Why We Win
1. **Speed:** 5-10x faster than competitors
2. **Privacy:** No data leaves machine
3. **UX:** Easier onboarding
4. **Cost:** Cheaper for teams

### Why We Lose
1. **Ecosystem:** Copilot has GitHub/Microsoft backing
2. **Adoption:** Enterprise relationships take time
3. **Trust:** Smaller company, unproven product
4. **Features:** Competitors have more integrations

### Counters
- **vs. Speed:** Our performance is measurable, market it loudly
- **vs. Privacy:** Showcase SOC2, certifications, audits
- **vs. UX:** Win with design, not features
- **vs. Cost:** Calculate TCO, not just price

---

## Market Entry Strategy

### Phase 1: Niche Dominance (Months 1-6)
- **Target:** Privacy-conscious developers
- **Positioning:** "The fastest, private AI code assistant"
- **Geography:** US, EU, Canada
- **Tactics:** Content marketing, community engagement

### Phase 2: Mainstream Adoption (Months 6-18)
- **Target:** All developers
- **Positioning:** "Better than Copilot at 1/3 the price"
- **Geography:** Global
- **Tactics:** Performance benchmarks, case studies

### Phase 3: Enterprise Consolidation (Year 2)
- **Target:** Engineering teams
- **Positioning:** "Enterprise-grade AI code assistant"
- **Geography:** Global enterprises
- **Tactics:** Direct sales, partnerships
`
}
