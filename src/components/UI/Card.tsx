import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  isHoverable?: boolean
  isPadded?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', isHoverable = false, isPadded = true, className = '', children, ...props },
    ref
  ) => {
    const variantClasses = {
      default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg',
      elevated: 'bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-lg',
      outlined:
        'bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg backdrop-blur-sm',
    }

    return (
      <div
        ref={ref}
        className={`
          ${variantClasses[variant]}
          ${isPadded ? 'p-6' : ''}
          ${isHoverable ? 'transition-all duration-200 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
