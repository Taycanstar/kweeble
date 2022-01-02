import React, { useEffect, useState } from "react";
import "../../styles/settings.css";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import axios from "../../api/index";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

const AccountInfo = () => {
  const [data, setData] = useState({
    name: "",
    error: null,
    imageUrl: "",
    phoneNumber: "",
    major: "",
    interests: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const res = await axios.get("/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData({
        ...data,
        ...res.data,
      });
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
          <h2 className="account-title">Account information</h2>
        </div>

        <Link to="/change-email">
          <div className="acc-info-opt">
            <div className="acc-info-main">
              <h5 className="acc-options">Email</h5>
              <h5 className="acc-mid-label">{data.email}</h5>
            </div>
            <div className="arrow-fow">
              <ArrowForwardIosOutlinedIcon />
            </div>
          </div>
        </Link>
        <Link to="/change-username">
          <div className="acc-info-opt">
            <div className="acc-info-main">
              <h5 className="acc-options">Username</h5>
              <h5 className="acc-mid-label">@{data.username}</h5>
            </div>
            <div className="arrow-fow">
              <ArrowForwardIosOutlinedIcon />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AccountInfo;
