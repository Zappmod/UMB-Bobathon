/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ibm-blue':    '#0f62fe',
        'ibm-indigo':  '#4040d9',
        'ibm-purple':  '#7b6fef',
        'ibm-bg':      '#f4f4f8',
        'ibm-active':  '#e8eaf6',
        'ibm-border':  '#e0e0e0',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
