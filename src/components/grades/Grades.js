import React, { useState, useEffect } from "react";
import "../../styles/grades.css";
import {
  addCourses,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../services/classServices";
import {
  addItems,
  getItems,
  updateItems,
  deleteItem,
} from "../services/itemsServices";
import Grade from "./Grade";
const Grades = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");
  // const [itemIsOpen, setItemIsOpen] = useState(false)
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);

  const [selectedCourse, setSelectedCourse] = useState();

  const userData = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await getCourses();
        const filteredCourses =
          data && data.filter((course) => course.user === userData._id);

        setCourses(filteredCourses);
      } catch (error) {
        console.log(error);
      }
    };
    loadCourses();
  }, []);

  const updateCourses = (id, data) => {
    const updated = courses.map((course) =>
      course._id === id ? data : course
    );

    setCourses(updated);
  };


  useEffect(() => {
    const loadItems = async () => {
      try {
        const { data } = await getItems();
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, []);

  const getCourseGrade = (grade) => {
    console.log(grade, "grade from grades comp.");
    return grade;
  };

  return (
    <div className="grades-body">
      <div className="grades-main">
        <div className="grades-name-header">
          <h1>Grades</h1>
        </div>
        <div className="class-listItems">
          {courses.map((course, i) => (
            <Grade
              updateCourses={updateCourses}
              getCourseGrade={getCourseGrade}
              key={i}
              course={course}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grades;

// grades => grade => addItem
