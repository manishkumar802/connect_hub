#!/bin/bash
# Deployment script for EC2 instance
# Run this script on your EC2 instance after uploading code

echo "🚀 Starting Instagram Clone Backend Deployment..."

# Navigate to backend directory
cd ~/backend || exit

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Create logs directory
mkdir -p logs

# Start application with PM2
echo "🔄 Starting application with PM2..."
pm2 delete instagram-backend 2>/dev/null || true
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 startup script
echo "⚙️ Setting up PM2 startup..."
pm2 startup | tail -n 1 | bash

# Show status
echo "✅ Deployment complete!"
echo ""
pm2 status
echo ""
echo "📊 View logs: pm2 logs instagram-backend"
echo "🔄 Restart: pm2 restart instagram-backend"
echo "🛑 Stop: pm2 stop instagram-backend"
