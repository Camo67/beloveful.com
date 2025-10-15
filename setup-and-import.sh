#!/bin/bash

# Beloveful Photography - Cloudinary Import Setup Script
# This script will help you set up the environment and import all images

echo "🌄 Beloveful Photography - Cloudinary Import"
echo "=============================================="

# Function to get secret from wrangler (if available)
get_secret() {
    local secret_name="$1"
    # Try to get secret from wrangler if logged in
    if command -v wrangler >/dev/null 2>&1; then
        # This won't work directly, but we can try
        echo "Found wrangler CLI"
    fi
    return 1
}

# Check if we can access secrets
echo "🔑 Checking for Cloudinary credentials..."

# Check if already set in environment
if [[ -n "$CLOUDINARY_API_KEY" && -n "$CLOUDINARY_API_SECRET" ]]; then
    echo "✅ Credentials found in environment"
    export CLOUDINARY_CLOUD_NAME="dvwdoezk1"
else
    echo "⚠️  Credentials not found in current environment"
    echo ""
    echo "To get your credentials:"
    echo "1. Go to https://cloudinary.com/console"
    echo "2. Copy your API Key and API Secret from the dashboard"
    echo "3. Run the following commands:"
    echo ""
    echo "   export CLOUDINARY_CLOUD_NAME='dvwdoezk1'"
    echo "   export CLOUDINARY_API_KEY='YOUR_API_KEY_HERE'"
    echo "   export CLOUDINARY_API_SECRET='YOUR_API_SECRET_HERE'"
    echo ""
    echo "Then re-run this script."
    
    # Try to get from wrangler secrets (advanced users)
    echo ""
    echo "🔧 Advanced: If you have wrangler access, you can also:"
    echo "   npx wrangler secret get CLOUDINARY_API_KEY"
    echo "   npx wrangler secret get CLOUDINARY_API_SECRET"
    
    exit 1
fi

echo ""
echo "🚀 Starting Cloudinary import with credentials..."
echo "Cloud Name: $CLOUDINARY_CLOUD_NAME"
echo "API Key: ${CLOUDINARY_API_KEY:0:8}***"
echo "API Secret: ${CLOUDINARY_API_SECRET:0:8}***"
echo ""

# Run the import script
node scripts/import-cloudinary.cjs

# Check if successful
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Import completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Check the updated src/lib/data.ts file"
    echo "2. Start your dev server: npm run dev"
    echo "3. View your site at http://localhost:8081"
    echo ""
else
    echo ""
    echo "❌ Import failed. Check the error messages above."
    echo ""
fi