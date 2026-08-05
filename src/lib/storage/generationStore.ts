'use client'

import { create } from 'zustand'
import { Generation } from '@/types/generation'
import { STORAGE_KEYS, MAX_GENERATIONS } from '@/lib/utils/constants'

interface GenerationStore {
  generations: Generation[]
  currentGeneration: Generation | null
  lastVisited: string | null

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
  }

  return {
    generations: [],
    currentGeneration: null,
    lastVisited: null,

    addGeneration: (gen: Generation) => {
      set((state) => {
        let updated = [gen, ...state.generations]
        // Keep only the last MAX_GENERATIONS
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
        const { generations } = get()
        localStorage.setItem(STORAGE_KEYS.generations, JSON.stringify(generations))
      }
    },

    clearAll: () => {
      set({ generations: [], currentGeneration: null, lastVisited: null })
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.generations)
        localStorage.removeItem(STORAGE_KEYS.lastVisited)
      }
    },

    getGeneration: (genId: string) => {
      return get().generations.find((gen) => gen.id === genId)
    },
  }
})
