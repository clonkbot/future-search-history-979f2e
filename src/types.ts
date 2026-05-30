export interface SearchEntry {
  id: string
  year: number
  month: number
  query: string
  journalEntry?: string
  category: 'learning' | 'struggle' | 'milestone' | 'growth' | 'crisis'
}

export interface TimelineProps {
  searches: SearchEntry[]
  isGenerating: boolean
}

export interface FormData {
  age: number
  goal: string
  years: number
}
