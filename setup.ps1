# AI Product Copilot - Automated Setup Script (Windows PowerShell)
# This script installs, builds, and runs the application locally
# Usage: .\setup.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "AI Product Copilot - Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Color helper
function Write-Success {
    Write-Host "✓ $args" -ForegroundColor Green
}

function Write-Error-Custom {
    Write-Host "✗ $args" -ForegroundColor Red
}

function Write-Info {
    Write-Host "ℹ $args" -ForegroundColor Yellow
}

# Step 1: Check Prerequisites
Write-Info "Step 1: Checking prerequisites..."

$nodeVersion = node --version 2>$null
if ($null -eq $nodeVersion) {
    Write-Error-Custom "Node.js is not installed or not in PATH"
    Write-Info "Install from: https://nodejs.org/"
    exit 1
}
Write-Success "Node.js found: $nodeVersion"

$npmVersion = npm --version 2>$null
if ($null -eq $npmVersion) {
    Write-Error-Custom "npm is not installed or not in PATH"
    exit 1
}
Write-Success "npm found: $npmVersion"

# Verify we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Error-Custom "package.json not found - are you in the right directory?"
    Write-Info "Expected: C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot"
    exit 1
}
Write-Success "package.json found"

Write-Host ""

# Step 2: Clean Install
Write-Info "Step 2: Installing dependencies..."
Write-Info "This may take 2-3 minutes..."

# Remove node_modules if they exist and are corrupted
if (Test-Path "node_modules\.bin\next" -PathType Leaf) {
    Write-Info "Dependencies already installed, skipping npm install"
} else {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "npm install failed"
        exit 1
    }
    Write-Success "Dependencies installed"
}

Write-Host ""

# Step 3: TypeScript Check
Write-Info "Step 3: Checking TypeScript..."
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Error-Custom "TypeScript check failed - there are type errors"
    exit 1
}
Write-Success "TypeScript check passed (0 errors)"

Write-Host ""

# Step 4: Build
Write-Info "Step 4: Building application..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error-Custom "Build failed"
    exit 1
}
Write-Success "Build completed successfully"

Write-Host ""

# Step 5: Ready to run
Write-Host "================================" -ForegroundColor Green
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run the dev server:" -ForegroundColor White
Write-Host "     npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "  2. Open in browser:" -ForegroundColor White
Write-Host "     http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "  3. Test it:" -ForegroundColor White
Write-Host "     - Enter a problem statement" -ForegroundColor Gray
Write-Host "     - Select a category (SaaS, B2C, Marketplace, etc.)" -ForegroundColor Gray
Write-Host "     - Click Generate" -ForegroundColor Gray
Write-Host "     - View 7 professional artifacts" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Enter to start the dev server now..." -ForegroundColor Cyan
Read-Host

# Step 6: Start dev server
Write-Info "Starting dev server..."
Write-Info "The app will open at http://localhost:3000"
Write-Info "Press Ctrl+C to stop the server"
Write-Host ""

npm run dev
