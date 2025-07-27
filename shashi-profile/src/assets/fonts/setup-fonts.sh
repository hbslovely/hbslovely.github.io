#!/bin/bash

# Create fonts directory if it doesn't exist
mkdir -p "$(dirname "$0")"

# Download Inter font files
curl -L "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.woff2" -o "Inter-Regular.ttf"
curl -L "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Bold.woff2" -o "Inter-Bold.ttf"
curl -L "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Medium.woff2" -o "Inter-Medium.ttf"

echo "Inter fonts have been downloaded successfully!" 