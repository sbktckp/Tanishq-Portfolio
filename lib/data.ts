export const profile = {
  name: "Tanishq Kansal",
  email: "tanishq.kansal35@gmail.com",
  location: "Delhi, India",
  headline: "Managing Director, AxiomPrep · Academic Content Head, Examlytics",
  intro:
    "Academic content development, assessment design and content leadership for NEET and IIT-JEE learners.",
  about: [
    "Academic Content Lead and content professional with experience in academic content development, assessment design, educational communication and creative production.",
    "Managing Director of AxiomPrep by Examlytics Group of Companies, a science exam-preparation platform for NEET and IIT-JEE, and Academic Content Head at Examlytics.",
    "Designed 25 NEET-oriented question paper sets comprising 4,500 questions and contributed to educational content, scripts, presentations and academic projects across multiple EdTech initiatives.",
    "Interested in building scalable learning solutions, leading content teams and developing academic strategy in the startup ecosystem.",
  ],
};

export type Role = {
  role: string;
  org: string;
  period: string;
  href?: string;
  points: string[];
};

export const currentRoles: Role[] = [
  {
    role: "Managing Director",
    org: "AxiomPrep by Examlytics Group of Companies",
    period: "Present",
    href: "https://axiomprep.in",
    points: [
      "Lead AxiomPrep, an online platform for NEET and IIT-JEE aspirants built around science from first principles, driving its strategy, operations and growth.",
      "Manage the content-making team, tech team and NEET and IIT-JEE mentors, working closely with the Founder and CEO and the CTO.",
      "Oversee a product offering of 50,000+ past-year questions from NTA, IIT JEE and NEET, practice tests, full syllabus tests, original quizzes and rank-focused analytics with leaderboards.",
      "Maintain academic quality through content validated and recommended by HODs of top institutes for structural accuracy and concept alignment.",
    ],
  },
  {
    role: "Academic Content Head",
    org: "Examlytics",
    period: "Present",
    href: "https://examlytics.in",
    points: [
      "Lead academic content operations and contribute to content development strategy.",
      "Take ownership of academic deliverables, quality and content execution.",
      "Coordinate academic workflows and support the development of educational resources.",
      "Contribute to content planning, team collaboration and scalable academic processes.",
    ],
  },
  {
    role: "Academic Content Strategist",
    org: "Study Voice by Amit Sir (IIT Bombay)",
    period: "Present",
    points: ["Design academic content, notes and test series."],
  },
  {
    role: "Outreach",
    org: "Sukesh Academy (YouTube)",
    period: "Present",
    points: ["Handle outreach for Sukesh Academy on YouTube."],
  },
];

