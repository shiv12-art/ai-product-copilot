'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGenerationStore } from '@/lib/storage/generationStore'
import { AlertCircle, Download } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [generationCount, setGenerationCount] = useState(0)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { generations, clearAll, loadFromStorage } = useGenerationStore()

  useEffect(() => {
    setMounted(true)
    loadFromStorage()
    setGenerationCount(generations.length)
  }, [generations.length, loadFromStorage])

  const handleClearAllData = () => {
    clearAll()
    setGenerationCount(0)
    setShowDeleteConfirm(false)
    router.push('/')
  }

  const handleExportData = () => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      generations: generations,
    }

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `product-copilot-backup-${new Date().getTime()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage your application preferences and data
        </p>

        <div className="space-y-8">
          {/* Data Section */}
          <section className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              📊 Your Data
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">
                  Saved Generations
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {generationCount} / 10
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">
                  Storage Location
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Browser localStorage
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-gray-700 dark:text-gray-300">
                  Privacy
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  ✓ 100% Private
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleExportData}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Export All Data
              </button>
            </div>
          </section>

          {/* Theme Section */}
          <section className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🎨 Theme
            </h2>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Theme preference is set in the top-right corner. Your preference is
                automatically saved.
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-white border-2 border-gray-200 rounded-lg text-center">
                  <div className="text-2xl mb-2">☀️</div>
                  <p className="text-sm font-medium">Light</p>
                </div>
                <div className="p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-center">
                  <div className="text-2xl mb-2">🌙</div>
                  <p className="text-sm font-medium text-white">Dark</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-white to-gray-800 border-2 border-gray-400 rounded-lg text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <p className="text-sm font-medium text-white">System</p>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              ℹ️ About
            </h2>

            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>AI Product Copilot</strong> is a frontend-only application that generates
                professional product artifacts from problem statements.
              </p>

              <div className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                <p><strong>Version:</strong> 1.0 (POC)</p>
                <p><strong>Build Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Storage:</strong> Browser localStorage</p>
                <p><strong>APIs:</strong> None (completely offline)</p>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-500">
                Built as a 3-day portfolio project. Completely private, no tracking or
                analytics.
              </p>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Danger Zone
            </h2>

            <p className="text-sm text-red-800 dark:text-red-200 mb-4">
              These actions are permanent and cannot be undone.
            </p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Clear All Data
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-red-800 dark:text-red-200 font-semibold">
                  Are you sure? This will delete all {generationCount} saved generations
                  and cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleClearAllData}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Yes, Delete Everything
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
