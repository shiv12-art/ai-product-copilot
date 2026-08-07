# Detailed Test Scenarios - AI Product Copilot

**Use this document to execute repeatable test scenarios during evaluation.**

---

## 🎯 How to Use This Document

1. **Select a test scenario** below
2. **Follow the step-by-step instructions**
3. **Record your observations** in the checklist
4. **Note any issues** found
5. **Mark Pass/Fail** at the end

**Live App:** https://ai-product-copilot-mu.vercel.app

---

## 📋 TEST SCENARIO 1: HAPPY PATH (Basic Workflow)

**Difficulty:** Easy  
**Duration:** 5 minutes  
**Purpose:** Verify core functionality works as expected

### Prerequisites
- [ ] Browser open to https://ai-product-copilot-mu.vercel.app
- [ ] Clear browser cache (Ctrl+Shift+Delete on Windows)
- [ ] No other apps using the app at same time

### Steps to Execute

**Step 1: Observe Home Page (1 minute)**
1. [ ] Page loads without errors
2. [ ] App title visible: "🚀 AI Product Copilot"
3. [ ] Form is visible with:
   - [ ] Problem statement textarea
   - [ ] Category selection buttons (14 total)
   - [ ] Generate button
4. [ ] Sample problems visible (5 total)
5. [ ] Layout is clean and professional
6. [ ] No obvious errors in browser console (F12)

**Step 2: Input Problem Statement (1 minute)**
1. [ ] Click on "Problem Statement" textarea
2. [ ] Type: "I want to build a productivity tool for remote teams that helps with asynchronous collaboration"
3. [ ] Observe:
   - [ ] Text appears in textarea
   - [ ] No character limit issues
   - [ ] Textarea grows as needed

**Step 3: Select Category (1 minute)**
1. [ ] Look at category buttons
2. [ ] Click "SaaS" button
3. [ ] Observe:
   - [ ] Button highlights with blue color
   - [ ] Visual feedback is clear
   - [ ] Only SaaS remains selected (not multiple)

**Step 4: Generate Artifacts (1 minute)**
1. [ ] Click "Generate All 7 Artifacts" button
2. [ ] Note start time: _________
3. [ ] Observe:
   - [ ] Button shows "⏳ Generating Artifacts..."
   - [ ] Button becomes disabled (grayed out)
   - [ ] No error messages appear
4. [ ] Page should navigate to results page automatically
5. [ ] Note end time: _________
6. [ ] **Generation time: _________ seconds** (Target: <2 seconds)

**Step 5: Review Results Page (1 minute)**
1. [ ] Results page loads successfully
2. [ ] Can see:
   - [ ] "Problem Statement" section showing your input
   - [ ] 7 artifact tabs with emoji icons:
     - [ ] 🎨 Product Canvas
     - [ ] 📋 Product Requirements
     - [ ] 🎯 GTM Strategy
     - [ ] ⚙️ Features
     - [ ] ✅ Validation Plan
     - [ ] 🏆 Competitive Analysis
     - [ ] 🚀 Pitch Deck
3. [ ] First tab (Canvas) is selected by default
4. [ ] Content is visible in main area
5. [ ] Copy button visible: "📋 Copy Artifact"

### Observations & Issues

**What worked well:**
- ___________________
- ___________________
- ___________________

**Issues encountered:**
- ___________________
- ___________________
- ___________________

### Result
- [ ] ✅ PASS - All steps completed successfully
- [ ] ⚠️ PASS WITH ISSUES - Steps completed but some issues
- [ ] ❌ FAIL - Could not complete scenario

---

## 📋 TEST SCENARIO 2: COMPREHENSIVE CATEGORY TEST

**Difficulty:** Medium  
**Duration:** 30 minutes  
**Purpose:** Verify all 14 categories generate unique, appropriate content

### Prerequisites
- [ ] Start fresh from home page
- [ ] Browser console open (F12) to watch for errors

### Test Matrix

For each category below, follow these steps:

#### Category Test Template
**Category:** _________________ (e.g., SaaS)

**Problem Statement:** [Use the suggested problem for this category]

