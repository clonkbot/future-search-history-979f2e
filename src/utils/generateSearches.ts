import { SearchEntry } from '../types'

// Search templates by goal category and progression stage
const searchTemplates = {
  business: {
    early: [
      "how to validate business idea",
      "best books for first time entrepreneurs",
      "LLC vs sole proprietorship",
      "how to write a business plan",
      "free business plan template",
      "how to find your first customer",
      "pricing strategies for beginners",
      "side hustle while working full time"
    ],
    growing: [
      "when to quit day job for startup",
      "first employee vs contractor",
      "small business accounting software",
      "how to handle rejection sales",
      "customer acquisition cost benchmark",
      "scaling without burning out",
      "impostor syndrome entrepreneur"
    ],
    established: [
      "how to delegate effectively",
      "hiring your first manager",
      "company culture remote team",
      "exit strategy for small business",
      "series A funding requirements",
      "how to say no to clients",
      "work life balance CEO"
    ],
    mastery: [
      "giving back to community entrepreneur",
      "mentoring first time founders",
      "legacy planning business owner",
      "selling company what to expect",
      "angel investing for beginners"
    ],
    quit: [
      "how to close a business gracefully",
      "going back to corporate after startup",
      "failed startup depression reddit",
      "how to explain failed business resume",
      "is it ok to give up on dreams"
    ]
  },
  creative: {
    early: [
      "best tutorials for beginners",
      "free resources to learn",
      "how long to get good at",
      "practice routine daily",
      "is it too late to start",
      "beginner mistakes to avoid"
    ],
    growing: [
      "portfolio building tips",
      "how to find your style",
      "dealing with creative block",
      "constructive criticism handling",
      "comparison is the thief of joy",
      "first commission pricing"
    ],
    established: [
      "turning passion into career",
      "building audience from scratch",
      "how to stay motivated",
      "creative burnout recovery",
      "teaching what you know"
    ],
    mastery: [
      "giving back to community",
      "starting creative studio",
      "hiring other creatives",
      "creative legacy planning"
    ],
    quit: [
      "accepting you're not talented enough",
      "creative hobbies without pressure",
      "finding meaning outside creativity",
      "why I stopped doing"
    ]
  },
  tech: {
    early: [
      "best programming language to start",
      "coding bootcamp worth it",
      "free coding tutorials",
      "how long to learn programming",
      "portfolio projects for beginners",
      "imposter syndrome developer"
    ],
    growing: [
      "preparing for tech interviews",
      "system design basics",
      "contributing to open source",
      "developer salary negotiation",
      "remote developer jobs",
      "building side projects"
    ],
    established: [
      "tech lead responsibilities",
      "managing developer team",
      "startup CTO challenges",
      "scaling engineering team",
      "architecture decisions documentation"
    ],
    mastery: [
      "angel investing tech startups",
      "building developer tools",
      "speaking at tech conferences",
      "writing technical book"
    ],
    quit: [
      "career change out of tech",
      "developer burnout recovery",
      "tech industry disillusionment",
      "simple jobs low stress"
    ]
  },
  health: {
    early: [
      "beginner workout routine",
      "healthy meal prep simple",
      "how to start running",
      "home gym essentials budget",
      "staying motivated to exercise"
    ],
    growing: [
      "intermediate training program",
      "macro tracking explained",
      "recovery day importance",
      "fitness plateau breakthrough",
      "workout injury prevention"
    ],
    established: [
      "training for competition",
      "personal trainer certification",
      "fitness coaching business",
      "advanced nutrition timing"
    ],
    mastery: [
      "fitness over 40 maintaining",
      "coaching methodology",
      "building fitness community",
      "fitness retreat planning"
    ],
    quit: [
      "accepting body limitations",
      "fitness identity crisis",
      "gentle exercise chronic pain",
      "health without obsession"
    ]
  },
  education: {
    early: [
      "graduate school application tips",
      "studying while working full time",
      "online degree worth it",
      "how to study effectively",
      "balancing school and life"
    ],
    growing: [
      "thesis writing strategies",
      "academic networking tips",
      "research methodology basics",
      "publishing first paper",
      "academic job market reality"
    ],
    established: [
      "tenure track preparation",
      "grant writing successful",
      "building research lab",
      "mentoring graduate students"
    ],
    mastery: [
      "academic leadership positions",
      "writing academic book",
      "sabbatical planning",
      "interdisciplinary research"
    ],
    quit: [
      "leaving academia industry",
      "phd dropout success stories",
      "alt-ac career paths",
      "life after graduate school"
    ]
  }
}

