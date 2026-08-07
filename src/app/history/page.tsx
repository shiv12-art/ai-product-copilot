'use client'

import { Header } from '@/components/Common/Header'
import { Footer } from '@/components/Common/Footer'

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Generation History</h1>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">No generations yet. Start by creating a new product concept!</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
