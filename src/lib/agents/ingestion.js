import { model } from "../gemini";

export async function runIngestionAgent(description) {
    if (!process.env.GEMINI_API_KEY) {
        return {
            date: "2024-01-29",
            location: "Lagos, Nigeria",
            type: "Collision"
        };
    }

    const prompt = `
    Extract the following fields from the accident description:
    - Date of incident (or "Unknown")
    - Location (or "Unknown")
    - Type of accident (Collision, Theft, Fire, etc.)
    
    Description: "${description}"
    
    Return ONLY valid JSON format:
    {
       "date": "...",
       "location": "...",
       "type": "..."
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Simple cleaning of markdown code blocks
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Ingestion Agent Failed:", error);
        return { date: "Unknown", location: "Unknown", type: "Unknown" };
    }
}
