import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-secondary': 'rgb(var(--accent-secondary) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        'danger-foreground': 'rgb(var(--danger-foreground) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',
        'info-foreground': 'rgb(var(--info-foreground) / <alpha-value>)',
        skeleton: 'rgb(var(--skeleton) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
