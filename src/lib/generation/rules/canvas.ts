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
    b2c_app: 'Individual consumers seeking personal solutions and lifestyle improvements',
    marketplace: 'Both buyers and sellers looking for trusted transactions',
    hardware: 'Tech-savvy early adopters and mainstream consumers',
    service: 'Service providers and their clients',
    community: 'People with shared interests seeking to connect and collaborate',
    ai_tool: 'Developers, researchers, and product teams',
  }

  return audienceMap[category] || audienceMap.saas
}

function generateBusinessModel(category: ProductCategory): string {
  const modelMap: Record<ProductCategory, string> = {
    saas: 'Subscription-based SaaS with tiered pricing (Starter, Professional, Enterprise)',
    b2c_app: 'Freemium model with premium features and ad-supported tier',
    marketplace: 'Commission-based revenue from transactions',
    hardware: 'Direct hardware sales with optional subscription services',
    service: 'Service marketplace with commission on bookings',
    community: 'Freemium community with premium membership and sponsored content',
    ai_tool: 'API-based pricing model with usage-based billing',
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
    b2c_app: [
      'App Store Optimization (ASO)',
      'Social media marketing',
      'Influencer partnerships',
      'Viral user referral program',
      'Paid ads (Google, Meta)',
    ],
    marketplace: [
      'Seller onboarding program',
      'Buyer acquisition campaigns',
      'Network effects and referrals',
      'Partnerships with brands',
      'Content marketing',
    ],
    hardware: [
      'E-commerce website',
      'Retail partnerships',
      'Tech review sites',
      'Crowdfunding campaigns',
      'Direct-to-consumer marketing',
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
    ai_tool: [
      'Developer documentation',
      'API marketplace listings',
      'Developer communities',
      'Technical partnerships',
      'Content marketing and tutorials',
    ],
  }

  return channelsMap[category] || channelsMap.saas
}
