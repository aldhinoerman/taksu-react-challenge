import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#36393F",
          secondary: "#36393F",
          accent: "#00ffff",
          neutral: "#40444B",
          info: "#0000ff",
          success: "#39C36D",
          warning: "#00ff00",
          error: "#C33939",
          "base-100": "#36393F",
        },
      },
    ],
  },
};

export default config;
