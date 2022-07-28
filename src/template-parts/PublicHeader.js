import React from "react";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const Div = styled("div")`
  background-color: #65daf9;
  color: white;
  padding: 10px 15px;
  margin: 5px;
`;

export default function PublicHeader() {
  return (
    <>
      <Container>
        <Grid container>
          <header>
            <Grid item xs={12}>
              <Div>Public Header</Div>
            </Grid>
          </header>
        </Grid>
      </Container>
    </>
  );
}
