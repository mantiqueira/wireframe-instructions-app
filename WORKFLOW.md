# Development Workflow

## Daily Development Process

### 1. Make Changes Locally
```bash
# Start dev server
npm run dev

# Make your changes in the code
# Test in browser at http://localhost:5173
```

### 2. Commit Changes
```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Add feature: description of what you did"

# Push to GitHub
git push
```

### 3. Vercel Auto-Deploys
- Vercel automatically detects the push to GitHub
- Builds and deploys your changes
- Usually takes 1-2 minutes
- You'll get a notification when done

## Quick Commands

```bash
# Check what changed
git status

# See commit history
git log --oneline

# Pull latest from GitHub (if working on multiple machines)
git pull

# Create a new branch for a feature
git checkout -b feature-name
git push -u origin feature-name
```

## Best Practices

✅ **DO:**
- Commit often with clear messages
- Test locally before pushing
- Push to GitHub regularly
- Use branches for major features

❌ **DON'T:**
- Develop directly on GitHub (slower, harder to test)
- Commit without testing
- Push broken code to main branch

## Vercel Deployment

Vercel is already connected to your GitHub repo and will:
- Auto-deploy every push to `main` branch
- Show preview deployments for pull requests
- Give you a live URL instantly

No manual deployment needed! 🎉
