import { ProductCategory, KeywordResult } from '@/types/generation'

export async function generateCompetitiveArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string> {
  const keywordTexts = keywords.slice(0, 3).map((k) => k.word)

  const markdown = `# Competitive Analysis

## Market Overview
**Problem Space:** ${problemStatement}
**Category:** ${category.replace('_', ' ').toUpperCase()}
**Market Size:** Growing demand for ${keywordTexts[0]} solutions

## Competitive Landscape

### Direct Competitors
1. **Incumbent Leaders**
   - Established players with strong brand recognition
   - Large customer base and significant resources
   - Mature feature sets
   - High switching costs

2. **Emerging Challengers**
   - Innovative features and modern UX
   - Agile product development
   - Lower price points
   - Strong engineering teams

3. **Niche Specialists**
   - Deep expertise in specific use cases
   - Personalized support
   - Flexible pricing models
   - Limited scale

### Indirect Competitors
- Legacy solutions (Excel, manual processes)
- In-house custom solutions
- Point solutions addressing parts of the problem
- Manual service providers

## Competitive Positioning

### Our Differentiation
**Primary Advantage:** Focus on ${keywordTexts[0] || 'core problem'}
- Streamlined ${keywordTexts[1] || 'user experience'}
- Superior ${keywordTexts[2] || 'performance'} capabilities
- Modern, intuitive interface

### Competitive Moat
- **Technology:** Proprietary algorithms and architecture
- **Network Effects:** Community and ecosystem growth
- **Brand:** Strong positioning and customer loyalty
- **Data:** Accumulated insights and analytics

## Market Entry Strategy

### Blue Ocean Approach
- Uncontested market space
- Focus on ${keywordTexts[0]} as the key differentiator
- Premium positioning for early adopters
- Expand to mainstream over time

### Key Success Factors
1. **Product Excellence:** Superior feature set
2. **User Experience:** Intuitive and delightful
3. **Customer Success:** Onboarding and support
4. **Community:** Active user engagement
5. **Innovation:** Continuous feature development

## Competitive Advantages Over Top 3 Competitors

| Aspect | Competitor A | Competitor B | Competitor C | **Our Product** |
|--------|---|---|---|---|
| ${keywordTexts[0] || 'Core Feature'} | Partial | Good | Basic | **Excellent** |
| User Experience | Legacy | Good | Average | **Modern** |
| Pricing | Enterprise | Mid-market | Budget | **Flexible** |
| Support | Limited | Responsive | Self-serve | **Proactive** |
| Integration | Basic | Good | Excellent | **Comprehensive** |

## Threat Analysis

### High Threats
- Large tech companies entering market
- Price wars from competitors
- Open source alternatives

### Medium Threats
- Product feature parity
- Customer acquisition costs
- Talent competition

### Low Threats
- Regulatory changes
- Technology obsolescence
- Market consolidation

## Recommendations

### To Win Market Share
1. **Lead on ${keywordTexts[0]}** - Make it your superpower
2. **Superior UX** - Be 10x easier to use
3. **Community First** - Build organic growth
4. **Strategic Partnerships** - Expand reach faster
5. **Customer Obsession** - Listen and iterate

### To Defend Position
- Patent key innovations
- Build strong brand loyalty
- Create high switching costs
- Maintain technology leadership
- Invest in customer success

---
*Market analysis for ${category}*
*Updated: ${new Date().toLocaleDateString()}*
`

  return markdown
}
