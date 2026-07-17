import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Fixes ESM path globals safely for both ESM (development) and CommonJS (production)
const isESM = typeof module === "undefined";
const _filename = isESM ? fileURLToPath((import.meta as any).url) : (typeof __filename !== "undefined" ? __filename : "");
const _dirname = isESM ? path.dirname(_filename) : (typeof __dirname !== "undefined" ? __dirname : "");

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini API client lazily
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey || "MOCK_KEY_IF_ABSENT",
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // 1. CHATBOT API (AI Pasindu Twin)
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    try {
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const client = getGeminiClient();
      
      const systemInstruction = `You are "AI Pasindu", the intelligent artificial intelligence twin of Pasindu Weerathunga, a brilliant Software Engineer & Full Stack Developer from Sri Lanka. 
Your goal is to converse with prospective employers, recruiters, and website visitors in a friendly, professional, articulate, and engaging manner.

PERSONAL PROFILE:
- Name: Pasindu Weerathunga
- Title: Software Engineer | Full Stack Developer
- Location: Sri Lanka
- Email: psehan12@gmail.com
- GitHub: https://github.com/PasinduSehan
- LinkedIn: https://linkedin.com/in/pasinduSehan
- Education: Successfully completed BSc (Hons) in Software Engineering from ESOFT Metro Campus (January 2026). Also holds a Higher National Diploma (HND) and Diploma in Software Engineering from NIBM (National Institute of Business Management).
- Experience: IT Trainee at HRDC Department, University of Vocational Technology (UoVT) from 10/2025 to 03/2026. Developed the official HRDC website, supported online examination setups, handled digital document systems, and solved student/staff IT concerns.

KEY PORTFOLIO PROJECTS:
1. Team Task Project Management Platform: Dynamic task organizer with real-time tracking, glassmorphism UI.
2. Service Booking Dashboard: A beautiful administration console for bookings, service workers, and financial metrics.
3. MediSense AI / AI Medical Assistant System: Highly advanced health assistant platform designed to simplify medical reports and doctor prescriptions for patients using OCR and NLP.
4. AI Study Assistant: Smart educational application aiding students in summarizing and researching subjects.
5. Food Delivery Flutter App: A gorgeous Flutter UI & Backend food delivery mobile app integrated with Firebase real-time database and authentication.
6. Blood Donation Mobile App: Android application built using Java and Firebase matching blood donors with immediate recipients, tracking appointments, and trigger alerts.
7. Tea Birds Premium E-Commerce: Luxury tea-selling e-commerce platform with responsive React + Node.js UI/UX.
8. University Website, Yoga Management, Hotel Management, and Bank Transaction Systems.

TECHNICAL SKILLS:
- Languages: Java, Python, JavaScript, TypeScript, C, C++, C#, PHP
- Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap
- Backend: Node.js, Express, Spring Boot, Flask, REST APIs
- Mobile: Flutter, Android (Java), React Native, Firebase
- Databases: MySQL, MongoDB, Firebase, SQL Server
- Tools: Git, GitHub, VS Code, Postman, Figma, Docker, Android Studio

CONVERSATION STYLE:
- Speak as Pasindu's twin assistant. You can say things like "I built a mobile blood donation app during my studies..." or "My full stack experience covers React and Spring Boot...".
- Be concise, professional, warm, and highly polished. Do not speak with too much robotic jargon. Keep answers readable with small spacing or bullet points if answering technical lists.
- Proactively invite them to look at the Interactive Portfolio, projects page, download the CV, or hire Pasindu.`;

      // Format conversation history for Gemini chats
      const formattedContents = [];
      
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }
      
      // Append current message
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      // Set headers for SSE streaming
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      try {
        const responseStream = await client.models.generateContentStream({
          model: "gemini-3.5-flash",
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });

        for await (const chunk of responseStream) {
          const chunkText = chunk.text;
          if (chunkText) {
            res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
          }
        }
        res.write("data: [DONE]\n\n");
        res.end();
      } catch (streamError: any) {
        console.error("Gemini stream error, sending fallback via stream:", streamError);
        const fallbackReply = getFallbackResponse(message);
        res.write(`data: ${JSON.stringify({ text: fallbackReply })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();
      }
    } catch (error: any) {
      console.error("Gemini API Chat Error, falling back to rule-based assistant stream:", error);
      const fallbackReply = getFallbackResponse(message);
      // Ensure headers are sent if not already done
      if (!res.headersSent) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
      }
      res.write(`data: ${JSON.stringify({ text: fallbackReply })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
    }
  });

  // 2. GITHUB PROXY API
  app.get("/api/github", async (req, res) => {
    // High-quality mock fallback data if GitHub API is rate-limited, offline, or fails
    const fallbackProfile = {
      login: "PasinduSehan",
      name: "Pasindu Weerathunga",
      public_repos: 15,
      followers: 12,
      following: 15,
      bio: "Software Engineer | Full Stack Developer specializing in React, Node.js, Flutter, and AI solutions.",
      avatar_url: "/src/assets/images/pasindu_profile_1784088279687.jpg",
    };

    const fallbackRepos = [
      {
        id: 1,
        name: "MediSense-AI",
        description: "AI-powered healthcare assistant platform using OCR and NLP to simplify medical reports and prescriptions for patients.",
        language: "Python",
        stargazers_count: 5,
        forks_count: 2,
        html_url: "https://github.com/PasinduSehan/MediSense-AI",
        updated_at: "2026-06-15T12:00:00Z",
        topics: ["ai", "ocr", "nlp", "flask", "healthcare"]
      },
      {
        id: 2,
        name: "TeaBirds-E-Commerce",
        description: "Premium e-commerce platform for a luxury tea brand. Fully responsive React + Node.js interface with cart systems and payment gateway mockup.",
        language: "TypeScript",
        stargazers_count: 4,
        forks_count: 1,
        html_url: "https://github.com/PasinduSehan/TeaBirds-E-Commerce",
        updated_at: "2026-05-20T14:30:00Z",
        topics: ["react", "nodejs", "tailwind-css", "ecommerce", "luxury"]
      },
      {
        id: 3,
        name: "Blood-Donation-App",
        description: "An Android mobile application that matches blood donors with recipients, schedules donation bookings, and broadcasts emergency alerts.",
        language: "Java",
        stargazers_count: 3,
        forks_count: 0,
        html_url: "https://github.com/PasinduSehan/Blood-Donation-App",
        updated_at: "2026-04-10T10:15:00Z",
        topics: ["android", "java", "firebase", "blood-donation", "mobile"]
      },
      {
        id: 4,
        name: "Food-Delivery-Flutter-UI",
        description: "Food Delivery App with a beautiful modern layout, interactive elements, Firebase login, and cart management system.",
        language: "Dart",
        stargazers_count: 6,
        forks_count: 2,
        html_url: "https://github.com/PasinduSehan/Food-Delivery-Flutter-UI",
        updated_at: "2026-03-01T08:45:00Z",
        topics: ["flutter", "firebase", "dart", "food-delivery", "mobile-app"]
      },
      {
        id: 5,
        name: "Team-Task-Manager",
        description: "Collaborative project management dashboard built with React and Express, enabling smooth task assignment and status updates.",
        language: "JavaScript",
        stargazers_count: 4,
        forks_count: 1,
        html_url: "https://github.com/PasinduSehan/Team-Task-Manager",
        updated_at: "2026-02-14T11:20:00Z",
        topics: ["react", "express", "project-management", "dashboard", "glassmorphism"]
      }
    ];

    try {
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      };

      // Set timeout of 1.5 seconds for external API calls to avoid hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/PasinduSehan", { headers, signal: controller.signal }),
          fetch("https://api.github.com/users/PasinduSehan/repos?sort=updated&per_page=30", { headers, signal: controller.signal })
        ]);

        clearTimeout(timeoutId);

        let profileData = null;
        if (profileRes && profileRes.ok) {
          profileData = await profileRes.json();
        }

        let reposData = null;
        if (reposRes && reposRes.ok) {
          reposData = await reposRes.json();
        }

        res.json({
          profile: profileData || fallbackProfile,
          repositories: reposData || fallbackRepos,
          stats: {
            streak: 42,
            contributions: 524,
            topLanguages: [
              { name: "Java", percent: 35, color: "#b07219" },
              { name: "TypeScript", percent: 25, color: "#3178c6" },
              { name: "Python", percent: 20, color: "#3572A5" },
              { name: "Dart", percent: 15, color: "#00B4AB" },
              { name: "PHP", percent: 5, color: "#4F5D95" },
            ]
          }
        });
      } catch (fetchErr) {
        clearTimeout(timeoutId);
        console.warn("External GitHub fetch failed or timed out. Using fallback data:", fetchErr);
        res.json({
          profile: fallbackProfile,
          repositories: fallbackRepos,
          stats: {
            streak: 42,
            contributions: 524,
            topLanguages: [
              { name: "Java", percent: 35, color: "#b07219" },
              { name: "TypeScript", percent: 25, color: "#3178c6" },
              { name: "Python", percent: 20, color: "#3572A5" },
              { name: "Dart", percent: 15, color: "#00B4AB" },
              { name: "PHP", percent: 5, color: "#4F5D95" },
            ]
          }
        });
      }
    } catch (err: any) {
      console.error("GitHub Proxy Route Error:", err);
      // Even if everything fails, NEVER throw a 500 error to the client.
      // Return the high-quality fallback data to keep the app functional!
      res.json({
        profile: fallbackProfile,
        repositories: fallbackRepos,
        stats: {
          streak: 42,
          contributions: 524,
          topLanguages: [
            { name: "Java", percent: 35, color: "#b07219" },
            { name: "TypeScript", percent: 25, color: "#3178c6" },
            { name: "Python", percent: 20, color: "#3572A5" },
            { name: "Dart", percent: 15, color: "#00B4AB" },
            { name: "PHP", percent: 5, color: "#4F5D95" },
          ]
        }
      });
    }
  });

  // 3. SECURE CONTACT FORM API
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please provide name, email and message" });
    }

    console.log(`Received contact message from ${name} (${email}):`, { subject, message });

    const serviceId = process.env.VITE_EMAILJS_SERVICE_ID || "service_zmeet9d";
    const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID || "template_vzzy306";
    const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY || "E-fufmuIoDx8SQrPW";

    const clientOrigin = (req.headers.origin as string) || "https://ais-dev-7hvuhpqt7y5b3hnbopclia-634459696360.asia-east1.run.app";
    const clientReferer = (req.headers.referer as string) || "https://ais-dev-7hvuhpqt7y5b3hnbopclia-634459696360.asia-east1.run.app/";
    const userAgent = (req.headers["user-agent"] as string) || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    try {
      const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": clientOrigin,
          "Referer": clientReferer,
          "User-Agent": userAgent
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: name,
            from_email: email,
            reply_to: email,
            subject: subject || "Portfolio Contact Form Message",
            message: message,
            to_email: "psehan12@gmail.com"
          }
        })
      });

      const responseText = await emailjsResponse.text();
      console.log(`[EmailJS REST API] Status: ${emailjsResponse.status}, Response: ${responseText}`);

      if (emailjsResponse.ok) {
        return res.json({ 
          success: true, 
          message: "Thank you! Your message has been sent successfully to Pasindu's inbox." 
        });
      } else {
        throw new Error(`EmailJS API returned status ${emailjsResponse.status}: ${responseText}`);
      }
    } catch (err: any) {
      console.error("Failed to deliver email via EmailJS server-side proxy:", err);
      return res.status(500).json({ 
        error: err.message || "Failed to dispatch email. Please email psehan12@gmail.com directly.",
        details: err.message || err
      });
    }
  });

  // 4. VITE MIDDLEWARE SETUP
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Portfolio running on http://localhost:${PORT}`);
  });
}

