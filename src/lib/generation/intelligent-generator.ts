import { ProductCategory } from '@/types/generation'

interface GenerationContext {
  problemStatement: string
  category: ProductCategory
}

// Competitive analysis database
const competitorsDB: Record<string, string[]> = {
  saas: ['Slack', 'Notion', 'Asana', 'Monday.com', 'Jira', 'Salesforce', 'HubSpot'],
  mobile_app: ['Instagram', 'TikTok', 'Discord', 'Telegram', 'Snapchat', 'WhatsApp'],
  web_app: ['Google Workspace', 'Figma', 'Webflow', 'Zapier', 'Airtable', 'GitHub'],
  marketplace: ['Airbnb', 'Uber', 'Fiverr', 'Etsy', 'TaskRabbit', 'DoorDash'],
  b2c_app: ['Spotify', 'Netflix', 'Uber Eats', 'Amazon', 'PayPal', 'Venmo'],
  hardware: ['Apple', 'Meta', 'DJI', 'Fitbit', 'Ring', 'Oculus'],
  ai_tool: ['ChatGPT', 'GitHub Copilot', 'Midjourney', 'Perplexity', 'Claude', 'Gemini'],
  fintech: ['Robinhood', 'Stripe', 'Square', 'Wise', 'Brex', 'N26'],
  healthcare: ['Teladoc', 'Ro', 'Headspace', 'Calm', 'MyFitnessPal', 'Wearable tech'],
  edtech: ['Coursera', 'Udemy', 'Duolingo', 'Khan Academy', 'Skillshare', 'Chegg'],
  gaming: ['Discord', 'Twitch', 'Steam', 'Epic Games', 'Roblox', 'Fortnite'],
  social: ['Twitter', 'LinkedIn', 'Reddit', 'Mastodon', 'Bluesky', 'Threads'],
  service: ['TaskRabbit', 'Handy', 'Care.com', 'Yelp', 'Thumbtack'],
  community: ['Discord', 'Slack', 'Circle', 'Mighty Networks', 'Tribe'],
}

// Feature suggestions by category
const featureSuggestions: Record<ProductCategory, string[]> = {
  saas: [
    'User authentication & SSO',
    'Real-time collaboration',
    'Data export & API',
    'Custom workflows',
    'Team management',
    'Advanced analytics',
    'Integrations with popular tools',
  ],
  mobile_app: [
    'Push notifications',
    'Offline functionality',
    'Biometric authentication',
    'In-app messaging',
    'Social sharing',
    'Analytics tracking',
    'Dark mode',
  ],
  web_app: [
    'Responsive design',
    'SEO optimization',
    'Performance caching',
    'User authentication',
    'Database synchronization',
    'Admin dashboard',
    'API documentation',
  ],
  marketplace: [
    'Provider verification',
    'Payment processing',
    'Rating & review system',
    'Messaging between parties',
    'Transaction history',
    'Dispute resolution',
    'Search & filtering',
  ],
  b2c_app: [
    'Personalized recommendations',
    'User profiles',
    'Payment integration',
    'Social features',
    'In-app notifications',
    'Search functionality',
    'Data privacy controls',
  ],
  hardware: [
    'Companion mobile app',
    'Cloud synchronization',
    'Firmware updates',
    'Analytics dashboard',
    'Third-party integrations',
    'Battery optimization',
    'Voice control',
  ],
  ai_tool: [
    'Context awareness',
    'Model customization',
    'API access',
    'Batch processing',
    'Fine-tuning capability',
    'Usage analytics',
    'Team collaboration',
  ],
  fintech: [
    'Two-factor authentication',
    'Real-time pricing',
    'Portfolio tracking',
    'Tax reporting',
    'Regulatory compliance',
    'Fraud detection',
    'Mobile wallet',
  ],
  healthcare: [
    'HIPAA compliance',
    'Patient records management',
    'Telemedicine capability',
    'Appointment scheduling',
    'Prescription management',
    'Insurance integration',
    'Health tracking',
  ],
  edtech: [
    'Progress tracking',
    'Personalized learning paths',
    'Gamification',
    'Peer collaboration',
    'Certification programs',
    'Content library',
    'Analytics for instructors',
  ],
  gaming: [
    'Multiplayer capability',
    'In-game chat',
    'Microtransactions',
    'Leaderboards',
    'Social features',
    'Cross-platform play',
    'Anti-cheat system',
  ],
  social: [
    'User profiles',
    'Content feed',
    'Direct messaging',
    'Content moderation',
    'Community guidelines',
    'Trending discovery',
    'Algorithm-based recommendations',
  ],
  service: [
    'Provider matching',
    'Booking system',
    'Payment processing',
    'Quality ratings',
    'Cancellation policy',
    'Customer support',
    'Provider tools',
  ],
  community: [
    'Discussion forums',
    'Member directory',
    'Event hosting',
    'Content library',
    'Member roles & permissions',
    'Analytics dashboard',
    'Moderation tools',
  ],
}

