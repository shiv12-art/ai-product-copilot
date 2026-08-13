import { ProductCategory } from '@/types/generation'

export interface PersonaPainPoint {
  title: string
  description: string
}

export interface PersonaJobContext {
  department: string
  teamSize: string
  budgetAuthority: string
  reportingTo?: string
}

export interface Persona {
  name: string
  role: string
  goal: string
  painPoints: PersonaPainPoint[]
  jobContext: PersonaJobContext
  successMetrics: string[]
  objections: string[]
  type: 'primary' | 'secondary' | 'tertiary'
}

const PERSONA_TEMPLATES: Record<ProductCategory, Persona[]> = {
  saas: [
    {
      name: 'Sarah Chen',
      role: 'VP Product at Series A Startup',
      goal: 'Validate product-market fit and prioritize features strategically',
      painPoints: [
        { title: 'Scattered Requirements', description: 'Customer feedback scattered across Slack, Intercom, and spreadsheets' },
        { title: 'Competitive Blind Spot', description: 'Takes 2+ weeks to compile comprehensive competitive analysis' },
        { title: 'Investor Pressure', description: 'Must justify product direction to VCs without clear market data' },
      ],
      jobContext: {
        department: 'Product Management',
        teamSize: '3-5 PMs + 1 Design lead',
        budgetAuthority: 'Control $500K annual product budget',
        reportingTo: 'VP Engineering + CEO',
      },
      successMetrics: ['Feature adoption rate > 60%', 'NPS improvement >5 points/quarter', 'Revenue per user +20%'],
      objections: [
        'We already use Jira for requirements',
        'Will take 3+ weeks to implement and train team',
        'Team resistant to adopting new tools',
      ],
      type: 'primary',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Engineering Manager at 50-person SaaS Company',
      goal: 'Ship features on time while maintaining code quality',
      painPoints: [
        { title: 'Ambiguous Requirements', description: 'PRDs lack acceptance criteria; multiple rework cycles' },
        { title: 'Context Switching', description: 'Engineers constantly context-switching between features and bugs' },
        { title: 'Velocity Unpredictable', description: 'Difficult to estimate sprints due to scope creep' },
      ],
      jobContext: {
        department: 'Engineering',
        teamSize: '8-12 engineers, 2 staff engineers',
        budgetAuthority: 'Owns tool budget for engineering ($50K/year)',
        reportingTo: 'VP Engineering',
      },
      successMetrics: ['Sprint velocity consistency +40%', 'Bug escape rate < 2%', 'On-time delivery > 90%'],
      objections: [
        'Requires engineering buy-in and learning curve',
        'Another tool means more Slack notifications',
        'Jira already covers project management',
      ],
      type: 'secondary',
    },
    {
      name: 'James Park',
      role: 'Founder/CEO of Bootstrap SaaS',
      goal: 'Wear multiple hats efficiently without hiring full product team',
      painPoints: [
        { title: 'No Time for Strategy', description: 'Spent 80% of time on ops/sales, 20% on product' },
        { title: 'Customer Feedback Black Hole', description: 'Customer calls/emails not aggregated anywhere' },
        { title: 'No Data on What Works', description: 'Guessing on features because no analytics tooling' },
      ],
      jobContext: {
        department: 'Executive (all functions)',
        teamSize: '3-5 person team, no dedicated PM',
        budgetAuthority: 'Full discretion, budget: $30K/month',
        reportingTo: 'Investors',
      },
      successMetrics: ['Reduce feature time-to-decision by 5x', 'Customer retention +30%', 'Survive to Series A'],
      objections: [
        'Cost must be < $99/month',
        'Must be zero setup time',
        'No time for training or onboarding',
      ],
      type: 'tertiary',
    },
    {
      name: 'Lisa Wang',
      role: 'Product Designer at Fortune 500 Enterprise SaaS',
      goal: 'Create cohesive, accessible user experiences across complex products',
      painPoints: [
        { title: 'Design System Fragmentation', description: '15 different button styles across product' },
        { title: 'Handoff Bottleneck', description: 'Designers and engineers speak different languages' },
        { title: 'A11y Compliance Gaps', description: 'WCAG compliance audits reveal gaps, remediation is painful' },
      ],
      jobContext: {
        department: 'Design + UX',
        teamSize: '6 designers, 2 design systems engineers',
        budgetAuthority: 'Design tool budget: $150K/year',
        reportingTo: 'VP Design',
      },
      successMetrics: ['Design system adoption > 80%', 'WCAG AA compliance 100%', 'Handoff time -30%'],
      objections: [
        'Design system already exists (fragmented)',
        'Integration with Figma/Sketch critical',
        'Enterprise security/SOC2 required',
      ],
      type: 'secondary',
    },
    {
      name: 'David Patel',
      role: 'Product Ops Manager at mid-stage SaaS',
      goal: 'Build scalable processes as team grows from 50 to 200 people',
      painPoints: [
        { title: 'Process Breakdown', description: 'Processes that worked for 5 PMs chaos with 20' },
        { title: 'Data Silos', description: 'Product data in Amplitude, CRM data in Salesforce, no single view' },
        { title: 'Stakeholder Misalignment', description: 'Product roadmap not aligned with sales, success, eng' },
      ],
      jobContext: {
        department: 'Product Operations',
        teamSize: '2 product ops, 25+ product team members',
        budgetAuthority: 'Product systems budget: $100K/year',
        reportingTo: 'Chief Product Officer',
      },
      successMetrics: ['Roadmap alignment score > 85%', 'Decision cycle time < 2 weeks', 'Tool costs consolidated by 40%'],
      objections: [
        'Requires org change management',
        'Data migration complex',
        'Adoption across diverse product orgs difficult',
      ],
      type: 'primary',
    },
  ],
  b2c_app: [
    {
      name: 'Sophie Lee',
      role: 'Solo App Developer / Indie Hacker',
      goal: 'Ship engaging mobile app and get first 1,000 users',
      painPoints: [
        { title: 'No Design Skills', description: 'Great coder but can\'t design polished UI' },
        { title: 'User Acquisition Unknown', description: 'No clue how to get users beyond friends' },
        { title: 'Monetization Unclear', description: 'Don\'t know if ads, subscriptions, or in-app purchases' },
      ],
      jobContext: {
        department: 'Solo founder (all functions)',
        teamSize: '1 person',
        budgetAuthority: 'Personal funds: $2-5K bootstrap',
        reportingTo: 'Self',
      },
      successMetrics: ['Ship to App Store in 8 weeks', 'Hit 1,000 downloads/month', 'Profitability > $1K/month'],
      objections: [
        'Can\'t afford $99/month tools',
        'Learning curve must be minimal',
        'Prefers all-in-one solution',
      ],
      type: 'primary',
    },
    {
      name: 'Michael Torres',
      role: 'Growth Manager at Consumer App Startup',
      goal: 'Reduce churn and increase lifetime value of users',
      painPoints: [
        { title: 'DAU/MAU Declining', description: 'D30 retention at 15%, target is 35%' },
        { title: 'Black Box Analytics', description: 'Can\'t understand which features drive retention' },
        { title: 'A/B Testing Slow', description: 'Takes 2+ weeks to run simple A/B test' },
      ],
      jobContext: {
        department: 'Growth',
        teamSize: '2 growth managers, 1 data analyst, 20+ product team',
        budgetAuthority: 'Growth tool budget: $50K/year',
        reportingTo: 'VP Growth / CMO',
      },
      successMetrics: ['D7 retention +10 points', 'Feature A/B test cycle < 5 days', 'LTV/CAC ratio > 3x'],
      objections: [
        'Must integrate with Amplitude and Mixpanel',
        'Privacy concerns (GDPR/CCPA compliance)',
        'Real-time data critical',
      ],
      type: 'secondary',
    },
    {
      name: 'Emma Ramirez',
      role: 'Product Manager at Series B Consumer App',
      goal: 'Navigate monetization without destroying user experience',
      painPoints: [
        { title: 'Monetization Compromise', description: 'Ads/paywalls feel like dark patterns' },
        { title: 'Premium Adoption Stuck', description: 'Only 2% of users convert to premium, need 5%' },
        { title: 'Engagement vs Revenue Tension', description: 'More ads = more revenue but higher churn' },
      ],
      jobContext: {
        department: 'Product Management',
        teamSize: '4 PMs, 25+ engineers, 5 designers',
        budgetAuthority: 'Product + data tools: $200K/year',
        reportingTo: 'VP Product',
      },
      successMetrics: ['Premium conversion 5%+', 'User satisfaction maintained (NPS > 40)', 'ARPU +30%'],
      objections: [
        'Privacy regulations (GDPR/CCPA) limit data use',
        'Existing ad network contracts lock us in',
        'User backlash to aggressive monetization',
      ],
      type: 'primary',
    },
  ],
  marketplace: [
    {
      name: 'Emma Davis',
      role: 'Marketplace Director at 100-person Company',
      goal: 'Scale GMV 3x while maintaining trust and quality',
      painPoints: [
        { title: 'Fraud Escalating', description: 'Chargebacks +40% YoY, fake listings, fake reviews' },
        { title: 'Seller Retention Declining', description: 'Top 10% of sellers threatened to leave (to Shopify)' },
        { title: 'Buyer Trust Erosion', description: 'Net Promoter Score dropped 20 points due to bad experiences' },
      ],
      jobContext: {
        department: 'Marketplace Operations',
        teamSize: '2 marketplace directors, 5 trust & safety, 20+ ops team',
        budgetAuthority: 'Marketplace budget: $500K/year',
        reportingTo: 'VP Operations / CEO',
      },
      successMetrics: ['Fraud rate < 0.5% of GMV', 'Seller NPS > 60', 'GMV growth 30% YoY'],
      objections: [
        'Complex integration with payment processors',
        'Regulatory/compliance burden (PCI-DSS, KYC)',
        'Seller education and onboarding expensive',
      ],
      type: 'primary',
    },
    {
      name: 'Lucas Garcia',
      role: 'Full-time Seller on Multiple Marketplaces',
      goal: 'Maximize revenue while minimizing operational overhead',
      painPoints: [
        { title: 'Inventory Sync Hell', description: 'Out-of-stock items still selling on old listings' },
        { title: 'Platform Fees Opaque', description: 'Commission, payment processing, listing fees = 15-20% margin loss' },
        { title: 'Customer Service Fragmented', description: 'Different chat/message systems per marketplace' },
      ],
      jobContext: {
        department: 'Solo seller + 1-2 part-time helpers',
        teamSize: '2-3 person operation',
        budgetAuthority: 'Tools budget: < $200/month',
        reportingTo: 'Self (survival dependent)',
      },
      successMetrics: ['Save 5 hours/week on admin', 'Reduce inventory errors to < 1%', 'Margin improve by 5%'],
      objections: [
        'Already using marketplace admin tools',
        'Skeptical of third-party integrations',
        'Price sensitive (high volume, low margin)',
      ],
      type: 'secondary',
    },
  ],
  hardware: [
    {
      name: 'James Wilson',
      role: 'Lead Hardware Engineer at IoT Startup',
      goal: 'Ship first product to market in 12 months with optimal NRE',
      painPoints: [
        { title: 'Firmware + Cloud Integration Complex', description: 'Over-the-air updates, data sync, real-time control difficult' },
        { title: 'Debugging Remote Devices Hard', description: 'Field devices fail, no way to diagnose without physical access' },
        { title: 'NRE Budget Overrun', description: 'Firmware bugs discovered at manufacturing stage = costly delays' },
      ],
      jobContext: {
        department: 'Hardware + Firmware Engineering',
        teamSize: '4 hardware engineers, 2 firmware, 1 cloud',
        budgetAuthority: 'Dev tools and cloud budget: $50K/year',
        reportingTo: 'VP Engineering',
      },
      successMetrics: ['Ship on schedule (first product)', 'Firmware bugs < 5 critical issues', 'Power efficiency +15%'],
      objections: [
        'Firmware/cloud skills limited in hardware team',
        'Cloud vendor lock-in concerns',
        'Learning curve for new platforms',
      ],
      type: 'primary',
    },
  ],
  service: [
    {
      name: 'Jennifer Taylor',
      role: 'Service Business Owner with 30 Employees',
      goal: 'Scale to 100+ employees without hiring office staff',
      painPoints: [
        { title: 'Manual Scheduling Nightmare', description: 'Still using color-coded spreadsheets and phone calls' },
        { title: 'Billing Errors + Late Payments', description: 'Invoices sent late, no recurring billing, payment collections manual' },
        { title: 'No Data on Profitability', description: 'Don\'t know which technicians or service types are most profitable' },
      ],
      jobContext: {
        department: 'Operations',
        teamSize: '30 technicians, 2 office staff',
        budgetAuthority: 'Software budget: $10K/year',
        reportingTo: 'Self (owner-operator)',
      },
      successMetrics: ['Save 10 hours/week on admin', 'On-time revenue collection > 95%', 'Technician utilization > 85%'],
      objections: [
        'Technicians don\'t use smartphones/apps easily',
        'Requires offline capability (no service area internet)',
        'Integration with accounting system critical',
      ],
      type: 'primary',
    },
  ],
  community: [
    {
      name: 'Jordan White',
      role: 'Community Manager / Founder for 50K-member Community',
      goal: 'Build engaged, welcoming community at scale without burnout',
      painPoints: [
        { title: 'Moderation Overwhelm', description: 'Toxic behavior, spam, off-topic posts = 2 hours/day cleanup' },
        { title: 'Member Churn High', description: '30% of new members gone within first week' },
        { title: 'Engagement Plateaued', description: 'Same 5% of members posting, 95% lurking or silent' },
      ],
      jobContext: {
        department: 'Community / Operations',
        teamSize: '1-2 community managers, volunteers',
        budgetAuthority: 'Community tools: $5-10K/year',
        reportingTo: 'CEO / Board',
      },
      successMetrics: ['Member onboarding completion > 70%', 'Weekly active members +40%', 'Moderation time -60%'],
      objections: [
        'Switching platforms risks losing existing members',
        'Open source tools preferred (free)',
        'Privacy and data sovereignty critical',
      ],
      type: 'primary',
    },
  ],
  ai_tool: [
    {
      name: 'Dr. Lisa Wang',
      role: 'AI Research Lead at Tech Company',
      goal: 'Iterate on model architectures and fine-tuning at scale',
      painPoints: [
        { title: 'Infrastructure Bottleneck', description: 'Waiting for GPU clusters, no easy way to scale training' },
        { title: 'Experiment Tracking Fragmented', description: 'Ad-hoc logging, hard to compare model versions' },
        { title: 'Deployment Complexity', description: 'Gap between research model and production inference' },
      ],
      jobContext: {
        department: 'AI Research',
        teamSize: '8 researchers, 2 ML engineers',
        budgetAuthority: 'Compute + tooling: $200K/year',
        reportingTo: 'VP AI / Chief AI Officer',
      },
      successMetrics: ['Model iteration cycle 2x faster', 'Experiment tracking 100% comprehensive', 'Reproducibility > 90%'],
      objections: [
        'Must support PyTorch, TensorFlow, JAX',
        'Academic publication/IP concerns',
        'On-prem compute mandatory',
      ],
      type: 'primary',
    },
  ],
  mobile_app: [
    {
      name: 'Jessica Chen',
      role: 'Mobile PM at 200-person Company with 5M Users',
      goal: 'Improve mobile-first user experience and retention',
      painPoints: [
        { title: 'iOS/Android Parity Nightmare', description: 'Feature ships on iOS, Android version delayed 2+ months' },
        { title: 'Performance Regressions', description: 'Each release, some devices suddenly get < 20 FPS' },
        { title: 'Offline Sync Broken', description: 'Users lose data when switching networks mid-action' },
      ],
      jobContext: {
        department: 'Product / Mobile',
        teamSize: '8 iOS, 8 Android, 3 mobile PMs',
        budgetAuthority: 'Mobile tools and services: $100K/year',
        reportingTo: 'VP Product',
      },
      successMetrics: ['iOS/Android feature parity < 2 week lag', 'App crash rate < 0.1%', 'P75 load time < 2s'],
      objections: [
        'App store submission delays (Apple review)',
        'Device fragmentation makes testing hard',
        'Offline-first architecture unfamiliar to team',
      ],
      type: 'primary',
    },
  ],
  web_app: [
    {
      name: 'David Nguyen',
      role: 'Senior Frontend Engineer at 300-person Company',
      goal: 'Deliver performant, accessible, modern web experiences',
      painPoints: [
        { title: 'Performance Regression Detector Missing', description: 'Bundle size creeps up 5% per release, no alert' },
        { title: 'Accessibility Compliance Gap', description: 'Claims WCAG AA but keyboard nav broken, screen reader fails' },
        { title: 'Cross-browser Support Drains Time', description: '15% of dev time on IE11/Safari quirks' },
      ],
      jobContext: {
        department: 'Frontend Engineering',
        teamSize: '15 frontend engineers, 5 platform engineers',
        budgetAuthority: 'Dev tools: $50K/year',
        reportingTo: 'Engineering Manager / Director',
      },
      successMetrics: ['Bundle size < 250KB', 'WCAG AA automated compliance 100%', 'Core Web Vitals: all green'],
      objections: [
        'CI/CD integration critical (GitHub Actions, etc)',
        'Learning curve for new frameworks',
        'Legacy codebase compatibility',
      ],
      type: 'primary',
    },
  ],
  fintech: [
    {
      name: 'Rachel Goldman',
      role: 'Retail Investor, Self-Directed Trader',
      goal: 'Build diversified portfolio with minimal fees and complexity',
      painPoints: [
        { title: 'Hidden Fees Surprise', description: 'Commission waived but fund expense ratios 0.75%+ (vs 0.04% index funds)' },
        { title: 'Complex User Interface', description: 'Takes 5 clicks to place a trade; quarterly rebalancing manual' },
        { title: 'Tax Lot Confusion', description: 'No automatic tax-loss harvesting; complex to calc capital gains' },
      ],
      jobContext: {
        department: 'Personal Finance',
        teamSize: '1 person managing own portfolio',
        budgetAuthority: 'Will pay $10-20/month for better experience',
        reportingTo: 'Self',
      },
      successMetrics: ['Reduce annual fees by $500-1000', 'Rebalance in < 1 minute', 'Taxes calculated automatically'],
      objections: [
        'Skeptical of "too good to be true" fee claims',
        'Regulatory concern with new fintech apps',
        'Data security paramount',
      ],
      type: 'primary',
    },
  ],
  healthcare: [
    {
      name: 'Dr. James Wilson',
      role: 'Family Medicine Doctor / Clinic Owner',
      goal: 'Improve patient outcomes while reducing administrative overhead',
      painPoints: [
        { title: 'EHR Documentation Burden', description: 'Spends 2+ hours/day on charting; seeing fewer patients' },
        { title: 'Patient No-Shows', description: '20% of appointments no-show; lost revenue and wasted slots' },
        { title: 'Fragmented Patient Data', description: 'Referrals not received; patient records from prior docs missing' },
      ],
      jobContext: {
        department: 'Medical Practice Operations',
        teamSize: '2 doctors, 3 nurses, 2 admin staff',
        budgetAuthority: 'EMR/EHR software: $20K/year',
        reportingTo: 'Self (clinic owner)',
      },
      successMetrics: ['Reduce charting time by 50%', 'No-show rate < 10%', 'Patient access to records same-day'],
      objections: [
        'HIPAA compliance non-negotiable',
        'Integration with existing EHR (Epic, Cerner) required',
        'Physician adoption resistance (tech-averse)',
      ],
      type: 'primary',
    },
  ],
  edtech: [
    {
      name: 'Emma Roberts',
      role: 'High School Teacher with 150+ Students',
      goal: 'Personalize learning while maintaining grading sanity',
      painPoints: [
        { title: 'Grading Overwhelm', description: 'Takes 10 hours/week to grade 150 assignments manually' },
        { title: 'One-Size-Fits-All Instruction', description: 'No time to differentiate for advanced/struggling students' },
        { title: 'Parent Communication Sparse', description: 'Parents only hear from teacher at report card time' },
      ],
      jobContext: {
        department: 'Secondary Education',
        teamSize: '1 teacher, 1 teaching assistant (shared with 3 teachers)',
        budgetAuthority: 'Ed tech budget: $2K/year (tight)',
        reportingTo: 'Department Head / Principal',
      },
      successMetrics: ['Reduce grading time to 5 hours/week', 'Student engagement +30%', 'Parent satisfaction > 4.2/5'],
      objections: [
        'Free or < $5/student/year mandatory',
        'Integration with Google Classroom / Canvas required',
        'Student privacy and data custody critical',
      ],
      type: 'primary',
    },
  ],
  gaming: [
    {
      name: 'Alex Rodriguez',
      role: 'Competitive Esports Player / Content Creator',
      goal: 'Win tournaments and build streaming audience',
      painPoints: [
        { title: 'Unfair Matchmaking', description: 'Ranked ladder pairs with smurfs and griefers constantly' },
        { title: 'Lag and Rubberbanding', description: '100ms+ latency makes competitive play impossible' },
        { title: 'Toxic Community', description: 'Chat full of slurs and harassment; muting doesn\'t prevent gameplay impact' },
      ],
      jobContext: {
        department: 'Gaming (content creation / sponsorships)',
        teamSize: '1 person + family support',
        budgetAuthority: 'Will pay for premium pass ($10-20/month)',
        reportingTo: 'Self / Sponsors',
      },
      successMetrics: ['Rank top 1% within 3 months', 'Stream average 1000 viewers', 'Tournament winnings > $50K/year'],
      objections: [
        'Free-to-play mandatory (no upfront cost)',
        'No pay-to-win mechanics',
        'Cross-platform play expected',
      ],
      type: 'primary',
    },
  ],
  social: [
    {
      name: 'Sofia Martinez',
      role: 'Full-Time Content Creator on TikTok / Instagram',
      goal: 'Grow audience to 1M+ followers and monetize content',
      painPoints: [
        { title: 'Algorithm Opacity', description: 'Strategies that worked 6 months ago no longer work; no clear guidance' },
        { title: 'Monetization Rate Dropped', description: 'CPM down 50% YoY; struggling to make $5K/month' },
        { title: 'Cross-Platform Exhaustion', description: 'Uploads to TikTok, Instagram, YouTube, Twitter = 4 hours/day' },
      ],
      jobContext: {
        department: 'Content Creation (self-employed)',
        teamSize: '1 person + 1 part-time editor/manager',
        budgetAuthority: 'Will invest 20% of revenue in tools (~$1K/month)',
        reportingTo: 'Self / Brand sponsors',
      },
      successMetrics: ['Reach 500K followers in 12 months', 'CPM increase to $3+', 'Multi-platform posting < 1 hour/day'],
      objections: [
        'Platform algorithm changes uncontrollable',
        'Copyright/DMCA claims threaten monetization',
        'Creator burnout real (sustainability critical)',
      ],
      type: 'primary',
    },
  ],
}

export function getDefaultPersonas(category: ProductCategory): Persona[] {
  return PERSONA_TEMPLATES[category] || PERSONA_TEMPLATES.saas
}
