# Deployment Guide

## Deploy to Vercel (Recommended - Easiest)

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

Follow the prompts. Your app will be live in seconds!

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository (see GitHub steps below)
4. Vercel will auto-detect Vite settings
5. Click "Deploy"

## Deploy to GitHub

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it (e.g., "wireframe-instructions-app")
3. Don't initialize with README (we already have one)

### Step 2: Push to GitHub

Run these commands (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy from GitHub to Vercel

1. After pushing to GitHub, go to Vercel
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect everything
5. Click "Deploy"

## Build Configuration

The project is already configured for Vercel with `vercel.json`. Vercel will:
- Auto-detect Vite
- Run `npm run build`
- Serve from `dist` folder
- Handle routing automatically

## Environment Variables

No environment variables needed for this project.

## Post-Deployment

After deployment, your app will be available at:
- `https://your-project-name.vercel.app`

You can also add a custom domain in Vercel settings.


