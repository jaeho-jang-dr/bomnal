import { seedProducts } from '../src/lib/firebase/seed';

// Mock Firestore bits to import the data array only if possible
// Actually, seed.ts exports seedProducts function but define 'products' array internally and not exported.
// I need to read the file and extract URLs matching regex.

import fs from 'fs';
import path from 'path';

const seedPath = path.join(__dirname, '../src/lib/firebase/seed.ts');
const content = fs.readFileSync(seedPath, 'utf8');

// Regex to find image URLs
const urlRegex = /image:\s*"(https?:\/\/[^"]+)"/g;
let match;
const urls: string[] = [];

while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
}

console.log(`Found ${urls.length} image URLs to verify.`);

async function verifyUrl(url: string, index: number) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
            console.log(`[PASS] ${index + 1}: ${url}`);
            return true;
        } else {
            console.error(`[FAIL] ${index + 1}: ${url} (Status: ${response.status})`);
            return false;
        }
    } catch (error: any) {
        console.error(`[ERROR] ${index + 1}: ${url} (${error.message})`);
        return false;
    }
}

async function run() {
    let failures = 0;
    for (let i = 0; i < urls.length; i++) {
        const success = await verifyUrl(urls[i], i);
        if (!success) failures++;
    }

    if (failures > 0) {
        console.error(`\nverification complete. ${failures} broken URLs found.`);
        process.exit(1);
    } else {
        console.log("\nAll images verified successfully.");
    }
}

run();
