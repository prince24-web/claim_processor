import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will use mock data.");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Using Gemini 1.5 Flash - faster and more cost-effective for these tasks
export const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview" });
export const visionModel = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
