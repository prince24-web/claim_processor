"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">ClaimAI</span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/claim">
              <Button>Start Request Link</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Insurance Claims, <span className="text-gray-500">Solved in Seconds.</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Experience the future of insurance. Our Multi-Agent AI analyzes damage, verifies policy, and estimates costs instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/claim">
            <Button size="lg" className="h-12 px-8 text-lg gap-2">
              Start New Claim <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container py-12 md:py-24 lg:py-32 bg-gray-50/50 rounded-3xl mb-24">
        <div className="grid gap-8 px-4 md:grid-cols-3 md:px-8">
          <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-2xl shadow-sm border">
            <div className="p-3 bg-primary/5 rounded-full">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Instant Processing</h3>
            <p className="text-gray-500">
              No more waiting weeks. Get an initial decision and estimate in under 60 seconds.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-2xl shadow-sm border">
            <div className="p-3 bg-primary/5 rounded-full">
              <BrainCircuit className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">AI-Powered Accuracy</h3>
            <p className="text-gray-500">
              Computer vision analyzes damage severity while NLP explains the policy terms.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-2xl shadow-sm border">
            <div className="p-3 bg-primary/5 rounded-full">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Fair & Transparent</h3>
            <p className="text-gray-500">
              Every decision comes with a detailed explanation and audit trail.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            Built for the Hackathon. Powered by Gemini.
          </p>
        </div>
      </footer>
    </main>
  );
}
