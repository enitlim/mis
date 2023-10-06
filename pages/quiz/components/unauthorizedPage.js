// components/UnauthorizedPage.js

import React from "react";
import { Button, Typography, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/home");
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            User is not authorized!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            You do not have permission to access this page.
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UnauthorizedPage;
