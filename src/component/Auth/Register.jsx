import React from "react";
import "./Auth.css";
import { ExitToAppOutlined, CancelOutlined } from "@mui/icons-material";

const Register = ({ handleRegister, handleExitAuth, handleInputChange }) => {
  return (
    <div className="registercontainer">
      <div className="logintitle">
        <div className="logintitlemain">
          <ExitToAppOutlined className="" /> Register an account
        </div>
        <CancelOutlined className="cancelicon" onClick={handleExitAuth} />
      </div>
      <form onSubmit={(e) => handleRegister(e)} className="loginform">
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={(e) => handleInputChange(e)}
        />
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
        <button type="submit" className="reigisterbutton">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
