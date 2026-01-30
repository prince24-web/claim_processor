// Mock claims data for admin dashboard demo
export const mockClaims = [
    {
        id: "CLM-2024-001",
        claimant: "John Doe",
        vehicle: "Toyota Camry 2020",
        date: "2026-01-29",
        status: "Approved",
        ingestion: {
            date: "2026-01-29",
            location: "Lagos, Victoria Island",
            type: "Collision"
        },
        vision: {
            damagedParts: ["Front Bumper", "Headlight"],
            severity: "Moderate",
            fraudRisk: "Low"
        },
        policy: {
            covered: true,
            notes: "Comprehensive coverage active. No exclusions triggered."
        },
        estimator: {
            totalCost: "₦150,000",
            breakdown: "Bumper: ₦80,000, Headlight: ₦40,000, Labor: ₦30,000"
        },
        trust: {
            decision: "Approved",
            explanation: "Based on visual evidence and policy verification, damage is consistent with collision. Coverage applies.",
            estimatedCost: "₦150,000",
            fraudRisk: "Low"
        },
        imageUrl: null
    },
    {
        id: "CLM-2024-002",
        claimant: "Sarah Ibrahim",
        vehicle: "Honda Accord 2019",
        date: "2026-01-28",
        status: "Rejected",
        ingestion: {
            date: "2026-01-28",
            location: "Abuja",
            type: "Rear-end collision"
        },
        vision: {
            damagedParts: ["Rear Bumper", "Trunk"],
            severity: "Minor",
            fraudRisk: "High"
        },
        policy: {
            covered: true,
            notes: "Policy active but fraud concerns flagged."
        },
        estimator: {
            totalCost: "₦65,000",
            breakdown: "Rear Bumper: ₦50,000, Labor: ₦15,000"
        },
        trust: {
            decision: "Rejected",
            explanation: "Vision analysis detected high fraud risk. Image inconsistencies suggest manipulation. Manual review required.",
            estimatedCost: "₦65,000",
            fraudRisk: "High"
        },
        imageUrl: null
    },
    {
        id: "CLM-2024-003",
        claimant: "Michael Okafor",
        vehicle: "Lexus ES 2021",
        date: "2026-01-27",
        status: "Approved",
        ingestion: {
            date: "2026-01-27",
            location: "Port Harcourt, GRA",
            type: "Side Impact"
        },
        vision: {
            damagedParts: ["Driver Door", "Side Mirror"],
            severity: "Severe",
            fraudRisk: "Low"
        },
        policy: {
            covered: true,
            notes: "Premium coverage. All collision types covered."
        },
        estimator: {
            totalCost: "₦320,000",
            breakdown: "Door: ₦200,000, Mirror: ₦80,000, Paint: ₦40,000"
        },
        trust: {
            decision: "Approved",
            explanation: "Severe damage verified. Policy covers side impacts. Low fraud risk detected.",
            estimatedCost: "₦320,000",
            fraudRisk: "Low"
        },
        imageUrl: null
    }
];
