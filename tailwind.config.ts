import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './data/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal (inspirada en groxi)
        indigo:   '#5541D4',
        indigo2:  '#7A68F2',
        indigo3:  '#2C2180',
        aqua:     '#5FE3D2',
        aqua2:    '#A6F2E8',
        night:    '#100D26',
        paper:    '#EEEAE3',
        paper2:   '#E2DDD4',

        // Tokens heredados (re-mapeados a la nueva paleta)
        scarlet:  '#FF4F6D',
        violet:   '#3A2C9E',
        violet2:  '#7A68F2',
        gold:     '#5FE3D2',
        gold2:    '#A6F2E8',
        sky:      '#5BCEFA',
        lime:     '#5FE3D2',
        ink:      '#100D26',
        ink2:     '#17133A',
        panel:    '#211B52',
        offwhite: '#EEEAE3',
        muted:    '#9A94C4',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
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
            '--tw-prose-links':        theme('colors.aqua'),
            '--tw-prose-bold':         theme('colors.white'),
            '--tw-prose-counters':     theme('colors.muted'),
            '--tw-prose-bullets':      theme('colors.indigo2'),
            '--tw-prose-hr':           'rgba(255,255,255,0.08)',
            '--tw-prose-quotes':       theme('colors.offwhite'),
            '--tw-prose-quote-borders': theme('colors.indigo2'),
            '--tw-prose-captions':     theme('colors.muted'),
            '--tw-prose-code':         theme('colors.aqua'),
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
