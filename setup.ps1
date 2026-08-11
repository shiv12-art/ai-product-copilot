# AI Product Copilot - Automated Setup Script (Windows PowerShell)
# This script installs, builds, and runs the application locally
# Usage: .\setup.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "AI Product Copilot - Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

function Write-Success {
    Write-Host "✓ $args" -ForegroundColor Green
}

function Write-ErrorMsg {
    Write-Host "✗ $args" -ForegroundColor Red
}

function Write-InfoMsg {
    Write-Host "ℹ $args" -ForegroundColor Yellow
}

# Step 1: Check Prerequisites
Write-InfoMsg "Step 1: Checking prerequisites..."

$nodeVersion = node --version 2>$null
if ($null -eq $nodeVersion) {
    Write-ErrorMsg "Node.js is not installed or not in PATH"
    Write-InfoMsg "Install from: https://nodejs.org/"
    exit 1
}
Write-Success "Node.js found: $nodeVersion"

$npmVersion = npm --version 2>$null
if ($null -eq $npmVersion) {
    Write-ErrorMsg "npm is not installed or not in PATH"
    exit 1
}
Write-Success "npm found: $npmVersion"

if (-not (Test-Path "package.json")) {
    Write-ErrorMsg "package.json not found - are you in the right directory?"
    Write-InfoMsg "Expected: C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot"
    exit 1
}
Write-Success "package.json found"

Write-Host ""

# Step 2: Clean Install
Write-InfoMsg "Step 2: Installing dependencies..."
Write-InfoMsg "This may take 2-3 minutes..."

if (Test-Path "node_modules\.bin\next" -PathType Leaf) {
    Write-Success "Dependencies already installed, skipping npm install"
} else {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-ErrorMsg "npm install failed"
        exit 1
    }
    Write-Success "Dependencies installed"
}

Write-Host ""

# Step 3: TypeScript Check
Write-InfoMsg "Step 3: Checking TypeScript..."
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-ErrorMsg "TypeScript check failed - there are type errors"
    exit 1
}
Write-Success "TypeScript check passed (0 errors)"

Write-Host ""

# Step 4: Build
Write-InfoMsg "Step 4: Building application..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-ErrorMsg "Build failed"
    exit 1
}
Write-Success "Build completed successfully"

Write-Host ""
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
Write-Host "     - Select a product category" -ForegroundColor Gray
Write-Host "     - Click Generate" -ForegroundColor Gray
Write-Host "     - View 7 professional artifacts" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Enter to start the dev server..." -ForegroundColor Cyan
Read-Host

Write-InfoMsg "Starting dev server..."
Write-InfoMsg "App will be at http://localhost:3000"
Write-InfoMsg "Press Control+C to stop"
Write-Host ""

npm run dev
