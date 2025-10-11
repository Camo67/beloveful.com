#!/bin/bash

# Cloudinary Upload Script for Beloveful Photography Portfolio
# This script uploads images to your Cloudinary account using the CLI

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🌄 Beloveful Cloudinary Upload Script${NC}"
echo "======================================"

# Check if environment variables are set
if [[ -z "$CLOUDINARY_CLOUD_NAME" || -z "$CLOUDINARY_API_KEY" || -z "$CLOUDINARY_API_SECRET" ]]; then
    echo -e "${RED}❌ Error: Cloudinary credentials not set!${NC}"
    echo "Please set the following environment variables:"
    echo "  export CLOUDINARY_CLOUD_NAME='dvwdoezk1'"
    echo "  export CLOUDINARY_API_KEY='{{your_api_key}}'"
    echo "  export CLOUDINARY_API_SECRET='{{your_api_secret}}'"
    echo ""
    echo "You can add these to your ~/.bashrc or ~/.profile for persistence"
    exit 1
fi

# Function to upload a single image
upload_image() {
    local file_path="$1"
    local public_id="$2"
    
    echo -e "${YELLOW}📤 Uploading: $file_path${NC}"
    echo "   Public ID: $public_id"
    
    # Upload using the cloudinary CLI
    node ~/.nvm/versions/node/v22.20.0/lib/node_modules/cloudinary-cli/cloudinary.js upload "$file_path" \
        --cloud_name="$CLOUDINARY_CLOUD_NAME" \
        --api_key="$CLOUDINARY_API_KEY" \
        --api_secret="$CLOUDINARY_API_SECRET" \
        --public_id="$public_id" \
        --overwrite=true \
        --resource_type=image
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Successfully uploaded: $public_id${NC}"
        echo "   URL: https://res.cloudinary.com/$CLOUDINARY_CLOUD_NAME/image/upload/v$(date +%s)/${public_id}.jpg"
        echo ""
    else
        echo -e "${RED}❌ Failed to upload: $file_path${NC}"
        echo ""
    fi
}

# Function to upload all images from a directory
upload_directory() {
    local directory="$1"
    local country_prefix="$2"
    
    if [ ! -d "$directory" ]; then
        echo -e "${RED}❌ Directory not found: $directory${NC}"
        return 1
    fi
    
    echo -e "${GREEN}📁 Uploading images from: $directory${NC}"
    echo "   Using prefix: $country_prefix"
    echo ""
    
    counter=1
    for file in "$directory"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
        [ -f "$file" ] || continue
        
        # Generate public ID with country prefix and counter
        public_id="${country_prefix}-$(printf "%03d" $counter)"
        
        upload_image "$file" "$public_id"
        counter=$((counter + 1))
    done
}

# Help function
show_help() {
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  single <file_path> <public_id>     Upload a single image"
    echo "  directory <dir_path> <prefix>      Upload all images from directory"
    echo "  help                               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 single ./photo.jpg EGY-001"
    echo "  $0 directory ./new_egypt_photos EGY"
    echo ""
    echo "Country prefixes used in your site:"
    echo "  EGY - Egypt          CHI - China         HK - Hong Kong"
    echo "  ETH - Ethiopia       IND - India         JOR - Jordan"
    echo "  MYA - Myanmar        NAM - Namibia       PAL - Palestine"
    echo "  THAI - Thailand      VIET - Vietnam"
    echo ""
    echo "Environment variables required:"
    echo "  CLOUDINARY_CLOUD_NAME (should be: dvwdoezk1)"
    echo "  CLOUDINARY_API_KEY"
    echo "  CLOUDINARY_API_SECRET"
}

# Main script logic
case "$1" in
    "single")
        if [ $# -ne 3 ]; then
            echo -e "${RED}❌ Error: Wrong number of arguments for 'single' command${NC}"
            echo "Usage: $0 single <file_path> <public_id>"
            exit 1
        fi
        upload_image "$2" "$3"
        ;;
    "directory")
        if [ $# -ne 3 ]; then
            echo -e "${RED}❌ Error: Wrong number of arguments for 'directory' command${NC}"
            echo "Usage: $0 directory <dir_path> <prefix>"
            exit 1
        fi
        upload_directory "$2" "$3"
        ;;
    "help" | "--help" | "-h" | "")
        show_help
        ;;
    *)
        echo -e "${RED}❌ Error: Unknown command '$1'${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac