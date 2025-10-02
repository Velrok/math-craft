# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathCraft is an HTML5 Progressive Web App (PWA) built with:
- Pure HTML5/CSS/JavaScript (no compilation step)
- p5.js for graphics and interactive math visualizations
- TypeScript for type safety
- PWA capabilities for offline usage

## Development Environment

Since this is a no-compilation project, development is straightforward:
- Run `./scripts/serve` to start development server with auto-reload on http://localhost:8080
- Alternatively, serve files locally using any static server (e.g., `python -m http.server` or `npx serve`)
- Open in browser for testing
- No build process required

## Project Structure

This project follows a simple file structure appropriate for a client-side only application:
- Static HTML/CSS/JS files served directly
- TypeScript files should be compiled to JavaScript for browser consumption
- p5.js sketches likely organized by mathematical concept or visualization type

## Key Technologies

### p5.js Integration
- Mathematical visualizations and interactive graphics
- Canvas-based rendering for mathematical concepts
- Event handling for user interactions with math problems/visualizations
- Reference documentation: https://p5js.org/reference/

### PWA Features
- Service worker for offline functionality
- Web app manifest for installability
- Local storage for saving progress/settings

### TypeScript Usage
- Type safety for mathematical calculations and data structures
- Interface definitions for math problems, user progress, etc.
- Compile to JavaScript for browser execution

## Development Workflow

1. Edit TypeScript files as needed
2. Compile TypeScript to JavaScript (if using tsc)
3. Test in browser using local server
4. Verify PWA functionality works offline
5. Test mathematical calculations and visualizations thoroughly

## Mathematical Focus Areas

Based on the project name "MathCraft", expect to work with:
- Interactive mathematical visualizations
- Educational math content and problems
- Geometric and algebraic representations
- User progress tracking for learning