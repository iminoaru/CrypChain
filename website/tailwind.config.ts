import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'], // This matches the variable name from layout.tsx
        mono: ['var(--font-mono)'], // This matches the variable name from layout.tsx
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
