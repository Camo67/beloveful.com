#!/usr/bin/bash

# Load environment variables
source .env.local

DESKTOP_DIR="public/Website beloveful.com/Homepage/Desktop Landscape"
MOBILE_DIR="public/Website beloveful.com/Homepage/Mobile Portrait"

# Upload function using curl
upload_file() {
    local file_path="$1"
    local folder="$2"
    local filename=$(basename "$file_path")
    local public_id="${filename%.*}"  # Remove extension
    
    echo "Uploading $filename..."
    
    response=$(curl -s -X POST \
        "https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/image/upload" \
        -F "file=@$file_path" \
        -F "public_id=$public_id" \
        -F "folder=beloveful-website/Homepage/$folder" \
        -F "overwrite=true" \
        -F "api_key=$CLOUDINARY_API_KEY" \
        -F "timestamp=$(date +%s)" \
        -F "signature=$(echo -n "folder=beloveful-website/Homepage/$folder&overwrite=true&public_id=$public_id&timestamp=$(date +%s)$CLOUDINARY_API_SECRET" | openssl dgst -sha1 | sed 's/^.* //')")
    
    url=$(echo "$response" | jq -r '.secure_url // .url // "ERROR"')
    
    if [[ "$url" == "ERROR" || "$url" == "null" ]]; then
        echo "✗ $filename - Upload failed"
        echo "$response" | jq '.'
        return 1
    else
        echo "✓ $filename -> $url"
        return 0
    fi
}

echo "Uploading Homepage Slideshow Images..."
echo ""
echo "--- Desktop Landscape ---"

# Upload desktop images
for file in "$DESKTOP_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [[ -f "$file" ]] && upload_file "$file" "Desktop"
done

echo ""
echo "--- Mobile Portrait ---"

# Upload mobile images
for file in "$MOBILE_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [[ -f "$file" ]] && upload_file "$file" "Mobile"
done

echo ""
echo "=================================================="
echo "Upload complete!"
echo "=================================================="
