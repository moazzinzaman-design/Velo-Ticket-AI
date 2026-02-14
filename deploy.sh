#!/bin/bash

# Velo Ticket Sales Deployment Script

echo "🚀 Starting Velo Deployment..."

# 1. Build the project locally to catch errors
echo "🏗️ Building project..."
npx turbo run build --filter=web

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please fix errors before deploying."
  exit 1
fi

# 2. Update Lockfile and Commit
echo "📦 Updating dependencies..."
# Remove lockfile to force regeneration if corrupt
rm -f package-lock.json
npm install
git add .
git commit -m "chore: update lockfile for deployment"

# 3. Deploy to Vercel
echo "cloud ☁️ Deploying to Vercel..."
echo "You may be asked to log in or link the project."

# Check if vercel CLI involves user interaction
# Deploy from root so Vercel sees the monorepo structure
npx vercel --prod --cwd .

echo "✅ Deployment command executed."
