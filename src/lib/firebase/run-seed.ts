import fs from 'fs';
import path from 'path';

// Load env vars from .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // Remove quotes
            process.env[key] = value;
        }
    });
    console.log('Environment variables loaded from .env.local');
}

async function run() {
    try {
        // Dynamic import to ensure process.env is set before config initialization
        const { seedProducts } = await import("./seed");
        // const { auth } = await import("./config");
        // const { signInAnonymously } = await import("firebase/auth");

        // Note: If your Firestore rules require auth, uncomment and setup auth here
        // await signInAnonymously(auth);

        console.log("Seeding started...");
        const result = await seedProducts();
        console.log(result);
    } catch (error) {
        console.error("Seeding failed:", error);
        console.log("\nIf you are getting 'permission-denied', please ensure your Firestore rules allow writes or enable Authentication.");
    }
    process.exit(0);
}

run();
