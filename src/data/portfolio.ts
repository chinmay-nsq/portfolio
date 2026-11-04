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
  city: "Pune",
  email: "chinmay29.lale@gmail.com",
  phone: "+91 76207 04050",
  phoneHref: "tel:+917620704050",
  linkedin: "https://www.linkedin.com/in/ChinmayLale",
  github: "https://github.com/ChinmayLale",
  /** Drop a PDF in /public and set e.g. "/Chinmay_Lale_CV.pdf" to show a Download CV button. */
  resume: "",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  /** The one line that sells this job, shown on the collapsed row. */
  headline: string;
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
    headline: "Building GenieHire",
    points: [
      "I'm on the product engineering team building GenieHire, an AI-powered recruitment platform.",
    ],
    tags: ["AI Recruitment", "Product Engineering"],
  },
  {
    company: "Social Continent",
    role: "Software Engineer",
    period: "Feb 2025 — Sept 2025",
    location: "Pune, Maharashtra",
    headline: "5,000+ daily users",
    points: [
      "I built and maintained the company's React Native app for iOS and Android. It grew to 5,000+ daily active users.",
      "On the backend I wrote 10+ APIs in Node.js (TypeScript) with DynamoDB and cut response times by 40ms, so the app loaded faster.",
      "I also ran the deployment on AWS EC2 and kept it at 99.9% uptime for those 5,000+ daily users.",
      "To grow the amount of content in the app, I wrote a Python script that scraped and seeded 1,000+ posts.",
    ],
    tags: ["React Native", "Node.js", "TypeScript", "DynamoDB", "AWS EC2", "Python"],
  },
  {
    company: "Social Continent",
    role: "Software Engineer Intern",
    period: "Aug 2024 — Feb 2025",
    location: "Pune, Maharashtra",
    headline: "Pages under 200ms",
    points: [
      "I built a responsive web app from scratch with Vite, React and Tailwind CSS: 15+ reusable components, and pages that load in under 200ms on desktop and mobile.",
      "I worked on SEO too. Better meta tags, structured data and performance fixes lifted our organic ranking by 20% across 15+ target keywords.",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "SEO"],
  },
  {
    company: "Aarya Global Technologies",
    role: "MERN Stack Intern",
    period: "Apr 2024 — Aug 2024",
    location: "Remote",
    headline: "80% less manual work",
    points: [
      "I built an automatic invoice generator with React.js, Tailwind CSS, Node.js (TS) and MongoDB. It cut the manual work by 80%.",
      "Invoice lookups were slow, so I added Redis caching and brought the average response time down by 40%.",
      "I designed and built 15+ REST APIs for creating invoices, tracking their history and exporting them as PDFs.",
      "Tuning the MongoDB queries and backend logic gave the server a 30% performance gain under load testing.",
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
  name: string;
  tagline: string;
  period: string;
  points: string[];
  tags: string[];
  /** Fill these in to show buttons on the card. */
  live?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "linkforge",
    name: "LinkForge",
    tagline: "All your links on one page",
    period: "Aug – Sept 2025",
    points: [
      "A bio-link builder I made with Next.js and Express.js. Creators put their socials, portfolio and business contacts on one landing page, using 5+ link types.",
      "I built an analytics dashboard on PostgreSQL that tracks click-throughs, where visitors come from and how they engage, with 99% tracking accuracy.",
      "It comes with 20+ themes and a drag-and-drop editor, and it works just as well on a phone.",
    ],
    tags: ["Next.js", "Express.js", "PostgreSQL"],
    live: "",
    repo: "",
  },
  {
    id: "slatx",
    name: "SlatX",
    tagline: "A shared workspace for pages and docs",
    period: "Aug – Sept 2025",
    points: [
      "A workspace on Next.js and PostgreSQL where you nest pages inside each other, write in a rich-text editor with 10+ formatting options, and manage documents.",
      "Content renders as you type and saves on its own, with 95% data-persistence accuracy and an instant preview.",
      "I tuned the indexes and queries in Prisma + PostgreSQL until pages loaded in 300ms, even with 100+ documents in nested folders.",
    ],
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    live: "",
    repo: "",
  },
  {
    id: "springcart",
    name: "SpringCart",
    tagline: "An online store, built end to end",
    period: "July – Aug 2025",
    points: [
      "I wrote the Spring Boot + PostgreSQL backend: authentication, a product catalog and a cart, across 25+ categories.",
      "The Next.js storefront paginates 200+ products and loads in about 100ms.",
      "JWT login and signup keep sessions alive (99.8% auth reliability), and the cart-to-checkout flow has zero data loss.",
    ],
    tags: ["Spring Boot", "Next.js", "PostgreSQL", "JWT"],
    live: "",
    repo: "https://github.com/ChinmayLale",
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
    text: "I've solved them across a wide range of topics. It's how I keep my data-structure and algorithm basics sharp.",
    icon: "code",
    logo: "leetcode",
  },
  {
    value: "2nd",
    title: "CSESA Hackathon",
    text: "I led our team to second place. It taught me a lot about leading people, technical design and building a prototype fast under pressure.",
    icon: "trophy",
  },
  {
    value: "1 of 12",
    title: "Avishkar finalist",
    text: "I made the final 12 teams at the state-level Avishkar competition with an agricultural innovation project.",
    icon: "flag",
  },
  {
    value: "6",
    count: 6,
    title: "Google Cloud badges",
    text: "I earned these on Google Cloud Skills Boost, in cloud architecture and data engineering.",
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
    degree: "Class 12 (HSC): Physics, Chemistry, Mathematics",
    period: "Jun 2018 — May 2020",
    note: "",
  },
];
