import { ProductCategory, KeywordResult } from '@/types/generation'

export async function generateGTMArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string> {
  const positioning = generatePositioning(category, keywords)
  const motion = generateGTMMotion(category)
  const channels = generateDistributionChannels(category)
  const salesApproach = generateSalesApproach(category)
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

## 3. Go-to-Market Motion
${motion}

## 4. Competitive Differentiation
- Unique value proposition addressing ICP pain points
- Superior user experience vs established competitors
- Faster implementation and time-to-value
- Better customer support and community
- Modern architecture and technology stack

## 5. Distribution Channels & Strategy
${channels}

## 6. Sales Approach
${salesApproach}

## 7. Pricing Strategy

${pricingTiers}

## 8. Marketing & Sales Plan

### Pre-Launch Phase (Weeks 1-4)
- Build landing page and messaging
- Create content assets and case studies
- Set up email marketing and CRM
- Establish social media presence and outreach

### Launch Phase (Weeks 5-8)
- Product Hunt launch and community announcements
- Press releases and media outreach to industry publications
- Strategic community announcements (Reddit, Discord, Slack groups)
- Invite-only early access program with feedback collection

### Growth Phase (Months 3-6)
- Paid acquisition campaigns (Google, LinkedIn, Facebook)
- Strategic partnerships with complementary tools
- Content marketing acceleration (blogs, videos, webinars)
- Direct sales outreach to high-value accounts

## 9. Launch Timeline
${launchTimeline}

## 10. Key Partnerships & Integrations
- API integrations with category-relevant tools
- Affiliate partnerships with relevant communities
- Integration marketplaces (Zapier, IFTTT, etc.)
- Industry analyst relationships

## 11. Success Metrics
- Customer acquisition cost (CAC) by channel
- Lifetime value (LTV) and CAC payback period
- Product launch awareness and reach
- Early adopter conversion rate and churn
- First month and D30 retention rates
- Net Promoter Score (NPS) and feature adoption
- Revenue growth and customer growth rate

## 12. Budget Allocation
- Product development: 35%
- Marketing: 35%
- Sales: 20%
- Operations & Infrastructure: 10%

## 13. Risk Mitigation
- Start with targeted niche to validate demand
- Maintain strong product-market fit signals
- Build strategic partnerships to accelerate reach
- Regular competitive landscape monitoring
- Community engagement and word-of-mouth cultivation

---
*Created: ${new Date().toLocaleDateString()}*
`

  return markdown
}

function generateGTMMotion(category: ProductCategory): string {
  const motions: Record<ProductCategory, string> = {
    saas: `**Land & Expand Motion**
- Target individual product managers and small teams first
- Prove ROI within single team before selling to entire organization
- Expand to adjacent teams (design, engineering, product ops) over time
- Enterprise landing likely through product-led growth + direct sales`,

    b2c_app: `**Viral & Freemium Motion**
- Free tier with core features drives user acquisition
- Social sharing and referral incentives drive virality
- Premium tier monetizes engaged users
- Focus on D7/D30 retention as key metric over day-1 installs`,

    marketplace: `**Network Effects Motion**
- Bootstrap initial supply (sellers) through direct outreach
- Attract buyers through paid marketing and content
- Use ratings/reviews to improve quality and drive retention
- Iterate supply/demand balance continuously`,

    hardware: `**Product + Ecosystem Motion**
- Launch core hardware device with strong UX
- Build companion mobile app and cloud service
- Create ecosystem through integrations with smart home standards
- Premium positioning targeting early adopters first`,

    service: `**Provider Aggregation Motion**
- Recruit independent service providers as suppliers
- Build customer-facing platform with search/booking
- Take commission on transactions (5-20% typical)
- Expand to adjacent services as supply grows`,

    community: `**Community-Led Motion**
- Seed initial community through founding members and early evangelists
- Focus on member onboarding and first contribution
- Empower super-users as moderators and community leaders
- Organic growth through word-of-mouth and referrals`,

    ai_tool: `**Developer-First Motion**
- Free API tier with generous quotas for developers to experiment
- Pay-as-you-go pricing with no lock-in builds trust
- Community engagement (forums, Discord, documentation)
- Enterprise sales for high-volume customers requiring SLAs`,

    mobile_app: `**App Store + Organic Motion**
- App store optimization (ASO) for discoverability
- Focus on rating/review management (4.5+ star target)
- Social proof through organic user reviews and testimonials
- Word-of-mouth amplified through sharing features`,

    web_app: `**Product-Led Growth + Sales Motion**
- Free/trial tier accessible without credit card
- In-app onboarding guides users to activation
- Sales team targets accounts showing high engagement
- Enterprise features incentivize larger deals`,

    fintech: `**Trust & Education Motion**
- Educational content builds credibility with retail users
- Transparent fee structure differentiates from competitors
- Gradual feature expansion as user sophistication grows
- Regulatory compliance messaging builds trust with institutions`,

    healthcare: `**Provider + Patient Motion**
- Healthcare providers drive adoption within their patient base
- Patient testimonials and NPS drive word-of-mouth
- HIPAA compliance and data security as core messaging
- Partnerships with health systems for scale`,

    edtech: `**Educator-Led Motion**
- Free teacher tier drives adoption within schools
- Administrators control adoption for entire school/district
- Student outcomes and engagement metrics build reputation
- Integration with existing learning management systems critical`,

    gaming: `**Community + Content Motion**
- Twitch/YouTube streamers drive awareness and adoption
- Discord community for competitive players builds engagement
- Esports tournaments create aspirational events
- Regular content updates maintain momentum`,

    social: `**Creator-Led Motion**
- Creators drive audience adoption through their existing followers
- Creator tools (analytics, monetization) drive retention
- Community features encourage peer-to-peer growth
- Algorithm amplifies engaging content driving virality`,
  }
  return motions[category] || motions.saas
}

function generateDistributionChannels(category: ProductCategory): string {
  const channels: Record<ProductCategory, string> = {
    saas: `**Primary Channels (by priority):**
1. **Product-Led Growth (PLG)** - Free trial accessible without sales conversation
2. **Direct Sales** - Outbound to target companies via LinkedIn and cold email
3. **Partner Ecosystem** - Partnerships with complementary B2B SaaS tools
4. **Content Marketing** - Blogs, case studies, webinars targeting PMMs and PMs
5. **Community** - Participation in relevant Slack communities and forums`,

    b2c_app: `**Primary Channels:**
1. **App Store Organic** - ASO optimization for iOS/Android app stores
2. **Paid User Acquisition** - Facebook/Instagram ads targeting demographic
3. **Referral/Viral** - Built-in sharing and referral incentives
4. **Social Media** - TikTok, Instagram, YouTube for app showcase
5. **Influencer Partnerships** - Micro-influencers in lifestyle/productivity niche`,

    marketplace: `**Primary Channels:**
1. **Supply-Side Direct** - Outbound recruiting sellers via email and phone
2. **Demand-Side Paid** - Google Shopping, Facebook/Instagram ads for buyers
3. **SEO** - Long-tail keywords for product discovery
4. **Word-of-Mouth** - Quality transactions drive referrals
5. **Content** - Seller guides and best-practice content`,

    hardware: `**Primary Channels:**
1. **E-Commerce Stores** - Amazon, own website for direct sales
2. **Tech Reviewers** - Hardware review sites and YouTube channels
3. **Tech Events** - Product launches at CES, maker fairs
4. **Social Media** - Instagram/TikTok for lifestyle positioning
5. **Retail Partnerships** - Best Buy, Target for brick-and-mortar distribution`,

    service: `**Primary Channels:**
1. **SEO** - Local search optimization for service discovery
2. **Google Ads** - Local services ads for immediate demand capture
3. **Provider Outreach** - Direct outreach to recruit independent providers
4. **Word-of-Mouth** - Quality service delivery drives referrals
5. **Partnerships** - Real estate agents, property managers`,

    community: `**Primary Channels:**
1. **Founding Members** - Recruit passionate early members directly
2. **Niche Forums** - Participation in existing communities where members hang out
3. **Social Media** - Subreddits, Twitter communities, Discord
4. **Content** - Valuable guides and resources relevant to niche
5. **Events** - Meetups and webinars bringing community together`,

    ai_tool: `**Primary Channels:**
1. **Developer Communities** - HackerNews, dev.to, Reddit r/MachineLearning
2. **Documentation + Examples** - Well-documented API with code examples
3. **GitHub** - Showcase integrations and SDKs
4. **Technical Blogs** - AI/ML focused publications and newsletters
5. **Conferences** - AI/ML conferences and workshops`,

    mobile_app: `**Primary Channels:**
1. **App Store Optimization** - Keywords, screenshots, video previews
2. **Paid Ads** - Apple Search Ads, Google App Campaigns
3. **Social Media** - TikTok, Instagram for mobile-first audience
4. **Creator Partnerships** - Tech reviewers and lifestyle creators
5. **Press** - Tech media coverage for launch momentum`,

    web_app: `**Primary Channels:**
1. **PLG / Free Trial** - Accessible signup and quick activation
2. **Search Marketing** - SEO and Google Ads for relevant keywords
3. **Content Marketing** - Comparison articles and use case guides
4. **B2B Platforms** - ProductHunt, Capterra, G2 for awareness
5. **Partnerships** - Integrations with complementary tools`,

    fintech: `**Primary Channels:**
1. **Social Proof / Reviews** - Trustpilot, FinanceWire for credibility
2. **Search Marketing** - Google Ads for investment/banking related queries
3. **Content** - Financial education content building authority
4. **Influencers** - Personal finance influencers and YouTube channels
5. **Press** - FinTech media and investor relations`,

    healthcare: `**Primary Channels:**
1. **Healthcare Provider Networks** - Partnerships with clinics and hospitals
2. **Medical Associations** - Positioning within professional networks
3. **Patient Communities** - Support groups and patient forums
4. **Medical Media** - Healthcare publications and influencers
5. **Compliance / Certification** - Industry certifications (HIPAA, HITRUST)`,

    edtech: `**Primary Channels:**
1. **Teacher Networks** - Existing teacher communities and EdTech groups
2. **School / District Sales** - Direct outreach to curriculum directors
3. **Education Conferences** - ISTE, state education conferences
4. **Education Reviews** - Common Sense Media, EdTech review sites
5. **Integration Ecosystems** - Integration with Canvas, Google Classroom`,

    gaming: `**Primary Channels:**
1. **Twitch / YouTube** - Streamer early access and sponsorships
2. **Discord Communities** - Gamer communities and Discord servers
3. **Gaming Influencers** - Esports players and gaming content creators
4. **Esports** - Tournaments and competitive events
5. **Steam / Epic** - App store presence and community features`,

    social: `**Primary Channels:**
1. **Creator Partnerships** - Early creator access and verification
2. **Organic Virality** - Sharable content and trending features
3. **Paid Social** - TikTok, Instagram, YouTube ads
4. **Influencer Seeding** - Influencers on platform driving awareness
5. **Press & Media** - Tech media coverage of growth milestones`,
  }
  return channels[category] || channels.saas
}

function generateSalesApproach(category: ProductCategory): string {
  const approaches: Record<ProductCategory, string> = {
    saas: `**Hybrid Sales Model**
- **Self-Serve** (Free trial → Starter plan)
- **Sales-Assisted** (Mid-market → direct sales calls and demos)
- **Enterprise Sales** (large deals with custom pricing/features)
- Sales cycle: 2-4 weeks for mid-market, 3-6 months for enterprise
- Focus on ROI and time-to-value in pitch`,

    b2c_app: `**Self-Serve / Freemium Only**
- No direct sales team initially
- Focus on in-app onboarding and growth loops
- Premium tier conversion through feature incentives
- Customer support through in-app chat and FAQ`,

    marketplace: `**Hybrid: Supply + Demand**
- **Supply-Side:** Direct outreach to recruit sellers, provider success managers
- **Demand-Side:** Performance marketing (Google Ads, Facebook)
- Commission-based incentive alignment with suppliers
- Focus on transaction quality (ratings/reviews)`,

    hardware: `**Direct + Retail Partnership**
- Direct-to-consumer through e-commerce
- Retail partnerships for brick-and-mortar presence
- Sales team for B2B/bulk orders
- Customer support critical for repeat purchases`,

    service: `**Dual-Sided Marketplace Sales**
- **Provider recruitment:** Direct outreach and onboarding
- **Customer acquisition:** Performance marketing and SEO
- Commission-based (typically 10-20% take rate)
- Provider success managers for high-value suppliers`,

    community: `**Community-Led (No Direct Sales)**
- Founder/team directly engage early members
- Empower super-users as community managers
- Organic growth through word-of-mouth
- Premium tier sold through community features`,

    ai_tool: `**Developer-Focused Sales Model**
- Free tier + generous trial credits removes barrier
- Self-serve onboarding with excellent documentation
- Enterprise accounts with dedicated account managers
- Sales cycle: 1-3 months for enterprise deals`,

    mobile_app: `**Self-Serve via App Store**
- No direct sales; focus on in-app conversion
- In-app messaging and notifications drive upgrades
- Premium tier purchased directly in app
- Customer support via in-app chat`,

    web_app: `**Product-Led Sales (PLG)**
- Free trial accessible without credit card
- In-app onboarding guides to activation
- Sales team engages high-engagement accounts
- Enterprise deals with custom SLAs and features`,

    fintech: `**Hybrid: Self-Serve + Customer Success**
- Free account opening without credit card
- Premium tier sold through feature differentiation
- Customer success proactive for high-balance accounts
- Financial advisors/institutions sold through direct team`,

    healthcare: `**Provider Partnerships + Direct**
- Target hospital systems and clinic networks directly
- Provider success managers post-implementation
- Patient adoption follows provider adoption
- Compliance and security messaging critical in sales`,

    edtech: `**School/District Sales + Freemium**
- Free teacher tier drives classroom adoption
- District decision-makers (curriculum directors) sold direct
- Teacher advocates help drive school adoption
- Implementation specialists for larger deployments`,

    gaming: `**F2P / Digital Sales Only**
- No direct sales; games are sold through platform
- In-game monetization (battle pass, cosmetics)
- Community management drives engagement
- Esports partnerships amplify reach`,

    social: `**Creator-Led + Viral**
- Creator tier sold with monetization tools
- Premium tier for regular users
- Mostly self-serve through in-app billing
- Community management critical for moderation`,
  }
  return approaches[category] || approaches.saas
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
    mobile_app: 'Position as the essential mobile companion for on-the-go productivity and connectivity.',
    web_app: 'Position as the powerful web platform for seamless cross-device collaboration.',
    fintech: 'Position as the trusted financial platform for smarter money management.',
    healthcare: 'Position as the comprehensive healthcare solution improving patient outcomes.',
    edtech: 'Position as the modern learning platform empowering educators and students.',
    gaming: 'Position as the ultimate gaming platform for immersive entertainment.',
    social: 'Position as the vibrant social platform connecting communities worldwide.',
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
    mobile_app: 'Mobile-first consumers and commuters',
    web_app: 'Tech-savvy professionals and startups',
    fintech: 'Retail investors and small business owners',
    healthcare: 'Healthcare providers and medical practitioners',
    edtech: 'Educators and students in academic institutions',
    gaming: 'Competitive and casual gamers',
    social: 'Content creators and active social users',
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
    mobile_app: 'Enterprises with mobile-first strategies',
    web_app: 'Enterprise organizations with web operations',
    fintech: 'Financial advisors and institutions',
    healthcare: 'Hospital systems and healthcare administrators',
    edtech: 'School administrators and educational institutions',
    gaming: 'Game studios and gaming platforms',
    social: 'Brands and marketing professionals',
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
    mobile_app: 'Individual consumers to enterprises',
    web_app: '1-10,000+ employees',
    fintech: 'Individual consumers to financial institutions',
    healthcare: '5-5,000+ employees',
    edtech: 'Individual educators to large institutions',
    gaming: 'Individual to enterprise developers',
    social: 'Individual users to large enterprises',
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
    mobile_app: 'Consumer apps, retail, productivity',
    web_app: 'SaaS, enterprise, startups',
    fintech: 'Finance, investment, banking, payments',
    healthcare: 'Healthcare, medical, wellness',
    edtech: 'Education, training, e-learning',
    gaming: 'Gaming, entertainment, esports',
    social: 'Social networks, community, media',
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
    mobile_app: '\$0 - \$100/month (consumer)',
    web_app: '\$10,000 - \$500,000+ annually',
    fintech: '\$100 - \$100,000+ (variable)',
    healthcare: '\$50,000 - \$1,000,000+ annually',
    edtech: '\$0 - \$500,000+ annually',
    gaming: '\$0 - \$1,000+ annually',
    social: 'Free to \$20,000+ annually',
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

    mobile_app: `### Free
- Core features
- Limited storage
- Ad-supported

### Premium (\$2.99/month)
- Unlimited features
- Ad-free experience
- Cloud sync

### Pro (\$9.99/month)
- Advanced analytics
- Priority support
- Early access to features`,

    web_app: `### Starter (\$29/month)
- Up to 5 users
- Basic features
- Community support

### Team (\$99/month)
- Up to 50 users
- All features
- Priority support
- API access

### Enterprise (Custom)
- Unlimited users
- Dedicated support
- Custom integrations
- SLA guarantee`,

    fintech: `### Free
- Basic account features
- Limited transactions per month

### Basic (\$9.99/month)
- Unlimited transactions
- Basic analytics

### Premium (\$29.99/month)
- Advanced analytics
- Investment tracking
- Budget planning tools
- Priority support

### Enterprise (Custom)
- White-label solutions
- API access
- Dedicated account manager`,

    healthcare: `### Provider (\$99/month)
- Patient records
- Appointment scheduling
- Basic messaging

### Provider Plus (\$299/month)
- Telemedicine capabilities
- Advanced analytics
- Multi-location support
- HIPAA compliance

### Hospital/Enterprise (Custom)
- Full EHR system
- API integrations
- Custom workflows
- Dedicated support`,

    edtech: `### Teacher (Free)
- Basic classroom features
- Up to 30 students

### School (\$199/month)
- Unlimited teachers
- Advanced analytics
- Student management
- Parent portal

### District (Custom)
- Multiple schools
- Custom content
- Deep analytics
- Integration support`,

    gaming: `### Free-to-Play
- Basic gameplay
- Limited cosmetics

### Premium Battle Pass (\$9.99)
- Exclusive cosmetics
- Event access
- Tier rewards

### Season Pass (\$49.99)
- All battle passes
- Exclusive items
- Early access

### Cosmetics & DLC (Variable)
- Skins, emotes, effects
- Limited-time bundles`,

    social: `### Free
- All core features
- Ad-supported

### Premium (\$4.99/month)
- Ad-free feed
- Verified badge
- Advanced analytics

### Creator (\$9.99/month)
- Monetization tools
- Advanced analytics
- Priority support
- Content hosting`,
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
