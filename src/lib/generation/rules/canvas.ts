import { ProductCategory, KeywordResult } from '@/types/generation'
import { getDefaultFeatures } from '../templates/features'

export async function generateCanvasArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string> {
  const features = getDefaultFeatures(category)
  const topFeatures = features.slice(0, 3)
  const keywordTexts = keywords.slice(0, 3).map((k) => k.word)

  const valueProposition = generateValueProposition(problemStatement, keywordTexts)
  const targetAudience = generateTargetAudience(category, keywordTexts)
  const businessModel = generateBusinessModel(category)
  const channels = generateChannels(category)

  const markdown = `# Product Canvas

## Value Proposition
${valueProposition}

## Problem Statement
${problemStatement}

## Target Audience
${targetAudience}

## Key Features
${topFeatures.map((f) => `- ${f}`).join('\n')}

## Success Metrics
- User adoption rate
- Daily/Monthly active users
- Customer satisfaction (NPS)
- Revenue per user
- Market share growth

## Business Model
${businessModel}

## Distribution Channels
${channels.map((c) => `- ${c}`).join('\n')}

---
*Generated at ${new Date().toLocaleDateString()}*
`

  return markdown
}

function generateValueProposition(problem: string, keywords: string[]): string {
  if (keywords.length > 0) {
    return `We help ${keywords[0]} professionals solve ${keywords[1] || 'their biggest challenge'} by providing a streamlined solution that ${keywords[2] || 'improves efficiency'}.`
  }
  return `We solve the core challenge described in the problem statement through innovative product design and user-centric approach.`
}

function generateTargetAudience(category: ProductCategory, keywords: string[]): string {
  const audienceMap: Record<ProductCategory, string> = {
    saas: 'B2B organizations and teams looking to improve productivity and collaboration',
    mobile_app: 'Mobile users seeking convenience and on-the-go solutions',
    web_app: 'Desktop and web users seeking modern browser-based tools',
    marketplace: 'Both buyers and sellers looking for trusted transactions',
    b2c_app: 'Individual consumers seeking personal solutions and lifestyle improvements',
    hardware: 'Tech-savvy early adopters and mainstream consumers',
    ai_tool: 'Developers, researchers, and product teams',
    fintech: 'Investors, traders, and financially-conscious consumers',
    healthcare: 'Patients, healthcare providers, and wellness enthusiasts',
    edtech: 'Students, educators, and lifelong learners',
    gaming: 'Gamers and entertainment seekers of all skill levels',
    social: 'Users seeking community, connection, and self-expression',
    service: 'Service providers and their clients',
    community: 'People with shared interests seeking to connect and collaborate',
  }

  return audienceMap[category] || audienceMap.saas
}

function generateBusinessModel(category: ProductCategory): string {
  const modelMap: Record<ProductCategory, string> = {
    saas: 'Subscription-based SaaS with tiered pricing (Starter, Professional, Enterprise)',
    mobile_app: 'Freemium with in-app purchases and premium subscriptions',
    web_app: 'Subscription-based SaaS with usage-based tiers',
    marketplace: 'Commission-based revenue from transactions',
    b2c_app: 'Freemium model with premium features and ad-supported tier',
    hardware: 'Direct hardware sales with optional subscription services',
    ai_tool: 'API-based pricing model with usage-based billing',
    fintech: 'Commission-based fees, subscription tiers, and premium features',
    healthcare: 'Subscription model with insurance integration and premium services',
    edtech: 'Freemium courses with premium certification and subscriptions',
    gaming: 'In-app purchases, battle pass subscriptions, and cosmetics',
    social: 'Freemium with premium features and sponsored content',
    service: 'Service marketplace with commission on bookings',
    community: 'Freemium community with premium membership and sponsored content',
  }

  return modelMap[category] || modelMap.saas
}

function generateChannels(category: ProductCategory): string[] {
  const channelsMap: Record<ProductCategory, string[]> = {
    saas: [
      'Direct sales outreach',
      'Self-serve marketing website',
      'Product Hunt and community launches',
      'Content marketing and SEO',
      'Strategic partnerships',
    ],
    mobile_app: [
      'App Store Optimization (ASO)',
      'Social media marketing',
      'Influencer partnerships',
      'Viral user referral program',
      'Paid ads (Google, Meta)',
    ],
    web_app: [
      'Product Hunt and tech community launches',
      'Content marketing and SEO',
      'Paid digital advertising',
      'Developer partnerships and integrations',
      'Social media and community engagement',
    ],
    marketplace: [
      'Seller onboarding program',
      'Buyer acquisition campaigns',
      'Network effects and referrals',
      'Partnerships with brands',
      'Content marketing',
    ],
    b2c_app: [
      'App Store Optimization (ASO)',
      'Social media marketing',
      'Influencer partnerships',
      'Viral user referral program',
      'Paid ads (Google, Meta)',
    ],
    hardware: [
      'E-commerce website',
      'Retail partnerships',
      'Tech review sites',
      'Crowdfunding campaigns',
      'Direct-to-consumer marketing',
    ],
    ai_tool: [
      'Developer documentation',
      'API marketplace listings',
      'Developer communities',
      'Technical partnerships',
      'Content marketing and tutorials',
    ],
    fintech: [
      'Content marketing and financial education',
      'Partnerships with financial advisors',
      'Paid digital advertising',
      'Social media and community engagement',
      'Influencer partnerships',
    ],
    healthcare: [
      'Healthcare provider partnerships',
      'Content marketing and health education',
      'Insurance integration partnerships',
      'Wellness community engagement',
      'Paid digital advertising',
    ],
    edtech: [
      'Content marketing and SEO',
      'Partnership with educational institutions',
      'Social media and community engagement',
      'Influencer partnerships with educators',
      'Paid digital advertising',
    ],
    gaming: [
      'Social media marketing and streaming platforms',
      'Gaming influencer partnerships',
      'Community engagement and Discord',
      'Paid gaming advertising',
      'Esports sponsorships and partnerships',
    ],
    social: [
      'Organic viral growth and word-of-mouth',
      'Influencer partnerships and brand ambassadors',
      'Paid social media advertising',
      'Community engagement and content marketing',
      'Partnerships with content creators',
    ],
    service: [
      'Service provider network',
      'Local marketing',
      'Word-of-mouth referrals',
      'Partnership with complementary services',
      'Paid digital advertising',
    ],
    community: [
      'Organic community growth',
      'Content and SEO',
      'Partnerships with influencers',
      'Reddit and forum engagement',
      'Email marketing',
    ],
  }

  return channelsMap[category] || channelsMap.saas
}
