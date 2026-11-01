import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rice: '#F7F1E5',
        paper: '#FFFDF8',
        leaf: '#274B3A',
        'leaf-dark': '#1e3b2d',
        wood: '#6B4A32',
        turmeric: '#C59A48',
        ink: '#262B25',
        muted: '#62665C',
        line: '#DCD6C8',
        danger: '#9B3232',
        'success-bg': '#E8F0E7',
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        input: '12px',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
