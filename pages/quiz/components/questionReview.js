import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const QuestionReview = ({ queIndex, Questions, queId }) => {
  const quizData = useSelector((state) => state.quiz);
  const userData = useSelector((state) => state.user);
  const [ansData, setansData] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("Mumbai"); // State to store selected answer
//   console.log("Selected Answer", selectedAnswer);
  useEffect(() => {
    setCurrentQuestionIndex(queIndex - 1);
  }, [queIndex]);

  useEffect(() => {
    if (typeof quizData["answers"][currentQuestionIndex + 1] === "undefined") {
      setSelectedAnswer("");
    } else {
      setSelectedAnswer(
        quizData["answers"][currentQuestionIndex + 1]["answerKey"]
      );
    }
  }, [currentQuestionIndex, quizData]);

  useEffect(() => {
    const getQuizAns=async() => {
    const quizAnsData = await axios.get(
      `http://localhost:8000/api/quizReview/?quiz_id=${queId}&userid=${userData.user.uid}`
    );
    setansData(JSON.parse(quizAnsData.data.answer));

    }
  
  getQuizAns();
  }, [])
  
  let currentQuestion = Questions[currentQuestionIndex];
  let ansList={};
  if (Object.keys(ansData).length>0) {
    ansList = ansData[currentQuestionIndex + 1];
    //   console.log("CurrentQue ", currentQuestion);
    //   console.log("ansList ", ansList);
    //   console.log("CurrentQue Length", Object.keys(currentQuestion).length);
    //   console.log("ansList Length", Object.keys(ansList).length);
  }
   

  return (
    <>
      {Object.keys(currentQuestion).length > 0 &&
      Object.keys(ansList).length > 0 ? (
        <>
          <Stack sx={{ width: "75%" }}>
            <Box
              sx={{
                padding: "25px",
                margin: "25px",
                width: "75%",
                height: "75vh",
              }}
            >
              <Typography variant="h5" color="initial">
                Quesion No: {currentQuestionIndex + 1}
              </Typography>
              <hr />
              <Typography
                variant="h4"
                color="initial"
                sx={{ marginTop: "4rem" }}
              >
                {currentQuestion.questions}
              </Typography>

              {Object.entries(currentQuestion.answer[0]).map(
                ([option, [text, marks]]) => (
                  <React.Fragment key={option}>
                    {option == ansList.answerKey && marks == 1 ? (
                      <>
                        <Typography
                          variant="h5"
                          color="inital"
                          sx={{ backgroundColor: "lightgreen" }}
                        >
                          {option}
                          {"."}
                          {text}
                        </Typography>
                      </>
                    ) : option == ansList.answerKey ? (
                      <>
                        <Typography
                          variant="h5"
                          color="initial"
                          sx={{ backgroundColor: "red" }}
                        >
                          {option}
                          {"."}
                          {text}
                        </Typography>
                      </>
                    ) : marks == 1 ? (
                      <>
                        {" "}
                        <Typography
                          variant="h5"
                          color="inital"
                          sx={{ backgroundColor: "lightgreen" }}
                        >
                          {option}
                          {"."}
                          {text}
                        </Typography>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Typography variant="h5" color="inital">
                          {option}
                          {"."}
                          {text}
                        </Typography>
                      </>
                    )}
                  </React.Fragment>
                )
              )}
            </Box>
            <Box sx={{ padding: "10px", width: "75%" }}>
              <Grid container spacing={2} justifyContent="space-around">
                {currentQuestionIndex === 0 ? (
                  <>
                    <Grid item>
                      <Box sx={{ width: "40px" }}></Box>
                    </Grid>
                  </>
                ) : (
                  <Grid item>
                    <Box sx={{ width: "40px" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={
                          () =>
                            setCurrentQuestionIndex(currentQuestionIndex - 1)
                          //
                        }
                      >
                        Previous
                      </Button>
                    </Box>
                  </Grid>
                )}
                {currentQuestionIndex === Questions.length - 1 ? (
                  <Grid item>
                    <Box sx={{ width: "40px" }}></Box>
                  </Grid>
                ) : (
                  <Grid item>
                    <Box sx={{ width: "40px" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={
                          () =>
                            setCurrentQuestionIndex(currentQuestionIndex + 1)
                          //
                        }
                      >
                        Next
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Stack>
        </>
      ) : null}
    </>
  );
};

export default QuestionReview;
