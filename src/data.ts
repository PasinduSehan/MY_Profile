import { Project, ExperienceItem, EducationItem, CertificateItem, ServiceItem, Skill } from "./types";

export const PERSONAL_DETAILS = {
  name: "Pasindu Weerathunga",
  title: "Software Engineer | Full Stack Developer",
  location: "Sri Lanka",
  email: "psehan12@gmail.com",
  phone: "0772415641",
  address: "No.116/2, Abeyrathna Mawatha, Makuluduwa, Piliyandala",
  github: "https://github.com/PasinduSehan",
  linkedin: "https://linkedin.com/in/pasinduSehan",
  bio: "I am a Software Engineer passionate about Full Stack Development, Artificial Intelligence, Mobile Development, Cloud Technologies and Modern Web Applications. I enjoy solving real-world problems by designing scalable software solutions with clean architecture. I continuously learn modern technologies and enjoy creating professional software products with excellent UI/UX.",
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Full Stack Development",
    description: "End-to-end development of scalable, secure, and modern web applications from database schemas to polished user interfaces.",
    iconName: "Cpu",
    colorClass: "from-indigo-500 to-purple-600"
  },
  {
    title: "Frontend Development",
    description: "Crafting highly performant, accessible, interactive, and responsive web applications with immersive animations and 3D effects.",
    iconName: "Code2",
    colorClass: "from-blue-500 to-cyan-500"
  },
  {
    title: "Backend Development",
    description: "Designing robust server-side architectures, REST APIs, GraphQL endpoints, and caching systems using Node.js and Spring Boot.",
    iconName: "Server",
    colorClass: "from-purple-500 to-pink-500"
  },
  {
    title: "Mobile App Development",
    description: "Building premium cross-platform and native mobile apps with seamless performance, offline state, and notifications.",
    iconName: "Smartphone",
    colorClass: "from-cyan-500 to-teal-500"
  },
  {
    title: "AI & NLP Integration",
    description: "Integrating LLMs (like Gemini), designing intelligent document parsers, optical character recognition (OCR), and conversational chatbots.",
    iconName: "Brain",
    colorClass: "from-emerald-500 to-teal-500"
  },
  {
    title: "REST API Development",
    description: "Developing structured, clean-documented, secure, and high-throughput APIs following REST best-practices and OpenAPI specifications.",
    iconName: "GitMerge",
    colorClass: "from-orange-500 to-red-500"
  },
  {
    title: "Database Design",
    description: "Structuring fast-querying relational and non-relational database schemas including MySQL, MongoDB, and SQL Server.",
    iconName: "Database",
    colorClass: "from-teal-500 to-emerald-500"
  },
  {
    title: "UI/UX Development",
    description: "Translating sophisticated designer mockups into pixel-perfect web interfaces with tailored micro-interactions and sleek aesthetics.",
    iconName: "Palette",
    colorClass: "from-pink-500 to-rose-500"
  },
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    role: "IT Trainee (HRDC Department)",
    company: "University of Vocational Technology (UoVT)",
    location: "Sri Lanka",
    period: "10/2025 - 03/2026",
    responsibilities: [
      "Developed and successfully launched the official HRDC Department website, modernizing their digital presence.",
      "Assisted with department document handling and pioneered a digital record-management workflow.",
      "Supported online examination processes, including technical setup, student guidance, and platform stability.",
      "Provided on-site and remote IT technical support to university staff and students during daily operations.",
      "Assisted with university server maintenance and network troubleshooting."
    ]
  }
];

