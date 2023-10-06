import { Box, Container, TextField, Typography, Button } from "@mui/material";
import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
const CreateQuizOverview = ({ swipeQue }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitData = async (data) => {
    let uploadData = { ...data, is_active: 0 };
    console.log(uploadData);
   
    swipeQue(8);
    // try {
    //     const uploadQuizOverview = await axios.post(
    //       "http://localhost:8000/api/createQuizOverview", uploadData, {
    //         headers:{"Content-Type": "application/json"}
    //       }
    //     );
    //     console.log("Upload Status",uploadQuizOverview.data.headers);
    //      swipeQue(uploadQuizOverview.data.headers);
    // } catch (error) {
    //     console.error("Error While Uploading",error.message);
    // }
  };
  return (
    <>
      <Container>
        <Box sx={{ padding: "15px", textAlign: "center" }}>
          <Typography variant="h6">Create Quiz</Typography>
          <form onSubmit={handleSubmit(submitData)}>
            <TextField
              fullWidth
              label="Quiz Name"
              variant="outlined"
              margin="normal"
              {...register("name", { required: true })}
            ></TextField>
            {errors.name && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
            <TextField
              fullWidth
              label="Quiz Description"
              variant="outlined"
              margin="normal"
              {...register("desc", { required: true })}
            ></TextField>
            {errors.desc && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
            <TextField
              fullWidth
              label="Quiz Pass Marks"
              variant="outlined"
              margin="normal"
              {...register("pass_mark", {
                required: true,
                pattern: {
                  value: /^\d+$/,
                  message: "Only Number is Allowed",
                },
              })}
              helperText={errors.pass_mark?.message}
            ></TextField>
            {errors.pass_mark && (
              <span style={{ color: "red" }}>This field is required</span>
            )}

            <TextField
              fullWidth
              label="Quiz Total Time"
              variant="outlined"
              margin="normal"
              {...register("total_time", {
                required: true,
                pattern: {
                  value: /^\d+$/,
                  message: "Only Number is Allowed",
                },
              })}
              helperText={errors.total_time?.message}
            ></TextField>
            {errors.total_time && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default CreateQuizOverview