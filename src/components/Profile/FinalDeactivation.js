import React, { useEffect, useState } from "react";
import "../../styles/settings.css";
import { Link, useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import axios from "../../api/index";
import { useDispatch } from "react-redux";
import { createBrowserHistory } from "history";

const FinalDeactivation = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const history = useHistory();
  const historyOP = createBrowserHistory({ forceRefresh: true });

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
      setId({ ...id });
      const res = await axios.post(
        "/auth/verify-password",
        { password, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "/auth",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: id,
          },
        }
      );
      dispatch({ type: "LOGOUT" });
      historyOP.push("/");
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
      setId(res.data._id);
    }
    fetchData();
  }, []);
  return (
    <div className="acc-info-content">
      <div className="settings-card">
        <div className="account-header">
          <div className="arrow-back">
            <Link to="/deactivate">
              <IconButton>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Link>
          </div>
          <h2 className="account-title">Confirm your password</h2>
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
          <div className="deact-btn">
            <button onClick={onSubmit} className="final-btn" type="Submit">
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalDeactivation;
