import React, { useState } from 'react'
import AddItem from './AddItem'

const Grade = ({ course, updateCourses }) => {
  const [itemIsOpen, setItemIsOpen] = useState(false);


  const openItem = () => {
    setItemIsOpen(!itemIsOpen);
  };



  return (
    <div>
      <div key={course._id} className="course-list" onClick={openItem}>
        <h5 className="single-class-item">{course.course}</h5>
        <h5>{course.courseGrade}</h5>
      </div>
      {itemIsOpen && (
        <AddItem updateCourses={updateCourses} course={course._id} />
      )}
    </div>
  );
};

export default Grade
