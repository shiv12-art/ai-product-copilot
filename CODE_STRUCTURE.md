# Code Structure Reference - AI Product Copilot

## 📁 Project Directory Tree

```
ai-product-copilot/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page - main form
│   │   ├── results/
│   │   │   └── page.tsx               # Results page - 7 artifacts display
│   │   └── globals.css                # Global styles
│   ├── lib/
│   │   └── generation/
│   │       ├── intelligent-generator.ts  # Core artifact generation engine
│   │       ├── rules/
│   │       │   ├── canvas.ts          # Product canvas rules
│   │       │   ├── gtm.ts             # GTM strategy rules
│   │       │   └── validation.ts      # Validation plan rules
│   │       └── templates/
│   │           ├── features.ts         # Feature templates by category
│   │           └── personas.ts         # User personas by category
│   └── types/
│       └── generation.ts               # TypeScript type definitions
├── package.json
├── tsconfig.json
├── next.config.js
└── [config files...]
```

---

## 🔄 Data Flow

```
USER INPUT
    ↓
[page.tsx] Home Page
  - Problem Statement Input
  - Category Selection (14 options)
  - Sample Problems
    ↓
[handleGenerate Function]
  - Validates form
  - Calls generateIntelligentArtifacts()
  - Stores in localStorage
    ↓
[intelligent-generator.ts] Core Generation Engine
  - extractInsights() - analyzes problem
  - generateIntelligentArtifacts() - creates 7 artifacts
    ├─→ generateCanvas()
    ├─→ generatePRD()
    ├─→ generateGTM()
    ├─→ generateFeatures()
    ├─→ generateValidation()
    ├─→ generateCompetitive()
    └─→ generatePitch()
    ↓
[results/page.tsx] Results Display
  - Loads from localStorage
  - Displays 7 artifact tabs
  - Copy to clipboard
  - Navigation
```

---

## 📂 Key Files Overview

### 1. Type Definitions
**File:** `src/types/generation.ts`
```typescript
ProductCategory = 
  | 'saas' | 'mobile_app' | 'web_app' | 'marketplace' 
  | 'b2c_app' | 'hardware' | 'ai_tool' | 'fintech'
  | 'healthcare' | 'edtech' | 'gaming' | 'social'
  | 'service' | 'community'

Artifacts = {
  canvas: string
  prd: string
  gtm: string
  features: string
  validation: string
  competitive?: string
  pitch?: string
}

Generation = {
  id: string
  createdAt: string
  updatedAt: string
  problemStatement: string
  category: ProductCategory
  artifacts: Record<string, {content: string, editedAt?: string}>
  isBookmarked: boolean
}
```

### 2. Home Page
**File:** `src/app/page.tsx` (~300 lines)

**Key Components:**
- Hero section with app description
- Problem statement textarea
- Category grid (14 buttons with emojis)
- Generate button
- Sample problems section (5 quick-start examples)

**Key Functions:**
- `handleGenerate(e)` - Form submission handler
- Category state management with `setCategory()`
- Form validation logic

**State Variables:**
```typescript
problemStatement: string    // User's product idea
category: string           // Selected category label
loading: boolean          // Generation in progress
```

### 3. Core Generation Engine
**File:** `src/lib/generation/intelligent-generator.ts` (~550 lines)

**Key Exports:**
```typescript
export function generateIntelligentArtifacts(context: {
  problemStatement: string
  category: ProductCategory
}): {
  canvas: string
  prd: string
  gtm: string
  features: string
  validation: string
  competitive: string
  pitch: string
}
```

**Databases:**
- `competitorsDB` - Real competitors per category (7-8 per category)
- `featureSuggestions` - Feature ideas per category (10 per category)

**Key Functions:**
- `extractInsights()` - Analyzes problem statement for keywords/sentiment
  - Returns: mainProblem, targetUser, painPoints
- `generateCanvas()` - Creates product canvas
- `generatePRD()` - Creates product requirements document
- `generateGTM()` - Creates go-to-market strategy
- `generateFeatures()` - Lists core and nice-to-have features
- `generateValidation()` - Creates validation plan
- `generateCompetitive()` - Competitive analysis with real competitors
- `generatePitch()` - Investor pitch deck format

### 4. Canvas Rules
**File:** `src/lib/generation/rules/canvas.ts` (~156 lines)

