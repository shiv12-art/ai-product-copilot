'use client'

import './globals.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AI Product Copilot - Discovery Intelligence Engine v1</title>
        <meta name="description" content="Product discovery & strategy analysis with intelligent insights" />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  AI Product Copilot
                </div>
                <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                  Discovery v1
                </span>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
              <p>AI Product Copilot Discovery Intelligence Engine • Analyze before building</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
