#!/bin/bash

# Cleanup script for beloveful.com repository
echo "🧹 Cleaning up unwanted files..."

# Remove Node.js package tarballs
echo "Removing .tgz files..."
rm -f *.tgz

# Remove photography image files (should be on Cloudinary)
echo "Removing image files..."
rm -f *.jpg *.jpeg *.png

# Remove random directories that don't belong
echo "Removing random directories..."
rm -rf RubenVerborgh SuperchupuDev ai antfu antonk52 dcastil epoberezkin feross gpbl isaacs jonschlinkert ljharb nzakas rawify sindresorhus tannerlinsley

# Remove misc files that don't belong
echo "Removing misc files..."
rm -f url_list.txt getting-started-install.html custom-domain login acorn-*.tgz
rm -f "signupnew?IkfHTmyPVq92wBnn4lX%2FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
rm -f "signupnew?IkfHTmyPVq92wBnn4lX%2FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ\";\""

# Remove any remaining loose npm package files
echo "Removing remaining npm package files..."
find . -maxdepth 1 -name "*.tgz" -delete
find . -maxdepth 1 -name "*-arm64-*" -delete
find . -maxdepth 1 -name "*-darwin-*" -delete
find . -maxdepth 1 -name "*-linux-*" -delete
find . -maxdepth 1 -name "*-win32-*" -delete

echo "✅ Cleanup complete!"
echo ""
echo "Remaining untracked files:"
git status --porcelain | grep "^??" | wc -l