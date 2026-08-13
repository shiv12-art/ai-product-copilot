# Test Data & Sample Inputs

**Purpose:** Comprehensive test cases for validating AI Product Copilot functionality

---

## Sample Problem Statements

### **Category: SaaS**

**Test Case 1 (Short Problem):**
```
Build a tool to help remote teams manage asynchronous communication without Slack overload.
```
- Length: 108 characters
- Keywords: tool, remote, teams, asynchronous, communication, Slack
- Expected: Canvas, PRD, GTM, Features, Validation (all complete)

**Test Case 2 (Medium Problem):**
```
We're building the next generation of project management software. The problem is that existing tools 
like Asana and Monday.com are too complex, have poor mobile experiences, and don't integrate well 
with the tools developers actually use daily (GitHub, Slack, Jira). We want to create something 
that's lightning-fast, mobile-first, and focuses on developer productivity.
```
- Length: 380 characters
- Keywords: project management, complex, mobile, integration, developers, productivity
- Expected: More detailed artifacts with developer-specific recommendations

---

### **Category: B2C App**

**Test Case 3:**
```
A habit-tracking app that makes building streaks fun and rewarding. Users can set daily habits, 
see their progress on a calendar, earn badges for milestones, and challenge friends to see who 
can maintain the longest streak.
```
- Length: 200 characters
- Keywords: habit, tracking, streaks, calendar, gamification, social
- Expected: User personas for individual users, engagement-focused features

**Test Case 4 (Minimal):**
```
Meditation app for busy people
```
- Length: 38 characters
- Expected: Should still generate valid artifacts despite short input

---

### **Category: Marketplace**

**Test Case 5:**
```
Create an Airbnb-style marketplace for storing seasonal items. Homeowners can rent out their 
unused basement, garage, or storage space to people who need temporary storage during moves or 
seasonal transitions. We'd handle payments, insurance, and quality control.
```
- Length: 320 characters
- Keywords: marketplace, storage, seasonal, homeowners, payments, insurance
- Expected: Two-sided network considerations, trust/safety features

---

### **Category: Hardware**

**Test Case 6:**
```
Smart water bottle that tracks hydration intake, sends reminders to drink water, and syncs data 
with a mobile app. The bottle has LED indicators, temperature sensors, and Bluetooth connectivity. 
Perfect for fitness enthusiasts and health-conscious individuals.
```
- Length: 280 characters
- Keywords: smart, water bottle, hydration, mobile, IoT, health
- Expected: Hardware-specific features, app integration, battery considerations

---

### **Category: Service**

**Test Case 7:**
```
Marketplace for freelance personal trainers and fitness coaches. Allow clients to browse trainer 
profiles, book sessions online, pay securely, and track their fitness progress. Trainers can 
manage their schedule, billing, and client communication all in one place.
```
- Length: 320 characters
- Keywords: marketplace, trainers, fitness, booking, scheduling, client management
- Expected: Service provider and consumer personas, scheduling features

---

### **Category: Community**

**Test Case 8:**
```
A community platform for indie hackers, developers, and makers to share their projects, get feedback, 
find co-founders, and collaborate on ideas. Think Product Hunt meets GitHub but for networking.
```
- Length: 250 characters
- Keywords: community, developers, projects, feedback, networking, collaboration
- Expected: Creator/contributor personas, engagement/moderation features

---

### **Category: AI/ML Tool**

**Test Case 9:**
```
An API platform that makes it easy for developers to integrate advanced computer vision capabilities 
into their applications without needing deep machine learning expertise. We handle the model training 
and deployment, they just call our API.
```
- Length: 310 characters
- Keywords: API, computer vision, machine learning, developers, integration, deployment
- Expected: Developer-focused features, API design, scalability considerations

---

## Edge Cases