**Execution:**
1. [ ] Enter problem statement
2. [ ] Select category
3. [ ] Click Generate
4. [ ] Record time: _________ seconds
5. [ ] Check each artifact:
   - [ ] Canvas - check for category-specific content
   - [ ] PRD - features are category-appropriate
   - [ ] GTM - positioning mentions category
   - [ ] Features - 10+ features listed
   - [ ] Validation - metrics are relevant
   - [ ] Competitive - competitors are real companies
   - [ ] Pitch - investor-ready format

**Category-Specific Checks:**
- [ ] ✅ Content is specific to this category (not generic)
- [ ] ✅ Competitors are relevant to category
- [ ] ✅ Features make sense for category
- [ ] ✅ Target market is appropriate

**Issues Found:** [List any issues]

**Result:** [ ] Pass [ ] Fail

---

### Categories to Test (14 Total)

**1. SaaS** 
- Problem: "Remote teams struggle with asynchronous collaboration"
- Key checks: B2B focus, team features, SSO mentioned
- Result: [ ] Pass [ ] Fail

**2. Mobile App**
- Problem: "People need mental health support accessible on their phones"
- Key checks: Mobile-first, push notifications, offline mode
- Result: [ ] Pass [ ] Fail

**3. Web App**
- Problem: "Design teams need a better collaboration tool than email"
- Key checks: Browser-based, real-time, responsive design
- Result: [ ] Pass [ ] Fail

**4. Marketplace**
- Problem: "Fitness trainers can't easily connect with clients seeking personalized guidance"
- Key checks: Buyer/seller features, commissions, ratings
- Result: [ ] Pass [ ] Fail

**5. B2C App**
- Problem: "Individuals want a personal productivity app that works offline"
- Key checks: Consumer focus, personalization, cloud sync
- Result: [ ] Pass [ ] Fail

**6. Hardware**
- Problem: "Homes need smarter devices that integrate with voice assistants"
- Key checks: IoT, connectivity, OTA updates
- Result: [ ] Pass [ ] Fail

**7. AI Tool**
- Problem: "Developers want AI that understands their specific codebase context"
- Key checks: Developer tools, API-focused, technical
- Result: [ ] Pass [ ] Fail

**8. Fintech**
- Problem: "Young investors want fractional investing with low fees"
- Key checks: Investment, trading, financial, payments
- Result: [ ] Pass [ ] Fail

**9. Healthcare**
- Problem: "Patients struggle to manage health records across providers"
- Key checks: Medical, compliance, provider integration
- Result: [ ] Pass [ ] Fail

**10. EdTech**
- Problem: "Teachers need better tools for hybrid classroom management"
- Key checks: Education, learning, certification
- Result: [ ] Pass [ ] Fail

**11. Gaming**
- Problem: "Gamers want a platform that combines competitive play with content creation"
- Key checks: Multiplayer, leaderboards, streaming
- Result: [ ] Pass [ ] Fail

**12. Social**
- Problem: "Content creators need a platform focused on deeper connections"
- Key checks: Community, social sharing, user-generated content
- Result: [ ] Pass [ ] Fail

**13. Service**
- Problem: "Service professionals struggle to manage bookings and payments"
- Key checks: Marketplace, booking, service management
- Result: [ ] Pass [ ] Fail

**14. Community**
- Problem: "Online communities need better tools for moderation and engagement"
- Key checks: Community-focused, membership, engagement tools
- Result: [ ] Pass [ ] Fail

### Summary Results
- Categories passed: _____ / 14
- Categories failed: _____ / 14
- Major issues found: [List any critical issues]

### Overall Result
- [ ] ✅ PASS - All 14 categories work with unique content
- [ ] ⚠️ PASS WITH ISSUES - Most work but some issues found
- [ ] ❌ FAIL - Multiple categories broken

---

## 📋 TEST SCENARIO 3: COPY-TO-CLIPBOARD VERIFICATION

**Difficulty:** Easy  
**Duration:** 10 minutes  
**Purpose:** Verify copy function works for all 7 artifacts

