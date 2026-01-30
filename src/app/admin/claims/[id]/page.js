"use client";

import { use } from "react";
import { mockClaims } from "@/lib/mockClaims";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    ArrowLeft,
    User,
    Car,
    Calendar,
    MapPin,
    AlertTriangle,
    Shield,
    DollarSign,
    Brain,
    Eye,
    FileText,
    Calculator,
    CheckCircle2
} from "lucide-react";

export default function ClaimDetail({ params }) {
    // Unwrap the params Promise in Next.js 15+
    const resolvedParams = use(params);
    const claim = mockClaims.find(c => c.id === resolvedParams.id);

    if (!claim) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="max-w-md">
                    <CardContent className="p-8 text-center">
                        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Claim Not Found</h2>
                        <p className="text-gray-600 mb-4">The claim ID you're looking for doesn't exist.</p>
                        <Link href="/admin">
                            <button className="px-4 py-2 bg-primary text-white rounded-md">
                                Back to Dashboard
                            </button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary text-white shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Claim Details - {claim.id}</h1>
                            <p className="text-sm opacity-90">AI Agent Analysis Breakdown</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {/* Summary Card */}
                <Card className="mb-8 border-l-4 border-l-primary">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">Claimant Information</CardTitle>
                                <CardDescription>Personal and vehicle details</CardDescription>
                            </div>
                            <Badge
                                variant={claim.status === "Approved" ? "success" : "destructive"}
                                className="text-lg px-4 py-2"
                            >
                                {claim.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InfoItem icon={<User />} label="Claimant" value={claim.claimant} />
                            <InfoItem icon={<Car />} label="Vehicle" value={claim.vehicle} />
                            <InfoItem icon={<Calendar />} label="Date" value={claim.date} />
                        </div>
                    </CardContent>
                </Card>

                {/* AI Agent Pipeline */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Brain className="h-6 w-6 text-primary" />
                        AI Agent Analysis Pipeline
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Each AI agent processed this claim independently. Below is the complete audit trail.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Agent 1: Ingestion */}
                    <AgentCard
                        title="Ingestion Agent"
                        icon={<FileText className="h-6 w-6" />}
                        color="blue"
                        description="Extracted structured data from user's accident description"
                        data={claim.ingestion}
                        fields={[
                            { label: "Incident Date", value: claim.ingestion.date, icon: <Calendar className="h-4 w-4" /> },
                            { label: "Location", value: claim.ingestion.location, icon: <MapPin className="h-4 w-4" /> },
                            { label: "Accident Type", value: claim.ingestion.type, icon: <AlertTriangle className="h-4 w-4" /> },
                        ]}
                    />

                    {/* Agent 2: Vision */}
                    <AgentCard
                        title="Vision Agent (Computer Vision)"
                        icon={<Eye className="h-6 w-6" />}
                        color="purple"
                        description="Analyzed damage photo using AI image recognition"
                        data={claim.vision}
                        fields={[
                            {
                                label: "Damaged Parts",
                                value: claim.vision.damagedParts.join(", "),
                                icon: <Car className="h-4 w-4" />
                            },
                            {
                                label: "Damage Severity",
                                value: claim.vision.severity,
                                icon: <AlertTriangle className="h-4 w-4" />,
                                badge: true,
                                badgeVariant: claim.vision.severity === "Severe" ? "destructive" : "secondary"
                            },
                            {
                                label: "Fraud Risk",
                                value: claim.vision.fraudRisk,
                                icon: <Shield className="h-4 w-4" />,
                                badge: true,
                                badgeVariant: claim.vision.fraudRisk === "High" ? "destructive" : "success"
                            },
                        ]}
                    />

                    {/* Agent 3: Policy */}
                    <AgentCard
                        title="Policy Agent (RAG)"
                        icon={<Shield className="h-6 w-6" />}
                        color="green"
                        description="Verified coverage against insurance policy documents"
                        data={claim.policy}
                        fields={[
                            {
                                label: "Coverage Status",
                                value: claim.policy.covered ? "Covered ✓" : "Not Covered ✗",
                                icon: <CheckCircle2 className="h-4 w-4" />,
                                badge: true,
                                badgeVariant: claim.policy.covered ? "success" : "destructive"
                            },
                            {
                                label: "Policy Notes",
                                value: claim.policy.notes,
                                icon: <FileText className="h-4 w-4" />
                            },
                        ]}
                    />

                    {/* Agent 4: Estimator */}
                    <AgentCard
                        title="Estimator Agent"
                        icon={<Calculator className="h-6 w-6" />}
                        color="orange"
                        description="Calculated repair costs based on market rates"
                        data={claim.estimator}
                        fields={[
                            {
                                label: "Total Cost",
                                value: claim.estimator.totalCost,
                                icon: <DollarSign className="h-4 w-4" />,
                                highlight: true
                            },
                            {
                                label: "Cost Breakdown",
                                value: claim.estimator.breakdown,
                                icon: <FileText className="h-4 w-4" />
                            },
                        ]}
                    />

                    {/* Agent 5: Trust/Decision */}
                    <AgentCard
                        title="Trust Agent (Final Decision)"
                        icon={<Brain className="h-6 w-6" />}
                        color="indigo"
                        description="Synthesized all data to make final approval decision"
                        data={claim.trust}
                        fields={[
                            {
                                label: "Final Decision",
                                value: claim.trust.decision,
                                icon: <CheckCircle2 className="h-4 w-4" />,
                                badge: true,
                                badgeVariant: claim.trust.decision === "Approved" ? "success" : "destructive",
                                large: true
                            },
                            {
                                label: "AI Explanation",
                                value: claim.trust.explanation,
                                icon: <Brain className="h-4 w-4" />,
                                fullWidth: true
                            },
                            {
                                label: "Estimated Cost",
                                value: claim.trust.estimatedCost,
                                icon: <DollarSign className="h-4 w-4" />,
                                highlight: true
                            },
                            {
                                label: "Fraud Risk",
                                value: claim.trust.fraudRisk,
                                icon: <Shield className="h-4 w-4" />,
                                badge: true,
                                badgeVariant: claim.trust.fraudRisk === "High" ? "destructive" : "success"
                            },
                        ]}
                    />
                </div>

                {/* Raw JSON Data (For Developers) */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Raw Agent Outputs (Developer View)</CardTitle>
                        <CardDescription>Complete JSON responses from each agent</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm">
                            {JSON.stringify({
                                ingestion: claim.ingestion,
                                vision: claim.vision,
                                policy: claim.policy,
                                estimator: claim.estimator,
                                trust: claim.trust
                            }, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-md text-primary">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );
}

function AgentCard({ title, icon, color, description, data, fields }) {
    const colorClasses = {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        green: "bg-green-500",
        orange: "bg-orange-500",
        indigo: "bg-indigo-500",
    };

    return (
        <Card className="border-l-4" style={{ borderLeftColor: colorClasses[color].replace('bg-', '') }}>
            <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                    <div className={`p-3 ${colorClasses[color]} text-white rounded-lg`}>
                        {icon}
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{title}</CardTitle>
                        <CardDescription className="text-sm">{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field, index) => (
                        <div
                            key={index}
                            className={`p-4 bg-gray-50 rounded-lg ${field.fullWidth ? 'md:col-span-2' : ''} ${field.highlight ? 'bg-yellow-50 border-2 border-yellow-200' : ''}`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-gray-500">{field.icon}</span>
                                <span className="text-sm font-semibold text-gray-700">{field.label}</span>
                            </div>
                            {field.badge ? (
                                <Badge variant={field.badgeVariant} className={field.large ? "text-base px-3 py-1" : ""}>
                                    {field.value}
                                </Badge>
                            ) : (
                                <p className={`${field.highlight ? 'text-2xl font-bold text-primary' : 'text-gray-900'}`}>
                                    {field.value}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
