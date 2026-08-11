import { ProductCategory } from '@/types/generation'

export interface FeatureSpec {
  name: string
  description: string
  userStory: string
  category: 'core' | 'mvp' | 'advanced'
  value: 'high' | 'medium' | 'low'
  effort: 'small' | 'medium' | 'large'
  successMetric: string
}

export const FEATURE_TEMPLATES: Record<ProductCategory, FeatureSpec[]> = {
  saas: [
    {
      name: 'Role-Based Access Control (RBAC)',
      description: 'Granular permission system controlling who can view/edit/delete workspace resources',
      userStory: 'As a VP Product, I want to grant junior PMs view-only access so they learn without breaking production',
      category: 'core',
      value: 'high',
      effort: 'medium',
      successMetric: 'Reduce onboarding time for new team members by 50%',
    },
    {
      name: 'Real-Time Collaboration',
      description: 'Live cursor tracking, instant updates, conflict resolution when multiple users edit simultaneously',
      userStory: 'As an Engineering Manager, I want my team to see PRD changes live so we eliminate async delays',
      category: 'core',
      value: 'high',
      effort: 'large',
      successMetric: 'Reduce feature planning meetings from 3 to 1 per week',
    },
    {
      name: 'Custom Dashboard Builder',
      description: 'Drag-and-drop interface to create personalized dashboards showing KPIs, roadmap, team metrics',
      userStory: 'As a Founder/CEO, I want a dashboard showing revenue impact of features so I can focus on what matters',
      category: 'mvp',
      value: 'high',
      effort: 'medium',
      successMetric: 'Execs spend < 10 min/day checking status instead of 30 min',
    },
    {
      name: 'Native Integrations with CRM/Analytics',
      description: 'Pre-built connectors to Salesforce, Amplitude, Mixpanel, Segment pulling customer/product data',
      userStory: 'As a Product Ops Manager, I want data from Amplitude + Salesforce in one place so I stop context-switching',
      category: 'advanced',
      value: 'medium',
      effort: 'large',
      successMetric: 'Cross-functional alignment score increases from 60% to 85%',
    },
    {
      name: 'Automated Roadmap Alignment',
      description: 'AI-powered system suggesting which features to prioritize based on customer data + strategic goals',
      userStory: 'As a Designer, I want the system to highlight which features solve the most customer pain so I prioritize correctly',
      category: 'advanced',
      value: 'medium',
      effort: 'large',
      successMetric: 'Feature adoption rate improves from 45% to 60%',
    },
  ],
  b2c_app: [
    {
      name: 'Social Onboarding (Apple/Google Sign-In)',
      description: 'One-tap sign-up using social accounts, no password entry required',
      userStory: 'As a busy professional, I want to sign up in 5 seconds so I can try the app immediately',
      category: 'core',
      value: 'high',
      effort: 'small',
      successMetric: 'Onboarding completion rate > 70% (from typical 40%)',
    },
    {
      name: 'Personalized Activity Feed',
      description: 'Algorithm-driven feed showing content and recommendations tailored to user interests',
      userStory: 'As a casual user, I want to see content I care about so I spend more time in the app',
      category: 'core',
      value: 'high',
      effort: 'large',
      successMetric: 'Increase D30 retention from 15% to 35%',
    },
    {
      name: 'Push Notifications with Smart Timing',
      description: 'ML-powered notifications sent at optimal times when user is most likely to engage',
      userStory: 'As a growth manager, I want to nudge users back without being intrusive so churn decreases',
      category: 'mvp',
      value: 'high',
      effort: 'medium',
      successMetric: 'Reduce uninstall rate by 20%',
    },
  ],
  marketplace: [
    {
      name: 'Trust & Verification System',
      description: 'Background checks, ID verification, seller rating algorithm preventing fraud',
      userStory: 'As a buyer, I want to know sellers are legit so I feel safe purchasing',
      category: 'core',
      value: 'high',
      effort: 'large',
      successMetric: 'Reduce fraud chargebacks to < 0.5% of GMV',
    },
    {
      name: 'Intelligent Search & Discovery',
      description: 'Semantic search, personalized recommendations, trending items based on user behavior',
      userStory: 'As a seller, I want my products found by right buyers so my conversion rate improves',
      category: 'core',
      value: 'high',
      effort: 'large',
      successMetric: 'Increase average seller sales by 40%',
    },
  ],
  hardware: [
    {
      name: 'Over-The-Air (OTA) Update System',
      description: 'Secure firmware updates without device factory reset, automatic deployment, rollback capability',
      userStory: 'As a hardware engineer, I want to push fixes to 100K devices remotely so I avoid costly recalls',
      category: 'core',
      value: 'high',
      effort: 'large',
      successMetric: 'Reduce field device failures by 60%',
    },
  ],
  service: [
    {
      name: 'Automated Scheduling & Dispatch',
      description: 'Route optimization, technician availability syncing, real-time customer updates',
      userStory: 'As a business owner, I want scheduling automated so office staff can focus on sales',
      category: 'core',
      value: 'high',
      effort: 'medium',
      successMetric: 'Reduce admin overhead by 70%',
    },
  ],
  community: [
    {
      name: 'AI-Powered Moderation',
      description: 'Auto-detection of spam, toxicity, off-topic posts with human review escalation',
      userStory: 'As a community manager, I want automated moderation so I spend < 30 min/day on cleanup',
      category: 'mvp',
      value: 'high',
      effort: 'large',
      successMetric: 'Reduce moderation time by 80%',
    },
  ],
  ai_tool: [
    {
      name: 'Model Fine-Tuning Interface',
      description: 'Simple UI to upload training data, configure hyperparameters, track training progress',
      userStory: 'As a researcher, I want to fine-tune models on my domain data so accuracy improves',
      category: 'core',
      value: 'high',
      effort: 'medium',
      successMetric: 'Reduce fine-tuning time from weeks to days',
    },
  ],
  mobile_app: [
    {
      name: 'Offline-First Sync Engine',
      description: 'App works fully offline, syncs automatically when connection restored, conflict resolution',
      userStory: 'As a commuter, I want to use the app in the subway so I don\'t lose productivity',
      category: 'core',
      value: 'high',
      effort: 'large',
      successMetric: 'Reduce user frustration from network errors by 90%',
    },
  ],
  web_app: [
    {
      name: 'Real-Time Collaboration',
      description: 'Live cursor tracking, instant updates, conflict-free editing when multiple users edit',
      userStory: 'As a designer, I want my team to see changes live so we eliminate Slack back-and-forth',
      category: 'core',
      value: 'high',
      effort: 'large',
      successMetric: 'Reduce design review meetings from 5/week to 2/week',
    },
  ],
  fintech: [
    {
      name: 'Automated Tax Loss Harvesting',
      description: 'Algorithm continuously identifies losing positions, suggests swaps, auto-executes if approved',
      userStory: 'As an investor, I want taxes optimized automatically so I keep more of my returns',
      category: 'advanced',
      value: 'high',
      effort: 'large',
      successMetric: 'Save investor average $500-1000/year in taxes',
    },
  ],
  healthcare: [
    {
      name: 'AI-Assisted Clinical Documentation',
      description: 'Voice recording during patient visit auto-transcribed and converted to EHR-compatible notes',
      userStory: 'As a doctor, I want to stop typing notes so I spend more time with patients',
      category: 'mvp',
      value: 'high',
      effort: 'large',
      successMetric: 'Reduce charting time from 2 hours to 30 minutes per day',
    },
  ],
  edtech: [
    {
      name: 'Adaptive Learning Paths',
      description: 'AI detects student knowledge gaps, suggests next lesson, adjusts difficulty dynamically',
      userStory: 'As a teacher, I want personalized learning paths so struggling students catch up',
      category: 'advanced',
      value: 'high',
      effort: 'large',
      successMetric: 'Improve struggling student performance by 30%',
    },
  ],
  gaming: [
    {
      name: 'Skill-Based Matchmaking',
      description: 'ELO-style rating system, queue optimization, smurf detection, balanced teams',
      userStory: 'As a competitive player, I want fair matches so ranked climbing feels earned',
      category: 'core',
      value: 'high',
      effort: 'medium',
      successMetric: 'Increase competitive mode engagement by 50%',
    },
  ],
  social: [
    {
      name: 'Creator Monetization Tools',
      description: 'Built-in subscription tiers, fan donations, affiliate links, sponsorship matching',
      userStory: 'As a content creator, I want multiple revenue streams so I can make a living',
      category: 'core',
      value: 'high',
      effort: 'large',
      successMetric: 'Enable creators to earn average $5K/month',
    },
  ],
}

export function getDefaultFeatures(category: ProductCategory): FeatureSpec[] {
  return FEATURE_TEMPLATES[category] || FEATURE_TEMPLATES.saas
}

export function getFeaturesByCategory(features: FeatureSpec[], cat: 'core' | 'mvp' | 'advanced'): FeatureSpec[] {
  return features.filter(f => f.category === cat)
}

export function sortByValueAndEffort(features: FeatureSpec[]): FeatureSpec[] {
  const valueScore = { high: 3, medium: 2, low: 1 }
  const effortScore = { small: 3, medium: 2, large: 1 }
  return [...features].sort((a, b) => {
    const scoreA = valueScore[a.value] * effortScore[a.effort]
    const scoreB = valueScore[b.value] * effortScore[b.effort]
    return scoreB - scoreA
  })
}
