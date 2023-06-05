/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], theme: {
    fontFamily: {
      inter: ["\"Inter\"", "sans-serif"]
    }, extend: {
      borderWidth:{
        "1": "1px"
      }
    }

  }, plugins: []
};