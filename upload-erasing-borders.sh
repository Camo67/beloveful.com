#!/bin/bash

# Upload script for Erasing Borders images to Cloudflare R2
# This uploads images to the R2 bucket following the project structure

SOURCE_DIR="/home/camo/new/beloveful.com/public/Website beloveful.com/Erasing Borders"
R2_BUCKET="pub-6ca7f958f39144099d9effd483242d2d"
R2_PATH="Website beloveful.com/Erasing Borders"

echo "Uploading Erasing Borders images to R2..."

# Function to upload with retry logic for 503 errors
upload_with_retry() {
    local file_path="$1"
    local remote_path="$2"
    local max_retries=3
    local retry_count=0
    
    while [ $retry_count -lt $max_retries ]; do
        echo "Uploading $(basename "$file_path")... (attempt $((retry_count + 1)))"
        
        if wrangler r2 object put "$R2_BUCKET/$remote_path" --file "$file_path" --content-type "image/jpeg"; then
            echo "Successfully uploaded: $(basename "$file_path")"
            return 0
        else
            echo "Upload failed for $(basename "$file_path"), retrying..."
            retry_count=$((retry_count + 1))
            sleep 2
        fi
    done
    
    echo "Failed to upload $(basename "$file_path") after $max_retries attempts"
    return 1
}

# Upload all JPG files
find "$SOURCE_DIR" -name "*.jpg" -type f | while read -r file; do
    filename=$(basename "$file")
    remote_path="$R2_PATH/$filename"
    
    upload_with_retry "$file" "$remote_path"
done

echo "Upload process completed!"