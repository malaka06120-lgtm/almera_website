import sharp from "sharp";

const src = "public/logo.jpeg";

await sharp(src)
  .extract({ left: 365, top: 300, width: 500, height: 385 })
  .toFile("public/logo-mark.png");

await sharp(src)
  .extract({ left: 270, top: 320, width: 740, height: 505 })
  .toFile("public/logo-wordmark.png");

await sharp(src)
  .extract({ left: 60, top: 280, width: 1160, height: 590 })
  .toFile("public/logo-full.png");

console.log("done");
