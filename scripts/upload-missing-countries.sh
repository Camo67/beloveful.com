#!/bin/bash

# Upload Missing Countries to Cloudinary
# This script uploads images for South Africa, Portugal, New York, and Cuba

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🌄 Uploading Missing Countries to Cloudinary${NC}"
echo "=============================================="
echo ""

# Check if Cloudinary credentials are set
if [[ -z "$CLOUDINARY_CLOUD_NAME" || -z "$CLOUDINARY_API_KEY" || -z "$CLOUDINARY_API_SECRET" ]]; then
    echo -e "${RED}❌ Error: Cloudinary credentials not set!${NC}"
    echo ""
    echo "Please set the following environment variables:"
    echo "  export CLOUDINARY_CLOUD_NAME='dvwdoezk1'"
    echo "  export CLOUDINARY_API_KEY='your_api_key'"
    echo "  export CLOUDINARY_API_SECRET='your_api_secret'"
    echo ""
    echo "You can add these to your ~/.bashrc or ~/.zshrc for persistence"
    echo ""
    echo -e "${YELLOW}Or run:${NC}"
    echo "  source .env.local  # if credentials are in .env.local"
    exit 1
fi

echo -e "${GREEN}✅ Cloudinary credentials found${NC}"
echo "   Cloud Name: $CLOUDINARY_CLOUD_NAME"
echo ""

# Base directory
BASE_DIR="public/Website beloveful.com"

# Missing countries configuration
declare -A COUNTRIES=(
    ["South Africa"]="Africa/South Africa"
    ["Portugal"]="Europe & Scandinavia/Portugal"
    ["New York"]="North America/New York"
    ["Cuba"]="Central America & Caribbean/Cuba"
)

declare -A PREFIXES=(
    ["South Africa"]="ZAF"
    ["Portugal"]="POR"
    ["New York"]="NYC"
    ["Cuba"]="CUB"
)

# Counter for total uploads
TOTAL_UPLOADED=0
TOTAL_FAILED=0

# Function to upload images from a directory
upload_country() {
    local country_name="$1"
    local folder_path="$2"
    local prefix="$3"
    
    local full_path="$BASE_DIR/$folder_path"
    
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}📍 Uploading: $country_name${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "   Folder: $folder_path"
    echo "   Prefix: $prefix"
    echo ""
    
    if [ ! -d "$full_path" ]; then
        echo -e "${RED}❌ Directory not found: $full_path${NC}"
        return 1
    fi
    
    local counter=0
    local failed=0
    
    # Find all image files
    while IFS= read -r -d '' file; do
        local filename=$(basename "$file")
        local public_id="Website beloveful.com/$folder_path/$filename"
        
        echo -e "${YELLOW}📤 Uploading: $filename${NC}"
        
        # Upload using curl (cloudinary REST API)
        response=$(curl -s -X POST "https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/image/upload" \
            -F "file=@$file" \
            -F "public_id=$public_id" \
            -F "api_key=$CLOUDINARY_API_KEY" \
            -F "api_secret=$CLOUDINARY_API_SECRET" \
            -F "overwrite=true" \
            -F "resource_type=image")
        
        # Check if upload was successful
        if echo "$response" | grep -q '"secure_url"'; then
            echo -e "${GREEN}✅ Success${NC}"
            ((counter++))
        else
            echo -e "${RED}❌ Failed${NC}"
            echo "   Response: $response"
            ((failed++))
        fi
        
    done < <(find "$full_path" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)
    
    echo ""
    echo -e "${GREEN}✅ Uploaded $counter images from $country_name${NC}"
    if [ $failed -gt 0 ]; then
        echo -e "${RED}❌ Failed: $failed images${NC}"
    fi
    
    TOTAL_UPLOADED=$((TOTAL_UPLOADED + counter))
    TOTAL_FAILED=$((TOTAL_FAILED + failed))
}

# Upload all missing countries
for country in "${!COUNTRIES[@]}"; do
    upload_country "$country" "${COUNTRIES[$country]}" "${PREFIXES[$country]}"
done

# Summary
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}📊 Upload Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "   Total Uploaded: $TOTAL_UPLOADED images"
if [ $TOTAL_FAILED -gt 0 ]; then
    echo -e "   ${RED}Total Failed: $TOTAL_FAILED images${NC}"
fi
echo ""

if [ $TOTAL_UPLOADED -gt 0 ]; then
    echo -e "${GREEN}🎉 Upload completed!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run the import script to update portfolio data:"
    echo "     ${YELLOW}node scripts/import-cloudinary.cjs${NC}"
    echo ""
    echo "  2. Verify the new countries appear in the portfolio:"
    echo "     ${YELLOW}npm run dev${NC}"
else
    echo -e "${RED}❌ No images were uploaded${NC}"
fi
