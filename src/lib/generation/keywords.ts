import { STOP_WORDS } from '@/lib/utils/constants'
import { KeywordResult } from '@/types/generation'

export function extractKeywords(text: string): KeywordResult[] {
  // Convert to lowercase and split into words
  const words = text.toLowerCase().match(/\b[\w]+\b/g) || []

  // Filter stop words and short words
  const filtered = words.filter(
    (word) => word.length > 2 && !STOP_WORDS.has(word)
  )

  // Count frequency
  const frequency = new Map<string, number>()
  filtered.forEach((word) => {
    frequency.set(word, (frequency.get(word) || 0) + 1)
  })

  // Score each keyword
  const scored: KeywordResult[] = Array.from(frequency.entries()).map(
    ([word, count]) => ({
      word,
      frequency: count,
      score: count * (filtered.length - filtered.indexOf(word)) / 100,
    })
  )

  // Sort by score and return top 20
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
}

export function findRelevantKeywords(
  text: string,
  keywords: KeywordResult[]
): string[] {
  return keywords.map((k) => k.word).filter((word) => text.includes(word))
}
