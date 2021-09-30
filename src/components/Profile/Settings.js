import React from "react";
import { Link } from "react-router-dom";
import "../../styles/settings.css";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";

const Settings = () => {
  return (
    <div className="settings-content">
      <div className="settings-card">
        <h2 className="settings-title">Settings</h2>
        <Link to="/account">
          <div className="settings-opt">
            <h5 className="settings-options">Your Account</h5>
            <div className="arrow">
              <ArrowForwardIosOutlinedIcon />
            </div>
          </div>
        </Link>
        {/* 
        <Link to="/security">
          <div className="settings-opt">
            <h5 className="settings-options">Security</h5>
            <div className="arrow">
              <ArrowForwardIosOutlinedIcon />
            </div>
          </div>
        </Link> */}

        <Link to="/privacy">
          <div className="settings-opt">
            <h5 className="settings-options">Privacy and Safety</h5>
            <div className="arrow">
              <ArrowForwardIosOutlinedIcon />
            </div>
          </div>
        </Link>

        <Link to="/resources">
          <div className="settings-opt">
            <h5 className="settings-options">Aditional Resources</h5>
            <div className="arrow">
              <ArrowForwardIosOutlinedIcon />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
