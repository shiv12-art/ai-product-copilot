# Technical Architecture Document: AI Product Copilot

**Version:** 1.0  
**Date:** 2026-08-05  
**Status:** Implementation Ready

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Environment                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js Frontend Application              │ │
│  │                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │ │
│  │  │   UI Layer   │  │  State Mgmt  │  │   Utils    │  │ │
│  │  │  (React)     │  │  (Zustand)   │  │  (Helpers) │  │ │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │ │
│  │         ↓                 ↓                   ↓         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │     Generation Logic & Rule Engine               │ │ │
│  │  │  - Keyword extraction                            │ │ │
│  │  │  - Template matching                             │ │ │
│  │  │  - Artifact composition                          │ │ │
│  │  │  - Persona generation                            │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │         ↓                                              │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │         localStorage Persistence                │ │ │
│  │  │  - Generations store                             │ │ │
│  │  │  - Settings store                                │ │ │
│  │  │  - Cache management                              │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │             Export & Download Layer                    │ │
│  │  - PDF generation (jsPDF)                             │ │
│  │  - Markdown export                                    │ │
│  │  - Clipboard copy                                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Project Structure

```
ai-product-copilot/
├── .next/                          # Next.js build output
├── node_modules/                   # Dependencies
├── public/                         # Static assets
│   ├── favicon.ico
│   └── og-image.png               # Social share image
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page (/)
│   │   ├── results/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx        # Results page (/results/[id])
│   │   │   └── layout.tsx
│   │   ├── history/
│   │   │   ├── page.tsx            # History page (/history)
│   │   │   └── layout.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx            # Settings page (/settings)
│   │   │   └── layout.tsx
│   │   ├── api/                    # API routes (minimal)
│   │   │   └── (none - frontend only)
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── Input/
│   │   │   ├── InputForm.tsx        # Main input form
│   │   │   ├── CategorySelect.tsx   # Category dropdown
│   │   │   └── CharacterCounter.tsx # Validation feedback
│   │   ├── Artifacts/
│   │   │   ├── ArtifactTabs.tsx     # 5-tab navigation
│   │   │   ├── MarkdownViewer.tsx   # Render markdown
│   │   │   ├── EditableContent.tsx  # Inline editor
│   │   │   └── ArtifactExport.tsx   # Export menu
│   │   ├── History/
│   │   │   ├── GenerationCard.tsx   # Card in history view
│   │   │   ├── GenerationGrid.tsx   # Grid layout
│   │   │   └── QuickViewModal.tsx   # Preview modal
│   │   ├── Common/
│   │   │   ├── Header.tsx           # App header
│   │   │   ├── Footer.tsx           # App footer
│   │   │   ├── LoadingAnimation.tsx # Generation spinner
│   │   │   ├── Toast.tsx            # Notifications
│   │   │   ├── ThemeToggle.tsx      # Dark/light toggle
│   │   │   └── ErrorBoundary.tsx    # Error handling
│   │   └── Layout/
│   │       ├── MainLayout.tsx       # Wrapper for pages
│   │       └── Container.tsx        # Constrained width
│   ├── lib/
│   │   ├── generation/              # Core generation logic
│   │   │   ├── generator.ts         # Main generator function
│   │   │   ├── keywords.ts          # Keyword extraction
│   │   │   ├── templates/
│   │   │   │   ├── artifacts.ts     # Artifact templates
│   │   │   │   ├── features.ts      # Feature library
│   │   │   │   ├── personas.ts      # Persona templates
│   │   │   │   ├── timelines.ts     # Timeline generation
│   │   │   │   ├── channels.ts      # Distribution channels
│   │   │   │   └── risks.ts         # Risk matrices
│   │   │   └── rules/
│   │   │       ├── canvas.ts        # Canvas generation rules
│   │   │       ├── prd.ts           # PRD generation rules
│   │   │       ├── gtm.ts           # GTM generation rules
│   │   │       ├── features.ts      # Feature spec rules
│   │   │       └── validation.ts    # Validation plan rules
│   │   ├── storage/                 # localStorage management
│   │   │   ├── generationStore.ts   # Zustand store
│   │   │   ├── settingsStore.ts     # Settings store
│   │   │   └── persistence.ts       # localStorage helpers
│   │   ├── export/                  # Export functionality
│   │   │   ├── pdf.ts               # PDF generation
│   │   │   ├── markdown.ts          # Markdown formatting
│   │   │   └── clipboard.ts         # Copy to clipboard
│   │   ├── utils/
│   │   │   ├── formatting.ts        # Text formatting helpers
│   │   │   ├── validation.ts        # Input validation
│   │   │   ├── uuid.ts              # ID generation
│   │   │   └── constants.ts         # App constants
│   │   └── hooks/
│   │       ├── useGeneration.ts      # Generation hook
│   │       ├── useLocalStorage.ts    # Storage hook
│   │       ├── useTheme.ts           # Theme hook
│   │       └── useExport.ts          # Export hook
│   ├── styles/
│   │   ├── globals.css              # Global styles
│   │   ├── variables.css            # CSS variables
│   │   └── animations.css           # Framer Motion styles
│   └── types/
│       ├── generation.ts            # Type definitions
│       ├── artifacts.ts             # Artifact types
│       └── ui.ts                    # UI component types
├── .env.example                     # Environment template (empty - no vars needed)
├── .gitignore
├── .eslintrc.json                   # ESLint config
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript config
├── next.config.js                   # Next.js config
├── package.json
├── package-lock.json
└── README.md
```

