'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-950 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          🚀 AI Product Copilot
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/history" className="hover:text-blue-600">History</Link>
          <Link href="/settings" className="hover:text-blue-600">Settings</Link>
          <button className="text-xl">🌙</button>
        </nav>
      </div>
    </header>
  )
}