### Prerequisites
- [ ] Have a product generated on results page
- [ ] Text editor open (Notepad, Word, Google Docs)
- [ ] Test on both desktop browser

### Execution

**For each of the 7 artifacts:**

**Artifact 1: Canvas**
1. [ ] Click "🎨 Product Canvas" tab
2. [ ] Click "📋 Copy Artifact" button
3. [ ] Observe:
   - [ ] Button text changes to "✅ Copied!"
   - [ ] Button color changes (green)
4. [ ] Click in text editor
5. [ ] Paste (Ctrl+V)
6. [ ] Verify:
   - [ ] Content pasted successfully
   - [ ] "# Product Canvas" heading visible
   - [ ] All sections present
   - [ ] Content is complete (not truncated)
7. [ ] Result: [ ] Pass [ ] Fail

**Artifact 2: PRD**
1. [ ] Click "📋 Product Requirements" tab
2. [ ] Click "📋 Copy Artifact" button
3. [ ] Verify button feedback
4. [ ] Paste in editor
5. [ ] Verify:
   - [ ] "# Product Requirements Document" heading
   - [ ] All sections complete
6. [ ] Result: [ ] Pass [ ] Fail

**Artifact 3: GTM**
1. [ ] Click "🎯 GTM Strategy" tab
2. [ ] Click copy button
3. [ ] Paste and verify
4. [ ] Check for: "# Go-to-Market Strategy" heading
5. [ ] Result: [ ] Pass [ ] Fail

**Artifact 4: Features**
1. [ ] Click "⚙️ Features" tab
2. [ ] Click copy button
3. [ ] Paste and verify
4. [ ] Check for: 10+ features listed
5. [ ] Result: [ ] Pass [ ] Fail

**Artifact 5: Validation**
1. [ ] Click "✅ Validation Plan" tab
2. [ ] Click copy button
3. [ ] Paste and verify
4. [ ] Check for: Experiments and success criteria
5. [ ] Result: [ ] Pass [ ] Fail

**Artifact 6: Competitive**
1. [ ] Click "🏆 Competitive Analysis" tab
2. [ ] Click copy button
3. [ ] Paste and verify
4. [ ] Check for: Competitor list
5. [ ] Result: [ ] Pass [ ] Fail

**Artifact 7: Pitch**
1. [ ] Click "🚀 Pitch Deck" tab
2. [ ] Click copy button
3. [ ] Paste and verify
4. [ ] Check for: Investor-ready structure
5. [ ] Result: [ ] Pass [ ] Fail

### Summary
- Artifacts copied successfully: _____ / 7
- Artifacts with issues: _____ / 7

### Overall Result
- [ ] ✅ PASS - All 7 artifacts copy correctly
- [ ] ⚠️ PASS WITH ISSUES - Most copy correctly
- [ ] ❌ FAIL - Copy function broken

---

## 📋 TEST SCENARIO 4: DATA PERSISTENCE TEST

**Difficulty:** Easy  
**Duration:** 5 minutes  
**Purpose:** Verify data persists across page refreshes

### Prerequisites
- [ ] Have a generated product on results page
- [ ] Note the problem statement: _________________

### Execution

**Part 1: Normal Refresh**
1. [ ] On results page, note first artifact content
2. [ ] Press F5 (refresh)
3. [ ] Page reloads
4. [ ] Check results page still showing same product
5. [ ] Verify:
   - [ ] Problem statement unchanged
   - [ ] Same category selected
   - [ ] All 7 artifacts present
   - [ ] Content identical to before refresh
6. [ ] Result: [ ] Pass [ ] Fail

**Part 2: Hard Refresh**
1. [ ] Press Ctrl+F5 (hard refresh - clears cache)
2. [ ] Page reloads
3. [ ] Verify same as above:
   - [ ] Problem statement present
   - [ ] All artifacts present
   - [ ] Content identical
4. [ ] Result: [ ] Pass [ ] Fail

**Part 3: New Generation**
1. [ ] Click "🔄 New Generation" button
2. [ ] Home page loads
3. [ ] Generate a different product
   - [ ] Use different category
   - [ ] Enter different problem statement
