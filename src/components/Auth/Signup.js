import React, { useState } from "react";
import "../../styles/auth.css";
import logo from "../../images/logo3.jpg";
import { Link } from "react-router-dom";
import axios from "../../api/index";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";

const Signup = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
  });

  const { error, name, email, password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setData({ ...data, error: null });
      setCollege({ ...college });
      await axios.post(
        "/auth/register",
        { name, email, password, college },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      props.history.push("/login");
    } catch (error) {
      setData({ ...data, error: error.response.data.error });
      console.log(error);
    }
  };

  const [college, setCollege] = useState([]);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setShowPassword(false);
  };

  return (
    <div className="signup-content">
      <div className="signup-card">
        <img className="form-logo" src={logo} alt="logo" />
        <form onSubmit={onSubmit} className="signup-form">
          {/* <div className="names-form">
            <input
              className="signup-input namef namef2"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={firstName}
            />
            <input
              className="signup-input namef"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={lastName}
            />
          </div> */}
          <input
            className="signup-input"
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={name}
          />

          <input
            className="signup-input"
            type="email"
            name="email"
            placeholder="Your school email"
            // pattern={
            //   college === "Eckerd College"
            //     ? "[a-z.]*[@]eckerd.edu"
            //     : "[a-z.]*[@]my.polk.edu"
            // }
            onChange={handleChange}
            value={email}
          />
          {/* <div className="password-input"> */}
          <input
            className="signup-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            maxLength="38"
          />
          {/* <div className="vision-input">
              {!showPassword ? (
                <div className="vision">
                  <IconButton onClick={handleShowPassword}>
                    <VisibilityOff />
                  </IconButton>
                </div>
              ) : (
                <div className="vision">
                  <IconButton onClick={handleShowPassword}>
                    <Visibility />
                  </IconButton>
                </div>
              )}
            </div>
          </div> */}

          {!showPassword ? (
            <div className="vision">
              <IconButton onClick={handleShowPassword}>
                <Visibility />
              </IconButton>
            </div>
          ) : (
            <div className="vision">
              <IconButton onClick={handleShowPassword}>
                <VisibilityOff />
              </IconButton>
            </div>
          )}

          <div className="colleges">
            <label className="college-label" htmlFor="college">
              College:
            </label>
            <select
              name="college"
              id="college"
              onChange={(e) => setCollege(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="Eckerd College">Eckerd College</option>
              {/* <option value="Polk State College">Polk State College</option> */}
            </select>
          </div>

          {error ? <p className="text-danger"> {error}</p> : null}

          <button className="signup-form-btn" type="submit">
            Sign up
          </button>

          <p className="policy-form">
            By creating an account, agreeing to our
            <Link to="/privacy-policy">
              {" "}
              Terms of Service and Privacy Policy
            </Link>
          </p>

          <p className="bottom-text">Already a member?</p>
          <Link to="/login">
            <p className="login-bottom">Log in</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
