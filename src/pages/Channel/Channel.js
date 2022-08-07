import React from "react";
import { Container, Grid, Box, Card, Typography } from "@mui/material";
import LogoSquare from "../../assets/logo-square.svg";

export default function Channel() {
  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Box sm={6} sx={{ flexGrow: 1 }}>
              <Typography variant="h4" sx={{ color: `var(--logoblack)` }}>
                Channel Information
              </Typography>
              <p>
                Please enter information about your channel. Most of the channel
                information can be re-edited at any time. If the image is not
                set, it is exposed as the default.
              </p>
            </Box>
          </Grid>

          <Grid item sm={12} md={6}>
            <img src={LogoSquare} alt="Logo" />
          </Grid>

          <div className="">
            <form className="" noValidate onSubmit={handleSubmit}>
              <Grid item sm={12} md={6} sx={{ padding: "30px 30px 0 0" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="countryCode"
                  name="countryCode"
                  label="Channel Name"
                  type="text"
                  onChange={(e) => setCountryCode(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Mobile Number"
                  type="text"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <p style={{ fontStyle: "italic" }}>
                  The verification code is valid upto 10 minutes. If the input
                  time is exceeded, press resend to receive a new verification
                  code.
                </p>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="logoblue"
                  className=""
                >
                  Next
                </Button>
              </Grid>
            </form>
          </div>
        </Grid>
      </Container>
    </>
  );
}
