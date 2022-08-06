import { TextField, Typography, Button, Box } from "@mui/material";
import { authActions } from "../store";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup") .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then((data) => console.log(data));
    } else {
      sendRequest().then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login())).then(()=>navigate("/blogs"))
    }
    // if (isSignup) {
    //   sendRequest("signup")
    //     .then((data) => localStorage.setItem("userId", data.user._id))
    //     .then(() => dispath(authActions.login()))
    //     .then(() => naviagte("/blogs"));
    // } else {
    //   sendRequest()
    //     .then((data) => localStorage.setItem("userId", data.user._id))
    //     .then(() => dispath(authActions.login()))
    //     .then(() => naviagte("/blogs"));
    // }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : " Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            value={inputs.email}
            onChange={handleChange}
            placeholder="Email"
            type={"email"}
            name="email"
            margin="normal"
          />
          <TextField
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            type={"password"}
            name="password"
            margin="normal"
          />
          <Button type="submit" sx={{ borderRadius: 3, marginTop: 3 }}>
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
