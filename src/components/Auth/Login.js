import React, { useState } from "react";
import "../../styles/auth.css";
import logo from "../../images/logo3.jpg";
import axios from "../../api/index";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";


const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    error: null,
  });


  const { email, password, error, username } = data;

  const history = createBrowserHistory({ forceRefresh: true });
 
  const handleChange = (e) => {
    
    if(e.target.value.includes("@")) {
      setData({ ...data, email: e.target.value });
    } else {
      setData({ ...data, username: e.target.value });
    } 
   
  };
    const handleChangePassword = (e) => {
     

       setData({ ...data, [e.target.name]: e.target.value });
      
    };

  

  

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        "/auth/login",
        { email, password, username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      history.push("/");

    } catch (error) {
      setData({ ...data, error: error.response.data.error });
    }
  };


  return (
    <div className="signup-content">
      <div className="login-card">
        <img className="form-logo" src={logo} alt="logo" />
        <form onSubmit={onSubmit} className="signup-form">
          <input
            id="top-login-input"
            className="signup-input"
            type="text"
            // name={firstInput}
            placeholder="Email or username"
            onChange={handleChange}
          />

          <input
            className="signup-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChangePassword}
          />
          {error ? <p className="text-danger"> {error}</p> : null}

          <button className="signup-form-btn" type="submit">
            Log in
          </button>

          <div className="forgot">
            <Link to="/forgot-password">
              <p className="login-bottomx">Forgot your password?</p>
            </Link>
          </div>

          <p className="bottom-text">Don't have an account?</p>
          <Link to="/register">
            <p className="login-bottom">Sign up</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
