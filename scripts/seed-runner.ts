import fs from 'fs';
import path from 'path';

// 1. Manually load .env.local (since we are running standalone and imports are hoisted)
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/"/g, ''); // Remove quotes
        }
    });
    console.log("Environment variables loaded from .env.local");
} else {
    console.error("No .env.local found at:", envPath);
}

// 2. Run Seed (Dynamic Import)
async function run() {
    try {
        console.log("Importing seed module...");
        const { seedProducts } = await import('../src/lib/firebase/seed');
        console.log("Starting seed...");
        const result = await seedProducts();
        console.log("Seed result:", result);
    } catch (e) {
        console.error("Seed failed:", e);
    }
}

run();
