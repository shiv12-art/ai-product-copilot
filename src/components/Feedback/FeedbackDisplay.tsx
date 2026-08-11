'use client'

import { Feedback } from '@/types/generation'
import { Card } from '@/components/UI/Card'

interface FeedbackDisplayProps {
  feedback?: Feedback
}

export const FeedbackDisplay = ({ feedback }: FeedbackDisplayProps) => {
  if (!feedback || !feedback.rating) {
    return null
  }

  return (
    <Card variant="elevated" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <div className="mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Feedback</h4>
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-lg">
              {star <= feedback.rating! ? '⭐' : '☆'}
            </span>
          ))}
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            {feedback.rating}/5
          </span>
        </div>
      </div>

      {feedback.comment && (
        <div className="text-sm text-gray-700 dark:text-gray-300 italic">
          "{feedback.comment}"
        </div>
      )}

      {feedback.submittedAt && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
          Rated {new Date(feedback.submittedAt).toLocaleDateString()}
        </p>
      )}
    </Card>
  )
}
