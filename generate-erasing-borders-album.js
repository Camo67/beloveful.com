#!/usr/bin/env node

// Generate Erasing Borders album entries for cloudinaryAlbums.ts
const R2_BASE_URL = "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev";
const R2_PATH = "Website beloveful.com/Erasing Borders";

const imageFiles = [
  "CHI-Beloveful6.jpg",
  "CHI-DSCF9471.jpg", 
  "CHI-MeniasTony_12.jpg",
  "DSCF3088 copy.jpg",
  "FRA-DSCF0103 copy.jpg",
  "Greece-DSCF3935 copy 3.jpg",
  "IND-MeniasTony_14.jpg",
  "IND-MeniasTony_16.jpg", 
  "IND-MeniasTony_8.jpg",
  "JAP-3265.jpg",
  "JOR-4461.jpg",
  "MOR-IMG_5248 copy.jpg",
  "MOR-IMG_5277.jpg",
  "MYA-DSCF0783 copy.jpg",
  "MYA-DSCF9634 copy.jpg",
  "NatureVSNurture copy.jpg",
  "NEP-DSCF8737 copy.jpg",
  "NEP-Silent Stare copy.jpg",
  "NyC-DSCF8922 copy 2.jpg",
  "PAL-DSCF3675 copy.jpg",
  "PAL-MeniasTony_13.jpg",
  "PHI-1662 copy.jpg",
  "THAI-DSCF3890 copy.jpg",
  "TonyMeniasAMansLegacy.jpg",
  "Tony Menias - Two Girls in Window.jpg",
  "Vietnam-DSCF8153 copy.jpg"
];

const erasingBordersAlbum = {
  "region": "Erasing Borders",
  "country": "Erasing Borders",
  "slug": "erasing-borders",
  "images": imageFiles.map(filename => {
    const encodedFilename = encodeURIComponent(filename);
    const url = `${R2_BASE_URL}/${R2_PATH}/${encodedFilename}`;
    return {
      "desktop": url,
      "mobile": url
    };
  })
};

console.log("// Erasing Borders album entry to add to CLOUDINARY_ALBUMS array:");
console.log("  {");
console.log(`    "region": "${erasingBordersAlbum.region}",`);
console.log(`    "country": "${erasingBordersAlbum.country}",`);
console.log(`    "slug": "${erasingBordersAlbum.slug}",`);
console.log('    "images": [');

erasingBordersAlbum.images.forEach((image, index) => {
  const comma = index < erasingBordersAlbum.images.length - 1 ? ',' : '';
  console.log('      {');
  console.log(`        "desktop": "${image.desktop}",`);
  console.log(`        "mobile": "${image.mobile}"`);
  console.log(`      }${comma}`);
});

console.log('    ]');
console.log('  }');