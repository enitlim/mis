import {
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const EditQuizAll = () => {
  const [quizData, setQuizData] = useState([]);
  const route = useRouter();
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const fetchedData = await axios.get(
          `http://localhost:8000/api/get_all_quiz/{user_id}`
        );
        // console.log(fetchedData.data.quiz);
        setQuizData(fetchedData.data.quiz);
      } catch (error) {
        if (error.response && error.response.statusCode === 422) {
          console.log(
            "Request failed due to validation error:",
            error.response.data
          );
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    fetchQuizData();
  }, []);
  const handleQuizStart = (id, name) => {
 
      route.push({
        pathname: "/quiz/admin/editQuiz",
        query: { id, name },
      });
   
  };

  return (
    <>
      <Box
        textAlign="center"
        sx={{
          paddingTop: "10px",
          paddingLeft: "20px",
          backgroundColor: "#C3C8C7",
          height: "100vh",
        }}
      >
        <Typography variant="h4" color="initial" textAlign="left">
          Quiz List
        </Typography>
        <hr></hr>
        <Grid container spacing={0}>
          {quizData.length === 0
            ? null
            : quizData.map((quiz, index) => (
                <Card
                  key={quiz.id}
                  sx={{
                    width: 300,
                    padding: "5px",
                    margin: "15px",
                    backgroundColor: "white",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" color="initial">
                      {quiz.name}
                    </Typography>
                    <Typography variant="h6" color="initial">
                      {quiz.desc}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        Duration:{" "}
                        <span style={{ color: "blue" }}>
                          {quiz.total_time} mins
                        </span>
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Passing Marks:{" "}
                        <span style={{ color: "green" }}>{quiz.pass_mark}</span>
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleQuizStart(quiz.id, quiz.name)}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              ))}
        </Grid>
      </Box>
    </>
  );
};

export default EditQuizAll;
