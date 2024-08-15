// tailwind.config.js

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        width: {
          'screen-52': '52vw',  // 52% del ancho de la pantalla
          "circulo_arriba_izquierdo":"41vw",
          "circulo_central":"87vw",
        },
        height: {
          'screen-52': '52vw',  // 52.05% del alto de la pantalla
          "circulo_arriba_izquierdo":"41vw",
          "circulo_central":"87vw",
        },
        margin:{
          "circulo_arriba":"3vw",
          "circulo_arriba_izquierdo":"57vw",
          "circulo_central":"15vh",
        }
      },
    },
    plugins: [],
  }