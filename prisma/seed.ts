import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear all tables
  await prisma.tool.deleteMany()
  await prisma.toolGroup.deleteMany()
  await prisma.caseStudy.deleteMany()
  await prisma.project.deleteMany()
  await prisma.heroTag.deleteMany()
  await prisma.processStep.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.education.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.adminUser.deleteMany()

  // Profile
  await prisma.profile.create({
    data: {
      name: 'Deepak Badgujar',
      tagline: 'Product Designer · UX Researcher',
      hero_eyebrow: 'Product Designer · UX Researcher',
      hero_title: 'I turn messy research into product decisions people trust.',
      hero_lede: "I'm Deepak, an AI-native Product Designer and UX researcher. I ground every decision in real user research, validate it through testing, and move fast from stakeholder alignment to AI-powered prototypes that are production-ready.",
      bio: "I'm a Senior Product Designer and UX researcher with 12+ years of experience designing intuitive, scalable digital experiences across enterprise applications, B2B, B2C, and SaaS products.\n\nI ground every decision in user research and usability testing, then translate those insights into end-to-end product design, combining UX strategy, interaction design, and visual design to simplify complex problems into experiences people trust.\n\nCore Expertise:\n- UX Research, Strategy & End-to-End Product Design\n- Interaction Design, Prototyping & Design Systems\n- Enterprise SaaS & B2B Product Design\n- AI-Augmented Design Workflows\n- Cross-functional Collaboration & Stakeholder Alignment",
      email: 'bdeepakp@gmail.com',
      phone: '+91 8830163905',
      linkedin_url: 'https://www.linkedin.com/in/deepakbadgujar/',
      behance_url: 'https://www.behance.net/deepakbadgujar',
      resume_url: '/resume',
    },
  })

  // Hero tags
  const heroTags = ['Product Design', 'Enterprise SaaS', 'AI-First UX', 'UX Strategy', 'Design Systems', 'Interaction Design']
  for (let i = 0; i < heroTags.length; i++) {
    await prisma.heroTag.create({ data: { label: heroTags[i], order: i } })
  }

  // Projects
  const projects = [
    { title: 'Gamifying the Contact Center', slug: 'gamification', description: 'A gamified engagement system that lets supervisors assign targeted games, challenges and rewards to agents — reducing burnout and lifting performance.', thumb_url: '/images/gamifying-thumb.webp', category: 'Enterprise SaaS', order: 0 },
    { title: 'TravelNext', slug: 'travelnext', description: 'Designing a vision for future business travel management solution', thumb_url: '/images/travelnext-thumb.webp', category: 'Mobile App', order: 1 },
    { title: 'Data Protection', slug: 'dataprotection', description: 'Guarantee data protection through seamless integrations of backup-restore, disaster recovery and high availability solutions.', thumb_url: '/images/dataprotection-thumb.webp', category: 'Enterprise SaaS', order: 2 },
    { title: 'ShareInsights', slug: 'shareinsights', description: 'End-to-end cohesive tool for all your data analytics needs.', thumb_url: '/images/shareinsights-thumb.webp', category: 'Data Analytics', order: 3 },
    { title: 'MyQuiz', slug: 'myquiz', description: 'Native quiz app for fun & learn', thumb_url: '/images/myquiz-thumb.webp', category: 'Mobile App', order: 4 },
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }

  const gamificationProject = await prisma.project.findUnique({ where: { slug: 'gamification' } })
  const travelnextProject = await prisma.project.findUnique({ where: { slug: 'travelnext' } })
  const dataprotectionProject = await prisma.project.findUnique({ where: { slug: 'dataprotection' } })
  const shareinsightsProject = await prisma.project.findUnique({ where: { slug: 'shareinsights' } })
  const myquizProject = await prisma.project.findUnique({ where: { slug: 'myquiz' } })

  // ── GAMIFICATION ────────────────────────────────────────────────────────────
  if (gamificationProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: gamificationProject.id,
        thumb_url: '/images/gamifying-thumb.webp',
        sections: [
          {
            type: 'hero',
            eyebrow: 'Case study · Enterprise SaaS',
            title: 'Gamifying the Contact Center',
            lede: 'A gamified engagement system that lets supervisors assign targeted games, challenges and rewards to agents — reducing burnout and lifting performance.',
            meta: [{ label: 'Duration', value: '6 weeks' }, { label: 'Role', value: 'UX Designer & Researcher' }, { label: 'Team', value: '3 designers' }],
          },
          {
            type: 'overview',
            eyebrow: '01 / Overview',
            title: 'Overview',
            prose: [
              'The intent is to enhance agent performance and establish clear career pathways, empowering supervisors to develop tailored career plans for new hires and significantly boost employee engagement.',
              'Gamification, through the strategic assignment of targeted games, challenges and awards, enables supervisors to select activities suited to each agent\'s tenure and individual needs, increasing motivation. This approach also promotes social engagement and team building among agents.',
            ],
            card: {
              title: 'Project details',
              duration: '31 Aug – 16 Oct 2023 (6 weeks)',
              responsibility: 'Researcher & UX/UI Designer, alongside 2 other designers',
              tools: ['Figma', 'FigJam', 'UserTesting.com'],
            },
          },
          {
            type: 'problem',
            eyebrow: '02 / Problem',
            title: 'Problem & goals',
            lead: 'The contact center was facing a challenge in maintaining optimal agent engagement, resulting in decreased interaction and motivation — this called for new strategies to improve agent engagement.',
            objectives: [
              'Integrate automation into gamification workflows. Automate tasks such as assigning challenges, tracking progress and distributing rewards, freeing up supervisor time and ensuring consistency.',
              'Develop an AI-driven recommendation engine. Analyze agent performance data, skill levels and engagement patterns to surface personalized game and challenge recommendations.',
            ],
            goals: [
              { value: '15%', label: 'Increase in agent engagement scores' },
              { value: '80%', label: 'Of routine gamification tasks automated' },
              { value: '25%', label: 'Increase in agent participation in recommended games' },
            ],
          },
          {
            type: 'process',
            eyebrow: '03 / Process',
            title: 'Design thinking process',
            steps: [
              { n: '01', title: 'Empathize', desc: 'Quantitative surveys, competitor analysis and interviews with supervisors and agents to understand real engagement gaps.' },
              { n: '02', title: 'Define', desc: 'Synthesized research into a clear problem statement and measurable objectives for the team to rally around.' },
              { n: '03', title: 'Ideate', desc: 'Mapped the end-to-end experience through information architecture and user flows across admin and agent roles.' },
              { n: '04', title: 'Design', desc: 'Built wireframes, high-fidelity UI and a reusable design system to keep the experience consistent.' },
              { n: '05', title: 'Test', desc: 'Validated the flow through usability testing and captured a roadmap for what comes next.' },
            ],
          },
          {
            type: 'research',
            eyebrow: '04 / Research',
            title: 'Research & insights',
            lead: 'Our target audience ranges from 18 to 60 years old — the contact center supervisors and agents who would use the platform daily.',
            lead2: 'Quantitative data was gathered through an online survey, focused on agent engagement, supervisor routines and the overall experience with the current system.',
            groups: [
              {
                title: 'Engagement signals',
                items: [
                  { value: '3.2', label: 'Average agent engagement score (out of 5)' },
                  { value: '45%', label: 'Of agents reporting high motivation (4 or 5)' },
                  { value: '2.8', label: 'Average perceived value of current gamification (out of 5)' },
                ],
              },
              {
                title: 'Supervisor workload',
                items: [
                  { value: '10hr', label: 'Supervisor time spent on gamification tasks, per week' },
                  { value: '5hr', label: 'Supervisor time spent on agent coaching, per week' },
                  { value: '7hr', label: 'Supervisor time spent reviewing agent performance data, per week' },
                ],
              },
            ],
          },
          {
            type: 'ia',
            eyebrow: '05 / Information architecture',
            title: 'Structuring the experience',
            lead: 'The platform spans two core roles — an Admin workspace for managing the marketplace, games, challenges and awards, and a Dashboard & Wallboard experience for supervisors and agents to track performance.',
            chips: ['Dashboard', 'Wallboards', 'Objectives', 'Desktop Discovery', 'Admin', 'Marketplace', 'Games', 'Challenges', 'Awards', 'Budget', 'Order Management'],
            bullets: [
              'Admin adds new products and manages the marketplace',
              'Edit, duplicate or delete a product',
              'Agents browse the marketplace and add products to cart or wishlist',
              'Agents place an order from their cart',
              'Admin tracks order status and reports',
            ],
          },
          {
            type: 'design_system',
            eyebrow: '06 / Design system',
            title: 'Design system',
            lead: 'A compact design system kept the experience consistent as wireframes moved into high-fidelity UI — built on an 8px spacing scale and a 12-column grid, set in Open Sans.',
            swatches: [
              { color: '#007AB8', label: 'Primary\n#007AB8' },
              { color: '#003D7A', label: 'Secondary\n#003D7A' },
              { color: '#1ED990', label: 'Success\n#1ED990' },
              { color: '#FBC231', label: 'Warning\n#FBC231' },
              { color: '#F6384E', label: 'Error\n#F6384E' },
              { color: '#191919', label: 'Headings\n#191919' },
              { color: '#333333', label: 'Body text\n#333333' },
            ],
          },
          {
            type: 'competitive',
            eyebrow: '07 / Competitive analysis',
            title: 'Competitor analysis',
            lead: 'We benchmarked 5 main competitors on strategic positioning and competitive advantage, scoring each feature as Low, Medium or High.',
            features: ['Core gamification mechanics', 'Personalization & adaptive gamification', 'Real-time performance tracking', 'Learning & development', 'Integration capabilities', 'Reporting & analytics', 'Automation', 'Scalability & enterprise readiness', 'Support & training'],
            competitors: ['Centrical', 'amplifAI', 'LevelEleven', 'Spinify', 'Genesys', 'Gami App'],
            matrix: [
              ['High', 'Medium', 'High', 'High', 'Medium', 'Medium'],
              ['High', 'High', 'Low', 'Medium', 'Medium', 'Medium'],
              ['High', 'High', 'High', 'Medium', 'High', 'High'],
              ['High', 'Medium', 'Low', 'Low', 'Medium', 'Medium'],
              ['Medium', 'Medium', 'Medium', 'High', 'Medium', 'High'],
              ['High', 'High', 'Medium', 'Low', 'High', 'High'],
              ['Medium', 'Medium', 'Low', 'Low', 'Medium', 'Medium'],
              ['High', 'Medium', 'Medium', 'Low', 'Low', 'High'],
              ['Medium', 'Medium', 'Medium', 'Medium', 'High', 'High'],
            ],
            cards: [
              {
                title: 'Centrical',
                strengths: ['Deep integration of learning and development with gamification.', 'Highly personalized gamification experiences driven by AI.', 'Strong analytics to track the impact of gamification on performance.'],
                weaknesses: ['Gamification features can be part of a very complex overall system.', 'The sheer number of features can overwhelm users.'],
              },
              {
                title: 'Genesys',
                strengths: ['Gamification as part of a robust workforce engagement management suite.', 'Strong emphasis on performance data and reporting.', 'Scalable for large enterprises.'],
                weaknesses: ['Gamification is not the core focus of the platform.', 'Can be complex to implement and customize.'],
              },
              {
                title: 'LevelEleven',
                strengths: ['Excellent for driving short-term performance improvements.', 'Real-time visibility into performance and progress.', 'Very strong at creating a competitive environment.'],
                weaknesses: ['May not be as effective for long-term engagement.', 'Can create a high-pressure environment that leads to burnout.'],
              },
              {
                title: 'Spinify',
                strengths: ['Highly visual and engaging gamification experiences.', 'Easy to use and implement, with a focus on quick wins.', 'Good for boosting morale and creating a fun atmosphere.'],
                weaknesses: ['May lack the depth of features for complex gamification strategies.', 'Less focus on learning and skill development.'],
              },
              {
                title: 'amplifAI',
                strengths: ['AI-driven coaching and performance insights directly tied to gamification.', 'Personalized performance challenges based on individual agent data.'],
                weaknesses: ['Gamification may feel more like performance management than "fun."', 'Potentially less game customization.'],
              },
            ],
          },
          {
            type: 'personas',
            eyebrow: '08 / Personas',
            title: 'User personas',
            personas: [
              {
                n: 'Persona 1',
                name: 'Jacob Jones',
                meta: 'Supervisor · 40 years · Responsible, busy, productive, good communication',
                bio: '8+ years of experience in customer service or a related field. Supervisors require data to monitor team performance, identify agent challenges and provide targeted support — access to information like SLA statistics is crucial for maintaining morale and motivating agents to achieve goals.',
                sections: [
                  { title: 'Goals', items: ['Achieve team KPIs (e.g., CSAT, AHT, First Call Resolution)', 'Reduce agent attrition and improve employee retention', 'Develop and mentor agents to improve their skills', 'Maintain a positive and productive team dynamic'] },
                  { title: 'Expectations & needs', items: ['Real-time performance dashboards and analytics', 'Effective tools for agent coaching and development', 'Streamlined administrative processes and reporting'] },
                  { title: 'Pain points & objections', items: ['High agent turnover and absenteeism', 'Difficulty motivating and engaging agents', 'Lack of time for coaching due to administrative tasks', 'Outdated reporting tools'] },
                ],
              },
              {
                n: 'Persona 2',
                name: 'Dianne Russell',
                meta: 'Customer Support Representative (Agent) · 22 years · Empathetic, hard-working, productive',
                bio: '2.5 years of experience in customer service or a related field. Dianne wants to provide efficient, empathetic customer service — resolving issues quickly and accurately while maintaining a positive customer experience.',
                sections: [
                  { title: 'Goals', items: ['Achieve high customer satisfaction (CSAT) scores', 'Consistently meet or exceed daily/weekly performance targets', 'Develop skills and knowledge to advance within the company'] },
                  { title: 'Expectations & needs', items: ['Clear performance metrics and feedback', 'Opportunities for training and skill development', 'Recognition for good work'] },
                  { title: 'Pain points & objections', items: ['Repetitive tasks and lack of variety', 'Lack of clear communication from supervisors', 'High stress from constant call volume', 'Lack of clear career growth'] },
                ],
              },
            ],
          },
          {
            type: 'empathy_maps',
            eyebrow: '09 / Empathy maps',
            title: 'Empathy maps',
            maps: [
              {
                name: 'Jacob Jones · Supervisor',
                lead: 'Goal: to understand Jacob\'s perspective on agent performance, engagement and the use of gamification.',
                says: ['I need real-time data to track performance.', 'I don\'t have enough time for coaching.', 'The reporting tools are outdated.', 'The team needs more recognition for their hard work.'],
                thinks: ['Is this gamification solution worth the investment?', 'I need to find a way to streamline my workflow.', 'How can I demonstrate the value of gamification to management?'],
                feels: ['Frustrated by outdated reporting tools.', 'Overwhelmed by administrative tasks.', 'Pressure to demonstrate ROI to upper management.'],
                does: ['Monitors agent performance metrics.', 'Conducts team meetings and performance reviews.', 'Creates schedules and assigns daily tasks.'],
                pain_points: ['Outdated reporting and limited visibility', 'Difficulty motivating agents with limited coaching time', 'Balancing team and individual goals during implementation'],
                opportunities: ['Real-time dashboards and unified metrics', 'Integration with existing WFM & QM systems', 'Advanced analytics linking games to KPIs'],
              },
              {
                name: 'Dianne Russell · Agent',
                lead: 'Goal: to understand Dianne\'s perspective on agent performance, engagement and the use of gamification.',
                says: ['The work can be repetitive and boring.', 'I feel like my efforts go unnoticed.', 'I want opportunities to learn and grow.', 'It\'s stressful to constantly meet performance targets.'],
                thinks: ['Do my supervisors appreciate my hard work?', 'How can I stay motivated throughout the day?', 'Is there any opportunity for advancement?'],
                feels: ['Frustrated by repetitive tasks.', 'Demotivated by lack of recognition.', 'Stressed by high call volume and difficult customers.'],
                does: ['Handles inbound/outbound calls and customer interactions.', 'Meets daily/weekly performance targets.', 'Participates in team meetings and training sessions.'],
                pain_points: ['Lack of recognition for hard work', 'Fear of being micromanaged through gamification', 'Limited career development pathways'],
                opportunities: ['Position gamification as a fun recognition system', 'Simple games with quick wins and celebrations', 'Link gamification to skill-building and career growth'],
              },
            ],
          },
          {
            type: 'outcomes',
            eyebrow: '10 / Outcomes',
            title: 'Key takeaways & roadmap',
            takeaways: [
              'Gamification features like leaderboards and real-time dashboards gave supervisors clearer, faster visibility into agent performance.',
              'Supervisors reported feeling more empowered in their daily management routines.',
              'Initially, supervisors were overwhelmed by too many metrics; customizable dashboards resolved this.',
              'Seamless integration with the existing platform made adoption smoother, minimizing training friction.',
              'Close collaboration with product managers helped align gamification features with business KPIs.',
            ],
            roadmap: [
              'Conduct a longitudinal study on user motivation trends.',
              'Use regular supervisor feedback to shape feature priorities, including drill-down reports and AI-generated games.',
              'Automatically recommend coaching topics based on gamification performance data.',
              'Motivate supervisors with leadership scorecards, coaching challenges and milestone achievements.',
              'Extend gamification models to customer satisfaction (CSAT) and quality monitoring tools.',
            ],
          },
        ],
      },
    })
  }

  // ── TRAVELNEXT ──────────────────────────────────────────────────────────────
  if (travelnextProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: travelnextProject.id,
        thumb_url: '/images/travelnext-thumb.webp',
        sections: [
          {
            type: 'hero',
            eyebrow: 'Case study · Globant',
            title: 'TravelNext',
            lede: 'Designing a vision for the future Globant travel management solution.',
            meta: [{ label: 'Platform', value: 'Web & mobile' }, { label: 'Part of', value: 'Glow portal' }, { label: 'Scope', value: '80+ screens' }],
          },
          {
            type: 'image_full',
            url: '/travelnext/visual-designs.jpg',
            alt: 'TravelNext Visual Designs — 80+ screens',
          },
          {
            type: 'overview',
            eyebrow: '01 / Overview',
            title: 'Overview',
            prose: [
              'TravelNext is a digital platform to make official travel easier for Globers. It is a part of the Glow portal and has a web and mobile view.',
              'This platform helps Globers to travel across Globant offices & client locations by booking flights, buses, cabs, hotels & other services. It is used by Globers, GT, PM & various other roles.',
              'The project was an extension of TravelApp-1, which was a travel portal for Globers.',
            ],
            card: { title: 'Project details', tools: ['Figma', 'FigJam', 'Confluence', 'JIRA'] },
          },
          {
            type: 'image_two_col',
            images: [
              { url: '/travelnext/legacy-1.jpg', alt: 'Legacy TravelApp web screens', caption: 'Legacy web platform' },
              { url: '/travelnext/legacy-2.jpg', alt: 'Legacy TravelApp screens', caption: 'Old trip flow' },
            ],
          },
          {
            type: 'problem',
            eyebrow: '02 / Problem',
            title: 'Problem statement & goals',
            lead: 'The existing travel app was difficult to use, had no mobile version and required users to depend on travel agents to create even simple trips.',
            objectives: [
              'Enhance user experience & usability for the existing Travel web app.',
              'Migrate it as a supplementary product of Glow on the Glow platform.',
              'Design this app as a product Globant can publish in the future as a white-label product.',
              'A mobile application does not exist to access the Travel app on mobile platforms.',
              'You have to depend on Globant travel agents (GT) to create a trip.',
              'A Glober cannot see his trip itinerary while traveling.',
            ],
            goals: [
              { value: '80+', label: 'Screens designed for web and mobile' },
              { value: '10', label: 'Usability testing sessions conducted' },
            ],
          },
          {
            type: 'image_full',
            url: '/travelnext/submit-trip.jpg',
            alt: 'Submit Trip in System? Oh no! — user frustration with legacy system',
            caption: '"Submit Trip in System? Oh no!" — users dreaded the old trip creation flow',
          },
          {
            type: 'personas',
            eyebrow: '03 / Users',
            title: 'Users & audience',
            personas: [
              {
                n: 'Persona 1',
                name: 'Kaylee Ryan',
                meta: 'Travel Agent · 30, Female · Mexico',
                bio: 'Kaylee is the travel agent in the organisation. Her job is to verify and approve all the requested trips by Globers. She receives almost 10+ business trip requests every day and has to respond to them before the trip expires.',
                sections: [
                  { title: 'Frustrations', items: ['Too much time spent approving trip bookings - she is busy!', 'Always needs to be in touch with Globers to get all the information in place'] },
                  { title: 'Needs / goals', items: ['Minimal steps to approve trips, and save time', 'Get all the information from the Glober through the application', 'Book the reservation through customized budget plans'] },
                  { title: 'Workflow improvements', items: ['Better user interface for the web application', 'Mobile application to track itinerary and to create a trip from mobile'] },
                ],
              },
              {
                n: 'Persona 2',
                name: 'John Lawson',
                meta: 'Marketing · 37, Male · India',
                bio: 'John is a marketing person at Globant who travels 2-3 times each month for his job. He is frustrated that no matter how frequently he takes similar trips, he spends hours of his day booking travel.',
                sections: [
                  { title: 'Frustrations', items: ['Too much time spent booking - he is a regular traveler!', 'Too many websites visited per trip to compare flight and hotel bookings'] },
                  { title: 'Needs / goals', items: ['Quickly get the information he needs when traveling', 'Maximise his loyalty points and rewards', 'Would like to create/book a trip on his phone'] },
                  { title: 'Workflow improvements', items: ['Better control over global elements', 'Spend less time creating a trip'] },
                ],
              },
              {
                n: 'Persona 3',
                name: 'Alice Gonzalez',
                meta: 'Software Developer · 37, Female · New York',
                bio: 'Alice works at an IT firm in New York as a Lead Software Engineer. Due to the complex booking system she has to take help from her manager and the travel agent whenever she needs to create a trip.',
                sections: [
                  { title: 'Frustrations', items: ['Always takes help from a manager or travel agent (GT)', 'Too much time to find information to plan the trip'] },
                  { title: 'Needs / goals', items: ['Prefers a single airline for domestic travel', 'A user interface that flows freely'] },
                  { title: 'Workflow improvements', items: ['Easy flow for trip creation', 'Spend less time creating a trip'] },
                ],
              },
            ],
          },
          {
            type: 'process',
            eyebrow: '04 / Design process',
            title: 'Design process',
            steps: [
              { n: '01', title: 'Research', desc: 'Involved speaking to the stakeholders, interviewing a few travellers in the organisation, and understanding the users\' pain points, desires and motivation.' },
              { n: '02', title: 'Analysis', desc: 'This involved creating scenarios, defining user roles, task flows, user journeys, use cases etc.' },
              { n: '03', title: 'Insights', desc: 'The product should provide a seamless experience of travelling for a Glober.' },
              { n: '04', title: 'Concepting', desc: 'Creating a high volume of new ideas.' },
              { n: '05', title: 'Production', desc: 'Interacting with users, prototyping based on guidelines and visual consistency.' },
            ],
          },
          {
            type: 'image_full',
            url: '/travelnext/story-map.jpg',
            alt: 'User story map — task flows, user roles and use cases',
            caption: 'User story map: defining all tasks by role across the platform',
          },
          {
            type: 'image_full',
            url: '/travelnext/roadmap.jpg',
            alt: 'TravelNext Product Roadmap — web v1.0 and mobile v5.0',
            caption: '05 / Planning — TravelNext product roadmap across 8 macro sprints',
          },
          {
            type: 'image_two_col',
            images: [
              { url: '/travelnext/wireframes-1.jpg', alt: 'Wireframes — Approach 1', caption: 'Wireframes — Approach 1' },
              { url: '/travelnext/wireframes-2.jpg', alt: 'Wireframes — Approach 2', caption: 'Wireframes — Approach 2' },
            ],
          },
          {
            type: 'image_full',
            url: '/travelnext/dashboard.jpg',
            alt: 'TravelNext Glow portal — My Trips dashboard',
            caption: '06 / Design — Glow portal web dashboard: "My Trips" with trip list and status filters',
          },
          {
            type: 'image_two_col',
            images: [
              { url: '/travelnext/create-trip.jpg', alt: 'Create Trip — mobile stepper flow', caption: 'Create Trip: 4-step mobile stepper (Create → Cost → Passenger → Itinerary)' },
              { url: '/travelnext/cost.jpg', alt: 'Cost allocation — web and mobile', caption: 'Cost allocation: project-based billing across web and mobile' },
            ],
          },
          {
            type: 'image_two_col',
            images: [
              { url: '/travelnext/flights-1.jpg', alt: 'Flight search results — mobile', caption: 'Flight search results with CO₂ emissions and recommended tags' },
              { url: '/travelnext/flights-2.jpg', alt: 'Flight filters and selection — mobile', caption: 'Flight filters (price, stops, CO₂, departure time) and selected flights summary' },
            ],
          },
          {
            type: 'image_two_col',
            images: [
              { url: '/travelnext/hotels.jpg', alt: 'Hotel search — mobile', caption: 'Hotel search: by name, location or let Globers Travel find one' },
              { url: '/travelnext/services.jpg', alt: 'Services — shuttle, car rental, bus, train, ferry', caption: 'Services selection: shuttle, car rental, bus, train, ferry, insurance' },
            ],
          },
          {
            type: 'image_full',
            url: '/travelnext/trip-list.jpg',
            alt: 'Mobile trip list and itinerary',
            caption: 'Mobile: trip list (Ongoing / Upcoming / Older) and day-by-day itinerary view',
          },
          {
            type: 'image_two_col',
            images: [
              { url: '/travelnext/comments.jpg', alt: 'Mobile comments and itinerary detail', caption: 'Comments thread and itinerary detail per trip' },
              { url: '/travelnext/submit-trip.jpg', alt: 'Web trip overview and cost allocation', caption: 'Web: trip overview (tab strip) and cost allocation with billability' },
            ],
          },
          {
            type: 'image_full',
            url: '/travelnext/sessions.jpg',
            alt: 'Usability testing sessions with real users',
            caption: '07 / Research & usability testing — remote sessions with Globers across offices',
          },
          {
            type: 'image_full',
            url: '/travelnext/affinity.jpg',
            alt: 'Usability testing synthesis — Obstacles, Value, Feedback, Recommendations',
            caption: 'Affinity mapping: obstacles, value, feedback and recommendations from 10 usability sessions',
          },
          {
            type: 'image_full',
            url: '/travelnext/visual-designs.jpg',
            alt: 'TravelNext Visual Designs — 80+ screens for web and mobile',
            caption: '08 / Visual designs — 80+ screens designed to make the user journey as friendly as possible',
          },
          {
            type: 'outcomes',
            eyebrow: '09 / Challenges',
            title: 'Challenges & next steps',
            takeaways: [
              'No requirement document in place — requirements had to be discovered through stakeholder interviews',
              'Two different platforms to merge (legacy web app + new Glow portal)',
              'Same users, different purposes: lots of different scenarios and a big volume of information',
              'Different UI but the same issues: old, no information architecture planned, lots of functionality but not user friendly',
              '4 Product Owners were changed during the project',
            ],
            roadmap: [
              'Make a simpler create-trip flow for Globers by excluding a few steps from the existing design',
              'Allow communication with all user roles associated with a trip',
              'Create a mobile app so a Glober can see his trip info while traveling',
              'Design as a product so Globant can sell it later',
            ],
          },
        ],
      },
    })
  }

  // ── DATA PROTECTION ─────────────────────────────────────────────────────────
  if (dataprotectionProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: dataprotectionProject.id,
        thumb_url: '/images/dataprotection-thumb.webp',
        sections: [
          {
            type: 'hero',
            eyebrow: 'Case study · Design strategy',
            title: 'Data Protection',
            lede: 'Guarantee data protection through seamless integrations of backup-restore, disaster recovery, high availability and archiving solutions.',
            meta: [{ label: 'Role', value: 'UI / Visual Design' }, { label: 'Platform', value: 'Web' }, { label: 'Type', value: 'Design strategy' }],
          },
          {
            type: 'overview',
            eyebrow: '01 / Vision',
            title: 'Product vision & attributes',
            prose: [
              'Guarantee data protection through seamless integrations of backup-restore, disaster recovery, high availability and archiving solutions.',
              'Product attributes: Trustworthy · Modern · Focused · Adaptable · Accurate',
            ],
            card: { title: 'Project details', tools: ['Figma', 'FigJam'] },
          },
          {
            type: 'text_prose',
            eyebrow: '02 / Role',
            title: 'Responsibilities',
            prose: [
              'Created key screens user interface.',
              'Used clean and attractive design and layout that would look impressive in all screen sizes and be easier to read.',
              'Worked closely with the UX designer to give the design solution and hand over to the dev team.',
              'Presented the visual screens and interactive prototype to the PO and the stakeholders and got approvals.',
              'Provided continuous input during a functional walkthrough for accurate implementation.',
            ],
          },
          {
            type: 'design_system',
            eyebrow: '03 / System',
            title: 'Design system',
            lead: 'A 12-column fluid grid with a 70px primary navigation. Typography set in Libre Franklin and Work Sans. Consistent status indicators, core colors, neutrals and additional accent colors.',
            swatches: [
              { color: '#1A73E8', label: 'Primary\n#1A73E8' },
              { color: '#0D47A1', label: 'Secondary\n#0D47A1' },
              { color: '#00C853', label: 'Success\n#00C853' },
              { color: '#FF6D00', label: 'Warning\n#FF6D00' },
              { color: '#D50000', label: 'Error\n#D50000' },
              { color: '#212121', label: 'Headings\n#212121' },
              { color: '#757575', label: 'Body text\n#757575' },
            ],
          },
          {
            type: 'image_grid',
            eyebrow: '04 / Visual',
            title: 'Visual experience',
            columns: 2,
            images: [
              { url: '/dataprotection/visual-1.jpg', alt: 'Dashboard view' },
              { url: '/dataprotection/visual-2.jpg', alt: 'Sources list' },
              { url: '/dataprotection/visual-3.jpg', alt: 'Branding configuration' },
              { url: '/dataprotection/visual-4.jpg', alt: 'Branding settings' },
              { url: '/dataprotection/colors.jpg', alt: 'Color system' },
              { url: '/dataprotection/typography.jpg', alt: 'Typography' },
            ],
          },
        ],
      },
    })
  }

  // ── SHAREINSIGHTS ───────────────────────────────────────────────────────────
  if (shareinsightsProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: shareinsightsProject.id,
        thumb_url: '/images/shareinsights-thumb.webp',
        sections: [
          {
            type: 'hero',
            eyebrow: 'Case study · Big data analytics',
            title: 'ShareInsights',
            lede: 'End-to-end cohesive tool for all your data analytics needs.',
            meta: [{ label: 'Role', value: 'UI / UX Designer' }, { label: 'Platform', value: 'Web' }, { label: 'Process', value: 'Waterfall' }],
          },
          {
            type: 'overview',
            eyebrow: '01 / About',
            title: 'About ShareInsights',
            prose: [
              'ShareInsights makes it easy for anyone to explore, transform and visualize big, complex data on AWS or Hadoop data lakes in minutes.',
              'The most comprehensive platform for accelerating time-to-insight.',
            ],
            card: {
              title: 'Role',
              responsibility: 'Played a hybrid role as UI/UX designer. Gathered the requirements and understood the user/client needs. Coordinated with the Account Manager, BA, and back-end / front-end dev teams.',
              tools: ['Figma', 'FigJam'],
            },
          },
          {
            type: 'problem',
            eyebrow: '02 / Product',
            title: 'Attributes & key features',
            objectives: [
              'Explore Data — browse and query large datasets with ease.',
              'Create Insights — build advanced analytics applications with no code modelling.',
              'Share Insights — distribute dashboards and reports to stakeholders in minutes.',
            ],
            goals: [
              { value: 'No code', label: 'Modelling for big-data transformation pipelines' },
              { value: 'Fast', label: 'Reduce time to create high-performance dashboards' },
            ],
          },
          {
            type: 'process',
            eyebrow: '03 / Process',
            title: 'Design process',
            steps: [
              { n: '01', title: 'Research', desc: 'User interview, experts discussions, competitive analysis, data analysis.' },
              { n: '02', title: 'Define', desc: 'Personas, task flow, low-fi wireframes, screen flow, information architecture.' },
              { n: '03', title: 'Prototype', desc: 'Ideation, work on concept, interactive prototype, user testing.' },
              { n: '04', title: 'Design', desc: 'Style guide, component library, hi-fi designs, design review, interactive prototype, usability test.' },
              { n: '05', title: 'Deliver', desc: 'Developer handover, tech feasibility, iterations.' },
            ],
          },
          {
            type: 'personas',
            eyebrow: '04 / Users',
            title: 'Personas',
            personas: [
              {
                n: 'Persona 1',
                name: 'Khushal Daruka',
                meta: 'BI Developer · 35 · Pune, India',
                bio: 'A data analyst who needs to work with big data regularly. Wants a platform that simplifies complex data operations without requiring deep programming knowledge.',
                sections: [
                  { title: 'Needs / goals', items: ['A platform where I can play with big data', 'The UI of the tool should be easier and more user friendly', 'Less time and effort to create a report'] },
                  { title: 'Challenges / frustrations', items: ['Need to ask a developer to create a dashboard every time', 'Need experience with a BI tool to perform tasks', 'Python knowledge and scripting languages are obligatory'] },
                  { title: 'Workflow improvements', items: ['Reduce the steps to create interactive dashboards', 'Easy query search and merge to segments with common data'] },
                ],
              },
              {
                n: 'Persona 2',
                name: 'Himmat Sahgal',
                meta: 'Data Analyst, Digital Marketing · 40 · Pune, India',
                bio: 'Digital marketing data analyst who prepares reports for executive leadership. Needs a tool that is both powerful and accessible without deep technical skills.',
                sections: [
                  { title: 'Needs / goals', items: ['Designing and maintaining data systems and databases', 'Preparing reports for executive leadership', 'Creating approachable reports for non-technical stakeholders'] },
                  { title: 'Challenges / frustrations', items: ['Complex SQL queries needed for simple reports', 'Hours spent on data cleaning before analysis'] },
                  { title: 'Workflow improvements', items: ['Visual pipeline builder for data transformations', 'One-click dashboard sharing'] },
                ],
              },
            ],
          },
          {
            type: 'image_grid',
            eyebrow: '05 / Wireframes',
            title: 'Wireframes',
            columns: 2,
            images: [
              { url: '/shareinsights/wf-editor.jpg', alt: 'Editor wireframe' },
              { url: '/shareinsights/wf-dataset-config.jpg', alt: 'Dataset config wireframe' },
              { url: '/shareinsights/wf-task-config.jpg', alt: 'Task config wireframe' },
              { url: '/shareinsights/wf-widget-config.jpg', alt: 'Widget config wireframe' },
            ],
          },
          {
            type: 'design_system',
            eyebrow: '06 / Design system',
            title: 'Design system',
            lead: 'A clean, minimal design language built on a consistent 8px grid. Focused on data density and readability for long work sessions.',
            swatches: [
              { color: '#1565C0', label: 'Primary\n#1565C0' },
              { color: '#0288D1', label: 'Secondary\n#0288D1' },
              { color: '#2E7D32', label: 'Success\n#2E7D32' },
              { color: '#F57F17', label: 'Warning\n#F57F17' },
              { color: '#B71C1C', label: 'Error\n#B71C1C' },
            ],
          },
          {
            type: 'image_grid',
            eyebrow: '07 / Dashboards',
            title: 'Dashboard designs',
            columns: 2,
            images: [
              { url: '/shareinsights/dashboard-1.jpg', alt: 'Dashboard view 1' },
              { url: '/shareinsights/dashboard-2.jpg', alt: 'Dashboard view 2' },
              { url: '/shareinsights/dashboard-3.jpg', alt: 'Dashboard view 3' },
              { url: '/shareinsights/dashboard-4.jpg', alt: 'Dashboard view 4' },
            ],
          },
        ],
      },
    })
  }

  // ── MYQUIZ ──────────────────────────────────────────────────────────────────
  if (myquizProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: myquizProject.id,
        thumb_url: '/images/myquiz-thumb.webp',
        sections: [
          {
            type: 'hero',
            eyebrow: 'Case study · Mobile app',
            title: 'MyQuiz',
            lede: 'Native quiz app for fun & learn.',
            meta: [{ label: 'Platform', value: 'iOS & Android' }, { label: 'Use', value: 'Quizzes, surveys & polls' }, { label: 'Focus', value: 'Gamification' }],
          },
          {
            type: 'overview',
            eyebrow: '01 / Overview',
            title: 'Overview',
            prose: [
              'MyQuiz app is created for fun, surveys and polls, where users can earn points and badges after successfully completing a quiz. They find different kinds of quiz for fun and enjoy them with their colleagues and friends.',
              'HR can use this app for mandatory surveys and can also take polls.',
            ],
            card: { title: 'Project details', tools: ['Figma'] },
          },
          {
            type: 'problem',
            eyebrow: '02 / Challenges',
            title: 'Challenges',
            objectives: [
              'Multiple platforms are used by people for quizzes and surveys.',
              'Even for a mandatory quiz, multiple reminders need to be sent.',
              'There is a lack of encouragement to complete a mandatory quiz.',
            ],
            goals: [
              { value: '52%', label: 'Of users want to learn new technical things using this quiz app' },
              { value: '70%', label: 'Of users want to create their own questionnaires for fun activities' },
            ],
          },
          {
            type: 'text_prose',
            eyebrow: '03 / Key idea',
            title: 'What is behind it',
            prose: [
              'Create a single platform where everyone can play a quiz and create a quiz. Make the user experience better, so everyone can easily use the platform.',
              'Customised quiz creation and a global leaderboard. Encourage users with points and badges to complete mandatory quizzes.',
            ],
          },
          {
            type: 'process',
            eyebrow: '05 / Approach',
            title: 'Research approach',
            steps: [
              { n: '01', title: 'User interviews', desc: 'Connected with multiple users in the organisation to understand their needs, behaviours, and to gain a deeper knowledge of the pain points.' },
              { n: '02', title: 'Survey insights', desc: 'Asked users about quiz topics they would like to play, which device they prefer, and what motivates them after completing a quiz.' },
              { n: '03', title: 'Ideation', desc: 'Defined the core concept: a universal quiz platform with customisation, gamification and mandatory survey enforcement.' },
              { n: '04', title: 'Design', desc: 'Clean, simple and easy UI focused on encouraging quiz completion through points, badges and leaderboards.' },
            ],
          },
          {
            type: 'image_full',
            url: '/myquiz/hero.jpg',
            alt: 'MyQuiz app hero screens',
          },
          {
            type: 'image_grid',
            eyebrow: '06 / Design',
            title: 'App screens',
            columns: 3,
            images: [
              { url: '/myquiz/screens-home.jpg', alt: 'Home screen' },
              { url: '/myquiz/screens-launch.jpg', alt: 'Quiz launch' },
              { url: '/myquiz/screens-score.jpg', alt: 'Score screen' },
              { url: '/myquiz/screens-other.jpg', alt: 'Other screens' },
              { url: '/myquiz/colors.jpg', alt: 'Color system' },
              { url: '/myquiz/typography.jpg', alt: 'Typography' },
            ],
          },
          {
            type: 'outcomes',
            eyebrow: '07 / Goals & outcomes',
            title: 'Goals & objectives',
            takeaways: [
              'Make a universal platform for making and playing quizzes.',
              'Create customised quizzes with a clean, simple and easy UI.',
              'Encourage users using gamification — points, badges, and leaderboards.',
              'Help users know the importance of completing surveys and polls.',
            ],
            roadmap: [
              'Global leaderboard across all quizzes.',
              'Push notifications for mandatory surveys.',
              'Teams/group quiz mode.',
              'HR analytics dashboard for survey completion rates.',
            ],
          },
        ],
      },
    })
  }

  // Process steps
  const processSteps = [
    { phase: 'Discover', title: 'Find the real problem', description: 'Stakeholder interviews, analytics review, field visits. I leave with a problem statement, not a feature list.', output_label: 'Interviews', output_tag: 'Interviews', order: 0 },
    { phase: 'Define', title: 'Frame what\'s worth solving', description: 'Journey maps and affinity synthesis turn raw notes into a short list of opportunities, ranked by evidence.', output_label: 'Synthesis', output_tag: 'Synthesis', order: 1 },
    { phase: 'Design', title: 'Prototype in public', description: 'Low-fidelity first, shared early and often with engineering so feasibility shapes the design, not the other way round.', output_label: 'Prototyping', output_tag: 'Prototyping', order: 2 },
    { phase: 'Validate', title: 'Test, then ship', description: 'Moderated usability testing against clear success criteria, then a measured rollout with a plan to check the metric that mattered.', output_label: 'Usability testing', output_tag: 'Usability testing', order: 3 },
  ]
  for (const step of processSteps) {
    await prisma.processStep.create({ data: step })
  }

  // Experience
  const experiences = [
    {
      company: 'NICE Systems Ltd.',
      role: 'Specialist UX Designer',
      start_date: 'Feb 2022',
      end_date: 'Nov 2026',
      location: 'Pune, India',
      intro: 'Driving end-to-end product design for enterprise SaaS solutions at NICE, transforming complex business requirements and user needs into intuitive, scalable product experiences.',
      bullets: [
        'Lead UX research, product discovery, and UX strategy to understand user needs and drive design decisions.',
        'Own end-to-end product design, from ideation and user flows to interaction design, prototyping, and visual design.',
        'Design complex enterprise workflows and data-driven experiences for next-generation products.',
        'Contribute to scalable design systems, ensuring consistency, usability, and accessibility across products.',
        'Collaborate with Product, Engineering, and UX teams across multiple R&D initiatives.',
        'Drive UX initiatives for products including Data Policies, Interaction Search, and Intelligence Viewer.',
      ],
      order: 0,
    },
    {
      company: 'Globant India Pvt. Ltd',
      role: 'Senior UX Designer',
      start_date: 'Feb 2018',
      end_date: 'Jan 2022',
      location: 'Pune, India',
      intro: '',
      bullets: [
        'Responsible for create interfaces, style guide, web-based, mobile, enterprise applications and website designs.',
        'Drive ideation, concept exploration, digital strategy, and solution delivery for digital products and services.',
        'Designed effective interaction strategies, focusing on intuitive navigation and user flows.',
        'Partnered with product management, marketing, and engineering teams to define the strategic project vision.',
      ],
      order: 1,
    },
    {
      company: 'Persistent Systems Limited',
      role: 'Module Lead Visual Designer',
      start_date: 'May 2014',
      end_date: 'Feb 2018',
      location: 'Pune, India',
      intro: '',
      bullets: [
        'Collaborated with cross-functional teams and clients to design and develop engaging Rich Internet Applications.',
        'Led the prototyping and UI development for the Data Analytics Platform.',
        'Proactively ensure platform-wide consistency by documenting use cases and UI elements.',
        'Contributed through skills in demo creation, wireframing, prototyping, data visualization, and interaction design.',
      ],
      order: 2,
    },
    {
      company: 'R Design',
      role: 'Web Designer',
      start_date: 'Mar 2011',
      end_date: 'Apr 2014',
      location: 'Pune, India',
      intro: '',
      bullets: [
        'Responsible for the visual design and user interface of websites, ensuring they are aesthetically pleasing and responsive.',
        'Collaborated with cross-functional teams — developers, marketers, content writers — to achieve project goals.',
        'Communicated effectively with clients to understand their needs and present design concepts.',
      ],
      order: 3,
    },
  ]
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp })
  }

  // Certifications
  await prisma.certification.create({ data: { title: 'HFI - Certified Usability Analyst (CUA™)', issuer: 'Human Factors International, Inc.', start_date: 'Jun 2023', end_date: 'Sep 2023', order: 0 } })
  await prisma.certification.create({ data: { title: 'Diploma in Website Design', issuer: 'Midas Multimedia, Pune', start_date: 'Jun 2009', end_date: 'Mar 2012', order: 1 } })

  // Education
  await prisma.education.create({ data: { degree: 'Bachelor in Arts', institution: 'University of Pune', start_date: 'Jun 2009', end_date: 'Mar 2012', order: 0 } })
  await prisma.education.create({ data: { degree: 'H.S.C. High School', institution: 'Nutan Maratha Vidyalaya, Jalgaon', start_date: 'Jun 2008', end_date: 'Mar 2009', order: 1 } })

  // Tool groups
  const toolGroupsData = [
    { name: 'Design', order: 0, tools: ['Figma', 'Make', 'FigJam', 'Claude Design'] },
    { name: 'AI', order: 1, tools: ['ChatGPT', 'Claude', 'Gemini', 'Generative AI tools', 'AI-assisted design tools'] },
    { name: 'Collaboration', order: 2, tools: ['Miro', 'Jira', 'Confluence'] },
    { name: 'Technical Knowledge', order: 3, tools: ['HTML', 'CSS'] },
    { name: 'Methodologies', order: 4, tools: ['Agile', 'Design Thinking', 'UCD'] },
  ]
  for (const tg of toolGroupsData) {
    const group = await prisma.toolGroup.create({ data: { name: tg.name, order: tg.order } })
    for (let i = 0; i < tg.tools.length; i++) {
      await prisma.tool.create({ data: { name: tg.tools[i], group_id: group.id, order: i } })
    }
  }

  // Admin user
  const passwordHash = await bcrypt.hash('admin123', 12)
  await prisma.adminUser.create({ data: { email: 'admin@deepak.com', password_hash: passwordHash } })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