### **Test Case 10: Maximum Length (2000 chars)**
```
We are building a comprehensive enterprise resource planning (ERP) solution designed specifically 
for mid-market manufacturing companies. The current market is dominated by SAP, Oracle, and NetSuite, 
which are expensive, complex, and require lengthy implementations.

Our solution addresses these pain points:

1. Cost: Our pricing is 60% lower than competitors through a modern cloud architecture
2. Implementation: Deploy in weeks, not years, with our intelligent setup wizard
3. User Experience: Built for modern users who expect Slack-like interfaces, not 1990s UIs
4. Mobile: Full mobile app for factory floor, warehouse, and supply chain teams
5. Integration: Seamless integrations with existing ERP systems during migration

Target customers: Manufacturing SMBs with $50M-$500M revenue
Market size: $45B annually with 500K+ potential customers
Business model: SaaS subscription ($5K-$50K/month) + implementation services
Go-to-market: Sales team targeting industry consultants and VAR partnerships

We've already raised $2M seed and have 3 paying pilot customers with $100K ARR.
The founding team has 40+ years of combined ERP experience from SAP and Oracle.
```
- Length: 1,247 characters (within 2000 limit)
- Keywords: ERP, manufacturing, cloud, cost, integration, SaaS
- Expected: Detailed B2B enterprise artifacts

### **Test Case 11: Minimum Length (50 chars)**
```
Help small businesses manage inventory online
```
- Length: 46 characters (below 50 minimum)
- Expected: Validation error - "Minimum 50 characters required"

### **Test Case 12: Special Characters & Formatting**
```
Build a crypto trading bot that uses AI/ML to analyze market data (BTC, ETH, USDC) 
and execute trades automatically 24/7. Features: backtesting, risk management, 
portfolio tracking, and API integrations with Binance, Kraken, & Coinbase.
```
- Length: 250 characters
- Special chars: /, (), &, etc.
- Expected: Should handle special characters in keyword extraction

---

## Persona Generation Test Cases

### **Expected Personas by Category**

**SaaS:**
- VP of Product (decision maker)
- Team Lead (power user)
- Individual Contributor (adopter)

**B2C App:**
- Busy Professional (primary)
- College Student (secondary)
- Health-Conscious Individual (tertiary)

**Marketplace:**
- Small Business Owner (seller)
- Frequent Buyer (buyer)
- Casual Seller (supplemental)

---

## Feature Library Validation

### **SaaS Expected Features:**
- User authentication & role-based access
- Team collaboration & real-time updates
- Customizable dashboards & analytics
- API integrations
- Automated workflows
- Advanced reporting
- Mobile app
- SSO/OAuth
- Audit logging
- Automated backups

### **B2C App Expected Features:**
- Social login
- Personalized profiles
- Push notifications
- In-app messaging
- Gamification
- User-generated content
- Community features
- Search & discovery
- Offline mode
- Dark mode

---

## Export Testing Scenarios

### **PDF Export Tests**
1. Single artifact (Canvas only) - verify formatting
2. All 5 artifacts - verify page breaks
3. Long content - verify text wrapping
4. Special characters - verify encoding

### **Markdown Export Tests**
1. Headers preserve formatting
2. Lists format correctly
3. Tables render with pipes
4. Code blocks preserved
5. Inline formatting (bold, italic) works

### **Clipboard Tests**
1. Copy single artifact - verify completeness
2. Copy after edit - verify updated content
3. Long content - verify full text copied
4. Special characters - verify encoding

---

## Performance Test Cases

### **Generation Time Tests**
- Simple input (50-200 chars): < 500ms
- Medium input (200-800 chars): < 1000ms
- Long input (800-2000 chars): < 1500ms
- Target: All < 2000ms

### **Bundle Size Tests**
- Initial load: < 200KB gzipped
- After exports: Same (lazy loaded)
- After edits: Same (client-side only)

### **localStorage Tests**
- Single generation: ~50-100KB
- 10 generations: ~500KB-1MB
- Quota exceeded: Graceful handling

---

## Data Persistence Tests

### **localStorage Integrity**
1. Generate artifact
2. Refresh page
3. Verify data still exists
4. Edit artifact
5. Refresh page
6. Verify edits persisted
7. Clear data
8. Verify data gone

### **Generation History**
1. Create 5 generations
2. Verify all appear in history
3. Create 11th generation
4. Verify only 10 stored (oldest deleted)
5. Verify bookmark persists

---

## Dark Mode Tests

### **Pages to Test**
- [ ] Home page (hero, input form, FAQ)
- [ ] Results page (tabs, metadata, export menu)
- [ ] History page (cards, empty state)
- [ ] Settings page (all sections)
- [ ] Loading animation
- [ ] Toast notifications

### **Color Contrast Tests**
- Text on backgrounds: 4.5:1+ ratio
- Buttons & links: 3:1+ ratio
- Hover states: Visible contrast

