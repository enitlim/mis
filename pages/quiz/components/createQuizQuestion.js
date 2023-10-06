import { Box, Radio, TextField, Container, Typography, Button } from "@mui/material";
import React,{ useState} from 'react'
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createQuiz } from "../../redux/features/quizQuestionSlice";
import { useForm } from "react-hook-form";
import {useSelector, useDispatch} from "react-redux"
import axios from "axios";
const CreateQuizQuestion = ({ quiz_Id }) => {
    const quesData=useSelector((state)=>state.quizQuestion)
    
    const dispatch = useDispatch();
    const {reset, handleSubmit, register, formState:{errors}}=useForm();
    const [questionCounter, setQuestionCounter] = useState(1)
    const [value, setValue] = useState("")
    const formSubmit = (data) => {

        let optionlist={}
        if (value==="A") {
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
      setQuestionCounter(questionCounter+1);
      reset({
        questions: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
       
      });
      setValue("");
    };
const handleFinal=async()=>{
    let finalSubmit=[];
    Object.entries(quesData.question).map(([key, val])=>{
        // console.log(val);
        finalSubmit.push(val)
    })
    let final = { quiz_questions: finalSubmit };
    // let finalSubmit = [quesData.question];
    console.log("Que Data: ", final.toString());
    try {
        const responseData = await axios.post(
          "http://localhost:8000/api/add_quiz_question",
          final
        );
        console.log(responseData);
    } catch (error) {
        console.error(error.message);
    }
}
  return (
    <>
      <Container>
        <Box sx={{ padding: "20px" }}>
          <Box sx={{ padding: "10px" }}>
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
            <Box sx={{ padding: "10px" }}>
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
                <Box sx={{ display: "flex" }}>
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
                <Box sx={{ display: "flex" }}>
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
                <Box sx={{ display: "flex" }}>
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
            <Button variant="outlined" color="primary" type="submit">
              Next
            </Button>
            <Button variant="outlined" color="primary" onClick={handleFinal}>
              Finish
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default CreateQuizQuestion