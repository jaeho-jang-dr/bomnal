
import { NextRequest, NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

// List of models to try in order of preference (Better -> Faster -> Fallback)
const CANDIDATE_MODELS = [
    "gemini-1.5-pro-002",      // Latest Stable Pro
    "gemini-1.5-flash-002",    // Latest Stable Flash
    "gemini-2.0-flash-exp",    // Cutting edge (if available)
    "gemini-1.5-pro",          // Standard Pro
    "gemini-1.5-flash",        // Standard Flash
];

async function generateContentWithFallback(prompt: string, imagePart: any | null) {
    let lastError = null;

    for (const modelName of CANDIDATE_MODELS) {
        try {
            console.log(`Attempting analysis with model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            let result;
            if (imagePart) {
                result = await model.generateContent([prompt, imagePart]);
            } else {
                result = await model.generateContent(prompt);
            }

            const response = await result.response;
            return response; // Success
        } catch (error: any) {
            console.warn(`Model ${modelName} failed:`, error.message);
            lastError = error;
            // Continue to next model
        }
    }

    throw lastError || new Error("All AI models failed to respond.");
}

// Helper to clean JSON string from Markdown code blocks
function cleanJsonString(text: string): string {
    return text.replace(/```json\n|\n```/g, "").trim();
}

async function fetchUrlContent(url: string): Promise<string> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || '';

        // Detect encoding
        let encoding = 'utf-8';
        if (contentType.includes('charset=')) {
            encoding = contentType.split('charset=')[1].trim();
        } else {
            // Basic heuristic for common Korean legacy encodings
            const textPreview = new TextDecoder('utf-8').decode(buffer.slice(0, 1000));
            if (textPreview.includes('charset=euc-kr') || textPreview.includes('charset="euc-kr"')) {
                encoding = 'euc-kr';
            }
        }

        // Decode
        const html = iconv.decode(Buffer.from(buffer), encoding);
        const $ = cheerio.load(html);

        // Remove clutter
        $('script').remove();
        $('style').remove();
        $('nav').remove();
        $('header').remove();
        $('footer').remove();
        $('.ad').remove();
        $('.advertisement').remove();

        // Extract text based on likely content areas
        // Prioritize common main content selectors, fall back to body
        const mainContent = $('main, article, #content, .product-detail, .goods_view').text() || $('body').text();

        // Clean whitespace
        return mainContent.replace(/\s+/g, ' ').trim().slice(0, 15000); // Limit length for token safety
    } catch (e: any) {
        console.warn("Failed to fetch/parse URL content:", e.message);
        throw new Error(`URL 내용을 가져올 수 없습니다: ${e.message}`);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { type, data } = await req.json(); // type: 'url' | 'image', data: Data URL or Text

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API Key is missing" },
                { status: 500 }
            );
        }

        let prompt = `
      You are an expert product merchandiser. Analyze the provided product information.
      Extract the following details in JSON format.
      The content may be a screenshot or raw text from a webpage.
      
      Extract:
      1. name: Product Name (Korean). Look for the largest text or text next to product options.
      2. price: Price (Number only, remove currency symbols like '원' or ',', use SALE price if available).
      3. description: A compelling marketing description (Korean, 2-3 sentences) based on the product features visible.
      4. tag: A short tag (e.g., "인기상품", "할인", "신상품").
      5. image_prompts: An array of 4 detailed English image generation prompts for "Whisk/Imagen":
         - Prompt 1: Front view, clean background, photorealistic.
         - Prompt 2: 45-degree angle view, photorealistic.
         - Prompt 3: Detail/Texture shot, photorealistic.
         - Prompt 4: Lifestyle/Usage shot (if clothing, "on model/mannequin").
      
      Response Format (JSON only):
      {
        "name": "...",
        "price": 10000,
        "description": "...",
        "tag": "...",
        "image_prompts": ["...", "...", "...", "..."]
      }
    `;

        let imagePart = null;

        if (type === 'image') {
            // Data is expected to be a Data URL: "data:image/png;base64,..."
            let mimeType = "image/jpeg";
            let base64Data = data;

            if (data.includes(',')) {
                const [header, content] = data.split(',');
                base64Data = content;
                // Try to extract mime type from header "data:image/png;base64"
                const mimeMatch = header.match(/:(.*?);/);
                if (mimeMatch) {
                    mimeType = mimeMatch[1];
                }
            }

            imagePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType,
                },
            };
        } else if (type === 'url') {
            // If it's a URL, fetch the content first
            if (data.startsWith('http')) {
                const scrapedContent = await fetchUrlContent(data);
                prompt += `\n\nAnalyze this Scraped Webpage Content:\n${scrapedContent}`;
            } else {
                prompt += `\n\nAnalyze this text:\n${data}`;
            }
        }

        // Use fallback mechanism
        const response = await generateContentWithFallback(prompt, imagePart);


        const responseText = response.text();
        console.log("Gemini Response:", responseText); // Debug logging

        // Robust JSON extraction
        let cleanJson = cleanJsonString(responseText);

        // Find the first '{' and last '}' to ensure we have a valid object
        const firstOpen = cleanJson.indexOf('{');
        const lastClose = cleanJson.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1) {
            cleanJson = cleanJson.substring(firstOpen, lastClose + 1);
        } else {
            throw new Error("Failed to find JSON object in response");
        }

        const parsedData = JSON.parse(cleanJson);
        return NextResponse.json(parsedData);

    } catch (error: any) {
        console.error("Smart Register Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to analyze product" },
            { status: 500 }
        );
    }
}
