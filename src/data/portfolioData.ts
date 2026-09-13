import { Book } from '../types';

export const BOOKS_DATA: Book[] = [
  {
    id: 'projects',
    title: 'Systems',
    displayTitle: 'SYSTEMS',
    subtitle: 'Hackathons, Startups & Engineering Feats',
    spineColor: '#6096BA',
    spineTextColor: '#FFFFFF',
    spineAccentColor: '#C8EAD3',
    accentBorderColor: '#437699',
    pattern: 'classic',
    romanNumeral: 'I',
    heightClass: 'h-52 sm:h-58 md:h-64',
    widthClass: 'w-13 sm:w-16',
    tiltAngle: 0,
    tableOfContents: [
      {
        sectionTitle: 'I. Hackathon Proyects',
        pageNumber: 2,
        subItems: [
          { title: 'TIC Challenge', pageNumber: 3, badge: 'Winner' },
          { title: 'Appathon', pageNumber: 4, badge: 'Finalist' },
        ],
      },
      {
        sectionTitle: 'II. Startups & Ventures',
        pageNumber: 5,
        subItems: [
          { title: 'I got me', pageNumber: 6, badge: 'Co-Founder' },
          { title: 'Dolce Puro', pageNumber: 7, badge: 'Tech & Brand' },
          { title: 'Immanka', pageNumber: 8, badge: 'Platform' },
        ],
      },
      {
        sectionTitle: 'III. Technical Arsenal',
        pageNumber: 9,
      },
    ],
    pages: [
      {
        pageNumber: 1,
        type: 'intro',
        chapterTitle: 'Opening Volume',
        title: 'Selected Works & Inventions',
        subtitle: 'By Ana Ainza',
        content:
          'Welcome to the compilation of my most cherished engineering and entrepreneurial ventures. From high-octane 48-hour hackathon marathons to building sustainable startups from the ground up, each project represents my passion for making creative solutions that touch human lives.',
        quote: '"Creativity is intelligence having fun — especially when backed by clean architecture and relentless empathy."',
      },
      {
        pageNumber: 2,
        type: 'toc',
        chapterTitle: 'Index',
        title: 'Table of Contents',
        subtitle: 'Jump straight to any chapter or turn pages sequentially',
      },
      {
        pageNumber: 3,
        type: 'project',
        chapterTitle: 'Hackathons',
        sectionName: 'TIC Challenge',
        title: 'TIC Challenge',
        subtitle: '1st Place Winner • Sustainable Tech Innovation',
        dateOrPeriod: 'Competition Award',
        projectData: {
          id: 'tic-challenge',
          name: 'TIC Challenge',
          category: 'hackathon',
          tagline: 'Smart real-time solution tackling critical community logistics and sustainability.',
          award: '1st Place Grand Winner',
          role: 'Lead Architect & UI/UX Developer',
          year: '2024',
          description:
            'Developed during the intense TIC Challenge hackathon, our solution revolutionized how community resources are routed and allocated during critical supply chain shortages. Built with a fast reactive frontend and intelligent routing logic.',
          highlights: [
            'Architected a low-latency geo-dispatch dashboard serving real-time status updates',
            'Designed a friction-free mobile-friendly interface for field volunteers',
            'Pitched live before an international jury of venture technologists and industry leaders',
            'Awarded 1st Place for innovation, feasibility, and measurable community impact',
          ],
          techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WebSockets', 'GeoJSON APIs'],
          metrics: [
            { label: 'Pitch Score', value: '98/100' },
            { label: 'Response Latency', value: '< 120ms' },
            { label: 'Field Testers', value: '45+ Users' },
          ],
          links: [
            { label: 'View Prototype Pitch', url: 'https://github.com/anaiainza-ux', isExternal: true },
          ],
        },
      },
      {
        pageNumber: 4,
        type: 'project',
        chapterTitle: 'Hackathons',
        sectionName: 'Appathon',
        title: 'Appathon Mobile Innovation',
        subtitle: 'Top Finalist • Rapid Prototyping Sprint',
        dateOrPeriod: 'Mobile Hackathon Sprint',
        projectData: {
          id: 'appathon',
          name: 'Appathon',
          category: 'hackathon',
          tagline: 'Context-aware mobile companion that simplifies complex student schedules & mental wellness.',
          award: 'Best UX & Design Honors',
          role: 'Full Stack & Interaction Designer',
          year: '2023',
          description:
            'A 36-hour sprint to build a delightful, cognitive-load-reducing application for university students balancing intense academic workloads, campus jobs, and personal well-being.',
          highlights: [
            'Engineered an adaptive smart timeline that auto-reschedules tasks based on energy levels',
            'Implemented an offline-first storage sync to ensure students never lose crucial reminders',
            'Crafted buttery-smooth micro-interactions and accessible color palettes',
            'Praised by judges for the most empathetic design and intuitive onboarding flow',
          ],
          techStack: ['React Native', 'TypeScript', 'Tailwind', 'State Synchronization', 'Figma'],
          metrics: [
            { label: 'Sprint Duration', value: '36 Hours' },
            { label: 'Onboarding Time', value: '25 Secs' },
            { label: 'Judge Rating', value: 'Top 3 Finalist' },
          ],
          links: [
            { label: 'Interactive Demo', url: 'https://github.com/anaiainza-ux', isExternal: true },
          ],
        },
      },
      {
        pageNumber: 5,
        type: 'section-header',
        chapterTitle: 'Ventures',
        title: 'Part II: Startups',
        subtitle: 'Ventures founded on empathy, resilience, and elegant technology.',
        content:
          'Building startups taught me that code is only as powerful as the problem it solves. Here are three ventures where I transformed nascent concepts into living products with genuine customers.',
      },
      {
        pageNumber: 6,
        type: 'project',
        chapterTitle: 'Startups',
        sectionName: 'I got me',
        title: 'I got me',
        subtitle: 'Founder & Product Lead • Empowering Personal Safety & Community Care',
        dateOrPeriod: '2023 — Present',
        projectData: {
          id: 'i-got-me',
          name: 'I got me',
          category: 'startup',
          tagline: 'A modern, peer-to-peer safety companion offering discretion, speed, and trusted circle verification.',
          role: 'Co-Founder & Technical Lead',
          year: '2023-Present',
          description:
            '"I got me" was born from a fundamental belief: nobody should feel vulnerable navigating their daily commutes or campus life. We engineered an ultra-discreet notification and check-in system with instant location verification and zero-friction emergency pings.',
          highlights: [
            'Engineered a one-tap haptic emergency trigger operable without looking at the screen',
            'Built end-to-end encrypted beaconing to protect vulnerable user coordinates',
            'Conducted user interviews with 120+ collegiate students to refine core psychological safety cues',
            'Scaled active pilot to university campuses with 99.9% uptime',
          ],
          techStack: ['React Native', 'Node.js', 'PostgreSQL', 'WebSockets', 'Tailwind CSS', 'Docker'],
          metrics: [
            { label: 'Active Testers', value: '1,200+' },
            { label: 'Trigger Speed', value: '0.4s' },
            { label: 'User Rating', value: '4.9 ★' },
          ],
          links: [
            { label: 'Project Deck & Demo', url: 'https://github.com/anaiainza-ux', isExternal: true },
          ],
        },
      },
      {
        pageNumber: 7,
        type: 'project',
        chapterTitle: 'Startups',
        sectionName: 'Dolce Puro',
        title: 'Dolce Puro',
        subtitle: 'Artisan Confectionery Meets Modern Digital Commerce',
        dateOrPeriod: '2022 — Present',
        projectData: {
          id: 'dolce-puro',
          name: 'Dolce Puro',
          category: 'startup',
          tagline: 'Bridging timeless culinary artisanal purity with a bespoke, seamless digital storefront.',
          role: 'Co-Creator & Digital Systems Architect',
          year: '2022-Present',
          description:
            'Dolce Puro merges authentic, pure ingredients with an intoxicating digital customer journey. I designed the brand identity, built the high-converting e-commerce web platform, and automated the order inventory workflow.',
          highlights: [
            'Created an bespoke ordering experience featuring custom gift box customizers',
            'Optimized Core Web Vitals to sub-second load times with dynamic image compression',
            'Integrated automated inventory alerts and shipping label generation via serverless webhooks',
            'Achieved 3.8x revenue growth through targeted UX enhancements and frictionless checkout',
          ],
          techStack: ['React', 'Next.js', 'Stripe API', 'Tailwind CSS', 'Figma', 'Analytics'],
          metrics: [
            { label: 'Conversion Lift', value: '+38%' },
            { label: 'Page Load', value: '0.8s' },
            { label: 'Orders Shipped', value: '2,500+' },
          ],
          links: [
            { label: 'Brand Experience', url: 'https://github.com/anaiainza-ux', isExternal: true },
          ],
        },
      },
      {
        pageNumber: 8,
        type: 'project',
        chapterTitle: 'Startups',
        sectionName: 'Immanka',
        title: 'Immanka',
        subtitle: 'Social Commerce & Cultural Preservation Platform',
        dateOrPeriod: '2023 — Present',
        projectData: {
          id: 'immanka',
          name: 'Immanka',
          category: 'startup',
          tagline: 'Connecting indigenous craftsmanship with global conscious consumers directly without predatory middlemen.',
          role: 'Platform Architect & UX Researcher',
          year: '2023-Present',
          description:
            'Immanka provides indigenous master artisans with digital identity, storytelling tools, and transparent fair-trade payment channels. I built the multilingual platform and designed accessible interfaces for non-tech-native makers.',
          highlights: [
            'Designed an audio-assisted mobile inventory app for artisan communities with varying literacy levels',
            'Integrated transparent supply-chain traceability so consumers discover the maker behind each piece',
            'Featured in regional entrepreneurship accelerators for high social sustainability impact',
            'Connected over 60 indigenous artisan families with international buyers across 8 countries',
          ],
          techStack: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'i18n Localization', 'Cloud Storage'],
          metrics: [
            { label: 'Artisan Families', value: '60+' },
            { label: 'Fair Trade Payouts', value: '100%' },
            { label: 'Global Reach', value: '8 Countries' },
          ],
          links: [
            { label: 'Platform Story', url: 'https://github.com/anaiainza-ux', isExternal: true },
          ],
        },
      },
      {
        pageNumber: 9,
        type: 'skills',
        chapterTitle: 'Capabilities',
        title: 'Technical Arsenal & Philosophy',
        subtitle: 'The tools and paradigms I wield every day',
        content:
          'I believe languages and frameworks are brushes; user delight is the masterpiece. I write resilient, typed, component-driven code that feels effortless to use and maintain.',
        items: [
          {
            title: 'Frontend Craftsmanship',
            subtitle: 'React, TypeScript, Next.js, Tailwind CSS, Motion/Framer',
            description: 'Pixel-perfect, accessible, responsive design with delightful micro-interactions and smooth performance.',
            badge: 'Core Focus',
          },
          {
            title: 'Backend & Systems',
            subtitle: 'Node.js, Express, PostgreSQL, RESTful & GraphQL APIs',
            description: 'Scalable server architecture, secure API routing, database schema modeling, and caching.',
            badge: 'Reliability',
          },
          {
            title: 'Human-Centered Design',
            subtitle: 'Figma, Rapid Wireframing, User Testing & Psychology',
            description: 'Deep user interviews, empathetic UX flows, design systems, and rapid interactive prototypes.',
            badge: 'Empathy',
          },
        ],
      },
    ],
  },
  {
    id: 'school',
    title: 'Analysis',
    displayTitle: 'ANALYSIS',
    subtitle: 'Academic Foundations, Honors & Rigor',
    spineColor: '#B6C8A9',
    spineTextColor: '#482728',
    spineAccentColor: '#482728',
    accentBorderColor: '#8FA680',
    pattern: 'classic',
    romanNumeral: 'II',
    heightClass: 'h-48 sm:h-54 md:h-58',
    widthClass: 'w-12 sm:w-14',
    tiltAngle: 0,
    tableOfContents: [
      {
        sectionTitle: 'I. Degrees & Academic Pursuits',
        pageNumber: 2,
      },
      {
        sectionTitle: 'II. Notable Coursework & Mastery',
        pageNumber: 3,
      },
      {
        sectionTitle: 'III. Academic Honors & Leadership',
        pageNumber: 4,
      },
      {
        sectionTitle: 'IV. Capstone & Research Thesis',
        pageNumber: 5,
      },
    ],
    pages: [
      {
        pageNumber: 1,
        type: 'intro',
        chapterTitle: 'Preface',
        title: 'Academic Foundations',
        subtitle: 'Curiosity disciplined by mathematical & engineering rigor',
        content:
          'University has been my incubator for testing theories, deconstructing complex systems, and collaborating with brilliant minds. Here is a snapshot of my academic journey.',
        quote: '"Education is not the learning of facts, but the training of the mind to think."',
      },
      {
        pageNumber: 2,
        type: 'story',
        chapterTitle: 'Degrees',
        title: 'Computer Science & Engineering',
        subtitle: 'University Education • Focus on Software Systems & Human Factors',
        dateOrPeriod: 'Undergraduate Program',
        content:
          'Pursuing an interdisciplinary curriculum balancing algorithmic theory with practical software engineering and interactive design. Constant presence on the Dean\'s Honor Roll, maintaining high academic standing while balancing startups and leadership.',
        items: [
          {
            title: 'Major in Computer Science',
            subtitle: 'Core Specialization in Distributed Systems & Web Engineering',
            description: 'Focused on scalable web architectures, data structures, and secure networked systems.',
            badge: 'Major',
          },
          {
            title: 'Minor in Human-Centered Design',
            subtitle: 'Interaction Design & Usability Engineering',
            description: 'Studied cognitive ergonomics, design thinking methodologies, and accessible web standards.',
            badge: 'Minor',
          },
        ],
      },
      {
        pageNumber: 3,
        type: 'skills',
        chapterTitle: 'Coursework',
        title: 'Foundational Coursework',
        subtitle: 'Key modules that sharpened my analytical toolkit',
        items: [
          {
            title: 'Data Structures & Algorithmic Analysis',
            subtitle: 'Grade: A+ • Asymptotic Complexity, Dynamic Programming & Graphs',
            description: 'Mastered tree algorithms, graph traversals, and memory-optimized caching patterns.',
          },
          {
            title: 'Human-Computer Interaction (HCI)',
            subtitle: 'Grade: A • User Research & Interface Prototyping',
            description: 'Led end-to-end usability audits and qualitative user testing experiments.',
          },
          {
            title: 'Database Systems & Cloud Architecture',
            subtitle: 'Grade: A • Relational Modeling, Indexing & Distributed Stores',
            description: 'Hands-on experience in normalization, query optimization, and acid transactions.',
          },
          {
            title: 'Software Engineering Methodologies',
            subtitle: 'Grade: A+ • Agile, CI/CD, Automated Testing & Clean Code',
            description: 'Served as project lead for a team-based semester-long full stack release.',
          },
        ],
      },
      {
        pageNumber: 4,
        type: 'story',
        chapterTitle: 'Honors',
        title: 'Honors, Scholarships & Awards',
        subtitle: 'Recognitions earned through dedication and peer mentorship',
        items: [
          {
            title: "Dean's Honor List",
            subtitle: 'Conferred across consecutive academic terms',
            description: 'Recognized for top percentile GPA among engineering cohorts.',
            badge: 'Academic Merit',
          },
          {
            title: 'STEM Innovation Scholar',
            subtitle: 'Merit-based competitive scholarship',
            description: 'Awarded for demonstrable leadership and technical promise in technology initiatives.',
            badge: 'Scholarship',
          },
          {
            title: 'Outstanding Peer Tutor Award',
            subtitle: 'Department of Computer Science',
            description: 'Recognized for tutoring 80+ underclass students in introductory Python and C++.',
            badge: 'Teaching',
          },
        ],
      },
      {
        pageNumber: 5,
        type: 'story',
        chapterTitle: 'Capstone',
        title: 'Senior Capstone Project',
        subtitle: 'Real-world deployment solving accessible digital communication',
        content:
          'For my capstone thesis, I spearheaded an assistive technology interface that enables motor-impaired individuals to interact with digital applications using micro-gestures and customizable keyboard shortcuts. The project was selected for presentation at the annual Engineering showcase.',
        items: [
          {
            title: 'System Architecture',
            subtitle: 'React, Web Speech API, OpenCV WebAssembly',
            description: 'Engineered sub-50ms latency gesture detection right inside standard web browsers.',
          },
          {
            title: 'User Testing Outcomes',
            subtitle: 'Validated with 15 test participants',
            description: 'Achieved a 64% reduction in task completion time compared to existing open-source baselines.',
          },
        ],
      },
    ],
  },
  {
    id: 'extracurriculars',
    title: 'Ventures',
    displayTitle: 'VENTURES',
    subtitle: 'Leadership, Community Organizing & Mentorship',
    spineColor: '#E7B5D0',
    spineTextColor: '#482728',
    spineAccentColor: '#482728',
    accentBorderColor: '#C48CA9',
    pattern: 'diamond',
    romanNumeral: 'III',
    heightClass: 'h-50 sm:h-56 md:h-60',
    widthClass: 'w-12 sm:w-14',
    tiltAngle: 0,
    tableOfContents: [
      {
        sectionTitle: 'I. Tech Community & Club Leadership',
        pageNumber: 2,
      },
      {
        sectionTitle: 'II. Hackathon Organizing & Mentoring',
        pageNumber: 3,
      },
      {
        sectionTitle: 'III. Women in STEM Advocacy',
        pageNumber: 4,
      },
    ],
    pages: [
      {
        pageNumber: 1,
        type: 'intro',
        chapterTitle: 'Community',
        title: 'Beyond the Classroom',
        subtitle: 'Fostering inclusive tech cultures and empowering peers',
        content:
          'Building software in isolation is easy; building communities that inspire others to build is where real transformation happens. Here are the initiatives where I dedicate my time and heart.',
        quote: '"If you want to go fast, go alone. If you want to go far, go together."',
      },
      {
        pageNumber: 2,
        type: 'story',
        chapterTitle: 'Leadership',
        title: 'Student Tech Chapter President',
        subtitle: 'Leading a vibrant community of 250+ aspiring builders',
        dateOrPeriod: '2023 — 2024',
        content:
          'Elected as President to revitalize campus tech engagement. Spearheaded weekly study jams, alumni fireside chats, and beginner-friendly coding sprints.',
        items: [
          {
            title: 'Organized 18+ Technical Workshops',
            subtitle: 'Git, React, Cloud Deployments, System Design',
            description: 'Created hands-on curriculum that helped 40+ students land their first software internships.',
          },
          {
            title: 'Corporate Sponsorship & Partnerships',
            subtitle: 'Raised $15,000+ in corporate sponsorship',
            description: 'Partnered with tech firms to sponsor hackathon prizes, student travel grants, and hardware kits.',
          },
        ],
      },
      {
        pageNumber: 3,
        type: 'story',
        chapterTitle: 'Hackathons',
        title: 'Hackathon Director & Mentor',
        subtitle: 'Designing high-impact hackathon experiences for 400+ attendees',
        items: [
          {
            title: 'Lead Organizer & Logistics Chair',
            subtitle: 'Annual 36-hour Regional Collegiate Hackathon',
            description: 'Managed platform registration, judge rubrics, catering, mentor scheduling, and venue safety.',
            badge: 'Director',
          },
          {
            title: 'First-Timer Hackathon Mentor',
            subtitle: 'Guided 30+ beginner teams',
            description: 'Held triage sessions to debug React bugs, Git merge conflicts, and refine presentation pitches.',
            badge: 'Mentor',
          },
        ],
      },
      {
        pageNumber: 4,
        type: 'story',
        chapterTitle: 'Advocacy',
        title: 'Advocating for Women & Underrepresented Groups in STEM',
        subtitle: 'Creating welcoming on-ramps to engineering',
        content:
          'Passionate about closing the gender gap in technology. Hosted coding bootcamps for high school girls and organized panels spotlighting non-traditional journeys in computer science.',
        items: [
          {
            title: 'Girls Who Code Volunteer Instructor',
            subtitle: 'Weekend workshops teaching web fundamentals',
            description: 'Guided students to build their first personal websites and publish live on the internet.',
          },
          {
            title: 'DEI Panel Series Moderator',
            subtitle: 'Campus-wide discussions with female engineering leads',
            description: 'Discussed navigating imposter syndrome, negotiation, and building resilient technical careers.',
          },
        ],
      },
    ],
  },
  {
    id: 'early-years',
    title: 'Security',
    displayTitle: 'SECURITY',
    subtitle: 'Curiosity, First Sparks & Formative Moments',
    spineColor: '#482728',
    spineTextColor: '#C8EAD3',
    spineAccentColor: '#C8EAD3',
    accentBorderColor: '#2C1718',
    pattern: 'diamond',
    romanNumeral: 'IV',
    heightClass: 'h-52 sm:h-58 md:h-62',
    widthClass: 'w-12 sm:w-14',
    tiltAngle: 4, // Tilted like in the photo!
    tableOfContents: [
      {
        sectionTitle: 'I. The First Line of Code',
        pageNumber: 2,
      },
      {
        sectionTitle: 'II. High School Robotics & Science Fairs',
        pageNumber: 3,
      },
      {
        sectionTitle: 'III. The Philosophy of Building',
        pageNumber: 4,
      },
    ],
    pages: [
      {
        pageNumber: 1,
        type: 'intro',
        chapterTitle: 'Origins',
        title: 'The Curiosity Spark',
        subtitle: 'How a curious kid became a relentless builder',
        content:
          'Before GitHub repositories and production deployments, there was an insatiable desire to understand how the digital world works behind the curtain. Here is where the journey began.',
        quote: '"The biggest superpower in the world is believing you have the agency to change what you see."',
      },
      {
        pageNumber: 2,
        type: 'story',
        chapterTitle: 'First Spark',
        title: 'The Family Computer & First "Hello World"',
        subtitle: 'Tinkering with HTML, CSS & broken game files',
        content:
          'My journey started by taking apart old computers and modifying video game config files to see what would happen. When I wrote my first HTML page and saw text change color on a browser screen, it felt like casting magic.',
        items: [
          {
            title: 'Customizing Web Profiles & Blogs',
            subtitle: 'Learning CSS through trial, error, and curiosity',
            description: 'Spent late nights tweaking hex colors, layout divs, and discovering the joy of instant visual feedback.',
          },
          {
            title: 'First Python Script',
            subtitle: 'Automating mundane homework calculations',
            description: 'Realized that computers could do hours of repetitive tasks in fractions of a second.',
          },
        ],
      },
      {
        pageNumber: 3,
        type: 'story',
        chapterTitle: 'Robotics',
        title: 'High School Robotics & Science Fairs',
        subtitle: 'Learning to debug hardware and software under pressure',
        items: [
          {
            title: 'FIRST Robotics Team Lead Programmer',
            subtitle: 'Autonomous navigation and sensor integration',
            description: 'Wrote tele-op and autonomous drive routines in Java, learning how code interacts with the physical world.',
            badge: 'Team Lead',
          },
          {
            title: 'Regional Science Fair Gold Medal',
            subtitle: 'Low-cost automated environmental monitoring station',
            description: 'Constructed an Arduino-based water quality sensor for local rural reservoirs.',
            badge: 'Gold Medal',
          },
        ],
      },
      {
        pageNumber: 4,
        type: 'story',
        chapterTitle: 'Values',
        title: 'Lessons That Still Guide Me Today',
        subtitle: 'Foundations of empathy, clarity, and perseverance',
        items: [
          {
            title: '1. Embrace the Broken State',
            subtitle: 'Every compiler error is an invitation to learn',
            description: 'Early bugs taught me patience and scientific root-cause debugging over guessing.',
          },
          {
            title: '2. People Over Pixels',
            subtitle: 'Software exists to alleviate human friction',
            description: 'The prettiest code is worthless if it does not genuinely solve someone\'s struggle.',
          },
          {
            title: '3. Never Stop Tinkering',
            subtitle: 'Playfulness fuels the best innovations',
            description: 'The most creative breakthroughs come when you approach serious problems with childlike wonder.',
          },
        ],
      },
    ],
  },
  {
    id: 'research',
    title: 'Origins',
    displayTitle: 'ORIGINS',
    subtitle: 'Human-Centered AI, Studies & Insights',
    spineColor: '#C8EAD3',
    spineTextColor: '#482728',
    spineAccentColor: '#482728',
    accentBorderColor: '#9DC5AA',
    pattern: 'bars',
    romanNumeral: 'V',
    heightClass: 'h-48 sm:h-54 md:h-58',
    widthClass: 'w-12 sm:w-14',
    tiltAngle: 0,
    tableOfContents: [
      {
        sectionTitle: 'I. Human-Centered Interface Design',
        pageNumber: 2,
      },
      {
        sectionTitle: 'II. Cognitive Load & Accessible Systems',
        pageNumber: 3,
      },
      {
        sectionTitle: 'III. Publications & Academic Posters',
        pageNumber: 4,
      },
    ],
    pages: [
      {
        pageNumber: 1,
        type: 'intro',
        chapterTitle: 'Research Lab',
        title: 'Inquiry & Investigation',
        subtitle: 'Rigorous empirical research at the intersection of AI & humans',
        content:
          'Technology is expanding faster than our cognitive adaptations. My research explores how computational interfaces can respect human attention, foster autonomy, and bridge accessibility divides.',
        quote: '"The question is not whether machines think, but whether humans are liberated to create."',
      },
      {
        pageNumber: 2,
        type: 'project',
        chapterTitle: 'Studies',
        sectionName: 'Adaptive UI',
        title: 'Adaptive Interfaces Under Stress',
        subtitle: 'Investigating Interface Simplification in High-Stress Scenarios',
        dateOrPeriod: 'University Research Lab',
        projectData: {
          id: 'adaptive-ui-study',
          name: 'Adaptive Interfaces Under Cognitive Strain',
          category: 'research',
          tagline: 'Empirical assessment of dynamic UI reduction during multi-tasking and cognitive overload.',
          role: 'Undergraduate Researcher',
          year: '2024',
          description:
            'Conducted controlled lab experiments measuring eye-tracking patterns and task error rates when interfaces automatically shed non-essential visual elements during detected high-stress tasks.',
          highlights: [
            'Designed a laboratory testing apparatus measuring gaze fixation and reaction latency across 40 subjects',
            'Demonstrated a 31% decrease in critical error rates when interfaces dynamically prioritized core actions',
            'Authored a comprehensive experimental report detailing design heuristics for high-stakes workflows',
          ],
          techStack: ['Python', 'Pandas', 'Eye-Tracking SDK', 'Statistical Regression', 'React Protocol'],
          metrics: [
            { label: 'Participants', value: '40 Subjects' },
            { label: 'Error Reduction', value: '-31%' },
            { label: 'Statistical Sig.', value: 'p < 0.01' },
          ],
        },
      },
      {
        pageNumber: 3,
        type: 'story',
        chapterTitle: 'Accessibility',
        title: 'Cognitive Load & Digital Equity',
        subtitle: 'Bridging technology access for non-native digital users',
        content:
          'Investigated how linguistic nuance and interface metaphors impact mobile adoption in emerging artisan communities (informing direct findings for the Immanka platform).',
        items: [
          {
            title: 'Iconography vs Text Metaphors',
            subtitle: 'Comparative study across demographic groups',
            description: 'Identified that spatial and tactile metaphors increase self-efficacy by 45% over abstract icons.',
          },
          {
            title: 'Audio-Assisted Micro-Confirmations',
            subtitle: 'Reducing transactional anxiety in commerce',
            description: 'Auditory haptic cues doubled user confidence when completing mobile checkout transactions.',
          },
        ],
      },
      {
        pageNumber: 4,
        type: 'story',
        chapterTitle: 'Dissemination',
        title: 'Presentations & Poster Sessions',
        subtitle: 'Sharing empirical insights with the scientific community',
        items: [
          {
            title: 'Regional Undergraduate Research Symposium',
            subtitle: 'Oral Presentation • "Dynamic Layouts for Stress Resilience"',
            description: 'Selected for competitive oral spotlight presentation among 150+ submissions.',
            badge: 'Oral Spotlight',
          },
          {
            title: 'HCI Student Poster Session',
            subtitle: 'Poster Demonstration • "Designing for Low-Bandwidth Empathy"',
            description: 'Engaged with industry practitioners and academic researchers on practical accessibility heuristics.',
            badge: 'Best Poster Nominee',
          },
        ],
      },
    ],
  },
  {
    id: 'hobbies',
    title: 'Craft',
    displayTitle: 'CRAFT',
    subtitle: 'Creativity, Analog Worlds & Soul Fuel',
    spineColor: '#E7B5D0',
    spineTextColor: '#482728',
    spineAccentColor: '#482728',
    accentBorderColor: '#B6C8A9',
    accentBandColor: '#B6C8A9',
    pattern: 'stitched',
    romanNumeral: 'VI',
    heightClass: 'h-52 sm:h-58 md:h-62',
    widthClass: 'w-12 sm:w-14',
    tiltAngle: -2, // Subtle tilt to contrast
    tableOfContents: [
      {
        sectionTitle: 'I. Photography & Visual Storytelling',
        pageNumber: 2,
      },
      {
        sectionTitle: 'II. The Art of Specialty Coffee',
        pageNumber: 3,
      },
      {
        sectionTitle: 'III. Reading & Philosophy Library',
        pageNumber: 4,
      },
      {
        sectionTitle: 'IV. Outdoor Trails & Movement',
        pageNumber: 5,
      },
    ],
    pages: [
      {
        pageNumber: 1,
        type: 'intro',
        chapterTitle: 'Life in Colors',
        title: 'The Art of Living Curiously',
        subtitle: 'The passions that feed my creativity when the laptop closes',
        content:
          'Great software is born from rich life experiences. When I am not building apps, you will find me behind an analog viewfinder, dialing in espresso shots, or lost in a book.',
        quote: '"Keep your eyes open, listen to the quiet things, and stay curious about everything."',
      },
      {
        pageNumber: 2,
        type: 'story',
        chapterTitle: 'Photography',
        title: '35mm Film & Street Photography',
        subtitle: 'Training the eye to notice subtle light, shadow, and geometry',
        content:
          'Shooting 35mm film teaches discipline: with only 36 frames per roll and no instant preview screen, every single composition must be intentional. This analog mindfulness deeply shapes how I compose digital user interfaces.',
        items: [
          {
            title: 'Favorite Cameras',
            subtitle: 'Canon AE-1 & Olympus 35 RC',
            description: 'Cherished mechanical wonders that never run out of battery or require a software patch.',
          },
          {
            title: 'Subjects of Fascination',
            subtitle: 'Architectural shadows, subway commuters, and golden hour geometry',
            description: 'Capturing transient moments of quiet poetry in chaotic urban environments.',
          },
        ],
      },
      {
        pageNumber: 3,
        type: 'story',
        chapterTitle: 'Brewing',
        title: 'Specialty Coffee Craft',
        subtitle: 'The intersection of precision, thermodynamics, and sensory joy',
        content:
          'Brewing coffee is my morning meditation. Dialing in a grind size to within 10 microns, regulating water temperature to 93°C, and timing the extraction bloom mirrors the systematic tinkering of programming.',
        items: [
          {
            title: 'Preferred Rituals',
            subtitle: 'V60 Pour-over & Lever Espresso',
            description: 'Naturally processed Ethiopian beans with floral and bergamot notes.',
          },
          {
            title: 'Coffee & Code Correlation',
            subtitle: 'Ritual of starting creative flow',
            description: 'The smell of freshly ground coffee triggers an immediate state of deep focus.',
          },
        ],
      },
      {
        pageNumber: 4,
        type: 'story',
        chapterTitle: 'Bookshelf',
        title: 'Books That Shaped My Thinking',
        subtitle: 'A few works I constantly return to for perspective',
        items: [
          {
            title: 'The Design of Everyday Things',
            subtitle: 'Don Norman',
            description: 'The foundational bible that taught me poor design is never the user\'s fault.',
            badge: 'Design',
          },
          {
            title: 'Creativity, Inc.',
            subtitle: 'Ed Catmull',
            description: 'Invaluable lessons on fostering environments where honest candor and innovation flourish.',
            badge: 'Leadership',
          },
          {
            title: 'Klara and the Sun',
            subtitle: 'Kazuo Ishiguro',
            description: 'A poetic, poignant exploration of empathy, AI, and what makes human connection irreplaceable.',
            badge: 'Fiction',
          },
        ],
      },
      {
        pageNumber: 5,
        type: 'story',
        chapterTitle: 'Outdoors',
        title: 'Trail Running & Mountain Hiking',
        subtitle: 'Resetting the nervous system with fresh air and altitude',
        content:
          'Long trail runs and mountain hikes offer mental clarity like nothing else. Stepping away from glowing screens to breathe alpine air allows complex engineering problems to quietly untangle themselves in the background.',
        items: [
          {
            title: 'Peak Summits',
            subtitle: 'Pushing personal endurance boundaries',
            description: 'Learning that sustained steady pace climbs mountains far better than frantic bursts.',
          },
          {
            title: 'Nature\'s Palette',
            subtitle: 'Observing organic color harmonies',
            description: 'Earth tones, morning mist, and desert clay inspire many of my web color palettes.',
          },
        ],
      },
    ],
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    displayTitle: 'LINKEDIN',
    subtitle: 'Professional Network & Career Journey',
    spineColor: '#0A66C2', // Official LinkedIn blue with gold typography
    spineTextColor: '#FFFFFF',
    spineAccentColor: '#60A5FA',
    accentBorderColor: '#1E40AF',
    pattern: 'classic',
    romanNumeral: 'VII',
    heightClass: 'h-50 sm:h-56 md:h-60',
    widthClass: 'w-12 sm:w-14',
    tiltAngle: 2,
    isExternalLink: true,
    externalUrl: 'https://www.linkedin.com/in/anaainzaacosta',
    iconName: 'Linkedin',
    tableOfContents: [],
    pages: [],
  },
  {
    id: 'github',
    title: 'GitHub',
    displayTitle: 'GITHUB',
    subtitle: 'Open Source Code & Repositories',
    spineColor: '#1F2937', // Deep slate graphite with gold logo
    spineTextColor: '#F9FAFB',
    spineAccentColor: '#9CA3AF',
    accentBorderColor: '#111827',
    pattern: 'modern',
    romanNumeral: 'VIII',
    heightClass: 'h-52 sm:h-58 md:h-62',
    widthClass: 'w-12 sm:w-14',
    tiltAngle: 0,
    isExternalLink: true,
    externalUrl: 'https://github.com/anaiainza-ux',
    iconName: 'Github',
    tableOfContents: [],
    pages: [],
  },
];
