#!/usr/bin/env powershell
# AI Product Copilot - Setup Script for Windows
# Run: .\setup.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "AI Product Copilot - Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "ERROR: Node.js not found. Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Node.js $nodeVersion" -ForegroundColor Green

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if (-not $npmVersion) {
    Write-Host "ERROR: npm not found" -ForegroundColor Red
    exit 1
}
Write-Host "OK: npm $npmVersion" -ForegroundColor Green

# Check package.json
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found" -ForegroundColor Red
    exit 1
}
Write-Host "OK: package.json found" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "Installing dependencies (this may take 2-3 minutes)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Dependencies installed" -ForegroundColor Green
Write-Host ""

# TypeScript check
Write-Host "Checking TypeScript..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: TypeScript check failed" -ForegroundColor Red
    exit 1
}
Write-Host "OK: TypeScript check passed" -ForegroundColor Green
Write-Host ""

# Build
Write-Host "Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Build completed" -ForegroundColor Green
Write-Host ""

Write-Host "================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Starting dev server..." -ForegroundColor Yellow
Write-Host "App will open at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

npm run dev
