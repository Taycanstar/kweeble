import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import "../../styles/botbar.css";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AddIcon from "@mui/icons-material/Add";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const Botbar = () => {
  return (
    <div className="bot-bar">
      <div className="bot-sticky">
        <div className="container">
          <div className="bot-inner-content">
            <div className="bot-icons">
              <Link to="/news">
                <HomeRoundedIcon />
              </Link>
            </div>
            {/* <div className="bot-icons">
              <Link to="/">
                <BallotOutlinedIcon />
              </Link>
            </div> */}
            {/* <div className="bot-icons">
              <Link to="/add-post">
                <AddIcon />
              </Link>
            </div> */}
            {/* <div className="bot-icons">
              <Link to="/notifications">
                <NotificationsOutlinedIcon />
              </Link>
            </div> */}
            {/* <div className="bot-icons">
              <Link to="/messages">
                <MailOutlineOutlinedIcon />
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Botbar;
