import React, { useState } from "react";
import "../../styles/auth.css";
import logo from "../../images/logo3.jpg";
import axios from "../../api/index";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";

const Forgot = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const history = createBrowserHistory({ forceRefresh: true });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);

      const res = await axios.post(
        "/auth/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      history.push("/reset-password");
    } catch (error) {
      setError(error.response.data.error);
    }
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
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
          />

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

export default Forgot;
