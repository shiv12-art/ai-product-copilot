import { ProductCategory } from '@/types/generation'

export interface Persona {
  name: string
  role: string
  goal: string
  pain: string
  type: 'primary' | 'secondary' | 'tertiary'
}

const PERSONA_TEMPLATES: Record<ProductCategory, Persona[]> = {
  saas: [
    {
      name: 'Sarah Chen',
      role: 'VP of Product',
      goal: 'Ship features faster and improve team coordination',
      pain: 'Managing distributed teams and unclear priorities',
      type: 'primary',
    },
    {
      name: 'Marcus Johnson',
      role: 'Team Lead',
      goal: 'Reduce time spent in meetings and status updates',
      pain: 'Information silos and lack of visibility',
      type: 'secondary',
    },
    {
      name: 'Alex Rodriguez',
      role: 'Individual Contributor',
      goal: 'Focus on deep work without interruptions',
      pain: 'Constant context switching and notifications',
      type: 'tertiary',
    },
  ],
  b2c_app: [
    {
      name: 'Emma Wilson',
      role: 'Busy Professional',
      goal: 'Stay organized and achieve personal goals',
      pain: 'Juggling multiple commitments and habits',
      type: 'primary',
    },
    {
      name: 'James Park',
      role: 'College Student',
      goal: 'Connect with peers and have fun',
      pain: 'Missing out on social experiences',
      type: 'secondary',
    },
    {
      name: 'Lisa Brown',
      role: 'Health-Conscious Individual',
      goal: 'Track and improve wellness',
      pain: 'Lack of motivation and accountability',
      type: 'tertiary',
    },
  ],
  marketplace: [
    {
      name: 'David Smith',
      role: 'Small Business Owner',
      goal: 'Expand customer base and increase revenue',
      pain: 'Limited reach and marketing budget',
      type: 'primary',
    },
    {
      name: 'Rachel Green',
      role: 'Frequent Buyer',
      goal: 'Find quality products at good prices',
      pain: 'Too many options and quality uncertainty',
      type: 'secondary',
    },
    {
      name: 'Kevin Lee',
      role: 'Casual Seller',
      goal: 'Make money from unused items',
      pain: 'Logistics and trust concerns',
      type: 'tertiary',
    },
  ],
  hardware: [
    {
      name: 'Thomas Miller',
      role: 'Tech Enthusiast',
      goal: 'Automate home and increase efficiency',
      pain: 'Complex setup and compatibility issues',
      type: 'primary',
    },
    {
      name: 'Patricia Davis',
      role: 'Homeowner',
      goal: 'Improve home security and convenience',
      pain: 'High cost and technical complexity',
      type: 'secondary',
    },
    {
      name: 'Michael Anderson',
      role: 'Early Adopter',
      goal: 'Experiment with new technology',
      pain: 'Limited integration options',
      type: 'tertiary',
    },
  ],
  service: [
    {
      name: 'Jennifer Taylor',
      role: 'Service Business Owner',
      goal: 'Scale business and improve margins',
      pain: 'Manual scheduling and billing',
      type: 'primary',
    },
    {
      name: 'Robert Martinez',
      role: 'Service Provider',
      goal: 'Increase client satisfaction',
      pain: 'Poor scheduling and communication',
      type: 'secondary',
    },
    {
      name: 'Angela Thompson',
      role: 'Service Consumer',
      goal: 'Book services conveniently',
      pain: 'Difficulty finding and booking',
      type: 'tertiary',
    },
  ],
  community: [
    {
      name: 'Jordan White',
      role: 'Community Builder',
      goal: 'Create engaged community',
      pain: 'Moderation and engagement challenges',
      type: 'primary',
    },
    {
      name: 'Casey Jackson',
      role: 'Active Community Member',
      goal: 'Connect with like-minded people',
      pain: 'Toxicity and low-quality content',
      type: 'secondary',
    },
    {
      name: 'Morgan Harris',
      role: 'Casual User',
      goal: 'Find information and resources',
      pain: 'Noise and information overload',
      type: 'tertiary',
    },
  ],
  ai_tool: [
    {
      name: 'Dr. Lisa Wang',
      role: 'AI Researcher',
      goal: 'Advance AI capabilities',
      pain: 'Limited customization options',
      type: 'primary',
    },
    {
      name: 'Thomas Developer',
      role: 'ML Engineer',
      goal: 'Build AI applications quickly',
      pain: 'Complexity and integration overhead',
      type: 'secondary',
    },
    {
      name: 'Sarah Product Manager',
      role: 'Product Manager',
      goal: 'Add AI features to products',
      pain: 'Cost and technical barriers',
      type: 'tertiary',
    },
  ],
}

export function getDefaultPersonas(category: ProductCategory): Persona[] {
  return PERSONA_TEMPLATES[category] || PERSONA_TEMPLATES.saas
}
