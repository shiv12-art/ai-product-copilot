#!/bin/bash
# AI Product Copilot - Automated Setup Script (macOS/Linux)
# This script installs, builds, and runs the application locally
# Usage: bash setup.sh

echo "================================"
echo "AI Product Copilot - Setup"
echo "================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
}

info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Step 1: Check Prerequisites
info "Step 1: Checking prerequisites..."

if ! command -v node &> /dev/null; then
    error "Node.js is not installed"
    info "Install from: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node --version)
success "Node.js found: $NODE_VERSION"

if ! command -v npm &> /dev/null; then
    error "npm is not installed"
    exit 1
fi
NPM_VERSION=$(npm --version)
success "npm found: $NPM_VERSION"

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found - are you in the right directory?"
    exit 1
fi
success "package.json found"

echo ""

# Step 2: Clean Install
info "Step 2: Installing dependencies..."
info "This may take 2-3 minutes..."

if [ -f "node_modules/.bin/next" ]; then
    success "Dependencies already installed"
else
    npm install
    if [ $? -ne 0 ]; then
        error "npm install failed"
        exit 1
    fi
    success "Dependencies installed"
fi

echo ""

# Step 3: TypeScript Check
info "Step 3: Checking TypeScript..."
npm run type-check
if [ $? -ne 0 ]; then
    error "TypeScript check failed - there are type errors"
    exit 1
fi
success "TypeScript check passed (0 errors)"

echo ""

# Step 4: Build
info "Step 4: Building application..."
npm run build
if [ $? -ne 0 ]; then
    error "Build failed"
    exit 1
fi
success "Build completed successfully"

echo ""

# Step 5: Ready to run
echo "================================"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "================================"
echo ""

echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Run the dev server:"
echo -e "     ${YELLOW}npm run dev${NC}"
echo ""
echo "  2. Open in browser:"
echo -e "     ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "  3. Test it:"
echo "     - Enter a problem statement"
echo "     - Select a category (SaaS, B2C, Marketplace, etc.)"
echo "     - Click Generate"
echo "     - View 7 professional artifacts"
echo ""
echo -e "${YELLOW}Press Enter to start the dev server now...${NC}"
read

# Step 6: Start dev server
info "Starting dev server..."
info "The app will open at http://localhost:3000"
info "Press Ctrl+C to stop the server"
echo ""

npm run dev