// Extract key insights from problem statement
function extractInsights(problemStatement: string): {
  mainProblem: string
  targetUser: string
  painPoints: string[]
} {
  const sentences = problemStatement.split(/[.!?]+/).map(s => s.trim()).filter(s => s)

  return {
    mainProblem: sentences[0] || problemStatement,
    targetUser: extractTargetUser(problemStatement),
    painPoints: extractPainPoints(problemStatement),
  }
}

function extractTargetUser(text: string): string {
  if (text.includes('developer') || text.includes('engineer')) return 'Developers'
  if (text.includes('team') || text.includes('company')) return 'Teams & Companies'
  if (text.includes('user') || text.includes('people')) return 'Individual Users'
  if (text.includes('student') || text.includes('learn')) return 'Students & Learners'
  if (text.includes('business') || text.includes('enterprise')) return 'Enterprises'
  if (text.includes('creator') || text.includes('professional')) return 'Creators & Professionals'
  return 'Target Users'
}

function extractPainPoints(text: string): string[] {
  const painPoints: string[] = []

  if (text.includes('time') || text.includes('slow')) painPoints.push('Time-consuming processes')
  if (text.includes('scattered') || text.includes('fragmented')) painPoints.push('Fragmented tools & workflows')
  if (text.includes('cost') || text.includes('expensive')) painPoints.push('High costs')
  if (text.includes('complicated') || text.includes('difficult')) painPoints.push('Complexity & learning curve')
  if (text.includes('communication') || text.includes('collaboration')) painPoints.push('Poor communication')
  if (text.includes('access') || text.includes('availability')) painPoints.push('Limited accessibility')
  if (text.includes('quality') || text.includes('inconsistent')) painPoints.push('Inconsistent quality')

  return painPoints.length > 0 ? painPoints : ['Manual processes', 'Tool fragmentation', 'Lack of integration']
}

export function generateIntelligentArtifacts(context: GenerationContext) {
  const { problemStatement, category } = context
  const insights = extractInsights(problemStatement)
  const competitors = competitorsDB[category] || []
  const features = featureSuggestions[category] || []

  return {
    canvas: generateCanvas(insights, category),
    prd: generatePRD(insights, features),
    gtm: generateGTM(insights, category),
    features: generateFeatures(insights, features, category),
    validation: generateValidation(insights),
    competitive: generateCompetitive(insights, competitors, category),
    pitch: generatePitch(insights, category),
  }
}

function generateCanvas(insights: any, category: string): string {
  return `# Product Canvas

## Problem
${insights.mainProblem}

### Pain Points
${insights.painPoints.map(p => `- ${p}`).join('\n')}

## Solution
A dedicated ${category.replace('_', ' ')} solution that directly addresses the identified problems and streamlines the user experience.

## Key Value Propositions
- Solves the core problem efficiently
- User-friendly and intuitive design
- Scalable solution for growth
- Integrated ecosystem approach
- Data-driven insights & analytics

## Target Market
${insights.targetUser}

## Revenue Streams
- Freemium model with premium features
- Subscription-based pricing
- Enterprise licensing
- Usage-based pricing
- Partner commissions (if applicable)

## Key Metrics
- User acquisition cost (CAC)
- Customer lifetime value (LTV)
- Monthly churn rate
- Feature adoption rate
- Net Revenue Retention (NRR)`
}

function generatePRD(insights: any, features: string[]): string {
  return `# Product Requirements Document

## Product Overview
An innovative ${insights.targetUser.toLowerCase()}-focused solution designed to eliminate the friction in their workflow.

## Problem Statement
${insights.mainProblem}

## Success Criteria
- User retention >70% after 30 days
- Feature adoption >60% for core features
- NPS score >50
- Customer satisfaction >4.5/5
- Time-to-value <24 hours

## Core Features
${features.slice(0, 5).map(f => `- **${f}**: Essential capability for user success`).join('\n')}

## Nice-to-Have Features
${features.slice(5).map(f => `- ${f}`).join('\n')}

## Technical Requirements
- Scalable architecture (horizontal scaling)
- 99.9% uptime SLA
- Sub-second response times
- Data encryption in transit and at rest
- API-first design
- Mobile-responsive interface

## User Experience
- Onboarding completion <10 minutes
- Zero friction adoption
- Intuitive navigation
- Accessible design (WCAG 2.1 AA)
- Mobile-first design

## Success Metrics
- DAU/MAU ratio >40%
- Feature usage analytics
- Performance monitoring
- Error tracking & logging
- User behavior analytics`
}