**Key Functions:**
```typescript
async function generateCanvasArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string>
```

**Sub-functions:**
- `generateValueProposition()` - Creates value prop statement
- `generateTargetAudience()` - 14 categories, each with audience description
- `generateBusinessModel()` - Revenue model per category
- `generateChannels()` - Distribution channels (RECENTLY FIXED - all 14 categories)

### 5. GTM Rules
**File:** `src/lib/generation/rules/gtm.ts` (~300+ lines)

**Key Functions:**
```typescript
async function generateGTMArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string>
```

**Sub-functions (all with 14 categories):**
- `generatePositioning()` - Positioning statement
- `generatePrimarySegment()` - Main target segment
- `generateSecondarySegment()` - Secondary market
- `generateCompanySize()` - Customer profile
- `generateIndustry()` - Industry focus
- `generateBudget()` - Budget range
- `generatePricingTiers()` - 3-5 pricing tiers

### 6. Feature Templates
**File:** `src/lib/generation/templates/features.ts` (~200 lines)

**Key Exports:**
```typescript
export const FEATURE_TEMPLATES: Record<ProductCategory, string[]>
// 14 categories × 10 features each = 140 features

export function getDefaultFeatures(category: ProductCategory): string[]
// Returns first 10 features for a category
```

**Sample Features by Category:**
- **saas:** Authentication, collaboration, dashboards, APIs, workflows
- **mobile_app:** Push notifications, offline mode, biometric auth, sensors
- **fintech:** Payment processing, investment tracking, portfolio management
- **healthcare:** Patient records, telemedicine, prescription management
- **gaming:** Multiplayer, leaderboards, in-app purchases, social features

### 7. Personas Templates
**File:** `src/lib/generation/templates/personas.ts` (~200 lines)

**Key Exports:**
```typescript
export interface Persona {
  name: string
  role: string
  goal: string
  pain: string
  type: 'primary' | 'secondary' | 'tertiary'
}

export const PERSONA_TEMPLATES: Record<ProductCategory, Persona[]>
// 14 categories × 3 personas each = 42 personas
```

**Persona Structure:**
```typescript
{
  name: "Sarah Chen",
  role: "Product Manager",
  goal: "Ship faster with better collaboration",
  pain: "Team scattered across timezones",
  type: "primary"
}
```

### 8. Validation Rules
**File:** `src/lib/generation/rules/validation.ts` (~218 lines)

**Key Exports:**
```typescript
async function generateValidationArtifact(
  problemStatement: string,
  category: ProductCategory,
  keywords: KeywordResult[]
): Promise<string>
```

**Key Functions:**
- `getChallenge()` - 14 categories, each with specific challenge for customer discovery

### 9. Results Page
**File:** `src/app/results/page.tsx` (~285 lines)

**Key Features:**
- Sticky header with app title
- Problem statement card
- 7 artifact tabs (canvas, prd, gtm, features, validation, competitive, pitch)
- Content display area
- Copy to clipboard button
- New generation button

**Key Functions:**
- `handleCopy()` - Copy artifact to clipboard with visual feedback
- Tab switching logic

---

## 🎯 Category Mapping

### All 14 Categories

| Category | Label | Emoji | Value |
|----------|-------|-------|-------|
| SaaS | SaaS | ☁️ | saas |
| Mobile | Mobile App | 📱 | mobile_app |
| Web | Web App | 🌐 | web_app |
| Marketplace | Marketplace | 🛒 | marketplace |
| Consumer | B2C App | 👥 | b2c_app |
| Hardware | Hardware | ⚙️ | hardware |
| AI | AI Tool | 🤖 | ai_tool |
| Financial | Fintech | 💰 | fintech |
| Medical | Healthcare | 🏥 | healthcare |
| Education | EdTech | 📚 | edtech |
| Games | Gaming | 🎮 | gaming |
| Social | Social Network | 💬 | social |
| Services | Service | 🔧 | service |
| Community | Community | 🤝 | community |

---

## 🔌 Key Integrations

### Next.js Features Used
- **App Router** - File-based routing (page.tsx, results/page.tsx)
- **Client Components** - 'use client' directive for interactivity
- **useRouter** - Navigation between pages
- **useRouter.push()** - Programmatic navigation

