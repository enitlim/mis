import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  styleAttempt,
  styleNotAttempt,
  styleNotView,
  styleReview,
  styleLegend,
  styleOption,
} from "./quizstyle";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { quizComplete } from "../../redux/features/quizSlice";
import { useRouter } from "next/router";
const QuestionOverview = ({
  triggerFun,
  Questions,
  quizId,
  para,
  examTime,
}) => {
  const route = useRouter();
  const questionlist = Questions;
  const [timer, setTimer] = useState(examTime * 60);
  const [itemColor, setItemColor] = useState([]);
  const [ansData, setansData] = useState([]);
  const [review, setReview] = useState(0);
  const quizData = useSelector((state) => state.quiz); //get the quiz data from store
  const userData = useSelector((state) => state.user); //get the user data from store
  const dispatch = useDispatch();
  // console.log(quizData);
  //for the legend update based on state of the quiz

  useEffect(() => {
    if (para === "review") {
      const getQuizAns = async () => {
        const quizAnsData = await axios.get(
          `http://localhost:8000/api/quizReview/?quiz_id=${quizId}&userid=${userData.user.uid}`
        );
        setansData(JSON.parse(quizAnsData.data.answer));
      };

      getQuizAns();
      setReview(1);
    }
  }, []);

  useEffect(() => {
    if (para === "review") {
      const updatedData = [...itemColor];
      Object.entries(ansData).map(([key, value]) => {
        
        if (value.marks===0) {
           updatedData[key - 1] = styleNotAttempt;
           setItemColor(updatedData);
        }
        else{
          updatedData[key - 1] = styleAttempt;
          setItemColor(updatedData);
        }
      });
    } else {
      if (Object.keys(quizData["answers"]).length === 0) {
        setItemColor(
          questionlist.map((d, index) => {
            return styleNotView;
          })
        );
      } else {
        const updatedData = [...itemColor];
        Object.entries(quizData["answers"]).map(([key, value]) => {
          if (value["option"] == "answered") {
            updatedData[key - 1] = styleAttempt;
            setItemColor(updatedData);
          } else if (value["option"] == "review") {
            updatedData[key - 1] = styleReview;
            setItemColor(updatedData);
          } else if (value["option"] == "unanswerwed") {
            updatedData[key - 1] = styleNotAttempt;
            setItemColor(updatedData);
          }
        });
      }
    }
  }, [quizData, review, ansData]);
  //Time format for the Counter
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  //Submit Function
  const handleSubmit = async () => {
    let ansData = {};
    let total = 0;
    Object.entries(quizData["answers"]).forEach(([key, value]) => {
      total += value.marks;
    });
    ansData = {
      quiz_id: quizId,
      uid: userData.user.uid,
      answer: JSON.stringify(quizData.answers),
      marks_obtained: total,
    };
    console.log(ansData);
    if (Object.keys(ansData).length > 0) {
      try {
        const quizResponse = await axios.post(
          "http://localhost:8000/api/submitQuiz",
          ansData
        );
        console.log(quizResponse);
        if (quizResponse.data.msg === "Submitted Successfully") {
          dispatch(quizComplete());
          route.replace("/home");
        }
      } catch (error) {
        console.log("Error Occured", error.message);
      }
    }
  };
  //for the Timer
  useEffect(() => {
    let interval;
      const handleSubmit = async () => {
        let ansData = {};
        let total = 0;
        Object.entries(quizData["answers"]).forEach(([key, value]) => {
          total += value.marks;
        });
        ansData = {
          quiz_id: quizId,
          uid: userData.user.uid,
          answer: JSON.stringify(quizData.answers),
          marks_obtained: total,
        };
        console.log(ansData);
        if (Object.keys(ansData).length > 0) {
          try {
            const quizResponse = await axios.post(
              "http://localhost:8000/api/submitQuiz",
              ansData
            );
            console.log(quizResponse);
            if (quizResponse.data.msg === "Submitted Successfully") {
              dispatch(quizComplete());
              route.replace("/home");
            }
          } catch (error) {
            console.log("Error Occured", error.message);
          }
        }
      };
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000); // Update the timer every second
    }

    if (timer === 0) {
      clearInterval(interval); // Stop the timer when it reaches 0
      // Trigger your event here
      alert("Exam Countdown completed!");
      handleSubmit();
    }

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, [timer]);

  const handleClickItem = (item) => {
    triggerFun(item);
  };
  const handleClose = () => {
    route.replace("/home");
  };
  return (
    <>
      <Box
        sx={{
          // display: "flex",
          minHeight: "100vh",
          bgcolor: "lightgrey",
          width: "25%",
          padding: "10px",
        }}
      >
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          sx={{ minHeight: "90vh" }}
        >
          {para === "review" ? (
            ""
          ) : (
            <Box textAlign="center">
              <Typography variant="h6">Time Countdown</Typography>
              <Typography variant="h4" color="red">
                {formatTime(timer)}
              </Typography>
            </Box>
          )}
          <Typography>Question Overview:</Typography>
          <Grid container direction="row">
            {itemColor.map((q, index) => (
              <Grid
                item
                key={index}
                sx={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={q}
                  onClick={() => {
                    handleClickItem(index);
                  }}
                >
                  {++index}
                </Box>
              </Grid>
            ))}
          </Grid>
          {para === "review" ? (
            <>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                // columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={6} sx={styleLegend}>
                  <Box sx={styleAttempt}></Box>
                  <Typography sx={{ paddingLeft: "5px" }}>Correct</Typography>
                </Grid>

                <Grid item xs={6} sx={styleLegend}>
                  <Box sx={styleNotAttempt}></Box>
                  <Typography sx={{ paddingLeft: "5px" }}>
                    Wrong
                  </Typography>
                </Grid>

              </Grid>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                // columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={6} sx={styleLegend}>
                  <Box sx={styleAttempt}></Box>
                  <Typography sx={{ paddingLeft: "5px" }}>Attempted</Typography>
                </Grid>

                <Grid item xs={6} sx={styleLegend}>
                  <Box sx={styleNotAttempt}></Box>
                  <Typography sx={{ paddingLeft: "5px" }}>
                    Not Attempted
                  </Typography>
                </Grid>

                <Grid item xs={6} sx={styleLegend}>
                  <Box sx={styleNotView}></Box>
                  <Typography sx={{ paddingLeft: "5px" }}>
                    Not Viewed Yet
                  </Typography>
                </Grid>

                <Grid item xs={6} sx={styleLegend}>
                  <Box sx={styleReview}></Box>
                  <Typography sx={{ paddingLeft: "5px" }}>
                    to be Revieved
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" fullWidth>
                    Instructions
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Finish
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default QuestionOverview;
