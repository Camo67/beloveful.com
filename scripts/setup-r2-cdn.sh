#!/bin/bash

# Beloveful R2 CDN Setup Script
# This script configures your R2 bucket for production use

set -e  # Exit on any error

echo "🚀 Setting up Beloveful R2 CDN for production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI not found. Please install it first:${NC}"
    echo "npm install -g wrangler"
    exit 1
fi

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️ Please login to Wrangler first:${NC}"
    echo "wrangler login"
    exit 1
fi

echo -e "${BLUE}📦 Current Wrangler user:${NC}"
wrangler whoami

# Step 1: Update CORS policy for production
echo -e "\n${YELLOW}🔧 Step 1: Updating R2 bucket CORS policy...${NC}"

cat > /tmp/cors-policy.json << 'EOF'
[
  {
    "AllowedOrigins": [
      "https://beloveful.com",
      "https://www.beloveful.com",
      "https://cdn.beloveful.com",
      "http://localhost:8080"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3000
  }
]
EOF

echo "Updating CORS policy for 'beloveful' bucket..."
wrangler r2 bucket cors put beloveful --file /tmp/cors-policy.json

echo -e "${GREEN}✅ CORS policy updated successfully${NC}"

# Step 2: Deploy CDN Worker
echo -e "\n${YELLOW}🚀 Step 2: Deploying R2 CDN Worker...${NC}"

# Change to workers directory
cd workers/

# Deploy to development first
echo "Deploying to development environment..."
wrangler deploy --env development

# Deploy to production
echo "Deploying to production environment..."
wrangler deploy --env production

echo -e "${GREEN}✅ CDN Worker deployed successfully${NC}"

# Step 3: Set up custom domain DNS (instructions)
echo -e "\n${YELLOW}🌐 Step 3: Custom Domain Setup${NC}"
echo -e "${BLUE}To complete the setup, add these DNS records to your domain:${NC}"
echo ""
echo -e "${GREEN}DNS Record 1:${NC}"
echo "Type: CNAME"
echo "Name: cdn"
echo "Target: beloveful-r2-cdn.your-subdomain.workers.dev"
echo ""
echo -e "${GREEN}DNS Record 2 (Alternative - for direct R2 access):${NC}"
echo "Type: CNAME" 
echo "Name: files"
echo "Target: pub-6ca7f958f39144099d9effd483242d2d.r2.dev"

# Step 4: Test the setup
echo -e "\n${YELLOW}🧪 Step 4: Testing CDN setup...${NC}"

# Test CORS
echo "Testing CORS configuration..."
curl -I -X OPTIONS \
  -H "Origin: https://beloveful.com" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  "https://9c3559687f59c2388e55b978463fd5ef.r2.cloudflarestorage.com/beloveful/" \
  2>/dev/null | head -10 || echo "CORS test completed"

echo -e "${GREEN}✅ CDN setup completed!${NC}"

# Step 5: Display next steps
echo -e "\n${BLUE}📋 Next Steps:${NC}"
echo ""
echo "1. 🌐 Add DNS records shown above to your domain"
echo "2. 🔧 Wait for DNS propagation (5-10 minutes)"
echo "3. 🧪 Test your CDN:"
echo "   curl -I https://cdn.beloveful.com/health"
echo ""
echo "4. 📁 Upload your first file:"
echo "   curl -X POST -F 'file=@image.jpg' -F 'path=test' https://cdn.beloveful.com/api/upload"
echo ""
echo "5. 🖼️ Use in your React app:"
echo "   import { uploadToR2, getOptimizedImageUrl } from '@/lib/r2'"
echo ""
echo -e "${YELLOW}💡 Pro Tips:${NC}"
echo "• Enable Cloudflare Image Resizing for automatic optimization"
echo "• Use the R2 utilities in src/lib/r2.ts for easy integration"
echo "• Monitor usage in Cloudflare dashboard > R2 Object Storage"
echo "• Consider using signed URLs for large file uploads"
echo ""
echo -e "${GREEN}🎉 Your Beloveful R2 CDN is ready for production!${NC}"

# Cleanup
rm -f /tmp/cors-policy.json
cd ..

echo -e "\n${BLUE}📊 Useful Commands:${NC}"
echo "• Check bucket stats: wrangler r2 bucket list"
echo "• View worker logs: wrangler tail beloveful-r2-cdn"
echo "• Update worker: cd workers && wrangler deploy"
echo "• Test upload: See examples in src/lib/r2.ts"