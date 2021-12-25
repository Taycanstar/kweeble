import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, updateUser, updateUserPhoto } from "../../actions/auth";
import "../../styles/profile.css";
import axios from "../../api/index";
import image from "../../images/q9.webp";
import image2 from "../../images/k4.webp";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const EditProfile = () => {
  const authData = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();

  const [isError, setIsError] = useState("");
  const [file, setFiles] = useState(null);
  const inputRef = useRef();
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    major: "",
    interests: "",
    error: null,
    photo: null,
    email: "",
    snapchat: "",
    instagram: "",
    typeOfDegree: "",
    class1: "",
    class2: "",
    class3: "",
    class4: "",
    class5: "",
    top1: "",
    top1A1: "",
    top1A2: "",
    top1A3: "",
    top1A4: "",
    top1A5: "",
  });

  useEffect(() => {
    if (authData) setData(authData);
  }, [authData]);

  const uploadPhoto = async (photoFile) => {
    const formData = new FormData();
    formData.append("photo", photoFile, photoFile.name);

    dispatch(updateUserPhoto(formData));
  };

  // console.log("data outtt==>>", data);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("data==>>", data);
      // setData({ ...data, error: null });

      dispatch(
        updateUser({
          name: data.name,
          interests: data.interests,
          major: data.major,
          phoneNumber: data.phoneNumber,
          email: data.email,
          instagram: data.instagram,
          snapchat: data.snapchat,
          typeOfDegree: data.typeOfDegree,
          class1: data.class1,
          class2: data.class2,
          class3: data.class3,
          class4: data.class4,
          class5: data.class5,
          top1: data.top1,
          top1A1: data.top1A1,
          top1A2: data.top1A2,
          top1A3: data.top1A3,
          top1A4: data.top1A4,
          top1A5: data.top1A5,
        })
      );

      // console.log(res);

      // setData({
      //   ...data,
      //   ...res.data,
      // });

      setIsError("no");
      // console.log(isError);
    } catch (error) {
      // setData({ ...data, error: error.response.data.error });
      setIsError("yes");
      //   alert("An error occurred! Try submitting the form again.");
    }
  };

  useEffect(() => {
    if (isError === "yes") {
      setTimeout(function () {
        setIsError("");
      }, 3000);
    } else if (isError === "no") {
      setTimeout(function () {
        setIsError("");
      }, 3000);
    }
  }, [isError]);

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
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
  }));

  const classes = useStyles();

  return (
    <div className="main-edit-profile">
      <div className="profile-content">
        <div className="profile-card">
          <div className="top-main-part">
            <div className="left-form-part">
              <div className="edit-avatar">
                <Avatar
                  className={classes.large}
                  src={data.photo || "default.png"}
                />
              </div>
              {/* donda */}

              <form onSubmit={onSubmit}>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  name="photo"
                  onChange={(e) => uploadPhoto(e.target.files[0])}
                  ref={inputRef}
                />

                <h3 className="top-label">Name</h3>
                <input
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Phone Number</h3>
                <input
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  className="edit-input"
                  type="text"
                />

                <h3 className="top-label">Major</h3>
                <input
                  name="major"
                  value={data.major}
                  onChange={(e) => setData({ ...data, major: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Interests</h3>
                <input
                  name="interests"
                  value={data.interests}
                  onChange={(e) =>
                    setData({ ...data, interests: e.target.value })
                  }
                  className="edit-input"
                  type="text"
                />

                <h3 className="top-label">Snapchat</h3>
                <input
                  name="snapchat"
                  value={data.snapchat}
                  onChange={(e) =>
                    setData({ ...data, snapchat: e.target.value })
                  }
                  className="edit-input"
                  type="text"
                />

                <h3 className="top-label">Instagram</h3>
                <input
                  name="instagram"
                  value={data.instagram}
                  onChange={(e) =>
                    setData({ ...data, instagram: e.target.value })
                  }
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Type of Degree</h3>
                <input
                  name="typeOfDegree"
                  value={data.typeOfDegree}
                  onChange={(e) =>
                    setData({ ...data, typeOfDegree: e.target.value })
                  }
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Current class 1</h3>
                <input
                  name="class1"
                  value={data.class1}
                  onChange={(e) => setData({ ...data, class1: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Current class 2</h3>
                <input
                  name="class2"
                  value={data.class2}
                  onChange={(e) => setData({ ...data, class2: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Current class 3</h3>
                <input
                  name="class3"
                  value={data.class3}
                  onChange={(e) => setData({ ...data, class3: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Current class 4</h3>
                <input
                  name="class4"
                  value={data.class4}
                  onChange={(e) => setData({ ...data, class4: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Current class 5</h3>
                <input
                  name="class5"
                  value={data.class5}
                  onChange={(e) => setData({ ...data, class5: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">
                  Custom Top list (Top Artists, songs, movies, etc...
                </h3>
                <input
                  name="top1"
                  value={data.top1}
                  onChange={(e) => setData({ ...data, top1: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Top choice 1</h3>
                <input
                  name="top1A1"
                  value={data.top1A1}
                  onChange={(e) =>
                    setData({ ...data, topChoice1: e.target.value })
                  }
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Top choice 2</h3>
                <input
                  name="top1A2"
                  value={data.top1A2}
                  onChange={(e) => setData({ ...data, top1A2: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Top choice 3</h3>
                <input
                  name="top1A3"
                  value={data.top1A3}
                  onChange={(e) => setData({ ...data, top1A3: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Top choice 4</h3>
                <input
                  name="top1A4"
                  value={data.top1A4}
                  onChange={(e) => setData({ ...data, top1A4: e.target.value })}
                  className="edit-input"
                  type="text"
                />
                <h3 className="top-label">Top choice 5</h3>
                <input
                  name="top1A5"
                  value={data.top1A5}
                  onChange={(e) => setData({ ...data, top1A5: e.target.value })}
                  className="edit-input"
                  type="text"
                />

                {(() => {
                  switch (isError) {
                    case "yes":
                      return <p className="text-danger"> Error</p>;
                    case "no":
                      return (
                        <p className="text-success">
                          {" "}
                          Profile updated succesfully!
                        </p>
                      );
                    default:
                      return null;
                  }
                })()}

                <br />
                <button className="save-btn" type="Submit" onClick={onSubmit}>
                  Save
                </button>
              </form>
            </div>
            <div className="right-title">
              <h1 className="profile-title">Edit Profile</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-profile-img">
        <img className="edit-image2" src={image2} alt="humans" />
      </div>
    </div>
  );
};

export default EditProfile;
