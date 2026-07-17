import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

// Color constants
const GREEN_BG = rgb(49 / 255, 67 / 255, 54 / 255); // #314336
const WHITE_BG = rgb(1, 1, 1);
const TEXT_WHITE = rgb(1, 1, 1);
const TEXT_LIGHT_GRAY = rgb(226 / 255, 232 / 255, 240 / 255); // #e2e8f0
const TEXT_MUTED_GRAY = rgb(148 / 255, 163 / 255, 184 / 255); // #94a3b8
const TEXT_DARK_GREEN = rgb(49 / 255, 67 / 255, 54 / 255); // #314336
const TEXT_DARK_BODY = rgb(30 / 255, 41 / 255, 59 / 255); // #1e293b
const TEXT_SLATE_GRAY = rgb(71 / 255, 85 / 255, 105 / 255); // #475569
const BORDER_WHITE_OPACITY = rgb(71 / 255, 85 / 255, 105 / 255);

// Word wrapper helper
function wrapText(text, maxWidth, font, fontSize) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? currentLine + " " + word : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

async function run() {
  const pdfDoc = await PDFDocument.create();

  // Load fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // US Letter size: 612 x 792 points
  const width = 612;
  const height = 792;
  const sidebarWidth = 214.2; // 35%
  const contentWidth = 397.8; // 65%

  const sidebarPadding = 18;
  const contentPadding = 24;

  const leftTextWidth = sidebarWidth - sidebarPadding * 2;
  const rightTextWidth = contentWidth - contentPadding * 2;

  // ==========================================
  // PAGE 1
  // ==========================================
  const page1 = pdfDoc.addPage([width, height]);

  // Page 1 Left Sidebar Background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: sidebarWidth,
    height: height,
    color: GREEN_BG,
  });

  // Name
  page1.drawText("Pasindu", {
    x: sidebarPadding,
    y: 740,
    size: 24,
    font: helveticaBold,
    color: TEXT_WHITE,
  });
  page1.drawText("Weerathunga", {
    x: sidebarPadding,
    y: 712,
    size: 24,
    font: helveticaBold,
    color: TEXT_WHITE,
  });

  // Contacts Block
  let yLeft = 675;
  const contacts = [
    { icon: "E", val: "psehan12@gmail.com" },
    { icon: "P", val: "0772415641" },
    { icon: "A", val: "No.116/2, Abeyrathna Mawatha, Makuluduwa, Piliyandala" },
    { icon: "G", val: "github.com/PasinduSehan" },
    { icon: "L", val: "linkedin.com/in/pasinduSehan" },
  ];

  contacts.forEach((item) => {
    const label = `${item.icon === "E" ? "Email:" : item.icon === "P" ? "Phone:" : item.icon === "A" ? "Addr:" : item.icon === "G" ? "GitHub:" : "LInkd:"} ${item.val}`;
    const wrappedLines = wrapText(label, leftTextWidth, helvetica, 8);
    wrappedLines.forEach((line) => {
      page1.drawText(line, {
        x: sidebarPadding,
        y: yLeft,
        size: 8,
        font: helvetica,
        color: TEXT_LIGHT_GRAY,
      });
      yLeft -= 11;
    });
    yLeft -= 2;
  });

  // Profile Section
  yLeft -= 10;
  page1.drawText("PROFILE", {
    x: sidebarPadding,
    y: yLeft,
    size: 11,
    font: helveticaBold,
    color: TEXT_WHITE,
  });
  page1.drawLine({
    start: { x: sidebarPadding, y: yLeft - 3 },
    end: { x: sidebarWidth - sidebarPadding, y: yLeft - 3 },
    thickness: 0.5,
    color: TEXT_MUTED_GRAY,
  });
  yLeft -= 15;

  const profileText = "Aspiring Software Engineer currently pursuing a degree in Software Engineering, with a strong passion for full-stack development, problem-solving, and emerging technologies. Skilled in building real-world applications using Java, Python, MySQL, Flask, and modern front-end tools. Seeking an internship opportunity to contribute meaningfully while continuing to grow and gain hands-on experience in the software development industry.";
  const wrappedProfile = wrapText(profileText, leftTextWidth, helvetica, 8);
  wrappedProfile.forEach((line) => {
    page1.drawText(line, {
      x: sidebarPadding,
      y: yLeft,
      size: 8,
      font: helvetica,
      color: TEXT_LIGHT_GRAY,
      lineHeight: 11,
    });
    yLeft -= 12;
  });

  // Work Experience (Left Column)
  yLeft -= 15;
  page1.drawText("WORK EXPERIENCE", {
    x: sidebarPadding,
    y: yLeft,
    size: 11,
    font: helveticaBold,
    color: TEXT_WHITE,
  });
  page1.drawLine({
    start: { x: sidebarPadding, y: yLeft - 3 },
    end: { x: sidebarWidth - sidebarPadding, y: yLeft - 3 },
    thickness: 0.5,
    color: TEXT_MUTED_GRAY,
  });
  yLeft -= 15;

  page1.drawText("IT Training, HRDC Dept", {
    x: sidebarPadding,
    y: yLeft,
    size: 9.5,
    font: helveticaBold,
    color: TEXT_WHITE,
  });
  yLeft -= 10;
  page1.drawText("University of Vocational Technology (UoVT)", {
    x: sidebarPadding,
    y: yLeft,
    size: 7.5,
    font: helveticaOblique,
    color: TEXT_LIGHT_GRAY,
  });
  yLeft -= 10;
  page1.drawText("10/2025 - 03/2026", {
    x: sidebarPadding,
    y: yLeft,
    size: 7.5,
    font: helvetica,
    color: TEXT_MUTED_GRAY,
  });
  yLeft -= 12;

  const expBullets = [
    "Developed and implemented the website for the HRDC Department.",
    "Assisted with document handling and digital record management.",
    "Supported online examination processes including setup & student support.",
    "Provided IT support to staff and students during daily operations.",
  ];

  expBullets.forEach((bullet) => {
    const fullText = `* ${bullet}`;
    const wrappedBullet = wrapText(fullText, leftTextWidth, helvetica, 7.5);
    wrappedBullet.forEach((line) => {
      page1.drawText(line, {
        x: sidebarPadding,
        y: yLeft,
        size: 7.5,
        font: helvetica,
        color: TEXT_LIGHT_GRAY,
      });
      yLeft -= 10;
    });
    yLeft -= 2;
  });


  // ==========================================
  // PAGE 1 RIGHT COLUMN
  // ==========================================
  const rightX = sidebarWidth + contentPadding;
  let yRight = 740;

  // Education Title
  page1.drawText("EDUCATION", {
    x: rightX,
    y: yRight,
    size: 12,
    font: helveticaBold,
    color: TEXT_DARK_GREEN,
  });
  page1.drawLine({
    start: { x: rightX, y: yRight - 4 },
    end: { x: width - contentPadding, y: yRight - 4 },
    thickness: 1.5,
    color: GREEN_BG,
  });
  yRight -= 18;

  const eduItems = [
    {
      degree: "BSc (Hons) in Software Engineering - Undergraduate",
      dates: "02/2025 - 01/2026",
      school: "ESOFT Metro Campus (Matara, Sri Lanka)",
    },
    {
      degree: "Higher National Diploma in Software Engineering",
      dates: "02/2023 - 01/2025",
      school: "National Institute of Business Management (NIBM)",
    },
    {
      degree: "Diploma in Software Engineering",
      dates: "02/2022 - 01/2023",
      school: "National Institute of Business Management (NIBM)",
    },
    {
      degree: "G.C.E. Advanced Level (2020) - Technology Stream",
      dates: "2020",
      school: "Rahula College, Matara",
    },
    {
      degree: "G.C.E. Ordinary Level (2017)",
      dates: "2017",
      school: "Thelijjawila Central College",
    },
  ];

  eduItems.forEach((edu) => {
    // Degree title + date on right side if fits
    page1.drawText(edu.degree, {
      x: rightX,
      y: yRight,
      size: 9,
      font: helveticaBold,
      color: TEXT_DARK_BODY,
    });
    const dateWidth = helvetica.widthOfTextAtSize(edu.dates, 7.5);
    page1.drawText(edu.dates, {
      x: width - contentPadding - dateWidth,
      y: yRight,
      size: 7.5,
      font: helvetica,
      color: TEXT_SLATE_GRAY,
    });
    yRight -= 11;

    page1.drawText(edu.school, {
      x: rightX,
      y: yRight,
      size: 8,
      font: helveticaOblique,
      color: TEXT_SLATE_GRAY,
    });
    yRight -= 14;
  });

  // Projects Section
  yRight -= 5;
  page1.drawText("PROJECTS", {
    x: rightX,
    y: yRight,
    size: 12,
    font: helveticaBold,
    color: TEXT_DARK_GREEN,
  });
  page1.drawLine({
    start: { x: rightX, y: yRight - 4 },
    end: { x: width - contentPadding, y: yRight - 4 },
    thickness: 1.5,
    color: GREEN_BG,
  });
  yRight -= 18;

  const p1Projects = [
    {
      title: "Blood Donation Mobile App - Android, Firebase",
      desc: "Developed a mobile app to match donors and recipients. Features include user login, appointment booking, and notification alerts. Tech Stack: Java, Firebase, XML",
    },
    {
      title: "Chatbot Web Application - Flask, NLP",
      desc: "Mental health chatbot using Wikipedia/NLP + local JSON data. Tech Stack: Python, Flask, HTML/CSS/JS, NLTK",
    },
    {
      title: "Bank Transaction Web App - Spring Boot",
      desc: "Built a CRUD app to manage financial transactions. Supports add/edit/delete/view records. Tech Stack: Java, Spring Boot, MySQL",
    },
    {
      title: "Hotel Management System",
      desc: "Room booking, customer profiles, payment handling. Tech Stack: Java, MySQL, JavaFX",
    },
    {
      title: "Yoga Management System",
      desc: "CRUD operations for yoga sessions, instructors, payments. Tech Stack: C#, SQL Server",
    },
    {
      title: "Food Delivery App UI & Backend - Flutter, Firebase",
      desc: "Designed a modern food delivery app with Firebase authentication and Firestore integration for real-time data handling. Tech Stack: Flutter, Dart, Firebase, Firestore",
    },
    {
      title: "University Website UI - HTML, CSS",
      desc: "Developed a responsive website template to showcase university courses, testimonials, and facilities. Tech Stack: HTML, CSS",
    },
  ];

  p1Projects.forEach((proj) => {
    page1.drawText(proj.title, {
      x: rightX,
      y: yRight,
      size: 8.5,
      font: helveticaBold,
      color: TEXT_DARK_BODY,
    });
    yRight -= 10;

    const wrappedDesc = wrapText(proj.desc, rightTextWidth, helvetica, 7.5);
    wrappedDesc.forEach((line) => {
      page1.drawText(line, {
        x: rightX + 6,
        y: yRight,
        size: 7.5,
        font: helvetica,
        color: TEXT_SLATE_GRAY,
      });
      yRight -= 9.5;
    });
    yRight -= 4;
  });


  // ==========================================
  // PAGE 2
  // ==========================================
  const page2 = pdfDoc.addPage([width, height]);

  // Page 2 Left Sidebar Background
  page2.drawRectangle({
    x: 0,
    y: 0,
    width: sidebarWidth,
    height: height,
    color: GREEN_BG,
  });

  // Technical Skills (Page 2 Left Column)
  yLeft = 740;
  page2.drawText("TECHNICAL SKILLS", {
    x: sidebarPadding,
    y: yLeft,
    size: 11,
    font: helveticaBold,
    color: TEXT_WHITE,
  });
  page2.drawLine({
    start: { x: sidebarPadding, y: yLeft - 3 },
    end: { x: sidebarWidth - sidebarPadding, y: yLeft - 3 },
    thickness: 0.5,
    color: TEXT_MUTED_GRAY,
  });
  yLeft -= 15;

  const techSkills = [
    { cat: "Languages:", list: "Java, Python, JavaScript, TypeScript, C, C++, C#, PHP" },
    { cat: "Frameworks:", list: "Spring Boot, Flask, React.js, React Native, Flutter, Node.js" },
    { cat: "Databases:", list: "MySQL, MongoDB, Firebase, Oracle, SQL Server" },
    { cat: "Web Tech:", list: "HTML, CSS, JavaScript, PHP" },
    { cat: "Mobile:", list: "Android Studio (Java), Flutter" },
    { cat: "Tools:", list: "Git, GitHub, VS Code, Postman, Android Studio, Code Blocks" },
    { cat: "Methodologies:", list: "Agile, Scrum, SDLC" },
  ];

  techSkills.forEach((tech) => {
    page2.drawText(tech.cat, {
      x: sidebarPadding,
      y: yLeft,
      size: 8,
      font: helveticaBold,
      color: TEXT_WHITE,
    });
    yLeft -= 10;

    const wrappedList = wrapText(tech.list, leftTextWidth, helvetica, 7.5);
    wrappedList.forEach((line) => {
      page2.drawText(line, {
        x: sidebarPadding + 4,
        y: yLeft,
        size: 7.5,
        font: helvetica,
        color: TEXT_LIGHT_GRAY,
      });
      yLeft -= 9.5;
    });
    yLeft -= 3;
  });

  // Extra Curricular (Page 2 Left Column)
  yLeft -= 10;
  page2.drawText("EXTRA CURRICULAR", {
    x: sidebarPadding,
    y: yLeft,
    size: 11,
    font: helveticaBold,
    color: TEXT_WHITE,
  });
  page2.drawLine({
    start: { x: sidebarPadding, y: yLeft - 3 },
    end: { x: sidebarWidth - sidebarPadding, y: yLeft - 3 },
    thickness: 0.5,
    color: TEXT_MUTED_GRAY,
  });
  yLeft -= 15;

  const extraCurricular = [
    "School Scout - Thelijjawila Central College",
    "Organized a farewell ceremony for a lecturer - NIBM 2022",
  ];

  extraCurricular.forEach((item) => {
    const wrappedItem = wrapText(`* ${item}`, leftTextWidth, helvetica, 7.5);
    wrappedItem.forEach((line) => {
      page2.drawText(line, {
        x: sidebarPadding,
        y: yLeft,
        size: 7.5,
        font: helvetica,
        color: TEXT_LIGHT_GRAY,
      });
      yLeft -= 10;
    });
    yLeft -= 4;
  });

  // Soft Skills (Page 2 Left Column)
  yLeft -= 10;
  page2.drawText("SOFT SKILLS", {
    x: sidebarPadding,
    y: yLeft,
    size: 11,
    font: helveticaBold,
    color: TEXT_WHITE,
  });
  page2.drawLine({
    start: { x: sidebarPadding, y: yLeft - 3 },
    end: { x: sidebarWidth - sidebarPadding, y: yLeft - 3 },
    thickness: 0.5,
    color: TEXT_MUTED_GRAY,
  });
  yLeft -= 15;

  const softSkills = [
    "Creativity",
    "Teamwork",
    "Time Management",
    "Leadership",
    "Effective Communication",
    "Critical Thinking",
    "Analytical skills",
  ];

  softSkills.forEach((skill) => {
    page2.drawText(`* ${skill}`, {
      x: sidebarPadding,
      y: yLeft,
      size: 7.5,
      font: helvetica,
      color: TEXT_LIGHT_GRAY,
    });
    yLeft -= 10;
  });

  // Languages (Page 2 Left Column)
  yLeft -= 10;
  page2.drawText("LANGUAGES", {
    x: sidebarPadding,
    y: yLeft,
    size: 11,
    font: helveticaBold,
    color: TEXT_WHITE,
  });
  page2.drawLine({
    start: { x: sidebarPadding, y: yLeft - 3 },
    end: { x: sidebarWidth - sidebarPadding, y: yLeft - 3 },
    thickness: 0.5,
    color: TEXT_MUTED_GRAY,
  });
  yLeft -= 15;

  page2.drawText("Sinhala - Native", {
    x: sidebarPadding,
    y: yLeft,
    size: 8,
    font: helvetica,
    color: TEXT_LIGHT_GRAY,
  });
  yLeft -= 11;
  page2.drawText("English - Fluent", {
    x: sidebarPadding,
    y: yLeft,
    size: 8,
    font: helvetica,
    color: TEXT_LIGHT_GRAY,
  });


  // ==========================================
  // PAGE 2 RIGHT COLUMN
  // ==========================================
  yRight = 740;

  // Projects Cont. Title
  page2.drawText("PROJECTS (CONT.)", {
    x: rightX,
    y: yRight,
    size: 12,
    font: helveticaBold,
    color: TEXT_DARK_GREEN,
  });
  page2.drawLine({
    start: { x: rightX, y: yRight - 4 },
    end: { x: width - contentPadding, y: yRight - 4 },
    thickness: 1.5,
    color: GREEN_BG,
  });
  yRight -= 18;

  const p2Projects = [
    {
      title: "AI Medical Assistant System",
      desc: "Developed an AI-powered healthcare assistant system to simplify medical reports and prescriptions for patients. Tech Stack: Python, Flask, OCR, NLP, HTML, CSS, JavaScript",
    },
    {
      title: "Tea Birds Premium E-Commerce Website",
      desc: "Designed and developed a modern luxury tea-selling e-commerce platform with responsive UI/UX. Tech Stack: React.js, JavaScript, HTML, CSS, Node.js",
    },
  ];

  p2Projects.forEach((proj) => {
    page2.drawText(proj.title, {
      x: rightX,
      y: yRight,
      size: 8.5,
      font: helveticaBold,
      color: TEXT_DARK_BODY,
    });
    yRight -= 10;

    const wrappedDesc = wrapText(proj.desc, rightTextWidth, helvetica, 7.5);
    wrappedDesc.forEach((line) => {
      page2.drawText(line, {
        x: rightX + 6,
        y: yRight,
        size: 7.5,
        font: helvetica,
        color: TEXT_SLATE_GRAY,
      });
      yRight -= 9.5;
    });
    yRight -= 5;
  });

  // Certificates Title
  yRight -= 10;
  page2.drawText("CERTIFICATES", {
    x: rightX,
    y: yRight,
    size: 12,
    font: helveticaBold,
    color: TEXT_DARK_GREEN,
  });
  page2.drawLine({
    start: { x: rightX, y: yRight - 4 },
    end: { x: width - contentPadding, y: yRight - 4 },
    thickness: 1.5,
    color: GREEN_BG,
  });
  yRight -= 18;

  const certificates = [
    {
      title: "Flutter for Beginners",
      info: "ZERO2LEARN - Certificate ID: 679f8cf801b7ceff42394ee4\nIssued: 2024. Demonstrated proficiency in foundational Flutter development.",
    },
    {
      title: "Diploma in Spoken English",
      info: "British Way English Academy",
    },
    {
      title: "Introduction to Cybersecurity",
      info: "Cisco Networking Academy - Academy for ICT Training, Sri Lanka. Issued: Dec 2023.",
    },
    {
      title: "Python for Beginners",
      info: "Open Learning Platform (UOM) - Certificate ID: nTjhrkDJQB. Issued: Nov 2022. Verify Certificate",
    },
    {
      title: "Python Programming",
      info: "Open Learning Platform (UOM) - Certificate ID: 3zgh9DV5Be. Verify Certificate",
    },
    {
      title: "API Testing with Postman - A Beginner's Guide",
      info: "Learnfi Learning - Learned API testing fundamentals.",
    },
    {
      title: "Human Resource Management Certificate Course (Foundation Level)",
      info: "Issued: October 10, 2024",
    },
    {
      title: "Business Management & Marketing Certificate Course (Foundation)",
      info: "Issued: October 10, 2024",
    },
  ];

  certificates.forEach((cert) => {
    page2.drawText(cert.title, {
      x: rightX,
      y: yRight,
      size: 8,
      font: helveticaBold,
      color: TEXT_DARK_BODY,
    });
    yRight -= 9.5;

    if (cert.info) {
      const infoLines = cert.info.split("\n");
      infoLines.forEach((infoLine) => {
        const wrappedInfo = wrapText(infoLine, rightTextWidth - 10, helvetica, 7);
        wrappedInfo.forEach((line) => {
          page2.drawText(line, {
            x: rightX + 6,
            y: yRight,
            size: 7,
            font: helvetica,
            color: TEXT_SLATE_GRAY,
          });
          yRight -= 8.5;
        });
      });
    }
    yRight -= 3.5;
  });

  // References Title
  yRight -= 8;
  page2.drawText("REFERENCES", {
    x: rightX,
    y: yRight,
    size: 12,
    font: helveticaBold,
    color: TEXT_DARK_GREEN,
  });
  page2.drawLine({
    start: { x: rightX, y: yRight - 4 },
    end: { x: width - contentPadding, y: yRight - 4 },
    thickness: 1.5,
    color: GREEN_BG,
  });
  yRight -= 18;

  const references = [
    {
      name: "Mrs. Chami Muthugamage",
      title: "Consultant / Lecturer (IT), NIBM",
      phone: "+94 772 222 608",
    },
    {
      name: "Mrs. Nadeeshani N. Gunasekara",
      title: "Consultant / Lecturer (IT), NIBM",
      phone: "+94 710 438 916",
    },
  ];

  references.forEach((ref, idx) => {
    const xPos = idx === 0 ? rightX : rightX + 190;
    const yPos = yRight;

    page2.drawText(ref.name, {
      x: xPos,
      y: yPos,
      size: 8.5,
      font: helveticaBold,
      color: TEXT_DARK_BODY,
    });
    page2.drawText(ref.title, {
      x: xPos,
      y: yPos - 10,
      size: 7.5,
      font: helveticaOblique,
      color: TEXT_SLATE_GRAY,
    });
    page2.drawText(`Phone: ${ref.phone}`, {
      x: xPos,
      y: yPos - 19,
      size: 7.5,
      font: helvetica,
      color: TEXT_SLATE_GRAY,
    });
  });

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Create public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Create dist directory if it doesn't exist
  const distDir = path.join(process.cwd(), "dist");
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Write files
  fs.writeFileSync(path.join(publicDir, "pasindu_weerathunga_CV.pdf"), pdfBytes);
  fs.writeFileSync(path.join(distDir, "pasindu_weerathunga_CV.pdf"), pdfBytes);

  console.log("SUCCESS: 2-page PDF compiled successfully and written to public/ & dist/ directories.");
}

run().catch((err) => {
  console.error("FATAL ERROR compilation failed:", err);
  process.exit(1);
});
