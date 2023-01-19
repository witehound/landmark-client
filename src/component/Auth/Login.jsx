import React from "react";
import "./Auth.css";
import { ExitToAppOutlined, CancelOutlined } from "@mui/icons-material";

const Login = ({ handleLogin, handleExitAuth, handleInputChange }) => {
  return (
    <div className="logincontainer">
      <div className="logintitle">
        <div className="logintitlemain">
          <ExitToAppOutlined className="" /> Login to your account
        </div>
        <CancelOutlined className="cancelicon" onClick={handleExitAuth} />
      </div>
      <form onSubmit={(e) => handleLogin(e)} className="loginform">
        <input
          type="text"
          placeholder="username"
          name="userName"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit" className="loginbutton">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
