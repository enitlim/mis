import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Question from "./question.json";
import {
  styleAttempt,
  styleNotAttempt,
  styleNotView,
  styleReview,
  styleLegend,
  styleOption,
} from "./quizstyle";
import { useSelector } from "react-redux";

const QuestionOverview = ({ triggerFun }) => {
  const questionlist = Question;
  const [itemColor, setItemColor] = useState([]);
  const quizData = useSelector((state) => state.quiz);
  useEffect(() => {
    if (Object.keys(quizData["answers"]).length === 0) {
      setItemColor(
        questionlist.map((d, index) => {
          return styleNotView;
        })
      );
    } else {
      const updatedData = [...itemColor];
      // console.log(quizData["answers"]);
      Object.entries(quizData["answers"]).map(([key, value]) => {
        // console.log("key: ", key);
        // console.log("valueOption: ", value["option"]);
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
  }, [quizData]);

  const handleSubmit = () => {
    let total = 0;
    Object.entries(quizData["answers"]).forEach(([key, value]) => {
      total += value.marks;
    });
    //  console.log("Total Marks: " + total);
    //  console.log(quizData["answers"]);
  };
  const handleClickItem = (item) => {
    triggerFun(item);
  };

  return (
    <>
      <Box
        sx={{
          // display: "flex",
          minHeight: "90vh",
          bgcolor: "lightgrey",
          width: "30%",
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
          <Typography>Question Overview:</Typography>
          <Grid container direction="row">
            {itemColor.map((q, index) => (
              <Grid
                item
                key={index}
                sx={{ paddingTop: "5px", paddingBottom: "5px", margin: "5px" , cursor:"pointer"}}
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
              <Typography sx={{ paddingLeft: "5px" }}>Not Attempted</Typography>
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
        </Stack>
      </Box>
    </>
  );
};

export default QuestionOverview;
