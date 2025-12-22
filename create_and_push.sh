#!/bin/bash

cd "/Users/fernandoantiqueira/Test Cursor"

echo "🔐 Checking GitHub authentication..."
if ! gh auth status &>/dev/null; then
    echo "⚠️  Not authenticated. Let's fix that..."
    echo "Please follow the prompts to authenticate with GitHub:"
    gh auth login
fi

echo ""
echo "📦 Creating GitHub repository..."
REPO_NAME="wireframe-instructions-app"

# Create the repository
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Repository created and code pushed!"
    echo "🌐 Your repository: https://github.com/$(gh api user --jq .login)/$REPO_NAME"
    echo ""
    echo "Next step: Deploy to Vercel"
    echo "1. Go to https://vercel.com"
    echo "2. Click 'Add New Project'"
    echo "3. Import your repository: $REPO_NAME"
    echo "4. Click 'Deploy'"
else
    echo ""
    echo "❌ Something went wrong. You may need to:"
    echo "1. Authenticate: gh auth login"
    echo "2. Or create the repo manually on GitHub.com"
fi




