import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const getVariantClasses = (variant: ButtonVariant) => {
  const base = 'transition-colors duration-150 font-medium'
  switch (variant) {
    case 'primary':
      return `${base} bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700 disabled:bg-gray-400 dark:disabled:bg-gray-600`
    case 'secondary':
      return `${base} bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:active:bg-gray-500`
    case 'ghost':
      return `${base} bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800 dark:active:bg-gray-700`
    case 'danger':
      return `${base} bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:bg-gray-400`
    default:
      return base
  }
}

const getSizeClasses = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs rounded-md'
    case 'md':
      return 'px-4 py-2 text-sm rounded-lg'
    case 'lg':
      return 'px-6 py-3 text-base rounded-lg'
    default:
      return 'px-4 py-2 text-sm rounded-lg'
  }
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          ${getVariantClasses(variant)}
          ${getSizeClasses(size)}
          ${fullWidth ? 'w-full' : ''}
          flex items-center justify-center gap-2
          ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-gray-900
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {icon && iconPosition === 'left' && !isLoading && icon}
        {children}
        {icon && iconPosition === 'right' && !isLoading && icon}
      </button>
    )
  }
)

Button.displayName = 'Button'
