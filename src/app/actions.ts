"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "dummy_key";
const genAI = new GoogleGenerativeAI(apiKey);

export async function askAiMentor(question: string) {
    if (apiKey === "dummy_key" || !apiKey) {
        // Return a mocked response if no key is set to ensure UI works
        await new Promise(resolve => setTimeout(resolve, 1500));
        return "Nayan has mastered Next.js 16 Partial Prerendering, spatial 3D architecture integrating Spline with DOM elements via Framer Motion, and agentic integrations using Gemini 1.5 Pro over the last 30 days.";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Inject system instructions directly here.
        const prompt = `You are Nayan's AI Mentor and an enthusiastic guide to his portfolio.
Context about Nayan's journey over the last 30 days:
- Mastered Next.js 16 Partial Prerendering and Server Actions
- Built spatial computing hero components using Spline and Framer Motion
- Integrated context-aware generative AI with Gemini 1.5 Pro

Keep your answer under 3 sentences, professional yet engaging. 
Visitor Question: ${question}`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI Mentor Error:", error);
        return "I am currently undergoing memory upgrades. Please try again soon.";
    }
}
