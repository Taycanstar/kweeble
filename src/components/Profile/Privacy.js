import React from "react";
import "../../styles/settings.css";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";

const Privacy = () => {
  return (
    <div className="account-content">
      <div className="settings-card">
        <div className="account-header">
          <div className="arrow-back">
            <Link to="/settings">
              <IconButton>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Link>
          </div>
          <h2 className="account-title">Privacy and Safety</h2>
        </div>

        <Link to="/privacy-policy">
          <div className="account-opt">
            <h5 className="settings-options">Privacy Policy</h5>
          </div>
        </Link>

        <Link to="/contact-us">
          <div className="account-opt">
            <h5 className="settings-options">Contact us</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Privacy;