4. [ ] Go to results page for new product
5. [ ] Verify correct product displayed:
   - [ ] Problem statement is NEW (not previous)
   - [ ] Category is different
6. [ ] Hard refresh (Ctrl+F5)
7. [ ] Verify still showing NEW product (not old one)
8. [ ] Result: [ ] Pass [ ] Fail

### Summary
- Part 1 (Normal refresh): [ ] Pass [ ] Fail
- Part 2 (Hard refresh): [ ] Pass [ ] Fail
- Part 3 (Multiple generations): [ ] Pass [ ] Fail

### Overall Result
- [ ] ✅ PASS - Data persists correctly
- [ ] ⚠️ PASS WITH ISSUES - Mostly persists with issues
- [ ] ❌ FAIL - Data not persisting

---

## 📋 TEST SCENARIO 5: RESPONSIVE DESIGN TEST

**Difficulty:** Medium  
**Duration:** 10 minutes  
**Purpose:** Verify works on all device sizes

### Prerequisites
- [ ] Open DevTools (F12)
- [ ] Have app loaded on home page

### Mobile Test (375px width)

**Activate Mobile View:**
1. [ ] Press F12 (DevTools)
2. [ ] Click device toggle (phone icon) or Ctrl+Shift+M
3. [ ] Set width to 375px
4. [ ] Set height to 812px (iPhone proportions)

**Verify Home Page:**
- [ ] Page loads without horizontal scroll
- [ ] Header fits and is readable
- [ ] Problem statement textarea is usable
- [ ] Can scroll vertically without issues
- [ ] Category buttons:
  - [ ] Still visible (may stack)
  - [ ] Clickable and responsive
- [ ] Generate button:
  - [ ] Accessible
  - [ ] Button text readable
- [ ] Sample problems visible (may need scroll)
- [ ] Form can be filled and submitted
- [ ] Result: [ ] Pass [ ] Fail

**Verify Results Page (if mobile passes):**
1. [ ] Generate artifact on mobile
2. [ ] Results page loads
3. [ ] Verify:
   - [ ] Problem statement readable
   - [ ] Tabs are clickable
   - [ ] Content is scrollable
   - [ ] Copy button is accessible
   - [ ] No horizontal scroll
- [ ] Result: [ ] Pass [ ] Fail

### Tablet Test (768px width)

**Activate Tablet View:**
1. [ ] Set width to 768px
2. [ ] Set height to 1024px

**Verify Layout:**
- [ ] Category grid shows 2-3 columns
- [ ] All content visible without excessive scrolling
- [ ] Form is properly laid out
- [ ] Buttons are appropriately sized
- [ ] Results page artifacts display well
- [ ] No overflow or broken layout
- [ ] Result: [ ] Pass [ ] Fail

### Desktop Test (1920px width)

**Revert to Desktop:**
1. [ ] Close mobile view or set to full desktop
2. [ ] Maximize browser window

**Verify Desktop:**
- [ ] Category grid shows 4-5 columns
- [ ] Form has good spacing
- [ ] Content is well-proportioned
- [ ] Professional appearance
- [ ] Proper alignment and padding
- [ ] No stretched or cramped layout
- [ ] Result: [ ] Pass [ ] Fail

### Summary
- Mobile (375px): [ ] Pass [ ] Fail
- Tablet (768px): [ ] Pass [ ] Fail
- Desktop (1920px): [ ] Pass [ ] Fail

### Overall Result
- [ ] ✅ PASS - Responsive on all sizes
- [ ] ⚠️ PASS WITH ISSUES - Mostly responsive
- [ ] ❌ FAIL - Significant responsive issues

---

## 📋 TEST SCENARIO 6: SPECIAL CHARACTERS TEST

**Difficulty:** Easy  
**Duration:** 5 minutes  
**Purpose:** Verify app handles special characters correctly

### Prerequisites
- [ ] Start from home page
- [ ] Browser console open (F12)

### Test Cases