---

## 3. Data Flow Diagram

```
User Input
    ↓
┌─────────────────────────┐
│   InputForm Component   │
│ - Validate input        │
│ - Extract category      │
└─────────────────────────┘
    ↓
┌─────────────────────────┐
│  generateArtifacts()    │
│  (Main Generator)       │
└─────────────────────────┘
    ↓
┌──────────────────────────────────────────┐
│ Parallel Generation (All 5 Artifacts)    │
├──────────────────────────────────────────┤
│ ├─ extractKeywords()                    │
│ ├─ matchCategory()                      │
│ ├─ generateCanvas()                     │
│ ├─ generatePRD()                        │
│ ├─ generateGTM()                        │
│ ├─ generateFeatures()                   │
│ └─ generateValidation()                 │
└──────────────────────────────────────────┘
    ↓
┌─────────────────────────┐
│  Compose Result Object  │
│ - Store metadata        │
│ - Combine artifacts     │
└─────────────────────────┘
    ↓
┌─────────────────────────┐
│  Zustand Store Update   │
│ - Save to state         │
│ - Persist to localStorage
└─────────────────────────┘
    ↓
┌─────────────────────────┐
│  Display Results Page   │
│ - Render artifacts      │
│ - Show tabs             │
└─────────────────────────┘
    ↓
User Export
├─ PDF Download
├─ Markdown Copy
├─ Clipboard Copy
└─ Save to History
```

---

## 4. Core Generation Logic

### 4.1 Keyword Extraction Algorithm

```typescript
// Pseudo-code
function extractKeywords(problemStatement: string): Keyword[] {
  // 1. Tokenize into words
  const tokens = problemStatement.toLowerCase().split(/\s+/)
  
  // 2. Remove stop words (the, a, an, is, etc.)
  const filtered = removeStopWords(tokens)
  
  // 3. Score each word by:
  //    - Frequency
  //    - Position (early words weighted higher)
  //    - Presence in domain vocabularies
  
  // 4. Return top 15-20 keywords with scores
  return topKeywordsByScore(scored, 20)
}
```

### 4.2 Template Matching

```typescript
// Pseudo-code
function matchTemplate(keywords: string[], category: string): Template {
  // For each keyword, find matching:
  // - Features from feature library
  // - Personas from persona library
  // - Channels from channel library
  // - Risks from risk library
  
  // Combine matches by relevance score
  // Return composite template object
}
```

### 4.3 Artifact Composition

Each artifact generator follows this pattern:

```typescript
// Example: Canvas Generator
function generateCanvas(
  keywords: Keyword[],
  category: string,
  problemStatement: string
): CanvasArtifact {
  
  // 1. Extract core concepts
  const valueProposition = generateValueProposition(keywords)
  const userProblem = extractProblem(problemStatement)
  const targetAudience = suggestAudience(category, keywords)
  
  // 2. Pull from templates
  const keyFeatures = matchFeatures(keywords, category, 5)
  const successMetrics = suggestMetrics(category, valueProposition)
  const businessModel = suggestBusinessModel(category)
  
  // 3. Format as markdown
  return formatCanvasMarkdown({
    valueProposition,
    userProblem,
    targetAudience,
    keyFeatures,
    successMetrics,
    businessModel
  })
}
```

---

## 5. Component Hierarchy

