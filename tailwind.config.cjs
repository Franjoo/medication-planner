/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], theme: {
    fontFamily: {
      inter: ["\"Inter\"", "sans-serif"]
    }, extend: {
      borderWidth:{
        "1": "1px"
      },
      height: {
        cell: "48px",
        day: "calc(5 * 48px + 4 * 12px)"
      },
      width: {
        cell: "160px"
      },
      spacing: {
        cell: "48px"
      }
    }

  }, plugins: []
};