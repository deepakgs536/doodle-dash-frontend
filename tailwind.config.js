import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          '0%':   { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '25%':  { transform: 'translate(20px, -10px) scale(1.1) rotate(5deg)' },
          '50%':  { transform: 'translate(-15px, 20px) scale(0.9) rotate(-5deg)' },
          '75%':  { transform: 'translate(-25px, -15px) scale(1.05) rotate(3deg)' },
          '100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
        },
      },
      animation: {
        blob: 'blob 12s ease-in-out infinite',
        blobSlow: 'blob 18s ease-in-out infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
