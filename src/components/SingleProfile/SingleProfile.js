import Avatar from "@material-ui/core/Avatar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import {fetchSingleProfile} from '../../actions/auth'
import axios from "../../api/index";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dropdown from "react-bootstrap/Dropdown";
import btc from "../../images/btc.png";
import doge from "../../images/doge.png";
import eth from "../../images/eth.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const SingleProfile = (props) => {
  const currentYear = new Date().getFullYear()
   const data = useSelector((state) => state.auth.singleProfile);
    const [courses, setCourses] = useState([]);
      const [openBtc, setOpenBtc] = useState(false);

      const [openEth, setOpenEth] = useState(false);

      const [openDoge, setOpenDoge] = useState(false);
      const [personAge, setPersonAge] = useState(null)


const filteredCourses =
    courses && courses.filter((course) => course.user === data._id);

  
const myId = props.match.params.id
   

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProfile(myId));
 async function fetchCourses() {
      const res = await axios.get("auth/courses");

      setCourses(res.data);

      return res;
    }
    fetchCourses();
  }, []);

  

//   const displayUserInfo = () => {
//     setUserInfo(true);
//     setPostReel(false);
//   };

//   const displayPostReel = () => {
//     setPostReel(true);
//     setUserInfo(false);
//   };

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
    const handleBtc = () => {
      navigator.clipboard.writeText(data.btcAddress);

      setOpenBtc(!openBtc);
      setTimeout(() => {
        setOpenBtc((openBtc) => !openBtc);
      }, 3000);
    };

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
    console.log(data.btcAddress);

   
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
        <Avatar src={data?.photo || "default.png"} className={classes.large} />
        <h5 className="profile-name">{data?.name}</h5>
        <h6 className="profile-username">@{data?.username}</h6>
      </div>
      <div className="profile-main">
        <div className="profile-bar">
          <div className={data ? "selected-bar-icon" : "single-bar-icon"}>
            <AssignmentIndOutlinedIcon />
          </div>
        </div>
      </div>
      <div className="user-info-main">
        <div className="user-first-row">
          <div className="personal">
            <h5>Personal</h5>
            <p>{data?.email}</p>
            <p>{data?.phoneNumber}</p>
            {/* <p>{data?.gender}</p> */}
            {data?.birthDay !== "null" &&
              data?.birthMonth !== "null" &&
              data?.birthYear !== "null" && (
                <div>
                  <p>
                    {data?.birthMonth} {data?.birthDay} {data?.birthYear}
                  </p>
                </div>
              )}
          </div>
          {data.interests !== undefined && data.interests !== "" && (
            <div className="user-second-row">
              <div className="user-interests">
                <h5>Interests</h5>
                <p>{data?.interests}</p>
              </div>
            </div>
          )}

          {data.social !== undefined && data.social !== "" && (
            <div className="social">
              <h5>Social</h5>
              <p>
                {data.instagram ? "Insta" : null} {data?.instagram}
              </p>
              <p>
                {data.snapchat ? "Snap" : null} {data?.snapchat}
              </p>
            </div>
          )}
        </div>

        <div className="user-third-row">
          <div className="studies">
            <h5>Studies</h5>
            <p>{data?.college} </p>
            
            <p>{data?.major}</p>
            <p>{data?.gradeLevel}</p>
          </div>
          {data.course}
          <div className="current-classes">
            <h5>Current classes</h5>
            <div>
              {filteredCourses.map((course) => (
                <div key={course._id}>
                  <p>{course.course}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;

