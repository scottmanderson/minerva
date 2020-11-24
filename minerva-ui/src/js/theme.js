import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#0a0a32",
      paper: "#008080",
    },
    text: {
      primary: "#FFFFF0", // "ivory"
      secondary: "#FFD700", // "gold"
    },
  },
});

export default theme;
