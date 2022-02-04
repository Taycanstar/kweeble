import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ig from "../../images/igg.png";
import snap from "../../images/sn.png";
import {Link} from 'react-router-dom';
import ecLogo from "../../images/ec-logo.png"
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
  
  const [collegePhoto, setCollegPhoto] = useState("")

  useEffect(() => {
    if(person.college == "Eckerd College"){
      setCollegPhoto(ecLogo)
    }
  },[])

  const classes = useStyles();

  const [isMedia, setIsMedia] = useState("");

  

  useEffect(() => {
    if (person.snapchat === undefined && person.instagram === undefined) {
      setIsMedia("");
    } else if (person.snapchat === "" && person.instagram === "") {
      setIsMedia("");
    } else if (person.instagram !== "" && (person.snapchat === "" || person.snapchat === undefined )  ) {
      setIsMedia("insta");
    } else if (person.snapchat !== "" && (person.instagram === "" || person.instagram === undefined)) {
      setIsMedia("snap");
    } else if (person.snapchat !== "" && person.instagram !== "") {
      setIsMedia("both");
    } else {
      return null;
    }
  }, [isMedia]);

  
 
  
  return (
    <div className="result-card">
      {/* To make this work either:
        1. Remove authentication if possible
        2. Send the auth token via a cookie instead of via header so that it gets sent with every browser request
        3. Get the photo via JavaScript/Axios */}
      <div className="card-photo">
        <Link to={`/user/${person._id}`}>
          <Avatar
            style={{ marginLeft: "22px" }}
            src={person.photo || "default.png"}
            className={classes.large}
          />
        </Link>
        <img className="ec-card-logo" src={collegePhoto} alt="eckerd-college" />
      </div>

      <div className="user-info-card">
        <div className="main-name">
          <h2 className="card-display-name">{person.name}</h2>
          <Link to={`/user/${person._id}`}>
            <h2 className="card-username">@{person.username}</h2>
          </Link>
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

        {person.gradeLevel && (
          <h3 className="card-display-info">
            <strong>Grade Level&nbsp;&nbsp;</strong> {person.gradeLevel}
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
                  <img className="media-icon-snap" src={snap} alt="instagram" />
                  <h3 className="card-display-info-media">
                    <strong className="snap-card">{person.snapchat}</strong>
                  </h3>
                </div>
              );
            case "snap":
              return (
                <div className="social-icon1">
                  <img className="media-icon-snap" src={snap} alt="snap" />
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

       
      </div>
    </div>
  );
};

export default ResultCard;
