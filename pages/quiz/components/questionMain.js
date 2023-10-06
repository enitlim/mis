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
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMarks,
  clearAnswer,
  reviewAnswer,
} from "../../redux/features/quizSlice";

const Question = ({ queIndex, Questions }) => {
  // console.log("Question MAin=> ",Questions);
  const quizData = useSelector((state) => state.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(""); // State to store selected answer
  const dispatch = useDispatch();
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
  let currentQuestion = Questions[currentQuestionIndex];
  const handleNextQuestion = (type, quesId) => {
    // console.log(quizData["answers"][quesId]);
    if (typeof quizData["answers"][quesId] === "undefined") {
      handleQuestion(quesId, "", 0, "unanswerwed");

      type === "next"
        ? setCurrentQuestionIndex(currentQuestionIndex + 1)
        : setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      type === "next"
        ? setCurrentQuestionIndex(currentQuestionIndex + 1)
        : setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleQuestion = (quesId, answerKey, marks, option) => {
    // console.log(quesId, answerKey, marks);
    dispatch(updateMarks({ quesId, answerKey, marks, option }));
  };
  const clearAns = (quesId) => {
    dispatch(clearAnswer({ quesId }));
  };
  const reviewAns = (quesId) => {
    if (typeof quizData["answers"][quesId] === "undefined") {
      handleQuestion(quesId, "", 0, "review");
    } else {
      if (quizData["answers"][currentQuestionIndex + 1]["option"] == "review") {
        if (quizData["answers"][currentQuestionIndex + 1]["answerKey"] !== "") {
          let ansData = { ...quizData["answers"][currentQuestionIndex + 1] };
          ansData["option"] = "answered";
          dispatch(reviewAnswer(ansData));
        } else {
          let ansData = { ...quizData["answers"][currentQuestionIndex + 1] };
          ansData["option"] = "unanswerwed";
          dispatch(reviewAnswer(ansData));
        }
      } else {
        let ansData = { ...quizData["answers"][currentQuestionIndex + 1] };
        ansData["option"] = "review";
        dispatch(reviewAnswer(ansData));
      }

      // console.log(ansData);
    }
  };
  // console.log(typeof quizData["answers"][currentQuestionIndex]);
  return (
    <>
      <Stack sx={{ width: "75%" }}>
        <Box
          sx={{ padding: "25px", margin: "25px", width: "75%", height: "75vh" }}
        >
          <Typography variant="h5" color="initial">
            Quesion No: {currentQuestionIndex + 1}
          </Typography>
          <hr />
          <Typography variant="h4" color="initial" sx={{ marginTop: "4rem" }}>
            {" "}
            {currentQuestion.questions}
          </Typography>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={selectedAnswer} // Set the selected value
              onChange={(e) => setSelectedAnswer(e.target.value)} // Update selectedAnswer when an option is selected
              name="radio-buttons-group"
            >
              {Object.entries(currentQuestion.answer[0]).map(
                ([option, [text, marks]]) => (
                  <label key={option}>
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={text}
                      onChange={() =>
                        handleQuestion(
                          currentQuestionIndex + 1,
                          option,
                          marks,
                          "answered"
                        )
                      }
                    />
                  </label>
                )
              )}
            </RadioGroup>
          </FormControl>
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
                      () => handleNextQuestion("prev", currentQuestionIndex + 1)
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
                      () => handleNextQuestion("next", currentQuestionIndex + 1)
                      //
                    }
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            )}

            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => reviewAns(currentQuestionIndex + 1)}
              >
                {/* {console.log(quizData["answers"][currentQuestionIndex + 1])} */}
                {typeof quizData["answers"][currentQuestionIndex + 1] ==
                "undefined"
                  ? "review"
                  : quizData["answers"][currentQuestionIndex + 1]["option"] ==
                    "review"
                  ? "Unreview"
                  : "Review"}
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                // onClick={() => clearAns(currentQuestionIndex + 1)}
                onClick={() =>
                  handleQuestion(currentQuestionIndex + 1, "", 0, "unanswerwed")
                }
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default Question;
