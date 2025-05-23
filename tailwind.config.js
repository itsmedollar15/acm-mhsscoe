/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
  			primary: {
  				light: '#4096ff',
  				DEFAULT: 'hsl(var(--primary))',
  				dark: '#36344A',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			blob: "blob 7s infinite",
  			gradient: "gradient 15s ease infinite",
  		},
  		keyframes: {
  			blob: {
  				"0%": {
  					transform: "translate(0px, 0px) scale(1)",
  				},
  				"33%": {
  					transform: "translate(30px, -50px) scale(1.1)",
  				},
  				"66%": {
  					transform: "translate(-20px, 20px) scale(0.9)",
  				},
  				"100%": {
  					transform: "translate(0px, 0px) scale(1)",
  				},
  			},
  			gradient: {
  				"0%": {
  					backgroundPosition: "0% 50%",
  				},
  				"50%": {
  					backgroundPosition: "100% 50%",
  				},
  				"100%": {
  					backgroundPosition: "0% 50%",
  				},
  			},
  		},
  		backgroundSize: {
  			"400%": "400% 400%",
  		},
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
