'use client'

import { Header } from '@/components/Common/Header'
import { Footer } from '@/components/Common/Footer'

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <span>Dark Mode</span>
            </label>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Data</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">All your data is stored locally in your browser. No data is sent to any server.</p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              🗑️ Clear All Data
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Product Copilot v1.1</p>
            <p className="text-xs text-gray-500 mt-2">
              <a href="https://github.com/shiv12-art/ai-product-copilot" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                GitHub Repository
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
