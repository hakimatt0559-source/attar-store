/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF3E8",
        card: "#FFFDF9",
        orange: {
          DEFAULT: "#E8722E",
          dark: "#C8862E",
        },
        green: {
          DEFAULT: "#4A7C59",
        },
        ink: "#2B2320",
        muted: "#9C7A5C",
        mutedLight: "#B8956F",
      },
      fontFamily: {
        display: ["Tajawal", "sans-serif"],
        body: ["Cairo", "sans-serif"],
        latin: ["Inter", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 20px -4px rgba(122, 74, 30, 0.12)",
        warmLg: "0 8px 30px -6px rgba(122, 74, 30, 0.18)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
