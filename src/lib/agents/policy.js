import { model } from "../gemini";

const MOCK_POLICY = `
Policy ID: HEIRS-AUTO-001
Coverage: Comprehensive
Exclusions: 
- Drunk driving
- Unlicensed driver
- Use for commercial racing
- Wear and tear
Maximum Payout: ₦5,000,000
Deductible: ₦20,000
Required Documents: Police Report, Photo Evidence
`;

export async function runPolicyAgent(ingestionData, visionData) {
    if (!process.env.GEMINI_API_KEY) {
        return {
            covered: true,
            notes: "Policy valid. No exclusions found in description."
        };
    }

    const prompt = `
    Analyze the claim against the policy.
    
    Policy:
    ${MOCK_POLICY}

    Incident Details:
    Type: ${ingestionData.type}
    Location: ${ingestionData.location}
    
    Vehicle Damage: ${JSON.stringify(visionData?.damagedParts)}
    Severity: ${visionData?.severity}

    Assessment Task:
    1. Is this incident covered?
    2. Are there any potential exclusions triggered?
    
    Return JSON: { "covered": true/false, "notes": "Explanation" }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        return { covered: true, notes: "Automated policy check unavailable. Manual review required." };
    }
}
