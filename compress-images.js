const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToCompress = [
    // Newly added large images
    'ky-niem-web/src/assets/images/places/checkin_nui-ba-den-tay-ninh.png',         // 3.4MB
    'ky-niem-web/src/assets/images/places/checkin-cot-co-ca-mau.png',               // 3.6MB
    'ky-niem-web/src/assets/images/gallery/ben-nhau.png',                           // 3.5MB
    'ky-niem-web/src/assets/images/gallery/check-in-cung-duong-moi.png',            // 6.0MB
    'ky-niem-web/src/assets/images/gallery/phuot-khap-noi.png',                     // 10MB
    'ky-niem-web/src/assets/images/gallery/vuot-qua-bao-giong.png',                 // 7.8MB
    'ky-niem-web/src/assets/images/gallery/nam-tay-yeu-thuong.png',                 // 12MB
    'ky-niem-web/src/assets/images/ki-niem/lan-dau-gap-nhau.png',                   // 5.8MB
    'ky-niem-web/src/assets/images/ki-niem/dam-cuoi-nha-hang.png',                  // 3.9MB
    'ky-niem-web/src/assets/images/hinh-cuoi/dam-cuoi-hcm-03-2022.png',            // 3.2MB
    'ky-niem-web/src/assets/images/albums/ngay-cuoi_3-2022/9.png',                  // 3.4MB
    'ky-niem-web/src/assets/images/albums/ngay-cuoi_3-2022/5.png',                  // 3.5MB

    // Images from ky-niem-web
    'ky-niem-web/src/assets/images/anh-chu-dao/avatar-couple.png',                    // 5.5MB
    'ky-niem-web/src/assets/images/anh-chu-dao/avatar-couple-back.png',               // 11MB
    'ky-niem-web/src/assets/images/mon-qua/mon-qua-thu-3-la-thu-tay-dau-tien-vo-gui-chong.png', // 6.6MB
    'ky-niem-web/src/assets/images/mon-qua/mon-qua-thu-4-chuyen-du-lich-bac-nam.png', // 9.4MB
    'ky-niem-web/src/assets/images/mon-qua/mon-qua-thu-2-nhan-doi.png',               // 5.4MB
    'ky-niem-web/src/assets/images/mon-qua/mon-qua-dau-tien-4-buc-tuong-chu-tieu.png', // 7.5MB
    'ky-niem-web/src/assets/images/places/checkin-mui-dien-phu-yen.png',              // 5.0MB
    'ky-niem-web/src/assets/images/gallery/su-an-ui.png',                             // 6.6MB
    'ky-niem-web/src/assets/images/gallery/nuoc-mat-hanh-phuc.png',                   // 6.3MB
    'ky-niem-web/src/assets/images/gallery/chuyen-di-dau-tien.png',                   // 6.6MB
    'ky-niem-web/src/assets/images/gallery/ngay-dau-ben-nhau.png',                    // 5.1MB
    'ky-niem-web/src/assets/images/gallery/nu-cuoi.png',                              // 8.6MB
    'ky-niem-web/src/assets/images/gallery/su-ben-nhau-moi-luc.png',                  // 7.5MB
    'ky-niem-web/src/assets/images/ki-niem/trao-duyen.png',                          // 5.7MB
    'ky-niem-web/src/assets/images/ki-niem/gap-mat-gia-dinh.png',                    // 5.3MB
    'ky-niem-web/src/assets/images/ki-niem/sau-rieng-vo-gui-tu-dak-lak_8-2021.png',  // 7.9MB
    'ky-niem-web/src/assets/images/foods/nem-nuong.png',                              // 7.6MB
    'ky-niem-web/src/assets/images/hinh-cuoi/dam-cuoi-03-2022.png',                   // 7.7MB
    'ky-niem-web/src/assets/images/hinh-cuoi/mang-thai.png',                          // 5.5MB
    'ky-niem-web/src/assets/images/quyen/quyen-portrait.png',                         // 7.6MB
    'ky-niem-web/src/assets/images/albums/ngay-cuoi_3-2022/10.png',                   // 9.7MB
    'ky-niem-web/src/assets/images/albums/ngay-cuoi_3-2022/7.png',                    // 6.0MB
    'ky-niem-web/src/assets/images/albums/ngay-cuoi_3-2022/6.png',                    // 4.7MB
    'ky-niem-web/src/assets/images/albums/ngay-cuoi_3-2022/2.png',                    // 4.1MB
    'ky-niem-web/src/assets/images/albums/ngay-cuoi_3-2022/3.png',                    // 5.0MB

    // Images from memories
    'memories/assets/images/albums/du-lich/4.png',                                     // 9.0MB
    'memories/assets/images/albums/du-lich/5.png',                                     // 4.8MB
    'memories/assets/images/albums/du-lich/2.png',                                     // 11MB
    'memories/assets/images/albums/du-lich/3.png',                                     // 4.9MB
    'memories/assets/images/albums/du-lich/1.png',                                     // 5.3MB
    'memories/assets/images/albums/doi-thuong/7.png',                                  // 6.1MB
    'memories/assets/images/albums/doi-thuong/3.png'                                   // 6.9MB
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