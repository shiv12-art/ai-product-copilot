# 🚀 Setup Guide - AI Product Copilot

**Choose Your Setup Method**

---

## Option 1: Automated Setup (Recommended) ⚡

### Windows Users

```powershell
# Navigate to project directory
cd "C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot"

# Run setup script
.\setup.ps1

# Script will:
# ✓ Check Node.js and npm
# ✓ Install dependencies
# ✓ Run TypeScript check
# ✓ Build application
# ✓ Start dev server at http://localhost:3000
```

### Mac/Linux Users

```bash
# Navigate to project directory
cd ~/path/to/ai-product-copilot

# Make script executable
chmod +x setup.sh

# Run setup script
./setup.sh

# Script will:
# ✓ Check Node.js and npm
# ✓ Install dependencies
# ✓ Run TypeScript check
# ✓ Build application
# ✓ Start dev server at http://localhost:3000
```

---

## Option 2: Manual Setup

### Prerequisites
- Node.js 18+ (`node --version`)
- npm 9+ (`npm --version`)

### Commands

```bash
# 1. Navigate to project
cd "C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot"

# 2. Install dependencies
npm install

# 3. Check TypeScript
npm run type-check

# 4. Build
npm run build

# 5. Start dev server
npm run dev

# 6. Open browser
# http://localhost:3000
```

**Time:** ~10 minutes

---

## Option 3: Docker Setup (For Consistency) 🐳

### Prerequisites
- Docker installed (docker.com)
- Docker Desktop running

### Commands

```bash
# Navigate to project
cd "C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot"

# Option A: Using Docker Compose (Easiest)
docker-compose up

# Option B: Using Docker directly
docker build -t ai-product-copilot .
docker run -p 3000:3000 ai-product-copilot

# App will be at: http://localhost:3000
```

**Benefits:**
- ✅ Consistent environment across projects
- ✅ No Node.js/npm version conflicts
- ✅ Easy to reuse for other projects
- ✅ Portable setup

**Time:** ~3-5 minutes

---

## Verify Installation

Once running, verify the app works:

```
✓ Homepage loads (http://localhost:3000)
✓ Form accepts input
✓ Category grid visible (14 categories)
✓ Generate button works
✓ Artifacts display (7 per generation)
✓ Dark mode toggle works
✓ No console errors (F12 → Console)
```

### Test with SaaS Example

1. Go to `http://localhost:3000`
2. Enter problem: "Help product managers prioritize features"
3. Select category: "SaaS"
4. Click "Generate"
5. Wait for artifacts (< 3 seconds)
6. See:
   - Product Canvas
   - PRD (with personas that include job context!)
   - GTM Strategy (with "Land & Expand" motion)
   - Features (with user stories)
   - Validation Plan
   - Competitive Analysis (Asana, Monday.com, Notion)
   - Success Metrics

---

## Troubleshooting

### "Node.js not found"
```bash
# Install from https://nodejs.org/
# Verify installation
node --version
npm --version

# If still not found, restart terminal/IDE
```

### "npm install fails"
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install
```

### "Build fails"
```bash
# Check TypeScript errors
npm run type-check

# Review error messages and fix
# Common issues:
# - Import errors: Check file paths
# - Type errors: Check types/generation.ts

# Rebuild
npm run build
```

### "Port 3000 already in use"
```bash
# Option 1: Use different port
PORT=3001 npm run dev
# Then visit: http://localhost:3001

# Option 2: Kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### "Docker not found"
```bash
# Install Docker from: https://www.docker.com/products/docker-desktop
# Ensure Docker Desktop is running
# Verify: docker --version
```

### "npm run dev doesn't start"
```bash
# Check for errors
npm run type-check

# Verify port 3000 is free
# Kill any existing Next.js processes
# Try again:
npm run dev
```

---

## For Upcoming Projects

### Reuse This Setup

To use this setup process for future projects:

```bash
# 1. Copy setup scripts to new project
cp setup.ps1 /path/to/new-project/
cp setup.sh /path/to/new-project/
cp Dockerfile /path/to/new-project/
cp docker-compose.yml /path/to/new-project/

# 2. Run setup in new project
cd /path/to/new-project
./setup.ps1  # Windows
./setup.sh   # Mac/Linux
```

