# UI Prototype Testing Guide

## 🚀 Quick Start - Run the Prototype

### Option 1: Using Node.js Server (Recommended)

```bash
cd C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot

# Run the server
node server.js
```

**Output:**
```
✅ Server running at http://localhost:3001
📱 Open in browser: http://localhost:3001/prototype
```

**Then open this link in your browser:**
```
http://localhost:3001/prototype
```

### Option 2: Using Python Simple Server

```bash
cd C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot

# Python 3
python -m http.server 3001

# Or Python 2
python -m SimpleHTTPServer 3001
```

Then open: **http://localhost:3001/UI-PROTOTYPE.html**

### Option 3: Direct File Open

Simply open the file directly in your browser:
```
C:\Users\ls114567\Desktop\AI-Product-Assistant\ai-product-copilot\UI-PROTOTYPE.html
```

---

## ✅ Testing Checklist

### 1. **Generate Artifacts** (2 min)
- [ ] Fill in "Your Idea" field with sample text
- [ ] Select a product category from dropdown
- [ ] Click "Generate Artifacts" button
- [ ] See toast notification: "✨ Artifacts generated successfully!"
- [ ] View Problem statement displayed
- [ ] Check all 5 tabs appear: Canvas, PRD, GTM, Features, Validation

### 2. **View Artifacts** (2 min)
- [ ] Canvas tab shows product overview
- [ ] PRD tab shows detailed requirements
- [ ] GTM tab shows go-to-market strategy
- [ ] Features tab shows feature table
- [ ] Validation tab shows validation plan
- [ ] Click between tabs smoothly

### 3. **Export Functionality** (3 min)
- [ ] Click "Export" button (appears on results page)
- [ ] Dropdown menu shows 4 options:
  - [x] PDF (Current artifact)
  - [x] PDF (All 5 artifacts)
  - [x] Markdown
  - [x] Copy to Clipboard
- [ ] Click "Copy to Clipboard" → see toast "📋 Copied to clipboard!"
- [ ] Click "Markdown" → file downloads as `artifact-[name].md`
- [ ] PDF options show toast messages

### 4. **Navigation** (2 min)
- [ ] Home page loads with hero section
- [ ] Click "Results" nav link → goes to results page
- [ ] Click "History" nav link → shows 3 past generations
- [ ] Click "Settings" nav link → shows settings page
- [ ] Click back button → returns to home page

### 5. **History Page** (2 min)
- [ ] 3 sample generation cards displayed
- [ ] Click a card → loads that generation
- [ ] Problem statement updates
- [ ] Results page shows with loaded artifacts

### 6. **Settings Page** (1 min)
- [ ] Shows version, status, GitHub link
- [ ] "Export All Data" button present
- [ ] Theme toggle working

### 7. **Dark Mode** (2 min)
- [ ] Click moon icon (🌙) in header
- [ ] All colors invert to dark theme
- [ ] Click sun icon (☀️) to switch back
- [ ] Theme persists on page reload

### 8. **Example Buttons** (1 min)
- [ ] Click "Async Communication Tool" example
- [ ] Form populates with sample text
- [ ] Category auto-selects as "SaaS"
- [ ] Can click "Generate" to create artifacts

### 9. **Responsive Design** (2 min)
- [ ] Open DevTools (F12)
- [ ] Switch to mobile view (375px width)
- [ ] All content visible and readable
- [ ] Buttons easily clickable
- [ ] No horizontal scrolling
- [ ] Form inputs properly sized

### 10. **UI/UX Quality** (2 min)
- [ ] Font sizes consistent across pages
- [ ] Spacing balanced (not too cramped or sparse)
- [ ] Colors professional and accessible
- [ ] Buttons have hover effects
- [ ] Smooth transitions between pages
- [ ] Toast notifications appear and disappear smoothly

---

## 📊 Sample Test Data

### SaaS Example
```
Build a tool to help remote teams manage asynchronous communication without Slack overload.
```
**Category:** SaaS (Software as Service)

### B2C App Example
```
Habit-tracking app with gamification, streaks, and social challenges
```
**Category:** B2C App (Mobile/Web)

### Marketplace Example
```
Marketplace for renting unused storage space in basements and garages
```
**Category:** Marketplace

---

## 🎯 Expected Results

✅ All 5 artifacts generate in < 2 seconds  
✅ Export copy-to-clipboard works  
✅ Export markdown download works  
✅ Dark mode toggles smoothly  
✅ Mobile view is responsive  
✅ Navigation is intuitive  
✅ No console errors  
✅ Toast notifications appear  

---

## 🔍 Browser Console Check

Open DevTools (F12) and check:
```
Console tab: Should be CLEAR (no red errors)
Network tab: All resources load successfully
Performance: No janky animations
```

---

## 🚀 Next Steps After Testing

1. **If all tests pass:**
   - Prototype is ready for demo
   - Can proceed with Next.js deployment

2. **If issues found:**
   - Check console for errors
   - Note which tests failed
   - Report specific functionality issues

3. **Share the Link:**
   ```
   http://localhost:3001/prototype
   ```
   (Only works when server is running)

---

## 📝 Troubleshooting

| Issue | Solution |
|-------|----------|
| Server won't start | Check if port 3001 is free: `netstat -ano \| findstr :3001` |
| Page blank | Refresh browser (Ctrl+R) or clear cache (Ctrl+Shift+Delete) |
| Artifacts don't show | Try clicking Generate again, check console for errors |
| Export not working | Check browser console for any errors |
| Dark mode not saving | Check if localStorage is enabled in browser |
| Mobile view distorted | Try different viewport sizes in DevTools |

---

**Status:** ✅ Prototype Ready for Testing  
**Last Updated:** 2026-08-07