export const ORGANIZATION_EXPERIENCE: ExperienceItem[] = [
  {
    role: "Founding Core Member",
    company: "Back Birds Group",
    location: "Sri Lanka",
    period: "2024 - Present",
    responsibilities: [
      "Active member of the Back Birds Group community organization."
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "BSc (Hons) in Software Engineering",
    institution: "ESOFT Metro Campus (Affiliated with London Metropolitan University)",
    period: "02/2025 - 01/2026",
    details: "Successfully completed BSc (Hons) in Software Engineering, focusing on advanced software architectures, software quality assurance, cloud infrastructure, and AI technologies."
  },
  {
    degree: "Higher National Diploma (HND) in Software Engineering",
    institution: "National Institute of Business Management (NIBM)",
    period: "2023 - 2024",
    details: "Comprehensive study of object-oriented concepts, system modeling, database design, and mobile app programming."
  },
  {
    degree: "Diploma in Software Engineering",
    institution: "National Institute of Business Management (NIBM)",
    period: "2022 - 2023",
    details: "Foundational training in programming languages (C, Java), web design (HTML, CSS, JS), and computer science principles."
  },
  {
    degree: "G.C.E. Advanced Level (Technology Stream)",
    institution: "Rahula College, Matara",
    period: "Completed 2020",
    details: "Focused on Information and Communication Technology, Engineering Technology, and Science."
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    title: "Flutter for Beginners",
    issuer: "ZERO2LEARN",
    credentialId: "679f8cf801b7ceff42394ee4",
    issuedDate: "2024",
    verifyUrl: "#",
    iconName: "smartphone"
  },
  {
    title: "Diploma in Spoken English",
    issuer: "British Way English Academy",
    issuedDate: "2023",
    verifyUrl: "#",
    iconName: "award"
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issuedDate: "December 19, 2023",
    verifyUrl: "#",
    iconName: "lock"
  },
  {
    title: "Python for Beginners",
    issuer: "Open Learning Platform (University of Moratuwa)",
    credentialId: "nTjhrkDJQB",
    issuedDate: "November 24, 2022",
    verifyUrl: "#",
    iconName: "code"
  },
  {
    title: "Python Programming",
    issuer: "Open Learning Platform (University of Moratuwa)",
    credentialId: "3zgh9DV5Be",
    issuedDate: "2022",
    verifyUrl: "#",
    iconName: "terminal"
  },
  {
    title: "API Testing with Postman - A Beginner's Guide",
    issuer: "Learnfi Learning",
    issuedDate: "2023",
    verifyUrl: "#",
    iconName: "check-circle"
  },
  {
    title: "Human Resource Management Certificate Course (Foundation Level)",
    issuer: "NIBM",
    issuedDate: "October 10, 2024",
    verifyUrl: "#",
    iconName: "users"
  },
  {
    title: "Business Management & Marketing Certificate Course (Foundation Level)",
    issuer: "NIBM",
    issuedDate: "October 10, 2024",
    verifyUrl: "#",
    iconName: "trending-up"
  }
];

export const SKILLS: Skill[] = [
  // Programming
  { name: "Java", level: 70, category: "Programming" },
  { name: "Python", level: 85, category: "Programming" },
  { name: "JavaScript", level: 88, category: "Programming" },
  { name: "TypeScript", level: 82, category: "Programming" },
  { name: "C#", level: 65, category: "Programming" },
  { name: "C++", level: 70, category: "Programming" },
  { name: "C", level: 75, category: "Programming" },
  { name: "PHP", level: 78, category: "Programming" },

  // Frontend
  { name: "React", level: 88, category: "Frontend" },
  { name: "HTML5", level: 85, category: "Frontend" },
  { name: "CSS3", level: 63, category: "Frontend" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },
  { name: "Bootstrap", level: 85, category: "Frontend" },
  { name: "Next.js", level: 75, category: "Frontend" },

  // Backend
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Express.js", level: 88, category: "Backend" },
  { name: "Spring Boot", level: 80, category: "Backend" },
  { name: "Flask", level: 78, category: "Backend" },
  { name: "REST API", level: 90, category: "Backend" },

  // Mobile & Cloud
  { name: "Flutter", level: 85, category: "Mobile" },
  { name: "React Native", level: 75, category: "Mobile" },
  { name: "Android Java", level: 80, category: "Mobile" },

  // Databases
  { name: "MySQL", level: 88, category: "Database" },
  { name: "MongoDB", level: 80, category: "Database" },
  { name: "SQL Server", level: 55, category: "Database" },

  // Tools
  { name: "Git & GitHub", level: 90, category: "Tools" },
  { name: "VS Code", level: 95, category: "Tools" },
  { name: "Postman", level: 92, category: "Tools" },
  { name: "Docker", level: 40, category: "Tools" },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    title: "MediSense AI",
    description: "Advanced AI Medical Assistant System built to revolutionize how patients understand their health data. It parses complex medical diagnostic reports and doctor handwritings using Optical Character Recognition (OCR) and leverages Natural Language Processing (NLP) to explain symptoms, clinical abbreviations, and doctor prescriptions in highly comprehensive, layman terms.",
    technologies: ["Python", "Flask", "OCR Engine", "NLP", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/PasinduSehan/MediSense-AI",
    featured: true,
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    details: "MediSense AI simplifies complex doctor-written prescriptions and clinical documents into plain language, helping users avoid medication errors and understand health indicators."
  },
  {
    title: "Team Task Management Platform",
    description: "An elegant, premium corporate team collaboration suite designed with modern glassmorphic and neumorphic elements. It supports real-time task drag-and-drop, workspace creation, progress statistics, automatic notifications, and file attachments, empowering teams with highly interactive tools to monitor project lifecycles.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/PasinduSehan/Team-Task-Manager",
    featured: true,
    category: "Web",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    details: "Features a fully interactive Gantt chart, Kanban board with drag-and-drop mechanics, automated task aging alerts, and granular permissions systems."
  },
  {
    title: "Tea Birds Premium E-Commerce Website",
    description: "A luxury online boutique tea-selling platform featuring custom animated UI/UX. Crafted with responsive layouts, smooth hover details, full cart persistence, and dynamic filters, allowing high-profile tea enthusiasts to purchase artisan Sri Lankan tea blends seamlessly.",
    technologies: ["React", "JavaScript", "Node.js", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/PasinduSehan/TeaBirds-E-Commerce",
    featured: true,
    category: "Web",
    thumbnail: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    details: "Designed with a minimalist Vercel/Stripe-like aesthetic. Integrates stateful cart systems, dynamic product variations, sorting mechanisms, and secure-looking checkout mocks."
  },
  {
    title: "Blood Donation Mobile App",
    description: "A life-saving, serverless-backed Android application engineered to solve critical blood shortage emergencies. It allows immediate matching between blood seekers and eligible donors based on location, maps out coordinates, schedules booking sessions, and triggers instant push notifications during high-priority emergencies.",
    technologies: ["Android Java", "Firebase Auth", "Firestore", "Google Maps SDK", "XML"],
    githubUrl: "https://github.com/PasinduSehan/Blood-Donation-App",
    featured: true,
    category: "Mobile",
    thumbnail: "https://redbloodapp.com/images/screenshot-6.png",
    details: "Matches donors in real-time, features map navigation for donation centers, schedules booking slots, and sends warning broadcasts."
  },
  {
    title: "AI Study Assistant",
    description: "Smart educational companion tool. Features automatic study guide generators, real-time code snippet explainers, flashcard creators, and research summaries, giving students immediate conceptual clarity on complex computer science subjects.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Node.js"],
    githubUrl: "https://github.com/PasinduSehan",
    featured: true,
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    details: "Helps computer science students research and simplify algorithmic theories, generating notes and quizzes automatically."
  },
  {
    title: "Service Booking Dashboard",
    description: "Highly intuitive administrative console constructed for service-oriented businesses. Leverages dynamic charts and complex analytics tables to monitor business earnings, team bookings, employee tasks, and customer feedback graphs.",
    technologies: ["React", "TypeScript", "Vite", "Recharts", "Tailwind CSS"],
    githubUrl: "https://github.com/PasinduSehan",
    featured: true,
    category: "Web",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    details: "Features rich visual data displays tracking customer satisfaction, monthly booking density, and real-time support tickets."
  },
  {
    title: "Food Delivery Flutter App",
    description: "A premium cross-platform mobile app designed with rich animations and a responsive backend. Supports instant item selection, search queries, real-time order tracking, Firebase authentication, and profile settings.",
    technologies: ["Flutter", "Dart", "Firebase", "Firestore", "Google Maps API"],
    githubUrl: "https://github.com/PasinduSehan/Food-Delivery-Flutter-UI",
    featured: true,
    category: "Mobile",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    details: "Engineered with Flutter's state managers, custom hero transitions, structured Firestore collections, and responsive client-side UI."
  },
  {
    title: "Yoga Management System",
    description: "An elegant enterprise system engineered to handle yoga studios. Includes comprehensive CRUD operations to coordinate yoga sessions, assign expert trainers, collect client payments, and track monthly studio logs.",
    technologies: ["C#", "ASP.NET MVC", "SQL Server", "Bootstrap", "Entity Framework"],
    githubUrl: "https://github.com/PasinduSehan/Yoga-Management-System",
    featured: false,
    category: "System",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    details: "Supports custom schedules, multi-tier pricing plans, class attendance registries, and automated database logs."
  },
  {
    title: "Hotel Management System",
    description: "A robust Java-based software built to handle high-profile hotel networks. Connects front-desk agents with rooms, tracks real-time occupancy, registers guest records, coordinates housekeeping duties, and logs point-of-sale dining transactions.",
    technologies: ["Java", "MySQL", "JavaFX", "JDBC", "CSS"],
    githubUrl: "https://github.com/PasinduSehan/Hotel-Management-System",
    featured: false,
    category: "System",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    details: "Integrates room booking grids, payment validation, visual checkout sheets, and relational DB persistence."
  },
  {
    title: "Chatbot Web Application",
    description: "A highly responsive Flask-based web assistant built to serve as an intelligent, conversational, and empathetic mental health chatbot. Combines customized Natural Language Toolkit (NLTK) pipelines with extensive local datasets.",
    technologies: ["Python", "Flask", "NLTK", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/PasinduSehan/Chatbot-Web-App",
    featured: false,
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
    details: "Employs custom tokenizers and pattern matching algorithms to offer compassionate conversational responses."
  }
];

export const PROGRAMMING_QUOTES = [
  "“First, solve the problem. Then, write the code.” – John Johnson",
  "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” – Martin Fowler",
  "“Experience is the name everyone gives to their mistakes.” – Oscar Wilde",
  "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
  "“Simplicity is the soul of efficiency.” – Austin Freeman",
  "“Make it work, make it right, make it fast.” – Kent Beck",
  "“Clean code always looks like it was written by someone who cares.” – Michael Feathers",
  "“The best error message is the one that never shows up.” – Thomas Fuchs"
];

export const KEYBOARD_SHORTCUTS = [
  { keys: ["G", "H"], action: "Navigate to Home" },
  { keys: ["G", "A"], action: "Navigate to About" },
  { keys: ["G", "E"], action: "Navigate to Experience" },
  { keys: ["G", "S"], action: "Navigate to Skills" },
  { keys: ["G", "P"], action: "Navigate to Projects" },
  { keys: ["G", "C"], action: "Navigate to Contact" },
  { keys: ["T"], action: "Toggle Theme (Light / Dark)" },
  { keys: ["C"], action: "Open Command Palette" },
  { keys: ["A"], action: "Toggle Floating AI Chatbot" },
  { keys: ["Esc"], action: "Close modals / palette" }
];
