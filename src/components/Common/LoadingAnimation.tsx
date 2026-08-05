'use client'

interface LoadingAnimationProps {
  message?: string
}

export function LoadingAnimation({ message = 'Generating artifacts...' }: LoadingAnimationProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative w-16 h-16">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-purple-600 animate-spin"></div>
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Creating Your Artifacts
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {message}
        </p>

        {/* Progress indicators */}
        <div className="space-y-3 max-w-xs mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Analyzing problem statement
            </span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Generating Product Canvas
            </span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Creating PRD and strategy
            </span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Building validation plan
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-500 mt-8">
          This usually takes less than 2 seconds...
        </p>
      </div>
    </div>
  )
}
