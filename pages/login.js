import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useRouter} from "next/router";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log("This is the data: ", data);
      const response = await axios.post("http://localhost:8000/token", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(response.data);
      localStorage.setItem("access_token", response.data.access_token);
      router.push("/homePage")
    } catch (error) {
      console.log("Error: ", error.response?.data);
    }
  };
  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            {...register("username", {
              required: "Email is required",
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              //   message: "Invalid email address",
              // },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
