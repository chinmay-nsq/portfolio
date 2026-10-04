/**
 * Single source of truth for all portfolio content.
 * Edit this file to update the site – no component changes needed.
 */

export const profile = {
  name: "Chinmay Kalyan Lale",
  firstName: "Chinmay",
  lastName: "Lale",
  role: "Software Engineer",
  company: "Nsquare Experts",
  location: "Maharashtra, India",
  baseLabel: "Pune, IN",
  baseCoords: "18.52°N 73.86°E",
  email: "chinmay29.lale@gmail.com",
  phone: "+91 76207 04050",
  phoneHref: "tel:+917620704050",
  linkedin: "https://www.linkedin.com/in/ChinmayLale",
  github: "https://github.com/ChinmayLale",
  /** Drop a PDF in /public and set e.g. "/Chinmay_Lale_CV.pdf" to show a Download CV button. */
  resume: "",
  /** Drop a portrait in /public and set e.g. "/me.jpg" to replace the monogram on the pilot card. */
  photo: "",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const heroRoles = [
  "scalable APIs",
  "mobile apps for 5,000+ users",
  "AI recruitment tech",
  "cloud-native backends",
];

export const stats = [
  { value: 5000, suffix: "+", label: "Daily active users served" },
  { value: 99.9, suffix: "%", label: "Production uptime on AWS", decimals: 1 },
  { value: 25, suffix: "+", label: "REST APIs designed & shipped" },
  { value: 450, suffix: "+", label: "LeetCode problems solved" },
];

export const currentMission = {
  name: "GenieHire",
  tagline: "AI Recruitment Platform",
  company: "Nsquare Experts",
  role: "Software Engineer",
  description:
    "I'm part of the team building GenieHire at Nsquare Experts — an AI-powered recruitment platform that connects talent with the teams that need them, faster and smarter.",
  /** Add a URL here to show a “Visit GenieHire” button. */
  href: "",
};

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    company: "Nsquare Experts",
    role: "Software Engineer",
    period: "2025 — Present",
    location: "India",
    current: true,
    points: [
      "Building GenieHire — an AI-powered recruitment platform — as part of the product engineering team.",
    ],
    tags: ["AI Recruitment", "Product Engineering"],
  },
  {
    company: "Social Continent",
    role: "Software Engineer",
    period: "Feb 2025 — Sept 2025",
    location: "Pune, Maharashtra",
    points: [
      "Engineered and maintained a cross-platform React Native app for iOS and Android, reaching 5,000+ daily active users.",
      "Created 10+ backend APIs in Node.js (TypeScript) with DynamoDB, cutting response time by 40ms and improving load performance.",
      "Managed deployment on AWS EC2, ensuring 99.9% uptime while supporting 5,000+ daily users.",
      "Programmed a Python script to scrape and seed 1,000+ posts, expanding in-app content volume.",
    ],
    tags: ["React Native", "Node.js", "TypeScript", "DynamoDB", "AWS EC2", "Python"],
  },
  {
    company: "Social Continent",
    role: "Software Engineer Intern",
    period: "Aug 2024 — Feb 2025",
    location: "Pune, Maharashtra",
    points: [
      "Built a responsive web application from scratch with Vite, React and Tailwind CSS — 15+ reusable components and sub-200ms page loads on desktop and mobile.",
      "Improved SEO through meta-tag optimisation, structured data and performance tuning: +20% organic search ranking across 15+ target keywords.",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "SEO"],
  },
  {
    company: "Aarya Global Technologies",
    role: "MERN Stack Intern",
    period: "Apr 2024 — Aug 2024",
    location: "Remote",
    points: [
      "Developed an automatic invoice generator with React.js, Tailwind CSS, Node.js (TS) and MongoDB, cutting manual work by 80%.",
      "Added Redis caching to speed up invoice retrieval, decreasing average response time by 40%.",
      "Designed and implemented 15+ REST APIs for invoice creation, history tracking and PDF export.",
      "Refined MongoDB queries and backend logic for a 30% server-performance gain under load testing.",
    ],
    tags: ["React.js", "Node.js", "MongoDB", "Redis"],
  },
];

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "Express.js", "Spring Boot", "Serverless"],
  },
  {
    id: "data",
    label: "Data & Cloud",
    items: ["MongoDB", "DynamoDB", "PostgreSQL", "Redis", "Firebase", "AWS"],
  },
  {
    id: "tools",
    label: "DevTools",
    items: ["Git / GitHub", "Docker", "Postman", "Figma", "Linux CLI", "VS Code"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "React.js",
      "React Native",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Material-UI",
      "Bootstrap",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "C", "SQL"],
  },
];

