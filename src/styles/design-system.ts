export const designSystem = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c3d66',
      950: '#082f49',
    },
    accent: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3f0f5c',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },

    light: {
      bg: '#ffffff',
      text: '#000000',
      border: '#e5e7eb',
      mutedText: '#6b7280',
    },
    dark: {
      bg: '#0f172a',
      text: '#f1f5f9',
      border: '#334155',
      mutedText: '#94a3b8',
    },
  },

  typography: {
    fontFamily: {
      display: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"JetBrains Mono", "Menlo", "Monaco", "Courier New", monospace',
    },

    scales: {
      h1: {
        size: '3.5rem',
        lineHeight: 1.2,
        weight: 700,
        letterSpacing: '-0.5px',
      },
      h2: {
        size: '2.25rem',
        lineHeight: 1.3,
        weight: 700,
        letterSpacing: '-0.5px',
      },
      h3: {
        size: '1.5rem',
        lineHeight: 1.4,
        weight: 600,
        letterSpacing: '-0.25px',
      },
      h4: {
        size: '1.125rem',
        lineHeight: 1.5,
        weight: 600,
        letterSpacing: '0px',
      },
      body: {
        size: '1rem',
        lineHeight: 1.6,
        weight: 400,
        letterSpacing: '0px',
      },
      small: {
        size: '0.875rem',
        lineHeight: 1.5,
        weight: 400,
        letterSpacing: '0px',
      },
      xs: {
        size: '0.75rem',
        lineHeight: 1.4,
        weight: 500,
        letterSpacing: '0.5px',
      },
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  animations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

export type DesignSystem = typeof designSystem
