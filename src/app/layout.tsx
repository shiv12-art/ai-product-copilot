import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Product Copilot',
  description: 'Generate professional product development artifacts from your ideas in minutes.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  authors: [{ name: 'AI Product Copilot' }],
  keywords: [
    'product management',
    'PRD',
    'product development',
    'AI',
    'business planning',
  ],
  openGraph: {
    title: 'AI Product Copilot',
    description: 'Generate professional product development artifacts from your ideas in minutes.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0284c7" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
