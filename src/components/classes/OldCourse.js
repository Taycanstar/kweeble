import React from "react";
import Courses from "./Courses";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import "../../styles/course.css";

class Course extends Courses {
  state = { courses: [], currentCourse: "" };

  render() {
    const userData = JSON.parse(localStorage.getItem("profile"));

    const filteredCourses =
      this.state.courses &&
      this.state.courses.filter((course) => course.user === userData._id);

    return (
      <div className="course_app flex">
        <div className="course-card">
          <div className="heading">Classes</div>
          <form onSubmit={this.handleSubmit} className="flex">
            <input
              variant="outlined"
              size="small"
              style={{ width: "80%" }}
              value={this.state.currentCourse}
              required={true}
              onChange={this.handleChange}
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
          <div>
            {filteredCourses.map((course) => (
              <div key={course._id} className="courses-list">
                {/* <Checkbox
                                    checked={course.completed}
                                    onClick={() => this.handleUpdate(course._id)}
                                    color="primary"
                                /> */}
                {/* <div
                                    className={
                                        course.completed
                                            ? "course line_through"
                                            : "course"
                                    }
                                >
                                    {course.course}
                                </div> */}
                <h5 className="single-class">{course.course}</h5>

                <button
                  onClick={() => this.handleDelete(course._id)}
                  className="delete-class"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
