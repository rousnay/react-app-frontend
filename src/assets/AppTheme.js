import { createTheme } from "@mui/material/styles";

export const AppTheme = createTheme({
  // breakpoints - style Custom
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  // palette - style Custom
  palette: {
    logored: {
      main: "#f73a6b",
      contrastText: "#fff",
    },
    logoblue: {
      main: "#3bcce1",
      contrastText: "#fff",
    },
    logoblack: {
      main: "#2b2d42",
      contrastText: "#fff",
    },
    themered: {
      main: "#ff4141",
      contrastText: "#fff",
    },
    themegreen: {
      main: "#40ac4f",
      contrastText: "#fff",
    },
    themeblue: {
      main: "#4caff6",
      contrastText: "#fff",
    },
    themeyellow: {
      main: "#ff9938",
      contrastText: "#fff",
    },
    themepurple: {
      main: "#ab64e8",
      contrastText: "#fff",
    },
    themeblack: {
      main: "#1d1f30",
      contrastText: "#fff",
    },
    themegray: {
      main: "#777983",
      contrastText: "#fff",
    },
    themebg: {
      main: "#d0d0d0",
      contrastText: "#fff",
    },
  },

  // component - style Custom
  components: {
    // Name of the component
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderWidth: "2px!important",
          },
          "&:hover": {
            borderWidth: "2px",
          },
        },
        {
          props: { variant: "primary" },
          style: {
            backgroundColor: "#3bcce1",
            color: "white",
            "&:hover": {
              backgroundColor: "#f73a6b",
              color: "white",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            textTransform: "none",
            border: `2px dashed blue`,
            backgroundColor: "yellow",
          },
        },
        {
          props: { variant: "secondary", color: "secondary" },
          style: {
            textTransform: "none",
            border: `2px dashed blue`,
            backgroundColor: "yellow",
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: ".43em",
          //   fontSize: "2rem!important",
          //   boxShadow: "none",
          //   "&:hover": {
          //     boxShadow: "none",
          //   },
          //   "&:active": {
          //     boxShadow: "none",
          //   },
          //   "&:focus": {
          //     boxShadow: "0 0 0 0.2rem",
          //   },
        },
      },
    },
  },
});
