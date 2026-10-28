import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'tech-atlas',
    title: 'Tech Atlas 2026',
    tagline: 'Built by me, for me.',
    status: 'LIVE',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    description: 'Personal tech-journey tracker engineered to map technical progression, structured curricula, active goals, and software deployments.',
    problem: 'Disorganized self-taught learning paths across low-level computing, frontend engineering, and AI integration led to fragmented progress.',
    result: 'Unified single-source operating cockpit tracking 12-week milestones, active sprints, and installation telemetry.',
    features: [
      'Control Panel & Telemetry',
      'Tech Atlas Skill Map',
      '12-Week Execution Plan',
      'Install Queue & Focus Log',
      'Goals & Settings Matrix',
      'Career Lab'
    ],
    liveUrl: 'https://personal-tech-journey-tracker.vercel.app',
    githubUrl: '[PLACEHOLDER: Tech Atlas GitHub URL]',
    posterImage: '/images/projects/tech-atlas-poster.avif',
    isFlagship: true
  },
  {
    id: 'disaster-shield',
    title: 'DisasterShield',
    tagline: 'Emergency coordination and crisis dispatch framework.',
    status: 'COMPLETED',
    stack: ['React Native', 'Node.js', 'Express', 'Supabase', 'UML'],
    description: 'Undergraduate capstone system designed for real-time disaster reporting, situational mapping, and verified rescue dispatch.',
    problem: 'Critical lag and communication breakdowns during regional natural catastrophes and power outages.',
    result: 'Architected offline-resilient mobile client synchronized via Express and Supabase geo-queries with full UML specifications.',
    features: [
      'Incident Reporting & Geolocation',
      'Offline-First Sync Engine',
      'Relief Team Dispatch Routing',
      'Comprehensive UML Architecture'
    ],
    githubUrl: '[PLACEHOLDER: DisasterShield GitHub URL]',
    liveUrl: '[PLACEHOLDER: DisasterShield Demo URL]',
    posterImage: '/images/projects/disastershield-poster.avif'
  },
  {
    id: 'library-management',
    title: 'Library Management System',
    tagline: 'Zero-overhead cataloging and transaction engine.',
    status: 'BUILT',
    stack: ['C++', 'OOP', 'File Systems'],
    description: 'Terminal-based high-performance book database and member tracking console.',
    problem: 'Manual logbooks and resource-heavy commercial software in resource-constrained environments.',
    result: 'Robust modular C++ program with deterministic memory management and persistent binary/text serialization.',
    features: [
      '[PLACEHOLDER: OOP structure, file handling, search/issue/return]'
    ],
    githubUrl: '[PLACEHOLDER: Library Management GitHub URL]',
    posterImage: '/images/projects/library-mgmt-poster.avif'
  },
  {
    id: 'hand-gesture-art',
    title: 'Hand-Gesture Art Canvas',
    tagline: 'Computer vision spatial canvas without physical touch.',
    status: 'BUILT',
    stack: ['Python', 'OpenCV', 'MediaPipe'],
    description: 'Vision-driven generative drawing application powered by 21-landmark real-time hand skeleton tracking.',
    problem: 'Bridging contactless human interaction with digital vector art creation using commodity webcams.',
    result: 'Zero-latency fingertip path interpolation with customizable brush dynamics and air-gesture trigger palettes.',
    features: [
      '21-Point 3D Hand Landmark Tracking',
      'Pinch & Hover State Machine',
      'Dynamic Stroke Smoothing',
      'Color Palette Selector Gestures'
    ],
    githubUrl: '[PLACEHOLDER: Hand-Gesture Art GitHub URL]',
    posterImage: '/images/projects/hand-gesture-poster.avif'
  },
  {
    id: 'subscription-tracker',
    title: 'Subscription Tracker',
    tagline: 'Proactive recurring expense watcher with AI leak scoring.',
    status: 'IN PROGRESS',
    stack: ['Expo', 'React Native', 'Supabase', 'Edge Cron', 'OpenAI API'],
    description: 'Cross-platform mobile utility tracking active digital subscriptions, billing cycles, and automated AI cancellation advice.',
    problem: 'Unnoticed recurring billing bleed across software services and digital tooling.',
    result: 'Predictive recurring invoice engine with scheduled notifications and utility scoring.',
    features: [
      'Automated Billing Cadence Tracking',
      'Scheduled Push Reminders',
      'AI Value / Cost Utility Scoring',
      'Multi-Currency Conversion'
    ],
    githubUrl: '[PLACEHOLDER: Subscription Tracker GitHub URL]',
    posterImage: '/images/projects/subscription-tracker-poster.avif'
  },
  {
    id: 'langar',
    title: 'Langar Community Events',
    tagline: 'Hyperlocal directory for community food and sacred gatherings.',
    status: 'IN PROGRESS',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    description: 'Community-facing real-time directory and event board for langars, khatams, and mehfils with verified timings and organizers.',
    problem: 'Fragmented word-of-mouth announcements resulting in missed gatherings and surplus food logistics.',
    result: 'Responsive map and chronological feed with direct contact channels and schedule updates.',
    features: [
      'Event Submission & Verification',
      'Location Proximity Filtering',
      'Time Cadence & Meal Count Estimates',
      'Direct Organizer Contacts'
    ],
    githubUrl: '[PLACEHOLDER: Langar GitHub URL]',
    posterImage: '/images/projects/langar-poster.avif'
  },
  {
    id: 'weather-reminder',
    title: 'Calendar-Aware Weather Assistant',
    tagline: 'Smart agenda protector against microclimate surprises.',
    status: 'PLANNED',
    stack: ['Next.js', 'Tailwind CSS', 'OpenWeather API', 'Google Calendar API'],
    description: 'Proactive utility cross-referencing daily itinerary locations with precipitation and heat index forecasts.',
    problem: 'Standard calendar alerts do not account for commute weather hazards or outdoor event viability.',
    result: 'Rule-based notification pipeline notifying the user before departing for scheduled appointments.',
    features: [
      'Event Geolocation Parsing',
      'Hourly Delta Precipitation Triggers',
      'Commute Buffer Recommendations'
    ],
    posterImage: '/images/projects/weather-reminder-poster.avif'
  },
  {
    id: 'salesforce-klaviyo-demos',
    title: 'Salesforce & Klaviyo Demo Orgs',
    tagline: 'Enterprise customer journey pipelines and telemetry triggers.',
    status: 'DEMO',
    stack: ['Salesforce', 'Klaviyo', 'Webhooks', 'REST API'],
    description: 'Custom sandboxed integration environments illustrating multi-tier customer automation and event-driven email journeys for freelance clients.',
    problem: 'Clients requiring proof-of-capability for complex lifecycle marketing and data schema mapping.',
    result: 'Production-grade sandbox workflows demonstrating webhook event listeners and conditional lead routing.',
    features: [
      'Lead Lifecycle Automated Flow',
      'Custom Webhook Event Dispatcher',
      'Dynamic Behavioral Segmentation',
      'Audit Logging Pipeline'
    ],
    githubUrl: '[PLACEHOLDER: Demo Orgs Repository / Documentation]',
    posterImage: '/images/projects/salesforce-klaviyo-poster.avif'
  }
];
