'use client'

import { useState } from 'react'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/UI/Card'

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  shareUrl: string
  projectName: string
}

export const ShareDialog = ({ isOpen, onClose, shareUrl, projectName }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnSocial = (platform: string) => {
    const text = `Check out this product strategy: "${projectName}" generated with AI Product Copilot!`

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card variant="elevated" className="w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Share Project</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share "{projectName}" with others
          </p>
        </div>

        {/* Share Link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Share Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-mono text-sm"
            />
            <Button
              size="sm"
              variant={copied ? 'primary' : 'secondary'}
              onClick={handleCopy}
            >
              {copied ? '✓' : '📋'}
            </Button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Share on Social
          </label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => shareOnSocial('twitter')}
              fullWidth
            >
              𝕏
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => shareOnSocial('linkedin')}
              fullWidth
            >
              💼
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => shareOnSocial('facebook')}
              fullWidth
            >
              f
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            fullWidth
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
