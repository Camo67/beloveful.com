#!/bin/bash

# Generate Album Data Script for Beloveful Photography Portfolio
# This script helps generate the TypeScript data structure for newly uploaded images

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}📝 Beloveful Album Data Generator${NC}"
echo "================================="

# Function to generate album data structure
generate_album_data() {
    local region="$1"
    local country="$2"
    local slug="$3"
    local prefix="$4"
    local image_count="$5"
    local start_number="${6:-1}"
    
    echo -e "${YELLOW}Generating data for:${NC}"
    echo "  Region: $region"
    echo "  Country: $country"
    echo "  Slug: $slug"
    echo "  Prefix: $prefix"
    echo "  Images: $image_count (starting from $start_number)"
    echo ""
    
    echo "// Add this to your ALBUMS array in src/lib/data.ts:"
    echo "{"
    echo "  region: \"$region\","
    echo "  country: \"$country\","
    echo "  slug: \"$slug\","
    echo "  images: ["
    
    for ((i=start_number; i<start_number+image_count; i++)); do
        # Format number with leading zeros
        num=$(printf "%03d" $i)
        public_id="${prefix}-${num}"
        
        echo -n "    { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v$(date +%s)/${public_id}.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v$(date +%s)/${public_id}.jpg' }"
        
        if [ $i -lt $((start_number+image_count-1)) ]; then
            echo ","
        else
            echo ""
        fi
    done
    
    echo "  ],"
    echo "},"
    echo ""
}

# Function to add images to existing country
add_to_existing_country() {
    local prefix="$1"
    local image_count="$2"
    local start_number="${3:-1}"
    
    echo -e "${YELLOW}Generating additional images for existing country:${NC}"
    echo "  Prefix: $prefix"
    echo "  Images: $image_count (starting from $start_number)"
    echo ""
    
    echo "// Add these image objects to an existing country's images array:"
    
    for ((i=start_number; i<start_number+image_count; i++)); do
        # Format number with leading zeros
        num=$(printf "%03d" $i)
        public_id="${prefix}-${num}"
        
        echo -n "{ desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v$(date +%s)/${public_id}.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v$(date +%s)/${public_id}.jpg' }"
        
        if [ $i -lt $((start_number+image_count-1)) ]; then
            echo ","
        else
            echo ""
        fi
    done
    
    echo ""
}

# Help function
show_help() {
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  new-country <region> <country> <slug> <prefix> <count> [start_num]"
    echo "    Generate data structure for a new country album"
    echo ""
    echo "  add-images <prefix> <count> [start_num]"
    echo "    Generate image entries to add to an existing country"
    echo ""
    echo "  help"
    echo "    Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 new-country \"Asia\" \"Japan\" \"japan\" \"JAP\" 15"
    echo "  $0 new-country \"Europe\" \"France\" \"france\" \"FRA\" 20 1"
    echo "  $0 add-images \"EGY\" 10 50"
    echo ""
    echo "Available regions:"
    echo "  Africa, Asia, Middle East, South America, North America, Europe, Oceania, Erasing Borders"
    echo ""
    echo "Common prefixes in use:"
    echo "  EGY - Egypt          CHI - China         HK - Hong Kong"
    echo "  ETH - Ethiopia       IND - India         JOR - Jordan"
    echo "  MYA - Myanmar        NAM - Namibia       PAL - Palestine"
    echo "  THAI - Thailand      VIET - Vietnam"
}

# Main script logic
case "$1" in
    "new-country")
        if [ $# -lt 6 ] || [ $# -gt 7 ]; then
            echo "❌ Error: Wrong number of arguments for 'new-country' command"
            echo "Usage: $0 new-country <region> <country> <slug> <prefix> <count> [start_num]"
            exit 1
        fi
        generate_album_data "$2" "$3" "$4" "$5" "$6" "${7:-1}"
        ;;
    "add-images")
        if [ $# -lt 3 ] || [ $# -gt 4 ]; then
            echo "❌ Error: Wrong number of arguments for 'add-images' command"
            echo "Usage: $0 add-images <prefix> <count> [start_num]"
            exit 1
        fi
        add_to_existing_country "$2" "$3" "${4:-1}"
        ;;
    "help" | "--help" | "-h" | "")
        show_help
        ;;
    *)
        echo "❌ Error: Unknown command '$1'"
        echo ""
        show_help
        exit 1
        ;;
esac