export const experience: Role[] = [
  {
    role: "Student Support Executive",
    org: "Mentex Education Platform LLP (by Sudhanshu MBBS)",
    period: "Aug 2026",
    points: [
      "Supported students and aspirants on the Mentex Education Platform with queries and guidance.",
      "Coordinated with the academic team to resolve student concerns and improve student experience.",
    ],
  },
  {
    role: "Script Writer",
    org: "Dr. Parth Goyal",
    period: "Jun 2026",
    points: ["Wrote scripts for Dr. Parth Goyal's latest reel based on current market trends."],
  },
  {
    role: "Content Contributor",
    org: "Team BMNT, Tamil Nadu",
    period: "Dec 2025 – Mar 2026",
    points: [
      "Contributed to educational content creation for NEET aspirants.",
      "Assisted in academic resource development and question preparation.",
    ],
  },
  {
    role: "Script Writer and Content Creator",
    org: "Pratik Bhaiya",
    period: "Nov – Dec 2025, Feb – Mar 2026",
    points: [
      "Developed educational scripts for social media platforms.",
      "Contributed to content ideation, research and script development.",
      "Translated complex academic concepts into student-friendly content.",
    ],
  },
  {
    role: "Academic Content Creator",
    org: "Benzene Classes",
    period: "Jan 2026",
    points: [
      "Developed CBSE Chemistry content for Classes 11 and 12.",
      "Created concept-based explanations, notes and practice materials.",
      "Focused on making complex Chemistry concepts easier to understand.",
    ],
  },
  {
    role: "PPT Designer, Faculty Collaboration",
    org: "Physics Wallah (PW)",
    period: "Oct 2025",
    points: [
      "Designed and edited approximately 30 to 40 educational presentation slides.",
      "Developed visually engaging, concept-oriented academic presentations.",
      "Structured content to improve clarity, engagement and learning retention.",
    ],
  },
  {
    role: "Academic Content Contributor",
    org: "Sudhanshu MBBS",
    period: "Sep 2025",
    points: [
      "Developed NEET-focused academic content.",
      "Contributed to concept research, educational resource preparation and content development.",
      "Simplified scientific concepts for student understanding.",
    ],
  },
  {
    role: "Academic Content Creator and Question Paper Designer",
    org: "The Apron Boy",
    period: "Jul – Aug 2025",
    points: [
      "Designed 25 NEET-oriented question paper sets with 180 questions per paper (4,500 questions in total) for THE DR SERIES.",
      "Contributed to academic content development and assessment preparation.",
      "Focused on question quality, subject relevance and competitive-exam orientation.",
    ],
  },
  {
    role: "Content Contributor",
    org: "Abacus Education Companies",
    period: "2021 – 2023",
    points: [
      "Contributed educational and practice content.",
      "Assisted in developing worksheets, exercises and learning materials.",
      "Supported mathematical content structuring and student-oriented resources.",
    ],
  },
];

export const stats = [
  { value: "4,500", label: "NEET questions designed" },
  { value: "50,000+", label: "Past-year questions on AxiomPrep" },
  { value: "25", label: "Question paper sets" },
  { value: String(currentRoles.length + experience.length), label: "Roles across education" },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Academic and Assessment Development",
    items: [
      "NEET and CBSE Content Development",
      "Question Paper Design",
      "MCQ Development",
      "Academic Research and Fact-Checking",
      "Concept-Based Content Writing",
      "Solution and Explanation Writing",
      "Educational Content Quality Review",
    ],
  },
  {
    group: "Content and Creative",
    items: [
      "Academic Content Writing",
      "Script Writing",
      "Graphic Designing",
      "Presentation Design",
      "Facebook / Meta Ads",
      "Educational Communication",
    ],
  },
  {
    group: "Leadership and Execution",
    items: [
      "Operations Management",
      "Academic Content Planning",
      "Team Coordination",
      "Content Workflow Management",
      "Project Ownership",
      "Cross-functional Collaboration",
      "Quality Control",
    ],
  },
  {
    group: "Subject Expertise",
    items: [
      "Physics (NEET and CBSE)",
      "Chemistry (NEET and CBSE)",
      "Botany (NEET)",
      "Zoology (NEET)",
      "Information Practices (IP)",
    ],
  },
  {
    group: "Tools and Software",
    items: [
      "Microsoft PowerPoint",
      "Microsoft Word",
      "Google Docs",
      "Google Sheets",
      "Google Slides",
      "Canva",
    ],
  },
  { group: "Languages", items: ["English", "Hindi"] },
];

export const achievements = [
  "Named among the top educators in the M.S. Chouhan NEET Book (latest 13th Edition) as a proofreader.",
  "Part of the Physics Wallah Vijeta Series 2025–2026 launch event; the event video is available on the NCERT Wallah YouTube channel.",
];

export const education = [
  {
    title: "BMLS, Medical Laboratory Science",
    place: "Delhi Pharmaceutical Sciences and Research University (DPSRU)",
    note: "2026 – 2030 · Pursuing",
  },
  { title: "Class 12, CBSE", place: "2025", note: "Score: 90%" },
];

const whatsapp = {
  number: "917303188147",
  message: "Hi Tanishq, I saw your portfolio and I'd like to connect with you about ",
};

export const whatsappLink = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;
