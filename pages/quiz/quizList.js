import { Box, Card, Typography,CardContent, CardActions, Button, Grid } from '@mui/material'
import React,{useState, useEffect} from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const QuizList = () => {
  const userData = useSelector((state) => state.user);
  const uid = userData.user.uid;
  const [quizData, setQuizData] = useState([]);
  const route = useRouter();
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const fetchedData = await axios.get(
          `http://localhost:8000/api/get_all_quiz/${uid}`
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

  const handleQuizStart = (para,id, name, total_time, pass_mark) => {
    console.log(para);
    if (para==="review") {
      route.replace({
        pathname: "/quiz/quizSessoin",
        query: { id, para },
      });
    }
    else{
      route.replace({
        pathname: "/quiz/quizSessoin",
        query: { id, name, total_time, pass_mark, para },
      });
    }
   
  };
//   console.log("QuizData: ", quizData);

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
          Active Quiz List
        </Typography><hr></hr>
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
                    {typeof quiz.quiz_answers[0] === "undefined" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() =>
                          handleQuizStart(
                            "start",
                            quiz.id,
                            quiz.name,
                            quiz.total_time,
                            quiz.pass_mark
                          )
                        }
                      >
                        Start
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() =>
                          handleQuizStart(
                            "review",
                            quiz.id,
                            quiz.name,
                            quiz.total_time,
                            quiz.pass_mark
                          )
                        }
                      >
                        Review
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
        </Grid>
      </Box>
    </>
  );
}

export default QuizList