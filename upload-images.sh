#!/bin/bash

# Script to upload all images to R2 bucket
set -e

BUCKET_NAME="beloveful"
SOURCE_DIR="public/Website beloveful.com"

echo "🚀 Starting upload of all image folders to R2 bucket: $BUCKET_NAME"
echo "📁 Source directory: $SOURCE_DIR"
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory '$SOURCE_DIR' not found!"
    exit 1
fi

# Function to upload a single file
upload_file() {
    local file_path="$1"
    local relative_path="$2"
    local r2_key="images/$relative_path"
    
    echo "⬆️  Uploading: $relative_path"
    
    if wrangler r2 object put "$BUCKET_NAME/$r2_key" --file "$file_path" --content-type "image/jpeg" --remote; then
        echo "✅ Uploaded: $r2_key"
    else
        echo "❌ Failed to upload: $r2_key"
        return 1
    fi
}

# Counter for tracking progress
total_files=0
uploaded_files=0
failed_files=0

# Find all image files and count them
echo "📊 Counting files..."
total_files=$(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | wc -l)
echo "📈 Found $total_files image files to upload"
echo ""

# Upload all image files
find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | while read -r file; do
    # Get relative path from source directory
    relative_path="${file#$SOURCE_DIR/}"
    
    if upload_file "$file" "$relative_path"; then
        ((uploaded_files++))
    else
        ((failed_files++))
    fi
    
    # Progress indicator
    current=$((uploaded_files + failed_files))
    if [ $((current % 10)) -eq 0 ]; then
        echo "📊 Progress: $current/$total_files files processed"
    fi
done

echo ""
echo "🎉 Upload process completed!"
echo "✅ Successfully uploaded: $uploaded_files files"
echo "❌ Failed uploads: $failed_files files"
echo "📊 Total processed: $((uploaded_files + failed_files))/$total_files files"