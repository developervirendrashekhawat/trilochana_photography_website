// Runs before `dev` and `build`. For every image under public/images and public/brand:
//  1. renames the original demo files (ostage.jpg …) to descriptive SEO filenames, as .jpg
//  2. downsizes anything wider than 2000px and recompresses it
//  3. writes src/content/image-meta.json { "/images/…": { width, height, blurDataURL } }
//     so next/image gets real dimensions (zero CLS) and a blur placeholder. A missing
//     file simply has no entry, and the site renders a labelled placeholder tile.
//  4. builds src/app/icon.png + apple-icon.png from public/brand/logo.png
import { readdir, rename, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "public");
const portfolioDir = path.join(pub, "images/portfolio");
const MAX = 2000;

const renames = {
  group: "diwali-celebration-group-photo-delhi",
  twowomen: "diwali-celebration-friends-portrait-delhi",
  hstage: "diwali-celebration-stage-decor-delhi",
  hall: "diwali-celebration-banquet-hall-delhi",
  lavender: "diwali-portrait-lavender-outfit-delhi",
  saree: "diwali-portrait-saree-delhi",
  ostage: "corporate-event-stage-delhi-ncr",
  obackdrop: "corporate-event-branded-backdrop-delhi-ncr",
  olive: "corporate-event-live-performance-delhi-ncr",
  speaker1: "corporate-event-speaker-keynote-delhi-ncr",
  speaker2: "corporate-event-speaker-panel-delhi-ncr",
  team: "corporate-event-team-photo-delhi-ncr",
  camera: "sunset-landscape-through-camera-lens",
};
const isImg = (f) => /\.(jpe?g|png|webp|avif|heic|tiff?)$/i.test(f);

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (isImg(e.name)) out.push(p);
  }
  return out;
}

// 1. rename demo originals -> descriptive .jpg
for (const f of await walk(portfolioDir)) {
  const { name, ext } = path.parse(f);
  const target = renames[name.toLowerCase()];
  if (!target) continue;
  const dest = path.join(portfolioDir, `${target}.jpg`);
  if (/\.jpe?g$/i.test(ext)) await rename(f, dest);
  else {
    await sharp(f).rotate().jpeg({ quality: 85, mozjpeg: true }).toFile(dest);
    await rm(f);
  }
  console.log(`[images] ${path.basename(f)} -> ${path.basename(dest)}`);
}

// 2 + 3. resize & build manifest
const meta = {};
for (const f of [...(await walk(path.join(pub, "images"))), ...(await walk(path.join(pub, "brand")))]) {
  let img = sharp(f).rotate();
  let { width, height } = await img.metadata();
  if (width > MAX && /\.jpe?g$/i.test(f)) {
    const buf = await img.resize({ width: MAX }).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
    await writeFile(f, buf);
    ({ width, height } = await sharp(buf).metadata());
    console.log(`[images] resized ${path.relative(pub, f)} to ${width}px`);
  }
  const { orientation } = await sharp(f).metadata();
  if (orientation && orientation >= 5) [width, height] = [height, width];
  const blur = await sharp(f).rotate().resize(12).webp({ quality: 40 }).toBuffer();
  const key = "/" + path.relative(pub, f).split(path.sep).join("/");
  meta[key] = { width, height, blurDataURL: `data:image/webp;base64,${blur.toString("base64")}` };
}
await writeFile(path.join(root, "src/content/image-meta.json"), JSON.stringify(meta, null, 2) + "\n");
console.log(`[images] ${Object.keys(meta).length} images in manifest`);

// 4. icons from the logo
const logo = path.join(pub, "brand/logo.png");
if (existsSync(logo)) {
  const out = path.join(root, "src/app");
  const bg = { r: 15, g: 15, b: 15, alpha: 1 };
  await sharp(logo).resize(512, 512, { fit: "contain", background: bg }).png().toFile(path.join(out, "icon.png"));
  await sharp(logo).resize(180, 180, { fit: "contain", background: bg }).png().toFile(path.join(out, "apple-icon.png"));
  console.log("[images] icon.png + apple-icon.png generated from logo");
}