```
<RootLayout>
  ├─ <Header />
  ├─ <ThemeProvider>
  │  └─ <MainLayout>
  │     ├─ <HomePage /> (/)
  │     │  ├─ <HeroSection />
  │     │  └─ <InputForm />
  │     │
  │     ├─ <ResultsPage /> (/results/[id])
  │     │  ├─ <LoadingAnimation /> (while generating)
  │     │  ├─ <ArtifactTabs />
  │     │  │  ├─ <MarkdownViewer /> x5
  │     │  │  └─ <EditableContent /> (edit mode)
  │     │  └─ <ExportMenu />
  │     │
  │     ├─ <HistoryPage /> (/history)
  │     │  ├─ <GenerationGrid />
  │     │  │  └─ <GenerationCard /> x10
  │     │  └─ <QuickViewModal />
  │     │
  │     └─ <SettingsPage /> (/settings)
  │        ├─ <ThemeToggle />
  │        └─ <ClearDataButton />
  │
  ├─ <Toast /> (global)
  ├─ <ErrorBoundary />
  └─ <Footer />
</RootLayout>
```

---

## 6. State Management (Zustand)

### 6.1 Generation Store

```typescript
interface Generation {
  id: string
  createdAt: string
  problemStatement: string
  category: string
  industry?: string
  artifacts: {
    canvas: { content: string; editedAt?: string }
    prd: { content: string; editedAt?: string }
    gtm: { content: string; editedAt?: string }
    features: { content: string; editedAt?: string }
    validation: { content: string; editedAt?: string }
  }
  isBookmarked: boolean
}

interface GenerationStore {
  generations: Generation[]
  currentGeneration: Generation | null
  
  // Actions
  addGeneration: (gen: Generation) => void
  updateArtifact: (genId: string, artifact: string, content: string) => void
  deleteGeneration: (genId: string) => void
  toggleBookmark: (genId: string) => void
  setCurrentGeneration: (gen: Generation) => void
  loadFromStorage: () => void
  saveToStorage: () => void
}
```

### 6.2 Settings Store

```typescript
interface Settings {
  theme: 'system' | 'light' | 'dark'
  defaultExportFormat: 'pdf' | 'markdown'
  lastVisited?: string
}

interface SettingsStore {
  settings: Settings
  updateTheme: (theme: Settings['theme']) => void
  updateExportFormat: (format: Settings['defaultExportFormat']) => void
  resetSettings: () => void
}
```

---

## 7. localStorage Schema

### 7.1 Storage Keys

```javascript
// Generations (compressed)
localStorage.setItem(
  'apc_generations',
  JSON.stringify([...generations]) // ~5MB for 10 items
)

// Settings
localStorage.setItem(
  'apc_settings',
  JSON.stringify(settings) // ~100 bytes
)

// Last visited
localStorage.setItem(
  'apc_lastVisited',
  generationId // Single ID
)
```

### 7.2 Quota Management

```typescript
function getStorageUsage(): number {
  // Estimate total bytes used
  const genSize = JSON.stringify(generations).length
  const settingsSize = JSON.stringify(settings).length
  return genSize + settingsSize
}

function checkStorageQuota(): {
  used: number
  total: number
  percent: number
} {
  // Browser default: 5-10MB per domain
  // We'll use ~5MB limit, warn at 80%
}

function pruneOldest(): void {
  // When quota exceeded, delete oldest generation
  // Keep minimum 1, maximum 10
}
```

---

## 8. Generation Rules & Templates

### 8.1 Feature Library

```typescript
const FEATURE_LIBRARY = {
  'saas': [
    'User authentication & profiles',
    'Dashboard overview',
    'Real-time collaboration',
    'API integrations',
    'Reporting & analytics',
    'Role-based access control',
    'Audit logging',
    'Mobile app',
    // ... 20+ more
  ],
  'b2c_app': [
    'Social login',
    'Push notifications',
    'In-app messaging',
    'Gamification',
    'User-generated content',
    // ...
  ],
  // ... other categories
}
```

### 8.2 Persona Templates

```typescript
const PERSONA_ARCHETYPES = {
  'primary': {
    roles: ['VP Product', 'Founder', 'Product Manager', 'CTO'],
    goals: ['Increase efficiency', 'Reduce costs', 'Scale quickly'],
    pains: ['Time constraints', 'Limited budget', 'Competition']
  },
  'secondary': {
    roles: ['Team Lead', 'Individual Contributor'],
    goals: ['Learn new skills', 'Improve workflow'],
    pains: ['Tool fragmentation', 'Complexity']
  },
  // ...
}
```

### 8.3 Distribution Channels

```typescript
const CHANNELS_BY_CATEGORY = {
  'saas': [
    'Direct sales',
    'Self-serve SaaS website',
    'Marketing automation',
    'Sales partnerships',
    'Community & user groups'
  ],
  'b2c_app': [
    'App Store Optimization',
    'Social media ads',
    'Influencer partnerships',
    'Viral loops',
    'Community building'
  ],
  // ...
}
```

