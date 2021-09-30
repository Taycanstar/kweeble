import React, { useState } from "react";
import "../../styles/auth.css";
import logo from "../../images/logo3.jpg";
import axios from "../../api/index";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";

const Reset = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const history = createBrowserHistory({ forceRefresh: true });

  const handleChange = (e) => {
    setToken(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!token || !password) return alert("Complete the form");

    try {
      setError(null);

      const res = await axios.patch(
        "/auth/reset-password/" + token,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      history.push("/Login");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setShowPassword(false);
  };

  return (
    <div className="signup-content">
      <div className="signup-card">
        <img className="form-logo" src={logo} alt="logo" />
        <div className="title-forgot">
          <h2>Reset your password</h2>
        </div>
        <form onSubmit={onSubmit} className="signup-form">
          <input
            className="signup-input"
            type="text"
            name="token"
            placeholder="OTP"
            onChange={handleChange}
            value={token}
          />
          {/* <input
            className="signup-input"
            type="password"
            name="password"
            placeholder="New password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          /> */}
          <input
            className="signup-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            maxLength="38"
          />

          {!showPassword ? (
            <div className="vision3">
              <IconButton onClick={handleShowPassword}>
                <Visibility />
              </IconButton>
            </div>
          ) : (
            <div className="vision3">
              <IconButton onClick={handleShowPassword}>
                <VisibilityOff />
              </IconButton>
            </div>
          )}

          {error ? <p className="text-danger"> {error}</p> : null}

          <button className="signup-form-btn" type="submit">
            Submit
          </button>

          <Link to="/login">
            <p className="login-bottom">Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Reset;
