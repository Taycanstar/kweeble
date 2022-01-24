import Avatar from "@material-ui/core/Avatar";
import { fetchData } from "../../../actions/auth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PostReel from "./PostReel";
import UserInfo from "./UserInfo";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import btc from "../../../images/btc.png"
import doge from "../../../images/doge.png"
import eth from "../../../images/eth.png"
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@material-ui/core/colors";



const Profile = () => {
  const data = useSelector((state) => state.auth.authData);
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(true);
  const [postReel, setPostReel] = useState(false);
  const [openBtc, setOpenBtc] = useState(false)

  const [openEth, setOpenEth] = useState(false);

  const [openDoge, setOpenDoge] = useState(false);

  const [isWalletOpen, setIsWalletOpen] = useState(false)

  

   

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

  const handleBtc = () => {
     navigator.clipboard.writeText(data.btcAddress);
   
    setOpenBtc(!openBtc)
    setTimeout(() => {
      setOpenBtc((openBtc) => !openBtc);
    }, 3000);
   

  }  

  const handleEth = () => {
    navigator.clipboard.writeText(data.ethAddress);

    setOpenEth(!openEth);
    setTimeout(() => {
      setOpenEth((openEth) => !openEth);
    }, 3000);
  };  

  const handleDoge = () => {
    navigator.clipboard.writeText(data.dogeAddress);

    setOpenDoge(!openDoge);
    setTimeout(() => {
      setOpenDoge((openDoge) => !openDoge);
    }, 3000);
  };  

  const classes = useStyles();


  return (
    <div className="profile-container">
      <div className="profile-header">
        {openBtc && (
          <div className="flash-body">
            <div className="flash-message">
              <CheckCircleIcon className="checkmark-wallet" />
              <p className="flash-text">Bitcoin address link copied</p>
            </div>
          </div>
        )}
        {openEth && (
          <div className="flash-body">
            <div className="flash-message">
              <CheckCircleIcon className="checkmark-wallet" />
              <p className="flash-text">Ethereum address link copied</p>
            </div>
          </div>
        )}

        {openDoge && (
          <div className="flash-body">
            <div className="flash-message">
              <CheckCircleIcon className="checkmark-wallet" />
              <p className="flash-text">Dogecoin address link copied</p>
            </div>
          </div>
        )}

        {(data.btcAddress !== "" ||
          data.ethAddress !== "" ||
          data.dogeAddress !== "") &&
          (data.btcAddress !== undefined ||
            data.ethAddress !== undefined ||
            data.dogeAddress !== undefined) && (
            <div className="profile-wallet">
              <Dropdown>
                <Dropdown.Toggle className="wallet-button">
                  <AccountBalanceWalletIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {data.btcAddress !== undefined && data.btcAddress !== "" && (
                    <Dropdown.Item
                      className="dropdown-wallet-item"
                      onClick={handleBtc}
                    >
                      <div className="drop-item">
                        <div className="btc-tip">
                          <img src={btc} alt="btc" />
                        </div>

                        <h4 className="drop-wallet-label">Bitcoin address</h4>
                      </div>
                    </Dropdown.Item>
                  )}

                  {data.ethAddress !== undefined && data.ethAddress !== "" && (
                    <Dropdown.Item
                      className="dropdown-wallet-item"
                      onClick={handleEth}
                    >
                      <div className="drop-item">
                        <div className="eth-tip">
                          <img src={eth} alt="eth" />
                        </div>

                        <h4 className="drop-wallet-label">Ethereum address</h4>
                      </div>
                    </Dropdown.Item>
                  )}

                  {data.dogeAddress !== undefined && data.dogeAddress !== "" && (
                    <Dropdown.Item
                      className="dropdown-wallet-item"
                      onClick={handleDoge}
                    >
                      <div className="drop-item">
                        <div className="doge-tip">
                          <img src={doge} alt="doge" />
                        </div>

                        <h4 className="drop-wallet-label">Dogecoin address</h4>
                      </div>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}

        {/* <div className="tips">
          <div className="btc-tip">
            <img src={btc} alt="bitcoin address" />
          </div>
          <div className="doge-tip">
            <img src={doge} alt="dogecoin address" />
          </div>
          <div className="eth-tip">
            <img src={eth} alt="ethereum address" />
          </div>
        </div> */}
        <Avatar src={data?.photo || "default.png"} className={classes.large} />
        <h5 className="profile-name">{data?.name}</h5>
        <h6 className="profile-username">@{data?.username}</h6>

        {/* <div className="personal-stats">
          <div className="single-stat">
            <p className="number-of-following">752</p>
            <p className="following-text">Following</p>
          </div>
          <div className="single-stat">
            <p className="number-of-followers">13</p>
            <p className="followers-text">Followers</p>
          </div>
        </div> */}
        <div className="edit-panel">
          <a className="button-for-edit" href="/edit-profile">
            <button className="edit-pro-btn">Edit profile</button>
          </a>
          <a className="button-for-edit" href="/courses">
            <button className="edit-pro-btn">Edit classes</button>
          </a>
        </div>
      </div>
      <div className="profile-main">
        <div className="profile-bar">
          <div className={userInfo ? "selected-bar-icon" : "single-bar-icon"}>
            <AssignmentIndOutlinedIcon onClick={displayUserInfo} />
          </div>

          {/* <div className={postReel ? "selected-bar-icon" : "single-bar-icon"}>
            <FeedOutlinedIcon onClick={displayPostReel} />
          </div> */}
        </div>
      </div>
      {userInfo ? <UserInfo /> : <PostReel />}
    </div>
  );
};

export default Profile;
