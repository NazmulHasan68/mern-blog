// tailwind.config.js

import flowbite from "flowbite/plugin";

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Your project files
    './node_modules/flowbite/**/*.js',  // Include flowbite paths
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
  ],
};