**Test 1: Special Symbols**
1. [ ] Enter: "Build a SaaS app with @mentions, #hashtags, & emojis 🚀💡"
2. [ ] Select "SaaS" category
3. [ ] Generate artifacts
4. [ ] Verify:
   - [ ] No errors in console
   - [ ] Artifacts generate successfully
   - [ ] Content is complete
5. [ ] Result: [ ] Pass [ ] Fail

**Test 2: Quotes and Apostrophes**
1. [ ] Enter: "I want a 'mobile' app that's \"different\" from competitors"
2. [ ] Select any category
3. [ ] Generate
4. [ ] Verify:
   - [ ] No quote-related errors
   - [ ] Content displays correctly
5. [ ] Result: [ ] Pass [ ] Fail

**Test 3: Parentheses and Brackets**
1. [ ] Enter: "Product for users (age 18-35) with [premium] and {features}"
2. [ ] Select any category
3. [ ] Generate
4. [ ] Verify:
   - [ ] Special characters preserved
   - [ ] Content readable
5. [ ] Result: [ ] Pass [ ] Fail

**Test 4: Currency and Math Symbols**
1. [ ] Enter: "Pricing: $99/month, 50% discount, <$1000 CAC target"
2. [ ] Select "Fintech" category
3. [ ] Generate
4. [ ] Verify:
   - [ ] Currency symbols work
   - [ ] Math symbols work
   - [ ] Content correct
5. [ ] Result: [ ] Pass [ ] Fail

**Test 5: Accented Characters**
1. [ ] Enter: "Café marketplace for naïve French clients: Héllo, café, français"
2. [ ] Select "Marketplace"
3. [ ] Generate
4. [ ] Verify:
   - [ ] Accents preserved
   - [ ] Content displays correctly
5. [ ] Result: [ ] Pass [ ] Fail

### Summary
- Test 1 (Symbols): [ ] Pass [ ] Fail
- Test 2 (Quotes): [ ] Pass [ ] Fail
- Test 3 (Brackets): [ ] Pass [ ] Fail
- Test 4 (Currency): [ ] Pass [ ] Fail
- Test 5 (Accents): [ ] Pass [ ] Fail

### Overall Result
- [ ] ✅ PASS - All special characters handled
- [ ] ⚠️ PASS WITH ISSUES - Most work
- [ ] ❌ FAIL - Issues with special characters

---

## 📋 TEST SCENARIO 7: ERROR HANDLING TEST

**Difficulty:** Easy  
**Duration:** 5 minutes  
**Purpose:** Verify proper error handling and recovery

### Prerequisites
- [ ] Start from home page

