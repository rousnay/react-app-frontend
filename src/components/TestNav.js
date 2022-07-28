import * as React from "react";
import { Container, Grid, Link, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const MenuLink = styled(Link)`
  background-color: #1976d2;
  color: white;
  padding: 10px 15px;
  margin: 5px;
  &:hover {
    background-color: #65daf9;
    color: white;
  }
  @media only screen and (max-width: 600px) {
    background-color: lightblue;
  }
`;

export default function TestNav() {
  return (
    <>
      <Container>
        <Grid container>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <MenuLink href="/" underline="none">
              {"Home"}
            </MenuLink>
            <MenuLink href="/Login" underline="none">
              {"Login"}
            </MenuLink>
            <MenuLink href="/Channel" underline="none">
              {"Channel"}
            </MenuLink>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
