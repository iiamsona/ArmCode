import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleImage from '../assets/images/google.svg'
import FacebookImage from '../assets/images/facebook.svg'
import MicImage from '../assets/images/microsoft.svg'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost/api/login.php", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem(
            "userData",
            JSON.stringify(response.data.data)
          );

          window.location.href = "/dashboard";
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
  <div className="flex justify-center w--full items-center h-screen">
      <div className="w-60">
        <form onSubmit={handleSubmit}>
          <p className="justify-center grid font-bold text-[26px]">Sign in</p>
          <div className="flex justify-center items-center">
          <img src={FacebookImage} className="w-[24px] h-[24px] m-2" alt="Facebook" />
          <img src={GoogleImage} className="w-[28px] h-[28px] m-2" alt="Google" />
          <img src={MicImage} className="w-[24px] h-[24px] m-2" alt="Mic" />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-20 h-0.5 m-1 bg-[#AFAFAF] rounded-primary"></div>
            <p className=" text-[#AFAFAF]">or</p>
            <div className="w-20 h-0.5 m-1 bg-[#AFAFAF] rounded-primary"></div>
          </div>
          {error && (
            <Alert style={{ marginBottom: "20px" }} severity="error">
              {error}
            </Alert>
          )}
          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="filled"
            id="email"
            label="Email"
            fullWidth
            style={{ marginBottom: "20px" }}
            className="rounded-primary"
          />
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            variant="filled"
            id="password"
            label="Password"
            fullWidth
            style={{ marginBottom: "20px" }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <div className="flex items-center justify-center">
          <Button variant="contained" type="submit" sx={{
              backgroundColor: "#616161",
              "&:hover": {
                backgroundColor: "#4f4f4f",
              },
            }}>
            Login
          </Button>
          </div>
          <p className="text-sm mt-2">
            Don't have an account? <Link href="/register">Sign up</Link>
          </p>
        </form>
      </div>
      </div>
  );
}

export default Login;
