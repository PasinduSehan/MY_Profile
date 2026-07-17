export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const fallbackProfile = {
    login: "PasinduSehan",
    name: "Pasindu Weerathunga",
    public_repos: 15,
    followers: 12,
    following: 15,
    bio: "Software Engineer | Full Stack Developer specializing in React, Node.js, Flutter, and AI solutions.",
    avatar_url: "/pasindu_profile_1784088279687.jpg",
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
      topics: ["ai", "ocr", "nlp", "flask", "healthcare"],
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
      topics: ["react", "nodejs", "tailwind-css", "ecommerce", "luxury"],
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
      topics: ["android", "java", "firebase", "blood-donation", "mobile"],
    },
  ];

  return res.status(200).json({
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
      ],
    },
  });
}
