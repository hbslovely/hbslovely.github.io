const fs = require('fs');
const path = require('path');
const https = require('https');
const wardsData = require('./hcm-city-guide/src/assets/i18n/wards/wards.en.json');

const IMAGES_DIR = './hcm-city-guide/src/assets/images/wards';

// Create images directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Base URLs for different ward images
const IMAGE_SOURCES = {
  'ben-thanh-ward': [
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    'https://images.unsplash.com/photo-1583417319073-04c68b3e4c9a'
  ],
  'da-kao-ward': [
    'https://images.unsplash.com/photo-1583417319075-7f9c8fc483b2'
  ],
  'tan-dinh-ward': [
    'https://images.unsplash.com/photo-1583417319078-9f9c8fc483b5'
  ],
  'nguyen-thai-binh-ward': [
    'https://images.unsplash.com/photo-1583417319080-9f9c8fc483b7'
  ],
  'pham-ngu-lao-ward': [
    'https://images.unsplash.com/photo-1583417319082-9f9c8fc483b9'
  ],
  'ben-nghe-ward': [
    'https://images.unsplash.com/photo-1583417319084-9f9c8fc483c1'
  ],
  'cau-ong-lanh-ward': [
    'https://images.unsplash.com/photo-1583417319086-9f9c8fc483c3'
  ],
  'co-giang-ward': [
    'https://images.unsplash.com/photo-1583417319088-9f9c8fc483c5'
  ],
  'nguyen-cu-trinh-ward': [
    'https://images.unsplash.com/photo-1583417319090-9f9c8fc483c7'
  ],
  'cau-kho-ward': [
    'https://images.unsplash.com/photo-1583417319092-9f9c8fc483c9'
  ]
};

// Download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(path.join(IMAGES_DIR, filename));
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(`Failed to download ${url}`);
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Process each ward
async function processWards() {
  for (const [wardKey, wardData] of Object.entries(wardsData)) {
    const wardId = wardData.id;
    if (!wardId) continue;

    // Default image name
    const defaultImageName = `${wardId}.jpg`;
    
    // Check if we have specific images for this ward
    if (IMAGE_SOURCES[wardId]) {
      for (let i = 0; i < IMAGE_SOURCES[wardId].length; i++) {
        const url = IMAGE_SOURCES[wardId][i];
        const filename = i === 0 ? defaultImageName : `${wardId}-${i+1}.jpg`;
        try {
          await downloadImage(url, filename);
          console.log(`Downloaded ${filename}`);
        } catch (err) {
          console.error(`Error downloading ${filename}:`, err);
          
          // If download fails, create a placeholder with ward name
          const canvas = createPlaceholderImage(wardData.name);
          const buffer = canvas.toBuffer('image/jpeg');
          fs.writeFileSync(path.join(IMAGES_DIR, filename), buffer);
          console.log(`Created placeholder for ${filename}`);
        }
      }
    } else {
      // Create a placeholder with ward name
      const canvas = createPlaceholderImage(wardData.name);
      const buffer = canvas.toBuffer('image/jpeg');
      fs.writeFileSync(path.join(IMAGES_DIR, defaultImageName), buffer);
      console.log(`Created placeholder for ${defaultImageName}`);
    }
  }
}

// Create a placeholder image with ward name
function createPlaceholderImage(wardName) {
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, 800, 600);

  // Add ward name
  ctx.fillStyle = '#333333';
  ctx.font = '32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(wardName, 400, 300);

  return canvas;
}

// Run the script
processWards().then(() => {
  console.log('Finished processing wards');
}).catch(err => {
  console.error('Error:', err);
}); 