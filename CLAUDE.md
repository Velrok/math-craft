# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathCraft is a primary school times tables practice game built as an HTML5 Progressive Web App (PWA):
- Pure HTML5/CSS/JavaScript (no compilation step)
- p5.js for graphics and interactive visualizations
- PWA manifest configured for offline usage (service worker not yet implemented)

## Development Commands

Start development server with auto-reload:
```bash
./scripts/serve
```

This runs `live-server` on http://localhost:8080, auto-installs if not present.

## Project Architecture

### File Structure
```
public/                    # All source files live here (served directly)
├── index.html            # Main HTML entry point
├── app.css               # Global styles
├── manifest.json         # PWA manifest with icons and metadata
└── js/
    └── main.js           # p5.js sketch (setup/draw functions)
```

### p5.js Architecture
- Uses global mode with p5.js loaded from CDN (v2.0.5)
- Canvas inserted into `#sketch-container` div
- `setup()` creates 800x600 canvas
- `draw()` runs continuously for animations/interactions
- p5.js reference: https://p5js.org/reference/

### PWA Configuration
- Service worker registration code exists in index.html but `sw.js` not yet created
- Manifest configured for portrait-primary orientation, theme color #2196F3
- Icons defined for multiple sizes (72x72 through 512x512)

## Development Notes

- All files are static; edit and refresh browser to see changes
- No build step, no TypeScript compilation (currently plain JavaScript)
- When adding new JS files, reference them in index.html
- For times tables game logic, implement in main.js or create separate modules