---

## 9. Export Implementation

### 9.1 PDF Generation (jsPDF)

```typescript
import jsPDF from 'jspdf'

function generatePDF(
  artifacts: Artifacts,
  problemStatement: string,
  category: string
): Blob {
  const doc = new jsPDF()
  
  // Title page
  doc.setFontSize(24)
  doc.text('Product Development Plan', 20, 30)
  doc.setFontSize(12)
  doc.text(`Category: ${category}`, 20, 50)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 60)
  
  // Add pages for each artifact
  let pageNum = 2
  Object.entries(artifacts).forEach(([name, content]) => {
    doc.addPage()
    doc.setFontSize(18)
    doc.text(formatArtifactName(name), 20, 30)
    
    // Wrap text and add content
    const wrappedText = doc.splitTextToSize(content, 170)
    doc.setFontSize(10)
    doc.text(wrappedText, 20, 50)
    
    pageNum++
  })
  
  return doc.output('blob')
}
```

### 9.2 Markdown Export

```typescript
function exportMarkdown(artifacts: Artifacts): string {
  let markdown = `# Product Development Plan\n\n`
  
  Object.entries(artifacts).forEach(([name, content]) => {
    markdown += `## ${formatArtifactName(name)}\n\n`
    markdown += content + '\n\n'
  })
  
  return markdown
}
```

---

## 10. Performance Optimization

### 10.1 Bundle Size Targets

| Package | Target Size | Notes |
|---------|------------|-------|
| React + Next.js | ~150KB | Core framework |
| Tailwind CSS | ~20KB | Utility CSS |
| shadcn/ui | ~15KB | Selected components |
| Zustand | ~2KB | State management |
| jsPDF | ~50KB | PDF export |
| **Total (gzipped)** | **~200KB** | < 2s load time |

### 10.2 Code Splitting

```typescript
// Dynamic imports for routes
const ResultsPage = dynamic(() => import('@/app/results/[id]/page'))
const HistoryPage = dynamic(() => import('@/app/history/page'))
const SettingsPage = dynamic(() => import('@/app/settings/page'))

// Lazy load heavy components
const PDFViewer = dynamic(
  () => import('@/components/PDFViewer'),
  { loading: () => <Skeleton /> }
)
```

### 10.3 Rendering Optimization

- Use React.memo for pure components
- Implement virtualization for large lists (if history grows)
- debounce autosave in edit mode
- Lazy load markdown viewer content

---

## 11. Error Handling Strategy

### 11.1 Error Boundaries

```typescript
<ErrorBoundary
  fallback={<ErrorPage />}
  onError={(error, info) => {
    console.error('Generation failed:', error)
    // Show toast notification
    // Log to analytics (post-POC)
  }}
>
  <ArtifactTabs />
</ErrorBoundary>
```

### 11.2 Graceful Degradation

```typescript
// If localStorage unavailable
try {
  localStorage.setItem('test', 'test')
} catch (e) {
  // Fall back to in-memory store
  useMemoryStore()
}

// If PDF export fails
try {
  generatePDF(artifacts)
} catch (e) {
  // Fallback to markdown download
  downloadMarkdown(artifacts)
}
```

---

## 12. Testing Strategy

### 12.1 Unit Tests (Jest)

```typescript
// tests/lib/generation/keywords.test.ts
describe('Keyword Extraction', () => {
  test('extracts main concepts from problem statement', () => {
    const input = 'Build a tool to help teams collaborate asynchronously'
    const keywords = extractKeywords(input)
    expect(keywords).toContain('collaborate')
    expect(keywords).toContain('teams')
  })
  
  test('removes stop words', () => {
    const input = 'the quick brown fox jumps over the lazy dog'
    const keywords = extractKeywords(input)
    expect(keywords).not.toContain('the')
    expect(keywords).not.toContain('over')
  })
})
```

### 12.2 Integration Tests

```typescript
// tests/generation.integration.test.ts
describe('Full Generation Flow', () => {
  test('generates all 5 artifacts from problem statement', async () => {
    const artifacts = await generateArtifacts(
      'Build Slack for email',
      'SaaS'
    )
    
    expect(artifacts.canvas).toBeDefined()
    expect(artifacts.prd).toBeDefined()
    expect(artifacts.gtm).toBeDefined()
    expect(artifacts.features).toBeDefined()
    expect(artifacts.validation).toBeDefined()
  })
  
  test('artifacts are non-empty markdown', () => {
    Object.values(artifacts).forEach(content => {
      expect(content.length).toBeGreaterThan(500)
      expect(content).toContain('#')
    })
  })
})
```

### 12.3 E2E Tests (Playwright)

```typescript
// tests/e2e/generation.spec.ts
test('user can generate and export artifacts', async ({ page }) => {
  await page.goto('/')
  
  // Fill form
  await page.fill('textarea', 'Build a productivity app')
  await page.selectOption('select', 'b2c_app')
  
  // Generate
  await page.click('button:has-text("Generate")')
  await page.waitForSelector('[data-testid="artifact-canvas"]')
  
  // Export
  await page.click('button:has-text("Export as PDF")')
  
  // Verify download
  const download = await page.waitForEvent('download')
  expect(download.suggestedFilename()).toContain('.pdf')
})
```

---

## 13. Accessibility (WCAG 2.1 AA)

### 13.1 Semantic HTML

```typescript
// ✅ Use semantic elements
<main role="main">
  <section aria-labelledby="artifacts-title">
    <h2 id="artifacts-title">Generated Artifacts</h2>
    <nav aria-label="Artifact sections">
      <button aria-selected="true" aria-controls="canvas-panel">
        Canvas
      </button>
    </nav>
    <div id="canvas-panel" role="tabpanel">
      {/* content */}
    </div>
  </section>
