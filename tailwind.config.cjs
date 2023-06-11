/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], theme: {
    fontFamily: {
      inter: ["\"Inter\"", "sans-serif"]
    }, extend: {
      colors: {
        "pink": "#E11BB6",
        "black-transparent": "#000000BB",
        "grey-30": "#303030",
        "grey-5C": "#5C5C5C",
        "grey-AC": "#ACACAC",
        "grey-C8": "#C8C8C8",
        "grey-D8": "#D8D8D8",
        "grey-F4": "#F4F4F4"
      },
      borderWidth: {
        "1": "1px"
      },
      height: {
        cell: "48px",
        day: "calc(5 * 48px + 4 * 12px)"
      },
      width: {
        cell: "160px",
      },
      spacing: {
        cell: "48px"
      }
    }

  }, plugins: []
};