function generateGTM(insights: any, category: string): string {
  const targetMarket = insights.targetUser.toLowerCase()

  return `# Go-to-Market Strategy

## Market Opportunity
Large underserved market of ${targetMarket} seeking better solutions.

## Target Customer Profile
### Primary Persona
- Role: ${insights.targetUser}
- Pain: ${insights.painPoints[0] || 'Operational inefficiency'}
- Budget: Variable by segment
- Buying cycle: 2-4 weeks

### Secondary Personas
- Supporting roles in the organization
- Decision influencers
- Technical champions

## Positioning
"The [Category] solution built specifically for [Target User] who value [Key Value]"

## Launch Strategy

### Phase 1: Early Adopters (Months 1-2)
- Partner with influencers in the space
- Closed beta with 100-500 users
- Feature-driven content & case studies
- Community engagement

### Phase 2: Growth (Months 3-6)
- Public launch with PR campaign
- Paid acquisition (SEM, social)
- Content marketing & SEO
- Partner integrations
- Product differentiation messaging

### Phase 3: Scale (Months 7-12)
- Enterprise sales team
- Partnership programs
- Advanced analytics & ROI content
- Market expansion
- Product line extensions

## Customer Acquisition Channels
1. **Organic** - Content marketing, SEO, community
2. **Paid** - Google Ads, social media, programmatic
3. **Partnerships** - Resellers, integrations, affiliates
4. **Direct** - Enterprise sales team
5. **Viral** - Referral program, word-of-mouth

## Pricing Strategy
- Freemium: Free tier + premium upgrades
- Tiered: Basic, Pro, Enterprise
- Value-based pricing
- Annual discounts (20-30%)

## Success Metrics
- Activation rate >25%
- Monthly churn <5%
- LTV:CAC ratio >3:1
- Trial-to-paid conversion >15%`
}

function generateFeatures(insights: any, features: string[], category: string): string {
  return `# Feature Specification

## Core Features

${features.map((feature, idx) => {
    const descriptions = {
      'User authentication & SSO': 'Secure login with social and enterprise SSO support',
      'Real-time collaboration': 'Instant sync across all users and devices',
      'Push notifications': 'Timely updates and engagement triggers',
      'Payment processing': 'Secure, PCI-compliant payment handling',
      'Rating & review system': 'User-generated trust and social proof',
      'Messaging between parties': 'In-app communication and notifications',
      'Search & filtering': 'Advanced filtering and full-text search',
    }

    return `### ${idx + 1}. ${feature}
- **Purpose**: ${descriptions[feature as keyof typeof descriptions] || 'Essential capability for user success'}
- **User Benefit**: Directly addresses "${insights.painPoints[0]}"
- **Technical Complexity**: Medium
- **Priority**: High
- **Estimated Development Time**: 2-4 weeks`
  }).join('\n\n')}

## Technical Architecture

### Frontend
- Responsive web application
- Mobile-first design
- PWA capabilities for offline access
- Performance optimization (< 2s load time)

### Backend
- RESTful API or GraphQL
- Real-time data sync
- Authentication & authorization
- Rate limiting & security

### Data
- Relational database (PostgreSQL/MySQL)
- Data backup & disaster recovery
- GDPR/privacy compliance
- Data encryption

### Integrations
- Third-party APIs as needed
- Webhook support
- Native integrations with popular tools

## Performance Targets
- Page load time: <2s
- API response time: <200ms
- Uptime: 99.9%
- Search latency: <500ms
- Sync latency: <1s`
}

function generateValidation(insights: any): string {
  return `# Validation Plan

## Key Assumptions to Test
1. **Problem Assumption**: Users actually face this problem regularly
2. **Solution Assumption**: Our solution effectively addresses the problem
3. **Market Assumption**: Sufficient market size willing to pay
4. **Willingness**: Users willing to switch from alternatives
5. **Unit Economics**: Business model is sustainable

## Validation Experiments

### Experiment 1: Problem Validation (Week 1-2)
- **Method**: Customer interviews & surveys
- **Sample Size**: 20-30 target users
- **Success Criteria**: 80%+ confirm problem severity
- **Cost**: Low
- **Key Questions**:
  - How often does this problem occur?
  - What's the impact (time/money)?
  - Current solutions used?
  - Willingness to pay?

### Experiment 2: Solution Validation (Week 3-4)
- **Method**: Landing page + waitlist
- **Target**: 1000+ visitors
- **Success Criteria**: >20% conversion to waitlist
- **Cost**: Low-Medium (paid ads)

### Experiment 3: MVP Testing (Week 5-8)
- **Method**: Beta testing with 50-100 users
- **Success Criteria**: NPS >40, retention >60%
- **Cost**: Medium
- **Metrics**: Feature usage, time-to-value, retention

### Experiment 4: Pricing Validation (Week 9-10)
- **Method**: Survey + willingness-to-pay
- **Sample**: Beta users + target market
- **Success Criteria**: 50%+ willing to pay at target price

## Key Metrics
- Problem confirmation rate: 80%+
- Feature adoption: 60%+
- 30-day retention: 70%+
- CAC payback period: <6 months
- LTV:CAC: >3:1

## Go/No-Go Decision Points
- **Green Light**: All metrics exceed targets
- **Yellow Light**: 2-3 metrics underperforming
- **Red Light**: >3 metrics failing OR critical issues found`
}

