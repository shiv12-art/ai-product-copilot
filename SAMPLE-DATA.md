# 📊 SAMPLE DATA FOR TESTING

This document provides sample product ideas and data to test the AI Product Copilot.

---

## 🧪 QUICK-START EXAMPLES

Click any sample in the app to auto-fill the form and generate artifacts instantly.

### 1️⃣ Remote Team Collaboration (SaaS)

**Problem Statement:**
```
Teams struggle with asynchronous collaboration, scattered communication, and lack of context when working across time zones.
```

**Category:** SaaS ☁️

**Expected Artifacts:**
- Product Canvas: Overview of collaboration platform
- PRD: Requirements for real-time sync, notifications, context preservation
- GTM: Focus on enterprise sales, freemium model
- Features: Video, chat, document collab, activity timeline
- Validation: Survey 50 remote teams, test with 20 beta users
- Competitive Analysis: Slack, Teams, Notion, Linear
- Pitch: "Asynchronous First Collaboration Platform"

---

### 2️⃣ AI Code Assistant (AI Tool)

**Problem Statement:**
```
Developers spend too much time on boilerplate code and repetitive tasks. They need an AI tool that understands their codebase context.
```

**Category:** AI Tool 🤖

**Expected Artifacts:**
- Product Canvas: VS Code plugin for AI-powered code generation
- PRD: Context awareness, multi-file support, custom training
- GTM: Developer community marketing, GitHub integration
- Features: Inline suggestions, test generation, documentation
- Validation: GitHub Copilot comparison, developer surveys
- Competitive Analysis: GitHub Copilot, Tabnine, CodeWhisperer
- Pitch: "Context-Aware AI for Developers"

---

### 3️⃣ Fitness Marketplace (Marketplace)

**Problem Statement:**
```
Fitness professionals are underutilized. We want to create a marketplace connecting certified trainers with people seeking personalized fitness guidance.
```

**Category:** Marketplace 🛒

**Expected Artifacts:**
- Product Canvas: Two-sided marketplace for fitness services
- PRD: Trainer profiles, booking, payment processing, reviews
- GTM: Partnership with gyms, influencer collaborations
- Features: Video classes, personalized plans, community challenges
- Validation: Interview 100 trainers, 200 users
- Competitive Analysis: Peloton, ClassPass, Apple Fitness+
- Pitch: "Airbnb for Fitness Expertise"

---

### 4️⃣ Mental Health Mobile App (Mobile App)

**Problem Statement:**
```
Young adults struggle with anxiety and depression but avoid seeking help. A mobile app offering accessible mental health support could help.
```

**Category:** Mobile App 📱

**Expected Artifacts:**
- Product Canvas: Mental wellness app with AI chatbot & therapist matching
- PRD: User authentication, chat interface, therapist network, payment
- GTM: Universities, schools, workplace wellness programs
- Features: Daily check-ins, mood tracking, meditation, therapy sessions
- Validation: Survey college students, clinical trials
- Competitive Analysis: Headspace, Calm, BetterHelp, Talkspace
- Pitch: "Accessible Mental Health Platform for Gen Z"

---

### 5️⃣ Fintech Investment Platform (Fintech)

**Problem Statement:**
```
Millennial investors want to invest fractional shares in diversified portfolios with low fees and social trading features.
```

**Category:** Fintech 💰

**Expected Artifacts:**
- Product Canvas: Social investment platform with fractional shares
- PRD: Trading engine, portfolio management, social features
- GTM: TikTok marketing, micro-influencers, referral program
- Features: Fractional shares, auto-invest, social feed, leaderboards
- Validation: Beta test with 1000 users, competitor analysis
- Competitive Analysis: Robinhood, Wealthsimple, Stake, Public
- Pitch: "Democratizing Investment Through Social Trading"

---

## 🎯 TESTING SCENARIOS

### Scenario 1: Quick MVP Validation
**Input:** Remote Team Collaboration (SaaS)
**Output:** Should generate 7 artifacts suitable for MVP planning
**Test:** Verify all artifacts are relevant and actionable

