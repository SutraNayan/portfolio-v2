# Nayan | Spatial Storytelling Portfolio (V2)

Welcome to the Elite Tier V2 upgrade of my personal portfolio. This space is engineered for maximum performance, featuring a brutalist, spatial-computing aesthetic with advanced front-end technologies.

## Technology Stack & Architecture
- **Framework & Edge Integration:** Next.js 16 (Turbopack, Partial Prerendering, Edge Functions).
- **Motion & Typography:** GSAP 120fps ScrollTriggers powering deep scroll parallax, alongside mathematical CSS fluid typography using `clamp()`.
- **Spatial Aesthetics:** Spline for high-fidelity 3D modeling and `@react-three/fiber` mapping WebGL distortion shaders to scroll velocity.
- **Agentic Generative AI:** Custom, zero-dependency `ReadableStream` Edge functions streaming Gemini 1.5 Pro insights with zero lag directly into the DOM.

## Live Deployment
The portfolio is deployed to Vercel for edge-network latency optimization.
**You can view the live site here (Vercel):** [nayan-portfolio-v2.vercel.app](https://portfolio-v2-nayan.vercel.app/) *(Pending final deployment URL)*

## Getting Started

First, install the necessary dependencies:
```bash
npm install
```

Configure your local environment variables in `.env.local`:
```bash
GEMINI_API_KEY="your-gemini-api-key"
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