### React Hooks Used
- **useState** - Form state management
- **useEffect** - Side effects (localStorage in results page)
- **useRouter** - Navigation

### Browser APIs Used
- **localStorage** - Persist generation across sessions
- **navigator.clipboard** - Copy to clipboard
- **Date.now()** - Generate unique IDs
- **JSON.stringify/parse** - Serialize/deserialize data

### Styling Approach
- **Inline Styles** - Direct style objects (not CSS-in-JS)
- **Tailwind CSS** - Available but not used in current implementation
- **Responsive Design** - CSS flexbox and grid

---

## 📊 Content Volume

### Total Production Content
- **Artifact Types:** 7 (canvas, prd, gtm, features, validation, competitive, pitch)
- **Categories:** 14 (saas, mobile_app, web_app, marketplace, etc.)
- **Total Artifact Variations:** 7 × 14 = 98 unique artifacts possible
- **Features:** 140 total (10 per category)
- **Personas:** 42 total (3 per category)
- **Competitors:** 100+ real companies
- **Lines of Generation Code:** ~1000+ lines

### Average Artifact Size
- **Canvas:** 200-300 words
- **PRD:** 300-400 words
- **GTM:** 400-500 words
- **Features:** 250-350 words
- **Validation:** 350-450 words
- **Competitive:** 200-300 words
- **Pitch:** 300-400 words

**Total per generation:** ~2000-2500 words

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Output: ready - started server on 0.0.0.0:3000

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Format code
npm run format

# Run tests (if configured)
npm test
```

---

## 🔒 Security Considerations

### What's Secure
- ✅ All processing done client-side (no server)
- ✅ No API keys or secrets in code
- ✅ No user data sent to external services
- ✅ No authentication required
- ✅ LocalStorage is per-origin (secure)

### Data Handling
- Problem statements stored in localStorage only
- No server logging
- No analytics or tracking
- No third-party cookies
- No external API calls

---

## 🚀 Performance Targets

- **Page Load:** < 3 seconds
- **Artifact Generation:** < 2 seconds
- **First Contentful Paint:** < 1.5 seconds
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3 seconds

---

## 📋 Sample Data

### Sample Problem 1: Remote Team Collaboration
```
Problem: "Teams struggle with asynchronous collaboration, scattered communication, and lack of context when working across time zones."
Category: SaaS
Expected: Collaborative workspace with async-first features, integrations, real-time sync
```

### Sample Problem 2: Fintech Investment
```
Problem: "Millennial investors want to invest fractional shares in diversified portfolios with low fees and social trading features."
Category: Fintech
Expected: Investment platform with fractional shares, low fees, social features, portfolio tracking
```

---

## 🐛 Common Issues and Debugging

### Issue: Artifacts not generating
**Solution:** Check browser console for errors in intelligent-generator.ts

### Issue: LocalStorage not persisting
**Solution:** Verify localStorage is enabled in browser settings

### Issue: Copy to clipboard not working
**Solution:** Check browser permissions, may need HTTPS in production

### Issue: Categories not appearing
**Solution:** Verify page.tsx categories array has all 14 entries

### Issue: Wrong content for category
**Solution:** Check category mapping, verify categoryMap is built correctly

---

## 📚 References

### Files to Read for Understanding
1. **Start Here:** `src/types/generation.ts` - Understand the data structures
2. **Then Read:** `src/app/page.tsx` - Understand user flow
3. **Then Read:** `src/lib/generation/intelligent-generator.ts` - Understand generation logic
4. **Then Read:** `src/lib/generation/templates/features.ts` - See data examples
5. **Finally:** `src/app/results/page.tsx` - Understand results display

### Key Concepts
- **ProductCategory** - Union type of all 14 product types
- **Artifacts** - The 7 documents generated per product
- **Insights** - Extracted from problem statement (problem, user, pain points)
- **Record<K, V>** - TypeScript pattern for category-specific mappings
- **localStorage** - Browser storage for persistence between sessions

---

## ✅ Verification Checklist

- [x] All 14 categories implemented
- [x] All 7 artifacts generating
- [x] Type safety enforced
- [x] Category-specific content working
- [x] LocalStorage persistence functional
- [x] UI/UX complete and professional
- [x] Sample problems integrated
- [x] Copy to clipboard ready
- [x] Responsive design in place
- [x] Production-ready code
