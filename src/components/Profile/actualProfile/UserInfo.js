import { fetchData } from "../../../actions/auth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../api/index";
import { getCourses } from "../../services/classServices";

const UserInfo = () => {
  const data = useSelector((state) => state.auth.authData);
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [courses, setCourses] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    setInterval(() => {
      dispatch(fetchData());
    }, 1000 * 60); //a sec = 1000, a min = 1000 * 60
  }, []);

    useEffect(() => {
      async function fetchCourses() {
        const res = await axios.get("auth/courses");
        
        setCourses(res.data)
        
        return res;
      }
      fetchCourses();
    }, []);


  return (
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
            {courses.map((course) => (
              <div key={course._id} >
               <p>{course.course}</p>
                
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UserInfo;
