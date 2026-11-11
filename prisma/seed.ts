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
      bio: "I'm a Senior Product Designer and UX researcher with 12+ years of experience designing intuitive, scalable digital experiences across enterprise applications, B2B, B2C, and SaaS products.\n\nI ground every decision in user research and usability testing, then translate those insights into end-to-end product design, combining UX strategy, interaction design, and visual design to simplify complex problems into experiences people trust.\n\nI use AI to move faster through research synthesis, ideation, and prototyping, not to replace the judgment that comes from talking to real users, but to get validated designs into engineering's hands sooner.\n\nCore Expertise:\n- UX Research, Strategy & End-to-End Product Design\n- Interaction Design, Prototyping & Design Systems\n- Enterprise SaaS & B2B Product Design\n- AI-Augmented Design Workflows\n- Cross-functional Collaboration & Stakeholder Alignment\n\nExperienced across Contact Center, Healthcare, Insurance, Banking, Industrial, and Media domains.",
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
    { title: 'Gamifying the Contact Center', slug: 'gamification', description: 'Reducing Agent Burnout Through Gamified Performance Tracking', thumb_url: '/images/gamifying-thumb.webp', category: 'Enterprise SaaS', order: 0 },
    { title: 'TravelNext', slug: 'travelnext', description: 'Designing a vision for future business travel management solution', thumb_url: '/images/travelnext-thumb.webp', category: 'Mobile App', order: 1 },
    { title: 'Data Protection', slug: 'dataprotection', description: 'Guarantee data protection through seamless integration of backup-restore...', thumb_url: '/images/dataprotection-thumb.webp', category: 'Enterprise SaaS', order: 2 },
    { title: 'ShareInsights', slug: 'shareinsights', description: 'End-to-end cohesive tool for all your data analytics needs.', thumb_url: '/images/shareinsights-thumb.webp', category: 'Data Analytics', order: 3 },
    { title: 'MyQuiz', slug: 'myquiz', description: 'Native Quiz app for Fun & Learn', thumb_url: '/images/myquiz-thumb.webp', category: 'Mobile App', order: 4 },
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }

  // Case studies
  const gamificationProject = await prisma.project.findUnique({ where: { slug: 'gamification' } })
  const travelnextProject = await prisma.project.findUnique({ where: { slug: 'travelnext' } })
  const dataprotectionProject = await prisma.project.findUnique({ where: { slug: 'dataprotection' } })
  const shareinsightsProject = await prisma.project.findUnique({ where: { slug: 'shareinsights' } })
  const myquizProject = await prisma.project.findUnique({ where: { slug: 'myquiz' } })

  if (gamificationProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: gamificationProject.id,
        sections: [
          { type: 'hero', eyebrow: 'Case study · Enterprise SaaS', title: 'Gamifying the Contact Center', lede: 'A gamified engagement system that lets supervisors assign targeted games, challenges and rewards to agents — reducing burnout and lifting performance.', meta: [{ label: 'Duration', value: '6 weeks' }, { label: 'Role', value: 'UX Designer & Researcher' }, { label: 'Team', value: '3 designers' }] },
          { type: 'overview', eyebrow: '01 / Overview', title: 'Overview', prose: ['The intent is to enhance agent performance and establish clear career pathways, empowering supervisors to develop tailored career plans for new hires and significantly boost employee engagement.', 'Gamification, through the strategic assignment of targeted games, challenges and awards, enables supervisors to select activities suited to each agent\'s tenure and individual needs, increasing motivation. This approach also promotes social engagement and team building among agents.'], card: { title: 'Project details', duration: '31 Aug – 16 Oct 2023 (6 weeks)', responsibility: 'Researcher & UX/UI Designer, alongside 2 other designers', tools: ['Figma', 'FigJam', 'UserTesting.com'] } },
          { type: 'problem', eyebrow: '02 / Problem', title: 'Problem & goals', lead: 'The contact center was facing a challenge in maintaining optimal agent engagement, resulting in decreased interaction and motivation — this called for new strategies to improve agent engagement.', objectives: ['Integrate automation into gamification workflows. Automate tasks such as assigning challenges, tracking progress and distributing rewards, freeing up supervisor time and ensuring consistency.', 'Develop an AI-driven recommendation engine. Analyze agent performance data, skill levels and engagement patterns to surface personalized game and challenge recommendations.'], goals: [{ value: '15%', label: 'Increase in agent engagement scores' }, { value: '80%', label: 'Of routine gamification tasks automated' }, { value: '25%', label: 'Increase in agent participation in recommended games' }] },
          { type: 'process', eyebrow: '03 / Process', title: 'Design thinking process', steps: [{ n: '01', title: 'Empathize', desc: 'Quantitative surveys, competitor analysis and interviews with supervisors and agents to understand real engagement gaps.' }, { n: '02', title: 'Define', desc: 'Synthesized research into a clear problem statement and measurable objectives for the team to rally around.' }, { n: '03', title: 'Ideate', desc: 'Mapped the end-to-end experience through information architecture and user flows across admin and agent roles.' }, { n: '04', title: 'Design', desc: 'Built wireframes, high-fidelity UI and a reusable design system to keep the experience consistent.' }, { n: '05', title: 'Test', desc: 'Validated the flow through usability testing and captured a roadmap for what comes next.' }] },
          { type: 'outcomes', eyebrow: '10 / Outcomes', title: 'Key takeaways & roadmap', takeaways: ['Gamification features like leaderboards and real-time dashboards gave supervisors clearer, faster visibility into agent performance.', 'Supervisors reported feeling more empowered in their daily management routines.', 'Simplified metrics helped reduce overwhelm during the onboarding phase.', 'Seamless integration with the existing platform made adoption smoother, minimizing training friction.'], roadmap: ['Conduct a longitudinal study on user motivation trends.', 'Use regular supervisor feedback to shape feature priorities, including drill-down reports and AI-generated games.', 'Automatically recommend coaching topics based on gamification performance data.', 'Extend gamification models to customer satisfaction (CSAT) and quality monitoring tools.'] },
        ],
      },
    })
  }

  if (travelnextProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: travelnextProject.id,
        sections: [
          { type: 'hero', eyebrow: 'Case study · Mobile App', title: 'TravelNext', lede: 'Designing a vision for future business travel management solution — seamless hotel search, booking, and trip management.', meta: [{ label: 'Role', value: 'UX Designer' }, { label: 'Type', value: 'Mobile App' }] },
          { type: 'overview', eyebrow: '01 / Overview', title: 'Overview', prose: ['TravelNext is a next-generation business travel management app designed to streamline the entire corporate travel workflow from search to booking to expense tracking.', 'The goal was to design an intuitive mobile experience that reduces friction in business travel planning while ensuring policy compliance.'], card: { title: 'Project details', tools: ['Figma', 'FigJam'] } },
        ],
      },
    })
  }

  if (dataprotectionProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: dataprotectionProject.id,
        sections: [
          { type: 'hero', eyebrow: 'Case study · Enterprise SaaS', title: 'Data Protection', lede: 'Guarantee data protection through seamless integration of backup-restore capabilities into enterprise workflows.', meta: [{ label: 'Role', value: 'UX Designer' }, { label: 'Type', value: 'Enterprise SaaS' }] },
          { type: 'overview', eyebrow: '01 / Overview', title: 'Overview', prose: ['Designed a comprehensive data protection dashboard that enables enterprises to manage backup policies, monitor data integrity, and restore data quickly when needed.', 'The challenge was making complex technical workflows accessible to non-technical stakeholders while maintaining power-user capabilities.'], card: { title: 'Project details', tools: ['Figma', 'FigJam'] } },
        ],
      },
    })
  }

  if (shareinsightsProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: shareinsightsProject.id,
        sections: [
          { type: 'hero', eyebrow: 'Case study · Data Analytics', title: 'ShareInsights', lede: 'End-to-end cohesive tool for all your data analytics needs — cost reporting, dashboards, and collaborative insights.', meta: [{ label: 'Role', value: 'UX Designer' }, { label: 'Type', value: 'Data Analytics' }] },
          { type: 'overview', eyebrow: '01 / Overview', title: 'Overview', prose: ['ShareInsights is a unified analytics platform that consolidates cost reporting, data visualization, and team collaboration into a single cohesive tool.', 'The design challenge was creating an interface that serves both technical data analysts and business stakeholders without overwhelming either group.'], card: { title: 'Project details', tools: ['Figma', 'FigJam'] } },
        ],
      },
    })
  }

  if (myquizProject) {
    await prisma.caseStudy.create({
      data: {
        project_id: myquizProject.id,
        sections: [
          { type: 'hero', eyebrow: 'Case study · Mobile App', title: 'MyQuiz', lede: 'Native Quiz app for Fun & Learn — an engaging educational quiz platform with gamified learning mechanics.', meta: [{ label: 'Role', value: 'UX Designer' }, { label: 'Type', value: 'Mobile App' }] },
          { type: 'overview', eyebrow: '01 / Overview', title: 'Overview', prose: ['MyQuiz is a native mobile quiz application designed to make learning fun through gamified quiz mechanics, leaderboards, and social sharing.', 'The focus was on creating an engaging, accessible interface that motivates continued learning through positive reinforcement.'], card: { title: 'Project details', tools: ['Figma'] } },
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
        'Collaborate with Product, Engineering, and UX teams across multiple R&D initiatives, delivering planned design commitments on schedule.',
        'Drive UX initiatives for products including Data Policies, Interaction Search, and Intelligence Viewer, while exploring AI-first approaches.',
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
        'Drive ideation, concept exploration, digital strategy, and solution delivery for digital products and services across multiple channels, building and implementing atomic design systems.',
        'Designed effective interaction strategies, focusing on intuitive navigation and user flows. Produced low- and high-fidelity wireframes and interactive prototypes.',
        'Partnered with product management, marketing, and engineering teams to define the strategic project vision, requirements, scope, and roadmap.',
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
        'Collaborated with cross-functional teams and clients to design and develop engaging Rich Internet Applications (RIAs).',
        'Led the prototyping and UI development for the Data Analytics Platform, ensuring a user-friendly and effective interface.',
        'Proactively ensure platform-wide consistency by documenting use cases and UI elements.',
        'Contributed to various project initiatives through skills in demo creation, wireframing, prototyping, data visualization, interaction design, and responsive design.',
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
        'Responsible for the visual design and user interface of websites, ensuring they are aesthetically pleasing, user-friendly, and responsive across devices.',
        'Collaborated with cross-functional teams developers, marketers, content writers to achieve project goals.',
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