### Or Use Docker Image for All Projects

```bash
# Build once
docker build -t dev-environment .

# Reuse for any Node.js project
docker run -v $(pwd):/app -p 3000:3000 dev-environment npm run dev
```

---

## What Gets Installed

### Dependencies
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **jsPDF** - PDF export
- **docx** - Word export
- **lucide-react** - Icons

### Total size
- `node_modules/`: ~500MB
- `.next/` (build): ~50MB

---

## Environment Variables

This project uses **client-side only** architecture. No backend required.

Optional `.env.local` (create if needed):
```
NEXT_PUBLIC_ENV=development
```

For production:
```
NEXT_PUBLIC_ENV=production
```

---

## Commands Reference

```bash
# Installation
npm install                 # Install dependencies

# Development
npm run dev               # Start dev server (http://localhost:3000)
npm run type-check        # Check TypeScript types
npm run build             # Build for production

# Production
npm run start             # Start production server
npm run export            # Export static site

# Testing
npm run lint              # Run linter (if configured)
npm test                  # Run tests (if configured)
```

---

## Quick Start Summary

### 🟢 Fastest Way (Windows)
```powershell
cd "C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot"
.\setup.ps1
# App runs at http://localhost:3000
```

### 🟢 Fastest Way (Mac/Linux)
```bash
cd ~/ai-product-copilot
chmod +x setup.sh
./setup.sh
# App runs at http://localhost:3000
```

### 🐳 Consistent Way (All Platforms)
```bash
cd ~/ai-product-copilot
docker-compose up
# App runs at http://localhost:3000
```

---

## Next Steps After Setup

### 1. Test Locally
- [ ] Follow TESTING_CHECKLIST.md for all 50+ tests
- [ ] Verify all 14 categories generate artifacts
- [ ] Test exports (PDF, Word, Markdown)
- [ ] Test dark mode

### 2. Deploy to Staging
```bash
vercel --prod
# Get URL: ai-product-copilot-staging.vercel.app
```

### 3. Full Testing on Staging
- [ ] Run TESTING_CHECKLIST.md again on staging URL
- [ ] Performance test (should be faster than local)
- [ ] Browser compatibility test

### 4. Deploy to Production
```bash
npm run build
npm run start  # Verify locally first
vercel --prod  # Deploy to production
```

---

## Key Files

| File | Purpose |
|------|---------|
| `setup.ps1` | Windows automated setup |
| `setup.sh` | Mac/Linux automated setup |
| `Dockerfile` | Docker container definition |
| `docker-compose.yml` | Docker compose configuration |
| `package.json` | Dependencies and scripts |
| `.next/` | Build output (generated) |
| `node_modules/` | Dependencies (generated) |

---

## Performance Tips

### Make Builds Faster
```bash
# Use faster npm mirror
npm config set registry https://registry.npmmirror.com

# Cache npm packages
npm ci  # Instead of npm install
```

### Make Dev Server Faster
```bash
# Disable Next.js analytics
NEXT_TELEMETRY_DISABLED=1 npm run dev

# Use faster file watcher
npm run dev -- --experimental-app-dir
```

---

## Support

**If setup fails:**
1. Check prerequisites: Node.js 18+, npm 9+
2. Run TypeScript check: `npm run type-check`
3. Clear cache: `npm cache clean --force`
4. Reinstall: `rm -rf node_modules && npm install`
5. Rebuild: `npm run build`

**Still stuck?**
- Check error message in console
- See specific troubleshooting above
- Review git logs: `git log --oneline`

---

## Summary

**Choose one setup method:**

| Method | Time | Ease | Best For |
|--------|------|------|----------|
| Automated (Windows) | 2-3 min | ⭐⭐⭐ | Windows users |
| Automated (Mac/Linux) | 2-3 min | ⭐⭐⭐ | Mac/Linux users |
| Manual | 10 min | ⭐⭐ | Advanced users |
| Docker | 3-5 min | ⭐⭐⭐ | Consistency/reuse |

**All end at:** `http://localhost:3000` ✅

**Time to app running:** 2-10 minutes

---

**Ready? Pick a method above and start! 🚀**

Questions? See troubleshooting or check PHASE_10_EXECUTION_GUIDE.md for deployment.
