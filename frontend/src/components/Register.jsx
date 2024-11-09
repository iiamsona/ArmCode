import axios from "axios";
import React, { useState } from "react";
import "@fontsource/roboto/400.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleImage from "../assets/images/google.svg";
import FacebookImage from "../assets/images/facebook.svg";
import MicImage from "../assets/images/microsoft.svg";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleGeneratePassword = () => {
    setPassword(generatePassword());
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost/api/register.php", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setApiResponse(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setApiResponse(error.response.data.message);
      });
  };

  return (
    <div className="flex justify-center w--full items-center h-screen">
      <div className="w-60">
        <form onSubmit={handleSubmit}>
          <p className="justify-center grid font-bold text-[26px]">Sign up</p>
          <div className="flex justify-center items-center">
            <img
              src={FacebookImage}
              className="w-[24px] h-[24px] m-2"
              alt="Facebook"
            />
            <img
              src={GoogleImage}
              className="w-[28px] h-[28px] m-2"
              alt="Google"
            />
            <img src={MicImage} className="w-[24px] h-[24px] m-2" alt="Mic" />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-20 h-0.5 m-1 bg-[#AFAFAF] rounded-primary"></div>
            <p className=" text-[#AFAFAF]">or</p>
            <div className="w-20 h-0.5 m-1 bg-[#AFAFAF] rounded-primary"></div>
          </div>
          {apiResponse && (
            <Alert
              style={{ marginBottom: "20px" }}
              severity={apiResponse.includes("success") ? "success" : "error"}
            >
              {apiResponse}
            </Alert>
          )}
          <TextField
            type="text"
            value={username}
            onChange={handleUsernameChange}
            variant="filled"
            id="filled-basic"
            label="Name"
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="filled"
            id="filled-basic"
            label="Email"
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <div>
            <TextField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              variant="filled"
              id="filled-basic"
              label="Password"
              fullWidth
              style={{ marginBottom: "10px" }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              size="small"
              style={{ marginBottom: "25px" }}
              onClick={handleGeneratePassword}
            >
              Generate password
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#616161",
              }}
            >
              Login
            </Button>
          </div>
          <p className="text-sm mt-2">
            Do You have an account? <Link href="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
