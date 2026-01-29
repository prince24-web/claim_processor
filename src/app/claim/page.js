"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, Car, AlertCircle, FileText, CheckCircle2, X } from "lucide-react";

export default function ClaimPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        description: "",
        make: "",
        model: "",
        year: "",
    });
    const [results, setResults] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        setStep(2); // Move to processing
        setLoading(true);

        // TODO: Connect to Real Backend
        try {
            const response = await fetch('/api/process-claim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, image }),
            });
            const data = await response.json();
            setResults(data);
            setStep(3); // Move to results
        } catch (error) {
            console.error("Error processing claim:", error);
            // Fallback for demo if API fails
            setTimeout(() => {
                setResults({
                    decision: "Approved",
                    explanation: "Based on the visual evidence and policy #1234, the damage is consistent with the described accident. Coverage applies.",
                    estimatedCost: "₦150,000",
                    fraudRisk: "Low",
                });
                setStep(3);
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Card className="shadow-lg border-none">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Submit Your Claim</CardTitle>
                                    <CardDescription>
                                        Provide details and a photo of the damage. AI will analyze it instantly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Vehicle Details */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Vehicle Make</Label>
                                            <Input
                                                placeholder="Toyota"
                                                value={formData.make}
                                                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Model</Label>
                                            <Input
                                                placeholder="Camry"
                                                value={formData.model}
                                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label>Accident Description</Label>
                                        <Textarea
                                            placeholder="Describe what happened..."
                                            className="min-h-[100px]"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div className="space-y-2">
                                        <Label>Damage Photo</Label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                        {image ? (
                                            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    onClick={() => setImage(null)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                                                    type="button"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors"
                                            >
                                                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">Click to upload damage photo</p>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                            </div>
                                        )}
                                    </div>

                                    <Button className="w-full h-12 text-lg" onClick={handleSubmit} disabled={!image}>
                                        Process Claim with AI
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="flex flex-col items-center space-y-8"
                        >
                            <Card className="w-full shadow-lg p-8 text-center space-y-6">
                                <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                                </div>
                                <h2 className="text-2xl font-bold">AI Agents at Work</h2>
                                <div className="space-y-4 text-left max-w-md mx-auto">
                                    <ProcessingStep label="Ingesting Incident Data..." delay={0} />
                                    <ProcessingStep label="Vision Agent Analyzing Damage..." delay={1.5} />
                                    <ProcessingStep label="Checking Policy Coverage..." delay={3} />
                                    <ProcessingStep label="Estimating Repair Costs..." delay={4.5} />
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {step === 3 && results && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="shadow-lg border-none overflow-hidden">
                                <div className={`p-6 text-white ${results.decision === 'Approved' ? 'bg-green-600' : 'bg-red-600'}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        {results.decision === 'Approved' ? <CheckCircle2 className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
                                        <h1 className="text-3xl font-bold">{results.decision}</h1>
                                    </div>
                                    <p className="opacity-90">{results.explanation}</p>
                                </div>
                                <CardContent className="p-6 grid gap-6 md:grid-cols-2">
                                    <ResultBox label="Estimated Cost" value={results.estimatedCost} icon={<Car className="h-5 w-5" />} />
                                    <ResultBox label="Fraud Risk Score" value={results.fraudRisk} icon={<ShieldCheckIcon />} />
                                </CardContent>
                                <div className="p-6 bg-gray-50 border-t flex justify-end">
                                    <Button variant="outline" onClick={() => setStep(1)}>Submit Another Claim</Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ProcessingStep({ label, delay }) {
    return (
        <motion.div
            className="flex items-center gap-3 text-gray-600"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className="h-3 w-3 bg-primary rounded-full animate-pulse" />
            <span>{label}</span>
        </motion.div>
    )
}

function ResultBox({ label, value, icon }) {
    return (
        <div className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
            <div className="text-primary opacity-50">{icon}</div>
        </div>
    )
}

function ShieldCheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
    )
}
