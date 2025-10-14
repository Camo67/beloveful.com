#!/bin/bash

# Enhanced script to upload all images to R2 bucket with better error handling
set -euo pipefail

BUCKET_NAME="beloveful"
SOURCE_DIR="public/Website beloveful.com"
LOG_FILE="upload_log_$(date +%Y%m%d_%H%M%S).txt"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting upload of all image folders to R2 bucket: $BUCKET_NAME${NC}"
echo -e "${BLUE}📁 Source directory: $SOURCE_DIR${NC}"
echo -e "${BLUE}📄 Log file: $LOG_FILE${NC}"
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}❌ Error: Source directory '$SOURCE_DIR' not found!${NC}"
    exit 1
fi

# Initialize log file
echo "Upload log started at $(date)" > "$LOG_FILE"
echo "Source: $SOURCE_DIR" >> "$LOG_FILE"
echo "Bucket: $BUCKET_NAME" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Function to upload a single file
upload_file() {
    local file_path="$1"
    local relative_path="$2"
    local r2_key="images/$relative_path"
    local object_path="$BUCKET_NAME/$r2_key"
    
    echo -e "${YELLOW}⬆️  Uploading: $relative_path${NC}"
    
    # Determine content type based on file extension
    local content_type="image/jpeg"
    case "${file_path##*.}" in
        png|PNG) content_type="image/png" ;;
        gif|GIF) content_type="image/gif" ;;
        webp|WEBP) content_type="image/webp" ;;
        jpg|JPG|jpeg|JPEG) content_type="image/jpeg" ;;
    esac
    
    if wrangler r2 object put "$object_path" --file "$file_path" --content-type "$content_type" --remote &>/dev/null; then
        echo -e "${GREEN}✅ Uploaded: $r2_key${NC}"
        echo "SUCCESS: $r2_key" >> "$LOG_FILE"
        return 0
    else
        echo -e "${RED}❌ Failed to upload: $r2_key${NC}"
        echo "FAILED: $r2_key" >> "$LOG_FILE"
        return 1
    fi
}

# Counter for tracking progress - using temp files to avoid subshell issues
TEMP_DIR=$(mktemp -d)
echo "0" > "$TEMP_DIR/uploaded"
echo "0" > "$TEMP_DIR/failed"
echo "0" > "$TEMP_DIR/current"

# Find all image files and count them
echo -e "${BLUE}📊 Counting files...${NC}"
total_files=$(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | wc -l)
echo -e "${BLUE}📈 Found $total_files image files to upload${NC}"
echo "Total files found: $total_files" >> "$LOG_FILE"
echo ""

# Create file list
file_list=($(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \)))

# Upload all image files
for file in "${file_list[@]}"; do
    # Get relative path from source directory
    relative_path="${file#$SOURCE_DIR/}"
    
    # Read current counters
    uploaded_files=$(cat "$TEMP_DIR/uploaded")
    failed_files=$(cat "$TEMP_DIR/failed")
    
    if upload_file "$file" "$relative_path"; then
        echo $((uploaded_files + 1)) > "$TEMP_DIR/uploaded"
        uploaded_files=$((uploaded_files + 1))
    else
        echo $((failed_files + 1)) > "$TEMP_DIR/failed"
        failed_files=$((failed_files + 1))
    fi
    
    current_batch=$((uploaded_files + failed_files))
    echo "$current_batch" > "$TEMP_DIR/current"
    
    # Progress indicator every 25 files
    if [ $((current_batch % 25)) -eq 0 ]; then
        progress_percent=$((current_batch * 100 / total_files))
        echo ""
        echo -e "${BLUE}📊 Progress: $current_batch/$total_files files processed (${progress_percent}%)${NC}"
        echo -e "${GREEN}  ✅ Successful: $uploaded_files${NC}"
        echo -e "${RED}  ❌ Failed: $failed_files${NC}"
        echo ""
        
        # Add progress to log file
        echo "Progress: $current_batch/$total_files (${progress_percent}%) - Success: $uploaded_files, Failed: $failed_files" >> "$LOG_FILE"
    fi
    
    # Small delay every 10 files to prevent overwhelming the API
    if [ $((current_batch % 10)) -eq 0 ]; then
        sleep 0.5
    fi
    
done

# Read final counters
uploaded_files=$(cat "$TEMP_DIR/uploaded")
failed_files=$(cat "$TEMP_DIR/failed")

# Cleanup temp directory
rm -rf "$TEMP_DIR"

echo ""
echo -e "${BLUE}🎉 Upload process completed!${NC}"
echo -e "${GREEN}✅ Successfully uploaded: $uploaded_files files${NC}"
echo -e "${RED}❌ Failed uploads: $failed_files files${NC}"
echo -e "${BLUE}📊 Total processed: $((uploaded_files + failed_files))/$total_files files${NC}"

# Final summary to log file
echo "" >> "$LOG_FILE"
echo "Upload completed at $(date)" >> "$LOG_FILE"
echo "Total files: $total_files" >> "$LOG_FILE"
echo "Successfully uploaded: $uploaded_files" >> "$LOG_FILE"
echo "Failed uploads: $failed_files" >> "$LOG_FILE"

if [ $total_files -gt 0 ]; then
    success_rate=$(( uploaded_files * 100 / total_files ))
    echo "Success rate: ${success_rate}%" >> "$LOG_FILE"
fi

if [ $failed_files -eq 0 ]; then
    echo -e "${GREEN}🎊 All files uploaded successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  Some files failed to upload. Check $LOG_FILE for details.${NC}"
fi

echo -e "${BLUE}📄 Full log available in: $LOG_FILE${NC}"