import React from 'react'

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
type BadgeSize = 'sm' | 'md'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: React.ReactNode
  onRemove?: () => void
}

const getVariantClasses = (variant: BadgeVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-cyan-100 text-cyan-900 dark:bg-cyan-900 dark:text-cyan-100'
    case 'success':
      return 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100'
    case 'warning':
      return 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100'
    case 'error':
      return 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100'
    case 'info':
      return 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
    case 'default':
    default:
      return 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
  }
}

const getSizeClasses = (size: BadgeSize) => {
  switch (size) {
    case 'sm':
      return 'px-2 py-0.5 text-xs rounded'
    case 'md':
      return 'px-3 py-1 text-sm rounded-md'
    default:
      return 'px-3 py-1 text-sm rounded-md'
  }
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = 'default', size = 'md', icon, onRemove, className = '', children, ...props },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`
          ${getVariantClasses(variant)}
          ${getSizeClasses(size)}
          inline-flex items-center gap-1.5 font-medium transition-opacity duration-150
          ${className}
        `}
        {...props}
      >
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        {children}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="ml-1 hover:opacity-75 transition-opacity"
            aria-label="Remove badge"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
