import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const CreateQuizOverview = ({ swipeQue }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitData = async (data) => {
    let SelectedDate = new Date(data.quizstart);
    let qs = `${SelectedDate.getFullYear()}-${
      String(SelectedDate.getMonth() + 1).padStart(2, '0')
    }-${String(SelectedDate.getDate()).padStart(2,'0')} ${String(SelectedDate.getHours()).padStart(2,'0')}:${String(SelectedDate.getMinutes()).padStart(2,'0')}:${String(SelectedDate.getSeconds()).padStart(2,'0')}`;
    let uploadData = { ...data, is_active: 0 };
    uploadData.quizstart=qs
    console.log  (JSON.stringify(uploadData));
   
    // swipeQue(8,"Test Quiz");
    try {
        const uploadQuizOverview = await axios.post(
          "http://localhost:8000/api/createQuizOverview", uploadData, {
            headers:{"Content-Type": "application/json"}
          }
        );
         swipeQue(uploadQuizOverview.data.headers.quizID,
uploadQuizOverview.data.headers.quizName);
    } catch (error) {
        console.error("Error While Uploading",error.message);
    }
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl fullWidth>
                <Controller
                  fullWidth
                  name="quiz_start" // This should match the name in your form data
                  control={control}
                  rules={{ required: "Datetime is required" }} // Add validation rules as needed
                  render={({ field }) => (
                    <DateTimePicker
                      label="Select Datetime"
                      {...field}
                      inputFormat="yyyy/MM/dd hh:mm a"
                      value={field.value ? field.value : null} // Ensure value is in the correct format
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          value={field.value ? formatDateTime(field.value) : ""}
                          // Disable input so users can't edit it directly
                          disabled
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
            </LocalizationProvider>

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