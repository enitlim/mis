import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Result = ({ data }) => {
    const route=useRouter();

  const { marks, passed } = data;
  const hasPassed = passed; // passFail; // You can adjust the passing marks as needed.
   const handleExit=() => {
    route.replace("/home")
    }
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Results
      </Typography>

      <Typography variant="h6" align="center">
        Your Marks: {marks}
      </Typography>

      {hasPassed == 1 ? (
        <div>
          <Typography variant="h5" align="center" style={{ color: "green" }}>
            Congratulations! You have passed.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleExit}
          >
            Exit
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h5" align="center" style={{ color: "red" }}>
            Sorry, you have failed. Please try again.
          </Typography>
          <Button
            onClick={handleExit}
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Exit
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Result;
