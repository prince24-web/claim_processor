"use client";

import { useState } from "react";
import { mockClaims } from "@/lib/mockClaims";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Eye, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredClaims = mockClaims.filter((claim) => {
        const matchesSearch =
            claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
            claim.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "All" || claim.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-primary text-white shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Claims Admin Dashboard</h1>
                            <p className="text-sm opacity-90">Heirs Insurance - AI Processing Center</p>
                        </div>
                        <Link href="/">
                            <button className="px-4 py-2 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard label="Total Claims" value={mockClaims.length} color="blue" />
                    <StatCard
                        label="Approved"
                        value={mockClaims.filter(c => c.status === "Approved").length}
                        color="green"
                    />
                    <StatCard
                        label="Rejected"
                        value={mockClaims.filter(c => c.status === "Rejected").length}
                        color="red"
                    />
                    <StatCard
                        label="Avg Processing Time"
                        value="< 30s"
                        color="purple"
                    />
                </div>

                {/* Search and Filter */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Search by Claim ID, Claimant, or Vehicle..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                {["All", "Approved", "Rejected"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-md transition-colors ${statusFilter === status
                                                ? "bg-primary text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Claims Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Claims Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Claim ID</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Claimant</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Vehicle</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Fraud Risk</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Cost</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredClaims.map((claim) => (
                                        <tr key={claim.id} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4 font-mono text-sm">{claim.id}</td>
                                            <td className="py-3 px-4">{claim.claimant}</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">{claim.vehicle}</td>
                                            <td className="py-3 px-4 text-sm">{claim.date}</td>
                                            <td className="py-3 px-4">
                                                <Badge variant={claim.status === "Approved" ? "success" : "destructive"}>
                                                    {claim.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge
                                                    variant={
                                                        claim.vision.fraudRisk === "Low" ? "secondary" :
                                                            claim.vision.fraudRisk === "High" ? "destructive" : "default"
                                                    }
                                                >
                                                    {claim.vision.fraudRisk}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 font-semibold">{claim.trust.estimatedCost}</td>
                                            <td className="py-3 px-4">
                                                <Link href={`/admin/claims/${claim.id}`}>
                                                    <button className="flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm">
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ label, value, color }) {
    const colorClasses = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        red: "bg-red-500",
        purple: "bg-purple-500",
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center`}>
                        <span className="text-white text-xl font-bold">{typeof value === 'number' ? value : '✓'}</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
