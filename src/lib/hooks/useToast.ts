import { useState, useCallback } from 'react'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

export function useToast() {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const add = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) => {
    const id = Math.random().toString(36).substring(7)
    const toast: ToastMessage = { id, message, type }

    setMessages((prev) => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id))
      }, duration)
    }

    return id
  }, [])

  const remove = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }, [])

  const success = useCallback((message: string, duration?: number) => {
    add(message, 'success', duration)
  }, [add])

  const error = useCallback((message: string, duration?: number) => {
    add(message, 'error', duration)
  }, [add])

  const info = useCallback((message: string, duration?: number) => {
    add(message, 'info', duration)
  }, [add])

  return {
    messages,
    add,
    remove,
    success,
    error,
    info,
  }
}
