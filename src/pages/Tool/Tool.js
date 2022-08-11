import { React, useState, useEffect, useRef } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import swal from "sweetalert";

import Login from "../../components/Login";

export default function Tool() {
  const textTitle = useRef();

  const [emotion, setEmotion] = useState("Numb");
  useEffect(() => {
    console.log(emotion);
  }, [emotion]);

  const [MyText, setMyText] = useState();
  useEffect(() => {
    console.log(MyText);
  }, [MyText]);

  const submit = (e) => {
    e.preventDefault();
    const title = textTitle.current.value;
    console.log(title);
    swal(title);
  };

  return (
    <>
      <Container>
        <Grid container>
          <Grid item sm={12}>
            <Typography variant="h1" component="h2" color="logoblue">
              Tool
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <h1>Current emotion {emotion}</h1>

            <Button
              variant="outlined"
              size="small"
              color="logoblue"
              onClick={() => setEmotion("Happy")}
            >
              Happy
            </Button>
            <Button
              variant="contained"
              color="logoblue"
              onClick={() => setEmotion("Sad")}
            >
              Sad
            </Button>
            <Button
              variant="outlined"
              size="medium"
              color="logored"
              onClick={() => setEmotion("Tired")}
            >
              Tired
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="logored"
              onClick={() => setEmotion("Exhausted")}
            >
              Exhausted
            </Button>
            <form onSubmit={submit}>
              <input
                ref={textTitle}
                type="text"
                placeholder="write here.."
                onChange={(e) => setMyText(e.target.value)}
              />
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </Grid>

          <Grid item sm={12}>
            <Login />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
