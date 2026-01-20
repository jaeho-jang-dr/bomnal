
import { NextRequest, NextResponse } from "next/server";
import { visionModel } from "@/lib/gemini";

// Helper to clean JSON string from Markdown code blocks
function cleanJsonString(text: string): string {
    return text.replace(/```json\n|\n```/g, "").trim();
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
      You are an expert product merchandiser. Analyze the provided product information (image or screenshot).
      Extract the following details in JSON format.
      The screenshot may contain Korean text describing product details, price, and options.
      
      Extract:
      1. name: Product Name (Korean). Look for the largest text or text next to product options.
      2. price: Price (Number only, remove currency symbols like '원' or ','). If "Sale Price" exists, use that.
      3. description: A compelling marketing description (Korean, 2-3 sentences) based on the product features visible.
      4. tag: A short tag (e.g., "인기상품", "할인", "신상품").
      5. image_prompts: An array of 4 detailed English image generation prompts for "Whisk/Imagen":
         - Prompt 1: Front view, clean background.
         - Prompt 2: 45-degree angle view.
         - Prompt 3: Detail/Texture shot.
         - Prompt 4: Lifestyle/Usage shot. (If sensitive/underwear, specify "on mannequin").
      
      Response Format (JSON only):
      {
        "name": "...",
        "price": 10000,
        "description": "...",
        "tag": "...",
        "image_prompts": ["...", "...", "...", "..."]
      }
    `;

        let result;

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

            const imagePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType,
                },
            };

            result = await visionModel.generateContent([prompt, imagePart]);
        } else {
            prompt += `\n\nAnalyze this Context/URL content: ${data}`;
            result = await visionModel.generateContent(prompt);
        }

        const responseText = result.response.text();
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
