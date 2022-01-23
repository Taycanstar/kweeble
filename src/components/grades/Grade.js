import { ClassNames } from '@emotion/react';
import React, { useState } from 'react'
import AddItem from './AddItem'
import classnames from 'classnames'

const Grade = ({ course, updateCourses }) => {
  const [itemIsOpen, setItemIsOpen] = useState(false);


  const openItem = () => {
    setItemIsOpen(!itemIsOpen);
  };

console.log(course.grade);

  return (
    <div
      className={classnames(
        parseInt(course.courseGrade) === 100 && "a-grade-class",
        parseInt(course.courseGrade) === 99 && "a-grade-class",
        parseInt(course.courseGrade) === 98 && "a-grade-class",
        parseInt(course.courseGrade) === 97 && "a-grade-class",
        parseInt(course.courseGrade) === 96 && "a-grade-class",
        parseInt(course.courseGrade) === 95 && "a-grade-class",
        parseInt(course.courseGrade) === 94 && "lowa",
        parseInt(course.courseGrade) === 93 && "lowa",
        parseInt(course.courseGrade) === 92 && "lowa",
        parseInt(course.courseGrade) === 91 && "lowa",
        parseInt(course.courseGrade) === 90 && "lowa",
        parseInt(course.courseGrade)=== 89 && "b-grade-class",
        parseInt(course.courseGrade)=== 88 && "b-grade-class",
        parseInt(course.courseGrade)=== 87 && "b-grade-class",
        parseInt(course.courseGrade)=== 86 && "b-grade-class",
        parseInt(course.courseGrade)=== 85 && "b-grade-class",
        parseInt(course.courseGrade)=== 84 && "lowb",
        parseInt(course.courseGrade)=== 83 && "lowb",
        parseInt(course.courseGrade)=== 82 && "lowb",
        parseInt(course.courseGrade)=== 81 && "lowb",
        parseInt(course.courseGrade)=== 80 && "lowb",
        parseInt(course.courseGrade) === 79 && "c-grade-class",
        parseInt(course.courseGrade) === 78 && "c-grade-class",
        parseInt(course.courseGrade) === 77 && "c-grade-class",
        parseInt(course.courseGrade) === 76 && "c-grade-class",
        parseInt(course.courseGrade) === 75 && "c-grade-class",
        parseInt(course.courseGrade) === 74 && "c-grade-class",
        parseInt(course.courseGrade) === 73 && "c-grade-class",
        parseInt(course.courseGrade) === 72 && "c-grade-class",
        parseInt(course.courseGrade) === 71 && "c-grade-class",
        parseInt(course.courseGrade) === 70 && "c-grade-class",
        parseInt(course.courseGrade) < 70 && "f-grade-class"
      )}
    >
      <div key={course._id} className="course-page-list" onClick={openItem}>
        <h5 className="single-class-item">{course.course}</h5>
        <h5 className="grade-of-class">{course.courseGrade}</h5>
      </div>
      {itemIsOpen && (
        <AddItem updateCourses={updateCourses} course={course._id} />
      )}
    </div>
  );
};

export default Grade
