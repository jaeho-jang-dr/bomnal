const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load environment variables from .env.local
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '..', '.env.local');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split(/\r?\n/).forEach(line => {
                let text = line.trim();
                // Skip comments and empty lines
                if (!text || text.startsWith('#')) return;

                const equalsIndex = text.indexOf('=');
                if (equalsIndex !== -1) {
                    const key = text.substring(0, equalsIndex).trim();
                    let value = text.substring(equalsIndex + 1).trim();

                    // Remove optional quotes
                    if ((value.startsWith('"') && value.endsWith('"')) ||
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }

                    process.env[key] = value;
                }
            });
        }
    } catch (e) {
        // Ignore error if file doesn't exist
    }
}

loadEnv();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('\x1b[31mError: GEMINI_API_KEY not found in .env.local\x1b[0m');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PROJECT_ROOT = path.join(__dirname, '..');

async function getProjectContext() {
    // Try to load product.md or package.json for context
    let context = "You are an AI assistant for the 'Bomnal' web project.";
    try {
        const productPath = path.join(PROJECT_ROOT, 'product.md');
        if (fs.existsSync(productPath)) {
            context += "\n\nProject Context (product.md):\n" + fs.readFileSync(productPath, 'utf8');
        } else {
            const pkgPath = path.join(PROJECT_ROOT, 'package.json');
            if (fs.existsSync(pkgPath)) {
                context += "\n\nPackage.json:\n" + fs.readFileSync(pkgPath, 'utf8');
            }
        }
    } catch (e) {
        // Ignore context loading errors
    }
    return context;
}

async function startChat() {
    console.log('\x1b[36m%s\x1b[0m', '🤖 Gemini AI Chat Initialized. Type "exit" to quit.');

    // Initial system instruction
    const SystemInstruction = await getProjectContext();

    let chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "System Instruction: " + SystemInstruction }],
            },
            {
                role: "model",
                parts: [{ text: "Understood. I am ready to help with the Bomnal project." }],
            },
        ],
    });

    const askQuestion = () => {
        rl.question('\x1b[32mYou: \x1b[0m', async (msg) => {
            if (msg.toLowerCase() === 'exit') {
                rl.close();
                process.exit(0);
            }

            try {
                const result = await chat.sendMessage(msg);
                const response = await result.response;
                const text = response.text();
                console.log('\x1b[35mGemini: \x1b[0m' + text + '\n');
            } catch (error) {
                console.error('\x1b[31mError:\x1b[0m', error.message);
            }

            askQuestion();
        });
    };

    askQuestion();
}

module.exports = { startChat };

if (require.main === module) {
    startChat();
}
