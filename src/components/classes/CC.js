import React, {useState, useEffect} from "react";
import "../../styles/course.css"


function SingleCourse({ course, index, removeCourse }) {
  return (
    <div className="a-class">
      <h5 className="single-class">{course.text}</h5>
      <button className="delete-class"onClick={() => removeCourse(index)}>Delete</button>
    </div>
  );
}

function CourseForm({ addCourse }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addCourse(value);
    setValue("");

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add new class"
        className="add-class-input"
      />
      <button
        className="add-btn"
        color="primary"
        variant="outlined"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

function Course() {
  const [courses, setCourses] = useState([]);

    const addCourse = (text) => {
      const newCourses = [...courses, { text }];
      setCourses(newCourses);
    };

    const removeCourse = (index) => {
      const newCourses = [...courses];
      newCourses.splice(index, 1);
      setCourses(newCourses);
    };

    

  return (
    <div className="course_app flex">
      <div className="course-card">
        <div className="heading">Classes</div>
        <CourseForm addCourse={addCourse} />
        <div className="courses-list">
          {courses.map((course, index) => (
            <SingleCourse
              key={index}
              index={index}
              course={course}
              removeCourse={removeCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Course;
