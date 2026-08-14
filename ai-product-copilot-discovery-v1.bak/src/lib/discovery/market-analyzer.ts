import { StructuredInsights, ProductCategory } from '@/lib/types/discovery'

export interface MarketAnalysis {
  tam: string
  sam: string
  som: string
}

export function generateMarketAnalysis(
  insights: StructuredInsights,
  category: ProductCategory
): MarketAnalysis {
  return {
    tam: generateTAM(insights, category),
    sam: generateSAM(insights, category),
    som: generateSOM(insights, category),
  }
}

function generateTAM(
  insights: StructuredInsights,
  category: ProductCategory
): string {
  const tamByCategory: { [key: string]: { large: string; medium: string; niche: string } } = {
    saas: {
      large: '$50B+ enterprise software market',
      medium: '$5-20B vertical software market',
      niche: '$100M-1B specialized software',
    },
    marketplace: {
      large: '$200B+ services market',
      medium: '$10-50B vertical services',
      niche: '$500M-5B specialized services',
    },
    mobile_app: {
      large: '$150B+ mobile app market',
      medium: '$10-30B category app market',
      niche: '$100M-1B specialized mobile',
    },
    ai_tool: {
      large: '$500B+ AI market',
      medium: '$50-200B vertical AI',
      niche: '$1B-10B specialized AI',
    },
    fintech: {
      large: '$400B+ fintech market',
      medium: '$20-100B payment processing',
      niche: '$500M-5B specialized finance',
    },
    hardware: {
      large: '$500B+ consumer electronics',
      medium: '$10-50B device category',
      niche: '$100M-1B specialized hardware',
    },
    healthcare: {
      large: '$1.2T+ healthcare IT market',
      medium: '$50-200B healthcare category',
      niche: '$1B-10B specialized health',
    },
    edtech: {
      large: '$500B+ education market',
      medium: '$20-100B edtech category',
      niche: '$500M-5B specialized learning',
    },
    gaming: {
      large: '$200B+ gaming market',
      medium: '$20-80B game category',
      niche: '$100M-1B specialized gaming',
    },
    social_network: {
      large: '$300B+ social media market',
      medium: '$10-50B social category',
      niche: '$500M-5B specialized social',
    },
  }

  const categoryTAM = tamByCategory[category] || {
    large: '$100B+',
    medium: '$5-20B',
    niche: '$500M-5B',
  }

  return categoryTAM[insights.marketSize] || categoryTAM.medium
}

function generateSAM(
  insights: StructuredInsights,
  category: ProductCategory
): string {
  // SAM = Serviceable Addressable Market (subset of TAM you can realistically reach)
  // Usually 10-30% of TAM, focused on reachable segment

  if (insights.marketSize === 'large') {
    return '$1B-10B (geographic/segment focus)'
  } else if (insights.marketSize === 'medium') {
    return '$100M-1B (1-3 geographic regions or sub-verticals)'
  } else {
    return '$10M-100M (specific niche segment)'
  }
}

function generateSOM(
  insights: StructuredInsights,
  category: ProductCategory
): string {
  // SOM = Serviceable Obtainable Market (realistic Year 1 target)
  // Usually 0.1-1% of SAM

  const competitiveMultiplier =
    insights.competitiveIntensity === 'high'
      ? 0.5
      : insights.competitiveIntensity === 'medium'
        ? 0.75
        : 1.0

  if (insights.marketSize === 'large') {
    const som = Math.round(10 * competitiveMultiplier)
    return `$${som}M-${som * 3}M Year 1 SOM (0.1-0.3% SAM)`
  } else if (insights.marketSize === 'medium') {
    const som = Math.round(1 * competitiveMultiplier)
    return `$${som}M-${som * 5}M Year 1 SOM (1-5% SAM)`
  } else {
    return `$100K-$1M Year 1 SOM (1-10% SAM)`
  }
}
