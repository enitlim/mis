import {
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Grid,Snackbar,
Alert
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import MenuAppBar from "../../CommonComponents/menuAppBar";
const EditQuizAll = () => {
  const [quizData, setQuizData] = useState([]);
  const [toggle, setToggle] = useState(null)
    const [open, setOpen] = useState(false);
  const [severe, setSevere] = useState("success");
const [alertMsg, setAlertMsg] = useState("");
  const route = useRouter();
  console.log(quizData);
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const fetchedData = await axios.get(
          `http://localhost:8000/api/get_all_quiz/`
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
  }, [toggle]);
  const handleQuizStart = (id, name) => {
 
      route.push({
        pathname: "/quiz/admin/editQuiz",
        query: { id, name },
      });
   
  };
  const handleSwitch = async(quizID, event) => {
      const quizActivate = await axios.patch(
        `http://localhost:8000/api/activate_quiz/?quiz_id=${quizID}&toggleStatus=${event.target.checked}`
      );
      if (quizActivate.data.message=="activated") {
        setOpen(true);
        setSevere("success");
        setAlertMsg("Quiz successfully activated");
      }   
      else{
        setOpen(true);
        setSevere("warning");
        setAlertMsg("Quiz successfully deactivated");
      }
      !toggle ? setToggle(true) : setToggle(false); 

  }
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
  return (
    <>
      <MenuAppBar />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <Alert onClose={handleClose} severity={severe} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
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
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            // defaultChecked={quiz.is_active === 1}
                            checked={quiz.is_active === 1}
                            onChange={(event) => handleSwitch(quiz.id, event)}
                          />
                        }
                        label={
                          quiz.is_active === 1
                            ? "Deactive Quiz"
                            : "Activate Quiz"
                        }
                      />
                    </FormGroup>
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
