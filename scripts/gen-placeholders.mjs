import { writeFileSync, mkdirSync } from "fs";

mkdirSync("public/placeholders", { recursive: true });

function bottleSvg({ w, h, bgFrom, bgTo, accent, accent2, bottleFrom, bottleTo, capColor, captionColor, label }) {
  const cx = w / 2;
  const cy = h * 0.56;
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgFrom}"/>
      <stop offset="100%" stop-color="${bgTo}"/>
    </linearGradient>
    <linearGradient id="bottle" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bottleFrom}"/>
      <stop offset="100%" stop-color="${bottleTo}"/>
    </linearGradient>
    <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="45"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <circle cx="${w * 0.8}" cy="${h * 0.18}" r="${w * 0.3}" fill="${accent}" opacity="0.20" filter="url(#soft)"/>
  <circle cx="${w * 0.15}" cy="${h * 0.82}" r="${w * 0.34}" fill="${accent2}" opacity="0.16" filter="url(#soft)"/>
  <g transform="translate(${cx},${cy})">
    <ellipse cx="0" cy="${h * 0.26}" rx="${w * 0.16}" ry="${w * 0.03}" fill="#000" opacity="0.08"/>
    <rect x="${-w * 0.063}" y="${-h * 0.29}" width="${w * 0.126}" height="${h * 0.058}" rx="8" fill="${capColor}"/>
    <rect x="${-w * 0.027}" y="${-h * 0.24}" width="${w * 0.054}" height="${h * 0.05}" fill="${capColor}" opacity="0.85"/>
    <rect x="${-w * 0.158}" y="${-h * 0.19}" width="${w * 0.316}" height="${h * 0.45}" rx="20" fill="url(#bottle)" stroke="${accent}" stroke-width="2" opacity="0.95"/>
    <rect x="${-w * 0.1}" y="${-h * 0.05}" width="${w * 0.2}" height="${h * 0.1}" rx="4" fill="rgba(255,255,255,0.88)" stroke="${accent}" stroke-width="1.5"/>
    <text x="0" y="${-h * 0.006}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${h * 0.032}" fill="#111111">A</text>
    <text x="0" y="${h * 0.024}" text-anchor="middle" font-family="Georgia, serif" font-size="${h * 0.011}" letter-spacing="3" fill="#111111" opacity="0.75">ALMERA</text>
  </g>
  ${label ? `<text x="${w / 2}" y="${h * 0.94}" text-anchor="middle" font-family="Georgia, serif" font-size="${h * 0.016}" letter-spacing="4" fill="${captionColor}" opacity="0.7">${label}</text>` : ""}
</svg>`;
}

const palettes = {
  blush: {
    bgFrom: "#f6e6e7", bgTo: "#fbf1f1",
    accent: "#c8a96a", accent2: "#e7d8b8",
    bottleFrom: "#ffffff", bottleTo: "#f3e2d8",
    capColor: "#c8a96a", captionColor: "#111111",
  },
  amber: {
    bgFrom: "#efe0cf", bgTo: "#f6e6e7",
    accent: "#c8a96a", accent2: "#b98a4f",
    bottleFrom: "#3a2a1c", bottleTo: "#1c1410",
    capColor: "#c8a96a", captionColor: "#3a2a1c",
  },
  citrus: {
    bgFrom: "#f6efd8", bgTo: "#f6e6e7",
    accent: "#c8a96a", accent2: "#d9c98a",
    bottleFrom: "#fdf6e3", bottleTo: "#eeddb0",
    capColor: "#c8a96a", captionColor: "#111111",
  },
  noir: {
    bgFrom: "#1c1414", bgTo: "#2a2020",
    accent: "#c8a96a", accent2: "#4a3a3a",
    bottleFrom: "#2c2424", bottleTo: "#111111",
    capColor: "#c8a96a", captionColor: "#f6e6e7",
  },
};

const portrait = { w: 900, h: 1200 };
const square = { w: 900, h: 900 };
const wide = { w: 1400, h: 1000 };

const jobs = [
  ["hero", portrait, "blush", "The Almera Collection"],
  ["product-rose-noir-1", portrait, "blush", "Rose Noir"],
  ["product-rose-noir-2", portrait, "blush", null],
  ["product-oud-royal-1", portrait, "amber", "Oud Royal"],
  ["product-oud-royal-2", portrait, "amber", null],
  ["product-citrus-bloom-1", portrait, "citrus", "Citrus Bloom"],
  ["product-amber-nuit-1", portrait, "noir", "Amber Nuit"],
  ["category-floral", portrait, "blush", "Floral"],
  ["category-oud-woody", portrait, "amber", "Oud & Woody"],
  ["category-citrus", portrait, "citrus", "Citrus"],
  ["category-oriental", portrait, "noir", "Oriental"],
  ["about-hero", wide, "noir", "Our Story"],
  ["about-craft", portrait, "amber", "Craftsmanship"],
  ["gallery-1", square, "blush", null],
  ["gallery-2", square, "amber", null],
  ["gallery-3", square, "citrus", null],
  ["gallery-4", square, "noir", null],
  ["gallery-5", square, "blush", null],
  ["gallery-6", square, "amber", null],
];

for (const [name, size, paletteName, label] of jobs) {
  const svg = bottleSvg({ ...size, ...palettes[paletteName], label });
  writeFileSync(`public/placeholders/${name}.svg`, svg, "utf8");
  console.log(`wrote ${name}.svg`);
}
