import React, { useEffect, useState } from "react";
import "../../styles/settings.css";
import { Link, useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import axios from "../../api/index";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

const VerifyDeactivate = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const [data, setData] = useState({
    password: "",
    error: null,
  });

  const { password, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setData({ ...data, error: null });
      setEmail({ ...email });
      const res = await axios.post(
        "/auth/verify-password",
        { password, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      history.push("/deactivate");
    } catch (error) {
      setData({ ...data, error: error.response.data.error });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const res = await axios.get("/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmail(res.data.email);
    }
    fetchData();
  }, []);
  return (
    <div className="acc-info-content">
      <div className="settings-card">
        <div className="account-header">
          <div className="arrow-back">
            <Link to="/account">
              <IconButton>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Link>
          </div>
          <h2 className="account-title">Deactivate your account</h2>
        </div>

        <div className="verify-password-opt">
          <div className="acc-info-main">
            <h3 className="pass-options">Confirm your password</h3>
            <h5 className="acc-mid-label-x">
              Please enter your password in order to see this.
            </h5>
          </div>

          <h3 className="top-label">Password</h3>
          <input
            name="password"
            onChange={handleChange}
            className="edit-input"
            type="password"
          />
          {error ? <p className="text-danger"> {error}</p> : null}
          <button onClick={onSubmit} className="save-btn" type="Submit">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyDeactivate;
