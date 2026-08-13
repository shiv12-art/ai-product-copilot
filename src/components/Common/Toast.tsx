'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number
}

interface ToastProps {
  message: ToastMessage
  onClose: (id: string) => void
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (message.duration) {
      const timer = setTimeout(() => onClose(message.id), message.duration)
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  const icons = {
    success: <CheckCircle size={20} className="text-green-600" />,
    error: <XCircle size={20} className="text-red-600" />,
    info: <AlertCircle size={20} className="text-blue-600" />,
  }

  const colors = {
    success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
  }

  const textColors = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    info: 'text-blue-800 dark:text-blue-200',
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[message.type]}`}
    >
      {icons[message.type]}
      <p className={`text-sm font-medium flex-1 ${textColors[message.type]}`}>
        {message.message}
      </p>
      <button
        onClick={() => onClose(message.id)}
        className={`p-1 hover:bg-white/50 dark:hover:bg-gray-900/50 rounded transition-colors ${textColors[message.type]}`}
      >
        ×
      </button>
    </div>
  )
}

interface ToastContainerProps {
  messages: ToastMessage[]
  onClose: (id: string) => void
}

export function ToastContainer({ messages, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50 max-w-md">
      {messages.map((message) => (
        <Toast key={message.id} message={message} onClose={onClose} />
      ))}
    </div>
  )
}
