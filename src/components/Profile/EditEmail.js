import React, { useEffect, useState } from "react";
import "../../styles/settings.css";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import axios from "../../api/index";

const EditEmail = () => {
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    email: "",
    name: "",
    imageUrl: "",
    phoneNumber: "",
    major: "",
    interests: "",
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const res = await axios.get("/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData({
        ...data,
        ...res.data,
      });
    }
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setData({ ...data, error: null });

      const token = localStorage.getItem("token");
      const res = await axios.put(
        "/auth",
        {
          email: data.email,
          interests: data.interests,
          major: data.major,
          phoneNumber: data.phoneNumber,
          name: data.name,
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
      setError("none");
    } catch (error) {
      setData({ ...data, error: error.response.data.error });
      console.log(error);
      setError("fatal");
      //   alert("An error occurred! Try submitting the form again.");
    }
  };

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
          <h2 className="account-title">Change Email</h2>
        </div>

        <div className="email-content">
          <form onSubmit={onSubmit}>
            <h3 className="top-label-email">Email</h3>

            <input
              type="email"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="edit-email-input"
            />

            {(() => {
              switch (error) {
                case "fatal":
                  return (
                    <p id="#hideMe" className="text-danger">
                      {" "}
                      {data.error}
                    </p>
                  );
                case "none":
                  return (
                    <p id="hideMe" className="text-success">
                      {" "}
                      Email updated succesfully!
                    </p>
                  );
                default:
                  return null;
              }
            })()}
            {/* {error === "fatal" ? (
              <p className="text-danger"> {data.error}</p>
            ) : (
              <p className="text-success"> Email updated succesfully!</p>
            )} */}

            <button className="save-btn" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmail;
