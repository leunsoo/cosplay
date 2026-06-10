import type { Config } from 'tailwindcss';

// Tailwind CSS v4: Most configuration moved to @theme in globals.css
// Only keep essential config like content paths and darkMode here
export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
} satisfies Config;
