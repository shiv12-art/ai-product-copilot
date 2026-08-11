'use client'

import { create } from 'zustand'
import { Generation, UserFeedback, Feedback } from '@/types/generation'
import { STORAGE_KEYS, MAX_GENERATIONS, SCHEMA_VERSION } from '@/lib/utils/constants'

interface GenerationStore {
  generations: Generation[]
  currentGeneration: Generation | null
  lastVisited: string | null
  shareTokenMap: Map<string, string> // token -> generationId
  allFeedback: UserFeedback[]

  // Existing methods
  addGeneration: (gen: Generation) => void
  updateArtifact: (genId: string, artifactType: string, content: string) => void
  deleteGeneration: (genId: string) => void
  toggleBookmark: (genId: string) => void
  setCurrentGeneration: (gen: Generation | null) => void
  setLastVisited: (genId: string) => void
  loadFromStorage: () => void
  saveToStorage: () => void
  clearAll: () => void
  getGeneration: (genId: string) => Generation | undefined

  // New methods for projects, feedback, sharing
  generateShareToken: (genId: string) => string
  getGenerationByToken: (token: string) => Generation | undefined
  submitFeedback: (genId: string, feedback: Feedback) => void
  getFeedback: (genId: string) => Feedback | undefined
  getAllFeedback: () => UserFeedback[]
  hasFeedback: (genId: string) => boolean
  updateProjectName: (genId: string, name: string) => void
  duplicateGeneration: (genId: string) => Generation | undefined
  incrementViewCount: (genId: string) => void
  tagGeneration: (genId: string, tags: string[]) => void
  getAllTags: () => string[]
}

const generateRandomToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export const useGenerationStore = create<GenerationStore>((set, get) => {
  // Load from localStorage on first access
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.generations)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        set({ generations: parsed })
      } catch (e) {
        console.error('Failed to load generations from storage', e)
      }
    }

    // Load share tokens
    const storedTokens = localStorage.getItem(STORAGE_KEYS.shareTokens)
    if (storedTokens) {
      try {
        const parsed = JSON.parse(storedTokens)
        set({ shareTokenMap: new Map(Object.entries(parsed)) })
      } catch (e) {
        console.error('Failed to load share tokens', e)
      }
    }

    // Load feedback
    const storedFeedback = localStorage.getItem(STORAGE_KEYS.userFeedback)
    if (storedFeedback) {
      try {
        const parsed = JSON.parse(storedFeedback)
        set({ allFeedback: parsed })
      } catch (e) {
        console.error('Failed to load feedback', e)
      }
    }
  }

  return {
    generations: [],
    currentGeneration: null,
    lastVisited: null,
    shareTokenMap: new Map(),
    allFeedback: [],

    addGeneration: (gen: Generation) => {
      set((state) => {
        let updated = [gen, ...state.generations]
        if (updated.length > MAX_GENERATIONS) {
          updated = updated.slice(0, MAX_GENERATIONS)
        }
        return { generations: updated }
      })
      get().saveToStorage()
    },

    updateArtifact: (genId: string, artifactType: string, content: string) => {
      set((state) => {
        const updated = state.generations.map((gen) => {
          if (gen.id === genId) {
            return {
              ...gen,
              artifacts: {
                ...gen.artifacts,
                [artifactType]: {
                  ...gen.artifacts[artifactType as keyof typeof gen.artifacts],
                  content,
                  editedAt: new Date().toISOString(),
                },
              },
              updatedAt: new Date().toISOString(),
            }
          }
          return gen
        })
        return { generations: updated }
      })
      get().saveToStorage()
    },

    deleteGeneration: (genId: string) => {
      set((state) => ({
        generations: state.generations.filter((gen) => gen.id !== genId),
        currentGeneration:
          state.currentGeneration?.id === genId ? null : state.currentGeneration,
      }))
      // Clean up share token if exists
      get().shareTokenMap.forEach((value, key) => {
        if (value === genId) {
          get().shareTokenMap.delete(key)
        }
      })
      get().saveToStorage()
    },

    toggleBookmark: (genId: string) => {
      set((state) => {
        const updated = state.generations.map((gen) => {
          if (gen.id === genId) {
            return { ...gen, isBookmarked: !gen.isBookmarked }
          }
          return gen
        })
        return { generations: updated }
      })
      get().saveToStorage()
    },

    setCurrentGeneration: (gen: Generation | null) => {
      set({ currentGeneration: gen })
      if (gen) {
        get().setLastVisited(gen.id)
        get().incrementViewCount(gen.id)
      }
    },

    setLastVisited: (genId: string) => {
      set({ lastVisited: genId })
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.lastVisited, genId)
      }
    },

    loadFromStorage: () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEYS.generations)
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            set({ generations: parsed })
          } catch (e) {
            console.error('Failed to load from storage', e)
          }
        }
        const lastVisited = localStorage.getItem(STORAGE_KEYS.lastVisited)
        if (lastVisited) {
          set({ lastVisited })
        }
      }
    },

    saveToStorage: () => {
      if (typeof window !== 'undefined') {
        const { generations, shareTokenMap, allFeedback } = get()
        localStorage.setItem(STORAGE_KEYS.generations, JSON.stringify(generations))
        localStorage.setItem(
          STORAGE_KEYS.shareTokens,
          JSON.stringify(Object.fromEntries(shareTokenMap))
        )
        localStorage.setItem(STORAGE_KEYS.userFeedback, JSON.stringify(allFeedback))
        localStorage.setItem(STORAGE_KEYS.schemaVersion, String(SCHEMA_VERSION))
      }
    },

    clearAll: () => {
      set({
        generations: [],
        currentGeneration: null,
        lastVisited: null,
        shareTokenMap: new Map(),
        allFeedback: [],
      })
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.generations)
        localStorage.removeItem(STORAGE_KEYS.lastVisited)
        localStorage.removeItem(STORAGE_KEYS.shareTokens)
        localStorage.removeItem(STORAGE_KEYS.userFeedback)
      }
    },

    getGeneration: (genId: string) => {
      return get().generations.find((gen) => gen.id === genId)
    },

    generateShareToken: (genId: string) => {
      const state = get()
      const generation = state.getGeneration(genId)
      if (!generation) return ''

      // If already has token, return it
      if (generation.shareToken) return generation.shareToken

      // Generate new token
      let token = generateRandomToken()
      while (state.shareTokenMap.has(token)) {
        token = generateRandomToken()
      }

      // Update generation with token
      set((s) => ({
        generations: s.generations.map((gen) =>
          gen.id === genId ? { ...gen, shareToken: token, isPublic: true } : gen
        ),
        shareTokenMap: new Map(s.shareTokenMap).set(token, genId),
      }))
      get().saveToStorage()
      return token
    },

    getGenerationByToken: (token: string) => {
      const genId = get().shareTokenMap.get(token)
      return genId ? get().getGeneration(genId) : undefined
    },

    submitFeedback: (genId: string, feedback: Feedback) => {
      set((state) => {
        const updated = state.generations.map((gen) =>
          gen.id === genId ? { ...gen, feedback } : gen
        )
        const newFeedback: UserFeedback = {
          generationId: genId,
          ...feedback,
          submittedAt: new Date().toISOString(),
        }
        return {
          generations: updated,
          allFeedback: [...state.allFeedback, newFeedback],
        }
      })
      get().saveToStorage()
    },

    getFeedback: (genId: string) => {
      return get().getGeneration(genId)?.feedback
    },

    getAllFeedback: () => {
      return get().allFeedback
    },

    hasFeedback: (genId: string) => {
      return !!get().getGeneration(genId)?.feedback
    },

    updateProjectName: (genId: string, name: string) => {
      set((state) => ({
        generations: state.generations.map((gen) =>
          gen.id === genId ? { ...gen, projectName: name } : gen
        ),
      }))
      get().saveToStorage()
    },

    duplicateGeneration: (genId: string) => {
      const original = get().getGeneration(genId)
      if (!original) return undefined

      const duplicate: Generation = {
        ...original,
        id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        projectName: original.projectName
          ? `${original.projectName} (Copy)`
          : `${original.problemStatement.substring(0, 30)}... (Copy)`,
        shareToken: undefined,
        isPublic: false,
        viewCount: 0,
        feedback: undefined,
        analytics: {
          createdAt: new Date().toISOString(),
          generatedAt: new Date().toISOString(),
          viewCount: 0,
        },
      }

      get().addGeneration(duplicate)
      return duplicate
    },

    incrementViewCount: (genId: string) => {
      set((state) => ({
        generations: state.generations.map((gen) => {
          if (gen.id === genId) {
            return {
              ...gen,
              viewCount: (gen.viewCount ?? 0) + 1,
              analytics: {
                ...gen.analytics,
                createdAt: gen.analytics?.createdAt ?? new Date().toISOString(),
                generatedAt:
                  gen.analytics?.generatedAt ?? new Date().toISOString(),
                firstViewed:
                  gen.analytics?.firstViewed ?? new Date().toISOString(),
                lastViewed: new Date().toISOString(),
                viewCount: (gen.viewCount ?? 0) + 1,
              },
            }
          }
          return gen
        }),
      }))
      get().saveToStorage()
    },

    tagGeneration: (genId: string, tags: string[]) => {
      set((state) => ({
        generations: state.generations.map((gen) =>
          gen.id === genId ? { ...gen, tags } : gen
        ),
      }))
      get().saveToStorage()
    },

    getAllTags: () => {
      const state = get()
      const allTags = new Set<string>()
      state.generations.forEach((gen) => {
        if (gen.tags) {
          gen.tags.forEach((tag) => allTags.add(tag))
        }
      })
      return Array.from(allTags).sort()
    },
  }
})
