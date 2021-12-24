import { fetchData } from "../../../actions/auth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
  const data = useSelector((state) => state.auth.authData);
  const [user, setUser] = useState(localStorage.getItem("token"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    setInterval(() => {
      dispatch(fetchData());
    }, 1000 * 60); //a sec = 1000, a min = 1000 * 60
  }, []);
  return (
    <div className="user-info-main">
      <div className="user-first-row">
        <div className="personal">
          <h5>Personal</h5>
          <p>{data?.email}</p>
          <p>{data?.phoneNumber}</p>
          <p>Male2</p>
          <p>August 6 1999</p>
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
          <p>{data?.college} 25'</p>
          <p>Bachelor of Science1</p>
          <p>{data?.major}</p>
        </div>
        <div className="current-classes">
          <h5>Current classes</h5>
          <p>class 1</p>
          <p>class 2</p>
          <p>class 3</p>
          <p>class 4</p>
        </div>
      </div>
      <div className="user-fourth-row">
        <div className="tbd">
          <h5>Top Artists</h5>
          <p>tbd</p>
          <p>tbd</p>
          <p>tbd</p>
          <p>tbd</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
