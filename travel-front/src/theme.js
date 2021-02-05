import { red, grey } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// A custom theme for this app
let theme = createMuiTheme({
 
  typography: {
    fontFamily: [
      '"Roboto"',
      '"Quicksand"',
      '"Yusei Magic"',
      '"sans-serif"'
    ].join(','),
  },

  palette: {
    primary: {
      main: "#403d39",
      secondary: grey[50]
    },
    text: {
      main: "#403d39",
      black: "#000",
      grey500: grey[500],
      grey400: grey[400],
      grey200: grey[200],
    },
    secondary: {
      main: "#fff"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    },
    success: {
      main: "#4caf50"
    }
  }
});

theme = responsiveFontSizes(theme)


export default theme;
