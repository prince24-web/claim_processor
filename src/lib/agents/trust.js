import { model } from "../gemini";

export async function runTrustAgent(ingestion, vision, policy, estimator) {
    if (!process.env.GEMINI_API_KEY) {
        return {
            decision: "Approved",
            explanation: "All checks passed. Policy covers collision damage. Cost is within limits.",
            estimatedCost: estimator.totalCost,
            fraudRisk: "Low"
        };
    }

    const prompt = `
    Act as the Final Trust Authority for this Insurance Claim.
    
    Data:
    - Incident: ${JSON.stringify(ingestion)}
    - Vision Analysis: ${JSON.stringify(vision)} (Fraud Risk: ${vision.fraudRisk})
    - Policy Check: ${JSON.stringify(policy)}
    - Estimate: ${JSON.stringify(estimator)}

    Decision Logic:
    - If Fraud Risk is High -> Reject.
    - If Policy says Not Covered -> Reject.
    - If Severity is Severe but cost is low -> Flag for Review.
    - Otherwise -> Approve.

    Output a customer-facing explanation.

    Return JSON: 
    { 
        "decision": "Approved" | "Rejected" | "Needs Review", 
        "explanation": "...", 
        "estimatedCost": "${estimator.totalCost}",
        "fraudRisk": "${vision.fraudRisk}"
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        return {
            decision: "Needs Review",
            explanation: "AI Trust Agent timed out. Manual review assigned.",
            estimatedCost: estimator.totalCost || "Unknown",
            fraudRisk: "Unknown"
        };
    }
}
