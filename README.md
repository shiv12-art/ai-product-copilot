# 🚀 AI Product Assistant

A simple frontend POC that transforms product ideas into comprehensive development plans using Claude AI.

## Features

- **Problem Statement Input** - Enter your product idea or problem statement
- **Intelligent Planning** - Claude AI generates structured product plans including:
  - Executive Summary
  - Problem Analysis
  - Target Users & Personas
  - Core Features
  - Success Metrics
  - Development Roadmap
  - Technology Stack
  - Business Model
  - Risk Assessment
  - Next Steps
- **Clean UI** - Modern, responsive interface with real-time generation

## Getting Started

### Prerequisites
- A Claude API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Running the POC

1. Open `index.html` in your web browser
2. Paste your Claude API key
3. Enter your product idea or problem statement
4. Click "Generate Product Plan"
5. Wait for Claude to generate your complete product development plan

## How It Works

1. You provide a product idea or problem statement
2. The app sends this to Claude API with a structured prompt
3. Claude generates a comprehensive product plan with 10 key sections
4. The output is displayed in a formatted, easy-to-read way

## Files

- `index.html` - Main page with form and output display
- `style.css` - Styling (gradient background, responsive design)
- `script.js` - Form handling and Claude API integration

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Claude API (via REST)

## API Model

Uses `claude-opus-4-1` model with a 4000 token limit for detailed output.

## Notes

- This is a simple POC - API key is sent client-side
- For production, implement a backend server to handle API calls securely
- The markdown parser is basic - for complex formatting, consider using a library

## Future Enhancements

- [ ] Add export to PDF/Word
- [ ] Save plans to local storage
- [ ] Multiple plan templates
- [ ] Real-time collaboration
- [ ] Custom prompts and parameters
- [ ] Backend server for secure API handling