export const marqueeWords = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "React Native",
  "AWS",
  "PostgreSQL",
  "DynamoDB",
  "Redis",
  "Docker",
  "Spring Boot",
  "Python",
];

export type Project = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  period: string;
  points: string[];
  tags: string[];
  /** Fill these in to show buttons on the card. */
  live?: string;
  repo?: string;
  visual: "linkforge" | "slatx" | "springcart";
};

export const projects: Project[] = [
  {
    id: "linkforge",
    code: "M-01",
    name: "LinkForge",
    tagline: "Professional link management hub",
    period: "Aug – Sept 2025",
    points: [
      "Customizable bio-link aggregator on Next.js and Express.js — creators consolidate socials, portfolios and business contacts into one landing page with 5+ link types.",
      "Analytics dashboard on PostgreSQL: click-through metrics, geographic data and engagement patterns at 99% tracking accuracy.",
      "Theme engine with 20+ pre-built themes and a drag-and-drop editor, fully mobile-responsive.",
    ],
    tags: ["Next.js", "Express.js", "PostgreSQL"],
    live: "",
    repo: "",
    visual: "linkforge",
  },
  {
    id: "slatx",
    code: "M-02",
    name: "SlatX",
    tagline: "Collaborative workspace management tool",
    period: "Aug – Sept 2025",
    points: [
      "Workspace built on Next.js and PostgreSQL with hierarchical page organisation, rich-text editing and document management (10+ formatting options).",
      "Real-time content rendering and auto-save with 95% data-persistence accuracy and instant preview.",
      "Tuned indexing and queries with Prisma + PostgreSQL to hit 300ms page loads across 100+ documents and nested folders.",
    ],
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    live: "",
    repo: "",
    visual: "slatx",
  },
  {
    id: "springcart",
    code: "M-03",
    name: "SpringCart",
    tagline: "Full-stack e-commerce platform",
    period: "July – Aug 2025",
    points: [
      "Spring Boot + PostgreSQL backend with authentication, product catalog and cart across 25+ categories.",
      "Responsive Next.js storefront with pagination for 200+ products at ~100ms load times.",
      "JWT login/signup with session persistence (99.8% auth reliability) and a cart-to-checkout flow with zero data loss.",
    ],
    tags: ["Spring Boot", "Next.js", "PostgreSQL", "JWT"],
    live: "",
    repo: "https://github.com/ChinmayLale",
    visual: "springcart",
  },
];

export type Achievement = {
  value: string;
  count?: number;
  suffix?: string;
  title: string;
  text: string;
  icon: "code" | "trophy" | "flag" | "cloud";
  /** File in /public/logos (no extension) shown instead of the generic icon. */
  logo?: string;
};

export const achievements: Achievement[] = [
  {
    value: "450+",
    count: 450,
    suffix: "+",
    title: "LeetCode problems",
    text: "Solved across a wide range of topics, sharpening data-structure and algorithm fundamentals.",
    icon: "code",
    logo: "leetcode",
  },
  {
    value: "2nd",
    title: "CSESA Hackathon",
    text: "Led a team to second place — leadership, technical design and rapid prototyping under pressure.",
    icon: "trophy",
  },
  {
    value: "1 of 12",
    title: "Avishkar finalist",
    text: "Finalist among 12 teams at the State-Level Avishkar Competition with an agricultural innovation project.",
    icon: "flag",
  },
  {
    value: "6",
    count: 6,
    title: "Google Cloud badges",
    text: "Digital badges in cloud architecture and data engineering from Google Cloud Skill Boost.",
    icon: "cloud",
    logo: "googlecloud",
  },
];

export const education = [
  {
    school: "N. K. Orchid College of Engineering & Technology",
    place: "Solapur",
    degree: "B.Tech in Computer Science",
    period: "Aug 2020 — May 2024",
    note: "CGPA 7.5 / 10",
  },
  {
    school: "Sangmeshwar College",
    place: "Solapur",
    degree: "Class 12 (HSC) — Physics, Chemistry, Mathematics",
    period: "Jun 2018 — May 2020",
    note: "",
  },
];
