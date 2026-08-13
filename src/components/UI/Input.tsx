import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  icon?: React.ReactNode
  isTextarea?: false
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
  icon?: React.ReactNode
  isTextarea: true
  rows?: number
}

type InputComponentProps = InputProps | TextareaProps

export const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputComponentProps
>(
  (
    {
      label,
      error,
      helpText,
      icon,
      isTextarea = false,
      className = '',
      disabled,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      w-full px-3 py-2 border rounded-lg transition-all duration-150
      bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-600
      border-gray-300 dark:border-gray-700
      focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:focus:ring-cyan-400
      disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60
      ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
      ${className}
    `

    const renderInput = () => {
      if (isTextarea) {
        const textareaProps = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={baseStyles}
            disabled={disabled}
            {...textareaProps}
          />
        )
      }

      return (
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600">
              {icon}
            </span>
          )}
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            className={`${baseStyles} ${icon ? 'pl-10' : ''}`}
            disabled={disabled}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        </div>
      )
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        {renderInput()}
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
