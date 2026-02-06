import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'public', 'icon.svg');
const svg = fs.readFileSync(svgPath);

const sizes = [192, 512];

for (const size of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(path.join(process.cwd(), 'public', `icon-${size}.png`));
  console.log(`Generated icon-${size}.png`);
}

console.log('Done!');