---

## Mobile Responsive Tests

### **Viewports to Test**
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (iPad Pro)
- 1280px (Desktop)

### **Elements to Check**
- [ ] No horizontal scrolling
- [ ] All buttons touchable (44px+)
- [ ] Text readable
- [ ] Tables responsive
- [ ] Forms work
- [ ] Navigation accessible

---

## Browser Compatibility Tests

### **Browsers to Test**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

### **Features to Test Each Browser**
- localStorage working
- Clipboard API (with fallback)
- PDF generation
- Markdown parsing
- Dark mode detection
- Theme toggle

---

## Accessibility Tests

### **WCAG 2.1 AA Compliance**
- [x] Keyboard navigation (Tab through all interactive elements)
- [x] Color contrast (4.5:1 normal text, 3:1 large text)
- [x] Alt text (images)
- [x] ARIA labels (buttons, icons)
- [x] Focus indicators (visible, not outline: none)
- [x] Form labels (properly associated)
- [x] Semantic HTML (correct use of headers, sections)
- [x] Skip links (if applicable)

### **Screen Reader Testing**
- [ ] Page structure announced correctly
- [ ] Form fields labeled
- [ ] Buttons announced with action
- [ ] Status messages announced
- [ ] Error messages clear

---

## Error Handling Tests

### **Invalid Inputs**
1. Empty input
2. Whitespace only
3. Under 50 characters
4. Over 2000 characters
5. Invalid category selection

### **Browser Issues**
1. localStorage disabled
2. Clipboard API unavailable
3. PDF generation fails
4. Network disconnected

### **Edge Cases**
1. Multiple rapid generations
2. Generate while editing
3. Delete while viewing
4. Export while deleting
5. Theme toggle rapidly

---

## Success Criteria Summary

| Test Category | Total Cases | Pass Threshold |
|---|---|---|
| Sample Data | 12 | 100% |
| Export | 8 | 100% |
| Performance | 3 | 100% |
| Persistence | 4 | 100% |
| Dark Mode | 5 | 100% |
| Mobile | 20 | 100% |
| Browser | 30 | 100% |
| Accessibility | 8 | 90%+ |
| Error Handling | 10 | 100% |
| **TOTAL** | **100+** | **95%+** |

---

## Testing Instructions

### **Running Sample Data Tests**

1. **Load Home Page**
   - Navigate to `http://localhost:3000`
   - Should see hero, input form, FAQ

2. **Test Each Sample Input**
   - Copy problem statement
   - Select category
   - Click "Generate Artifacts"
   - Wait for generation (< 2 seconds)
   - Verify all 5 artifacts appear
   - Check artifact quality

3. **Test Export**
   - Click "Export" on each tab
   - Try PDF, Markdown, Copy
   - Verify files download/copy correctly

4. **Test History**
   - Click "History" in navigation
   - Should see all generated items
   - Click "View" on a card
   - Verify it loads results correctly

5. **Test Settings**
   - Click "Settings" in navigation
   - Export data as JSON
   - Try "Clear All Data" (with confirmation)

---

## Test Results Tracking

```
Date: 2026-08-06
Tester: [Name]
Environment: localhost:3000

Sample Data Tests:
- [ ] SaaS Case 1: PASS/FAIL
- [ ] SaaS Case 2: PASS/FAIL
- [ ] B2C App Case 3: PASS/FAIL
- [ ] B2C App Case 4: PASS/FAIL
- [ ] Marketplace Case 5: PASS/FAIL
- [ ] Hardware Case 6: PASS/FAIL
- [ ] Service Case 7: PASS/FAIL
- [ ] Community Case 8: PASS/FAIL
- [ ] AI Tool Case 9: PASS/FAIL
- [ ] Long Input Case 10: PASS/FAIL
- [ ] Short Input Case 11: PASS/FAIL
- [ ] Special Characters Case 12: PASS/FAIL

Export Tests:
- [ ] PDF Single: PASS/FAIL
- [ ] PDF All: PASS/FAIL
- [ ] Markdown: PASS/FAIL
- [ ] Clipboard: PASS/FAIL

Notes:
[Any issues or observations]
```

---

**Total Sample Data Cases:** 12  
**Total Test Scenarios:** 100+  
**Estimated Test Time:** 2-3 hours  
**Target:** 95%+ pass rate before deployment
