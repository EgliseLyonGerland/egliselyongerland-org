export default {
  typography: {
    fontFamily: '"Lato", sans-serif',
    fontSize: 16
  },
  palette: {
    primary: {
      50: "#e9effc",
      100: "#c8d6f8",
      200: "#a3bbf3",
      300: "#7e9fee",
      400: "#638bea",
      500: "#4776e6",
      600: "#406ee3",
      700: "#3763df",
      800: "#2f59db",
      900: "#2046d5",
      A100: "#ffffff",
      A200: "#dae1ff",
      A400: "#a7b7ff",
      A700: "#8da2ff",
      contrastDefaultColor: "dark"
    },
    secondary: {
      50: "#f1eafc",
      100: "#ddccf8",
      200: "#c7aaf4",
      300: "#b087f0",
      400: "#9f6eec",
      500: "#8e54e9",
      600: "#864de6",
      700: "#7b43e3",
      800: "#713adf",
      900: "#5f29d9",
      A100: "#ffffff",
      A200: "#ece5ff",
      A400: "#c7b2ff",
      A700: "#b598ff",
      contrastDefaultColor: "dark"
    }
  },
  gradient: () => ({
    // background: '#4776e6',
    // background: '-webkit-linear-gradient(to right, #4776e6, #8e54e9)',
    background: "linear-gradient(to right, #4776e6, #8e54e9)"
  })
};
