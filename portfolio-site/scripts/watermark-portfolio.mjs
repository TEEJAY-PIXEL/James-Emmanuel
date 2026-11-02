import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve(process.cwd(), "..");
const outputDir = path.resolve(process.cwd(), "public/portfolio-watermarked");
const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);
const files = (await fs.readdir(sourceDir, { withFileTypes: true }))
  .filter(entry => entry.isFile() && allowed.has(path.extname(entry.name).toLowerCase()));

await fs.mkdir(outputDir, { recursive: true });

const watermarkSvg = (width, height) => {
  const fontSize = Math.max(17, Math.min(44, Math.round(Math.min(width, height) * 0.055)));
  const tileW = Math.max(210, Math.round(fontSize * 7.8));
  const tileH = Math.max(150, Math.round(fontSize * 5.8));
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="watermark" width="${tileW}" height="${tileH}" patternUnits="userSpaceOnUse">
          <g transform="translate(12 ${tileH / 2}) rotate(-28)">
            <text x="0" y="0" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="700"
              letter-spacing="1.4" fill="#fff" fill-opacity="0.46" stroke="#111"
              stroke-opacity="0.22" stroke-width="1.5" paint-order="stroke">James_web</text>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#watermark)" />
    </svg>`
  );
};

for (const entry of files) {
  const input = path.join(sourceDir, entry.name);
  const base = path.parse(entry.name).name;
  const output = path.join(outputDir, `${base}.webp`);
  const image = sharp(input, { limitInputPixels: 100000000 });
  const meta = await image.metadata();
  if (!meta.width || !meta.height) continue;

  await image
    .composite([{ input: watermarkSvg(meta.width, meta.height), blend: "over" }])
    .webp({ quality: 84, effort: 5 })
    .toFile(output);
}

console.log(`Watermarked ${files.length} image files into public/portfolio-watermarked`);