### Scenario 2: Different Category
**Input:** AI Code Assistant (AI Tool)
**Output:** Should generate tech-focused artifacts
**Test:** Check category-specific language and recommendations

### Scenario 3: Copy to Clipboard
**Input:** Any artifact
**Output:** "Copied!" feedback
**Test:** Verify content is properly copied to clipboard

### Scenario 4: Tab Switching
**Input:** Generated artifacts
**Output:** Switch between all 7 tabs
**Test:** Each tab displays correct content

### Scenario 5: New Generation
**Input:** Create new after viewing results
**Output:** Home page resets
**Test:** Can generate multiple times without clearing localStorage

---

## 📋 ADDITIONAL TEST DATA

### Category Testing
Test each of the 14 categories:

```
☁️  SaaS → B2B software
📱 Mobile App → Consumer app
🌐 Web App → Browser-based tool
🛒 Marketplace → Two-sided platform
👥 B2C App → Consumer product
⚙️ Hardware → Physical product
🤖 AI Tool → AI-powered software
💰 Fintech → Financial product
🏥 Healthcare → Medical/wellness
📚 EdTech → Education product
🎮 Gaming → Game/entertainment
💬 Social Network → Community platform
🔧 Service → Service business
🤝 Community → Community platform
```

### Edge Cases to Test

1. **Very Short Problem Statement**
   - Input: "Make a to-do app"
   - Expected: Still generates 7 artifacts

2. **Very Long Problem Statement**
   - Input: Detailed 500-word problem description
   - Expected: Handles gracefully

3. **Special Characters**
   - Input: Problem with emojis, quotes, symbols
   - Expected: Displays correctly in artifacts

4. **Rapid Generation**
   - Input: Generate multiple times in succession
   - Expected: No localStorage conflicts

5. **Browser Storage**
   - Action: Generate → Close tab → Reopen
   - Expected: Data persists or clears appropriately

---

## 🚀 PRODUCTION TESTING

### Before Going Live
- [ ] Test all 5 sample problems
- [ ] Test all 14 categories
- [ ] Test copy-to-clipboard functionality
- [ ] Test tab switching
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Check dark mode (if implemented)
- [ ] Verify artifacts are readable and useful

### Success Criteria
✅ All artifacts generate without errors  
✅ Copy-to-clipboard works reliably  
✅ UI responds quickly (<2s)  
✅ No console errors  
✅ Mobile responsive  
✅ Data persists correctly  

---

## 💡 SAMPLE OUTPUTS

### Example: Remote Team Collab - Product Canvas

```
# Product Canvas

## Problem
Teams struggle with asynchronous collaboration, scattered communication, and lack of context when working across time zones.

## Solution
A unified collaboration platform designed specifically for asynchronous work that maintains context across conversations and projects.

## Target Market
Remote-first companies, distributed teams, companies with global presence

## Key Features
- Threaded conversations with rich context
- Async-first design (not real-time dependent)
- Smart notifications (batched, time-zone aware)
- Document collaboration with version history
- Activity timeline and progress tracking

## Revenue Model
- Free tier: Basic team collaboration
- Pro: $10/user/month (advanced features)
- Enterprise: Custom pricing

## Metrics
- User retention after 30 days: >70%
- Daily active users: >100k by Year 2
- Net revenue retention: >120%
```

---

## 📊 METRICS TO TRACK

| Metric | Target | Purpose |
|--------|--------|---------|
| Artifacts generated | 1000+ | User engagement |
| Avg. generation time | <2s | Performance |
| Copy-to-clipboard usage | 60% | Feature adoption |
| Category distribution | Balanced | Feature popularity |
| Return users | 40% | Stickiness |

---

## 🎉 HAPPY TESTING!

These samples provide realistic product ideas with proper context. Use them to:
1. Verify artifact quality
2. Test UI/UX flows
3. Demonstrate to stakeholders
4. Build confidence in the product

**Pro Tip:** Combine sample problems with variations to test the system's flexibility!
