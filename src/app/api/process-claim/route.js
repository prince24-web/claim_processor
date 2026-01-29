import { NextResponse } from 'next/server';
import { runIngestionAgent } from '@/lib/agents/ingestion';
import { runVisionAgent } from '@/lib/agents/vision';
import { runPolicyAgent } from '@/lib/agents/policy';
import { runEstimatorAgent } from '@/lib/agents/estimator';
import { runTrustAgent } from '@/lib/agents/trust';

export async function POST(req) {
    try {
        const data = await req.json();
        const { description, make, model, year, image } = data;

        // 1. Ingestion Agent
        const ingestionResult = await runIngestionAgent(description);

        // 2. Vision Agent
        // Ensure image is passed correctly (base64 string)
        const visionResult = await runVisionAgent(image);

        // 3. Policy Agent
        const policyResult = await runPolicyAgent(ingestionResult, visionResult);

        // 4. Estimator Agent
        const estimatorResult = await runEstimatorAgent(visionResult, make, model);

        // 5. Trust Agent (Decision)
        const finalDecision = await runTrustAgent(
            ingestionResult,
            visionResult,
            policyResult,
            estimatorResult
        );

        return NextResponse.json({
            ...finalDecision,
            debug: {
                ingestion: ingestionResult,
                vision: visionResult,
                policy: policyResult,
                estimator: estimatorResult
            }
        });

    } catch (error) {
        console.error("Agent Pipeline Error:", error);
        return NextResponse.json(
            {
                decision: "Error",
                explanation: "An error occurred while processing the claim. Please try again.",
                estimatedCost: "N/A",
                fraudRisk: "Unknown"
            },
            { status: 500 }
        );
    }
}
