import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will use mock data.");
}

const genAI = new GoogleGenerativeAI(apiKey || "mock_key");

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });
export const visionModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