const journalEntries = {
  learning: [
    "Day 47. The more I learn, the more I realize how much I don't know. But that's exciting, not scary.",
    "Made my first small breakthrough today. It's not much, but it felt like climbing a mountain.",
    "Found an amazing community online. These people just... get it.",
    "Three hours disappeared while I was practicing. Is this what flow state feels like?"
  ],
  struggle: [
    "Hard day. Questioned everything. But I've come too far to quit now.",
    "Someone criticized my work publicly. It stung more than I'd like to admit.",
    "The gap between where I am and where I want to be feels infinite today.",
    "Burned out. Taking a forced break. Hate that I need it but know I do."
  ],
  milestone: [
    "IT HAPPENED. The thing I've been working toward. I can't believe it's real.",
    "Got my first real recognition today. All those late nights weren't for nothing.",
    "Someone asked ME for advice. When did I become the one people ask?",
    "Looking back at where I started... I wouldn't recognize that person."
  ],
  growth: [
    "Realized today that failure is just data. Nothing personal about it.",
    "Had to make a hard decision. Future me will know if it was the right one.",
    "The path forward isn't what I imagined, but maybe it's better.",
    "Starting to see the bigger picture. It's not just about me anymore."
  ],
  crisis: [
    "Everything feels uncertain. The universe is testing my commitment.",
    "Had to choose between what's safe and what's meaningful. Chose meaning.",
    "Rock bottom has a surprising clarity to it.",
    "This is either the beginning of something new or the end of something old."
  ]
}

function categorizeGoal(goal: string): keyof typeof searchTemplates {
  const goalLower = goal.toLowerCase()

  if (goalLower.includes('business') || goalLower.includes('startup') || goalLower.includes('company') || goalLower.includes('entrepreneur')) {
    return 'business'
  }
  if (goalLower.includes('code') || goalLower.includes('program') || goalLower.includes('developer') || goalLower.includes('software') || goalLower.includes('game dev')) {
    return 'tech'
  }
  if (goalLower.includes('art') || goalLower.includes('music') || goalLower.includes('write') || goalLower.includes('paint') || goalLower.includes('design') || goalLower.includes('guitar') || goalLower.includes('creative')) {
    return 'creative'
  }
  if (goalLower.includes('fitness') || goalLower.includes('health') || goalLower.includes('run') || goalLower.includes('marathon') || goalLower.includes('weight')) {
    return 'health'
  }
  if (goalLower.includes('degree') || goalLower.includes('doctor') || goalLower.includes('phd') || goalLower.includes('study') || goalLower.includes('university')) {
    return 'education'
  }

  // Default to business for general goals
  return 'business'
}

function getStage(progress: number): 'early' | 'growing' | 'established' | 'mastery' | 'quit' {
  if (progress < 0.25) return 'early'
  if (progress < 0.5) return 'growing'
  if (progress < 0.75) return 'established'
  return 'mastery'
}

function randomCategory(): SearchEntry['category'] {
  const categories: SearchEntry['category'][] = ['learning', 'struggle', 'milestone', 'growth', 'crisis']
  const weights = [0.3, 0.25, 0.15, 0.2, 0.1]
  const random = Math.random()
  let cumulative = 0

  for (let i = 0; i < categories.length; i++) {
    cumulative += weights[i]
    if (random <= cumulative) return categories[i]
  }

  return 'learning'
}

export function generateSearchHistory(
  age: number,
  goal: string,
  years: number,
  timeline: 'persisted' | 'quit'
): SearchEntry[] {
  const category = categorizeGoal(goal)
  const templates = searchTemplates[category]
  const currentYear = new Date().getFullYear()
  const searches: SearchEntry[] = []

  // Seed consistent randomness based on goal
  let seedValue = goal.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const seededRandom = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280
    return seedValue / 233280
  }

  // Generate searches across the timeline
  for (let yearOffset = 0; yearOffset <= years; yearOffset++) {
    const year = currentYear + yearOffset
    const progress = yearOffset / years
    const searchesThisYear = Math.floor(2 + seededRandom() * 3) // 2-4 searches per year

    for (let i = 0; i < searchesThisYear; i++) {
      const month = Math.floor(1 + seededRandom() * 12)

      let stage = getStage(progress)

      // In quit timeline, switch to quit searches after midpoint
      if (timeline === 'quit' && progress > 0.4) {
        stage = 'quit'
      }

      const stageSearches = templates[stage]
      const queryTemplate = stageSearches[Math.floor(seededRandom() * stageSearches.length)]

      // Personalize the query with the goal
      let query = queryTemplate
      if (seededRandom() > 0.5) {
        query = query + ' ' + goal.split(' ').slice(0, 2).join(' ')
      }

      const searchCategory = randomCategory()

      // Add journal entry with ~30% chance
      const hasJournal = seededRandom() > 0.7
      const journalEntry = hasJournal
        ? journalEntries[searchCategory][Math.floor(seededRandom() * journalEntries[searchCategory].length)]
        : undefined

      searches.push({
        id: `${year}-${month}-${i}-${seededRandom().toString(36).substr(2, 9)}`,
        year,
        month,
        query,
        journalEntry,
        category: searchCategory
      })
    }
  }

  // Sort by date
  return searches.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    return a.month - b.month
  })
}
