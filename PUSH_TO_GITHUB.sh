#!/bin/bash
# Script to push code to GitHub
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values

echo "🚀 Ready to push to GitHub!"
echo ""
echo "Before running this script:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository (don't initialize with README)"
echo "3. Copy the repository URL"
echo ""
read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo ""
echo "📦 Adding remote and pushing code..."
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Your code is now on GitHub."
echo "Next step: Go to https://vercel.com and import this repository!"


