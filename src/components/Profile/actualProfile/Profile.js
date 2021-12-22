import Avatar from "@material-ui/core/Avatar";
import { fetchData } from "../../../actions/auth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PostReel from "./PostReel";
import UserInfo from "./UserInfo";

const Profile = () => {
  const data = useSelector((state) => state.auth.authData);
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(true);
  const [postReel, setPostReel] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    setInterval(() => {
      dispatch(fetchData());
    }, 1000 * 60); //a sec = 1000, a min = 1000 * 60
  }, []);

  const displayUserInfo = () => {
    setUserInfo(true);
    setPostReel(false);
  };

  const displayPostReel = () => {
    setPostReel(true);
    setUserInfo(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }));

  const classes = useStyles();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Avatar src={data?.photo || "default.png"} className={classes.large} />
        <h5 className="profile-name">{data?.name}</h5>
        <h6 className="profile-username">@dimerson</h6>

        <div className="personal-stats">
          <div className="single-stat">
            <p className="number-of-following">752</p>
            <p className="following-text">Following</p>
          </div>
          <div className="single-stat">
            <p className="number-of-followers">13M</p>
            <p className="followers-text">Followers</p>
          </div>
        </div>

        <a href="/edit-profile">
          <button className="edit-pro-btn">Edit profile</button>
        </a>
      </div>
      <div className="profile-main">
        <div className="profile-bar">
          <div className={userInfo ? "selected-bar-icon" : "single-bar-icon"}>
            <AssignmentIndOutlinedIcon onClick={displayUserInfo} />
          </div>

          <div className={postReel ? "selected-bar-icon" : "single-bar-icon"}>
            <FeedOutlinedIcon onClick={displayPostReel} />
          </div>
        </div>
      </div>
      {userInfo ? <UserInfo /> : <PostReel />}
    </div>
  );
};

export default Profile;
