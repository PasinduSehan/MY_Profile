import dotenv from "dotenv";

dotenv.config();

function getFallbackResponse(message: string) {
  const lowered = (message || "").toLowerCase();

  if (lowered.includes("cv") || lowered.includes("resume")) {
    return "You can view and download the CV from the portfolio interface. I can also help you learn more about Pasindu's experience and projects.";
  }

  if (lowered.includes("project") || lowered.includes("portfolio")) {
    return "Pasindu has worked on projects like MediSense AI, Team Task Management, Tea Birds E-Commerce, and a Blood Donation mobile app. These projects span AI, web apps, and mobile development.";
  }

  if (lowered.includes("skill") || lowered.includes("tech")) {
    return "His skills include React, TypeScript, Node.js, Express, Java, Python, Flutter, Tailwind CSS, SQL, and modern full-stack development practices.";
  }

  return "Hello! I’m the AI assistant for this portfolio. I can help you learn about Pasindu’s experience, projects, skills, and contact details.";
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history = [] } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ text: getFallbackResponse(message) });
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const client = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are a friendly AI assistant for Pasindu Weerathunga's portfolio. Help visitors understand his skills, experience, projects, and availability.`;

    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    for (const turn of history) {
      if (turn?.role && turn?.text) {
        formattedContents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: String(turn.text) }],
        });
      }
    }

    formattedContents.push({ role: "user", parts: [{ text: message }] });

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response?.text || getFallbackResponse(message);
    return res.status(200).json({ text });
  } catch (error) {
    console.error("Vercel chat error", error);
    return res.status(200).json({ text: getFallbackResponse(message) });
  }
}
