module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '280px',
      'md': '768px',
      'lg': '1200px',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
