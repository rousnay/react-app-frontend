const htmlCss = `

// css
@font-face {
    font-family: 'MyWebFont';
    src: url('webfont.eot'); /* IE9 Compat Modes */
    src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
         url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
         url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: "DejaVu Sans";
    src: url("fonts/DejaVuSans.ttf");
}
@font-face {
    font-family: "DejaVu Sans";
    src: url("fonts/DejaVuSans-Bold.ttf");
    font-weight: bold;
}
@font-face {
    font-family: "DejaVu Sans";
    src: url("fonts/DejaVuSans-Oblique.ttf");
    font-style: italic;
}
@font-face {
    font-family: "DejaVu Sans";
    src: url("fonts/DejaVuSans-BoldOblique.ttf");
    font-weight: bold;
    font-style: italic;
}
@font-face {
    font-family: "DejaVu Sans";
    src: url("fonts/DejaVuSans-Oblique.ttf");
    font-style: oblique;
}
@font-face {
    font-family: "DejaVu Sans";
    src: url("fonts/DejaVuSans-BoldOblique.ttf");
    font-weight: bold;
    font-style: oblique;
}

// html
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

body {
    font-family: 'MyWebFont', Fallback, sans-serif;
  }

// theme
MuiCssBaseline: {
    styleOverrides: `
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
    `,
  },



// App
<ThemeProvider theme={theme}>
<CssBaseline />
<Box
  sx={{
    fontFamily: 'Raleway',
  }}
>
  Raleway
</Box>
</ThemeProvider>



`;