### Test 1: Generate Without Category
1. [ ] Enter problem statement: "Test"
2. [ ] Leave category blank (don't select any)
3. [ ] Click "Generate All 7 Artifacts"
4. [ ] Verify:
   - [ ] Error message appears
   - [ ] Error message is clear
   - [ ] Button doesn't generate artifacts
   - [ ] Page doesn't navigate
   - [ ] Form state preserved
5. [ ] Fix: Select a category
6. [ ] Click Generate again
7. [ ] Verify:
   - [ ] Now works correctly
   - [ ] Artifacts generate
8. [ ] Result: [ ] Pass [ ] Fail

### Test 2: Generate Without Problem
1. [ ] Clear any text from textarea
2. [ ] Select a category
3. [ ] Click "Generate All 7 Artifacts"
4. [ ] Verify:
   - [ ] Error message appears
   - [ ] Error is clear: "Please fill in all fields"
   - [ ] Navigation doesn't happen
5. [ ] Fix: Enter problem statement
6. [ ] Click Generate again
7. [ ] Verify: Works correctly
8. [ ] Result: [ ] Pass [ ] Fail

### Test 3: Very Long Input
1. [ ] Generate 2000+ character problem statement
2. [ ] Select a category
3. [ ] Generate artifacts
4. [ ] Verify:
   - [ ] No errors in console
   - [ ] Artifacts generate successfully
   - [ ] Content not truncated
5. [ ] Result: [ ] Pass [ ] Fail

### Summary
- Test 1 (No category): [ ] Pass [ ] Fail
- Test 2 (No problem): [ ] Pass [ ] Fail
- Test 3 (Long input): [ ] Pass [ ] Fail

### Overall Result
- [ ] ✅ PASS - Error handling works correctly
- [ ] ⚠️ PASS WITH ISSUES - Some error handling issues
- [ ] ❌ FAIL - Poor error handling

---

## 📋 TEST SCENARIO 8: BROWSER COMPATIBILITY TEST

**Difficulty:** Medium  
**Duration:** 15 minutes  
**Purpose:** Verify works on multiple browsers

### Prerequisites
- [ ] Have multiple browsers available

### Browser Test Template

**Browser: _________________ (Version: _______)**

1. [ ] Open app URL
2. [ ] Test home page:
   - [ ] Loads without errors
   - [ ] Layout looks correct
   - [ ] Form usable
3. [ ] Test generation:
   - [ ] Select category
   - [ ] Enter problem
   - [ ] Generate artifacts
   - [ ] Time: _____ seconds
4. [ ] Test results page:
   - [ ] All 7 tabs visible
   - [ ] Content displays
   - [ ] Copy button works
5. [ ] Check console (F12):
   - [ ] No red errors
   - [ ] Minor warnings acceptable
6. [ ] Test navigation:
   - [ ] Back button works
   - [ ] Links work

**Overall for this browser:** [ ] Pass [ ] Issues

---

### Browsers to Test

**1. Google Chrome (Latest)**
- Version: _________
- Result: [ ] Pass [ ] Fail

**2. Mozilla Firefox (Latest)**
- Version: _________
- Result: [ ] Pass [ ] Fail

**3. Safari (Latest)**
- Version: _________
- Result: [ ] Pass [ ] Fail

**4. Microsoft Edge (Latest)**
- Version: _________
- Result: [ ] Pass [ ] Fail

**5. Mobile Chrome (Latest)**
- Device: _________
- Result: [ ] Pass [ ] Fail

**6. Mobile Safari (Latest)**
- Device: _________
- Result: [ ] Pass [ ] Fail

### Summary
- Browsers passed: _____ / [number tested]
- Browsers with issues: _____

### Overall Result
- [ ] ✅ PASS - Works on all tested browsers
- [ ] ⚠️ PASS WITH ISSUES - Works on most browsers
- [ ] ❌ FAIL - Issues on multiple browsers

---

## 🎯 FINAL TEST SUMMARY

### Scenario Results

| Scenario | Duration | Result | Issues |
|----------|----------|--------|--------|
| 1. Happy Path | 5 min | [ ] Pass [ ] Fail | ___ |
| 2. All 14 Categories | 30 min | [ ] Pass [ ] Fail | ___ |
| 3. Copy Functionality | 10 min | [ ] Pass [ ] Fail | ___ |
| 4. Data Persistence | 5 min | [ ] Pass [ ] Fail | ___ |
| 5. Responsive Design | 10 min | [ ] Pass [ ] Fail | ___ |
| 6. Special Characters | 5 min | [ ] Pass [ ] Fail | ___ |
| 7. Error Handling | 5 min | [ ] Pass [ ] Fail | ___ |
| 8. Browser Compatibility | 15 min | [ ] Pass [ ] Fail | ___ |

**Total Testing Time:** _____ hours

### Summary Statistics
- Scenarios passed: _____ / 8
- Scenarios with issues: _____
- Critical issues found: _____
- Major issues found: _____
- Minor issues found: _____

### Overall Testing Result
- [ ] ✅ ALL SCENARIOS PASSED - App is production-ready
- [ ] ⚠️ MOST SCENARIOS PASSED - Minor issues found
- [ ] ❌ MULTIPLE SCENARIOS FAILED - Significant issues

### Issues to Document
[Transfer any critical issues to EVALUATION_REPORT_TEMPLATE.md Issue Log]

1. ___________________________
2. ___________________________
3. ___________________________

---

**Testing Completed By:** ___________________________

**Date:** ___________________________

**Signature:** ___________________________

