import React from "react";
import { Container, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorPalette = styled("div")`
  display: flex;
  flex-flow: row wrap;
  & > div {
    color: white;
    padding: 8px 10px;
  }
`;
const LogoRed = styled(Box)`
  background-color: #f73a6b;
`;
const LogoBlue = styled(Box)`
  background-color: #3bcce1;
`;
const LogoBlack = styled(Box)`
  background-color: #2b2d42;
`;
const ThemeRed = styled(Box)`
  background-color: #ff4141;
`;
const ThemeGreen = styled(Box)`
  background-color: #40ac4f;
`;
const ThemeBlue = styled(Box)`
  background-color: #4caff6;
`;
const ThemeYellow = styled(Box)`
  background-color: #ff9938;
`;
const ThemePurple = styled(Box)`
  background-color: #ab64e8;
`;
const ThemeBlack = styled(Box)`
  background-color: #1d1f30;
`;
const ThemeGray = styled(Box)`
  background-color: #777983;
`;
const ThemeInput = styled(Box)`
  background-color: #bacbe9;
`;
const ThemeBg = styled(Box)`
  background-color: #d0d0d0;
`;

export default function Colors() {
  return (
    <>
      <Container>
        <Grid className="Color">
          <ColorPalette>
            <LogoRed>#f73a6b</LogoRed>
            <LogoBlue>#3bcce1</LogoBlue>
            <LogoBlack>#2b2d42</LogoBlack>
            <ThemeRed>#FF4141</ThemeRed>
            <ThemeGreen>#40AC4F</ThemeGreen>
            <ThemeBlue>#4CAFF6</ThemeBlue>
            <ThemeYellow>#FF9938</ThemeYellow>
            <ThemePurple>#AB64E8</ThemePurple>
            <ThemeBlack>#1D1F30</ThemeBlack>
            <ThemeGray>#777983</ThemeGray>
            <ThemeInput>#BACBE9</ThemeInput>
            <ThemeBg>#D0D0D0</ThemeBg>
          </ColorPalette>
        </Grid>
      </Container>
    </>
  );
}
