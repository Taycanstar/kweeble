import React from "react";
import "../../styles/settings.css";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";

const Account = () => {
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
          <h2 className="account-title">Your Account</h2>
        </div>
        <div className="acc-description">
          <p>
            See information about your account, or learn about your account
            deactivation options
          </p>
        </div>
        <Link to="/verify-password">
          <div className="account-opt">
            <div className="acc-icon">
              <PersonOutlineOutlinedIcon />
            </div>
            <h5 className="settings-options">Account information</h5>
          </div>
        </Link>

        <Link to="verify-password2">
          <div className="account-opt">
            <div className="acc-icon">
              <LockOutlinedIcon />
            </div>
            <h5 className="settings-options">Change your password</h5>
          </div>
        </Link>

        <Link to="/verify-deactivate">
          <div className="account-opt">
            <div className="acc-icon">
              <SentimentVeryDissatisfiedOutlinedIcon />
            </div>
            <h5 className="settings-options">Deactivate your account</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Account;
