#!/bin/bash

# Cloudinary credentials
CLOUD_NAME="dvwdoezk1"
API_KEY="677574118368433"
API_SECRET="e82ozhF6xSU28rT-PI1oa-qsLZ"

# Counter for progress
count=0
total=$(find public/ -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | wc -l)

echo "Found $total images to upload to Cloudinary"
echo "Starting upload..."
echo ""

# Find and upload all images
find public/ -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | while read file; do
    count=$((count + 1))
    
    # Get relative path and create folder structure
    relative_path="${file#public/}"
    folder_path=$(dirname "$relative_path")
    
    echo "[$count/$total] Uploading: $relative_path"
    
    # Upload to Cloudinary with folder structure
    response=$(curl -s -X POST "https://api.cloudinary.com/v1_1/$CLOUD_NAME/image/upload" \
      -F "file=@$file" \
      -F "api_key=$API_KEY" \
      -F "timestamp=$(date +%s)" \
      -F "folder=beloveful/$folder_path")
    
    # Check if upload was successful
    if echo "$response" | grep -q "secure_url"; then
        url=$(echo "$response" | grep -o '"secure_url":"[^"]*' | cut -d'"' -f4)
        echo "   ✓ Success: $url"
    else
        echo "   ✗ Failed: $file"
        echo "   Error: $response"
    fi
    echo ""
done

echo "Upload complete!"
