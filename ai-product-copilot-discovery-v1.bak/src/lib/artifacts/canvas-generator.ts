import { DiscoveryReport } from '@/lib/types/discovery'

export function generateProductCanvas(discovery: DiscoveryReport, problemStatement: string): string {
  const { insights, personas, marketAnalysis } = discovery

  return `# Business Model Canvas

## 1. Key Partners
- Developer communities & forums
- IDE providers (VS Code, JetBrains, etc.)
- Enterprise procurement teams
- Open source foundations

## 2. Key Activities
- Context-aware AI model training
- IDE plugin development & maintenance
- Integration with code repositories
- Performance optimization
- Customer support & education

## 3. Key Resources
- Machine learning infrastructure
- Engineering team (AI/ML experts)
- IDE extension framework knowledge
- Customer relationships
- Code dataset & training data

## 4. Value Propositions
**For ${personas[0]?.jobTitle || 'Primary Users'}:**
- Reduce boilerplate code writing by 50%+
- Context-aware code suggestions
- Works within their IDE workflow
- Faster development cycles

**For ${personas[1]?.jobTitle || 'Secondary Users'}:**
- Faster team onboarding
- Improved code quality
- Better developer productivity metrics
- Reduced time-to-productivity

## 5. Customer Relationships
- Freemium self-serve model (developers)
- Direct sales (enterprise teams)
- Community engagement & feedback loops
- GitHub/Stack Overflow presence

## 6. Channels
- IDE marketplaces (VS Code Extensions, JetBrains Marketplace)
- Developer communities (GitHub, Stack Overflow)
- Direct outreach to engineering teams
- Content marketing & technical blogs
- Developer conferences

## 7. Customer Segments
**Primary:** ${personas[0]?.jobTitle || 'Developers'}
- Pain: ${insights.primaryProblem}
- Frequency: ${insights.frequency}
- Urgency: ${insights.urgencyLevel}

**Secondary:** ${personas[1]?.jobTitle || 'Engineering Managers'}
- Pain: Team productivity & ramp time
- Concern: Code quality & retention

## 8. Cost Structure
- Infrastructure costs (model serving, storage)
- Engineering team (R&D, maintenance)
- Go-to-market (marketing, sales)
- Customer support
- Plugin maintenance across IDE versions

## 9. Revenue Streams
- **Freemium subscription:** Basic features free, premium at $10-20/month
- **Team plans:** $50-200/month for 5-50 developers
- **Enterprise:** Custom pricing with on-premise option
- **API access:** For tool integrations

---

## Market Context
- **TAM:** ${marketAnalysis.tam}
- **SAM:** ${marketAnalysis.sam}
- **SOM:** ${marketAnalysis.som}
- **Competitive Intensity:** ${insights.competitiveIntensity}
`
}
