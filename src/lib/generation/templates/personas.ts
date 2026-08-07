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
  mobile_app: [
    {
      name: 'Jessica Chen',
      role: 'Commuting Professional',
      goal: 'Manage tasks and stay productive on-the-go',
      pain: 'Limited screen time and frequent interruptions',
      type: 'primary',
    },
    {
      name: 'Marcus Thompson',
      role: 'Mobile Developer',
      goal: 'Build engaging mobile experiences',
      pain: 'Device fragmentation and performance constraints',
      type: 'secondary',
    },
    {
      name: 'Sophie Patel',
      role: 'Young Professional',
      goal: 'Stay connected with friends and communities',
      pain: 'Missed notifications and slow load times',
      type: 'tertiary',
    },
  ],
  web_app: [
    {
      name: 'David Nguyen',
      role: 'Software Engineer',
      goal: 'Build scalable web applications',
      pain: 'Browser compatibility issues and performance optimization',
      type: 'primary',
    },
    {
      name: 'Amanda Foster',
      role: 'Product Designer',
      goal: 'Create responsive and accessible user experiences',
      pain: 'Complex design system implementation across devices',
      type: 'secondary',
    },
    {
      name: 'Kevin Walsh',
      role: 'Business Owner',
      goal: 'Reach customers through web presence',
      pain: 'Lack of technical expertise and hosting complexity',
      type: 'tertiary',
    },
  ],
  fintech: [
    {
      name: 'Rachel Goldman',
      role: 'Retail Investor',
      goal: 'Build investment portfolio and grow wealth',
      pain: 'Complex trading platforms and hidden fees',
      type: 'primary',
    },
    {
      name: 'Michael Chen',
      role: 'Small Business Owner',
      goal: 'Manage cash flow and payments efficiently',
      pain: 'Multiple payment systems and poor reconciliation',
      type: 'secondary',
    },
    {
      name: 'Laura Kim',
      role: 'Financial Advisor',
      goal: 'Provide clients with better investment options',
      pain: 'Regulatory compliance and limited platforms',
      type: 'tertiary',
    },
  ],
  healthcare: [
    {
      name: 'Dr. James Wilson',
      role: 'Healthcare Provider',
      goal: 'Improve patient outcomes and efficiency',
      pain: 'Fragmented patient data and administrative burden',
      type: 'primary',
    },
    {
      name: 'Patricia Lopez',
      role: 'Patient',
      goal: 'Manage health and access care conveniently',
      pain: 'Long wait times and poor communication with providers',
      type: 'secondary',
    },
    {
      name: 'Robert Zhang',
      role: 'Hospital Administrator',
      goal: 'Optimize operations and reduce costs',
      pain: 'Legacy systems and compliance complexity',
      type: 'tertiary',
    },
  ],
  edtech: [
    {
      name: 'Emma Roberts',
      role: 'Educator',
      goal: 'Engage students and improve learning outcomes',
      pain: 'Time-consuming lesson planning and grading',
      type: 'primary',
    },
    {
      name: 'Tyler Hayes',
      role: 'Student',
      goal: 'Learn effectively and achieve academic success',
      pain: 'Passive learning and lack of personalized feedback',
      type: 'secondary',
    },
    {
      name: 'Michelle Grant',
      role: 'School Administrator',
      goal: 'Streamline operations and measure student progress',
      pain: 'Disconnected systems and poor data visibility',
      type: 'tertiary',
    },
  ],
  gaming: [
    {
      name: 'Alex Rodriguez',
      role: 'Competitive Gamer',
      goal: 'Win tournaments and build reputation',
      pain: 'Unfair matchmaking and technical lag',
      type: 'primary',
    },
    {
      name: 'Nathan Brooks',
      role: 'Game Developer',
      goal: 'Create engaging multiplayer experiences',
      pain: 'Complex netcode and server infrastructure',
      type: 'secondary',
    },
    {
      name: 'Lisa Anderson',
      role: 'Casual Gamer',
      goal: 'Have fun and relax after work',
      pain: 'Pay-to-win mechanics and intrusive monetization',
      type: 'tertiary',
    },
  ],
  social: [
    {
      name: 'Sofia Martinez',
      role: 'Content Creator',
      goal: 'Build audience and monetize content',
      pain: 'Algorithm changes and limited discoverability',
      type: 'primary',
    },
    {
      name: 'Christian Park',
      role: 'Social Media Manager',
      goal: 'Manage brand presence across platforms',
      pain: 'Fragmented tools and inconsistent analytics',
      type: 'secondary',
    },
    {
      name: 'Hannah Black',
      role: 'Everyday User',
      goal: 'Stay connected with friends and family',
      pain: 'Misinformation and privacy concerns',
      type: 'tertiary',
    },
  ],
}

export function getDefaultPersonas(category: ProductCategory): Persona[] {
  return PERSONA_TEMPLATES[category] || PERSONA_TEMPLATES.saas
}
