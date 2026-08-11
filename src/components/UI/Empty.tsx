import React from 'react'

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ icon, title, description, action, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex flex-col items-center justify-center py-12 px-6
          text-center
          ${className}
        `}
        {...props}
      >
        {icon ? (
          <div className="mb-4 text-gray-400 dark:text-gray-600">{icon}</div>
        ) : (
          <svg className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21l-4.35-4.35m0 0A7.5 7.5 0 103.305 3.305m0 0L3.305 3.305" />
          </svg>
        )}

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
            {description}
          </p>
        )}

        {action && (
          <button
            onClick={action.onClick}
            className="
              inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg
              font-medium hover:bg-cyan-600 active:bg-cyan-700
              transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
              dark:focus:ring-offset-gray-900
            "
          >
            {action.label}
          </button>
        )}
      </div>
    )
  }
)

Empty.displayName = 'Empty'
