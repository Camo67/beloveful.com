#!/usr/bin/env node

/**
 * Script to scan GeoJSON and identify features that don't resolve to a CountryCode in our union
 */

import { isoFromFeature } from "../src/lib/map-utils.js";

// Mock GeoJSON features for testing
const mockFeatures = [
  { properties: { iso_a3: "ARG", name: "Argentina" } },
  { properties: { iso_a3: "JOR", name: "Jordan" } },
  { properties: { iso_a3: "IND", name: "India" } },
  { properties: { iso_a3: "ESP", name: "Spain" } },
  { properties: { iso_a3: "PRI", name: "Puerto Rico" } },
  { properties: { iso_a3: "MAR", name: "Morocco" } },
  { properties: { iso_a3: "EGY", name: "Egypt" } },
  { properties: { iso_a3: "ETH", name: "Ethiopia" } },
  { properties: { iso_a3: "ZAF", name: "South Africa" } },
  { properties: { iso_a3: "NAM", name: "Namibia" } },
  { properties: { iso_a3: "NPL", name: "Nepal" } },
  { properties: { iso_a3: "THA", name: "Thailand" } },
  { properties: { iso_a3: "VNM", name: "Vietnam" } },
  { properties: { iso_a3: "HKG", name: "Hong Kong" } },
  { properties: { iso_a3: "JPN", name: "Japan" } },
  // Test unknown features
  { properties: { iso_a3: "USA", name: "United States" } },
  { properties: { iso_a3: "FRA", name: "France" } },
  { properties: { name: "Germany" } },
];

console.log("=== GeoJSON Feature Validation ===\n");

let validCount = 0;
let invalidCount = 0;

mockFeatures.forEach((feature, index) => {
  const code = isoFromFeature(feature);
  if (code) {
    console.log(`✓ Feature ${index + 1}: ${feature.properties.name} -> ${code}`);
    validCount++;
  } else {
    console.log(`✗ Feature ${index + 1}: ${feature.properties.name || feature.properties.iso_a3 || 'Unknown'} -> No mapping`);
    invalidCount++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`Valid features: ${validCount}`);
console.log(`Invalid features: ${invalidCount}`);
console.log(`Total features: ${mockFeatures.length}`);

if (invalidCount > 0) {
  console.log(`\nRecommendation: Add missing countries to COUNTRY_FOLDER_MAP and COUNTRY_COORDS in src/lib/map-mappings.ts`);
}