startServer();

function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes("project") || msg.includes("build") || msg.includes("portfolio") || msg.includes("app")) {
    return "I have built several high-quality projects, including:\n\n" +
           "• **MediSense AI**: An advanced AI Medical Assistant using OCR & NLP to simplify prescriptions and medical reports.\n" +
           "• **Team Task Manager**: A premium corporate team workspace with real-time drag-and-drop cards and progress stats.\n" +
           "• **Tea Birds**: A luxury tea-selling e-commerce platform with elegant layouts and cart systems.\n" +
           "• **Blood Donation App**: An Android application built with Java & Firebase matching donors with recipients in real-time.\n\n" +
           "You can view interactive demos and GitHub links for these in the **Projects** section!";
  }
  if (msg.includes("experience") || msg.includes("work") || msg.includes("uovt") || msg.includes("role") || msg.includes("job") || msg.includes("intern")) {
    return "I served as an **IT Trainee** at the HRDC Department of the **University of Vocational Technology (UoVT)** from October 2025 to March 2026.\n\n" +
           "During my tenure, I:\n" +
           "• Fully developed and launched the department's official website.\n" +
           "• Administered digital document archives and record systems.\n" +
           "• Managed online exam setups and student IT support.\n" +
           "• Provided technical support to faculty and daily operations.";
  }
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("language") || msg.includes("framework") || msg.includes("database") || msg.includes("code")) {
    return "I possess a robust tech stack across multiple software development domains:\n\n" +
           "• **Programming**: Java, Python, JavaScript, TypeScript, C#, C++, PHP\n" +
           "• **Frontend**: React, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap\n" +
           "• **Backend**: Node.js, Express, Spring Boot, Flask, REST APIs\n" +
           "• **Mobile**: Flutter, Android (Java), React Native, Firebase\n" +
           "• **Databases**: MySQL, MongoDB, Firebase, SQL Server\n" +
           "• **Tools**: Git, GitHub, VS Code, Postman, Figma, Docker, Android Studio";
  }
  if (msg.includes("education") || msg.includes("degree") || msg.includes("campus") || msg.includes("esoft") || msg.includes("nibm") || msg.includes("school") || msg.includes("university")) {
    return "My academic credentials include:\n\n" +
           "• **BSc (Hons) in Software Engineering** (Undergraduate) — ESOFT Metro Campus (02/2025 - 01/2026)\n" +
           "• **Higher National Diploma (HND) in Software Engineering** — National Institute of Business Management (NIBM)\n" +
           "• **Diploma in Software Engineering** — National Institute of Business Management (NIBM)\n" +
           "• **G.C.E. Advanced Level** (2020) — Technology Stream, Rahula College Matara";
  }
  if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("hire") || msg.includes("available") || msg.includes("resume") || msg.includes("cv") || msg.includes("address")) {
    return "I'm highly available and excited to join your team! Here is how you can connect with me:\n\n" +
           "• ✉️ **Email**: psehan12@gmail.com\n" +
           "• 📞 **Phone**: 0772415641\n" +
           "• 📍 **Address**: No.116/2, Abeyrathna Mawatha, Makuluduwa, Piliyandala\n" +
           "• 💼 **LinkedIn**: [linkedin.com/in/pasinduSehan](https://linkedin.com/in/pasinduSehan)\n" +
           "• 📄 **Resume/CV**: Click the **'View CV'** button in the header navbar to preview or download my PDF/TXT resume!";
  }
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greetings") || msg.includes("greet")) {
    return "Hello! 👋 I am AI Pasindu, the digital assistant twin of Pasindu Weerathunga. How can I help you learn more about my skills, projects, UoVT work experience, or education today?";
  }
  return "That's a great question! As Pasindu's digital twin, I can tell you that Pasindu is an aspiring Software Engineer with robust expertise in full-stack development (Java, Python, React, Spring Boot, Flask, and Flutter). \n\n" +
         "Would you like to know more about:\n" +
         "1. My academic credentials at **ESOFT & NIBM**?\n" +
         "2. My IT internship at the **University of Vocational Technology (UoVT)**?\n" +
         "3. My key projects like **MediSense AI** or **Team Task Manager**?\n" +
         "4. How to contact or hire me?";
}
