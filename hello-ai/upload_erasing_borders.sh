#!/bin/bash
PHOTOS_DIR="/home/camo/new/beloveful.com/public/Website beloveful.com/Erasing Borders/"
BUCKET="beloveful-images"
COLLECTION="erasing-borders"

cd "$PHOTOS_DIR"
for photo in *.jpg; do
  echo "Uploading $photo..."
  wrangler r2 object put "$BUCKET/$COLLECTION/$photo" --file="$photo"
done
echo "Upload complete!"
