import type { Config } from "tailwindcss";
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundImage: {
				hero: "url('/images/home_image.jpg')",
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
                shimmer: {
					from: { 
                        backgroundPosition: "0 0" 
                    },
					to: { 
                        backgroundPosition: "-200% 0" 
                    },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
                shimmer: 'shimmer 2s linear infinite',
			},
            typography: (theme: any) => ({
				DEFAULT: {
					css: {
						a: {
							color: theme("colors.blue.500"), // Customize link color
							textDecoration: "underline",
							fontWeight: "500",
							"&:hover": {
								color: theme("colors.blue.700"),
							},
						},
						h1: {
							color: theme("colors.slate.50"), // Heading 1 color
						},
						h2: {
							color: theme("colors.slate.50"), // Heading 2 color
						},
						h3: {
							color: theme("colors.slate.50"), // Heading 3 color
						},
						h4: {
							color: theme("colors.slate.50"), // Heading 4 color
						},
						h5: {
							color: theme("colors.slate.50"), // Heading 5 color
						},
						h6: {
							color: theme("colors.slate.50"), // Heading 6 color
						},
					},
				},
			}),
		},
	},
	plugins: [
        require("tailwindcss-animate"), 
        require("@tailwindcss/typography"),
        addVariablesForColors,
    ],
} satisfies Config;
function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}
export default config;
