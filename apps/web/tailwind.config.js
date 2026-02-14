/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
            },
            colors: {
                velo: {
                    violet: '#7C3AED',
                    indigo: '#4F46E5',
                    cyan: '#06B6D4',
                    rose: '#F43F5E',
                    emerald: '#10B981',
                    bg: {
                        deep: '#0A0A0F',
                        card: '#12121E',
                        elevated: '#1A1A2E',
                    },
                    text: {
                        primary: '#FFFFFF',
                        secondary: '#A1A1AA',
                        muted: '#71717A',
                    },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-brand': 'linear-gradient(135deg, #7C3AED, #4F46E5, #06B6D4)',
                'gradient-hot': 'linear-gradient(135deg, #F43F5E, #7C3AED)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 3s linear infinite',
                'gradient-shift': 'gradient-shift 8s ease infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};
