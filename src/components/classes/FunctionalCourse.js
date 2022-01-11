import React, {useEffect, useState} from 'react'
import "../../styles/course.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../actions/auth";
import handleDelete from "./Courses"
import axios from "../../api/index";

const FunctionalCourse = () => {
      const data = useSelector((state) => state.auth.authData);
      const [user, setUser] = useState(localStorage.getItem("token"));
      const [courses, setCourses] = useState([]);

      const userData = JSON.parse(localStorage.getItem("profile"));

      const filteredCourses =
        courses && courses.filter((course) => course.user === userData._id);

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

          setCourses(res.data);

          return res;
        }
        fetchCourses();
      }, []);
    return (
      <div>
        {filteredCourses.map((course) => (
          <div key={course._id}>
            <h5 className="single-class">{course.course}</h5>

            <button
              onClick={() => handleDelete(course._id)}
              className="delete-class"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
}

export default FunctionalCourse