</main>
```

### 13.2 Keyboard Navigation

```typescript
// All interactive elements keyboard-accessible
// Tab order logical
// Escape closes modals
// Enter submits forms
// Arrow keys navigate tabs
```

### 13.3 Color Contrast

```css
/* Minimum 4.5:1 for normal text */
/* Minimum 3:1 for large text */
/* Tested with contrast checker tools */
```

---

## 14. Deployment Checklist

### Pre-Deployment
- [ ] All 5 generators produce valid markdown
- [ ] localStorage persistence works
- [ ] PDF export tested on Chrome, Firefox, Safari
- [ ] Dark/light mode switches correctly
- [ ] Mobile responsive (375px-2560px)
- [ ] Lighthouse score > 90
- [ ] No console errors/warnings
- [ ] TypeScript strict mode passes
- [ ] ESLint rules pass
- [ ] Unit/integration tests pass

### Vercel Deployment
```bash
# Connect GitHub repo to Vercel
# Zero-config Next.js deployment
# Automatic preview URLs
# Production URL: ai-product-copilot.vercel.app
```

### Post-Deployment
- [ ] Production URL loads in < 2s
- [ ] Generation works end-to-end
- [ ] localStorage accessible
- [ ] PDF download works
- [ ] Mobile layout correct
- [ ] Lighthouse score > 90

---

## 15. Future Enhancements (Post-POC)

### Phase 2: Advanced Generation
- [ ] Integrate with Claude API (optional external AI)
- [ ] Custom generation rules editor
- [ ] Multiple generation modes (Quick/Detailed)
- [ ] Template library selection

### Phase 3: Collaboration
- [ ] Share via encrypted URL
- [ ] Real-time collaboration (WebSocket)
- [ ] Comments & feedback threads
- [ ] Version control/history

### Phase 4: Monetization
- [ ] User accounts & auth (Firebase)
- [ ] Premium templates
- [ ] Analytics dashboard
- [ ] Team collaboration features

---

## 16. Dependencies & Package Versions

```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "@radix-ui/react-*": "latest",
    "zustand": "^4.4.0",
    "framer-motion": "^10.16.0",
    "jspdf": "^2.5.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0",
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.0",
    "@playwright/test": "^1.40.0"
  }
}
```

---

## 17. Configuration Files

### 17.1 next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // No API routes needed
}

module.exports = nextConfig
```

### 17.2 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 18. Build & Dev Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Build
npm run build            # Production build to .next/

# Production
npm start                # Serve production build

# Testing
npm test                 # Run Jest tests
npm run test:e2e         # Run Playwright tests

# Linting
npm run lint             # Run ESLint
npm run format           # Run Prettier

# Type checking
npm run type-check       # Run TypeScript compiler
```

---

## 19. Environment & Secrets

**No environment variables required.**

All configuration is hardcoded or inferred:
- Categories defined in code
- Feature libraries imported directly
- Theme determined by system preference

---

## 20. Monitoring & Logging (Post-POC)

### Development
- Console logs for generation steps
- localStorage quota warnings
- Performance marks (generation time)

### Production (Optional)
- Error tracking (Sentry)
- Analytics (Vercel Analytics)
- Lighthouse monitoring

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-05  
**Status:** Ready for Implementation
