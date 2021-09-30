import React, { useEffect, useState } from "react";
import "../../styles/settings.css";
import { Link, useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import axios from "../../api/index";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Visibility } from "@material-ui/icons";

const ChangePassword = () => {
  const history = useHistory();
  const [isError, setIsError] = useState("");
  const [data, setData] = useState({
    password: "",
    email: "",
    // phoneNumber: "",
    // major: "",
    // interests: "",
    // error: null,
    // photo: null,
    // snapchat: "",
    // instagram: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setShowPassword(false);
  };
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const res = await axios.get("/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmail(res.data.email);
      setName(res.data.name);
    }
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data });
      setEmail({ ...email });
      setName({ ...name });

      const token = localStorage.getItem("token");
      const res = await axios.put(
        "/auth/update-password",
        {
          password: data.password,
          email: email,
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      setData({
        ...data,
        ...res.data,
      });
      setIsError("no");
    } catch (error) {
      setData({ ...data });
      setIsError("no");
      setTimeout(function () {
        history.push("/verify-password");
      }, 1500);

      //   alert("An error occurred! Try submitting the form again.");
    }
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setData({ ...data, error: null });

  //     const token = localStorage.getItem("token");
  //     const res = await axios.put(
  //       "/auth/update-password",
  //       {
  //         name: data.name,
  //         interests: data.interests,
  //         major: data.major,
  //         phoneNumber: data.phoneNumber,
  //         email: data.email,
  //         instagram: data.instagram,
  //         snapchat: data.snapchat,
  //         password: data.password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log(res);

  //     setData({
  //       ...data,
  //       ...res.data,
  //     });
  //     console.log("i like emma");
  //     setIsError("no");
  //     console.log(isError);
  //   } catch (error) {
  //     setData({ ...data, error: error.response.data.error });

  //     setIsError("yes");

  //     //   alert("An error occurred! Try submitting the form again.");
  //   }
  // };

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
    console.log(isError);
  }, [isError]);

  console.log(isError);

  return (
    <div className="acc-info-content">
      <div className="settings-card">
        <div className="account-header">
          <div className="arrow-back">
            <Link to="/account">
              <IconButton>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Link>
          </div>
          <h2 className="account-title">Change your Password</h2>
        </div>

        <div className="email-content">
          <form onSubmit={onSubmit}>
            <h3 className="top-label-email">New Password</h3>
            <div className="input-pass">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="edit-email-input"
              />

              {data.error ? (
                <p id="pass-1" className="text-danger">
                  {data.error}
                </p>
              ) : null}

              {!showPassword ? (
                <div className="vision-change2">
                  <IconButton onClick={handleShowPassword}>
                    <Visibility />
                  </IconButton>
                </div>
              ) : (
                <div className="vision-change2">
                  <IconButton onClick={handleShowPassword}>
                    <VisibilityOff />
                  </IconButton>
                </div>
              )}
            </div>

            {(() => {
              switch (isError) {
                case "yes":
                  return <p className="text-danger"> Error</p>;
                case "no":
                  return (
                    <p className="text-success">Profile updated succesfully!</p>
                  );
                default:
                  return null;
              }
            })()}

            <button className="save-btn" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
