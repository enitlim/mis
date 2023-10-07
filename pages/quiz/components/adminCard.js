import React from 'react'
import {
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button, Grid,
} from "@mui/material";
import { useRouter } from 'next/router';
const AdminCard = () => {
  const router = useRouter();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card
            sx={{
              width: 300,
              padding: "5px",
              margin: "15px",
              backgroundColor: "white",
            }}
          >
            <CardContent>
              <Typography variant="h5" color="initial">
                Create Quiz
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => router.push("/quiz/createQuiz")}
              >
                Create
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={{
              width: 300,
              padding: "5px",
              margin: "15px",
              backgroundColor: "white",
            }}
          >
            <CardContent>
              <Typography variant="h5" color="initial">
                Edit Quiz
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => router.push("/quiz/admin/editQuizAll")}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminCard