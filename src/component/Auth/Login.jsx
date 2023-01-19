import React from "react";
import "./Auth.css";
import { ExitToAppOutlined } from "@mui/icons-material";

const Login = () => {
  const handleLogin = () => {};
  return (
    <div className="logincontainer">
      <div className="logintitle">
        <ExitToAppOutlined className="" /> Login to your account
      </div>
      <form onSubmit={handleLogin} className="loginform">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />

        <button type="submit" className="loginbutton">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
