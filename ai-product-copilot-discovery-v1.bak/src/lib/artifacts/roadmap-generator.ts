import { DiscoveryReport } from '@/lib/types/discovery'

export function generateRoadmap(discovery: DiscoveryReport): string {
  const { recommendations, insights } = discovery

  return `# Product Roadmap

## MVP Phase (Weeks 1-8)

### Core Features
${recommendations.firstFeatures.map((f, i) => `- [ ] **${i + 1}. ${f}**`).join('\n')}

### Technical Requirements
- Authentication & user management
- Analytics & usage tracking
- Error handling & logging
- Mobile responsive design
- Performance optimization (< 2s load time)

### Success Criteria
- 100+ beta sign-ups
- 50%+ feature adoption rate
- NPS > 30
- Zero critical bugs

---

## Phase 2: Expand (Months 3-6)

### User Experience
- Advanced settings & customization
- Keyboard shortcuts & workflows
- Dark mode support
- Accessibility (WCAG 2.1 AA)

### Integration
- GitHub/GitLab integration
- VS Code extension marketplace
- JetBrains marketplace
- Slack notifications

### Performance
- 30% faster response time
- Offline support
- Caching optimization
- API rate limit handling

### Success Criteria
- 5,000+ paying customers
- 70%+ retention (Month 3)
- NPS > 45
- 99.9% uptime

---

## Phase 3: Enterprise (Months 7-12)

### Enterprise Features
- Single Sign-On (SSO/SAML)
- Advanced audit logging
- Role-based access control (RBAC)
- Custom branding
- SLA guarantees

### Compliance
- GDPR compliance
- SOC 2 certification
- HIPAA support (if healthcare vertical)
- Data residency options

### AI/ML Enhancements
- Custom model training
- Fine-tuning on codebase patterns
- Specialized models by language
- Performance benchmarking

### Success Criteria
- 500+ enterprise customers
- \$500k+ ARR
- NPS > 50
- 99.95% uptime SLA

---

## Phase 4: Platform (Year 2)

### Ecosystem
- Plugin marketplace for extensions
- API for third-party integrations
- Webhooks & event streaming
- Custom analytics dashboards

### Vertical Specialization
- Language-specific models (Python, JavaScript, Go, etc.)
- Framework-specific knowledge (React, Django, etc.)
- Industry patterns (fintech, healthcare, etc.)

### Community
- Open source SDK
- Community plugins
- Developer forum
- Certification program

---

## Backlog (Ongoing)

### User Feedback Loop
- Monthly feature survey
- User interviews (10+ per quarter)
- Community feedback monitoring
- Competitor feature tracking

### Technical Debt
- Code refactoring
- Test coverage improvements (target: 80%)
- Documentation updates
- Dependency updates

### Scaling
- Infrastructure optimization
- Multi-region deployment
- CDN integration
- Database optimization

---

## Prioritization Framework

**Scoring:** Impact (1-10) × Effort (1-10) × Alignment (1-10) = Priority Score

### Current Sprint Priorities
1. **${recommendations.firstFeatures[0] || 'Core Feature'}** - High impact, MVP critical
2. **Authentication** - Foundation for all features
3. **Analytics Dashboard** - Understand user behavior
4. **Bug fixes** - Maintain stability

### Investment Allocation
- **MVP Features:** 60% (must-have)
- **Phase 2 Features:** 25% (should-have)
- **Phase 3 Features:** 10% (nice-to-have)
- **Technical Debt:** 5% (continuous)

---

## Risk Mitigation

### Key Risks
${recommendations.risks.map((risk, i) => `${i + 1}. **${risk}**\n   - Mitigation: Continuous iteration based on feedback`).join('\n\n')}

### Contingencies
- If adoption is slow: Increase free tier value
- If scaling issues: Pre-build infrastructure
- If competition increases: Accelerate Phase 3
`
}
