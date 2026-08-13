export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>
          <a href="https://github.com/shiv12-art/ai-product-copilot" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            GitHub Repository
          </a>
          {' '} • {' '}
          <span>Built with Next.js • TypeScript • Tailwind CSS</span>
        </p>
        <p className="mt-2 text-sm">No backend • No APIs • Privacy-first • Offline capable</p>
      </div>
    </footer>
  )
}
