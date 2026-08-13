import React, { useState, useRef, useEffect } from 'react'

export interface SelectOption {
  value: string | number
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string
  error?: string
  helpText?: string
  options: SelectOption[]
  onChange?: (value: string | number) => void
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, helpText, options, onChange, className = '', disabled, value, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className={`
              w-full px-3 py-2 border rounded-lg transition-all duration-150
              bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:focus:ring-cyan-400
              disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60
              appearance-none cursor-pointer
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
              ${className}
            `}
            disabled={disabled}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
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

Select.displayName = 'Select'
