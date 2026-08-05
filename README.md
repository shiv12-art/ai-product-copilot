# AI Product Copilot

Generate professional product development artifacts from your ideas in minutes.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd ai-product-copilot
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/
│   ├── generation/   # Core artifact generation logic
│   ├── storage/      # localStorage management (Zustand)
│   ├── export/       # PDF/Markdown export utilities
│   ├── utils/        # Helper functions
│   └── hooks/        # Custom React hooks
├── styles/           # Global styles
└── types/            # TypeScript definitions
```

## ✨ Features

### 5 Professional Artifacts
1. **Product Canvas** - One-page business model overview
2. **Product Requirements Document (PRD)** - Comprehensive product spec
3. **Go-to-Market Strategy** - Launch and growth plan
4. **Feature Specification** - Detailed feature table
5. **Validation Plan** - Customer discovery and experiments

### Rule-Based Generation
- No external APIs or AI services
- Template-based artifact generation
- Keyword extraction from problem statement
- Category-specific customization

### Offline-First
- All data stored in browser (localStorage)
- Works completely offline
- No authentication needed
- Privacy-focused (no tracking)

### Export Options
- PDF download (individual or bundled)
- Markdown export
- Copy to clipboard
- Print-friendly layouts

### Data Management
- Store up to 10 generations
- View history and previous versions
- Edit artifacts inline
- Bookmark favorites

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Components:** Radix UI primitives
- **Animations:** Framer Motion
- **Export:** jsPDF
- **Deployment:** Vercel

## 📋 Core Modules

### Generation System (`src/lib/generation/`)
- `generator.ts` - Main orchestrator
- `keywords.ts` - Keyword extraction algorithm
- `rules/` - Artifact generation rules for each type
- `templates/` - Feature, persona, and channel templates

### Storage System (`src/lib/storage/`)
- `generationStore.ts` - Zustand store for state management
- localStorage persistence with automatic sync

### Components (`src/components/`)
- `Input/` - Form inputs and validation
- `Artifacts/` - Artifact viewing and editing
- `History/` - Generation history and management
- `Common/` - Header, footer, theme toggle

## 🎯 Generation Logic

### Keyword Extraction
Analyzes problem statement to identify key concepts and themes.

### Category Matching
Maps problem to product category (SaaS, B2C App, Marketplace, etc.) for specialized templates.

### Template Selection
Pulls relevant features, personas, channels, and strategies from pre-built libraries.

### Artifact Composition
Combines extracted data with templates to generate markdown artifacts.

### Formatting
Converts to styled HTML for display, PDF for export, or Markdown for sharing.

## 🔐 Privacy & Security

- ✅ No external API calls
- ✅ All data in browser localStorage
- ✅ No server-side processing
- ✅ No tracking or analytics
- ✅ No personal data collection
- ✅ Works offline

## 📊 Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repo to Vercel
# Zero-config deployment
# Production URL: ai-product-copilot.vercel.app
```

### Build Output

```
.next/              # Optimized build
dist/               # Static assets
```

### Performance Targets
- Bundle size: < 200KB (gzipped)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s
- Lighthouse Score: > 90

## 🧪 Testing

```bash
npm test              # Run unit tests
npm run test:watch    # Watch mode
```

## 📝 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `postcss.config.js` - PostCSS plugins
- `.eslintrc.json` - ESLint rules
- `.gitignore` - Git ignore rules

## 🎨 UI/UX

- **Color Scheme:** Blue/Purple gradient (customizable via CSS variables)
- **Dark Mode:** System preference detection + manual toggle
- **Responsive:** Mobile-first design (375px+)
- **Accessibility:** WCAG 2.1 AA compliance
- **Animations:** Smooth transitions with Framer Motion

## 📖 Documentation

- `AI-Product-Copilot-PRD.md` - Product Requirements Document
- `AI-Product-Copilot-TECHNICAL.md` - Technical Architecture Document

## 🚀 Next Steps

1. **Complete Component Implementation** (Day 1-2)
   - [ ] ResultsPage component
   - [ ] ArtifactTabs navigation
   - [ ] MarkdownViewer
   - [ ] ExportMenu
   - [ ] History page
   - [ ] Settings page

2. **Export Functionality** (Day 2)
   - [ ] PDF generation with jsPDF
   - [ ] Markdown export
   - [ ] Clipboard copy

3. **Polish & Testing** (Day 3)
   - [ ] Dark mode styling
   - [ ] Mobile responsive testing
   - [ ] Browser compatibility
   - [ ] Performance optimization
   - [ ] Accessibility audit

4. **Deployment** (Day 3)
   - [ ] Vercel setup
   - [ ] Production build
   - [ ] Performance monitoring
   - [ ] QA testing

## 🤝 Contributing

This is a portfolio POC. Contributions welcome for enhancements and bug fixes.

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

**Built with ❤️ as a 3-day portfolio POC**

**No external APIs. No backend. No database. No dependencies beyond npm packages.**