function generateCompetitive(insights: any, competitors: string[], category: string): string {
  return `# Competitive Analysis

## Market Overview
Growing market for ${category.replace('_', ' ')} solutions with increasing demand from ${insights.targetUser.toLowerCase()}.

## Direct Competitors
${competitors.slice(0, 5).map(comp => `
### ${comp}
- **Strengths**: Established market presence, feature-rich
- **Weaknesses**: Complex pricing, learning curve, feature bloat
- **Market Position**: Market leader
- **Price Point**: $$$`).join('\n')}

## Competitive Differentiation

### Our Advantages
1. **Simplicity**: Intuitive design focused on core use cases
2. **Speed**: Fast implementation and time-to-value
3. **Cost**: 40-60% cheaper than competitors
4. **Integration**: Native integrations with key tools
5. **Support**: Dedicated support & onboarding

### Barriers to Entry
- Brand loyalty of existing users
- Switching costs & data migration
- Network effects (if applicable)
- Established integrations
- Enterprise relationships

## Competitive Positioning Matrix
- **Price**: Competitive - Mid-range pricing
- **Feature Set**: Focused - Core features only
- **Ease of Use**: Superior - 50% faster onboarding
- **Reliability**: Equivalent - 99.9% uptime
- **Support**: Superior - Responsive support team

## Market Gaps
- Underserved SMB segment
- Mobile-first solutions lacking
- Affordable enterprise solutions
- Industry-specific customization

## 3-Year Competitive Strategy
1. **Year 1**: Establish beachhead in underserved segment
2. **Year 2**: Expand feature set based on customer feedback
3. **Year 3**: Target enterprise segment with advanced features`
}

function generatePitch(insights: any, category: string): string {
  return `# Pitch Deck Outline

## 1. The Problem (Slide 1)
### Current Situation
${insights.mainProblem}

### The Pain
${insights.painPoints.slice(0, 3).map(p => `- ${p}`).join('\n')}

### Market Impact
- Large market experiencing this problem
- Current solutions inadequate
- Significant opportunity

---

## 2. The Solution (Slide 2)
Our approach:
- **Simple**: Intuitive interface requires zero training
- **Effective**: Directly addresses core pain points
- **Affordable**: 60% cheaper than alternatives
- **Integrated**: Works with existing tools

---

## 3. Market Opportunity (Slide 3)
### Total Addressable Market (TAM)
- ${insights.targetUser} market: \$XX Billion
- Growing at 40% CAGR
- Underserved segments: High growth potential

### Serviceable Market
- Focus on SMB segment initially
- \$X Billion opportunity
- 25% CAGR growth

---

## 4. Business Model (Slide 4)
- Freemium subscription model
- Pricing: \$99-999/month based on tier
- Target 1M+ users within 5 years
- 30%+ gross margins at scale

---

## 5. Competitive Advantage (Slide 5)
### Why We Win
1. Purpose-built for this segment
2. 10x simpler than competitors
3. Better unit economics
4. Superior customer experience

### Barriers to Entry
- Strong product differentiation
- Customer lock-in through integrations
- First-mover advantage in segment

---

## 6. Team (Slide 6)
- Founder: 10+ years in ${category.replace('_', ' ')}
- CTO: Ex-engineer at [Competitor]
- Sales Lead: \$10M+ sales background
- Supporting advisors from industry

---

## 7. Financial Projections (Slide 7)
### Year 1 (Launch to Profitability)
- ARR: \$1M
- Churn: <5% MRR
- CAC: \$300, LTV: \$5,000

### Year 2 (Growth)
- ARR: \$10M
- Team: 20 people
- International expansion

### Year 3 (Scale)
- ARR: \$50M+
- Team: 100+ people
- Enterprise segment launch

---

## 8. Use of Funds (Slide 8)
- Product Development: 40%
- Sales & Marketing: 40%
- Operations & Team: 20%

---

## 9. Call to Action (Slide 9)
"Join us in transforming how ${insights.targetUser.toLowerCase()} work."`
}
