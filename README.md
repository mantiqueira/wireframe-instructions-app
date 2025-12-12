# Wireframe Instructions App

A React + TypeScript single-page application with a wireframe-style UI for managing AI instructions and client message templates.

## Features

- **Home Screen**: Four large cards, with "Settings / instructions" being the only interactive one
- **Instructions List**: Three groups (Estimates, Proposals, Other) with search, filtering, and instruction cards
- **New Instruction Form**: Two-panel layout with form on left and preview on right
- **Interactive Features**:
  - Search filtering
  - Enable/disable instructions
  - Delete instructions (with confirmation)
  - Undo/redo for text editing
  - Transcription simulation
  - AI optimization simulation
  - Example templates modal
  - Test instruction with loading state and color-coded preview

## Tech Stack

- React 18
- TypeScript
- React Router v6
- Vite
- CSS Modules

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  components/     # Reusable components
  pages/         # Page components
  context/       # React context for state management
  data/          # Seed data and templates
  types.ts       # TypeScript type definitions
```

