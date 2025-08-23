/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* slate-200-10 */
        input: "var(--color-input)", /* surface-panel */
        ring: "var(--color-ring)", /* electric-cyan */
        background: "var(--color-background)", /* deep-space-background */
        foreground: "var(--color-foreground)", /* slate-200 */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep-focus-foundation */
          foreground: "var(--color-primary-foreground)", /* slate-200 */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* structured-depth */
          foreground: "var(--color-secondary-foreground)", /* slate-200 */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-500 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* structured-depth */
          foreground: "var(--color-muted-foreground)", /* slate-400 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* electric-cyan */
          foreground: "var(--color-accent-foreground)", /* deep-focus-foundation */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* structured-depth */
          foreground: "var(--color-popover-foreground)", /* slate-200 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* surface-panel */
          foreground: "var(--color-card-foreground)", /* slate-200 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* emerald-500 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-500 */
          foreground: "var(--color-warning-foreground)", /* deep-focus-foundation */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-500 */
          foreground: "var(--color-error-foreground)", /* white */
        },
        // Brand-specific colors
        brand: {
          primary: "var(--color-brand-primary)", /* electric-cyan-brand */
          secondary: "var(--color-brand-secondary)", /* deep-space-blue */
        },
        conversion: {
          accent: "var(--color-conversion-accent)", /* energetic-coral */
        },
        trust: {
          builder: "var(--color-trust-builder)", /* calming-teal */
        },
        cta: {
          golden: "var(--color-cta-golden)", /* golden-yellow */
        },
        text: {
          secondary: "var(--color-text-secondary)", /* soft-lavender-gray */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        headline: ['JetBrains Mono', 'monospace'], /* technical-precision */
        body: ['Inter', 'sans-serif'], /* exceptional-readability */
        cta: ['Space Grotesk', 'sans-serif'], /* confident-geometric */
        accent: ['Orbitron', 'sans-serif'], /* futuristic-technical */
        ui: ['Source Sans Pro', 'sans-serif'], /* interface-optimized */
        'brand-cta': ['Poppins', 'sans-serif'], /* friendly-conversion */
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        'xs': 'var(--spacing-xs)', /* 8px */
        'sm': 'var(--spacing-sm)', /* 13px */
        'md': 'var(--spacing-md)', /* 21px */
        'lg': 'var(--spacing-lg)', /* 34px */
        'xl': 'var(--spacing-xl)', /* 55px */
      },
      boxShadow: {
        'interactive': 'var(--shadow-interactive)', /* 3d-element-glow */
        'floating': 'var(--shadow-floating)', /* panel-elevation */
        'brand': 'var(--shadow-brand)', /* layered-depth */
        'glow': '0 0 20px rgba(0, 217, 255, 0.3)', /* accent-glow */
        'glow-strong': '0 0 30px rgba(0, 217, 255, 0.5)', /* strong-accent-glow */
        'constellation': '0 0 15px rgba(0, 217, 255, 0.3)', /* node-glow */
        'constellation-hover': '0 0 25px rgba(0, 217, 255, 0.6)', /* node-hover-glow */
        'performance': '0 0 10px rgba(16, 185, 129, 0.2)', /* success-indicator */
      },
      animation: {
        'kinetic-reveal': 'kinetic-reveal 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'rotate-3d': 'rotate-3d 20s linear infinite',
      },
      keyframes: {
        'kinetic-reveal': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%': { 'box-shadow': '0 0 5px rgba(0, 217, 255, 0.2)' },
          '100%': { 'box-shadow': '0 0 20px rgba(0, 217, 255, 0.6)' },
        },
        'rotate-3d': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.4, 0, 0.2, 1)', /* smooth-natural */
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', /* spring-bounce */
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', /* elastic-ease */
      },
      transitionDuration: {
        'fast': '300ms', /* quick-interactions */
        'medium': '600ms', /* spatial-transitions */
        'slow': '1000ms', /* major-scene-changes */
      },
      backdropBlur: {
        'glass': '12px', /* glass-morphism */
      },
      perspective: {
        '1000': '1000px', /* 3d-depth */
        '1500': '1500px', /* deep-3d */
      },
      transformStyle: {
        '3d': 'preserve-3d', /* 3d-transforms */
      },
      zIndex: {
        'floating': '100', /* floating-elements */
        'modal': '1000', /* modal-overlays */
        'tooltip': '1100', /* tooltip-layer */
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}