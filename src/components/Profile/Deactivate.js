import React from "react";
import "../../styles/settings.css";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";

const Deactivate = () => {
  return (
    <div className="account-content">
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
        <div className="acc-description">
          <p>
            You’re about to eliminate your Kweeble account. This will restrict
            your ability to look through the college directory and being a part
            of it.
          </p>
        </div>

        <Link to="/fully-deactivate">
          <div className="deac-btn">
            <button type="button" className="deactivate-btn">
              Deactivate
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Deactivate;
