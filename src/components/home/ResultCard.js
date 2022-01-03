import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ig from "../../images/igg.png";
import snap from "../../images/sn.png";
import {Link} from 'react-router-dom';
// import twitter from "../../images/tw.png";

const ResultCard = ({ person }) => {
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

  const [isMedia, setIsMedia] = useState("");

  console.log(person, "person")

  useEffect(() => {
    if (person.snapchat === undefined && person.instagram === undefined) {
      setIsMedia("");
    } else if (person.snapchat === " " && person.instagram === "") {
    } else if (person.snapchat === "" && person.instagram !== "") {
      setIsMedia("insta");
    } else if (person.snapchat !== "" && person.instagram === "") {
      setIsMedia("snap");
    } else if (person.snapchat !== "" && person.instagram !== "") {
      setIsMedia("both");
    } else {
      return null;
    }
  }, [isMedia]);
  console.log(isMedia);
  console.log(person.snapchat);
  // console.log(person.instagram);
  return (
    <div className="result-card">
      {/* To make this work either:
        1. Remove authentication if possible
        2. Send the auth token via a cookie instead of via header so that it gets sent with every browser request
        3. Get the photo via JavaScript/Axios */}
      <Link to={`/profile/${person._id}`}><Avatar src={person.photo || "default.png"} className={classes.large} /></Link>
      <div className="user-info-card">
        <div className="main-name">
          <h2 className="card-display-name">{person.name}</h2>
          {/* <span className="dot">•</span> */}
          <h2
            className={
              person.college === "Eckerd College" ? "eckerd-card" : "polk-card"
            }
          >
            {person.college}
          </h2>
        </div>

        <h3 className="card-display-info">
          <strong>Email&nbsp;&nbsp;</strong>
          {person.email}
        </h3>

        {person.phoneNumber && (
          <h3 className="card-display-info">
            <strong>Phone Number&nbsp;&nbsp; </strong> {person.phoneNumber}
          </h3>
        )}

        {person.major && (
          <h3 className="card-display-info">
            <strong>Major&nbsp;&nbsp;</strong> {person.major}
          </h3>
        )}

        {person.interests && (
          <h3 className="card-display-info">
            <strong>Interests&nbsp;&nbsp;</strong> {person.interests}
          </h3>
        )}

        {/* {person.snapchat && person.instagram && (
          <div className="social-icon1">
            <img className="media-icon" src={ig} alt="instagram" />
            <h3 className="card-display-info-media">
              <strong>{person.snapchat}</strong>
            </h3>
            <img className="media-icon" src={snap} alt="snap" />
            <h3 className="card-display-info-media">
              <strong>{person.instagram}</strong>
            </h3>
          </div>
        )} */}

        {(() => {
          switch (isMedia) {
            case "both":
              return (
                <div className="social-icon1">
                  <img className="media-icon" src={ig} alt="snap" />
                  <h3 className="card-display-info-media">
                    <strong>{person.instagram}</strong>
                  </h3>
                  <img className="media-icon" src={snap} alt="instagram" />
                  <h3 className="card-display-info-media">
                    <strong>{person.snapchat}</strong>
                  </h3>
                </div>
              );
            case "snap":
              return (
                <div className="social-icon1">
                  <img className="media-icon" src={snap} alt="snap" />
                  <h3 className="card-display-info-media">
                    <strong>{person.snapchat}</strong>
                  </h3>
                </div>
              );
            case "insta":
              return (
                <div className="social-icon1">
                  <img className="media-icon" src={ig} alt="instagram" />
                  <h3 className="card-display-info-media">
                    <strong>{person.instagram}</strong>
                  </h3>
                </div>
              );
            default:
              return null;
          }
        })()}

        {/* <div className="social-icons">
          <img className="media-icon" src={snap} alt="snap" />
          <h3 className="card-display-info">
            <strong>@dimi</strong>
          </h3>
        </div> */}
      </div>
    </div>
  );
};

export default ResultCard;
