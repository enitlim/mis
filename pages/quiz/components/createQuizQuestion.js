import {
  Box,
  Radio,
  TextField,
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Grid,Modal
} from "@mui/material";
import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createQuiz, emptyQuiz } from "../../redux/features/quizQuestionSlice";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
const CreateQuizQuestion = ({ quiz_Id, quiz_Name }) => {
  const quesData = useSelector((state) => state.quizQuestion);
  const dispatch = useDispatch();
  const route=useRouter()

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [questionCounter, setQuestionCounter] = useState(1);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severe, setSevere] = useState("success");
    const [openModal, setOpenModal] = React.useState(false);

  const formNext = (data) => {
    setQuestionCounter(questionCounter + 1);
    reset({
      questions: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
    });
    setValue("");
  };
  const formSubmit = (data) => {
    let optionlist = {};
    if (value === "A") {
      optionlist = {
        option_a_correct: 1,
        option_b_correct: 0,
        option_c_correct: 0,
        option_d_correct: 0,
      };
    }
    if (value === "B") {
      optionlist = {
        option_a_correct: 0,
        option_b_correct: 1,
        option_c_correct: 0,
        option_d_correct: 0,
      };
    }
    if (value === "C") {
      optionlist = {
        option_a_correct: 0,
        option_b_correct: 0,
        option_c_correct: 1,
        option_d_correct: 0,
      };
    }
    if (value === "D") {
      optionlist = {
        option_a_correct: 0,
        option_b_correct: 0,
        option_c_correct: 0,
        option_d_correct: 1,
      };
    }
    console.log(optionlist);
    let fullData = {
      id: questionCounter,
      quiz_id: quiz_Id,
      ...data,
      ...optionlist,
    };
    console.log("Data: ", fullData);
    console.log("Selected Option is: ", value);
    dispatch(createQuiz(fullData));
    setOpen(true);
    setAlertMsg("Question saved successfully");
    setSevere("success");
  };
  const handleFinal = async () => {
    let finalSubmit = [];
    Object.entries(quesData.question).map(([key, val]) => {
      finalSubmit.push(val);
    });
    let final = { quiz_questions: finalSubmit };
    console.log("Que Data: ", finalSubmit.toString().split(","));
    try {
      const responseData = await axios.post(
        "http://localhost:8000/api/add_quiz_question",
        final
      );
      if (responseData.status === 200) {
        setOpen(true)
        dispatch(emptyQuiz());
        setTimeout(() => {
            route.replace("/home");
        }, 1000);
        
      }
    //   console.log("Response Data: ",responseData);
    } catch (error) {
      console.error(error.message);
        setOpen(true);
        setAlertMsg("Error While saving the Quiz");
        setSevere("error");
        setOpenModal(false);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);

  };
  const handleOpen=()=>{
    setOpen(true);
    setAlertMsg("New Msg");
    setSevere("error");
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Container>
        <Button onClick={handleOpen}>Close</Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert
            onClose={handleClose}
            severity={severe}
            sx={{ width: "100%" }}
          >
            {alertMsg}
          </Alert>
        </Snackbar>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Finish Uploading the Question?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "10px",
              }}
            >
              <Button
                variant="outlined"
                color="warning"
                type="submit"
                onClick={() => setOpenModal(false)}
              >
                No
              </Button>
              <Button
                variant="outlined"
                color="success"
                type="submit"
                onClick={handleFinal}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Modal>
        <Box sx={{ padding: "20px" }}>
          <Box sx={{ padding: "10px" }}>
            <Typography variant="h4" color="inital">
              Quiz Name: {quiz_Name}
            </Typography>{" "}
            <Typography variant="h5" color="inital">
              Question No: {questionCounter}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(formSubmit)}>
            <Box sx={{ padding: "10px" }}>
              <TextField
                label="Question"
                multiline
                rows={4}
                fullWidth
                {...register("questions", { required: true })}
              ></TextField>
            </Box>
            <Box sx={{ padding: "10px", marginTop: "10px" }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={value}
                name="radio-buttons-group"
                onChange={(e) => setValue(e.target.value)}
                required
              >
                <Box sx={{ display: "flex" }}>
                  <FormControlLabel
                    value="A"
                    control={<Radio />}
                    label="Option A"
                  />
                  <TextField
                    label="Answer"
                    fullWidth
                    {...register("option_a", { required: true })}
                  ></TextField>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <FormControlLabel
                    value="B"
                    control={<Radio />}
                    label="Option B"
                  />
                  <TextField
                    label="Answer"
                    fullWidth
                    {...register("option_b", { required: true })}
                  ></TextField>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <FormControlLabel
                    value="C"
                    control={<Radio />}
                    label="Option C"
                  />
                  <TextField
                    label="Answer"
                    fullWidth
                    {...register("option_c", { required: true })}
                  ></TextField>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <FormControlLabel
                    value="D"
                    control={<Radio />}
                    label="Option D"
                  />
                  <TextField
                    label="Answer"
                    fullWidth
                    {...register("option_d", { required: true })}
                  ></TextField>
                </Box>
              </RadioGroup>
            </Box>
            <Grid
              container
              spacing={0}
              sx={{ marginTop: "20px" }}
              textAlign="center"
            >
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit(formSubmit)}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit(formNext)}
                >
                  Next
                </Button>
              </Grid>
              <Grid item xs={4}>
                {" "}
                <Button
                  variant="outlined"
                  color="primary"
                  //   onClick={handleFinal}
                  onClick={() => setOpenModal(true)}
                >
                  Finish
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default CreateQuizQuestion;
