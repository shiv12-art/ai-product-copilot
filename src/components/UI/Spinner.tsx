import React from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize
  label?: string
  fullScreen?: boolean
}

const getSizeClasses = (size: SpinnerSize) => {
  switch (size) {
    case 'sm':
      return 'w-5 h-5'
    case 'lg':
      return 'w-12 h-12'
    case 'md':
    default:
      return 'w-8 h-8'
  }
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', label, fullScreen = false, className = '', ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={`${fullScreen ? 'w-full h-full' : ''} flex flex-col items-center justify-center gap-2 ${className}`}
        {...props}
      >
        <svg
          className={`${getSizeClasses(size)} animate-spin text-cyan-500 dark:text-cyan-400`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {label && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        )}
      </div>
    )

    if (fullScreen) {
      return (
        <div className="fixed inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          {content}
        </div>
      )
    }

    return content
  }
)

Spinner.displayName = 'Spinner'
