/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#0a0908",
                    foreground: "#ffffff",
                },
                muted: {
                    DEFAULT: "#f4f4f5",
                    foreground: "#71717a",
                },
                card: {
                    DEFAULT: "#ffffff",
                    foreground: "#0a0908",
                },
                border: "#e4e4e7",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "primary-gradient": "linear-gradient(to right, #0a0908, #2a2a2a)",
            },
        },
    },
    plugins: [],
};
