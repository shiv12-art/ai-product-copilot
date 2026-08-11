import { ProductCategory } from '@/types/generation'

export interface CompetitorProfile {
  name: string
  positioning: string
  pricing: string
  keyFeatures: string[]
  targetCustomer: string
  strengths: string[]
  weaknesses: string[]
  ourAdvantage?: string
}

const COMPETITOR_TEMPLATES: Record<ProductCategory, CompetitorProfile[]> = {
  saas: [
    {
      name: 'Asana',
      positioning: 'Enterprise-grade work management platform for large teams',
      pricing: '$10.99-24.99/user/month',
      keyFeatures: ['Project templates', 'Timeline and portfolio views', 'Automation rules', 'Integration hub'],
      targetCustomer: 'Fortune 500, 100+ person product teams',
      strengths: ['Mature platform', 'Strong enterprise sales', 'Deep integrations'],
      weaknesses: ['Steep learning curve', 'Expensive for small teams', 'Bloated for simple use cases'],
      ourAdvantage: 'Faster to implement, designed for startups and small teams',
    },
    {
      name: 'Monday.com',
      positioning: 'Visual work OS for teams of any size',
      pricing: '$9-16/user/month',
      keyFeatures: ['Visual dashboard builder', 'Automation', 'Integrations', 'Mobile app'],
      targetCustomer: 'Mid-market companies, 20-500 people',
      strengths: ['Beautiful UI', 'Flexible templates', 'Good mobile experience'],
      weaknesses: ['Can be slow with large datasets', 'Automation limited compared to Zapier', 'Vendor lock-in risk'],
      ourAdvantage: 'Lighter weight, better for distributed teams',
    },
    {
      name: 'Notion',
      positioning: 'All-in-one workspace for notes, databases, and wikis',
      pricing: '$8-16/user/month (or free)',
      keyFeatures: ['Database relations', 'Rich text editing', 'Template gallery', 'Web clipper'],
      targetCustomer: 'Startups, creative professionals, small teams',
      strengths: ['Extremely flexible', 'Generous free tier', 'Strong community'],
      weaknesses: ['Steep learning curve', 'Performance issues at scale', 'Not purpose-built'],
      ourAdvantage: 'Purpose-built for product strategy, not just notes',
    },
  ],
  b2c_app: [
    {
      name: 'Duolingo',
      positioning: 'Gamified language learning made fun and accessible',
      pricing: 'Free with ads, $7-12/month premium',
      keyFeatures: ['Daily streaks', 'Leaderboards', 'Push notifications', 'Offline mode'],
      targetCustomer: 'Students, casual learners, 16-45 years old',
      strengths: ['Incredibly engaging', 'Strong community', 'Mobile-first design'],
      weaknesses: ['Limited depth for advanced learners', 'Gamification can be frustrating', 'Limited instructor interaction'],
      ourAdvantage: 'Deeper learning content, instructor integration',
    },
    {
      name: 'Habit Tracker (various)',
      positioning: 'Simple habit tracking and goal management',
      pricing: 'Free - $9.99/month',
      keyFeatures: ['Daily check-ins', 'Streak tracking', 'Statistics', 'Reminders'],
      targetCustomer: 'Individuals, wellness enthusiasts, 18-50 years old',
      strengths: ['Simple to use', 'Low cognitive load', 'Accessible pricing'],
      weaknesses: ['Minimal social features', 'Limited customization', 'Retention challenges'],
      ourAdvantage: 'Social accountability, better retention mechanics',
    },
  ],
  marketplace: [
    {
      name: 'Etsy',
      positioning: 'Marketplace for unique, handmade, and vintage items',
      pricing: '5% transaction fee, $0.20 listing fee',
      keyFeatures: ['Shop customization', 'Shipping label integration', 'Email campaigns', 'Advanced analytics'],
      targetCustomer: 'Individual crafters, small artisan businesses',
      strengths: ['Built-in audience', 'Supportive community', 'Niche positioning'],
      weaknesses: ['High competition', 'Limited seller control', 'Visibility challenges for new sellers'],
      ourAdvantage: 'Better search, clearer path to visibility for new sellers',
    },
    {
      name: 'Shopify',
      positioning: 'All-in-one e-commerce platform for selling online',
      pricing: '$29-2,300/month',
      keyFeatures: ['Drag-and-drop store builder', 'Payment processing', 'Inventory management', 'Apps marketplace'],
      targetCustomer: 'E-commerce entrepreneurs, brands, 1-5000+ revenue range',
      strengths: ['Industry standard', 'Deep app ecosystem', 'Excellent support'],
      weaknesses: ['Expensive for beginners', 'Significant setup required', 'Limited customization without coding'],
      ourAdvantage: 'Lower cost entry, faster launch for first-time sellers',
    },
  ],
  hardware: [
    {
      name: 'Philips Hue',
      positioning: 'Premium smart lighting ecosystem for homes and businesses',
      pricing: '$15-80 per bulb, hub required',
      keyFeatures: ['Voice control', 'Geofencing', 'Automation', 'Wireless dimming'],
      targetCustomer: 'Tech enthusiasts, premium homeowners',
      strengths: ['Industry leader', 'Large ecosystem', 'Reliable hardware'],
      weaknesses: ['High price point', 'Proprietary hub required', 'Slow to launch new products'],
      ourAdvantage: 'Lower cost, open standard compatible',
    },
  ],
  service: [
    {
      name: 'ServiceTitan',
      positioning: 'Field service management for plumbing, HVAC, electrical contractors',
      pricing: '$200-500+/month',
      keyFeatures: ['Dispatching', 'Mobile app', 'Payment processing', 'Customer portal'],
      targetCustomer: 'Service contractors, 10-100+ employees',
      strengths: ['Industry-specific', 'Full integration', 'Strong customer support'],
      weaknesses: ['High cost', 'Long implementation', 'Steep learning curve'],
      ourAdvantage: 'More affordable, easier setup for smaller teams',
    },
  ],
  community: [
    {
      name: 'Discord',
      positioning: 'All-in-one voice, video, and text communication platform',
      pricing: 'Free, $9.99/month Nitro',
      keyFeatures: ['Low-latency voice', 'Custom bots', 'Rich integrations', 'Screen sharing'],
      targetCustomer: 'Gaming communities, open-source projects, online communities',
      strengths: ['Feature-rich', 'Free tier generous', 'Developer-friendly'],
      weaknesses: ['Overwhelming UI for newcomers', 'Moderation challenges at scale', 'Not purpose-built for community discovery'],
      ourAdvantage: 'Simpler UX, better onboarding, discovery features',
    },
    {
      name: 'Circle',
      positioning: 'Community platform for creators and brands',
      pricing: '$90/month base + revenue share',
      keyFeatures: ['Members directory', 'Private events', 'Courses integration', 'White-label option'],
      targetCustomer: 'Creators, coaches, founders, 100-10K members',
      strengths: ['Purpose-built for communities', 'Beautiful design', 'Monetization focus'],
      weaknesses: ['Expensive for small communities', 'Limited free tier', 'Smaller ecosystem than Discord'],
      ourAdvantage: 'Lower cost, better for smaller communities',
    },
  ],
  ai_tool: [
    {
      name: 'OpenAI API',
      positioning: 'Leading large language models accessible via API',
      pricing: 'Pay per token, $0.002-0.03 per 1K tokens',
      keyFeatures: ['GPT-4 access', 'Fine-tuning capability', 'Batch processing', 'Moderation API'],
      targetCustomer: 'Developers, enterprises, AI researchers',
      strengths: ['State-of-the-art models', 'Proven capability', 'Growing ecosystem'],
      weaknesses: ['Costly for high-volume use', 'Potential vendor lock-in', 'Limited customization on base models'],
      ourAdvantage: 'Better fine-tuning options, lower cost, more control',
    },
    {
      name: 'Hugging Face',
      positioning: 'Open-source AI model hub and community',
      pricing: 'Free, $7-100+/month for inference API',
      keyFeatures: ['Model hub', 'Dataset hub', 'Spaces (free deployment)', 'Community collaboration'],
      targetCustomer: 'Researchers, open-source developers, startups',
      strengths: ['Open source', 'Community-driven', 'Cost-effective'],
      weaknesses: ['Models often less capable than proprietary', 'Infrastructure challenges', 'Support limited'],
      ourAdvantage: 'Commercial support, SLA guarantees, managed infrastructure',
    },
  ],
  mobile_app: [
    {
      name: 'Flutter',
      positioning: 'Cross-platform mobile app framework by Google',
      pricing: 'Free, open-source',
      keyFeatures: ['Single codebase for iOS/Android', 'Rich UI components', 'Hot reload', 'Strong performance'],
      targetCustomer: 'App developers, startups, enterprises',
      strengths: ['Fast development', 'Beautiful UIs out of box', 'Growing community'],
      weaknesses: ['Smaller ecosystem than React Native', 'Dart learning curve', 'Platform limitations'],
      ourAdvantage: 'Better offline support, more specialized features',
    },
  ],
  web_app: [
    {
      name: 'Next.js',
      positioning: 'React framework for production with SSR and static generation',
      pricing: 'Free, open-source',
      keyFeatures: ['Server-side rendering', 'API routes', 'Image optimization', 'Analytics'],
      targetCustomer: 'React developers, startups, enterprises',
      strengths: ['Excellent DX', 'Performance optimized', 'Strong ecosystem'],
      weaknesses: ['Opinionated structure', 'Vercel vendor lock-in concerns', 'Overkill for simple sites'],
      ourAdvantage: 'More flexibility, no vendor lock-in',
    },
  ],
  fintech: [
    {
      name: 'Robinhood',
      positioning: 'Commission-free stock trading for everyday investors',
      pricing: 'Free trading + $5/month premium (optional)',
      keyFeatures: ['Zero commissions', 'Fractional shares', 'Options trading', 'Crypto integration'],
      targetCustomer: 'Retail investors, millennials, beginners',
      strengths: ['No commissions', 'Beautiful app', 'Easy onboarding'],
      weaknesses: ['Controversial practices (payment for order flow)', 'Limited research tools', 'Outages during high volume'],
      ourAdvantage: 'More transparent fees, better education, institutional-grade tools',
    },
    {
      name: 'Vanguard',
      positioning: 'Low-cost, investor-owned investment management company',
      pricing: '0.03-0.20% expense ratios',
      keyFeatures: ['Index funds', 'Financial advisors', 'Tax-loss harvesting', 'Robo-advisor'],
      targetCustomer: 'Long-term investors, savers, institutions',
      strengths: ['Extremely low costs', 'Excellent customer service', 'Trusted brand'],
      weaknesses: ['Older platform', 'Slower innovation', 'Not ideal for active traders'],
      ourAdvantage: 'Modern interface, faster execution, younger demographic appeal',
    },
  ],
  healthcare: [
    {
      name: 'Epic Systems',
      positioning: 'Enterprise EHR system for large healthcare organizations',
      pricing: 'Custom enterprise pricing, typically $1-5M+ annually',
      keyFeatures: ['Full EHR capabilities', 'Interoperability', 'Analytics', 'Workflow automation'],
      targetCustomer: 'Large hospitals, healthcare networks, 1000+ employees',
      strengths: ['Market leader', 'Comprehensive features', 'Strong integrations'],
      weaknesses: ['Expensive', 'Long implementation (6-18 months)', 'Complex UI, steep learning curve'],
      ourAdvantage: 'Faster implementation, lower cost, modern UX',
    },
    {
      name: 'Teladoc',
      positioning: 'Virtual healthcare platform connecting patients with doctors',
      pricing: '$45-90 per visit, varies by insurance',
      keyFeatures: ['Video consultations', 'Prescription delivery', 'Follow-up care', 'Mental health services'],
      targetCustomer: 'Individuals, employers, insurance companies',
      strengths: ['Convenient', 'Fast access', 'Growing provider network'],
      weaknesses: ['Higher cost than in-person in many cases', 'Limited emergency care', 'Tech barriers for elderly'],
      ourAdvantage: 'Better integration with primary care, lower cost for routine care',
    },
  ],
  edtech: [
    {
      name: 'Khan Academy',
      positioning: 'Free, world-class education for anyone, anywhere',
      pricing: 'Completely free (with optional paid premium)',
      keyFeatures: ['Video lessons', 'Practice exercises', 'Progress tracking', 'Personalized learning'],
      targetCustomer: 'Students K-12, lifelong learners, parents',
      strengths: ['Completely free', 'High-quality content', 'Trusted brand'],
      weaknesses: ['Limited live interaction', 'One-directional learning', 'Not grade-specific for classrooms'],
      ourAdvantage: 'Live instructor interaction, classroom integration, social features',
    },
    {
      name: 'Canvas Learning Management System',
      positioning: 'Cloud-based LMS for K-12 and higher education',
      pricing: '$4-8 per student per month',
      keyFeatures: ['Grade management', 'Assignment submission', 'Discussion boards', 'Integrations'],
      targetCustomer: 'Schools, universities, K-12 districts',
      strengths: ['Widely adopted', 'Good integrations', 'Strong support'],
      weaknesses: ['Dated UI in some areas', 'Can be slow', 'Feature creep'],
      ourAdvantage: 'Simpler UX, better teacher tools, modern design',
    },
  ],
  gaming: [
    {
      name: 'League of Legends',
      positioning: 'Free-to-play team-based competitive game',
      pricing: 'Free with cosmetic purchases',
      keyFeatures: ['Balanced competitive gameplay', 'Ranked ladder', 'Seasonal battle pass', 'Champion variety'],
      targetCustomer: 'Competitive gamers, esports enthusiasts, 13-40 years',
      strengths: ['Massive player base', 'Pro esports ecosystem', 'Regular balance patches'],
      weaknesses: ['Toxic community', 'Skill floor high', 'Pay-for-convenience cosmetics'],
      ourAdvantage: 'Better onboarding, more welcoming community, better moderation',
    },
  ],
  social: [
    {
      name: 'Instagram',
      positioning: 'Visual social network for sharing photos, videos, and stories',
      pricing: 'Free with ads',
      keyFeatures: ['Feed algorithm', 'Stories', 'Reels', 'Shopping integration', 'Creator monetization'],
      targetCustomer: 'Content creators, brands, users 13-65 years',
      strengths: ['Largest visual platform', 'Creator tools', 'Excellent monetization options'],
      weaknesses: ['Algorithm opacity', 'Content moderation issues', 'Mental health concerns'],
      ourAdvantage: 'Transparent algorithm, better mental health features, niche communities',
    },
    {
      name: 'TikTok',
      positioning: 'Short-form video platform with powerful recommendation algorithm',
      pricing: 'Free with ads, Creator Fund, gifting',
      keyFeatures: ['For You Page', 'Duets and stitches', 'Sound library', 'Creator Fund'],
      targetCustomer: 'Gen Z, content creators, 13-30 years',
      strengths: ['Viral growth potential', 'Best algorithm', 'Creator-friendly'],
      weaknesses: ['Geopolitical concerns', 'Toxic comments', 'Newer, less mature ecosystem'],
      ourAdvantage: 'Trust and transparency, longer-form content support',
    },
  ],
}

export function getDefaultCompetitors(category: ProductCategory): CompetitorProfile[] {
  return COMPETITOR_TEMPLATES[category] || COMPETITOR_TEMPLATES.saas
}
