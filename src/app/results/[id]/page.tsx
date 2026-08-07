'use client'

import { Header } from '@/components/Common/Header'
import { Footer } from '@/components/Common/Footer'
import { useParams } from 'next/navigation'

export default function ResultDetailPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Result: {id}</h1>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">Loading result details...</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
