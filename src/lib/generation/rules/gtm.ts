import { ProductCategory, KeywordResult } from '@/types/generation'

export async function generateGTMArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string> {
  const positioning = generatePositioning(category, keywords)
  const pricingTiers = generatePricingTiers(category)
  const launchTimeline = generateLaunchTimeline()

  const markdown = `# Go-to-Market Strategy

## 1. Market Positioning
${positioning}

## 2. Target Customer Profile (ICP)
- **Primary Segment:** ${generatePrimarySegment(category)}
- **Secondary Segment:** ${generateSecondarySegment(category)}
- **Company Size:** ${generateCompanySize(category)}
- **Industry:** ${generateIndustry(category)}
- **Annual Budget:** ${generateBudget(category)}

## 3. Competitive Differentiation
- Unique value proposition
- Superior user experience
- Faster implementation
- Better customer support
- Innovative feature set

## 4. Pricing Strategy

${pricingTiers}

## 5. Distribution Channels
- Direct sales
- Self-serve online
- Partner ecosystem
- Community engagement
- Content marketing
- Paid advertising

## 6. Marketing & Sales Plan

### Pre-Launch Phase (Weeks 1-4)
- Build landing page and messaging
- Create content assets
- Set up email marketing
- Establish social media presence

### Launch Phase (Weeks 5-8)
- Product Hunt launch
- Press releases and media outreach
- Community announcements
- Early access program

### Growth Phase (Months 3-6)
- Paid acquisition campaigns
- Strategic partnerships
- Content marketing acceleration
- Sales outreach

## 7. Launch Timeline
${launchTimeline}

## 8. Success Metrics
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- CAC payback period
- Product launch awareness
- Early adopter conversion rate
- First month retention
- Net Promoter Score (NPS)

## 9. Budget Allocation
- Product development: 40%
- Marketing: 30%
- Sales: 20%
- Operations: 10%

## 10. Risk Mitigation
- Start with targeted niche
- Validate demand early
- Build strategic partnerships
- Maintain product momentum
- Monitor competitive landscape

---
*Created: ${new Date().toLocaleDateString()}*
`

  return markdown
}

function generatePositioning(category: ProductCategory, keywords: KeywordResult[]): string {
  const positioning: Record<ProductCategory, string> = {
    saas: 'Position as the productivity solution for distributed teams, emphasizing collaboration and efficiency.',
    b2c_app: 'Position as the essential lifestyle app for goal-oriented individuals.',
    marketplace: 'Position as the trusted platform connecting buyers and sellers.',
    hardware: 'Position as the smart solution for modern living.',
    service: 'Position as the platform that connects service providers with customers.',
    community: 'Position as the hub for passionate community members.',
    ai_tool: 'Position as the accessible AI platform for developers.',
  }
  return positioning[category] || positioning.saas
}

function generatePrimarySegment(category: ProductCategory): string {
  const segments: Record<ProductCategory, string> = {
    saas: 'Mid-market B2B companies',
    b2c_app: 'Working professionals aged 25-40',
    marketplace: 'Small business owners and consumers',
    hardware: 'Early adopters and tech enthusiasts',
    service: 'Independent service providers',
    community: 'Online community enthusiasts',
    ai_tool: 'Software developers',
  }
  return segments[category] || segments.saas
}

function generateSecondarySegment(category: ProductCategory): string {
  const segments: Record<ProductCategory, string> = {
    saas: 'Enterprise organizations',
    b2c_app: 'College students and early career',
    marketplace: 'Casual sellers and buyers',
    hardware: 'Mainstream consumers',
    service: 'Large service companies',
    community: 'Content creators',
    ai_tool: 'Data scientists and researchers',
  }
  return segments[category] || segments.saas
}

function generateCompanySize(category: ProductCategory): string {
  const sizes: Record<ProductCategory, string> = {
    saas: '10-1000 employees',
    b2c_app: 'Individual consumers',
    marketplace: 'Any size',
    hardware: 'Any demographic',
    service: '1-100 employees',
    community: 'Any size',
    ai_tool: 'Any size',
  }
  return sizes[category] || sizes.saas
}

function generateIndustry(category: ProductCategory): string {
  const industries: Record<ProductCategory, string> = {
    saas: 'All industries with distributed teams',
    b2c_app: 'All industries, all sectors',
    marketplace: 'All industries',
    hardware: 'Home automation, consumer electronics',
    service: 'Professional services, consulting',
    community: 'All niches and interests',
    ai_tool: 'Software and AI-driven companies',
  }
  return industries[category] || industries.saas
}

function generateBudget(category: ProductCategory): string {
  const budgets: Record<ProductCategory, string> = {
    saas: '\$50,000 - \$500,000 annually',
    b2c_app: '\$0 - \$500 (consumer)',
    marketplace: 'Variable',
    hardware: '\$100 - \$5,000',
    service: '\$10,000 - \$100,000',
    community: 'Free to premium',
    ai_tool: '\$100 - \$100,000+',
  }
  return budgets[category] || budgets.saas
}

function generatePricingTiers(category: ProductCategory): string {
  const pricingMap: Record<ProductCategory, string> = {
    saas: `### Starter (\$99/month)
- Core features
- Up to 10 users
- Community support

### Professional (\$499/month)
- All features
- Up to 100 users
- Priority support
- Custom integrations

### Enterprise (Custom)
- Dedicated support
- Custom features
- White-label options`,

    b2c_app: `### Free
- Core features
- Limited storage

### Premium (\$4.99/month)
- Unlimited features
- Ad-free experience
- Cloud sync

### Family (\$9.99/month)
- Up to 5 family members`,

    marketplace: `- Commission: 5-15% per transaction
- Seller subscription (optional): \$9.99/month
- Featured listings: \$2.99 each`,

    hardware: `### Standard Edition
- Hardware: \$199
- 1-year warranty

### Pro Edition
- Hardware: \$349
- Premium features
- Extended support

### Subscription Service: \$4.99/month
- Cloud storage
- Premium analytics`,

    service: `### Provider (Free)
- Listing management
- 10% commission on bookings

### Provider Pro (\$9.99/month)
- Advanced analytics
- 5% commission
- Featured listings

### Customer (Free)
- Browse and book services`,

    community: `### Free
- Participate in discussions
- Access community content

### Pro (\$9.99/month)
- Ad-free experience
- Premium features
- Exclusive content

### Moderator (Free/Custom)
- Moderation tools`,

    ai_tool: `### Free Tier
- 1,000 API calls/month
- Basic features

### Pay-as-You-Go
- \$0.01 per API call
- No minimum

### Pro (\$99/month)
- 100,000 API calls
- Priority support
- Advanced features

### Enterprise (Custom)
- Dedicated infrastructure
- Custom SLAs`,
  }

  return pricingMap[category] || pricingMap.saas
}

function generateLaunchTimeline(): string {
  return `
### Week 1-2: Soft Launch
- Beta access for early adopters
- Gather initial feedback
- Iterate on product

### Week 3-4: Full Launch
- Public release announcement
- Product Hunt launch
- Press outreach

### Month 2: Optimization
- Fix bugs and issues
- Implement early feedback
- Expand features

### Month 3+: Scale
- Aggressive marketing
- Customer acquisition
- Feature expansion
`
}
