import { DiscoveryReport } from '@/lib/types/discovery'

export function generatePRD(discovery: DiscoveryReport, problemStatement: string): string {
  const { insights, personas, recommendations } = discovery

  return `# Product Requirements Document

## Executive Summary
**Problem:** ${insights.primaryProblem}

**Solution:** ${recommendations.firstFeatures[0] || 'Intelligent product solution'}

**Target Users:** ${insights.affectedUsers}

**Success Metric:** ${personas[0]?.successMetric || 'Achieve primary user goal'}

---

## 1. Problem Statement

### The Problem
${problemStatement}

### Affected Users
${insights.affectedUsers}

### Pain Points
${insights.rootCauses.map((cause, i) => `${i + 1}. ${cause}`).join('\n')}

### Current Workarounds
${insights.currentWorkarounds.map((w, i) => `${i + 1}. ${w}`).join('\n')}

### Cost of Inaction
${insights.costOfStatusQuo}

---

## 2. Personas & Use Cases

### Primary Persona: ${personas[0]?.name}
**Title:** ${personas[0]?.jobTitle}
**Pain:** ${personas[0]?.primaryPain}
**Goal:** ${personas[0]?.successMetric}

### Secondary Persona: ${personas[1]?.name || 'Secondary User'}
**Title:** ${personas[1]?.jobTitle || 'Stakeholder'}
**Pain:** ${personas[1]?.primaryPain || 'Indirect impact'}
**Goal:** ${personas[1]?.successMetric || 'Enable primary user'}

---

## 3. Product Scope

### MVP Features (Phase 1)
${recommendations.firstFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')}

### Phase 2 Features
- Enhanced analytics and insights
- Advanced customization options
- Team collaboration features
- Integration with popular tools

### Phase 3 Features
- Enterprise deployment options
- Custom model training
- Advanced reporting and ROI tracking

---

## 4. Success Metrics
- User adoption rate: 50%+ of target segment in Year 1
- Retention: 60%+ Month-over-month retention
- Engagement: Daily active users (DAU) > 30% of signups
- NPS: Target score of 50+
- Revenue: \$${recommendations.mvpScope[0] ? '500k' : '1M'}+ ARR by end of Year 1

---

## 5. Risks & Mitigations
${recommendations.risks.map((risk, i) => `${i + 1}. **${risk}**\n   - Mitigation: Continuous competitive monitoring`).join('\n\n')}

---

## 6. Go-to-Market
- **Launch:** Beta with 100 early adopters
- **Channels:** Developer communities, IDE marketplaces
- **Pricing:** Freemium model with $10-50/month tiers
- **Year 1 Goal:** 5,000 paying customers

---

## 7. Timeline
- **Weeks 1-4:** MVP development & internal testing
- **Weeks 5-6:** Beta launch with 100 users
- **Weeks 7-8:** Gather feedback & iterate
- **Week 9+:** General availability launch
`
}
