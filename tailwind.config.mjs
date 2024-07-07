const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['"SF Pro Text"', "sans-serif"], // for SF Pro Text
        display: ["Oswald", "Haettenschweiler", "sans-serif"],
        handwriting: ["Kalam", "cursive"],
        monospace: ["Courier", "monospace"],
        serif: ["Garamond", "serif"],
        comic: ['"Comic Sans MS"', "cursive"],
        satisfy: ["Satisfy", "cursive"],
        caveat: ["Caveat", "cursive"],
        grace: ['"Covered By Your Grace"', "cursive"],
        architect: ['"Architects Daughter"', "cursive"],
        dekko: ["Dekko", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
