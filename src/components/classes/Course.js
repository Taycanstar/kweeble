import React, { useState, useEffect } from "react";
import Courses from "./Courses";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import {
  addCourses,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../services/classServices";
import "../../styles/class.css";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");

  const userData = JSON.parse(localStorage.getItem("profile"));

  const filteredCourses =
    courses && courses.filter((course) => course.user === userData._id);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await getCourses();
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setCurrentCourse(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("profile"));
    console.log(userId._id);
    const originalCourses = courses;
    try {
      const { data } = await addCourses({
        course: currentCourse,
        user: userId._id,
      });
      const courses = originalCourses;
      courses.push(data);
      setCourses(courses);
      setCurrentCourse("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (currentCourse) => {
    const originalCourses = courses;
    try {
      const courses = originalCourses.filter(
        (course) => course._id !== currentCourse
      );
      setCourses(courses);
      await deleteCourse(currentCourse);
    } catch (error) {
      setCourses(originalCourses);
      console.log(error);
    }
  };

  return (
    <div className="classes-body">
      <div className="classes-main-content">
        <div className="class-name-header">
          <h1>Classes</h1>
        </div>
        <div className="class-search">
          <form onSubmit={handleSubmit} className=" search-form flex">
            <input
              value={currentCourse}
              required={true}
              onChange={handleChange}
              placeholder="Add new class"
              className="search-class-input"
            />
            <button className="addClass-btn" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="class-listItems">
          {filteredCourses.map((course) => (
            <div key={course._id} className="course-list">
              <h5 className="single-class-item">{course.course}</h5>

              <button
                onClick={() => handleDelete(course._id)}
                className="delete-class-item"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
