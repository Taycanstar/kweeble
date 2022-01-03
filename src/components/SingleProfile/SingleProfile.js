import Avatar from "@material-ui/core/Avatar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import {fetchSingleProfile} from '../../actions/auth'
import axios from "../../api/index";


const SingleProfile = (props) => {
   const data = useSelector((state) => state.auth.singleProfile);
    const [courses, setCourses] = useState([]);


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

  console.log(data, "data")

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

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Avatar src={data?.photo || "default.png"} className={classes.large} />
        <h5 className="profile-name">{data?.name}</h5>
        <h6 className="profile-username">@{data?.username}</h6>

       
       
      </div>
      <div className="profile-main">
        <div className="profile-bar">
          <div className={data ? "selected-bar-icon" : "single-bar-icon"}>
            <AssignmentIndOutlinedIcon />
          </div>

          {/* <div className={postReel ? "selected-bar-icon" : "single-bar-icon"}>
            <FeedOutlinedIcon onClick={displayPostReel} />
          </div> */}
        </div>
      </div>
      <div className="user-info-main">
      <div className="user-first-row">
        <div className="personal">
          <h5>Personal</h5>
          <p>{data?.email}</p>
          <p>{data?.phoneNumber}</p>
          <p>{data?.gender}</p>
          <p>
            {data?.birthMonth} {data?.birthDay} {data?.birthYear}
          </p>
        </div>

        <div className="social">
          <h5>Social</h5>
          <p>
            {data.instagram ? "Insta" : null} {data?.instagram}
          </p>
          <p>
            {data.snapchat ? "Snap" : null} {data?.snapchat}
          </p>
        </div>
      </div>
      <div className="user-second-row">
        <div className="user-interests">
          <h5>Interests</h5>
          <p>{data?.interests}</p>
        </div>
      </div>
      <div className="user-third-row">
        <div className="studies">
          <h5>Studies</h5>
          <p>{data?.college} </p>
          <p>{data?.typeOfDegree}</p>
          <p>{data?.major}</p>
        </div>
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

