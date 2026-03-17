import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        scarlet:  '#E8230A',
        violet:   '#5C1A8F',
        violet2:  '#7B2FBE',
        gold:     '#F5C842',
        gold2:    '#FFE082',
        sky:      '#5BCEFA',
        lime:     '#B6E547',
        ink:      '#0D0A1A',
        ink2:     '#160E2E',
        panel:    '#1C1135',
        offwhite: '#EDE8F5',
        muted:    '#8B7DAE',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      typography: (theme: (arg: string) => string) => ({
        neocaoh: {
          css: {
            '--tw-prose-body':         theme('colors.offwhite'),
            '--tw-prose-headings':     theme('colors.white'),
            '--tw-prose-links':        theme('colors.gold'),
            '--tw-prose-bold':         theme('colors.white'),
            '--tw-prose-counters':     theme('colors.muted'),
            '--tw-prose-bullets':      theme('colors.violet2'),
            '--tw-prose-hr':           'rgba(255,255,255,0.08)',
            '--tw-prose-quotes':       theme('colors.offwhite'),
            '--tw-prose-quote-borders': theme('colors.violet2'),
            '--tw-prose-captions':     theme('colors.muted'),
            '--tw-prose-code':         theme('colors.lime'),
            '--tw-prose-pre-code':     theme('colors.offwhite'),
            '--tw-prose-pre-bg':       theme('colors.panel'),
            '--tw-prose-th-borders':   'rgba(255,255,255,0.1)',
            '--tw-prose-td-borders':   'rgba(255,255,255,0.06)',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config
