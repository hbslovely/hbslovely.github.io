const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToCompress = [
    'ky-niem-web/src/assets/images/places/checkin-ba-chua-xu-nui-sam.png',
    'ky-niem-web/src/assets/images/places/checkin-cau-hien-luong-quang-tri.png',
    'ky-niem-web/src/assets/images/places/checkin-thanh-co-quang-tri.jpg',
    'ky-niem-web/src/assets/images/phat/phat-quyen-ben-nhau.png',
    'ky-niem-web/src/assets/images/places/checkin-dinh-thay-thim.png',
    'ky-niem-web/src/assets/images/phat/img.png',
    'ky-niem-web/src/assets/images/places/checkin-cho-dong-xuan-da-lat.png',
    'ky-niem-web/src/assets/images/places/checkin-chua-thien-mu.jpg',
    'ky-niem-web/src/assets/images/places/checkin-canh-dong-thang-long-binh-thuan.png',
    'ky-niem-web/src/assets/images/phat/img_1.png'
];

async function compressImage(inputPath) {
    const ext = path.extname(inputPath);
    const dir = path.dirname(inputPath);
    const base = path.basename(inputPath, ext);
    const outputPath = path.join(dir, `${base}-compressed${ext}`);

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Determine compression options based on file type
        if (ext.toLowerCase() === '.jpg' || ext.toLowerCase() === '.jpeg') {
            await image
                .jpeg({ quality: 80, mozjpeg: true })
                .resize(Math.min(metadata.width, 2000)) // Max width 2000px while maintaining aspect ratio
                .toFile(outputPath);
        } else if (ext.toLowerCase() === '.png') {
            await image
                .png({ quality: 80, compressionLevel: 9 })
                .resize(Math.min(metadata.width, 2000)) // Max width 2000px while maintaining aspect ratio
                .toFile(outputPath);
        }

        // Get file sizes for comparison
        const originalSize = fs.statSync(inputPath).size;
        const compressedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

        console.log(`Compressed ${inputPath}:`);
        console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Saved: ${savings}%\n`);

        // If compression was successful and saved significant space, replace original
        if (compressedSize < originalSize && (originalSize - compressedSize) / originalSize > 0.1) {
            fs.unlinkSync(inputPath); // Delete original
            fs.renameSync(outputPath, inputPath); // Rename compressed to original
            console.log(`Replaced original file with compressed version\n`);
        } else {
            fs.unlinkSync(outputPath); // Delete compressed version if not better
            console.log(`Kept original file as compression didn't yield significant improvement\n`);
        }
    } catch (error) {
        console.error(`Error processing ${inputPath}:`, error);
    }
}

async function processImages() {
    for (const imagePath of imagesToCompress) {
        if (fs.existsSync(imagePath)) {
            console.log(`Processing ${imagePath}...`);
            await compressImage(imagePath);
        } else {
            console.log(`File not found: ${imagePath}`);
        }
    }
}

processImages().catch(console.error); 