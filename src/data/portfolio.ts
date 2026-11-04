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
      "On the product engineering team building GenieHire, an AI-powered recruitment platform.",
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
      "Built and maintained the company's React Native app for iOS and Android. It grew to 5,000+ daily active users.",
      "Wrote 10+ backend APIs in Node.js (TypeScript) with DynamoDB and cut response times by 40ms, so the app loaded faster.",
      "Ran the deployment on AWS EC2 for those 5,000+ daily users, at 99.9% uptime.",
      "Wrote a Python script that scraped and seeded 1,000+ posts, so the app never felt empty.",
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
      "Built a responsive web app from scratch with Vite, React and Tailwind CSS: 15+ reusable components, and pages that load in under 200ms on desktop and mobile.",
      "Took on SEO too. Better meta tags, structured data and performance fixes lifted organic ranking by 20% across 15+ target keywords.",
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
      "Built an automatic invoice generator with React.js, Tailwind CSS, Node.js (TS) and MongoDB. It cut the manual work by 80%.",
      "Invoice lookups were slow, so in went Redis caching and the average response time dropped by 40%.",
      "Designed and built 15+ REST APIs for creating invoices, tracking their history and exporting them as PDFs.",
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
      "A bio-link builder on Next.js and Express.js. Creators put their socials, portfolio and business contacts on one landing page, using 5+ link types.",
      "An analytics dashboard on PostgreSQL tracks click-throughs, where visitors come from and how they engage, with 99% tracking accuracy.",
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
      "Indexes and queries tuned in Prisma + PostgreSQL until pages loaded in 300ms, even with 100+ documents in nested folders.",
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
      "A Spring Boot + PostgreSQL backend with authentication, a product catalog and a cart, across 25+ categories.",
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
    text: "Across a wide range of topics. Keeps the data-structure and algorithm muscles warm.",
    icon: "code",
    logo: "leetcode",
  },
  {
    value: "2nd",
    title: "CSESA Hackathon",
    text: "Led the team to second place. A crash course in leading people, technical design and shipping a prototype against the clock.",
    icon: "trophy",
  },
  {
    value: "1 of 12",
    title: "Avishkar finalist",
    text: "Made the final 12 at the state-level Avishkar competition with an agricultural innovation project.",
    icon: "flag",
  },
  {
    value: "6",
    count: 6,
    title: "Google Cloud badges",
    text: "Earned on Google Cloud Skills Boost, in cloud architecture and data engineering.",
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
    /** How the education section tells it. */
    story: "B.Tech in Computer Science at N. K. Orchid College, Solapur. Four years, a healthy number of \"but it works on my machine\" moments, and a 7.5 CGPA to show for it.",
  },
  {
    school: "Sangmeshwar College",
    place: "Solapur",
    degree: "Class 12 (HSC): Physics, Chemistry, Mathematics",
    period: "Jun 2018 — May 2020",
    note: "",
    story: "Physics, Chemistry and Maths at Sangmeshwar College, Solapur. Two years of formulas, ending in one firm conclusion: computers are more fun to argue with.",
  },
];


