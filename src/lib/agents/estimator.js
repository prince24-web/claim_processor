import { model } from "../gemini";

export async function runEstimatorAgent(visionData, make, modelName) {
    if (!process.env.GEMINI_API_KEY) {
        return {
            totalCost: "₦150,000",
            breakdown: "Bumper: ₦80,000, Labor: ₦70,000"
        };
    }

    const prompt = `
    Estimate repair cost for a ${make} ${modelName} in Nigeria.
    Damaged Parts: ${JSON.stringify(visionData.damagedParts)}
    Severity: ${visionData.severity}
    
    Use realistic market rates for Nigeria (Naira).
    
    Return JSON: { "totalCost": "₦...", "breakdown": "Part A: ₦..., Labor: ₦..." }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        return { totalCost: "₦200,000 (Est)", breakdown: "Pending detailed inspection" };
    }
}
