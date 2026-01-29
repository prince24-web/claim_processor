import { visionModel } from "../gemini";

export async function runVisionAgent(imageBase64) {
    // imageBase64 is expected to be a data URL: "data:image/jpeg;base64,..."
    if (!process.env.GEMINI_API_KEY || !imageBase64) {
        return {
            damagedParts: ["Bumper", "Headlight"],
            severity: "Moderate",
            fraudRisk: "Low" // Mocked
        };
    }

    // Extract base64 data
    const base64Data = imageBase64.split(',')[1];
    if (!base64Data) {
        return { damagedParts: [], severity: "Unknown", fraudRisk: "Unknown" };
    }

    const parts = [
        {
            inlineData: {
                mimeType: "image/jpeg", // Assuming jpeg for simplicity, or extract from string
                data: base64Data
            }
        },
        { text: "Analyze this car accident image. Identify damaged parts, severity (Minor/Moderate/Severe), and checking for signs of fraud (e.g. edited image, inconsistency). Return JSON: { \"damagedParts\": [\"...\"], \"severity\": \"...\", \"fraudRisk\": \"High/Medium/Low\" }" }
    ];

    try {
        const result = await visionModel.generateContent(parts);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Vision Agent Failed:", error);
        return { damagedParts: ["Unknown"], severity: "Unknown", fraudRisk: "Low" };
    }
}
