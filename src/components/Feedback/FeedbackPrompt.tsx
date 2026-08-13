'use client'

import { useState } from 'react'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/UI/Card'

interface FeedbackPromptProps {
  isVisible: boolean
  onClose: () => void
  onSubmit: (rating: number, comment: string) => Promise<void>
}

export const FeedbackPrompt = ({ isVisible, onClose, onSubmit }: FeedbackPromptProps) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isVisible) return null

  const handleSubmit = async () => {
    if (rating === 0) return

    try {
      setSubmitting(true)
      await onSubmit(rating, comment)
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        setRating(0)
        setComment('')
        setSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4">
        <Card variant="elevated" className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="text-2xl">✓</div>
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">Thank you!</p>
              <p className="text-sm text-green-800 dark:text-green-200">Your feedback helps us improve</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-4">
      <Card variant="elevated">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">How helpful was this?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Help us improve by sharing your feedback
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-3xl transition-transform hover:scale-110"
              title={`${star} star${star !== 1 ? 's' : ''}`}
            >
              {star <= rating ? '⭐' : '☆'}
            </button>
          ))}
        </div>

        {/* Comment Section */}
        {rating > 0 && (
          <div className="mb-4 animate-in fade-in">
            <textarea
              placeholder="Any suggestions? (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={2}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={onClose}
            disabled={submitting}
          >
            Skip
          </Button>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleSubmit}
            disabled={rating === 0 || submitting}
            isLoading={submitting}
          >
            {submitting ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
